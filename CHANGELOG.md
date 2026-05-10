# Data Librarian — Changelog

---

## [Unreleased] — May 2026

### Persistent Index + deDupe Stop Button + UI Shared Folder (`library_index.py`, `dedupe.py`, `web_interface.py`, `config.py`, Settings UI)

**Context — Why this was needed:**
The library contains significantly more than 10,000 files. SHA-256 hashing every file on every deDupe run would be prohibitively slow for the NAS library. Additionally, the deDupe scan had no cancellation mechanism — the UI Stop button did nothing. The pipeline order was also clarified: deDupe must run first (before Organize) to avoid wasting passes on files that will be deleted.

**New file: `library_index.py`**
Persistent SQLite index stored at `~/.librarian/library_index.db`. Two operating modes selected automatically by comparing the scan path against `LIBRARY_MOUNT_PATH`:

- **Persistent mode** — scan path is inside `LIBRARY_MOUNT_PATH` (the NAS mount).
  Hashes are cached in the database. On each run, only files with a changed `mtime` or `size` are re-hashed. Unchanged files use the cached SHA-256. After the first full scan, subsequent runs only hash new or modified files — dramatically faster for large libraries.
- **Ephemeral mode** — any other path (iCloud, local staging, Downloads, etc.).
  Hashes are computed fresh every run and kept in memory only. Nothing is written to disk. This is correct for staging folders that change constantly between runs.

Index is pruned on close — rows for files that no longer exist on disk are removed.

Public API: `open_index()`, `get_cached_hash()`, `update_hash()`, `batch_commit()`, `close_index()`, `index_stats()`.

**`dedupe.py` — rewritten to use the index:**
- Imports `library_index` and calls `open_index(scan_dir)` at the start of every run
- For each file: tries `get_cached_hash()` first; only calls `calculate_sha256()` on a cache miss
- Updates the index after each new hash; commits in batches every 200 files
- Added `stop_event: Optional[threading.Event]` parameter — the scan checks the event on every file and returns a `cancelled: True` result if set
- Progress output now shows `Total files to scan:`, `Cache hits:` (skipped), and `Newly hashed:` counts
- Return dict extended with `cancelled`, `cache_hits`, `files_hashed` keys

**`web_interface.py`:**
- Added `LIBRARY_MOUNT_PATH` to imports from `config`
- Added `LIBRARY_MOUNT_PATH` to `/get_config` response
- Wired `organize_stop_event` into `run_script()` → passed as `stop_event` to `run_dedupe()`
- Updated progress line parser to handle both `Total files to scan:` (new) and `Total files to hash:` (legacy)

**`config.py` / `config.json`:**
- Added `LIBRARY_MOUNT_PATH` key (default: `"/mnt/library"`)
- Added to `DEFAULTS`, module-level global, `load_config()`, and `config.json`

**Settings UI (`app/config/page.tsx`):**
- New "Persistent Index" section with `LIBRARY_MOUNT_PATH` text input
- Explains two-mode behavior to the user
- State loaded from `/get_config`, saved to `/save_config`

**Pipeline order clarified (canonical):**
```
1. deDupe         — remove duplicates first; never waste Organize passes on files to be deleted
2. Metadata       — view/edit metadata on surviving files
3. Organize       — rename and move into Author/Title hierarchy
4. Copy to NAS    — rsync or manual copy to /mnt/library
```

**Two-run deDupe workflow (expected and correct):**
- Run 1: scan local staging folder (iCloud/Downloads) — ephemeral mode, in-memory hashing
- Copy organized files to `/mnt/library`
- Run 2: scan `/mnt/library` — persistent mode, only new files are hashed
- The two runs are independent; the persistent index on the NAS means the second run is fast

**Files modified:**

| File | Change |
|------|--------|
| `python_core/library_index.py` | **New file** — persistent SQLite index module |
| `python_core/dedupe.py` | Rewritten: index integration, `stop_event`, updated logging |
| `python_core/web_interface.py` | `stop_event` wired into `run_script()`, `LIBRARY_MOUNT_PATH` imported and exposed |
| `python_core/config.py` | `LIBRARY_MOUNT_PATH` added to DEFAULTS, globals, `load_config()` |
| `python_core/config.json` | `LIBRARY_MOUNT_PATH` added (default: `"/mnt/library"`) |
| `app/config/page.tsx` | "Persistent Index" section added |
| `README.md` | Complete rewrite — real project docs replacing Next.js boilerplate |

---

### UI — Shared Active Folder + Stop Buttons + Sidebar Reorganization

**Problem:** Each module page had its own folder input. Users could accidentally point each module at a different folder, creating a confusing state where deDupe runs against one folder and Organize runs against another.

**Fix — Shared active folder:**
- `LibraryExplorer.tsx` writes the current path to `localStorage` key `dl_active_library_path`
- All module pages (deDupe, Organize, Segmenting) read this key on load and show a read-only folder display
- Folder inputs removed from module pages — users set the active folder once in the Library tab
- Binder retains its own inputs (it operates on specific subfolders, not the full library)
- Module pages show: "No folder selected — go to Library tab to set active folder" when key is empty

**Fix — Stop buttons:**
- Organize Library page: red Stop button appears while running; calls `/cancel_organize`
- deDupe page: red Stop button appears while running; calls `/cancel_script`
- Both connect to `organize_stop_event` in `web_interface.py`

**Fix — Sidebar reorganization:**
- Metadata moved from top section to Core Modules section
- Final sidebar order: Dashboard, Library | **Core Modules**: Organize Library, Metadata, deDupe, Segmenting, Binder | Settings (footer)

**Fix — Breadcrumb text size:**
- `FileTree.tsx` breadcrumb text increased from `text-[10px]` to `text-sm`

---

### Hotfix — start-librarian.sh: Proper Process Management

**Problem:** The `start-librarian` alias backgrounded the Python process, making it unreachable by Ctrl+C. Killing the terminal only killed the foreground npm process, leaving the Python backend running on port 2226. Restart attempts failed with "Address already in use."

**Fix:** Created `start-librarian.sh` at project root:
```bash
trap cleanup INT TERM
# Pre-flight: kill stale processes on ports 2226 and 3000, sleep 1
python3 web_interface.py &
PYTHON_PID=$!
npm run dev &
wait $PYTHON_PID $NPM_PID
```
`cleanup()` kills both PIDs and `pkill`s by process name as a fallback. Ctrl+C in any terminal now cleanly stops both servers.

`.bashrc` aliases:
- `start-librarian` — runs `start-librarian.sh`
- `stop-librarian` — `pkill -f web_interface.py; pkill -f "next-dev|node.*next"`

---

## [Unreleased] — Earlier May 2026

### Hotfix — Organizer: pypdf Warning Suppression + Ctrl+C / Stop Button (`organizer.py`, `web_interface.py`)

**Problem 1 — pypdf noise flooding terminal:**
During live Organize runs, pypdf emitted hundreds of "Ignoring wrong pointing object" and "invalid pdf header" lines directly to stderr, even for PDFs that were read successfully. `warnings.filterwarnings('ignore')` alone was insufficient because pypdf writes some messages directly to stderr rather than through Python's warnings system.

**Fix:** Both `_extract_pdf_meta()` and `_extract_epub_meta()` in `organizer.py` now:
1. Use `warnings.catch_warnings()` context manager (scoped, thread-safe)
2. Temporarily redirect `sys.stderr` to `io.StringIO()` to absorb any direct-write noise
3. Restore stderr in a `finally` block so errors in other code are never silenced

**Verified:** Malformed PDF (non-PDF content with `-----` header) produces zero stderr output.

**Problem 2 — Ctrl+C / UI Stop button did not halt the organizer:**
`run_organizer()` called `organize_library()` in a background thread with no cancellation mechanism. Both Ctrl+C and the web UI's stop button had no effect — the thread continued until completion.

**Fix:**
- Added `stop_event: Optional[threading.Event]` parameter to `organize_library()` in `organizer.py`
- Both Pass 1 (walk loop) and Pass 2 (move loop) check `stop_event.is_set()` on every iteration
- If cancelled during Pass 1: returns immediately with `{'cancelled': True, 'moved': 0, ...}` — no files are moved
- If cancelled during Pass 2: stops mid-way, logs count of files moved before cancellation
- `web_interface.py` now creates a module-level `organize_stop_event = threading.Event()`
- `run_organizer()` clears the event at start, passes it to `organize_library()`
- New GET route `/cancel_organize` calls `organize_stop_event.set()` to signal stop
- Ctrl+C handler updated to call `organize_stop_event.set()` when organizer is running
- Organizer progress now routes through `output_buffer` (same as dedupe), so the UI output panel updates in real time

**Tests added/verified:**
- Stop event test: pre-sets event after "Pass 1" message → `cancelled: True`, `moved: 0` ✓
- All 13 existing `test_organizer_extended.py` tests continue to pass ✓
- All 33 `test_organizer.py` tests continue to pass ✓



### Gap 1 — File Name Cleaner: Metadata Extraction Before Rename (`file_cleaner.py`)

**Problem:** Anna's Archive filenames encode valuable structured data (ISBN, author, publisher, year, hash) that was being permanently destroyed when `clean_filename()` ran.

**Solution:** Added `extract_filename_metadata(filename)` which parses raw filenames before cleaning and writes any extracted fields into the file's XMP metadata (gaps only — never overwrites existing values).

**Fields extracted:**
- `isbn` — ISBN-13 (978/979 prefix) or ISBN-10
- `year` — 4-digit year between 1800 and current year
- `author_raw` — second `--` segment of an Anna's Archive filename
- `publisher_raw` — third `--` segment
- `source_site` — matched site prefix (Anna's Archive, dokumen.pub, libgen, etc.)
- `archive_hash` — 32-char MD5-style hex string
- `edition` — edition strings (1st Edition, First edition, Revised, Facsimile, etc.)

**Call order enforced:**
```
extract_filename_metadata(filename)
  → write_extracted_metadata() [gaps only via metadata_handler]
  → clean_filename(filename)
```

**New config keys:**
```json
"CLEANER_EXTRACT_METADATA_BEFORE_RENAME": true,
"CLEANER_METADATA_FIELDS_TO_EXTRACT": ["isbn", "year", "author_raw", "publisher_raw", "source_site", "archive_hash", "edition"]
```

**`commit_renames()` updated:** Now accepts 3-tuples `(path, new_name, extracted_meta)` from `preview_renames()` and handles the XMP write + rename sequence atomically. Backward-compatible with old 2-tuple callers.

**Tests:** `test_file_cleaner.py` — 26 tests, all passing.

---

### Gap 2 — deDuper: Keeper Scoring + Secondary Scan Folder (`dedupe.py`, `web_interface.py`)

**Problem A — First-seen wins:** The original `run_script()` kept whichever file `os.walk` encountered first, which frequently meant a noisy Anna's Archive filename was kept over a clean curated copy.

**Problem B — Single root:** The deDuper assumed both source and library shared the same root folder, breaking workflows where a staging/intake folder lives on a different drive from the library.

**Solution:** Extracted deduplication logic into a new standalone module `dedupe.py` with:

- **Keeper scoring function** — scores each copy on four criteria and keeps the winner:
  - `+1` per directory level below root (deeper = more organised)
  - `+3` if not a direct child of root
  - `+5` if filename has no noise patterns (clean name)
  - `+1` if extension is in `DEDUPE_PREFERRED_EXTENSIONS`
  - Tie-break: shorter absolute path wins
- **Library-root priority** — if one copy is in the library root and the other in the intake/secondary folder, the library copy always wins regardless of score
- **`SECONDARY_SCAN_FOLDER`** — when set, both roots are walked and merged into a single hash map before any decisions are made. The `_DuplicateHoldingBin` is always created relative to the primary root.
- **Score breakdown logged** — every duplicate decision includes the reason (score A vs B, or "library root wins") so decisions are auditable

**`run_script()` in `web_interface.py`** now delegates entirely to `dedupe.run_dedupe()`. Legacy first-seen behaviour preserved via `DEDUPE_KEEPER_SCORING: false`.

**New config keys:**
```json
"SECONDARY_SCAN_FOLDER": "",
"DEDUPE_KEEPER_SCORING": true,
"DEDUPE_PREFERRED_EXTENSIONS": [".pdf", ".epub"]
```

**Tests:** `test_dedupe.py` — 20 tests, all passing.

---

### Organizer Fixes (`organizer.py`)

**Fix 1 — Missing `resolve_collision()`:** The organizer called `resolve_collision(path)` but the function was never defined anywhere. This caused a `NameError` crash on every real run. Added: appends `(2)`, `(3)`, etc. before the extension until a free path is found.

**Fix 2 — Wired to `metadata_handler.read_metadata()`:** The organizer previously used its own internal `_extract_pdf_meta()` (pypdf only). It now preferentially calls `metadata_handler.read_metadata()` which uses exiftool with a priority-ordered alias system and handles EPUB OPF natively. Falls back to the internal reader if `metadata_handler` is unavailable.

**Fix 3 — Two-pass author-folder logic:** The organizer now runs in two passes:
- **Pass 1:** Walk all files, read metadata, build planned moves, count files per author
- **Pass 2:** Move files — author subfolder created only if that author has **2 or more** files. Solo files land flat in `dest_root`

This prevents one-off files from each creating their own folder, keeping `Organized_Books/` clean. Subject folder placement remains a manual step during final NAS migration (too context-dependent to automate reliably).

**Fix 4 — `utils.py` `--` collision:** `sanitize_filename()` was collapsing `--+` into `-`, which would have destroyed the canonical `--` field separator if ever called on an already-organised filename. Changed to collapse only runs of 3+ hyphens (`-{3,}`), leaving `--` intact.

**Tests:** `test_organizer.py` (33 tests) + `test_organizer_extended.py` (13 tests) — 46 tests, all passing.

---

### Config (`config.py`, `config.json`, `_legacy/config.json`)

All new keys added to `DEFAULTS`, module-level globals, `load_config()`, and both JSON files:

| Key | Default | Purpose |
|-----|---------|---------|
| `CLEANER_EXTRACT_METADATA_BEFORE_RENAME` | `true` | Enable Gap 1 extraction |
| `CLEANER_METADATA_FIELDS_TO_EXTRACT` | `[all fields]` | Which fields to extract |
| `SECONDARY_SCAN_FOLDER` | `""` | Intake/staging root for deDuper |
| `DEDUPE_KEEPER_SCORING` | `true` | Use scoring vs. first-seen |
| `DEDUPE_PREFERRED_EXTENSIONS` | `[".pdf", ".epub"]` | Bonus score for preferred formats |

---

### Integration Test — Real Library Sample

Ran dry-run organizer against 252 files from `/projects/Library`. Key findings:

- **EPUBs with good metadata:** Named correctly — e.g. `Booth Martin--Cannabis A History.epub`, `Deatsman Colleen--The Hollow Bone.epub`
- **PDFs with software in Author field:** Many PDFs store the PDF producer (`Safari`, `Adobe Acrobat`, `PDFium`) in the Author field rather than the actual author. These files need Gap 1 (Cleaner + metadata extraction) to run first so the real author is written from the filename into XMP before the Organizer runs.
- **Two-pass author logic working:** `Author Unknown` (31 files), `Wright F. Edward` (3 files), `Booth Martin` (3 files) all correctly flagged for author subfolders. Solo authors correctly land flat.
- **Confirmed workflow dependency:** Cleaner → deDuper → Organizer must run in sequence. Running the Organizer on pre-Gap-1 files will produce software-name folders until metadata is populated.

---

### Test Summary

| Suite | Tests | Result |
|-------|-------|--------|
| `test_organizer.py` | 33 | ✅ All pass |
| `test_file_cleaner.py` | 26 | ✅ All pass |
| `test_dedupe.py` | 20 | ✅ All pass |
| `test_organizer_extended.py` | 13 | ✅ All pass |
| **Total** | **92** | **✅ 0 failures** |

---

### Files Modified

| File | Change |
|------|--------|
| `python_core/file_cleaner.py` | Added `extract_filename_metadata()`, `write_extracted_metadata()`, `_map_extracted_to_xmp()`; updated `preview_renames()` and `commit_renames()` |
| `python_core/dedupe.py` | **New file** — standalone deduplication module with keeper scoring and secondary scan folder support |
| `python_core/web_interface.py` | `run_script()` now delegates to `dedupe.run_dedupe()`; updated imports |
| `python_core/organizer.py` | Added `resolve_collision()`, `_build_author_field_for_file()`; rewrote `get_file_metadata()` to prefer `metadata_handler`; rewrote `organize_library()` with two-pass logic |
| `python_core/utils.py` | Fixed `--` separator collision in `sanitize_filename()` |
| `python_core/config.py` | Added 5 new keys to `DEFAULTS`, globals, and `load_config()` |
| `python_core/config.json` | Added 5 new keys with safe defaults |
| `_legacy/config.json` | Same additions |
| `python_core/test_file_cleaner.py` | **New file** — 26 tests for Gap 1 |
| `python_core/test_dedupe.py` | **New file** — 20 tests for Gap 2 |
| `python_core/test_organizer_extended.py` | **New file** — 13 tests for Organizer fixes |

### Files Not Modified (as specified)

| File | Reason |
|------|--------|
| `python_core/metadata_handler.py` | Interface unchanged; called by Cleaner and Organizer |
| `python_core/librarian_dream.py` | Backward-compat shim; unchanged |
| TypeScript / Next.js app layer | UI changes deferred (Settings panel improvements) |
