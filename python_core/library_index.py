"""
library_index.py — Data Librarian
===================================
Persistent SQLite index for fast duplicate detection on large libraries.

Two operating modes determined automatically by comparing the scan path
against LIBRARY_MOUNT_PATH in config:

  PERSISTENT mode  — scan path is inside the NAS mount point.
      Index stored at ~/.librarian/library_index.db
      On each scan, only new/modified files are re-hashed.
      Unchanged files (same mtime + size) reuse the cached SHA-256.

  EPHEMERAL mode   — any other path (iCloud staging, Downloads, etc.)
      No database is written. Hashes are computed fresh every run and
      kept in memory only for the duration of that run.

Public API
----------
  get_cached_hash(filepath, db_conn)  -> str | None
  update_hash(filepath, sha256, db_conn)
  open_index(scan_dir)                -> (conn | None, is_persistent)
  close_index(conn, scan_dir)         — prunes stale rows then closes
"""

import os
import sqlite3
import time
from typing import Optional, Tuple

# Index database location
_INDEX_DIR  = os.path.expanduser("~/.librarian")
_INDEX_FILE = os.path.join(_INDEX_DIR, "library_index.db")

_CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS file_index (
    path        TEXT PRIMARY KEY,
    sha256      TEXT NOT NULL,
    file_size   INTEGER NOT NULL,
    mtime       REAL NOT NULL,
    last_seen   REAL NOT NULL
);
"""

_CREATE_IDX = "CREATE INDEX IF NOT EXISTS idx_sha256 ON file_index (sha256);"


# ── Internal helpers ──────────────────────────────────────────────────────────

def _is_persistent_path(scan_dir: str) -> bool:
    """Return True if scan_dir is inside the configured NAS mount point."""
    try:
        # Import here to avoid circular imports at module load time
        import config as cfg
        mount = getattr(cfg, 'LIBRARY_MOUNT_PATH', '').strip()
        if not mount:
            return False
        return os.path.abspath(scan_dir).startswith(os.path.abspath(mount))
    except Exception:
        return False


def _open_db() -> sqlite3.Connection:
    """Open (creating if needed) the persistent index database."""
    os.makedirs(_INDEX_DIR, exist_ok=True)
    conn = sqlite3.connect(_INDEX_FILE, timeout=30)
    conn.execute("PRAGMA journal_mode=WAL;")   # safe for concurrent reads
    conn.execute("PRAGMA synchronous=NORMAL;")  # faster than FULL, still safe
    conn.execute(_CREATE_TABLE)
    conn.execute(_CREATE_IDX)
    conn.commit()
    return conn


def _stat(filepath: str) -> Optional[Tuple[int, float]]:
    """Return (size_bytes, mtime) or None if file is inaccessible."""
    try:
        st = os.stat(filepath)
        return st.st_size, st.st_mtime
    except OSError:
        return None


# ── Public API ────────────────────────────────────────────────────────────────

def open_index(scan_dir: str) -> Tuple[Optional[sqlite3.Connection], bool]:
    """
    Open an index connection appropriate for scan_dir.

    Returns:
        (conn, is_persistent)
        conn is None when running in ephemeral mode.
    """
    if _is_persistent_path(scan_dir):
        try:
            conn = _open_db()
            return conn, True
        except Exception as e:
            print(f"[library_index] WARNING: could not open persistent index: {e}")
            print("[library_index] Falling back to ephemeral mode for this run.")
            return None, False
    return None, False


def close_index(conn: Optional[sqlite3.Connection], scan_dir: str = '') -> None:
    """
    Prune rows for files that no longer exist on disk, then close the connection.
    Only meaningful in persistent mode (conn is not None).
    """
    if conn is None:
        return
    try:
        # Prune stale rows — files deleted since last run
        cursor = conn.execute("SELECT path FROM file_index")
        stale = [row[0] for row in cursor if not os.path.isfile(row[0])]
        if stale:
            conn.executemany("DELETE FROM file_index WHERE path = ?",
                             [(p,) for p in stale])
            conn.commit()
            print(f"[library_index] Pruned {len(stale)} stale entries from index.")
    except Exception as e:
        print(f"[library_index] WARNING: error during index cleanup: {e}")
    finally:
        try:
            conn.close()
        except Exception:
            pass


def get_cached_hash(filepath: str,
                    conn: Optional[sqlite3.Connection]) -> Optional[str]:
    """
    Return the cached SHA-256 for filepath if the file is unchanged
    (same size and mtime as stored), otherwise return None.

    Always returns None in ephemeral mode (conn is None).
    """
    if conn is None:
        return None

    stat = _stat(filepath)
    if stat is None:
        return None
    size, mtime = stat

    try:
        row = conn.execute(
            "SELECT sha256, file_size, mtime FROM file_index WHERE path = ?",
            (os.path.abspath(filepath),)
        ).fetchone()

        if row is None:
            return None  # Not in index yet

        cached_hash, cached_size, cached_mtime = row

        # Tolerate floating-point mtime imprecision (sub-millisecond)
        if cached_size == size and abs(cached_mtime - mtime) < 0.01:
            return cached_hash

        return None  # File changed — need to re-hash

    except Exception as e:
        print(f"[library_index] WARNING: cache lookup failed for {filepath!r}: {e}")
        return None


def update_hash(filepath: str, sha256: str,
                conn: Optional[sqlite3.Connection]) -> None:
    """
    Insert or update the index entry for filepath.
    No-op in ephemeral mode (conn is None).
    """
    if conn is None:
        return

    stat = _stat(filepath)
    if stat is None:
        return
    size, mtime = stat

    try:
        conn.execute(
            """
            INSERT INTO file_index (path, sha256, file_size, mtime, last_seen)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(path) DO UPDATE SET
                sha256    = excluded.sha256,
                file_size = excluded.file_size,
                mtime     = excluded.mtime,
                last_seen = excluded.last_seen
            """,
            (os.path.abspath(filepath), sha256, size, mtime, time.time())
        )
        # Commit in batches — caller commits periodically via batch_commit()
    except Exception as e:
        print(f"[library_index] WARNING: could not update index for {filepath!r}: {e}")


def batch_commit(conn: Optional[sqlite3.Connection]) -> None:
    """Commit pending writes. Call every N files to avoid large transactions."""
    if conn is None:
        return
    try:
        conn.commit()
    except Exception as e:
        print(f"[library_index] WARNING: commit failed: {e}")


def index_stats(conn: Optional[sqlite3.Connection]) -> dict:
    """Return basic stats about the persistent index."""
    if conn is None:
        return {'mode': 'ephemeral', 'entries': 0, 'db_path': None}
    try:
        count = conn.execute("SELECT COUNT(*) FROM file_index").fetchone()[0]
        return {'mode': 'persistent', 'entries': count, 'db_path': _INDEX_FILE}
    except Exception:
        return {'mode': 'persistent', 'entries': -1, 'db_path': _INDEX_FILE}
