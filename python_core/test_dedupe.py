"""
test_dedupe.py — Validation suite for Gap 2: keeper scoring logic.
Tests score_file(), _pick_keeper(), and run_dedupe() against a temp library.
Run: python3 test_dedupe.py
"""

import sys
import os
import tempfile
import shutil
import hashlib

sys.path.insert(0, os.path.dirname(__file__))

from dedupe import score_file, _pick_keeper, _is_noisy, run_dedupe

PASS = 0
FAIL = 0

def check(label, got, expected):
    global PASS, FAIL
    if got == expected:
        print(f"  PASS  {label}")
        PASS += 1
    else:
        print(f"  FAIL  {label}")
        print(f"        expected: {expected!r}")
        print(f"        got:      {got!r}")
        FAIL += 1

def check_true(label, condition):
    global PASS, FAIL
    if condition:
        print(f"  PASS  {label}")
        PASS += 1
    else:
        print(f"  FAIL  {label}")
        FAIL += 1

# ── _is_noisy ────────────────────────────────────────────────────────────────
print("\n=== Section 1: _is_noisy ===")
check("Anna's Archive hash detected as noisy",
      _is_noisy("title -- 57005a3009a09e273cecbfd212a0611d -- Anna's Archive.pdf"), True)
check("ISBN in name detected as noisy",
      _is_noisy("9781555703462 Some Book.pdf"), True)
check("clean name is not noisy",
      _is_noisy("Regardie Israel--The Golden Dawn.pdf"), False)
check("Anna's Archive delimiter detected",
      _is_noisy("Title -- Author -- Publisher.pdf"), True)
check("site prefix detected",
      _is_noisy("dokumen.pub_My Book.pdf"), True)

# ── score_file ───────────────────────────────────────────────────────────────
print("\n=== Section 2: score_file ===")

with tempfile.TemporaryDirectory() as tmp:
    root = tmp
    preferred = ['.pdf', '.epub']

    # File at root level with noisy name
    noisy_root = os.path.join(root, "9781555703462 Some Book -- hash -- Anna.pdf")
    open(noisy_root, 'w').close()

    # File in subfolder with clean name
    subdir = os.path.join(root, "Western Mystery Tradition", "Regardie Israel")
    os.makedirs(subdir)
    clean_sub = os.path.join(subdir, "Regardie Israel--The Golden Dawn.pdf")
    open(clean_sub, 'w').close()

    score_noisy = score_file(noisy_root, root, preferred)
    score_clean = score_sub = score_file(clean_sub, root, preferred)

    check_true("clean subfolder file scores higher than noisy root file",
               score_clean > score_noisy)
    check_true("noisy root file has score 1 (only +1 preferred ext, 0 depth, 0 clean)",
               score_noisy == 1)
    # clean_sub: depth=2 → +2, not-root → +3, clean → +5, pdf → +1 = 11
    check("clean subfolder file score is 11", score_clean, 11)

# ── _pick_keeper ─────────────────────────────────────────────────────────────
print("\n=== Section 3: _pick_keeper ===")

with tempfile.TemporaryDirectory() as tmp:
    library = os.path.join(tmp, "library")
    intake  = os.path.join(tmp, "intake")
    os.makedirs(library)
    os.makedirs(intake)

    # Subdir in library
    subdir = os.path.join(library, "Regardie Israel")
    os.makedirs(subdir)
    lib_file    = os.path.join(subdir, "Regardie Israel--The Golden Dawn.pdf")
    intake_file = os.path.join(intake, "9781855383944 the golden dawn -- hash -- Anna.pdf")
    open(lib_file, 'w').close()
    open(intake_file, 'w').close()

    keeper, discard, reason = _pick_keeper(
        lib_file, library,
        intake_file, intake,
        library, ['.pdf', '.epub']
    )
    check("library file kept over intake file", keeper, lib_file)
    check("intake file discarded",              discard, intake_file)
    check_true("reason mentions library root",  'library root' in reason)

    # Both in library — score decides
    noisy = os.path.join(library, "9780000000000 some book -- hash.pdf")
    clean = os.path.join(subdir, "Regardie Israel--The Golden Dawn [6th Edition].pdf")
    open(noisy, 'w').close()
    open(clean, 'w').close()

    keeper2, discard2, reason2 = _pick_keeper(
        noisy, library,
        clean, library,
        library, ['.pdf', '.epub']
    )
    check("clean subfolder file kept over noisy root file", keeper2, clean)
    check("noisy root file discarded",                      discard2, noisy)

# ── run_dedupe end-to-end ─────────────────────────────────────────────────────
print("\n=== Section 4: run_dedupe end-to-end ===")

with tempfile.TemporaryDirectory() as tmp:
    # Create two identical files (same content = same SHA-256)
    content_bytes = b"This is a test book content for deduplication."

    subdir = os.path.join(tmp, "Regardie Israel")
    os.makedirs(subdir)

    clean_copy = os.path.join(subdir, "Regardie Israel--The Golden Dawn.pdf")
    noisy_copy = os.path.join(tmp, "9780000000001 the golden dawn -- abc123hash.pdf")

    with open(clean_copy, 'wb') as f:
        f.write(content_bytes)
    with open(noisy_copy, 'wb') as f:
        f.write(content_bytes)

    result = run_dedupe(
        scan_dir=tmp,
        move_duplicates=False,   # dry run — don't actually move
        use_keeper_scoring=True,
        preferred_extensions=['.pdf', '.epub'],
    )

    check("one duplicate found",        result['duplicates_found'], 1)
    check("zero files moved (dry run)", result['files_moved'],      0)
    check("two files processed",        result['files_processed'],  2)

    # Verify the log says we'd keep the clean copy
    log_text = '\n'.join(result['log_lines'])
    check_true("log shows clean copy as keeper",
               os.path.basename(clean_copy) in log_text)

# ── run_dedupe with SECONDARY_SCAN_FOLDER ────────────────────────────────────
print("\n=== Section 5: SECONDARY_SCAN_FOLDER ===")

with tempfile.TemporaryDirectory() as tmp:
    library = os.path.join(tmp, "library")
    intake  = os.path.join(tmp, "intake")
    os.makedirs(library)
    os.makedirs(intake)

    content_bytes = b"Duplicate content across two roots."

    lib_subdir = os.path.join(library, "Fortune Dion")
    os.makedirs(lib_subdir)
    lib_file    = os.path.join(lib_subdir, "Fortune Dion--The Mystical Qabalah.pdf")
    intake_file = os.path.join(intake, "9780000000002 mystical qabalah -- Anna.pdf")

    with open(lib_file, 'wb') as f:
        f.write(content_bytes)
    with open(intake_file, 'wb') as f:
        f.write(content_bytes)

    result = run_dedupe(
        scan_dir=library,
        secondary_dir=intake,
        move_duplicates=False,
        use_keeper_scoring=True,
        preferred_extensions=['.pdf', '.epub'],
    )

    check("cross-root duplicate detected", result['duplicates_found'], 1)
    log_text = '\n'.join(result['log_lines'])
    check_true("library file identified as keeper",
               os.path.basename(lib_file) in log_text)
    check_true("intake file identified as discard",
               os.path.basename(intake_file) in log_text)

print(f"\n{'='*50}")
print(f"Results: {PASS} passed, {FAIL} failed")
if FAIL:
    sys.exit(1)
