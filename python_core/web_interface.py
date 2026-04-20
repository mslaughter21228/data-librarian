"""
Web Interface for The Data Librarian - Duplicate File Cleaner
"""

import http.server
import socketserver
import shutil
import threading
import time
import os
import json
import codecs
import io
import sys
from urllib.parse import urlparse
from datetime import datetime

# Force unbuffered output for real-time logging
sys.stdout.reconfigure(line_buffering=True)
sys.stderr.reconfigure(line_buffering=True)

# Import from local modules
try:
    from config import EXCLUDED_FOLDERS, DUPLICATE_HOLDING_DIR, LOG_NAME_PREFIX, MOVE_DUPLICATES, PORT, EXCLUDED_FILES, PDF_TARGET_CHUNK_MB, PDF_PAGE_CHUNK_LIMIT, DEFAULT_TARGET_FOLDER, load_config
    from utils import sanitize_filename, calculate_sha256, log_message
    from pypdf import PdfReader, PdfWriter
    from librarian_dream import organize_library
except ImportError:
    print("Error: 'config.py', 'utils.py', or 'pypdf' not found. Please make sure they are in the same directory and pypdf is installed.")
    sys.exit(1)

try:
    from metadata_handler import read_metadata, write_metadata as _write_metadata
    METADATA_ENABLED = True
except ImportError as _me:
    print(f"[Metadata] metadata_handler not available: {_me}")
    METADATA_ENABLED = False


# --- Binder (Merge) State ---
binder_running = False
binder_progress = {'current': 0, 'total': 0, 'message': ''}

# --- Global State Variables ---
output_buffer = []
script_running = False
organize_running = False
script_process = None
keep_running = True
total_files = 0
files_checked = 0
log_file_path = ""
# Use DEFAULT_TARGET_FOLDER from config if set, otherwise fall back to cwd
root_directory = DEFAULT_TARGET_FOLDER if DEFAULT_TARGET_FOLDER else os.path.abspath(".")

# --- PDF Global Variables ---
pdf_script_running = False
pdf_keep_running = True
pdf_output_buffer = []
# ------------------------------


def run_script(target_folder=None):
    global script_running, output_buffer, files_checked, total_files, script_process, keep_running, log_file_path, root_directory

    script_running = True
    output_buffer = []  
    files_checked = 0  
    total_files = 0
    keep_running = True
    log = None

    try:
        start_time = datetime.now()
        timestamp = start_time.strftime("%m-%d-%Y_%H-%M-%S")
        log_file_name = f"{os.path.splitext(LOG_NAME_PREFIX)[0]}_{timestamp}.txt"
        
        scan_dir = target_folder if target_folder else root_directory
        dynamic_holding_dir = os.path.join(scan_dir, "_DuplicateHoldingBin")
        
        if not os.path.exists(dynamic_holding_dir):
            try:
                os.makedirs(dynamic_holding_dir)
            except OSError as e:
                output_buffer.append(f"*** CRITICAL ERROR: Could not create holding directory '{dynamic_holding_dir}': {e!r}\n")
                return

        log_path = os.path.join(dynamic_holding_dir, log_file_name)
        log_file_path = os.path.abspath(log_path) 

        file_hashes = {}
        files_moved = 0

        try:
            log = codecs.open(log_path, "w", encoding="utf-8")
            
            log_message(log, f"DUPLICATE FILE DETECTION STARTED AT: [{start_time.isoformat()}]\n")
            log_message(log, "----------------------------------------------------------------------------------------------------\n\n")

            log_message(log, "Calculating total files...\n")
            temp_total = 0
            
            for root, dirs, files in os.walk(scan_dir):
                dirs[:] = [d for d in dirs if d not in EXCLUDED_FOLDERS]
                current_files = [f for f in files if f not in EXCLUDED_FILES]
                temp_total += len(current_files)
            
            total_files = temp_total 
            log_message(log, f"Scanning directory: {scan_dir}\n")
            log_message(log, f"Total files to scan: {total_files}\n\n")
            
            files_processed = 0 
            for root, dirs, files in os.walk(scan_dir):
                if not keep_running:
                    log_message(log, "\n*** USER CANCELLATION DETECTED ***\n")
                    break
                    
                dirs[:] = [d for d in dirs if d not in EXCLUDED_FOLDERS]

                for filename in files:
                    if not keep_running:
                        break

                    if filename in EXCLUDED_FILES:
                        continue

                    filepath = os.path.join(root, filename)
                    files_checked += 1 
                    files_processed += 1 
                    
                    try:
                        file_hash = calculate_sha256(filepath)
                        if file_hash is None:
                            continue

                        if file_hash in file_hashes:
                            original_filepath = file_hashes[file_hash]
                            original_filename = os.path.basename(original_filepath)
                            duplicate_filename = os.path.basename(filepath)
                            sanitized_filename = sanitize_filename(duplicate_filename) 
                            sanitized_dest_path = os.path.join(dynamic_holding_dir, sanitized_filename)

                            if MOVE_DUPLICATES:
                                log_message(
                                    log,
                                    f"Duplicate found & MOVED:\n  Original: [{original_filepath!r}]\n  Duplicate: [{filepath!r}]\n  Moved to: [{sanitized_dest_path!r}]\n\n",
                                )
                                try:
                                    if os.path.exists(filepath): 
                                        shutil.move(filepath, sanitized_dest_path)
                                        files_moved += 1
                                    else:
                                        log_message(log, f"*** WARNING: File vanished before move: {filepath!r}\n\n")
                                except (OSError, IOError) as e:
                                    log_message(log, f"*** ERROR moving file: {duplicate_filename!r} to {sanitized_dest_path!r} - {e!r}\n\n")
                            else:
                                log_message(
                                    log,
                                    f"Duplicate found (DRY RUN - NOT MOVED):\n  Original: [{original_filepath!r}]\n  Duplicate: [{filepath!r}]\n  Would move as: [{sanitized_dest_path!r}]\n\n",
                                )
                        else:
                            file_hashes[file_hash] = filepath
                            
                    except Exception as e:
                        log_message(log, f"*** ERROR processing file [{filepath!r}]: {e!r}\n\n")

            end_time = datetime.now()
            duration = end_time - start_time
            log_message(
                log,
                f"\n----------------------------------------------------------------------------------------------------\n"
                f"DUPLICATE FILE DETECTION FINISHED AT: [{end_time.isoformat()}]\n"
                f"Total Time Taken: [{duration}]\n"
                f"Total Files Processed: [{files_processed}]\n"
                f"Total Files Moved: [{files_moved}]\n",
            )

        except (OSError, IOError) as e:
            error_msg = f"*** CRITICAL ERROR: Failed to open or write to log file: {log_path!r} - {e!r}\n"
            sys.stderr.write(error_msg)
            output_buffer.append(error_msg) 
        except Exception as e:
            error_msg = f"*** UNEXPECTED ERROR in run_script: {e!r}\n"
            sys.stderr.write(error_msg)
            output_buffer.append(error_msg)
            if log:
                log_message(log, error_msg)
        finally:
            if log:
                log.close()

    except Exception as e:
         error_msg = f"*** CRITICAL INIT ERROR: {e!r}\n"
         sys.stderr.write(error_msg)
         output_buffer.append(error_msg)
    
    finally:
        script_running = False
        script_process = None 

# --- ORGANIZER LOGIC ---
def run_organizer(target_folder=None):
    global organize_running
    organize_running = True
    try:
        organize_library(target_folder)
    except Exception as e:
        print(f"*** ERROR in organize_library: {e!r}")
    finally:
        organize_running = False

# --- PDF LOGIC ---
def split_pdf_adaptive(file_path, target_max_mb, initial_page_chunk, log):
    try:
        reader = PdfReader(file_path)
        total_pages = len(reader.pages)
        base_name = os.path.splitext(file_path)[0]
        current_page_chunk = initial_page_chunk
        start_page = 0
        while start_page < total_pages:
            if not pdf_keep_running: return
            temp_files_created = []
            success = False
            while not success:
                if not pdf_keep_running: return
                end_page = min(start_page + current_page_chunk, total_pages)
                writer = PdfWriter()
                for i in range(start_page, end_page): writer.add_page(reader.pages[i])
                output_filename = f"{base_name}_pages_{start_page + 1}-{end_page}.pdf"
                try:
                    with open(output_filename, "wb") as out_file: writer.write(out_file)
                    temp_files_created.append(output_filename)
                    file_size_mb = os.path.getsize(output_filename) / (1024 * 1024)
                    if file_size_mb > target_max_mb:
                        log_message(log, f"   > Chunk {output_filename} is {file_size_mb:.2f}MB (Max: {target_max_mb}MB). Too big.\n")
                        os.remove(output_filename)
                        temp_files_created.remove(output_filename)
                        ratio = target_max_mb / file_size_mb
                        current_page_chunk = max(1, int(current_page_chunk * ratio * 0.9))
                        log_message(log, f"   > Retrying with {current_page_chunk} pages...\n")
                    else:
                        success = True
                        log_message(log, f"   > Created: {os.path.basename(output_filename)} ({file_size_mb:.2f}MB)\n")
                        start_page = end_page
                except Exception as e:
                    log_message(log, f"*** ERROR writing chunk: {e}\n")
                    return
    except Exception as e:
        log_message(log, f"*** ERROR processing PDF {file_path}: {e}\n")

def run_pdf_script(target_folder, max_mb, initial_pages):
    global pdf_script_running, pdf_output_buffer, pdf_keep_running
    pdf_script_running = True
    pdf_output_buffer = []
    pdf_keep_running = True
    start_time = datetime.now()
    def log_to_buffer(msg):
        pdf_output_buffer.append(msg)
        print(msg, end="")
    try:
        log_to_buffer(f"PDF SPLITTER STARTED AT: [{start_time.isoformat()}]\nTarget Folder: {target_folder}\nMax File Size: {max_mb} MB\nInitial Page Split: {initial_pages}\n" + "-" * 60 + "\n")
        if not os.path.exists(target_folder):
            log_to_buffer(f"*** ERROR: Folder not found: {target_folder}\n")
            return
        pdf_files_found = 0
        for root, dirs, files in os.walk(target_folder):
            if not pdf_keep_running: break
            for file in files:
                if not pdf_keep_running: break
                if file.lower().endswith('.pdf'):
                    if "_pages_" in file and file[file.rfind("_pages_")+7:file.rfind("_pages_")+8].isdigit(): continue
                    file_path = os.path.join(root, file)
                    try:
                        size_mb = os.path.getsize(file_path) / (1024 * 1024)
                        if size_mb > max_mb:
                            pdf_files_found += 1
                            log_to_buffer(f"Processing: {file} ({size_mb:.2f} MB)...\n")
                            class LogWrapper:
                                def write(self, msg): log_to_buffer(msg)
                                def flush(self): pass
                            split_pdf_adaptive(file_path, max_mb, initial_pages, LogWrapper())
                            log_to_buffer(f"Done with {file}\n\n")
                    except OSError as e:
                        log_to_buffer(f"*** ERROR accessing {file}: {e}\n")
        duration = datetime.now() - start_time
        log_to_buffer("-" * 60 + f"\nFINISHED. Processed {pdf_files_found} large PDF(s).\nTotal Time: {duration}\n")
    except Exception as e: log_to_buffer(f"*** CRITICAL ERROR: {e}\n")
    finally: pdf_script_running = False

# --- BINDER (MERGE) LOGIC ---

def run_binder_pdf(source_folder, output_path):
    """Merge all PDFs in source_folder (sorted by name) into output_path."""
    global binder_running, binder_progress
    binder_running = True
    binder_progress = {'current': 0, 'total': 0, 'message': 'Scanning for PDF files...'}
    try:
        pdf_files = sorted(
            [os.path.join(source_folder, f) for f in os.listdir(source_folder)
             if f.lower().endswith('.pdf') and os.path.isfile(os.path.join(source_folder, f))],
            key=lambda p: os.path.basename(p).lower()
        )
        if not pdf_files:
            binder_progress['message'] = 'No PDF files found in folder.'
            return
        binder_progress['total'] = len(pdf_files)
        binder_progress['message'] = f'Merging {len(pdf_files)} PDF files...'

        writer = PdfWriter()
        for i, path in enumerate(pdf_files, 1):
            binder_progress['current'] = i
            binder_progress['message'] = f'Adding: {os.path.basename(path)} ({i}/{len(pdf_files)})'
            reader = PdfReader(path)
            for page in reader.pages:
                writer.add_page(page)

        binder_progress['message'] = f'Writing output file...'
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'wb') as f:
            writer.write(f)
        binder_progress['message'] = f'Done. Merged {len(pdf_files)} files → {os.path.basename(output_path)}'
        print(f'[Binder] PDF merge complete: {output_path}')
    except Exception as e:
        binder_progress['message'] = f'Error: {e}'
        print(f'[Binder] PDF merge error: {e}')
    finally:
        binder_running = False


def run_binder_text(source_folder, output_path):
    """Stitch numerically-named .txt page files into a single output text file."""
    global binder_running, binder_progress
    binder_running = True
    binder_progress = {'current': 0, 'total': 0, 'message': 'Scanning for text page files...'}
    try:
        import re
        all_files = [f for f in os.listdir(source_folder)
                     if f.lower().endswith('.txt') and os.path.isfile(os.path.join(source_folder, f))]
        # Sort numerically by the digits in the filename
        def sort_key(name):
            m = re.search(r'(\d+)', name)
            return int(m.group(1)) if m else 0
        page_files = sorted(all_files, key=sort_key)

        if not page_files:
            binder_progress['message'] = 'No .txt files found in folder.'
            return

        binder_progress['total'] = len(page_files)
        binder_progress['message'] = f'Stitching {len(page_files)} page files...'

        os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as out:
            for i, fname in enumerate(page_files, 1):
                binder_progress['current'] = i
                if i % 100 == 0:
                    binder_progress['message'] = f'Stitching page {i} of {len(page_files)}...'
                fpath = os.path.join(source_folder, fname)
                try:
                    content = open(fpath, 'r', encoding='utf-8', errors='replace').read()
                    if content.strip():
                        out.write(content)
                        if not content.endswith('\n'):
                            out.write('\n')
                except Exception as e:
                    out.write(f'\n[Page {i} read error: {e}]\n')

        binder_progress['message'] = f'Done. {len(page_files)} pages → {os.path.basename(output_path)}'
        print(f'[Binder] Text stitch complete: {output_path}')
    except Exception as e:
        binder_progress['message'] = f'Error: {e}'
        print(f'[Binder] Text stitch error: {e}')
    finally:
        binder_running = False


# --- HTTP HANDLERS ---
class MyHandler(http.server.SimpleHTTPRequestHandler):

    # Polling endpoints that fire every few seconds — silence them so the
    # terminal stays readable. Everything else (actions, errors) still logs.
    _SILENT_PATHS = frozenset({
        '/api/activity',
        '/api/bind/status',
        '/check_status',
        '/check_organize_status',
        '/check_pdf_status',
        '/get_output',
        '/get_pdf_output',
    })

    def log_message(self, fmt, *args):
        # args[0] is the request line, e.g. "GET /api/activity HTTP/1.1"
        try:
            path = args[0].split()[1].split('?')[0]
        except (IndexError, ValueError):
            path = ''
        if path not in self._SILENT_PATHS:
            super().log_message(fmt, *args)

    def do_GET(self):
        url_path = urlparse(self.path).path
        if url_path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            try:
                with codecs.open('dashboard.html', 'r', encoding='utf-8') as f:
                    content = f.read().replace("{rootfolder}", root_directory).replace("{log_file_path}", log_file_path).replace("{output}", "".join(output_buffer))
                    self.wfile.write(content.encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404, "File not found: dashboard.html")
            return
        elif url_path == '/get_output':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            output_data = {'output': output_buffer, 'files_checked': files_checked, 'total_files': total_files}
            globals()['output_buffer'] = []
            self.wfile.write(json.dumps(output_data).encode('utf-8'))
            return
        elif url_path == '/get_config':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                config_data = {
                    "PORT": PORT,
                    "DEFAULT_TARGET_FOLDER": DEFAULT_TARGET_FOLDER,
                    "MOVE_DUPLICATES": MOVE_DUPLICATES,
                    "DUPLICATE_HOLDING_DIR": DUPLICATE_HOLDING_DIR,
                    "LOG_NAME_PREFIX": LOG_NAME_PREFIX,
                    "EXCLUDED_FOLDERS": EXCLUDED_FOLDERS,
                    "USER_EXCLUDED_FILES": [f for f in EXCLUDED_FILES if f not in {
                        "web_interface.py", "utils.py", "config.py",
                        "index.html", "dashboard.html", "config.json"
                    }],
                    "PDF_TARGET_CHUNK_MB": PDF_TARGET_CHUNK_MB,
                    "PDF_PAGE_CHUNK_LIMIT": PDF_PAGE_CHUNK_LIMIT,
                }
                self.wfile.write(json.dumps({'success': True, 'data': config_data}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/api/activity':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                import re
                from datetime import timedelta

                today = datetime.now().date()
                days = [(today - timedelta(days=i)) for i in range(13, -1, -1)]
                day_map = {d.strftime('%Y-%m-%d'): {'scanned': 0, 'duplicates': 0, 'runs': 0} for d in days}

                scan_base = DEFAULT_TARGET_FOLDER if DEFAULT_TARGET_FOLDER else root_directory
                holding_dir = os.path.join(scan_base, '_DuplicateHoldingBin')

                if os.path.exists(holding_dir):
                    for fname in os.listdir(holding_dir):
                        if not fname.endswith('.txt'):
                            continue
                        # Match _duplicate_log_MM-DD-YYYY_HH-MM-SS.txt
                        m = re.search(r'(\d{2})-(\d{2})-(\d{4})_', fname)
                        if not m:
                            continue
                        month, day, year = m.group(1), m.group(2), m.group(3)
                        date_key = f"{year}-{month}-{day}"
                        if date_key not in day_map:
                            continue
                        day_map[date_key]['runs'] += 1
                        try:
                            fpath = os.path.join(holding_dir, fname)
                            with open(fpath, 'r', encoding='utf-8', errors='ignore') as lf:
                                content = lf.read()
                            proc_m = re.search(r'Total Files Processed: \[(\d+)\]', content)
                            if proc_m:
                                day_map[date_key]['scanned'] += int(proc_m.group(1))
                            moved_m = re.search(r'Total Files Moved: \[(\d+)\]', content)
                            if moved_m:
                                day_map[date_key]['duplicates'] += int(moved_m.group(1))
                            else:
                                # Dry run: count "Duplicate found" occurrences
                                day_map[date_key]['duplicates'] += len(re.findall(r'Duplicate found', content))
                        except Exception:
                            pass

                labels = [d.strftime('%b %d') for d in days]
                scanned = [day_map[d.strftime('%Y-%m-%d')]['scanned'] for d in days]
                duplicates = [day_map[d.strftime('%Y-%m-%d')]['duplicates'] for d in days]
                runs = [day_map[d.strftime('%Y-%m-%d')]['runs'] for d in days]

                self.wfile.write(json.dumps({
                    'success': True,
                    'data': {
                        'labels': labels,
                        'scanned': scanned,
                        'duplicates': duplicates,
                        'runs': runs,
                        'total_runs': sum(runs),
                        'total_scanned': sum(scanned),
                        'total_duplicates': sum(duplicates),
                    }
                }).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/check_status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'running': script_running, 'log_file_path': log_file_path}).encode('utf-8'))
            return
        elif url_path == '/api/bind/status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'running': binder_running,
                'progress': binder_progress,
            }).encode('utf-8'))
            return

        elif url_path == '/check_organize_status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'running': organize_running}).encode('utf-8'))
            return
        elif url_path == '/get_pdf_output':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            output_data = {'output': pdf_output_buffer}
            globals()['pdf_output_buffer'] = []
            self.wfile.write(json.dumps(output_data).encode('utf-8'))
            return
        elif url_path == '/check_pdf_status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'running': pdf_script_running}).encode('utf-8'))
            return
        elif url_path == '/cancel_script':
            if script_running:
                globals()['keep_running'] = False
                globals()['output_buffer'].append("\n*** SCRIPT CANCELLED BY USER ***\n")
                self.send_response(200)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'cancelled'}).encode('utf-8'))
            else:
                self.send_response(200)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'not_running'}).encode('utf-8'))
            return
        else:
            if url_path.endswith('favicon.ico'):
                self.send_response(404)
                self.end_headers()
            else:
                super().do_GET() 
    def do_OPTIONS(self):
        # Tell the browser that cross-origin requests are perfectly safe here!
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()


    def do_POST(self):
        url_path = urlparse(self.path).path
        if url_path == '/api/action':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            if organize_running:
                self.wfile.write(json.dumps({"success": False, "status": "running", "message": "Organizer already running"}).encode('utf-8'))
                return
            target_folder = None
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                try:
                    body = json.loads(self.rfile.read(content_length).decode('utf-8'))
                    target_folder = body.get('target_folder') or None
                except Exception:
                    pass
            thread = threading.Thread(target=run_organizer, args=(target_folder,))
            thread.daemon = True
            thread.start()
            self.wfile.write(json.dumps({"success": True, "status": "started", "message": "Organizer started"}).encode('utf-8'))
            return

        elif url_path == '/api/library':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                relative_path = ""
                if content_length > 0:
                    post_data = self.rfile.read(content_length)
                    body = json.loads(post_data.decode('utf-8'))
                    relative_path = body.get("path", "")

                # Resolve path safely within root_directory
                base = os.path.abspath(DEFAULT_TARGET_FOLDER if DEFAULT_TARGET_FOLDER else root_directory)
                target = os.path.abspath(os.path.join(base, relative_path)) if relative_path else base

                # Security: block traversal outside root
                if not target.startswith(base):
                    self.wfile.write(json.dumps({'success': False, 'error': 'Path traversal not allowed'}).encode('utf-8'))
                    return

                items = []
                for entry in sorted(os.scandir(target), key=lambda e: (not e.is_dir(), e.name.lower())):
                    stat = entry.stat()
                    rel = os.path.relpath(entry.path, base)
                    item = {
                        "name": entry.name,
                        "path": rel,
                        "type": "directory" if entry.is_dir() else "file",
                        "modified": datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d %H:%M'),
                        "created": datetime.fromtimestamp(stat.st_ctime).strftime('%Y-%m-%d %H:%M'),
                    }
                    if not entry.is_dir():
                        size_bytes = stat.st_size
                        if size_bytes >= 1_073_741_824:
                            item["size"] = f"{size_bytes / 1_073_741_824:.1f} GB"
                        elif size_bytes >= 1_048_576:
                            item["size"] = f"{size_bytes / 1_048_576:.1f} MB"
                        elif size_bytes >= 1024:
                            item["size"] = f"{size_bytes / 1024:.1f} KB"
                        else:
                            item["size"] = f"{size_bytes} B"
                    self.wfile.write  # flush buffer trick not needed
                    items.append(item)

                self.wfile.write(json.dumps({'success': True, 'data': items}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == "/run_script":
           if script_running:
               self.send_response(200)
               self.send_header("Content-type", "application/json; charset=utf-8")
               self.send_header("Access-Control-Allow-Origin", "*")
               self.end_headers()
               self.wfile.write(json.dumps({"status": "running"}).encode("utf-8"))
           else:
               content_length = int(self.headers.get('Content-Length', 0))
               target_folder = None
               if content_length > 0:
                   post_data = self.rfile.read(content_length)
                   try:
                       data = json.loads(post_data.decode("utf-8"))
                       target_folder = data.get("target_folder")
                   except json.JSONDecodeError: pass
               threading.Thread(target=run_script, args=(target_folder,)).start()
               self.send_response(200)
               self.send_header("Content-type", "application/json; charset=utf-8")
               self.send_header("Access-Control-Allow-Origin", "*")
               self.end_headers()
               self.wfile.write(json.dumps({"status": "started"}).encode("utf-8"))
               
        elif url_path == '/save_config':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                new_config = json.loads(post_data.decode('utf-8'))
                with open('config.json', 'r') as f:
                    current = json.load(f)
                current.update(new_config)
                with open('config.json', 'w') as f:
                    json.dump(current, f, indent=4)
                load_config()
                self.wfile.write(json.dumps({'success': True}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/api/metadata/get':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = json.loads(self.rfile.read(content_length).decode('utf-8')) if content_length > 0 else {}
                rel_path = body.get('path', '')
                base = os.path.abspath(DEFAULT_TARGET_FOLDER if DEFAULT_TARGET_FOLDER else root_directory)
                full_path = os.path.abspath(os.path.join(base, rel_path))
                if not full_path.startswith(base):
                    self.wfile.write(json.dumps({'success': False, 'error': 'Path traversal not allowed'}).encode('utf-8'))
                    return
                stat = os.stat(full_path)
                xmp = read_metadata(full_path) if METADATA_ENABLED else {
                    'title': '', 'creator': '', 'publisher': '', 'date': '',
                    'language': '', 'subject': [], 'description': '',
                    'series': '', 'series_number': '',
                }
                meta = {
                    'path': rel_path,
                    'filename': os.path.basename(full_path),
                    'size': stat.st_size,
                    'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                    'xmp': xmp,
                }
                self.wfile.write(json.dumps({'success': True, 'data': meta}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/api/metadata/save':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = json.loads(self.rfile.read(content_length).decode('utf-8')) if content_length > 0 else {}
                rel_path = body.get('path', '')
                metadata = body.get('metadata', {})
                base = os.path.abspath(DEFAULT_TARGET_FOLDER if DEFAULT_TARGET_FOLDER else root_directory)
                full_path = os.path.abspath(os.path.join(base, rel_path))
                if not full_path.startswith(base):
                    self.wfile.write(json.dumps({'success': False, 'error': 'Path traversal not allowed'}).encode('utf-8'))
                    return
                if not METADATA_ENABLED:
                    self.wfile.write(json.dumps({'success': False, 'error': 'metadata_handler not available'}).encode('utf-8'))
                    return
                success, message = _write_metadata(full_path, metadata)
                print(f"[Metadata] {'Saved' if success else 'FAILED'}: {full_path} — {message}")
                if success:
                    self.wfile.write(json.dumps({'success': True, 'message': message}).encode('utf-8'))
                else:
                    self.wfile.write(json.dumps({'success': False, 'error': message}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/api/bind/scan':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                import re
                content_length = int(self.headers.get('Content-Length', 0))
                body = json.loads(self.rfile.read(content_length).decode('utf-8')) if content_length > 0 else {}
                folder = body.get('folder', '').strip()
                if not folder or not os.path.isdir(folder):
                    self.wfile.write(json.dumps({'success': False, 'error': 'Folder not found'}).encode('utf-8'))
                    return
                files = sorted(
                    [f for f in os.listdir(folder) if f.lower().endswith('.txt') and os.path.isfile(os.path.join(folder, f))],
                    key=lambda n: int(re.search(r'(\d+)', n).group(1)) if re.search(r'(\d+)', n) else 0
                )
                if not files:
                    self.wfile.write(json.dumps({'success': False, 'error': 'No .txt files found'}).encode('utf-8'))
                    return
                summary = f"Found {len(files)} page files ({files[0]} → {files[-1]})"
                self.wfile.write(json.dumps({'success': True, 'summary': summary, 'count': len(files)}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/api/bind/run':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            if binder_running:
                self.wfile.write(json.dumps({'success': False, 'error': 'Binder already running'}).encode('utf-8'))
                return
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = json.loads(self.rfile.read(content_length).decode('utf-8')) if content_length > 0 else {}
                mode = body.get('mode', '')
                source = body.get('source_folder', '').strip()
                output = body.get('output_path', '').strip()
                if not source or not output or mode not in ('pdf', 'text'):
                    self.wfile.write(json.dumps({'success': False, 'error': 'mode, source_folder, and output_path are required'}).encode('utf-8'))
                    return
                if mode == 'pdf':
                    t = threading.Thread(target=run_binder_pdf, args=(source, output))
                else:
                    t = threading.Thread(target=run_binder_text, args=(source, output))
                t.daemon = True
                t.start()
                self.wfile.write(json.dumps({'success': True, 'status': 'started'}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/run_pdf_splitter':
            if pdf_script_running:
                self.send_response(200)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'running'}).encode('utf-8'))
                return
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len)
            data = json.loads(post_body)
            target_folder = data.get('target_folder', root_directory)
            try: max_mb = float(data.get('max_size_mb', PDF_TARGET_CHUNK_MB))
            except: max_mb = PDF_TARGET_CHUNK_MB
            try: initial_pages = int(data.get('initial_page_count', PDF_PAGE_CHUNK_LIMIT))
            except: initial_pages = PDF_PAGE_CHUNK_LIMIT
            thread = threading.Thread(target=run_pdf_script, args=(target_folder, max_mb, initial_pages))
            thread.daemon = True
            thread.start()
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'started'}).encode('utf-8'))
            return

def start_server(port=PORT):
    try:
        httpd = socketserver.TCPServer(("", port), MyHandler)
        print(f"Serving at http://localhost:{port}")
        httpd.serve_forever()
    except OSError as e:
        print(f"*** ERROR: Could not start server on port {port}. {e}")
        sys.exit(1)

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server)
    server_thread.daemon = True 
    server_thread.start()
    try:
        while True: time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down server...")
        if script_running:
            print("Stopping running script...")
            keep_running = False
            time.sleep(1) 
        sys.exit(0)
