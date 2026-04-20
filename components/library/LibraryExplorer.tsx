"use client";

import { DataLibrarian } from "@/lib/head_librarian";
import { DataLibrarian as Types } from "@/types/library";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FileTree from "./FileTree";
import FolderTree from "./FolderTree";

// ── localStorage-backed path hook ───────────────────────────────────────────
function useLocalPath(key: string, defaultValue: string) {
    const [value, setValue] = useState(defaultValue);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem(key);
        if (stored !== null) setValue(stored);
    }, [key]);

    const setStoredValue = (newValue: string) => {
        setValue(newValue);
        localStorage.setItem(key, newValue);
    };

    return [value, setStoredValue, isMounted] as const;
}

// ── Category label (used by FileDetailPanel) ────────────────────────────────
const getFileCategory = (name: string): string => {
    const ext = name.split(".").pop()?.toLowerCase() ?? "";
    if (["epub","mobi","azw3","djvu","cbz","cbr","ibooks"].includes(ext)) return "E-Book";
    if (ext === "pdf") return "PDF";
    if (["doc","docx","odt","rtf","pages"].includes(ext)) return "Document";
    if (["mp4","mkv","webm","avi","mov"].includes(ext)) return "Video";
    if (["mp3","wav","flac","aac","m4a"].includes(ext)) return "Audio";
    if (["jpg","jpeg","png","gif","webp","svg"].includes(ext)) return "Image";
    if (["xls","xlsx","csv","ods"].includes(ext)) return "Spreadsheet";
    if (["zip","rar","7z","tar","gz"].includes(ext)) return "Archive";
    if (ext) return ext.toUpperCase();
    return "File";
};

// ── File Detail Panel ────────────────────────────────────────────────────────
interface FileDetailPanelProps {
    file: Types.CatalogCard;
    onClose: () => void;
    onOpenMetadata: (file: Types.CatalogCard) => void;
}

function FileDetailPanel({ file, onClose, onOpenMetadata }: FileDetailPanelProps) {
    const category = getFileCategory(file.name);

    return (
        <div className="w-60 shrink-0 border-l border-[var(--border-dim)] bg-[var(--bg-panel)] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-dim)] bg-[var(--bg-dark)]">
                <span className="text-[9px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest">
                    File Info
                </span>
                <button
                    onClick={onClose}
                    className="text-[var(--text-muted)] hover:text-white transition-colors"
                    title="Close"
                >
                    <i className="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Icon + name */}
                <div className="flex flex-col items-center text-center gap-2 py-3 border-b border-[var(--border-dim)]">
                    <div className="w-12 h-12 rounded bg-[var(--bg-input)] flex items-center justify-center">
                        <i className="fa-regular fa-file text-2xl text-[var(--accent-primary)]"></i>
                    </div>
                    <p className="text-[10px] font-mono text-[var(--text-main)] break-all leading-snug px-1">
                        {file.name}
                    </p>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--bg-input)] text-[var(--accent-primary)] border border-[var(--border-dim)]">
                        {category}
                    </span>
                </div>

                {/* Metadata rows */}
                <div className="space-y-2.5 text-[10px] font-mono">
                    {file.size && (
                        <div className="flex justify-between gap-2">
                            <span className="text-[var(--text-muted)] shrink-0">Size</span>
                            <span className="text-[var(--text-main)]">{file.size}</span>
                        </div>
                    )}
                    <div className="flex justify-between gap-2">
                        <span className="text-[var(--text-muted)] shrink-0">Modified</span>
                        <span className="text-[var(--text-main)]">{file.modified}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        <span className="text-[var(--text-muted)] shrink-0">Created</span>
                        <span className="text-[var(--text-main)]">{file.created}</span>
                    </div>
                    <div className="flex justify-between gap-2 items-start">
                        <span className="text-[var(--text-muted)] shrink-0">Path</span>
                        <span className="text-[9px] text-[var(--text-main)] text-right break-all opacity-70" title={file.path}>
                            {file.path}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="p-3 border-t border-[var(--border-dim)]">
                <button
                    onClick={() => onOpenMetadata(file)}
                    className="w-full bg-[var(--accent-primary)] text-[#09161c] font-bold font-mono text-[10px] py-2 rounded-sm hover:opacity-90 transition-all"
                >
                    <i className="fa-solid fa-tag mr-2"></i>
                    Edit Metadata
                </button>
            </div>
        </div>
    );
}

// ── Main Explorer Component ──────────────────────────────────────────────────
export default function LibraryExplorer() {
    const router = useRouter();
    const [currentPath, setCurrentPath, isMounted] = useLocalPath("dl_last_path_library", "");
    const [cards, setCards] = useState<Types.CatalogCard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<Types.CatalogCard | null>(null);

    useEffect(() => {
        if (!isMounted) return;
        loadCatalog(currentPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPath, isMounted]);

    const loadCatalog = async (path: string, forceRefresh = false) => {
        setLoading(true);
        setError(null);
        try {
            const response = await DataLibrarian.HeadLibrarian.getCatalog(path, forceRefresh);
            if (response.success && response.data) {
                setCards(response.data);
            } else {
                setError(response.error || "Failed to load catalog.");
            }
        } catch {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = (path: string) => {
        setSelectedFile(null);
        setCurrentPath(path);
    };

    const handleRefresh = () => loadCatalog(currentPath, true);

    const handleFileSelect = (file: Types.CatalogCard) => {
        setSelectedFile((prev) => (prev?.path === file.path ? null : file));
    };

    const handleOpenMetadata = (file: Types.CatalogCard) => {
        router.push(`/metadata?file=${encodeURIComponent(file.path)}`);
    };

    if (!isMounted) return null;

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Page header */}
            <div className="px-6 pt-5 pb-3 shrink-0">
                <h3 className="font-heading text-xl text-secondary flex items-center">
                    <i className="fa-solid fa-book mr-3 text-[var(--accent-primary)]"></i>
                    Library Index
                </h3>
                <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1 ml-9">
                    Browse your library using the folder tree on the left. Click any file to view details or open the metadata editor.
                </p>
            </div>

            {/* Info strip */}
            <div className="mx-6 mb-3 bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm p-2.5 shrink-0">
                <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-mono text-[var(--text-muted)]">
                    <li>
                        <i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-1.5" style={{ fontSize: "7px" }}></i>
                        Click folders in the left panel to navigate — your last location is remembered
                    </li>
                    <li>
                        <i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-1.5" style={{ fontSize: "7px" }}></i>
                        Click column headers in the file list to sort; default order is newest first
                    </li>
                    <li>
                        <i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-1.5" style={{ fontSize: "7px" }}></i>
                        Search by keyword or <span className="text-[var(--text-main)]">"quoted phrase"</span> to filter the current folder
                    </li>
                    <li>
                        <i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-1.5" style={{ fontSize: "7px" }}></i>
                        Click a file to open the details panel — use <span className="text-[var(--text-main)]">Edit Metadata</span> to go to the editor
                    </li>
                </ul>
            </div>

            {/* Error banner */}
            {error && (
                <div className="mx-6 mb-3 bg-error/10 border border-error/20 text-error px-3 py-2 rounded text-[11px] font-mono shrink-0">
                    <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                    {error}
                </div>
            )}

            {/* Two-pane layout */}
            <div className="flex-1 overflow-hidden flex mx-6 mb-6 gap-0 border border-[var(--border-dim)] rounded-sm shadow-sm bg-[var(--bg-card)]">
                {/* Left: persistent folder tree */}
                <div className="w-52 shrink-0 overflow-hidden">
                    <FolderTree currentPath={currentPath} onNavigate={handleNavigate} />
                </div>

                {/* Right: file list */}
                <div className={`flex-1 overflow-hidden flex flex-col border-l border-[var(--border-dim)] relative ${loading ? "opacity-60 pointer-events-none" : ""}`}>
                    <FileTree
                        data={cards}
                        currentPath={currentPath}
                        onNavigate={handleNavigate}
                        onRefresh={handleRefresh}
                        onFileSelect={handleFileSelect}
                        selectedFilePath={selectedFile?.path}
                    />
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <i className="fa-solid fa-circle-notch fa-spin text-3xl text-[var(--accent-primary)]"></i>
                        </div>
                    )}
                </div>

                {/* Right: file detail panel (slides in on file select) */}
                {selectedFile && (
                    <FileDetailPanel
                        file={selectedFile}
                        onClose={() => setSelectedFile(null)}
                        onOpenMetadata={handleOpenMetadata}
                    />
                )}
            </div>
        </div>
    );
}
