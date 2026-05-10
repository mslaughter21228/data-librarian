"""
organizer.py — Data Librarian
==============================
Implements the Digital Library File Naming Convention (v1.2).
Renames and organises files according to content type.

Naming patterns (Section 3):
  Book      : Lastname Firstname--Title [Edition]
  Grey Lit  : Title--Lastname Firstname Date
  Image     : Title Date
  Video     : Title Date
  Audio     : Title Date

Author rules (Section 4), Edition brackets (4j/4k),
Acronym appends (Section 5c) all enforced here.

Entry point: organize_library(source_folder, dest_root, dry_run)
"""

import io
import os
import re
import shutil
import sys
import threading
import warnings
from typing import Optional

# ---------------------------------------------------------------------------
# Content-type classification
# ---------------------------------------------------------------------------

BOOK_EXTENSIONS      = {'.pdf', '.epub', '.mobi', '.azw3', '.djvu',
                         '.cbz', '.cbr', '.doc', '.docx', '.txt', '.rtf',
                         '.fb2', '.lit', '.pdb', '.lrf', '.odt', '.azw'}
IMAGE_EXTENSIONS     = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.tiff',
                         '.bmp', '.svg', '.heic'}
VIDEO_EXTENSIONS     = {'.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv',
                         '.webm', '.m4v'}
AUDIO_EXTENSIONS     = {'.mp3', '.m4a', '.flac', '.ogg', '.wav', '.aac',
                         '.wma', '.opus', '.aiff'}

# Grey literature: articles, essays, theses, web pages — typically PDFs but
# distinguished by context (separate folder or explicit flag).  For now we
# identify them by heuristic: file is a .pdf AND its parent folder name
# contains any of these signals.
GREY_LIT_FOLDER_SIGNALS = {
    'articles', 'essays', 'theses', 'papers', 'journals', 'periodicals',
    'grey', 'grey literature', 'grey_literature'
}

# ---------------------------------------------------------------------------
# Acronym append rules (Section 5c)
# ---------------------------------------------------------------------------

ORG_APPEND = {
    'The Ancient and Mystical Order Rosae Crucis': 'AMORC',
    'Ancient and Mystical Order Rosae Crucis':     'AMORC',
    'International Guild of Occult Science':       'IGOS',
}

# Honorific abbreviations (Section 4i)
HONORIFIC_ABBREV = {
    'Frater': 'Fra.',
    'Soror':  'Sor.',
    'Honorable': 'Hon.',
}

# ---------------------------------------------------------------------------
# Field sanitisation  (Section 6 + Section 1)
# ---------------------------------------------------------------------------

# Characters illegal on Windows/Linux filesystems (never use in filenames)
_ILLEGAL_CHARS = re.compile(r'[/\\:*?"<>|\x00-\x1F]')

# Collapse multiple spaces
_MULTI_SPACE = re.compile(r' {2,}')


def _sanitize_field(text: str) -> str:
    """Remove OS-illegal chars, collapse spaces, strip edges."""
    if not text:
        return ''
    text = _ILLEGAL_CHARS.sub('', text)
    text = _MULTI_SPACE.sub(' ', text)
    return text.strip()


def _title_case(text: str) -> str:
    """
    Title case preserving ordinal suffixes (6th, 3rd, 2nd, 1st).
    Python's str.title() wrongly capitalises '6Th', '3Rd', etc.
    """
    _ORDINAL = re.compile(r'^(\d+)(st|nd|rd|th)$', re.IGNORECASE)
    words = text.split()
    result = []
    for word in words:
        m = _ORDINAL.match(word)
        if m:
            result.append(m.group(1) + m.group(2).lower())
        else:
            result.append(word.capitalize())
    return ' '.join(result)


def _clean_author_segment(raw: str) -> str:
    """Strip illegal chars from an author name or org name."""
    return _sanitize_field(raw)


# ---------------------------------------------------------------------------
# Author field builder (Sections 4a – 4i)
# ---------------------------------------------------------------------------

def build_author_field(
    authors: list,           # list of raw name strings
    role: str = '',          # '', 'ed', 'comp', 'tr'
    for_book: bool = True,   # True → "Lastname Firstname"; False → same
) -> str:
    """
    Build the normalised author field per naming convention.

    authors : up to N names; 3+ triggers et al.
    role    : '' | 'ed' | 'comp' | 'tr'
    """
    if not authors:
        return 'Anonymous'

    # Expand known honorifics
    expanded = []
    for name in authors:
        for full, abbr in HONORIFIC_ABBREV.items():
            name = name.replace(full, abbr)
        expanded.append(_clean_author_segment(name))

    # et al for 3+
    if len(expanded) >= 3:
        first = expanded[0]
        field = f'{first} et al'
    elif len(expanded) == 2:
        field = f'{expanded[0]}, {expanded[1]}'
    else:
        field = expanded[0]

    # Append role suffix
    if role in ('ed', 'comp', 'tr') and role:
        field = f'{field} {role}'

    return field


def invert_name(name: str) -> str:
    """
    Convert "Firstname Lastname" → "Lastname Firstname"
    Preserves hyphenated surnames.  If already inverted (detected by
    comma), strips the comma.  Org names and single-token names
    are returned unchanged.
    """
    # Already has comma → "Last, First" style — strip comma
    if ',' in name:
        parts = [p.strip() for p in name.split(',', 1)]
        return f'{parts[0]} {parts[1]}'

    tokens = name.split()
    if len(tokens) <= 1:
        return name   # single token: org name / pseudonym / Anonymous

    # Move last token to front (handles "Aleister Crowley" → "Crowley Aleister")
    # Hyphenated last names count as ONE token already in the string.
    # Detect: if second-to-last ends with a hyphen continuation, keep together.
    last = tokens[-1]
    rest = ' '.join(tokens[:-1])
    return f'{last} {rest}'


# ---------------------------------------------------------------------------
# Edition bracket builder (Section 4j / 4k)
# ---------------------------------------------------------------------------

def build_edition_bracket(edition_str: str) -> str:
    """
    Normalise raw edition text into bracket notation.
    Input examples: '6th Edition', 'Llewellyn', 'Facsimile', '1972', 'ca.1920'
    Returns '[...]' string or '' if nothing meaningful.
    """
    if not edition_str:
        return ''
    e = edition_str.strip()
    # Already wrapped
    if e.startswith('[') and e.endswith(']'):
        return e
    # Bare year → Reprint
    if re.fullmatch(r'\d{4}', e):
        return f'[Reprint {e}]'
    # ca.YYYY
    if re.fullmatch(r'ca\.\d{4}', e, re.IGNORECASE):
        return f'[{e}]'
    # Already contains 'Edition' → wrap as-is in title case
    if 'edition' in e.lower() or 'revised' in e.lower() or \
       'corrected' in e.lower() or 'facsimile' in e.lower() or \
       'reprint' in e.lower():
        return f'[{_title_case(e)}]'
    # Publisher name variant
    return f'[{e} Edition]'


# ---------------------------------------------------------------------------
# Filename assemblers  (Section 3)
# ---------------------------------------------------------------------------

def assemble_book_name(
    author_field: str,   # already inverted + role-tagged
    title: str,
    edition_bracket: str = '',
    translator_field: str = '',
    ext: str = '',
) -> str:
    """
    Pattern: Lastname Firstname--Title [Edition] tr Translator Lastname Firstname
    """
    title_part = _sanitize_field(title)
    if edition_bracket:
        title_part = f'{title_part} {edition_bracket}'
    if translator_field:
        title_part = f'{title_part} tr {translator_field}'

    name = f'{_sanitize_field(author_field)}--{title_part}'
    return name + ext


def assemble_grey_lit_name(
    title: str,
    author_field: str,   # already inverted + role-tagged
    date: str,           # YYYY | YYYY-MM | ca.YYYY | undated
    ext: str = '',
) -> str:
    """
    Pattern: Title--Lastname Firstname Date
    """
    author_date = f'{_sanitize_field(author_field)} {date}'.strip()
    name = f'{_sanitize_field(title)}--{author_date}'
    return name + ext


def assemble_media_name(title: str, date: str, ext: str = '') -> str:
    """
    Pattern: Title Date  (images, video, audio)
    """
    parts = [_sanitize_field(title)]
    if date:
        parts.append(date)
    return ' '.join(parts) + ext


def append_org_acronym(name: str, author_raw: str, ext: str) -> str:
    """
    If the author_raw matches an ORG_APPEND entry, add acronym before extension.
    The ext must already be stripped from name.
    """
    for org_name, acronym in ORG_APPEND.items():
        if org_name.lower() in author_raw.lower():
            return f'{name} {acronym}{ext}'
    return name + ext


# ---------------------------------------------------------------------------
# Filename collision resolver
# ---------------------------------------------------------------------------

def resolve_collision(dest_path: str) -> str:
    """
    If dest_path already exists, append (2), (3), ... before the extension
    until a free path is found.
    Example: foo.pdf -> foo (2).pdf -> foo (3).pdf
    """
    if not os.path.exists(dest_path):
        return dest_path
    stem, ext = os.path.splitext(dest_path)
    counter = 2
    while True:
        candidate = f"{stem} ({counter}){ext}"
        if not os.path.exists(candidate):
            return candidate
        counter += 1


# ---------------------------------------------------------------------------
# Content-type classifier
# ---------------------------------------------------------------------------

def classify_file(filepath: str) -> str:
    """
    Returns 'book' | 'grey_lit' | 'image' | 'video' | 'audio' | 'unknown'
    Grey-lit heuristic: PDF/EPUB in a folder whose name signals articles/essays.
    """
    ext = os.path.splitext(filepath)[1].lower()
    parent = os.path.basename(os.path.dirname(filepath)).lower()

    if ext in IMAGE_EXTENSIONS:
        return 'image'
    if ext in VIDEO_EXTENSIONS:
        return 'video'
    if ext in AUDIO_EXTENSIONS:
        return 'audio'
    if ext in BOOK_EXTENSIONS:
        if any(sig in parent for sig in GREY_LIT_FOLDER_SIGNALS):
            return 'grey_lit'
        return 'book'
    return 'unknown'


# ---------------------------------------------------------------------------
# Metadata extraction helpers
# ---------------------------------------------------------------------------

def _extract_pdf_meta(filepath: str) -> dict:
    """
    Extract title/author from PDF embedded metadata. Returns {} on failure.
    pypdf emits 'Ignoring wrong pointing object' and similar warnings to both
    the warnings system and directly to stderr; we suppress both.
    """
    try:
        from pypdf import PdfReader
        # Suppress Python warnings (e.g. DeprecationWarning from pypdf)
        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            # Redirect stderr to capture pypdf's direct print-style noise
            _old_stderr = sys.stderr
            sys.stderr = io.StringIO()
            try:
                reader = PdfReader(filepath, strict=False)
                meta = reader.metadata or {}
                result = {
                    'title':  (meta.title  or '').strip(),
                    'author': (meta.author or '').strip(),
                }
            finally:
                sys.stderr = _old_stderr
        return result
    except Exception:
        return {}


def _extract_epub_meta(filepath: str) -> dict:
    """Extract title/author from EPUB metadata. Returns {} on failure."""
    try:
        from ebooklib import epub
        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            _old_stderr = sys.stderr
            sys.stderr = io.StringIO()
            try:
                book = epub.read_epub(filepath)
                t = book.get_metadata('DC', 'title')
                a = book.get_metadata('DC', 'creator')
                result = {
                    'title':  (t[0][0] if t else '').strip(),
                    'author': (a[0][0] if a else '').strip(),
                }
            finally:
                sys.stderr = _old_stderr
        return result
    except Exception:
        return {}


def get_file_metadata(filepath: str) -> dict:
    """
    Returns dict with keys: title, author, date, publisher, edition.
    Prefers metadata_handler.read_metadata() (exiftool + EPUB OPF parser).
    Falls back to internal pypdf reader if metadata_handler is unavailable.
    Falls back to filename stem if all metadata is absent.
    """
    stem = os.path.splitext(os.path.basename(filepath))[0]
    ext  = os.path.splitext(filepath)[1].lower()

    # ── Primary: full metadata_handler (exiftool + OPF) ──
    try:
        from metadata_handler import read_metadata
        xmp = read_metadata(filepath)
        title     = xmp.get('title',     '').strip()
        # metadata_handler uses 'creator' for author
        author    = xmp.get('creator',   '').strip()
        date      = xmp.get('date',      '').strip()
        publisher = xmp.get('publisher', '').strip()
        # No standard 'edition' XMP field; check description for "Edition:" prefix
        desc      = xmp.get('description', '').strip()
        edition   = ''
        for part in desc.split(';'):
            part = part.strip()
            if part.lower().startswith('edition:'):
                edition = part[len('edition:'):].strip()
                break
        if title or author:
            return {
                'title':     title or stem,
                'author':    author or 'Unknown Author',
                'date':      date,
                'publisher': publisher,
                'edition':   edition,
            }
    except Exception:
        pass

    # ── Fallback: internal pypdf / ebooklib readers ──
    meta = {}
    if ext == '.pdf':
        meta = _extract_pdf_meta(filepath)
    elif ext == '.epub':
        meta = _extract_epub_meta(filepath)

    return {
        'title':     meta.get('title',     '').strip() or stem,
        'author':    meta.get('author',    '').strip() or 'Unknown Author',
        'date':      meta.get('date',      '').strip(),
        'publisher': meta.get('publisher', '').strip(),
        'edition':   meta.get('edition',   '').strip(),
    }


# ---------------------------------------------------------------------------
# Filename builder: top-level dispatcher
# ---------------------------------------------------------------------------

def build_filename(filepath: str, meta: Optional[dict] = None) -> str:
    """
    Given a file path (and optionally pre-fetched metadata),
    return the correctly formatted filename stem + extension
    per the naming convention.

    meta keys used: title, author, date, publisher, edition,
                    role ('ed'|'comp'|'tr'|''), authors (list override),
                    translator (str), is_grey_lit (bool override)
    """
    ext = os.path.splitext(filepath)[1].lower()

    if meta is None:
        meta = get_file_metadata(filepath)

    content_type = classify_file(filepath)
    if meta.get('is_grey_lit'):
        content_type = 'grey_lit'

    title     = _title_case(meta.get('title', 'Untitled').strip())
    raw_author = meta.get('author', 'Unknown Author').strip()
    date      = meta.get('date', '').strip()
    edition   = meta.get('edition', '').strip()
    role      = meta.get('role', '').strip()          # 'ed', 'comp', 'tr', ''
    translator = meta.get('translator', '').strip()
    # authors list lets caller pass multiple authors; falls back to raw_author
    authors_list = meta.get('authors', [raw_author] if raw_author else ['Unknown Author'])

    # ----- Build author field -----
    # Check for organisational author (no inversion)
    is_org = any(
        org.lower() in raw_author.lower() for org in ORG_APPEND
    ) or (len(raw_author.split()) > 4 and ',' not in raw_author)

    if is_org:
        author_field = _sanitize_field(raw_author)
        if role:
            author_field = f'{author_field} {role}'
    else:
        # Invert each personal name, then recombine for 2-author case
        inverted = [invert_name(n) for n in authors_list]
        author_field = build_author_field(inverted, role=role)

    # ----- Edition bracket -----
    edition_bracket = build_edition_bracket(edition) if edition else ''

    # ----- Translator field -----
    tr_field = ''
    if translator:
        tr_inverted = invert_name(translator)
        tr_field    = _sanitize_field(tr_inverted)

    # ----- Assemble by type -----
    if content_type in ('image', 'video', 'audio'):
        stem = assemble_media_name(title, date)
    elif content_type == 'grey_lit':
        date_str = date or 'undated'
        stem = assemble_grey_lit_name(title, author_field, date_str)
    else:
        # book (default)
        stem = assemble_book_name(
            author_field, title, edition_bracket, tr_field
        )

    # ----- Org acronym append -----
    # Rebuild with ext so append_org_acronym can insert before extension
    full = append_org_acronym(stem, raw_author, ext)

    # Final sanitise: ensure no double-dash sequences from sanitize_field
    # (the '--' separator is intentional; collapse only unintentional '--')
    # Strategy: protect intentional '--' then collapse accidental ones
    full = re.sub(r'---+', '--', full)

    # Max filename length guard (255 bytes on most FS)
    if len(full.encode('utf-8')) > 240:
        stem_part, ext_part = os.path.splitext(full)
        full = stem_part[:200].rstrip() + '...' + ext_part

    return full


# ---------------------------------------------------------------------------
# Destination folder builder (Sections 2a / 2b)
# ---------------------------------------------------------------------------

def build_dest_folder(dest_root: str, content_type: str, author_field: str) -> str:
    """
    Returns the destination directory path.
    Books → dest_root / Author Folder
    Media → dest_root / Media type folder  (Images / Video / Audio)
    """
    if content_type == 'image':
        return os.path.join(dest_root, 'Images')
    if content_type == 'video':
        return os.path.join(dest_root, 'Video')
    if content_type == 'audio':
        return os.path.join(dest_root, 'Audio')

    # Books and grey lit: folder = "Firstname Lastname" (natural order, Section 2b)
    # author_field is in "Lastname Firstname" form → re-invert for folder
    folder_name = _author_field_to_folder(author_field)
    folder_name = _sanitize_field(folder_name)
    return os.path.join(dest_root, folder_name)


def _author_field_to_folder(author_field: str) -> str:
    """
    Convert "Lastname Firstname" → "Firstname Lastname" for folder naming.
    Handles et al, ed/comp/tr suffixes, Anonymous, org names.
    """
    # Strip role suffixes
    field = re.sub(r'\s+(ed|comp|tr)$', '', author_field.strip())

    # et al → use full field as folder label
    if 'et al' in field:
        first = field.split(' et al')[0].strip()
        # invert that first name back to natural
        return invert_name(first) + ' et al'

    # Comma-separated two authors: use first
    if ',' in field:
        field = field.split(',')[0].strip()

    # Anonymous / org names (more than 4 words → org)
    if field == 'Anonymous':
        return 'Anonymous'

    tokens = field.split()
    if len(tokens) <= 1:
        return field  # single token org or pseudonym

    # Invert "Lastname Firstname" → "Firstname Lastname"
    return f'{" ".join(tokens[1:])} {tokens[0]}'


# ---------------------------------------------------------------------------
# Main entry point (continued from above)
# ---------------------------------------------------------------------------

IGNORE_FILES = {'.DS_Store', 'Thumbs.db', 'desktop.ini', 'config.json'}
SKIP_DIRS    = {'_DuplicateHoldingBin', 'Organized_Books', '.git', '__pycache__'}

ALL_SUPPORTED_EXTENSIONS = (
    BOOK_EXTENSIONS | IMAGE_EXTENSIONS | VIDEO_EXTENSIONS | AUDIO_EXTENSIONS
)


def _build_author_field_for_file(meta: dict) -> str:
    """Derive the normalised author_field string from a metadata dict."""
    raw_author   = meta.get('author', 'Unknown Author')
    authors_list = meta.get('authors', [raw_author])
    role         = meta.get('role', '')
    is_org       = any(org.lower() in raw_author.lower() for org in ORG_APPEND)
    if is_org:
        field = _sanitize_field(raw_author)
        if role:
            field += f' {role}'
        return field
    inverted = [invert_name(n) for n in authors_list]
    return build_author_field(inverted, role=role)


def organize_library(
    source_folder: Optional[str] = None,
    dest_root: Optional[str] = None,
    dry_run: bool = False,
    progress_callback=None,
    stop_event: Optional[threading.Event] = None,
) -> dict:
    """
    Two-pass library organizer (naming convention v1.2).

    Pass 1 — Collect: walk source_folder, read metadata, build planned moves.
              Count files per author_field.
    Pass 2 — Move: for each planned file, place it in an author subfolder only
              if that author has 2+ files; otherwise drop it flat in dest_root.

    stop_event: optional threading.Event; when set, both passes abort cleanly.

    Returns summary dict: {moved, skipped, errors}.
    """
    try:
        from config import DEFAULT_TARGET_FOLDER, ORGANIZER_DEST_SUBFOLDER
    except ImportError:
        DEFAULT_TARGET_FOLDER    = ''
        ORGANIZER_DEST_SUBFOLDER = 'Organized_Books'

    if source_folder is None:
        source_folder = DEFAULT_TARGET_FOLDER

    if not source_folder or not os.path.exists(source_folder):
        msg = f'ERROR: Source folder not found: {source_folder!r}'
        if progress_callback:
            progress_callback(msg)
        return {'moved': 0, 'skipped': 0, 'errors': 0, 'error': msg}

    if dest_root is None:
        dest_root = os.path.join(source_folder, ORGANIZER_DEST_SUBFOLDER)

    def log(msg):
        if progress_callback:
            progress_callback(msg)
        else:
            print(msg)

    log('--- Library Organizer (naming convention v1.2) ---')
    log(f'Source : {source_folder}')
    log(f'Dest   : {dest_root}')
    log(f'Mode   : {"DRY RUN" if dry_run else "LIVE"}')
    log('--------------------------------------------------')

    if not dry_run:
        os.makedirs(dest_root, exist_ok=True)

    abs_dest = os.path.abspath(dest_root)

    # ── Pass 1: collect all planned moves ────────────────────────────────────
    log('Pass 1: scanning and reading metadata...')
    planned   = []   # list of dicts: src_path, new_name, ctype, author_field
    skipped   = 0
    errors    = 0
    author_counts = {}   # author_field -> count of files

    cancelled = False
    for root, dirs, files in os.walk(source_folder):
        if stop_event and stop_event.is_set():
            cancelled = True
            break
        dirs[:] = [
            d for d in dirs
            if d not in SKIP_DIRS
            and os.path.abspath(os.path.join(root, d)) != abs_dest
        ]
        for filename in files:
            if stop_event and stop_event.is_set():
                cancelled = True
                break
            if filename in IGNORE_FILES:
                continue
            ext = os.path.splitext(filename)[1].lower()
            if ext not in ALL_SUPPORTED_EXTENSIONS:
                skipped += 1
                continue

            src_path = os.path.join(root, filename)
            try:
                meta         = get_file_metadata(src_path)
                new_name     = build_filename(src_path, meta)
                ctype        = classify_file(src_path)
                author_field = _build_author_field_for_file(meta)

                planned.append({
                    'src_path':     src_path,
                    'new_name':     new_name,
                    'ctype':        ctype,
                    'author_field': author_field,
                })

                # Count per author for book/grey_lit only (media goes to type folder)
                if ctype in ('book', 'grey_lit'):
                    author_counts[author_field] = author_counts.get(author_field, 0) + 1

            except Exception as e:
                log(f'  SCAN ERROR on {filename!r}: {e}')
                errors += 1
        if cancelled:
            break

    if cancelled:
        log('*** CANCELLED by user during Pass 1 — no files were moved.')
        return {'moved': 0, 'skipped': skipped, 'errors': errors, 'cancelled': True}

    log(f'  Found {len(planned)} files to organise ({skipped} skipped).')

    # ── Pass 2: move files ────────────────────────────────────────────────────
    log('Pass 2: moving files...')
    moved = 0

    for item in planned:
        if stop_event and stop_event.is_set():
            log(f'*** CANCELLED by user during Pass 2 — {moved} files moved before stop.')
            break

        src_path     = item['src_path']
        new_name     = item['new_name']
        ctype        = item['ctype']
        author_field = item['author_field']

        try:
            # Determine destination folder
            if ctype in ('image', 'video', 'audio'):
                # Media always goes to type subfolder
                dest_folder = build_dest_folder(dest_root, ctype, author_field)
            elif author_counts.get(author_field, 0) >= 2:
                # 2+ files by this author → author subfolder
                dest_folder = build_dest_folder(dest_root, ctype, author_field)
            else:
                # Solo file → flat in dest_root
                dest_folder = dest_root

            dest_path = resolve_collision(os.path.join(dest_folder, new_name))

            if os.path.abspath(src_path) == os.path.abspath(dest_path):
                skipped += 1
                continue

            log(f'  {os.path.basename(src_path)}')
            log(f'    -> {os.path.relpath(dest_path, dest_root)}')

            if not dry_run:
                os.makedirs(dest_folder, exist_ok=True)
                shutil.move(src_path, dest_path)

            moved += 1

        except Exception as e:
            log(f'  MOVE ERROR on {os.path.basename(src_path)!r}: {e}')
            errors += 1

    log('--------------------------------------------------')
    log(f'Done. Moved: {moved}  Skipped: {skipped}  Errors: {errors}')
    return {'moved': moved, 'skipped': skipped, 'errors': errors}


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------
if __name__ == '__main__':
    import sys
    dry = '--dry-run' in sys.argv
    folder = next((a for a in sys.argv[1:] if not a.startswith('--')), None)
    organize_library(source_folder=folder, dry_run=dry)
