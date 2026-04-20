"""
Configuration Manager for The Data Librarian.
All user-tunable settings live in config.json — this file loads and exposes them.
"""

import json
import os

# ── Module Constants (not user-configurable) ─────────────────────────────────
MODULE_WEEDING      = "dedupe"
MODULE_SEGMENTATION = "segmentation"

CONFIG_FILE = "config.json"

# Internal system files always excluded from scans (never written to config.json)
SYSTEM_EXCLUDED_FILES = {
    "web_interface.py",
    "utils.py",
    "config.py",
    "index.html",
    "dashboard.html",
    "config.json",
}

# ── Defaults ──────────────────────────────────────────────────────────────────
# These are the fallback values used when a key is absent from config.json.
# Keep in sync with the keys written by the UI's save_config endpoint.
DEFAULTS = {
    # Core
    "PORT":                      2226,
    "DEFAULT_TARGET_FOLDER":     "",

    # deDupe
    "MOVE_DUPLICATES":           False,
    "DUPLICATE_HOLDING_DIR":     "./_DuplicateHoldingBin",
    "LOG_NAME_PREFIX":           "_duplicate_log",
    "EXCLUDED_FOLDERS":          ["_DuplicateHoldingBin", "Organized_Books"],
    "USER_EXCLUDED_FILES":       [],

    # Segmenting
    "PDF_TARGET_CHUNK_MB":       100,
    "PDF_PAGE_CHUNK_LIMIT":      1000,

    # Organizer
    "ORGANIZER_DEST_SUBFOLDER":  "Organized_Books",

    # File Name Cleaner
    "CLEANER_EXCLUDED_EXTENSIONS": [".py", ".json", ".html", ".txt", ".sh"],
    "CLEANER_EXCLUDED_DIRS":       ["_DuplicateHoldingBin", "Organized_Books"],
}

# ── Module-level variables (populated by load_config) ────────────────────────
PORT                        = DEFAULTS["PORT"]
DEFAULT_TARGET_FOLDER       = DEFAULTS["DEFAULT_TARGET_FOLDER"]
MOVE_DUPLICATES             = DEFAULTS["MOVE_DUPLICATES"]
DUPLICATE_HOLDING_DIR       = DEFAULTS["DUPLICATE_HOLDING_DIR"]
LOG_NAME_PREFIX             = DEFAULTS["LOG_NAME_PREFIX"]
EXCLUDED_FOLDERS            = DEFAULTS["EXCLUDED_FOLDERS"]
USER_EXCLUDED_FILES         = DEFAULTS["USER_EXCLUDED_FILES"]
PDF_TARGET_CHUNK_MB         = DEFAULTS["PDF_TARGET_CHUNK_MB"]
PDF_PAGE_CHUNK_LIMIT        = DEFAULTS["PDF_PAGE_CHUNK_LIMIT"]
ORGANIZER_DEST_SUBFOLDER    = DEFAULTS["ORGANIZER_DEST_SUBFOLDER"]
CLEANER_EXCLUDED_EXTENSIONS = DEFAULTS["CLEANER_EXCLUDED_EXTENSIONS"]
CLEANER_EXCLUDED_DIRS       = DEFAULTS["CLEANER_EXCLUDED_DIRS"]

# Derived: system + user excludes combined
EXCLUDED_FILES = list(SYSTEM_EXCLUDED_FILES)


def load_config():
    """Load config.json and update all module-level globals."""
    global PORT, DEFAULT_TARGET_FOLDER, MOVE_DUPLICATES, DUPLICATE_HOLDING_DIR
    global LOG_NAME_PREFIX, EXCLUDED_FOLDERS, USER_EXCLUDED_FILES, EXCLUDED_FILES
    global PDF_TARGET_CHUNK_MB, PDF_PAGE_CHUNK_LIMIT
    global ORGANIZER_DEST_SUBFOLDER, CLEANER_EXCLUDED_EXTENSIONS, CLEANER_EXCLUDED_DIRS

    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r") as f:
                data = json.load(f)

            PORT                        = data.get("PORT",                        DEFAULTS["PORT"])
            DEFAULT_TARGET_FOLDER       = data.get("DEFAULT_TARGET_FOLDER",       DEFAULTS["DEFAULT_TARGET_FOLDER"])
            MOVE_DUPLICATES             = data.get("MOVE_DUPLICATES",             DEFAULTS["MOVE_DUPLICATES"])
            DUPLICATE_HOLDING_DIR       = data.get("DUPLICATE_HOLDING_DIR",       DEFAULTS["DUPLICATE_HOLDING_DIR"])
            LOG_NAME_PREFIX             = data.get("LOG_NAME_PREFIX",             DEFAULTS["LOG_NAME_PREFIX"])
            EXCLUDED_FOLDERS            = data.get("EXCLUDED_FOLDERS",            DEFAULTS["EXCLUDED_FOLDERS"])
            USER_EXCLUDED_FILES         = data.get("USER_EXCLUDED_FILES",         DEFAULTS["USER_EXCLUDED_FILES"])
            PDF_TARGET_CHUNK_MB         = data.get("PDF_TARGET_CHUNK_MB",         DEFAULTS["PDF_TARGET_CHUNK_MB"])
            PDF_PAGE_CHUNK_LIMIT        = data.get("PDF_PAGE_CHUNK_LIMIT",        DEFAULTS["PDF_PAGE_CHUNK_LIMIT"])
            ORGANIZER_DEST_SUBFOLDER    = data.get("ORGANIZER_DEST_SUBFOLDER",    DEFAULTS["ORGANIZER_DEST_SUBFOLDER"])
            CLEANER_EXCLUDED_EXTENSIONS = data.get("CLEANER_EXCLUDED_EXTENSIONS", DEFAULTS["CLEANER_EXCLUDED_EXTENSIONS"])
            CLEANER_EXCLUDED_DIRS       = data.get("CLEANER_EXCLUDED_DIRS",       DEFAULTS["CLEANER_EXCLUDED_DIRS"])

            EXCLUDED_FILES = list(SYSTEM_EXCLUDED_FILES.union(set(USER_EXCLUDED_FILES)))
            print(f"Configuration loaded from {CONFIG_FILE}")

        except Exception as e:
            print(f"Error loading {CONFIG_FILE}: {e}. Using defaults.")
    else:
        print(f"{CONFIG_FILE} not found. Using defaults.")
        EXCLUDED_FILES = list(SYSTEM_EXCLUDED_FILES)


def save_config(new_config: dict) -> bool:
    """Merge new_config into config.json and reload."""
    current_data = DEFAULTS.copy()
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r") as f:
                current_data.update(json.load(f))
        except Exception:
            pass

    current_data.update(new_config)

    try:
        with open(CONFIG_FILE, "w") as f:
            json.dump(current_data, f, indent=4)
        load_config()
        return True
    except Exception as e:
        print(f"Error saving config: {e}")
        return False


# Load on import
load_config()
