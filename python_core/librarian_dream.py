import os
import shutil
import warnings
from pypdf import PdfReader
from ebooklib import epub
# Suppress ebooklib warnings about future XML updates
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

# Import our safe filename tool
from utils import sanitize_filename

# --- CONFIGURATION ---
# The folder where we will LOOK for books to organize
SOURCE_FOLDER = "/home/mslaughter-admin/Library"

# The folder where we will MOVE them to (organized)
# You can change this to be the same as SOURCE_FOLDER if you want to organize in-place
DESTINATION_ROOT = "/home/mslaughter-admin/Library/Organized_Books"

# Files to ignore (system files)
IGNORE_FILES = {".DS_Store", "Thumbs.db", "desktop.ini", "config.json"}

def extract_metadata(file_path):
    """
    Attempts to extract Title and Author from PDF or EPUB.
    Returns (Title, Author)
    """
    ext = os.path.splitext(file_path)[1].lower()
    title = None
    author = None

    try:
        if ext == ".pdf":
            reader = PdfReader(file_path)
            meta = reader.metadata
            if meta:
                title = meta.title
                author = meta.author

        elif ext == ".epub":
            try:
                book = epub.read_epub(file_path)
                # EbookLib returns tuples/lists for metadata
                t_meta = book.get_metadata('DC', 'title')
                if t_meta: title = t_meta[0][0]
                
                a_meta = book.get_metadata('DC', 'creator')
                if a_meta: author = a_meta[0][0]
            except:
                pass # EPUB read failed

    except Exception:
        pass # General failure

    # Fallback: Use filename if metadata is missing
    if not title or not title.strip(): 
        title = os.path.splitext(os.path.basename(file_path))[0]
    if not author or not author.strip(): 
        author = "Unknown_Author"
    
    return str(title).strip(), str(author).strip()

def organize_library():
    print(f"--- Starting Library Organization ---")
    print(f"Source: {SOURCE_FOLDER}")
    print(f"Destination: {DESTINATION_ROOT}")
    print("-------------------------------------")
    
    files_moved = 0
    errors = 0
    
    for root, dirs, files in os.walk(SOURCE_FOLDER):
        # Skip the destination folder if it's inside the source folder to avoid loops
        if DESTINATION_ROOT in root:
            continue

        for filename in files:
            if filename in IGNORE_FILES:
                continue
                
            source_path = os.path.join(root, filename)
            
            # 1. Extract Metadata
            title, author = extract_metadata(source_path)
            
            # 2. Sanitize Names for Folders
            safe_author = sanitize_filename(author)
            safe_title = sanitize_filename(title)
            ext = os.path.splitext(filename)[1]
            
            # 3. Construct New Path: Destination / Author / Title.ext
            dest_folder = os.path.join(DESTINATION_ROOT, safe_author)
            new_filename = f"{safe_title}{ext}"
            dest_path = os.path.join(dest_folder, new_filename)
            
            # 4. Move File
            if source_path != dest_path:
                try:
                    os.makedirs(dest_folder, exist_ok=True)
                    
                    # Handle filename collisions (e.g. two books same title)
                    counter = 1
                    while os.path.exists(dest_path):
                        # If it's the EXACT same file (hash check), skip it or delete source
                        # For now, we just rename to be safe
                        new_filename = f"{safe_title}_{counter}{ext}"
                        dest_path = os.path.join(dest_folder, new_filename)
                        counter += 1
                    
                    print(f"Moving: {filename}\n   -> {safe_author}/{new_filename}")
                    shutil.move(source_path, dest_path)
                    files_moved += 1
                    
                except Exception as e:
                    print(f"Error moving {filename}: {e}")
                    errors += 1

    print("-------------------------------------")
    print(f"Finished. Organized {files_moved} books. Errors: {errors}")

if __name__ == "__main__":
    organize_library()
