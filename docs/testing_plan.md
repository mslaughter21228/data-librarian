# Data Librarian — Testing Plan

## Philosophy

Testing is done in two stages before any PR or feature merge:
1. **Module smoke tests** — spin up both servers, hit each module, confirm core path works.
2. **Regression pass** — after any backend change, re-run the full smoke checklist to confirm nothing else broke.

All tests here are manual (no automated test runner yet). Each item has a **Pass / Fail / Skip** column to fill in per session.

---

## Environment Setup

```bash
# Start both servers
start-librarian

# Verify backend is alive
curl http://localhost:2226/get_config

# Verify frontend is alive
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Both should return 200. If port 2226 is already taken:
```bash
pkill -f web_interface.py && start-librarian
```

---

## 1. Config & Bootstrap

| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| 1.1 | `GET /get_config` returns flat JSON with `DEFAULT_TARGET_FOLDER`, `PORT`, `MOVE_DUPLICATES`, etc. | `{"success": true, "data": {...}}` — no nested `data_librarian` key | |
| 1.2 | Dedupe page loads — path field pre-populated with Library path | Input shows `/home/mslaughter-admin/projects/Library` immediately | |
| 1.3 | Segmenting page loads — all 3 fields pre-populated | Path, Max Size, Page Count all filled | |
| 1.4 | Config page loads — no crash | Fields visible | |
| 1.5 | Dashboard loads — no crash, stats show real file count | Not 0 files, not "undefined" | |

---

## 2. Library Tab

| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| 2.1 | Library page loads — root directory listing appears | Folders and files visible; not empty | |
| 2.2 | Click a folder — navigates into it, breadcrumb updates | New listing shown, breadcrumb path extends | |
| 2.3 | Click ".." entry — navigates to parent | Parent listing shown | |
| 2.4 | Click breadcrumb segment — jumps to that level | Correct listing shown | |
| 2.5 | Click a file — detail panel slides in on right | Panel shows filename, size, dates, "Edit Metadata" button | |
| 2.6 | Click same file again — detail panel closes | Panel hidden | |
| 2.7 | Click "Edit Metadata" in detail panel — navigates to `/metadata?file=<path>` | Metadata page loads with correct file pre-selected | |
| 2.8 | Sort by Name / Size / Modified / Created — ordering changes correctly | Directories always sort first | |
| 2.9 | Refresh button — clears localStorage cache and re-fetches | Spinner appears then data reloads | |
| 2.10 | Navigate deep → reload page → session restored | Returns to last visited path | |

---

## 3. Dashboard

| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| 3.1 | "Total Size" stat card — shows real GB/MB value | Non-zero, sensible value | |
| 3.2 | Activity graph loads — bars visible for any day a dedupe ran | Chart renders; bars on dates with log files | |
| 3.3 | Activity graph — days with no runs show zero-height bars | No bars on empty days, no crash | |
| 3.4 | Activity graph — "Backend unavailable" state when server is down | Warning message + Retry button visible | |
| 3.5 | Activity graph refreshes every 30s without page reload | Updated timestamp changes | |
| 3.6 | Organize Library button — triggers POST `/api/action`, logs appear in terminal | "Module started" response | |

---

## 4. Dedupe Module

| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| 4.1 | Path pre-populated on page load | Correct library path shown | |
| 4.2 | Start with empty path — error shown in terminal | "Target folder path is required" error | |
| 4.3 | Start with valid path — POST `/run_script`, status = "started" | Terminal logs scan starting | |
| 4.4 | While running — Start button shows spinner + "Running..." | Button disabled | |
| 4.5 | Polling `/check_status` — terminal logs update during scan | Activity visible | |
| 4.6 | On completion — "Dedupe process completed." in terminal | `isRunning` resets, button re-enables | |
| 4.7 | Second run while first running — returns "already running" | Warning in terminal | |
| 4.8 | Log file path returned in `/check_status` — terminal shows it | Log path visible | |

---

## 5. Segmenting Module

| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| 5.1 | All 3 fields pre-populated from config | Path, Max Size, Page Count correct | |
| 5.2 | Start with empty path — error | "Target folder path is required" | |
| 5.3 | Start with valid path — POST `/run_pdf_splitter`, status = "started" | Terminal logs start message | |
| 5.4 | Polling `/check_pdf_status` — stops when `running: false` | "PDF splitter completed." in terminal | |

---

## 6. Metadata Editor

| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| 6.1 | Metadata page loads — file list visible | Supported files shown (epub, pdf, etc.) | |
| 6.2 | Folder navigation — click a folder, listing updates | Dir listing changes | |
| 6.3 | Search input — filters by filename | Only matching files shown | |
| 6.4 | Select a file — right panel populates | Fields shown (empty stubs OK for now) | |
| 6.5 | "Edit Metadata" button — form becomes editable | Input fields unlocked | |
| 6.6 | Add a tag — tag appears in tag list | Tag chip visible | |
| 6.7 | Remove a tag — tag disappears | Tag chip gone | |
| 6.8 | Cancel — reverts to pre-edit state | No changes saved | |
| 6.9 | Save — POST `/api/metadata/save`, success banner appears | "Metadata saved" shown (stub OK) | |
| 6.10 | Deep-link from Library tab ("Edit Metadata" button) — correct file pre-selected | Right panel shows that file's metadata | |

---

## 7. Cross-Module Regression (run after any backend change)

| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| 7.1 | `GET /get_config` still works | Flat JSON response | |
| 7.2 | `POST /api/library` with `{"path": ""}` — root listing | Array of items returned | |
| 7.3 | `POST /api/library` with `{"path": "../../../etc"}` — blocked | `{"success": false, "error": "Path traversal not allowed"}` | |
| 7.4 | `GET /api/activity` — returns 14-day data structure | `labels` array length = 14 | |
| 7.5 | `POST /api/metadata/get` with valid path — returns stub | `xmp` key present in response | |
| 7.6 | `POST /api/metadata/save` — returns stub success | `{"success": true}` | |
| 7.7 | `GET /check_status` — returns `{"running": false/true}` | Correct state | |
| 7.8 | `GET /check_pdf_status` — returns `{"running": false/true}` | Correct state | |

---

## 8. Stop/Start Reliability

| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| 8.1 | `stop-librarian` kills both processes | Port 2226 and 3000 both free | |
| 8.2 | `start-librarian` after stop — both come back clean | No "port already in use" error | |
| 8.3 | Ctrl+C in terminal during a scan — `keep_running = False` | Scan stops gracefully | |

---

## Notes

- **`labrarybackup` restore workflow**: Before any destructive test run on Library, run the rsync restore script (TBD) to reset the test library from the backup.
- **Production library** is at `/mnt/Library` — never target it directly with dedupe until the test library passes all module tests.
- **Metadata write implementation** is pending design discussion. All `/api/metadata/save` calls are stubs until that conversation happens.
