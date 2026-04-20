"use client";

import { DataLibrarian } from "@/lib/head_librarian";
import { DataLibrarian as Types } from "@/types/library";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import MetadataPanel from "./MetadataPanel";

const SUPPORTED_EXTS = new Set([
    'epub', 'mobi', 'azw3', 'pdf', 'djvu', 'cbz', 'cbr',
    'doc', 'docx', 'odt', 'rtf', 'txt',
]);

function isSupportedFile(name: string): boolean {
    const ext = name.split('.').pop()?.toLowerCase() ?? '';
    return SUPPORTED_EXTS.has(ext);
}

const FILE_ICONS: Record<string, string> = {
    epub: 'fa-solid fa-book text-info',
    mobi: 'fa-solid fa-book text-info',
    azw3: 'fa-solid fa-book text-info',
    pdf: 'fa-regular fa-file-pdf text-error',
    djvu: 'fa-regular fa-file text-warning',
    cbz: 'fa-regular fa-file-zipper text-warning',
    cbr: 'fa-regular fa-file-zipper text-warning',
    doc: 'fa-regular fa-file-word text-info',
    docx: 'fa-regular fa-file-word text-info',
    odt: 'fa-regular fa-file-lines text-[var(--text-muted)]',
    rtf: 'fa-regular fa-file-lines text-[var(--text-muted)]',
    txt: 'fa-regular fa-file-lines text-[var(--text-muted)]',
};

function fileIcon(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase() ?? '';
    return FILE_ICONS[ext] ?? 'fa-regular fa-file text-[var(--text-muted)]';
}

export default function MetadataExplorer() {
    const searchParams = useSearchParams();
    const initialFile = searchParams.get('file');

    const [currentPath, setCurrentPath] = useState("");
    const [allItems, setAllItems] = useState<Types.CatalogCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<Types.CatalogCard | null>(null);
    const [search, setSearch] = useState("");
    const [showDirsInList, setShowDirsInList] = useState(false);
    const didDeepLink = useRef(false);

    // Load directory listing
    useEffect(() => {
        loadDirectory(currentPath);
    }, [currentPath]);

    // Deep-link: if ?file=path was passed (from Library "Edit Metadata"), select that file
    useEffect(() => {
        if (initialFile && !didDeepLink.current && allItems.length > 0) {
            const found = allItems.find(item => item.path === initialFile);
            if (found) {
                setSelectedFile(found);
                didDeepLink.current = true;
            } else {
                // Navigate to its parent directory
                const parts = initialFile.split('/').slice(0, -1);
                if (parts.length > 0) {
                    setCurrentPath(parts.join('/'));
                }
            }
        }
    }, [allItems, initialFile]);

    const loadDirectory = async (path: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await DataLibrarian.HeadLibrarian.getCatalog(path, false);
            if (res.success && res.data) {
                setAllItems(res.data);
            } else {
                setError(res.error ?? "Failed to load directory.");
            }
        } catch {
            setError("Could not connect to backend.");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = (path: string) => {
        setCurrentPath(path);
        setSelectedFile(null);
        setSearch("");
    };

    const parentPath = currentPath ? currentPath.split('/').slice(0, -1).join('/') : null;

    // Filter: files only (optionally dirs), matching search
    const filteredItems = allItems.filter(item => {
        if (item.type === 'directory') return showDirsInList;
        if (!isSupportedFile(item.name)) return false;
        if (search) return item.name.toLowerCase().includes(search.toLowerCase());
        return true;
    });

    // Dirs for navigation (always shown in nav section)
    const dirs = allItems.filter(item => item.type === 'directory');

    const pathParts = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [
        { name: 'Root', path: '' },
        ...pathParts.map((p, i) => ({ name: p, path: pathParts.slice(0, i + 1).join('/') }))
    ];

    return (
        <div className="flex h-full overflow-hidden">
            {/* Left panel — file list */}
            <div className="w-80 shrink-0 flex flex-col border-r border-[var(--border-dim)] bg-[var(--bg-panel)] overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-dark)] shrink-0">
                    <h3 className="font-heading text-sm font-bold text-secondary flex items-center">
                        <i className="fa-solid fa-tag mr-2 text-[var(--accent-primary)]"></i>
                        Metadata Browser
                    </h3>
                    <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1">Browse and select a file to view or edit its embedded metadata. Supports PDF, EPUB, MOBI, and common document formats.</p>
                    <div className="flex flex-wrap text-[10px] font-mono text-[var(--text-muted)] mt-1 gap-1">
                        {breadcrumbs.map((crumb, idx) => (
                            <span key={idx} className="flex items-center">
                                {idx > 0 && <span className="mx-1 opacity-40">/</span>}
                                <button
                                    onClick={() => handleNavigate(crumb.path)}
                                    className={`hover:text-white transition-colors ${idx === breadcrumbs.length - 1 ? 'text-[var(--accent-primary)]' : ''}`}
                                    disabled={idx === breadcrumbs.length - 1}
                                >
                                    {crumb.name}
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Search */}
                <div className="px-3 py-2 border-b border-[var(--border-dim)] shrink-0">
                    <div className="flex items-center bg-[var(--bg-input)] border border-[var(--border-dim)] rounded px-2 py-1.5 gap-2">
                        <i className="fa-solid fa-magnifying-glass text-[var(--text-muted)] text-xs"></i>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search files..."
                            className="flex-1 bg-transparent text-xs font-mono text-[var(--text-main)] outline-none placeholder-[var(--text-muted)]"
                        />
                        {search && (
                            <button onClick={() => setSearch("")} className="text-[var(--text-muted)] hover:text-white text-xs">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Directory navigation */}
                {dirs.length > 0 && !search && (
                    <div className="shrink-0 border-b border-[var(--border-dim)]">
                        {parentPath !== null && (
                            <button
                                onClick={() => handleNavigate(parentPath)}
                                className="w-full flex items-center px-4 py-1.5 text-xs font-mono text-[var(--text-muted)] hover:bg-[var(--bg-input)] hover:text-white transition-colors"
                            >
                                <i className="fa-regular fa-folder text-[var(--accent-primary)] mr-2 text-xs"></i>
                                ..
                            </button>
                        )}
                        {dirs.map(dir => (
                            <button
                                key={dir.path}
                                onClick={() => handleNavigate(dir.path)}
                                className="w-full flex items-center px-4 py-1.5 text-xs font-mono text-[var(--text-muted)] hover:bg-[var(--bg-input)] hover:text-white transition-colors"
                            >
                                <i className="fa-regular fa-folder text-[var(--accent-primary)] mr-2 text-xs"></i>
                                <span className="truncate">{dir.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* File list */}
                <div className="flex-1 overflow-y-auto">
                    {loading && (
                        <div className="flex items-center justify-center py-8">
                            <i className="fa-solid fa-circle-notch fa-spin text-[var(--accent-primary)]"></i>
                        </div>
                    )}
                    {error && (
                        <div className="px-4 py-3 text-xs font-mono text-error">
                            <i className="fa-solid fa-triangle-exclamation mr-1.5"></i>{error}
                        </div>
                    )}
                    {!loading && !error && filteredItems.length === 0 && (
                        <div className="px-4 py-8 text-center text-xs font-mono text-[var(--text-muted)] opacity-60">
                            {search ? "No matching files" : "No supported files in this directory"}
                        </div>
                    )}
                    {filteredItems.map(item => (
                        <button
                            key={item.path}
                            onClick={() => setSelectedFile(item)}
                            className={`w-full flex items-start gap-2 px-4 py-2.5 text-left transition-colors border-b border-[var(--border-dim)]/30 last:border-0
                                ${selectedFile?.path === item.path
                                    ? 'bg-[var(--accent-primary)]/10 border-l-2 border-l-[var(--accent-primary)]'
                                    : 'hover:bg-[var(--bg-input)]'
                                }`}
                        >
                            <i className={`${fileIcon(item.name)} mt-0.5 text-sm shrink-0`}></i>
                            <div className="min-w-0">
                                <p className="text-xs font-mono text-[var(--text-main)] truncate">{item.name}</p>
                                {item.size && (
                                    <p className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">{item.size}</p>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer: count */}
                <div className="px-4 py-2 border-t border-[var(--border-dim)] text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-dark)] shrink-0">
                    {filteredItems.length} file{filteredItems.length !== 1 ? 's' : ''} shown
                    {search && ` · "${search}"`}
                </div>
            </div>

            {/* Right panel — metadata detail/editor */}
            <div className="flex-1 bg-[var(--bg-card)] overflow-hidden">
                <MetadataPanel file={selectedFile} />
            </div>
        </div>
    );
}
