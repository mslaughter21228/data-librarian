"""
metadata_handler.py
====================
Read and write embedded metadata for the Data Librarian.

Read strategy  : EPUB → direct OPF parse (lxml), supplemented by exiftool
                 All others → exiftool -json -a -G1
Write strategy : EPUB → surgical OPF patch inside ZIP (preserves file integrity)
                 PDF / DOCX / MOBI / AZW3 / CBZ / others → exiftool -overwrite_original

Requires: exiftool >= 10, lxml, (zipfile + os in stdlib)
"""

import subprocess
import json
import os
import zipfile
import shutil
import tempfile
from lxml import etree

EXIFTOOL = shutil.which('exiftool') or 'exiftool'

# XML namespaces
DC  = 'http://purl.org/dc/elements/1.1/'
OPF = 'http://www.idpf.org/2007/opf'
CONTAINER_NS = 'urn:oasis:names:tc:opendocument:xmlns:container'

EMPTY_XMP = {
    'title': '',
    'creator': '',
    'publisher': '',
    'date': '',
    'language': '',
    'subject': [],
    'description': '',
    'series': '',
    'series_number': '',
}

# Priority-ordered exiftool tag aliases per our field (first match wins)
FIELD_ALIASES = {
    'title':         ['XMP-dc:Title',        'Title',       'PDF:Title'],
    'creator':       ['XMP-dc:Creator',       'Author',      'Creator',  'PDF:Author'],
    'publisher':     ['XMP-dc:Publisher',     'Publisher'],
    'date':          ['XMP-dc:Date',          'Date',        'Year',
                      'PublishDate',           'CreateDate'],
    'language':      ['XMP-dc:Language',      'Language'],
    'subject':       ['XMP-dc:Subject',       'Subject',     'Keywords'],
    'description':   ['XMP-dc:Description',   'Description', 'Comment',  'Summary'],
    'series':        ['XMP-calibre:Series',   'Series'],
    'series_number': ['XMP-calibre:SeriesIndex', 'SeriesIndex'],
}


# ─────────────────────────── exiftool helpers ────────────────────────────────

def _run_exiftool(args, timeout=30):
    """Run exiftool; return (stdout, stderr, returncode). Never raises."""
    try:
        r = subprocess.run(
            [EXIFTOOL] + args,
            capture_output=True, text=True, timeout=timeout
        )
        return r.stdout, r.stderr, r.returncode
    except FileNotFoundError:
        return '', 'exiftool not found in PATH', 1
    except subprocess.TimeoutExpired:
        return '', 'exiftool timed out', 1


def _exiftool_read(full_path):
    """Return a flat tag→value dict from exiftool -json -a -G1."""
    stdout, _, rc = _run_exiftool(['-json', '-a', '-G1', full_path])
    if rc != 0 or not stdout.strip():
        return {}
    try:
        records = json.loads(stdout)
    except json.JSONDecodeError:
        return {}
    if not records:
        return {}
    raw = records[0]
    # Build flat dict with BOTH "XMP-dc:Title" and short "Title" keys
    flat = {}
    for k, v in raw.items():
        flat[k] = v
        if ':' in k:
            short = k.split(':', 1)[1]
            if short not in flat:
                flat[short] = v
    return flat


def _pick(flat, field):
    """Return first non-empty alias value for a field."""
    for alias in FIELD_ALIASES.get(field, []):
        v = flat.get(alias)
        if v is not None and v != '':
            return v
    return None


def _to_list(val):
    """Coerce a value to a clean list of strings."""
    if val is None:
        return []
    if isinstance(val, list):
        return [str(x).strip() for x in val if str(x).strip()]
    s = str(val).strip()
    if not s:
        return []
    return [p.strip() for p in s.split(',') if p.strip()]


def _to_str(val):
    if val is None:
        return ''
    return str(val).strip()


# ─────────────────────────── EPUB helpers ────────────────────────────────────

def _epub_opf_path(epub_path):
    """Return the OPF full-path string from META-INF/container.xml."""
    with zipfile.ZipFile(epub_path, 'r') as z:
        container_xml = z.read('META-INF/container.xml')
    tree = etree.fromstring(container_xml)
    rootfiles = tree.findall(f'.//{{{CONTAINER_NS}}}rootfile')
    if rootfiles:
        return rootfiles[0].get('full-path')
    return None


def _epub_read_metadata(epub_path):
    """Extract metadata from EPUB OPF. Returns a partial xmp dict."""
    opf_path = _epub_opf_path(epub_path)
    if not opf_path:
        return {}
    with zipfile.ZipFile(epub_path, 'r') as z:
        opf_data = z.read(opf_path)
    tree = etree.fromstring(opf_data)

    def dc_vals(tag):
        vals = []
        for el in tree.iter(f'{{{DC}}}{tag}'):
            if el.text and el.text.strip():
                vals.append(el.text.strip())
        return vals

    def meta_content(name):
        for el in tree.iter(f'{{{OPF}}}meta'):
            if el.get('name') == name:
                return (el.get('content') or '').strip()
        for el in tree.iter('meta'):
            if el.get('name') == name:
                return (el.get('content') or '').strip()
        return ''

    result = {}
    for field in ('title', 'creator', 'publisher', 'date', 'language', 'description'):
        vals = dc_vals(field)
        result[field] = ', '.join(vals) if vals else ''
    result['subject']       = dc_vals('subject')
    result['series']        = meta_content('calibre:series')
    result['series_number'] = meta_content('calibre:series_index')
    return result


def _epub_write_metadata(epub_path, metadata):
    """
    Patch the OPF file inside the EPUB ZIP without touching other entries.
    Returns (success: bool, message: str).
    """
    opf_path = _epub_opf_path(epub_path)
    if not opf_path:
        return False, 'Could not locate OPF file inside EPUB'

    # Read entire ZIP into memory
    with zipfile.ZipFile(epub_path, 'r') as z:
        opf_data = z.read(opf_path)
        other_entries = {
            name: (z.read(name), z.getinfo(name))
            for name in z.namelist() if name != opf_path
        }

    try:
        tree = etree.fromstring(opf_data)
    except etree.XMLSyntaxError as e:
        return False, f'OPF XML parse error: {e}'

    # Find <metadata> element (handle both namespaced and bare)
    meta_el = tree.find(f'{{{OPF}}}metadata')
    if meta_el is None:
        meta_el = tree.find('metadata')
    if meta_el is None:
        return False, 'No <metadata> element found in OPF'

    def upsert_dc(tag, value):
        """Set first existing dc:tag or create one."""
        el = meta_el.find(f'{{{DC}}}{tag}')
        if el is not None:
            el.text = value
        else:
            new = etree.SubElement(meta_el, f'{{{DC}}}{tag}')
            new.text = value

    def replace_dc_list(tag, values):
        """Remove all dc:tag children and re-add from values list."""
        for el in meta_el.findall(f'{{{DC}}}{tag}'):
            meta_el.remove(el)
        for v in values:
            new = etree.SubElement(meta_el, f'{{{DC}}}{tag}')
            new.text = v

    def upsert_meta(name, value):
        """Set <meta name="..."> content or create it."""
        for el in list(meta_el.findall(f'{{{OPF}}}meta')) + list(meta_el.findall('meta')):
            if el.get('name') == name:
                el.set('content', value)
                return
        new = etree.SubElement(meta_el, f'{{{OPF}}}meta')
        new.set('name', name)
        new.set('content', value)

    title    = metadata.get('title', '').strip()
    creator  = metadata.get('creator', '').strip()
    pub      = metadata.get('publisher', '').strip()
    date     = metadata.get('date', '').strip()
    lang     = metadata.get('language', '').strip()
    desc     = metadata.get('description', '').strip()
    series   = metadata.get('series', '').strip()
    series_n = metadata.get('series_number', '').strip()
    subjects = metadata.get('subject', [])
    if isinstance(subjects, str):
        subjects = [s.strip() for s in subjects.split(',') if s.strip()]

    if title:    upsert_dc('title', title)
    if creator:  upsert_dc('creator', creator)
    if pub:      upsert_dc('publisher', pub)
    if date:     replace_dc_list('date', [date])   # clear duplicates, set one value
    if lang:     upsert_dc('language', lang)
    if desc:     upsert_dc('description', desc)
    if subjects: replace_dc_list('subject', subjects)
    if series:   upsert_meta('calibre:series', series)
    if series_n: upsert_meta('calibre:series_index', series_n)

    new_opf = etree.tostring(tree, xml_declaration=True,
                              encoding='utf-8', pretty_print=True)

    # Write new ZIP to a temp file, then atomically replace original
    epub_dir = os.path.dirname(os.path.abspath(epub_path))
    tmp_fd, tmp_path = tempfile.mkstemp(suffix='.epub', dir=epub_dir)
    try:
        os.close(tmp_fd)
        with zipfile.ZipFile(tmp_path, 'w') as zout:
            # mimetype MUST be first and stored (uncompressed) per EPUB spec
            if 'mimetype' in other_entries:
                data, _ = other_entries.pop('mimetype')
                zout.writestr(zipfile.ZipInfo('mimetype'), data, zipfile.ZIP_STORED)
            for name, (data, _) in other_entries.items():
                zout.writestr(name, data, zipfile.ZIP_DEFLATED)
            zout.writestr(opf_path, new_opf, zipfile.ZIP_DEFLATED)
        shutil.move(tmp_path, epub_path)
        return True, 'Metadata saved to EPUB'
    except Exception as e:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        return False, f'Failed to write EPUB: {e}'


# ─────────────────────────── exiftool write helpers ──────────────────────────

def _build_exiftool_write_args(args, ext, metadata):
    """Append format-specific exiftool write tag arguments to args list."""
    title    = metadata.get('title', '').strip()
    creator  = metadata.get('creator', '').strip()
    pub      = metadata.get('publisher', '').strip()
    date     = metadata.get('date', '').strip()
    lang     = metadata.get('language', '').strip()
    desc     = metadata.get('description', '').strip()
    series   = metadata.get('series', '').strip()
    series_n = metadata.get('series_number', '').strip()
    subjects = metadata.get('subject', [])
    if isinstance(subjects, str):
        subjects = [s.strip() for s in subjects.split(',') if s.strip()]

    if ext == 'pdf':
        if title:    args += [f'-Title={title}',    f'-XMP-dc:Title={title}']
        if creator:  args += [f'-Author={creator}', f'-XMP-dc:Creator={creator}']
        if pub:      args += [f'-Publisher={pub}',  f'-XMP-dc:Publisher={pub}']
        if date:     args += [f'-XMP-dc:Date={date}']
        if lang:     args += [f'-XMP-dc:Language={lang}']
        if desc:     args += [f'-Subject={desc}',   f'-XMP-dc:Description={desc}']
        if subjects:
            args.append('-XMP-dc:Subject=')
            for s in subjects:
                args.append(f'-XMP-dc:Subject+={s}')
        if series:   args.append(f'-XMP-calibre:Series={series}')
        if series_n: args.append(f'-XMP-calibre:SeriesIndex={series_n}')

    elif ext in ('mobi', 'azw3'):
        if title:    args.append(f'-Title={title}')
        if creator:  args.append(f'-Author={creator}')
        if pub:      args.append(f'-Publisher={pub}')
        if date:     args.append(f'-Date={date}')
        if lang:     args.append(f'-Language={lang}')
        if desc:     args.append(f'-Description={desc}')
        if subjects:
            args.append('-Subject=')
            for s in subjects:
                args.append(f'-Subject+={s}')

    elif ext in ('docx', 'doc', 'odt'):
        if title:    args.append(f'-Title={title}')
        if creator:  args += [f'-Creator={creator}', f'-Author={creator}']
        if pub:      args.append(f'-Publisher={pub}')
        if date:     args.append(f'-CreateDate={date}')
        if lang:     args.append(f'-Language={lang}')
        if desc:     args.append(f'-Description={desc}')
        if subjects: args.append(f'-Keywords={", ".join(subjects)}')

    else:
        # Generic: cbz, cbr, djvu, rtf, txt, etc.
        if title:    args.append(f'-Title={title}')
        if creator:  args.append(f'-Author={creator}')
        if pub:      args.append(f'-Publisher={pub}')
        if desc:     args.append(f'-Comment={desc}')
        if subjects: args.append(f'-Keywords={", ".join(subjects)}')


# ─────────────────────────── Public API ──────────────────────────────────────

def read_metadata(full_path: str) -> dict:
    """
    Read embedded metadata from any supported file.
    Returns an xmp dict (keys match EMPTY_XMP; never raises).
    """
    xmp = dict(EMPTY_XMP)
    ext = os.path.splitext(full_path)[1].lower().lstrip('.')

    if ext == 'epub':
        try:
            epub_meta = _epub_read_metadata(full_path)
            for field in xmp:
                if field == 'subject':
                    xmp[field] = _to_list(epub_meta.get(field))
                else:
                    xmp[field] = _to_str(epub_meta.get(field))
        except Exception:
            pass  # fall through and let exiftool fill remaining blanks

    # Supplement / fallback: exiftool fills any still-empty fields
    flat = _exiftool_read(full_path)
    for field in xmp:
        if xmp[field] or (field == 'subject' and xmp[field]):
            continue  # already populated by EPUB path
        v = _pick(flat, field)
        xmp[field] = _to_list(v) if field == 'subject' else _to_str(v)

    return xmp


def write_metadata(full_path: str, metadata: dict) -> tuple:
    """
    Write metadata to a file. Returns (success: bool, message: str).
    """
    ext = os.path.splitext(full_path)[1].lower().lstrip('.')

    if ext == 'epub':
        return _epub_write_metadata(full_path, metadata)

    # All other formats via exiftool
    args = ['-overwrite_original', '-charset', 'filename=UTF8']
    _build_exiftool_write_args(args, ext, metadata)

    if len(args) <= 3:  # only the base flags, nothing to write
        return True, 'No metadata fields to write'

    args.append(full_path)
    stdout, stderr, rc = _run_exiftool(args)

    if rc != 0:
        msg = (stderr or stdout).strip()
        return False, f'exiftool error ({rc}): {msg}'
    return True, 'Metadata saved'
