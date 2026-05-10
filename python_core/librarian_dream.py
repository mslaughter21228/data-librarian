"""
librarian_dream.py — Data Librarian
=====================================
Backward-compatibility shim.
All organizer logic now lives in organizer.py (naming convention v1.2).
This file retains its original entry point so existing API routes
(/run_organizer, /check_organize_status) continue to work unchanged.
"""

from organizer import organize_library   # noqa: F401  re-export

if __name__ == "__main__":
    import sys
    dry = '--dry-run' in sys.argv
    folder = next((a for a in sys.argv[1:] if not a.startswith('--')), None)
    organize_library(source_folder=folder, dry_run=dry)
