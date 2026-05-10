"""
dedupe.py — Data Librarian
===========================
SHA-256 duplicate detection with keeper scoring and persistent index support.

Index modes (handled by library_index.py):
  PERSISTENT — scan path is inside LIBRARY_MOUNT_PATH (the NAS).
               Hashes are cached in ~/.librarian/library_index.db.
               Only new/changed files are re-hashed on subsequent runs.
  EPHEMERAL  — all other paths (iCloud staging, etc.).
               Hashes are computed fresh each run, nothing is stored.

Keeper scoring (higher = keep this copy):
  +1 per directory level below the scan root   (deeper = more organised)
  +3 if not a direct child of the scan root
  +5 if filename has no noise patterns          (clean name)
  +1 if extension is in DEDUPE_PREFERRED_EXTENSIONS

Tie-break: shorter absolute path wins.
Library root always beats intake/secondary root regardless of score.

Entry point: run_dedupe(scan_dir, secondary_dir, stop_event, progress_callback, ...)
"""

import os
import re
import shutil
import threading
from typing import Optional

from utils import calculate_sha256, sanitize_filename
import library_index as idx

# Noise patterns used to score filename cleanliness
_NOISE_PATTERNS = [
    re.compile(r'\b[a-f0-9]{32}\b', re.IGNORECASE),          # MD5 hash
    re.compile(r'\b97[89]\d{10}\b'),                           # ISBN-13
    re.compile(r' -- '),                                        # Anna's Archive spaced delimiters
    re.compile(r'^[a-z0-9\-]+\.[a-z]{2,4}[_\-]', re.IGNORECASE),  # site prefix
    re.compile(r'^\d{5,}-'),                                   # leading numeric ID
]

# Commit the index to disk every N files hashed
_COMMIT_EVERY = 200


def _is_noisy(filename: str) -> bool:
    """Return True if filename contains Anna's Archive / download noise."""
    stem = os.path.splitext(filename)[0]
    return any(p.search(stem) for p in _NOISE_PATTERNS)


def _path_depth(filepath: str, root: str) -> int:
    """Number of directory levels between root and filepath."""
    rel = os.path.relpath(os.path.dirname(filepath), root)
    if rel == '.':
        return 0
    return len(rel.split(os.sep))


def score_file(filepath: str, root: str, preferred_extensions: list) -> int:
    """
    Score a file path — higher score = better copy to keep.
    root: the scan root this file belongs to (for depth calculation).
    """
    score = 0
    filename = os.path.basename(filepath)
    ext = os.path.splitext(filename)[1].lower()
    depth = _path_depth(filepath, root)

    score += depth          # +1 per directory level below root

    if depth > 0:
        score += 3          # +3 if not dumped at root level

    if not _is_noisy(filename):
        score += 5          # +5 if filename is clean

    if ext in preferred_extensions:
        score += 1          # +1 for preferred extension

    return score


def _pick_keeper(path_a: str, root_a: str, path_b: str, root_b: str,
                 library_root: str, preferred_extensions: list) -> tuple:
    """
    Given two copies of the same file, return (keeper_path, discard_path, reason).
    library_root: the primary/library root — files here always win over intake.
    """
    # Library root always beats intake root
    a_in_library = os.path.abspath(path_a).startswith(os.path.abspath(library_root))
    b_in_library = os.path.abspath(path_b).startswith(os.path.abspath(library_root))

    if a_in_library and not b_in_library:
        return path_a, path_b, 'library root wins over intake'
    if b_in_library and not a_in_library:
        return path_b, path_a, 'library root wins over intake'

    score_a = score_file(path_a, root_a, preferred_extensions)
    score_b = score_file(path_b, root_b, preferred_extensions)

    if score_a > score_b:
        return path_a, path_b, f'score {score_a} vs {score_b}'
    if score_b > score_a:
        return path_b, path_a, f'score {score_b} vs {score_a}'

    # Tie-break: shorter absolute path (proxy for "already organised")
    if len(path_a) <= len(path_b):
        return path_a, path_b, f'tie-break: shorter path (scores equal at {score_a})'
    return path_b, path_a, f'tie-break: shorter path (scores equal at {score_b})'


def _walk_folder(folder: str, excluded_folders: list,
                 excluded_files: set) -> list:
    """Return list of (filepath, root) tuples from folder, respecting exclusions."""
    results = []
    abs_folder = os.path.abspath(folder)
    for root, dirs, files in os.walk(folder):
        dirs[:] = [d for d in dirs if d not in excluded_folders]
        for filename in files:
            if filename in excluded_files:
                continue
            results.append((os.path.join(root, filename), abs_folder))
    return results


def run_dedupe(
    scan_dir: str,
    secondary_dir: str = '',
    move_duplicates: bool = False,
    use_keeper_scoring: bool = True,
    preferred_extensions: list = None,
    excluded_folders: list = None,
    excluded_files: set = None,
    stop_event: Optional[threading.Event] = None,
    progress_callback=None,
) -> dict:
    """
    Scan scan_dir (and optionally secondary_dir) for SHA-256 duplicates.

    Uses persistent index when scan_dir is inside LIBRARY_MOUNT_PATH,
    otherwise uses ephemeral (in-memory only) hashing.

    Returns summary dict:
        {files_processed, duplicates_found, files_moved, errors,
         log_lines, cancelled, cache_hits, files_hashed}

    progress_callback(str): called with each log line as work proceeds.
    stop_event: threading.Event — set it to cancel the scan gracefully.
    """
    if preferred_extensions is None:
        preferred_extensions = ['.pdf', '.epub']
    if excluded_folders is None:
        excluded_folders = ['_DuplicateHoldingBin', 'Organized_Books']
    if excluded_files is None:
        excluded_files = set()

    log_lines = []

    def log(msg: str):
        log_lines.append(msg)
        if progress_callback:
            progress_callback(msg)

    def cancelled() -> bool:
        return stop_event is not None and stop_event.is_set()

    if not scan_dir or not os.path.exists(scan_dir):
        msg = f'ERROR: Scan folder not found: {scan_dir!r}'
        log(msg)
        return {'files_processed': 0, 'duplicates_found': 0,
                'files_moved': 0, 'errors': 1, 'log_lines': log_lines,
                'cancelled': False, 'cache_hits': 0, 'files_hashed': 0}

    holding_dir = os.path.join(scan_dir, '_DuplicateHoldingBin')
    os.makedirs(holding_dir, exist_ok=True)

    # Open index (persistent or ephemeral)
    db_conn, is_persistent = idx.open_index(scan_dir)
    stats = idx.index_stats(db_conn)

    log(f'DEDUPE START')
    log(f'Primary root : {scan_dir}')
    if secondary_dir and os.path.exists(secondary_dir):
        log(f'Secondary    : {secondary_dir}')
    log(f'Mode         : {"LIVE – moving duplicates" if move_duplicates else "DRY RUN"}')
    log(f'Keeper logic : {"Scoring" if use_keeper_scoring else "First-seen (legacy)"}')
    log(f'Index mode   : {"Persistent (NAS)" if is_persistent else "Ephemeral"}')
    if is_persistent:
        log(f'Index entries: {stats["entries"]:,} files already indexed')
    log('-' * 70)

    # Build unified file list
    all_files = _walk_folder(scan_dir, excluded_folders, excluded_files)
    if secondary_dir and os.path.exists(secondary_dir):
        all_files += _walk_folder(secondary_dir, excluded_folders, excluded_files)

    log(f'Total files to scan: {len(all_files):,}')

    # Hash pass
    hash_map = {}   # sha256 -> (filepath, root)
    files_processed = 0
    duplicates_found = 0
    files_moved = 0
    errors = 0
    cache_hits = 0
    files_hashed = 0
    hashed_since_commit = 0

    for filepath, file_root in all_files:
        if cancelled():
            log(f'\n⚠ CANCELLED by user after processing {files_processed:,} files.')
            idx.batch_commit(db_conn)
            idx.close_index(db_conn, scan_dir)
            return {
                'files_processed': files_processed,
                'duplicates_found': duplicates_found,
                'files_moved': files_moved,
                'errors': errors,
                'log_lines': log_lines,
                'cancelled': True,
                'cache_hits': cache_hits,
                'files_hashed': files_hashed,
            }

        # Try cache first
        file_hash = idx.get_cached_hash(filepath, db_conn)
        if file_hash is not None:
            cache_hits += 1
        else:
            file_hash = calculate_sha256(filepath)
            if file_hash is None:
                errors += 1
                continue
            idx.update_hash(filepath, file_hash, db_conn)
            files_hashed += 1
            hashed_since_commit += 1

            # Periodic commit to avoid large transactions
            if hashed_since_commit >= _COMMIT_EVERY:
                idx.batch_commit(db_conn)
                hashed_since_commit = 0

        files_processed += 1

        if file_hash not in hash_map:
            hash_map[file_hash] = (filepath, file_root)
            continue

        # Duplicate found
        duplicates_found += 1
        existing_path, existing_root = hash_map[file_hash]

        if use_keeper_scoring:
            keeper, discard, reason = _pick_keeper(
                existing_path, existing_root,
                filepath, file_root,
                scan_dir, preferred_extensions
            )
        else:
            keeper, discard, reason = existing_path, filepath, 'first-seen (legacy)'

        # Always update map to point at the keeper
        hash_map[file_hash] = (keeper,
                               existing_root if keeper == existing_path else file_root)

        discard_name = os.path.basename(discard)
        sanitized    = sanitize_filename(discard_name)
        dest_path    = os.path.join(holding_dir, sanitized)

        log(f'\nDUPLICATE FOUND:')
        log(f'  Keep   : {keeper}')
        log(f'  Discard: {discard}')
        log(f'  Reason : {reason}')

        if move_duplicates:
            try:
                if os.path.exists(discard):
                    shutil.move(discard, dest_path)
                    log(f'  Moved to: {dest_path}')
                    files_moved += 1
                else:
                    log(f'  WARNING: discard file already gone: {discard}')
            except (OSError, IOError) as e:
                log(f'  ERROR moving {discard_name!r}: {e}')
                errors += 1
        else:
            log(f'  [DRY RUN — not moved]')

    # Final commit and index cleanup
    idx.batch_commit(db_conn)
    idx.close_index(db_conn, scan_dir)

    log('\n' + '-' * 70)
    log(f'Files scanned   : {files_processed:,}')
    if is_persistent:
        log(f'  Cache hits    : {cache_hits:,}  (skipped re-hashing)')
        log(f'  Newly hashed  : {files_hashed:,}')
    log(f'Duplicates found: {duplicates_found:,}')
    log(f'Files moved     : {files_moved:,}')
    log(f'Errors          : {errors:,}')

    return {
        'files_processed': files_processed,
        'duplicates_found': duplicates_found,
        'files_moved': files_moved,
        'errors': errors,
        'log_lines': log_lines,
        'cancelled': False,
        'cache_hits': cache_hits,
        'files_hashed': files_hashed,
    }
