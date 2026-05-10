# The Data Librarian

A local personal digital library management tool for hobbyists. Processes tens of thousands of PDF and EPUB files from noisy download sources (Anna's Archive, Libgen, etc.) into a clean, organized, deduplicated library on a NAS or local drive.

---

## What It Does

Files arrive from sources like Anna's Archive with extremely noisy filenames encoding structured data (ISBNs, author names, publisher names, archive hashes). The Data Librarian processes them through a deliberate pipeline:

```
Set Active Folder (Library tab)
        ↓
   1. deDupe       — removes duplicate files, keeps the best copy
        ↓
   2. Metadata     — view/edit XMP metadata on individual files
        ↓
   3. Organize     — renames and moves files into Author/Title folder structure
        ↓
   4. Copy to NAS  — manual rsync or future Publish module to /mnt/library
```

**Pipeline order matters.** Running the Organizer before deDupe wastes work — duplicates get organized then deleted. Running the Organizer before Metadata may produce folders named after PDF software (Safari, Adobe Acrobat) rather than real authors.

---

## Tech Stack

- **Backend**: Python 3 (`web_interface.py`) — HTTP server on port 2226
- **Frontend**: Next.js 14 (App Router) — UI on port 3000
- **Modules**: Pure Python, no database required for core pipeline
- **Persistent Index**: SQLite at `~/.librarian/library_index.db` (NAS scans only)
- **Config**: `python_core/config.json` loaded by `python_core/config.py`

---

## Starting and Stopping

```bash
# Start both servers (Python backend + Next.js frontend)
start-librarian

# Stop everything cleanly
stop-librarian

# If a port is stuck
pkill -f web_interface.py && pkill -f "next dev" && sleep 1 && start-librarian
```

`start-librarian` is a bash alias that runs `start-librarian.sh` from the project root. The script:
- Kills any stale processes on ports 2226 and 3000
- Starts `python_core/web_interface.py` in the background
- Starts `npm run dev` in the background
- Uses `trap cleanup INT TERM` so Ctrl+C kills both processes cleanly

Both servers must be running for the UI to work. The Python backend serves the API; Next.js serves the UI.

---

## Folder Structure

```
data-librarian-main/
├── app/                        # Next.js pages (App Router)
│   ├── page.tsx                # Dashboard
│   ├── library/page.tsx        # File browser / folder picker
│   ├── dedupe/page.tsx         # deDupe module UI
│   ├── metadata/page.tsx       # Metadata editor UI
│   ├── organize/page.tsx       # Organize Library UI
│   ├── segmenting/page.tsx     # PDF splitter UI
│   ├── binder/page.tsx         # PDF merge UI
│   └── config/page.tsx         # Settings UI
├── components/
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── library/
│   │   ├── LibraryExplorer.tsx # Main file browser (writes dl_active_library_path)
│   │   └── FileTree.tsx        # Folder tree with breadcrumbs
│   └── Terminal.tsx            # Shared output log panel
├── python_core/
│   ├── web_interface.py        # Python HTTP server + all API routes
│   ├── dedupe.py               # SHA-256 duplicate detection + keeper scoring
│   ├── library_index.py        # Persistent SQLite index for NAS scans
│   ├── file_cleaner.py         # Filename cleaning + metadata extraction
│   ├── organizer.py            # File organization into Author/Title hierarchy
│   ├── metadata_handler.py     # XMP/PDF/EPUB metadata read/write via exiftool
│   ├── config.py               # Config loader (reads config.json)
│   ├── config.json             # User configuration
│   └── utils.py                # SHA-256 hashing, filename sanitization
├── docs/                       # Architecture and design docs
├── start-librarian.sh          # Process manager script
└── _legacy/                    # Old prototype files (ignore)
```

---

## Shared Active Folder

The active library folder is set **once** in the Library tab and consumed by all modules. It is stored in `localStorage` under the key `dl_active_library_path`. Module pages (deDupe, Organize, Segmenting) read this key and show a read-only display — they do not have their own folder inputs. Only the Binder module has its own folder inputs because it operates on specific subfolders, not the full library.

To change the active folder: go to the Library tab, navigate to the desired folder, and it becomes the active folder automatically.

---

## Module Details

### deDupe (`dedupe.py`)

SHA-256 content hashing. Two files with the same hash are duplicates regardless of filename.

**Keeper scoring** — when a duplicate pair is found, both copies are scored and the higher-scoring one is kept:
- `+1` per directory level below root (deeper = more organized)
- `+3` if not a direct child of the root
- `+5` if the filename has no noise patterns (clean name)
- `+1` if the extension is in `DEDUPE_PREFERRED_EXTENSIONS`
- Tie-break: shorter absolute path wins
- Library root always beats intake/secondary root regardless of score

Duplicates are **moved to `_DuplicateHoldingBin/`** inside the scan folder. The user reviews the bin manually, checks the log, then deletes. Files are never permanently deleted automatically.

**Persistent index** — when the scan path is inside `LIBRARY_MOUNT_PATH` (the NAS mount), file hashes are cached in `~/.librarian/library_index.db`. On subsequent runs, only new or modified files are re-hashed. This is critical for a library of 10,000+ files: the first scan is slow (full hash pass), every scan after is fast (only new files hashed). All other paths (iCloud, staging folders) use ephemeral in-memory hashing — nothing is stored.

**Stop button** — the UI Stop button halts an active scan gracefully. Files moved before the stop are logged.

### File Cleaner (`file_cleaner.py`)

Cleans noisy Anna's Archive filenames. Before cleaning, extracts structured data embedded in the filename (ISBN, author, publisher, year, archive hash, edition) and writes it to XMP metadata gaps only — never overwrites existing values. Then cleans the filename.

### Organizer (`organizer.py`)

Renames and moves files into `Organized_Books/Lastname Firstname/Title.ext` structure using PDF/EPUB metadata. Runs in two passes:
- Pass 1: reads metadata for all files, plans moves
- Pass 2: executes moves — author subfolder created only if that author has 2+ files (single-file authors land flat)

Prefers `metadata_handler.read_metadata()` (exiftool) over internal PDF reader. Falls back to internal reader if exiftool is unavailable.

**Naming convention v1.2:**
- Books: `Lastname Firstname--Title [Edition]`
- Grey literature: `Title--Lastname Firstname Date`
- Field separator: `--` (double dash, never collapsed)

### Metadata Editor (`metadata_handler.py` + UI)

View and edit XMP/PDF/EPUB metadata. Uses exiftool with a priority-ordered alias system. EPUB uses OPF natively.

### Segmenting

Splits PDFs larger than a configured size (default 100MB) into chunks.

### Binder

Merges multiple PDFs into a single file.

---

## Configuration

All settings live in `python_core/config.json`. Key settings:

| Key | Default | Purpose |
|-----|---------|---------|
| `DEFAULT_TARGET_FOLDER` | `""` | Fallback folder if no active folder set |
| `MOVE_DUPLICATES` | `false` | `true` = live mode, `false` = dry run |
| `DUPLICATE_HOLDING_DIR` | `./_DuplicateHoldingBin` | Where duplicates go |
| `EXCLUDED_FOLDERS` | `["_DuplicateHoldingBin", "Organized_Books"]` | Never scanned by any module |
| `DEDUPE_KEEPER_SCORING` | `true` | Use scoring vs. first-seen (legacy) |
| `DEDUPE_PREFERRED_EXTENSIONS` | `[".pdf", ".epub"]` | Format preference in scoring |
| `SECONDARY_SCAN_FOLDER` | `""` | Optional intake/staging folder for deDupe |
| `LIBRARY_MOUNT_PATH` | `"/mnt/library"` | NAS mount — triggers persistent index |
| `ORGANIZER_DEST_SUBFOLDER` | `"Organized_Books"` | Output folder name |
| `CLEANER_EXTRACT_METADATA_BEFORE_RENAME` | `true` | Extract filename metadata before cleaning |
| `PDF_TARGET_CHUNK_MB` | `100` | Segmenting: max chunk size |
| `PDF_PAGE_CHUNK_LIMIT` | `1000` | Segmenting: page count estimate |

Settings are editable via the UI Settings tab without touching JSON.

---

## Design Principles

- **Hobbyist tool** — no enterprise features, no static deployment paths, no multi-user support. Flexible by default, no configuration required to get started.
- **Sequential pipeline** — modules are intentionally separate and run in sequence. Do not merge them into a single automated pipeline.
- **Never auto-delete** — duplicates, organized files, and cleaned files are always moveable/reversible. The user always reviews before permanent deletion.
- **Fill gaps only** — metadata extraction never overwrites an existing value. Always additive.
- **Exclusion list is shared** — `EXCLUDED_FOLDERS` applies to all modules (Cleaner, deDupe, Organizer). `_DuplicateHoldingBin` and `Organized_Books` must always be in this list.
- **Real-time logging** — all module output appears simultaneously in the server terminal, the log file, and the UI terminal panel. Content must be identical across all three.
- **Stop button** — all long-running modules must be stoppable from the UI without killing the server.

---

## User Preferences & Workflow Notes

- **Library size**: 10,000+ files (significantly more). First deDupe scan on the NAS will be slow. Subsequent scans are fast due to the persistent index.
- **File sources**: primarily Anna's Archive. Filenames are extremely noisy.
- **NAS**: Synology NAS mounted at `/mnt/library`. This is the authoritative library.
- **Staging**: iCloud or local folder used as intake/staging before copying to NAS.
- **Workflow**: Clean and organize files locally first, then copy to NAS. deDupe can be run against the NAS separately to catch duplicates introduced during migration.
- **Review preference**: User always reviews `_DuplicateHoldingBin` manually before deleting. Log files are saved inside the bin folder.
- **Keeper logic rationale**: A file deeper in a subfolder is more likely to have been previously organized. A file at the root is more likely a fresh messy download. Deeper = better.
- **Two-run deDupe**: First run locally (iCloud/staging), then again against NAS after copying. This is expected and correct — the persistent index makes the second run fast.

---

## Running Tests

```bash
cd python_core
python3 -m pytest test_organizer.py test_organizer_extended.py test_file_cleaner.py test_dedupe.py -v
```

Current test counts: 33 + 13 + 26 + 20 = **92 tests, all passing**.

---

## Ports

| Service | Port |
|---------|------|
| Python backend | 2226 |
| Next.js frontend | 3000 |
| Legacy prototype (dead code) | 2226 (same, legacy dashboard.html — ignore) |

The `dashboard.html` and `index.html` files in `python_core/` are old prototype UIs. They are not wired to the real backend and can be ignored. The real UI is the Next.js app on port 3000.
