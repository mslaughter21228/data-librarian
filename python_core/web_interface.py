"""
Web Interface for The Data Librarian - Duplicate File Cleaner & Sorter
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
import subprocess
from urllib.parse import urlparse
from datetime import datetime

# Force unbuffered output for real-time logging
sys.stdout.reconfigure(line_buffering=True)
sys.stderr.reconfigure(line_buffering=True)

# Import from local modules (removed log_message from utils so we can override it)
try:
    from config import EXCLUDED_FOLDERS, DUPLICATE_HOLDING_DIR, LOG_NAME_PREFIX, MOVE_DUPLICATES, PORT, EXCLUDED_FILES, PDF_TARGET_CHUNK_MB, PDF_PAGE_CHUNK_LIMIT
    from utils import sanitize_filename, calculate_sha256
    from pypdf import PdfReader, PdfWriter
except ImportError:
    print("Error: 'config.py', 'utils.py', or 'pypdf' not found. Please make sure they are in the same directory and pypdf is installed.")
    sys.exit(1)


# --- Global State Variables ---
output_buffer = []
script_running = False
script_process = None
keep_running = True
total_files = 0
files_checked = 0
log_file_path = ""
# Use os.path.abspath to get a clean, absolute path
root_directory = os.path.abspath(".") 

# --- PDF Global Variables ---
pdf_script_running = False
pdf_keep_running = True
pdf_output_buffer = []

# --- Sorter Global Variables ---
sorter_script_running = False
sorter_output_buffer = []
# ------------------------------

# --- UI LOGGER FOR CLEANER ---
def log_message(log_file, message):
    """Local wrapper to ensure logs go to the Web UI, terminal, and file."""
    global output_buffer
    output_buffer.append(message)
    print(message, end="")
    if log_file:
        log_file.write(message)
        log_file.flush()

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
                                    f"Duplicate found & MOVED:\n  Original: [{original_filename!r}]\n  Duplicate: [{duplicate_filename!r}]\n  Moved to: [{sanitized_filename!r}]\n\n",
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
                                    f"Duplicate found (DRY RUN - NOT MOVED):\n  Original: [{original_filename!r}]\n  Duplicate: [{duplicate_filename!r}]\n  Would move as: [{sanitized_filename!r}]\n\n",
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

# --- SORTER LOGIC ---
def run_sorter_script(target_folder):
    global sorter_script_running, sorter_output_buffer
    sorter_script_running = True
    sorter_output_buffer = []

    def log_to_buffer(msg):
        sorter_output_buffer.append(msg)
        print(msg, end="")

    try:
        log_to_buffer(f"--- STARTING DREAM LIBRARIAN ---\n")
        log_to_buffer(f"Target Directory: {target_folder}\n")
        
        process = subprocess.Popen(
            [sys.executable, "librarian_dream.py", target_folder], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        
        for line in process.stdout:
            log_to_buffer(line)
            
        process.wait()
        log_to_buffer(f"\n--- SORTER FINISHED (Code {process.returncode}) ---\n")
        
    except Exception as e:
        log_to_buffer(f"*** ERROR RUNNING SORTER: {e}\n")
    finally:
        sorter_script_running = False

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

# --- HTTP HANDLERS ---
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        url_path = urlparse(self.path).path
        if url_path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            try:
                with codecs.open('index.html', 'r', encoding='utf-8') as f:
                    content = f.read().replace("{rootfolder}", root_directory).replace("{log_file_path}", log_file_path).replace("{output}", "".join(output_buffer))
                    self.wfile.write(content.encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404, "File not found: index.html")
            return
        
        # Cleaner Routes
        elif url_path == '/get_output':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            output_data = {'output': output_buffer, 'files_checked': files_checked, 'total_files': total_files}
            globals()['output_buffer'] = []
            self.wfile.write(json.dumps(output_data).encode('utf-8'))
            return
        elif url_path == '/check_status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'running': script_running, 'log_file_path': log_file_path}).encode('utf-8'))
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
            
        # PDF Routes
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
            
        # Sorter Routes
        elif url_path == '/get_sorter_output':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            output_data = {'output': sorter_output_buffer}
            globals()['sorter_output_buffer'] = []
            self.wfile.write(json.dumps(output_data).encode('utf-8'))
            return
        elif url_path == '/check_sorter_status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'running': sorter_script_running}).encode('utf-8'))
            return
            
        else:
            if url_path.endswith('favicon.ico'):
                self.send_response(404)
                self.end_headers()
            else:
                super().do_GET() 

    def do_POST(self):
        url_path = urlparse(self.path).path
        
        # Cleaner Post
        if url_path == "/run_script":
           if script_running:
               self.send_response(200)
               self.send_header("Content-type", "application/json; charset=utf-8")
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
               self.end_headers()
               self.wfile.write(json.dumps({"status": "started"}).encode("utf-8"))
               
        # PDF Post
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
            
        # Sorter Post
        elif url_path == '/run_sorter':
            if sorter_script_running:
                self.send_response(200)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'running'}).encode('utf-8'))
                return
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len)
            data = json.loads(post_body)
            target_folder = data.get('target_folder', root_directory)
            
            thread = threading.Thread(target=run_sorter_script, args=(target_folder,))
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
