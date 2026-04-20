"""
File Name Cleaner for The Data Librarian.
Cleans and normalizes filenames using Title Enhanced (NYT) case rules.
"""

import os
import re
import json

# --- Title Enhanced Case Configuration ---
# Words that are NOT capitalized unless they are the first or last word
LOWERCASE_WORDS = {
    'a', 'an', 'and', 'as', 'at', 'but', 'by', 'en', 'for',
    'if', 'in', 'is', 'nor', 'of', 'on', 'or', 'so', 'the',
    'to', 'vs', 'yet', 'with', 'from'
}

# --- Patterns to strip from filenames ---
# Site prefixes like "dokumen.pub_"
SITE_PREFIX_PATTERN = re.compile(r'^[a-z0-9\-]+\.[a-z]{2,4}[_\-]', re.IGNORECASE)

# Leading numeric IDs like "74663177-" or "3515128522-"
NUMERIC_ID_PATTERN = re.compile(r'^\d{5,}-')

# Hash strings - long hex sequences like "29f59da401a2822f5f3275b9404f"
HASH_PATTERN = re.compile(r'\b[a-f0-9]{16,}\b', re.IGNORECASE)

# Trailing source tags like "-- Anna's Archive" or "- Anna's Archive"
TRAILING_SOURCE_PATTERN = re.compile(r'\s*--\s*.+$')

# Trailing numeric IDs like "-3515128522-9783515128520"
TRAILING_NUMERIC_PATTERN = re.compile(r'[\-_]\d{5,}[\-_]?\d*$')


def load_cleaner_config():
    """Load cleaner settings from config.json."""
    config_path = os.path.join(os.path.dirname(__file__), 'config.json')
    excluded_extensions = [".py", ".json", ".html", ".txt", ".sh"]
    excluded_dirs = ["_DuplicateHoldingBin", "Organized_Books"]

    try:
        with open(config_path, 'r') as f:
            data = json.load(f)
        excluded_extensions = data.get("CLEANER_EXCLUDED_EXTENSIONS", excluded_extensions)
        excluded_dirs = data.get("CLEANER_EXCLUDED_DIRS", excluded_dirs)
    except Exception as e:
        print(f"Warning: Could not load cleaner config: {e}. Using defaults.")

    return excluded_extensions, excluded_dirs


def apply_title_enhanced_case(name):
    """
    Applies Title Enhanced (NYT) case rules to a filename stem.
    - Capitalizes first letter of each word
    - Keeps LOWERCASE_WORDS in lowercase unless first or last word
    """
    words = name.split()
    if not words:
        return name

    result = []
    for i, word in enumerate(words):
        is_first = (i == 0)
        is_last = (i == len(words) - 1)
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

    # 1. Strip site prefixes like "dokumen.pub_"
    stem = SITE_PREFIX_PATTERN.sub('', stem)

    # 2. Strip leading numeric IDs like "74663177-"
    stem = NUMERIC_ID_PATTERN.sub('', stem)

    # 3. Strip trailing source tags like "-- Anna's Archive"
    stem = TRAILING_SOURCE_PATTERN.sub('', stem)

    # 4. Strip trailing numeric IDs like "-3515128522-9783515128520"
    stem = TRAILING_NUMERIC_PATTERN.sub('', stem)

    # 5. Strip hash strings
    stem = HASH_PATTERN.sub('', stem)

    # 5b. Clean up stray fragments left after hash removal (e.g. "_ the...")
    stem = re.sub(r'[\s_]+\w*\.{2,}.*$', '', stem).strip()
    
    # 6. Replace hyphens and underscores with spaces
    stem = stem.replace('-', ' ').replace('_', ' ')
    
    # 8. Apply Title Enhanced case
    stem = apply_title_enhanced_case(stem)

    return stem + ext


def preview_renames(target_folder):
    """
    Walks target_folder and returns a list of (original_path, new_name) tuples
    for files whose names would change. Does NOT rename anything.
    """
    excluded_extensions, excluded_dirs = load_cleaner_config()
    results = []

    for root, dirs, files in os.walk(target_folder):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in excluded_dirs]

        for filename in files:
            _, ext = os.path.splitext(filename)

            # Skip excluded extensions
            if ext.lower() in excluded_extensions:
                continue

            cleaned = clean_filename(filename)

            # Only include files where the name would actually change
            if cleaned != filename:
                original_path = os.path.join(root, filename)
                results.append((original_path, cleaned))

    return results


def commit_renames(rename_list):
    """
    Applies the renames from a preview_renames() result.
    Returns (success_count, error_list).
    """
    success_count = 0
    error_list = []

    for original_path, new_name in rename_list:
        directory = os.path.dirname(original_path)
        new_path = os.path.join(directory, new_name)

        try:
            os.rename(original_path, new_path)
            success_count += 1
        except Exception as e:
            error_list.append((original_path, str(e)))

    return success_count, error_list
