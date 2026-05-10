"""
test_file_cleaner.py — Validation suite for Gap 1: extract_filename_metadata()
Tests real-world Anna's Archive filenames and edge cases.
Run: python3 test_file_cleaner.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from file_cleaner import extract_filename_metadata, clean_filename, apply_title_enhanced_case

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

# ── Real Anna's Archive filename ──────────────────────────────────────────────
AA_FILENAME = (
    "Creating a Virtual Library_ A How-to-do-it Manual -- Stielow, Frederick J_, 1946- "
    "-- How-to-do-it manuals for librarians ;, no_ 91, How-to-do-it "
    "-- isbn13 9781555703462 "
    "-- 57005a3009a09e273cecbfd212a0611d "
    "-- Anna's Archive.pdf"
)

print("\n=== Section 1: Anna's Archive full filename ===")
meta = extract_filename_metadata(AA_FILENAME)
check("ISBN extracted",       meta['isbn'],         '9781555703462')
check("archive hash",         meta['archive_hash'], '57005a3009a09e273cecbfd212a0611d')
check("source site detected", meta['source_site'],  "anna's archive")
check("author segment",       meta['author_raw'],   'Stielow, Frederick J_, 1946-')

# ── ISBN variants ─────────────────────────────────────────────────────────────
print("\n=== Section 2: ISBN extraction ===")
check("ISBN-13 978 prefix",
      extract_filename_metadata("9780312322205 Some Book.pdf")['isbn'],
      '9780312322205')
check("ISBN-13 979 prefix",
      extract_filename_metadata("Some Book 9791032301487.pdf")['isbn'],
      '9791032301487')
check("no ISBN returns empty",
      extract_filename_metadata("Just A Normal Title.pdf")['isbn'],
      '')

# ── Archive hash ──────────────────────────────────────────────────────────────
print("\n=== Section 3: Archive hash ===")
check("32-char hex detected",
      extract_filename_metadata("title -- 276a77e03e47cbf50e6414736fc7b005 -- annas.pdf")['archive_hash'],
      '276a77e03e47cbf50e6414736fc7b005')
check("16-char hex NOT treated as archive hash (too short for MD5)",
      extract_filename_metadata("title -- 276a77e03e47cbf5 -- annas.pdf")['archive_hash'],
      '')

# ── Year extraction ───────────────────────────────────────────────────────────
print("\n=== Section 4: Year extraction ===")
check("year in delimiters",
      extract_filename_metadata("Title -- Author -- 2004 -- Publisher.pdf")['year'],
      '2004')
check("year bare in stem",
      extract_filename_metadata("Some Book 2016 Extra Stuff.pdf")['year'],
      '2016')
check("no valid year",
      extract_filename_metadata("Some Book No Date.pdf")['year'],
      '')
check("year out of range rejected",
      extract_filename_metadata("Something 1750 old.pdf")['year'],
      '')

# ── Edition ───────────────────────────────────────────────────────────────────
print("\n=== Section 5: Edition extraction ===")
check("1st ed",
      extract_filename_metadata("Title 1st Edition Author.pdf")['edition'],
      '1st Edition')
check("First edition",
      extract_filename_metadata("Title First edition.pdf")['edition'],
      'First edition')
check("revised",
      extract_filename_metadata("Title Revised.pdf")['edition'],
      'Revised')
check("no edition",
      extract_filename_metadata("Just A Title.pdf")['edition'],
      '')

# ── Source site ───────────────────────────────────────────────────────────────
print("\n=== Section 6: Source site ===")
check("dokumen.pub prefix",
      extract_filename_metadata("dokumen.pub_Some Title.pdf")['source_site'],
      'dokumen.pub')
check("libgen in name",
      extract_filename_metadata("Title libgen extra.pdf")['source_site'],
      'libgen')
check("no site",
      extract_filename_metadata("Clean Title.pdf")['source_site'],
      '')

# ── clean_filename unchanged ───────────────────────────────────────────────────
print("\n=== Section 7: clean_filename still works ===")
check("strips Anna's Archive suffix",
      clean_filename("Some Title -- Author -- Anna's Archive.pdf"),
      "Some Title.pdf")
check("strips hash",
      clean_filename("title 276a77e03e47cbf50e6414736fc7b005 stuff.pdf"),
      "Title Stuff.pdf")
check("strips site prefix",
      clean_filename("dokumen.pub_My Great Book.pdf"),
      "My Great Book.pdf")

# ── Title Enhanced Case ───────────────────────────────────────────────────────
print("\n=== Section 8: Title Enhanced Case ===")
check("standard title case",
      apply_title_enhanced_case("the golden dawn and its secrets"),
      "The Golden Dawn and Its Secrets")
check("first word always capitalised",
      apply_title_enhanced_case("a study of magic"),
      "A Study of Magic")
check("last word always capitalised",
      apply_title_enhanced_case("magic and the"),
      "Magic and The")

print(f"\n{'='*50}")
print(f"Results: {PASS} passed, {FAIL} failed")
if FAIL:
    sys.exit(1)
