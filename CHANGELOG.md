# Data Librarian — Changelog

All notable changes to this project are documented here.
Format: `[Date] — Description (file(s) affected)`

---

## [2026-04-19] — Session: UI Sizing + Turbopack Fix

### Bug Fixes
- **Turbopack workspace root error** — App failed to compile with `Can't resolve 'tailwindcss'`. Root cause: a leftover `package.json` (docx dependency) at `/home/mslaughter-admin/` was confusing Next.js 16 Turbopack into treating the home directory as the workspace root instead of the project. Fixed by setting `turbopack.root` in `next.config.ts` (`next.config.ts`).
- **Organize Library icon missing** — `fa-books` is Font Awesome Pro only (free tier renders nothing). Replaced with `fa-folder-tree` in both sidebar and page heading (`components/Sidebar.tsx`, `app/organize/page.tsx`).

### UI Changes
- **Logo** — Container height `h-16` → `h-20`, logo size `h-10` → `h-14`, glow doubled with two stacked `drop-shadow` layers at full opacity (`components/Sidebar.tsx`).
- **Header bar** — Height `h-16` → `h-20`; page title `text-xl` → `text-2xl`; system status pill padding and text sizes increased; status value `text-sm` → `text-base`; "SYSTEM_STATUS" label cleaned to "SYSTEM STATUS" (`components/Header.tsx`).

---

## [2026-04-19] — Session: Heading Cleanup + Path Memory

### UI Changes
- **Library Index heading** — Font changed from Fira Code (`font-mono`) to IBM Plex Mono (`font-heading`); renamed from `LIBRARY_INDEX` to "Library Index" (`components/library/LibraryExplorer.tsx`).
- **Metadata Browser heading** — Same treatment; renamed from `METADATA_BROWSER` to "Metadata Browser" (`components/metadata/MetadataExplorer.tsx`).
- **Config page headings** — Main heading `SYSTEM_CONFIGURATION` → "System Configuration" with `font-heading`; section labels `[Server_Settings]`, `[Dedupe_Module]`, `[Segmenting_Module]` cleaned to "Server Settings", "deDupe Module", "Segmenting Module" (`app/config/page.tsx`).

### Features
- **Last-used path memory** — All three tool pages (deDupe, Segmenting, Organize Library) now persist the last used folder path in `localStorage` under keys `dl_last_path_dedupe`, `dl_last_path_segmenting`, `dl_last_path_organize`. On load, localStorage is checked first; falls back to `DEFAULT_TARGET_FOLDER` from config if no saved path exists. Supports switching between test library (`/home/mslaughter-admin/projects/Library`) and production NAS paths (`/mnt/Download`, `/mnt/Library`) without losing the last used value.

---

## [2026-04-19] — Session: UI Polish + Organizer Fix

### Bug Fixes
- **Organizer not running** — `librarian_dream.py` had `SOURCE_FOLDER` hardcoded to `/home/mslaughter-admin/Library` instead of reading `DEFAULT_TARGET_FOLDER` from `config.json`. The actual test library is at `/home/mslaughter-admin/projects/Library`. Function now accepts `source_folder` parameter and falls back to config value.
- **Organizer double-loop** — `organize_library()` contained two separate `os.walk` loops that both moved files, causing the second pass to fail silently on already-moved files. Consolidated into a single clean loop.
- **Organizer no status feedback** — `/api/action` endpoint previously fired-and-forgot with no way to poll completion. Added `organize_running` global, `run_organizer()` wrapper, and `/check_organize_status` GET endpoint.

### New Features
- **Organize Library page** — New `/organize` route (`app/organize/page.tsx`) with full terminal integration, config-prepopulated path input, live polling, and info panel describing what the organizer does.
- **Organize Library in Sidebar** — Added as first item under Core Modules (`components/Sidebar.tsx`).

### UI Changes
- **Logo visibility** — Removed `opacity-90` dimming; added `drop-shadow` cyan glow matching accent color (`components/Sidebar.tsx`).
- **IBM Plex Mono font** — Added as dedicated heading font (`--font-heading`). Replaces Fira Code on all H2/H3 display headings. Fira Code retained for terminal, labels, and inputs (`app/layout.tsx`, `app/globals.css`).
- **deDupe casing** — All instances of "Dedupe" renamed to "deDupe" across sidebar, header, dashboard stat card, and terminal log messages.
- **Underscores removed** — Display names cleaned up throughout: `DEDUPE_TOOL_CONFIG` → `deDupe Tool`, `SEGMENTING_TOOL_CONFIG` → `Segmenting Tool`, `SYSTEM_ACTIVITY` → `System Activity`, header titles now use natural casing (e.g. `Dashboard`, `Library Index`, `Configuration`).
- **OrganizeLibraryButton removed from Dashboard** — Replaced by the dedicated Organize Library module page.

---

## [Prior Sessions] — Foundation & Core Modules

### Architecture
- **Frontend:** Next.js (TypeScript), port 3000
- **Backend:** Python Flask-style HTTP server (`web_interface.py`), port 2226
- **Start command:** `start-librarian`
- **Access:** `localhost:3000` only (network IP causes CORS blocking)

### Core Principle
Files and folders in the library are **never restructured**. The Organizer writes to a new `Organized_Books/` subfolder only. Metadata is external.

### Modules Built
- **deDupe (The Weeder)** — Scans for duplicate files by SHA256 hash. Moves duplicates to `_DuplicateHoldingBin/`. Log output shows full file paths for Original, Duplicate, and Moved To entries. (`python_core/web_interface.py`, `app/dedupe/page.tsx`)
- **Segmenting (The Partitioner)** — Splits large PDFs into size-limited chunks using adaptive page-count logic. (`python_core/web_interface.py`, `app/segmenting/page.tsx`)
- **Organize Library** — Extracts PDF/EPUB metadata and sorts files into `Organized_Books/Author/` subfolders. (`python_core/librarian_dream.py`)
- **Library Index** — File tree browser. Fixed `api_server.ts` data unwrapping bug that caused crashes. (`app/library/page.tsx`)
- **ExifTool integration** — Exists; metadata read/write stubs in place pending full implementation.

### Bug Fixes (Prior)
- **CORS on all endpoints** — All POST and GET routes now include `Access-Control-Allow-Origin: *` header.
- **`do_POST` duplicate method** — Python silently ignores the first of two identically-named methods; consolidated all POST routes into a single `do_POST`.
- **Library page crash** — Fixed `api_server.ts` data unwrapping bug.
- **deDupe index bugs** — Two file-index counting bugs fixed in `librarian_dream.py`.

### Config
- `config.json` manages all runtime settings: `DEFAULT_TARGET_FOLDER`, `MOVE_DUPLICATES`, `EXCLUDED_FOLDERS`, `PDF_TARGET_CHUNK_MB`, `PDF_PAGE_CHUNK_LIMIT`, `CLEANER_EXCLUDED_EXTENSIONS`, `CLEANER_EXCLUDED_DIRS`.
- Config is live-reloaded via `/save_config` endpoint.

### Known Remaining Issues
- Most files route to `Unknown_Author` due to poor PDF metadata quality.
- `[Errno 36]` filename-too-long errors on some files.
- File Name Cleaner module — implementation paused after config keys added; resume from Step 3 (verify config keys saved correctly).
- Library page file tree is a placeholder design; full redesign planned.
- Metadata save (`/api/metadata/save`) is a stub — XMP write not yet implemented.

---

*This file is maintained manually. Update after each development session.*

## Session — 2026-04-19

### Library Page — Full Two-Pane Redesign
- **New `FolderTree.tsx`** — Left panel (208px) with persistent, lazy-loading collapsible folder tree. Clicking a folder sets the right panel to that directory. Auto-expands to the active path on load. Shows `Library Root` home entry and a spinner while loading.
- **Rewritten `FileTree.tsx`** — Right panel list view. Changes from prior version:
  - Added **Kind** column (E-Book, PDF, Document, Video, Audio, Image, Spreadsheet, Archive, Code, Text, etc.)
  - Default sort is now **Date Modified descending** (newest first) instead of unsorted
  - Added **search bar** with keyword AND logic plus `"quoted phrase"` exact-match support; count badge updates live (e.g. `4 / 31 items`)
  - Breadcrumb trail moved into the file list toolbar
  - Directories always float to the top when not searching
  - Empty-state illustrations for empty folder and no-search-results
- **Rewritten `LibraryExplorer.tsx`** — New two-pane host:
  - Switched path persistence from `sessionStorage` to **localStorage** (`dl_last_path_library`) — last-used folder survives browser restarts
  - Left panel (FolderTree) + right panel (FileTree) + optional FileDetailPanel in a single flex row
  - Updated info strip to document the new layout behaviours

### TypeScript
- `tsc --noEmit` passes clean after all three files written.
