"""
test_organizer.py — Validation suite for organizer.py naming convention logic.
Tests ALL naming patterns from file-naming-convention.md v1.2.
Run: python3 test_organizer.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from organizer import (
    build_author_field, invert_name, build_edition_bracket,
    assemble_book_name, assemble_grey_lit_name, assemble_media_name,
    append_org_acronym, build_filename, _title_case, ORG_APPEND
)

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

print("\n=== Section 1: invert_name ===")
check("single token unchanged",          invert_name("Crowley"),               "Crowley")
check("two tokens inverted",             invert_name("Aleister Crowley"),      "Crowley Aleister")
check("hyphenated surname",              invert_name("Dolores Ashcroft-Nowicki"), "Ashcroft-Nowicki Dolores")
check("three tokens",                    invert_name("Samuel Liddell MacGregor"), "MacGregor Samuel Liddell")
check("comma style stripped",            invert_name("Booth, Martin"),         "Booth Martin")

print("\n=== Section 2: build_author_field ===")
check("single author",
      build_author_field(["Crowley Aleister"]),
      "Crowley Aleister")
check("two authors",
      build_author_field(["Smith John", "Jones Mary"]),
      "Smith John, Jones Mary")
check("three authors → et al",
      build_author_field(["Smith John", "Jones Mary", "Doe Jane"]),
      "Smith John et al")
check("editor role",
      build_author_field(["Fortune Dion"], role="ed"),
      "Fortune Dion ed")
check("translator role et al",
      build_author_field(["Smith John", "Jones Mary", "Doe Jane"], role="tr"),
      "Smith John et al tr")
check("Anonymous",
      build_author_field([]),
      "Anonymous")

print("\n=== Section 3: build_edition_bracket ===")
check("numbered edition",        build_edition_bracket("6th Edition"),          "[6th Edition]")
check("revised edition",         build_edition_bracket("3rd Edition Revised"),  "[3rd Edition Revised]")
check("publisher edition",       build_edition_bracket("Llewellyn"),            "[Llewellyn Edition]")
check("facsimile",               build_edition_bracket("Facsimile"),            "[Facsimile]")
check("reprint year",            build_edition_bracket("1972"),                 "[Reprint 1972]")
check("already bracketed",       build_edition_bracket("[2nd Edition]"),        "[2nd Edition]")
check("empty returns empty",     build_edition_bracket(""),                     "")

print("\n=== Section 4: assemble_book_name (Section 3a) ===")
check("basic book",
      assemble_book_name("Ashcroft-Nowicki Dolores", "Highways of the Mind", ext=".pdf"),
      "Ashcroft-Nowicki Dolores--Highways of the Mind.pdf")
check("book with edition",
      assemble_book_name("Regardie Israel", "The Golden Dawn", "[6th Edition]", ext=".pdf"),
      "Regardie Israel--The Golden Dawn [6th Edition].pdf")
check("book with translator",
      assemble_book_name("Levi Eliphas", "Transcendental Magic", "", "Waite Arthur Edward", ext=".pdf"),
      "Levi Eliphas--Transcendental Magic tr Waite Arthur Edward.pdf")
check("book edition + translator",
      assemble_book_name("Levi Eliphas", "Transcendental Magic", "[Reprint 1972]", "Waite Arthur Edward", ext=".pdf"),
      "Levi Eliphas--Transcendental Magic [Reprint 1972] tr Waite Arthur Edward.pdf")

print("\n=== Section 5: assemble_grey_lit_name (Section 3b) ===")
check("grey lit basic",
      assemble_grey_lit_name("The Default Art of Classifying the Occult", "Smith Jane", "2019", ext=".pdf"),
      "The Default Art of Classifying the Occult--Smith Jane 2019.pdf")
check("grey lit month precision",
      assemble_grey_lit_name("Hidden in Plain Sight", "McLaughlin Cavan", "2018-03", ext=".pdf"),
      "Hidden in Plain Sight--McLaughlin Cavan 2018-03.pdf")
check("grey lit undated",
      assemble_grey_lit_name("Digital Occult Library", "Brandkamp Alexis", "undated", ext=".pdf"),
      "Digital Occult Library--Brandkamp Alexis undated.pdf")

print("\n=== Section 6: assemble_media_name ===")
check("image with year",        assemble_media_name("Rose Cross Diagram", "1888", ".jpg"),
      "Rose Cross Diagram 1888.jpg")
check("audio with full date",   assemble_media_name("Pathworking Meditation", "2021", ".mp3"),
      "Pathworking Meditation 2021.mp3")
check("video no date",          assemble_media_name("Introduction to the Qabalah", "", ".mp4"),
      "Introduction to the Qabalah.mp4")

print("\n=== Section 7: AMORC / IGOS acronym append ===")
check("AMORC append",
      append_org_acronym(
          "Ancient and Mystical Order Rosae Crucis--Liber 777 1950",
          "Ancient and Mystical Order Rosae Crucis", ".pdf"),
      "Ancient and Mystical Order Rosae Crucis--Liber 777 1950 AMORC.pdf")
check("IGOS append",
      append_org_acronym(
          "Title--International Guild of Occult Science 1985",
          "International Guild of Occult Science", ".pdf"),
      "Title--International Guild of Occult Science 1985 IGOS.pdf")
check("no append for regular org",
      append_org_acronym("Fortune Dion ed--Esoteric Philosophy Anthology",
                         "Fortune Dion", ".pdf"),
      "Fortune Dion ed--Esoteric Philosophy Anthology.pdf")

print("\n=== Section 8: Honorific abbreviations in build_author_field ===")
check("Frater abbrev",
      build_author_field(["Fra. Achad"]),
      "Fra. Achad")

print("\n=== Section 9: Anonymous ===")
check("Anonymous book",
      assemble_book_name("Anonymous", "Title", ext=".pdf"),
      "Anonymous--Title.pdf")

print(f"\n{'='*50}")
print(f"Results: {PASS} passed, {FAIL} failed")
if FAIL:
    sys.exit(1)
