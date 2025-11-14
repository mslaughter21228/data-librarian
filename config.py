"""
Configuration settings for The Data Librarian.
"""

# Folders to exclude from the duplicate search
# Add folder names as strings, e.g., ["_DuplicateHoldingBin", "From Jesse", ".git"]
EXCLUDED_FOLDERS = ["_DuplicateHoldingBin", "From Jesse"]

# Default directory to move duplicate files into
DEFAULT_HOLDING_DIR = "_DuplicateHoldingBin"

# Base name for the log file (timestamp will be appended)
DEFAULT_LOG_FILE = "_duplicate_log"

# Set to True to move duplicate files, False to only log them
# This is the main switch for running the script.
MOVE_DUPLICATES = True