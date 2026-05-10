"""
File Name Cleaner for The Data Librarian.
Cleans and normalizes filenames using Title Enhanced (NYT) case rules.

Gap 1 addition: extract_filename_metadata() parses structured data embedded
in Anna's Archive and similar filenames BEFORE cleaning wipes them.
Extracted fields are written to XMP metadata (gaps only) via metadata_handler.
"""

import os
import re
import json
from datetime import datetime

# --- Title Enhanced Case Configuration ---
LOWERCASE_WORDS = {
    'a', 'an', 'and', 'as', 'at', 'but', 'by', 'en', 'for',
    'if', 'in', 'is', 'nor', 'of', 'on', 'or', 'so', 'the',
    'to', 'vs', 'yet', 'with', 'from'
}

# --- Patterns to strip from filenames ---
SITE_PREFIX_PATTERN    = re.compile(r'^[a-z0-9\-]+\.[a-z]{2,4}[_\-]', re.IGNORECASE)
NUMERIC_ID_PATTERN     = re.compile(r'^\d{5,}-')
HASH_PATTERN           = re.compile(r'\b[a-f0-9]{16,}\b', re.IGNORECASE)
TRAILING_SOURCE_PATTERN = re.compile(r'\s*--\s*.+$')
TRAILING_NUMERIC_PATTERN = re.compile(r'[\-_]\d{5,}[\-_]?\d*$')

# --- Gap 1: extraction patterns ---

# ISBN-13 (978/979 prefix) or ISBN-10
_ISBN13_RE  = re.compile(r'\b(97[89]\d{10})\b')
_ISBN10_RE  = re.compile(r'\b(\d{9}[\dXx])\b')

# Anna's Archive MD5-like hash: exactly 32 hex chars
_ARCHIVE_HASH_RE = re.compile(r'\b([a-f0-9]{32})\b', re.IGNORECASE)

# Year: 4-digit between 1800 and current year, preferably inside -- delimiters
_current_year = datetime.now().year
_YEAR_DELIM_RE = re.compile(r'--\s*(\d{4})\s*(?:;?\s*\d{4}\s*)*--')
_YEAR_BARE_RE  = re.compile(r'\b((?:18|19|20)\d{2})\b')

# Anna's Archive segment delimiter
_SEGMENT_RE = re.compile(r'--')

# Edition strings
_EDITION_RE = re.compile(
    r'\b((?:(?:first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|'
    r'\d+(?:st|nd|rd|th))\s+)?'
    r'(?:ed(?:ition)?|revised|corrected|facsimile|reprint)(?:\s+\d{4})?)\b',
    re.IGNORECASE
)

# Known site prefixes (order matters — longer matches first)
_SITE_PREFIXES = [
    "annas-arch", "anna's archive", "annasarchive",
    "dokumen.pub", "libgen", "z-lib", "zlibrary",
    "welib.org", "pdfdrive", "sci-hub", "b-ok",
]

def _extract_year(text: str) -> str:
    """Extract best year candidate from raw text."""
    m = _YEAR_DELIM_RE.search(text)
    if m:
        y = int(m.group(1))
        if 1800 <= y <= _current_year:
            return m.group(1)
    for m in _YEAR_BARE_RE.finditer(text):
        y = int(m.group(1))
        if 1800 <= y <= _current_year:
            return m.group(1)
    return ''


def _extract_source_site(text: str) -> str:
    """Return matched site prefix if found in text."""
    lower = text.lower()
    for site in _SITE_PREFIXES:
        if site in lower:
            return site
    return ''


def extract_filename_metadata(filename: str) -> dict:
    """
    Parse structured data embedded in a raw (pre-clean) filename.
    Returns a dict with keys:
        isbn, year, author_raw, publisher_raw, source_site,
        archive_hash, edition
    All values are strings (empty string if not found).

    Designed for Anna's Archive filenames of the form:
        Title -- Author -- Publisher -- isbn13 XXXXXXXXX -- HASH -- Anna's Archive.ext
    but degrades gracefully on any noisy filename.
    """
    stem = os.path.splitext(filename)[0]
    result = {
        'isbn':          '',
        'year':          '',
        'author_raw':    '',
        'publisher_raw': '',
        'source_site':   '',
        'archive_hash':  '',
        'edition':       '',
    }

    # --- ISBN ---
    m13 = _ISBN13_RE.search(stem)
    if m13:
        result['isbn'] = m13.group(1)
    else:
        m10 = _ISBN10_RE.search(stem)
        if m10:
            result['isbn'] = m10.group(1)

    # --- Archive hash (32-char hex, not the ISBN) ---
    for m in _ARCHIVE_HASH_RE.finditer(stem):
        candidate = m.group(1)
        # exclude ISBN digits masquerading as hex
        if candidate != result['isbn']:
            result['archive_hash'] = candidate
            break

    # --- Source site ---
    result['source_site'] = _extract_source_site(stem)

    # --- Year ---
    result['year'] = _extract_year(stem)

    # --- Edition ---
    m_ed = _EDITION_RE.search(stem)
    if m_ed:
        result['edition'] = m_ed.group(1).strip()

    # --- Segment parsing: split on '--' to find author / publisher ---
    # Anna's Archive pattern:
    #   [0] Title
    #   [1] Author (Lastname, Firstname or natural order)
    #   [2] Publisher or series info
    #   [3+] isbn / hash / source tags
    segments = [s.strip() for s in _SEGMENT_RE.split(stem)]

    # Filter out segments that are clearly not author/publisher:
    # numeric-only, hashes, isbn strings, source tags
    def _is_data_segment(seg: str) -> bool:
        if not seg:
            return False
        if _ISBN13_RE.search(seg) or _ISBN10_RE.search(seg):
            return False
        if _ARCHIVE_HASH_RE.fullmatch(seg):
            return False
        if _extract_source_site(seg):
            return False
        # pure numeric
        if re.fullmatch(r'[\d\s\-;]+', seg):
            return False
        return True

    text_segments = [s for s in segments if _is_data_segment(s)]

    # Segment 0 is the title (skip it).
    # Segment 1 → author_raw if it looks like a person name (has comma or 1–4 words)
    # Segment 2 → publisher_raw
    if len(text_segments) >= 2:
        candidate_author = text_segments[1]
        # Heuristic: author segments tend to be short (< 60 chars) and
        # contain a comma (Lastname, Firstname) or 1–4 capitalised words
        word_count = len(candidate_author.split())
        if word_count <= 6 and len(candidate_author) < 80:
            result['author_raw'] = candidate_author
            if len(text_segments) >= 3:
                result['publisher_raw'] = text_segments[2]
        else:
            # Likely a subtitle or series — treat next segment as publisher
            if len(text_segments) >= 3:
                result['publisher_raw'] = text_segments[2]

    return result


def _map_extracted_to_xmp(extracted: dict) -> dict:
    """
    Map extract_filename_metadata() output to metadata_handler field names.
    Only returns fields that have a non-empty value.
    """
    xmp = {}
    if extracted.get('isbn'):
        # Store ISBN in description if no better field; also in subject tag
        xmp['description'] = f"ISBN: {extracted['isbn']}"
        xmp['subject'] = [f"ISBN:{extracted['isbn']}"]
    if extracted.get('year'):
        xmp['date'] = extracted['year']
    if extracted.get('author_raw'):
        xmp['creator'] = extracted['author_raw']
    if extracted.get('publisher_raw'):
        xmp['publisher'] = extracted['publisher_raw']
    if extracted.get('edition'):
        # No standard XMP field for edition — store in description suffix
        existing = xmp.get('description', '')
        suffix = f"Edition: {extracted['edition']}"
        xmp['description'] = f"{existing}; {suffix}".lstrip('; ') if existing else suffix
    return xmp


def write_extracted_metadata(filepath: str, extracted: dict) -> tuple:
    """
    Write extracted filename metadata into the file's XMP, filling gaps only.
    Never overwrites a field that already has a value.
    Returns (success: bool, message: str).
    """
    try:
        from metadata_handler import read_metadata, write_metadata
    except ImportError:
        return False, 'metadata_handler not available — skipping XMP write'

    existing = read_metadata(filepath)
    candidate = _map_extracted_to_xmp(extracted)

    to_write = {}
    for field, value in candidate.items():
        existing_val = existing.get(field)
        # Skip if already populated
        if field == 'subject':
            if existing_val:  # non-empty list
                continue
            to_write[field] = value
        else:
            if existing_val and str(existing_val).strip():
                continue
            to_write[field] = value

    if not to_write:
        return True, 'No gaps to fill — existing metadata intact'

    return write_metadata(filepath, to_write)


def load_cleaner_config():
    """Load cleaner settings from config.json."""
    config_path = os.path.join(os.path.dirname(__file__), 'config.json')
    defaults = {
        'excluded_extensions': [".py", ".json", ".html", ".txt", ".sh"],
        'excluded_dirs':       ["_DuplicateHoldingBin", "Organized_Books"],
        'extract_metadata':    True,
        'metadata_fields':     ["isbn", "year", "author_raw", "publisher_raw",
                                "source_site", "archive_hash", "edition"],
    }
    try:
        with open(config_path, 'r') as f:
            data = json.load(f)
        return {
            'excluded_extensions': data.get("CLEANER_EXCLUDED_EXTENSIONS", defaults['excluded_extensions']),
            'excluded_dirs':       data.get("CLEANER_EXCLUDED_DIRS",        defaults['excluded_dirs']),
            'extract_metadata':    data.get("CLEANER_EXTRACT_METADATA_BEFORE_RENAME", defaults['extract_metadata']),
            'metadata_fields':     data.get("CLEANER_METADATA_FIELDS_TO_EXTRACT",     defaults['metadata_fields']),
        }
    except Exception as e:
        print(f"Warning: Could not load cleaner config: {e}. Using defaults.")
        return defaults


def apply_title_enhanced_case(name):
    """
    Applies Title Enhanced (NYT) case rules to a filename stem.
    """
    words = name.split()
    if not words:
        return name
    result = []
    for i, word in enumerate(words):
        is_first = (i == 0)
        is_last  = (i == len(words) - 1)
        lower = word.lower()
        if is_first or is_last:
            result.append(word.capitalize())
        elif lower in LOWERCASE_WORDS:
            result.append(lower)
        else:
            result.append(word.capitalize())
    return ' '.join(result)


def clean_filename(filename):
    """
    Applies all cleaning rules to a single filename.
    Returns the cleaned filename.
    """
    stem, ext = os.path.splitext(filename)

    stem = SITE_PREFIX_PATTERN.sub('', stem)
    stem = NUMERIC_ID_PATTERN.sub('', stem)
    stem = TRAILING_SOURCE_PATTERN.sub('', stem)
    stem = TRAILING_NUMERIC_PATTERN.sub('', stem)
    stem = HASH_PATTERN.sub('', stem)
    stem = re.sub(r'[\s_]+\w*\.{2,}.*$', '', stem).strip()
    stem = stem.replace('-', ' ').replace('_', ' ')
    stem = apply_title_enhanced_case(stem)

    return stem + ext


def preview_renames(target_folder, extract_metadata=None):
    """
    Walks target_folder and returns a list of (original_path, new_name, extracted_meta)
    tuples for files whose names would change. Does NOT rename or write anything.
    extract_metadata: override config flag (None = use config).
    """
    cfg = load_cleaner_config()
    excluded_extensions = cfg['excluded_extensions']
    excluded_dirs       = cfg['excluded_dirs']
    do_extract          = extract_metadata if extract_metadata is not None else cfg['extract_metadata']

    results = []
    for root, dirs, files in os.walk(target_folder):
        dirs[:] = [d for d in dirs if d not in excluded_dirs]
        for filename in files:
            _, ext = os.path.splitext(filename)
            if ext.lower() in excluded_extensions:
                continue
            extracted = extract_filename_metadata(filename) if do_extract else {}
            cleaned   = clean_filename(filename)
            if cleaned != filename or (do_extract and any(extracted.values())):
                original_path = os.path.join(root, filename)
                results.append((original_path, cleaned, extracted))

    return results


def commit_renames(rename_list, write_xmp=None):
    """
    Applies the renames from a preview_renames() result.
    For each file, if write_xmp is True (or config says so):
        1. Extract metadata from original filename
        2. Write extracted fields to XMP (gaps only)
        3. Rename file
    Returns (success_count, error_list).
    """
    cfg = load_cleaner_config()
    do_write_xmp = write_xmp if write_xmp is not None else cfg['extract_metadata']

    success_count = 0
    error_list    = []

    for entry in rename_list:
        # Support both old 2-tuple and new 3-tuple from preview_renames
        if len(entry) == 3:
            original_path, new_name, extracted = entry
        else:
            original_path, new_name = entry
            extracted = extract_filename_metadata(os.path.basename(original_path))

        directory = os.path.dirname(original_path)
        new_path  = os.path.join(directory, new_name)

        try:
            # Step 1: write XMP gaps before renaming
            if do_write_xmp and any(extracted.values()):
                ok, msg = write_extracted_metadata(original_path, extracted)
                if not ok:
                    print(f"  XMP write warning for {os.path.basename(original_path)!r}: {msg}")

            # Step 2: rename
            os.rename(original_path, new_path)
            success_count += 1

        except Exception as e:
            error_list.append((original_path, str(e)))

    return success_count, error_list
