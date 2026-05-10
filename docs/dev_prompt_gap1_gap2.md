# Data Librarian — Dev Prompt: Gap 1, Gap 2, Gap 3 + User Preferences & Workflow Context

---

## Who This App Is For

Data Librarian is a tool for **hobbyists** — both newcomers and experienced power users managing personal digital libraries. The design philosophy is: flexible by default, no configuration required to get started, but enough knobs exposed in the UI that a nerd can tune it without touching JSON. Enterprise use cases are explicitly out of scope; this tool does not need to accommodate IT departments, static deployment paths mandated by policy, or multi-user environments.

---

## Context — What This App Does and How It Is Used

Data Librarian is a local Python web app (`web_interface.py`) with a Next.js UI front-end. It manages a personal digital library that can contain tens of thousands of files across a deep, categorized folder hierarchy (PDFs, EPUBs, and other formats). There are several semi-independent modules that the user runs **in a deliberate sequence**:

1. **File Name Cleaner** (`file_cleaner.py`) — renames files to remove noise
2. **deDuper / Weeder** (`run_script()` in `web_interface.py`) — SHA-256 based duplicate detection
3. **Organizer** (`librarian_dream.py`) — moves files into `Organized_Books/Author/` hierarchy using PDF/EPUB metadata

Configuration lives in `config.json` and is loaded by `config.py` on import. The relevant settings are:

```json
{
  "DEFAULT_TARGET_FOLDER": "",
  "MOVE_DUPLICATES": false,
  "DUPLICATE_HOLDING_DIR": "./_DuplicateHoldingBin",
  "EXCLUDED_FOLDERS": ["_DuplicateHoldingBin", "Organized_Books"],
  "USER_EXCLUDED_FILES": [],
  "ORGANIZER_DEST_SUBFOLDER": "Organized_Books",
  "CLEANER_EXCLUDED_EXTENSIONS": [".py", ".json", ".html", ".txt", ".sh"],
  "CLEANER_EXCLUDED_DIRS": ["_DuplicateHoldingBin", "Organized_Books"]
}
```

The user's intended workflow before running the app is:
- Mass-rename files using an external tool (KRename / Bulk File Renamer) to get rid of the worst noise
- Run the Cleaner, then the deDuper, then the Organizer
- Files arrive from sources like Anna's Archive and carry extremely noisy names
- Library setups vary widely — some users have everything in one folder on one drive, others have an intake staging folder on a different drive or mount point from their organized library. Both must work.

---

## Gap 1 — File Name Cleaner: Preserve Metadata Before You Destroy It

### The Problem

Anna's Archive filenames and similar sources encode a surprising amount of structured data inside the filename itself before any metadata extraction is possible. The current `clean_filename()` in `file_cleaner.py` strips all of this out without first reading or persisting it anywhere. Once the name is cleaned, that information is gone unless the user recovers it manually.

Examples of data embedded in raw filenames:

- **ISBN-13 / ISBN-10**: `9780312322205`, `9781891868184` — 13-digit strings starting with `978` or `979`, or 10-digit strings
- **Anna's Archive hash** (MD5-like): `276a77e03e47cbf50e6414736fc7b005` — 32-char hex string
- **Publication date / year**: `-- 2004 --`, `-- 2016;2015 --`
- **Publisher**: `-- Thomas Dunne Books_St_ Martin's Press --`
- **Author**: `-- Booth, Martin --`
- **Title**: everything before the first ` -- `
- **Edition info**: `1st ed_`, `First Picador edition`
- **Site prefix** (source identifier): `dokumen.pub_`, `annas-arch-`, numeric IDs like `74663177-`

### What Must Be Built

**Before** `clean_filename()` wipes the filename, a new function `extract_filename_metadata(filename: str) -> dict` must parse and return a structured dict containing whatever can be reliably extracted. This should cover at minimum:

| Field | Extraction Rule |
|---|---|
| `isbn` | First 13-digit string starting with `978` or `979`, or 10-digit ISBN-10 pattern |
| `year` | 4-digit year between `1800` and current year, preferably inside `-- YYYY --` delimiters |
| `author_raw` | Text in the second `-- ... --` segment of an Anna's Archive name |
| `publisher_raw` | Text in third or fourth `-- ... --` segment |
| `source_site` | Matched value from `SITE_PREFIX_PATTERN` if found |
| `archive_hash` | 32-char hex string (MD5 signature) if found |
| `edition` | Common edition strings (`1st ed`, `First edition`, etc.) |

This extracted dict should then be **written into the file's XMP/PDF metadata** using the existing `metadata_handler.py` (`write_metadata()`) **before** the filename is cleaned — but only for fields that are currently empty in the file's existing metadata. Never overwrite a field that already has a value. This is a "fill gaps only" operation.

The call order must be:

```
extract_filename_metadata(filename)
  → write extracted fields to XMP (gaps only, via metadata_handler.write_metadata)
  → then call clean_filename(filename) as today
```

**Config additions needed** in `config.json` / `config.py` DEFAULTS:

```json
"CLEANER_EXTRACT_METADATA_BEFORE_RENAME": true,
"CLEANER_METADATA_FIELDS_TO_EXTRACT": ["isbn", "year", "author_raw", "publisher_raw", "source_site", "archive_hash", "edition"]
```

### Module Collision Note (For the Developer)

The `EXCLUDED_FOLDERS` list (`["_DuplicateHoldingBin", "Organized_Books"]`) is shared across the deDuper, the Cleaner, and the Organizer because they all import from `config.py`. This is by design and is not a bug. The user runs these modules sequentially, not concurrently. The key invariant to preserve is:

- `_DuplicateHoldingBin` must always be excluded from ALL module scans (Cleaner, deDuper, Organizer) so that files staged for review are never re-processed
- `Organized_Books` must be excluded from the Cleaner and deDuper scans so that already-organized files are not touched
- The user may add additional holding/review folders (e.g., `michael_review`) to `EXCLUDED_FOLDERS` via the UI — these should be respected by all three modules

No structural changes to the exclusion logic are needed; it is already correct. The only thing needed is to surface `EXCLUDED_FOLDERS` as a clearly editable list in the Settings UI so the user can add custom folders like `michael_review` without editing JSON manually.

---

## Gap 2 — deDuper: Keep the Right Copy, Support Multi-Root Paths

### The Problem

#### Sub-problem A: "First seen wins" is wrong

The current duplicate detection loop in `run_script()` designates whichever file `os.walk` encounters **first** as the "original" and moves the second copy to `_DuplicateHoldingBin`. `os.walk` traversal order is filesystem-dependent and not predictable. 

In practice this means: if a messy Anna's Archive filename at the root of the scan folder is encountered before the cleanly-renamed copy inside a curated sub-folder, the clean copy gets moved to the bin and the messy one is kept. This is the opposite of the desired behavior.

**The fix**: When a duplicate pair is found, apply a **keeper scoring function** to both copies and move the lower-scoring one. Score each file path on these criteria (higher = better, keep this one):

| Criterion | Score |
|---|---|
| Path depth (more folders = more organized) | +1 per directory level below root |
| Filename length (shorter = cleaner) | +`max_len - len(filename)` normalized |
| Absence of noise patterns (Anna's hash, ISBN trail, site prefix, `--`) | +5 if clean, 0 if noisy |
| Presence in a non-root sub-folder (not direct child of scan root) | +3 |
| File extension matches a "preferred" list (configurable) | +1 |

In a tie, keep the file with the shorter absolute path (it's more likely to be in a curated location).

The existing log output should be updated to show which copy was kept and why (score breakdown), so the user can audit decisions.

#### Sub-problem B: The scan root assumption

The current code assumes that both the messy source files and the clean destination files share the same root folder — the `DEFAULT_TARGET_FOLDER`. This breaks the user's actual workflow where:

- **Intake folder**: `~/intake/` — where raw/noisy downloads land. Files here are processed and then moved to the library. When a file is moved out of intake, it is gone from intake (move, not copy).
- **Library root**: `/mnt/library/` (or any separately mounted path) — the organized, curated library. Sub-folder structure is maintained here.

These two roots are **different filesystems or mount points** and may not share a common parent.

**The fix**: Add a second configurable path, `SECONDARY_SCAN_FOLDER`, to `config.json`. When set, the deDuper merges the file list from both `DEFAULT_TARGET_FOLDER` and `SECONDARY_SCAN_FOLDER` into a single hash map before making any decisions. The keeper scoring function (Sub-problem A) handles which copy to keep — and because the library root path is deeper/cleaner, those copies will naturally score higher and be kept.

New config key:

```json
"SECONDARY_SCAN_FOLDER": ""
```

When `SECONDARY_SCAN_FOLDER` is blank (the default), behavior is identical to today — single-root scan. When set, both folders are walked and merged into one hash map before any keeper decisions are made.

The `_DuplicateHoldingBin` is always created relative to `DEFAULT_TARGET_FOLDER` (the primary/library root). This keeps the bin predictable and easy to find regardless of how the user's folders are laid out — no absolute path configuration needed.

**Important edge case**: if both copies come from different roots (intake vs. library), always keep the library copy regardless of score, and move the intake copy to the bin. The intake folder is transient by definition; the library is the source of truth. A file moved out of intake is simply gone from intake — that is the expected and correct behavior.

### Suggested Config Shape (final)

```json
{
  "DEFAULT_TARGET_FOLDER": "/mnt/library",
  "SECONDARY_SCAN_FOLDER": "~/intake",
  "MOVE_DUPLICATES": true,
  "DUPLICATE_HOLDING_DIR": "./_DuplicateHoldingBin",
  "EXCLUDED_FOLDERS": ["_DuplicateHoldingBin", "Organized_Books", "michael_review"],
  "DEDUPE_KEEPER_SCORING": true,
  "DEDUPE_PREFERRED_EXTENSIONS": [".pdf", ".epub"]
}
```

### UI Changes Required

The Settings panel must expose:
1. `DEFAULT_TARGET_FOLDER` — primary library root (already present)
2. `SECONDARY_SCAN_FOLDER` — intake/staging folder (new field, optional; leave blank to use single-root mode)
3. `DUPLICATE_HOLDING_DIR` — bin location, always relative to `DEFAULT_TARGET_FOLDER` (already present; remove any absolute-path option — not needed for this audience)
4. `EXCLUDED_FOLDERS` — editable tag/chip list so user can add folders like `michael_review` without touching JSON (existing field, needs UI improvement from a plain text input to an add/remove chip editor)
5. `DEDUPE_KEEPER_SCORING` — toggle: "Keep first seen (legacy)" vs. "Keep best copy (scored)" (new; default to scored)

---

## Files to Modify

| File | Change |
|---|---|
| `python_core/file_cleaner.py` | Add `extract_filename_metadata()`, call it before `clean_filename()`, write to XMP via `metadata_handler` |
| `python_core/web_interface.py` | Refactor `run_script()`: add `SECONDARY_SCAN_FOLDER` merge, replace first-seen logic with keeper scoring function |
| `python_core/config.py` | Add new keys to `DEFAULTS` dict and `load_config()` / `save_config()` |
| `_legacy/config.json` + `python_core/config.json` (if present) | Add new keys with safe defaults |
| Dashboard UI (Settings panel) | Add `SECONDARY_SCAN_FOLDER` field, `DEDUPE_KEEPER_SCORING` toggle, and improve `EXCLUDED_FOLDERS` to a chip/tag editor |

## Files to Leave Alone

| File | Reason |
|---|---|
| `python_core/librarian_dream.py` | Organizer is working correctly; no changes needed |
| `python_core/utils.py` | `calculate_sha256` and `sanitize_filename` are solid; no changes needed |
| `python_core/metadata_handler.py` | Will be called by the Cleaner, but its interface is unchanged |
| All TypeScript / Next.js app layer | Architecture is sound; only the Settings UI panel needs additions |

---

## Non-Goals (Do Not Do)

- Do not change the SHA-256 hashing approach — it is correct
- Do not add fuzzy/name-based duplicate matching — content hash is sufficient and far more reliable
- Do not merge the Cleaner, deDuper, and Organizer into a single pipeline — the user intentionally runs them separately and in sequence
- Do not auto-populate metadata fields that have existing values — "fill gaps only"
- Do not rename files inside `Organized_Books` or `_DuplicateHoldingBin` during a Cleaner run
- Do not add enterprise features: no static absolute bin paths, no multi-user support, no IT deployment considerations. This is a personal tool for hobbyists. Keep it simple.

---

## Gap 3 — Persistent Index for deDupe (COMPLETED)

### The Problem

The library contains significantly more than 10,000 files. Re-hashing every file on every deDupe run against the NAS (`/mnt/library`) would be prohibitively slow. The user runs deDupe twice: once against a local staging folder, and once against the NAS after copying organized files over. The NAS run must be fast.

Additionally: the deDupe scan had no cancellation mechanism. The UI Stop button was wired to `organize_stop_event` but was never passed into `run_dedupe()`, so it had no effect.

### The Solution

**Two-mode index** implemented in `library_index.py`:

- **Persistent mode** (NAS path): SQLite database at `~/.librarian/library_index.db`. Stores `path`, `sha256`, `file_size`, `mtime`, `last_seen`. On each run: if a file's `mtime` and `size` match the stored record, the cached hash is returned without re-reading the file. Only new or modified files are hashed. First run is slow (full hash pass). All subsequent runs are fast (only delta).
- **Ephemeral mode** (all other paths): Hashes computed in memory, nothing stored. Correct for staging folders that change constantly between runs.

Mode is selected automatically by comparing `os.path.abspath(scan_dir)` against `os.path.abspath(LIBRARY_MOUNT_PATH)`. No user action required other than setting `LIBRARY_MOUNT_PATH` once in Settings.

**New config key:**
```json
"LIBRARY_MOUNT_PATH": "/mnt/library"
```

**Stop event:** `run_dedupe()` now accepts `stop_event: Optional[threading.Event]`. Checked on every file iteration. Returns `{'cancelled': True, ...}` if set. `web_interface.py` passes `organize_stop_event` to `run_dedupe()`.

### Two-Run Workflow (Expected and Correct)

```
Run 1: Active folder = local staging (iCloud, ~/Downloads, etc.)
        → Ephemeral mode. Fast. Remove duplicates from staging.
        → Copy cleaned/organized files to /mnt/library

Run 2: Active folder = /mnt/library
        → Persistent mode. First run: slow (full hash pass, builds index).
        → Subsequent runs: fast (only new files hashed).
        → Catches any duplicates introduced during migration.
```

The user explicitly confirmed this workflow is fine and expected. If the second run produces incorrect keeper selections, the log is reviewed, manual corrections are made, and the code is fixed.

### Keeper Logic Rationale (User-Confirmed)

When two files have the same SHA-256 hash:
- **Deeper path wins** — a file inside `Author/Title/` was previously organized; a file at the root is a fresh messy download. Depth is a reliable proxy for curation quality.
- **Clean filename wins** — Anna's Archive noise patterns (MD5 hashes, ISBN strings, ` -- ` delimiters, site prefixes, leading numeric IDs) identify uncleaned downloads.
- **Library root beats intake** — if one copy is in `LIBRARY_MOUNT_PATH` and the other is in the staging folder, the library copy always wins regardless of score. The intake folder is transient by definition.
- **Never auto-delete** — duplicates are moved to `_DuplicateHoldingBin/`. The user reviews the bin and the log, makes any manual corrections, then deletes. No file is ever permanently deleted automatically.

---

## User Preferences & Workflow Notes (For AI Agents)

This section captures decisions, preferences, and constraints expressed by the user across multiple sessions. An AI agent resuming work on this project should treat these as requirements, not suggestions.

### Library Facts
- **Library size**: 10,000+ files (significantly more — "a lot more"). Plan for scale.
- **Primary source**: Anna's Archive. Filenames are extremely noisy.
- **NAS**: Synology NAS. Mounted at `/mnt/library`. This is the authoritative library.
- **Local staging**: iCloud or a local folder used as intake before copying to NAS.
- **File formats**: Primarily PDF and EPUB. Some other formats present but rare.

### Pipeline Order (Canonical — Do Not Change)
```
1. Set active folder in Library tab
2. deDupe       — FIRST. Remove duplicates before any other processing.
3. Metadata     — Review/edit metadata on surviving files.
4. Organize     — Rename and move into Author/Title hierarchy.
5. Copy to NAS  — rsync or manual copy to /mnt/library.
```

**Why deDupe is first:** Running Organize before deDupe wastes passes — files get organized into a folder structure and then deleted. Running Metadata before deDupe wastes manual metadata edits on files that will be deleted. deDupe must always be first.

### UI Preferences
- **Shared active folder**: Set once in Library tab, consumed by all modules. Module pages show read-only folder display, not editable inputs. This prevents the confusion of each module pointing at a different folder.
- **Stop buttons**: Every long-running module must have a Stop button that works. This is non-negotiable.
- **Real-time logging**: Log output must appear in the UI terminal panel as it happens, not after completion.
- **Review before delete**: The user always reviews `_DuplicateHoldingBin` manually. Automated deletion is never acceptable.

### Development Preferences
- **Desktop Commander is available** for direct file writes on the host machine. Use it.
- **Cowork mode** has full access to `/home/mslaughter-admin/projects/`. All project files are there.
- **Python files live in** `python_core/`. TypeScript/Next.js pages live in `app/`. Components in `components/`.
- **Do not create separate CSS or JS files** for Next.js — everything goes in a single `.tsx` file.
- **Test after changing Python modules** — run `python3 -m pytest` from `python_core/`.
- **Config changes require four places**: `DEFAULTS` dict, module-level global, `load_config()`, and `config.json`.
- **The `--` separator is sacred** — `sanitize_filename()` must never collapse `--` to `-`. It is the canonical field separator in the naming convention. Only collapse runs of 3+ hyphens.

### What Is Not Built Yet (Known Gaps)
- **Dashboard stat cards are hardcoded** — "deDupe: 0 Files flagged" and "Efficiency: 94%" show static values. Should be wired to last dedupe/organize log.
- **Publish to NAS module** — a UI button/module for the final `rsync` step from local to `/mnt/library` does not exist yet. Currently a manual step.
- **The pipeline has not been run against the real library** — all testing has been against `/home/mslaughter-admin/projects/Library` (test library). The NAS library at `/mnt/library` has not been touched.

### Things to Leave Alone
- `python_core/metadata_handler.py` — interface is stable; call it, don't change it
- `python_core/librarian_dream.py` — backward-compat shim; leave it
- `python_core/dashboard.html` and `python_core/index.html` — dead code, old prototypes; ignore them
- `_legacy/` folder — old code; ignore it
- The SHA-256 hashing approach — it is correct and sufficient
- Fuzzy/name-based duplicate matching — not needed, content hash is reliable enough
