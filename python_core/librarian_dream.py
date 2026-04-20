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
                t_meta = book.get_metadata('DC', 'title')
                if t_meta: title = t_meta[0][0]
                a_meta = book.get_metadata('DC', 'creator')
                if a_meta: author = a_meta[0][0]
            except:
                pass

    except Exception:
        pass

    # Fallback: Use filename if metadata is missing
    if not title or not str(title).strip():
        title = os.path.splitext(os.path.basename(file_path))[0]
    if not author or not str(author).strip():
        author = "Unknown_Author"

    return str(title).strip(), str(author).strip()


def organize_library(source_folder=None):
    """
    Scans source_folder for PDF and EPUB files, extracts metadata,
    and moves them into source_folder/<ORGANIZER_DEST_SUBFOLDER>/Author/ subfolders.
    Falls back to DEFAULT_TARGET_FOLDER from config if source_folder is not provided.
    Destination subfolder name is controlled by ORGANIZER_DEST_SUBFOLDER in config.json.
    """
    # Pull settings from config
    try:
        from config import DEFAULT_TARGET_FOLDER, ORGANIZER_DEST_SUBFOLDER
    except ImportError:
        DEFAULT_TARGET_FOLDER = ""
        ORGANIZER_DEST_SUBFOLDER = "Organized_Books"

    if source_folder is None:
        source_folder = DEFAULT_TARGET_FOLDER

    if not source_folder or not os.path.exists(source_folder):
        print(f"ERROR: Source folder not found or not set: {repr(source_folder)}")
        return

    destination_root = os.path.join(source_folder, ORGANIZER_DEST_SUBFOLDER)

    print(f"--- Starting Library Organization ---")
    print(f"Source:      {source_folder}")
    print(f"Destination: {destination_root}")
    print("-------------------------------------")

    os.makedirs(destination_root, exist_ok=True)

    files_moved = 0
    errors = 0

    for root, dirs, files in os.walk(source_folder):
        # Skip the destination folder to prevent re-processing moved files
        if os.path.abspath(destination_root) in os.path.abspath(root):
            continue
        # Skip the duplicate holding bin
        dirs[:] = [d for d in dirs if d not in {"_DuplicateHoldingBin", ORGANIZER_DEST_SUBFOLDER}]

        for filename in files:
            if filename in IGNORE_FILES:
                continue

            # Only process PDF and EPUB files
            ext = os.path.splitext(filename)[1].lower()
            if ext not in ['.pdf', '.epub']:
                continue

            source_path = os.path.join(root, filename)

            # Extract metadata
            title, author = extract_metadata(source_path)
            safe_author = sanitize_filename(author)
            safe_title = sanitize_filename(title)

            # Build destination: Organized_Books / Author / Author - Title.ext
            dest_folder = os.path.join(destination_root, safe_author)
            new_filename = f"{safe_author} - {safe_title}{ext}"
            dest_path = os.path.join(dest_folder, new_filename)

            if source_path == dest_path:
                continue

            try:
                os.makedirs(dest_folder, exist_ok=True)

                # Handle filename collisions safely
                counter = 1
                while os.path.exists(dest_path):
                    new_filename = f"{safe_author} - {safe_title}_{counter}{ext}"
                    dest_path = os.path.join(dest_folder, new_filename)
                    counter += 1

                print(f"Moving: {filename}\n   -> {safe_author}/{new_filename}")
                shutil.move(source_path, dest_path)
                files_moved += 1

            except OSError as e:
                print(f"Error moving '{filename}': {e}")
                errors += 1
            except Exception as e:
                print(f"Unexpected error on '{filename}': {e}")
                errors += 1

    print("-------------------------------------")
    print(f"Finished. Organized {files_moved} file(s). Errors: {errors}")


if __name__ == "__main__":
    organize_library()
