"use client";

import { DataLibrarian as Types } from "@/types/library";
import { useState } from "react";

// ── Category label (for the "Kind" column) ──────────────────────────────────
const getCategoryLabel = (name: string, type: "file" | "directory"): string => {
    if (type === "directory") return "Folder";
    const ext = name.split(".").pop()?.toLowerCase() ?? "";
    if (["epub", "mobi", "azw3", "djvu", "cbz", "cbr", "ibooks"].includes(ext)) return "E-Book";
    if (ext === "pdf") return "PDF";
    if (["doc", "docx", "odt", "rtf", "pages"].includes(ext)) return "Document";
    if (["mp4", "mkv", "webm", "avi", "mov", "wmv", "flv"].includes(ext)) return "Video";
    if (["mp3", "wav", "flac", "aac", "m4a", "wma", "ogg", "alac"].includes(ext)) return "Audio";
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff", "heic"].includes(ext)) return "Image";
    if (["xls", "xlsx", "csv", "ods", "numbers"].includes(ext)) return "Spreadsheet";
    if (["ppt", "pptx", "odp", "key"].includes(ext)) return "Presentation";
    if (["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "iso"].includes(ext)) return "Archive";
    if (["js","ts","tsx","jsx","py","java","c","cpp","cs","go","rb","php","sh","json","xml","yaml","yml"].includes(ext)) return "Code";
    if (["txt", "md", "log", "ini", "cfg"].includes(ext)) return "Text";
    if (ext) return ext.toUpperCase();
    return "File";
};

// ── Icon class string (Font Awesome) ────────────────────────────────────────
const getIconClass = (name: string, type: "file" | "directory"): string => {
    if (type === "directory") return "fa-regular fa-folder text-[var(--accent-primary)]";
    const ext = name.split(".").pop()?.toLowerCase() ?? "";
    if (["epub","mobi","azw3","djvu","cbz","cbr","ibooks"].includes(ext)) return "fa-solid fa-book text-info";
    if (ext === "pdf") return "fa-regular fa-file-pdf text-error";
    if (["doc","docx","odt","rtf","pages"].includes(ext)) return "fa-regular fa-file-word text-info";
    if (["mp4","mkv","webm","avi","mov","wmv"].includes(ext)) return "fa-regular fa-file-video text-media";
    if (["mp3","wav","flac","aac","m4a","ogg"].includes(ext)) return "fa-regular fa-file-audio text-media";
    if (["jpg","jpeg","png","gif","webp","svg","heic"].includes(ext)) return "fa-regular fa-file-image text-image";
    if (["xls","xlsx","csv","ods"].includes(ext)) return "fa-regular fa-file-excel text-success";
    if (["ppt","pptx","key"].includes(ext)) return "fa-regular fa-file-powerpoint text-warning";
    if (["zip","rar","7z","tar","gz","bz2"].includes(ext)) return "fa-regular fa-file-zipper text-warning";
    if (["js","ts","tsx","jsx","py","java","c","cpp","go","rb","sh","json","yaml"].includes(ext)) return "fa-regular fa-file-code text-secondary";
    if (["txt","md","log"].includes(ext)) return "fa-regular fa-file-lines text-[var(--text-muted)]";
    return "fa-regular fa-file-circle-question text-[var(--text-muted)] opacity-70";
};

// ── Search helpers ───────────────────────────────────────────────────────────
function parseSearch(query: string): { phrases: string[]; keywords: string[] } {
    const phrases: string[] = [];
    const re = /"([^"]+)"/g;
    let m;
    while ((m = re.exec(query)) !== null) phrases.push(m[1].toLowerCase());
    const remaining = query.replace(/"[^"]*"/g, "").trim();
    const keywords = remaining
        ? remaining.split(/\s+/).map((k) => k.toLowerCase()).filter(Boolean)
        : [];
    return { phrases, keywords };
}

function matchSearch(
    name: string,
    parsed: { phrases: string[]; keywords: string[] }
): boolean {
    const lower = name.toLowerCase();
    return (
        parsed.phrases.every((p) => lower.includes(p)) &&
        parsed.keywords.every((k) => lower.includes(k))
    );
}

// ── Types ────────────────────────────────────────────────────────────────────
type SortKey = "name" | "kind" | "modified" | "size";

interface FileTreeProps {
    data: Types.CatalogCard[];
    currentPath: string;
    onNavigate: (path: string) => void;
    onRefresh: () => void;
    onFileSelect?: (file: Types.CatalogCard) => void;
    selectedFilePath?: string;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function FileTree({
    data,
    currentPath,
    onNavigate,
    onRefresh,
    onFileSelect,
    selectedFilePath,
}: FileTreeProps) {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" }>({
        key: "modified",
        direction: "desc",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        onRefresh();
        setTimeout(() => setIsRefreshing(false), 600);
    };

    const handleSort = (key: SortKey) => {
        setSortConfig((prev) =>
            prev.key === key
                ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
                : { key, direction: key === "modified" ? "desc" : "asc" }
        );
    };

    const parseSize = (s: string | undefined): number => {
        if (!s || s === "-" || s === "—") return -1;
        const units = ["B", "KB", "MB", "GB", "TB"];
        const parts = s.split(" ");
        if (parts.length < 2) return parseFloat(parts[0]);
        const power = units.indexOf(parts[1]);
        return parseFloat(parts[0]) * Math.pow(1024, power < 0 ? 0 : power);
    };

    const parsedSearch = parseSearch(searchQuery);
    const hasSearch = parsedSearch.phrases.length > 0 || parsedSearch.keywords.length > 0;

    // Filter
    const filtered = hasSearch
        ? data.filter((item) => matchSearch(item.name, parsedSearch))
        : data;

    // Sort — directories float to top only on Name sort (natural browser view).
    // Kind and Size sort everything together so the column actually works end-to-end.
    const sorted = [...filtered].sort((a, b) => {
        if (!hasSearch && sortConfig.key === "name" && a.type !== b.type) {
            return a.type === "directory" ? -1 : 1;
        }

        let av: number | string, bv: number | string;
        if (sortConfig.key === "kind") {
            av = getCategoryLabel(a.name, a.type);
            bv = getCategoryLabel(b.name, b.type);
        } else if (sortConfig.key === "modified") {
            av = new Date(a.modified).getTime();
            bv = new Date(b.modified).getTime();
        } else if (sortConfig.key === "size") {
            av = parseSize(a.size);
            bv = parseSize(b.size);
        } else {
            av = a.name.toLowerCase();
            bv = b.name.toLowerCase();
        }
        if (av < bv) return sortConfig.direction === "asc" ? -1 : 1;
        if (av > bv) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const parentPath =
        currentPath ? currentPath.split("/").slice(0, -1).join("/") : null;

    // Breadcrumb segments
    const pathParts = currentPath.split("/").filter(Boolean);
    const breadcrumbs = [
        { name: "Root", path: "" },
        ...pathParts.map((part, i) => ({
            name: part,
            path: pathParts.slice(0, i + 1).join("/"),
        })),
    ];

    const SortIndicator = ({ col }: { col: SortKey }) => {
        if (sortConfig.key !== col)
            return <i className="fa-solid fa-sort ml-1 opacity-25" style={{ fontSize: "9px" }}></i>;
        return sortConfig.direction === "asc" ? (
            <i className="fa-solid fa-sort-up ml-1 text-[var(--accent-primary)]" style={{ fontSize: "9px" }}></i>
        ) : (
            <i className="fa-solid fa-sort-down ml-1 text-[var(--accent-primary)]" style={{ fontSize: "9px" }}></i>
        );
    };

    return (
        <div className="flex flex-col h-full">
            {/* ── Toolbar: breadcrumb + search + refresh ── */}
            <div className="bg-[var(--bg-panel)] border-b border-[var(--border-dim)] px-4 py-2 shrink-0 flex items-center gap-3">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-[10px] font-mono flex-1 min-w-0 overflow-hidden">
                    {breadcrumbs.map((crumb, idx) => (
                        <span key={idx} className="flex items-center gap-1 shrink-0">
                            {idx > 0 && <span className="text-[var(--text-muted)]">/</span>}
                            <button
                                onClick={() => onNavigate(crumb.path)}
                                disabled={idx === breadcrumbs.length - 1}
                                title={crumb.name}
                                className={`hover:text-white transition-colors truncate max-w-[110px] ${
                                    idx === breadcrumbs.length - 1
                                        ? "text-[var(--accent-primary)] font-bold cursor-default"
                                        : "text-[var(--text-muted)]"
                                }`}
                            >
                                {crumb.name}
                            </button>
                        </span>
                    ))}
                </div>

                {/* Search input */}
                <div className="relative shrink-0">
                    <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" style={{ fontSize: "10px" }}></i>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search… or "exact phrase"'
                        className="bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm pl-7 pr-6 py-1
                            text-[10px] font-mono text-[var(--text-main)] placeholder-[var(--text-muted)]/50 w-48
                            focus:outline-none focus:border-[var(--accent-primary)]/50 transition-colors"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white"
                        >
                            <i className="fa-solid fa-xmark" style={{ fontSize: "9px" }}></i>
                        </button>
                    )}
                </div>

                {/* Item count */}
                <span className="text-[9px] font-mono text-[var(--text-muted)] shrink-0 tabular-nums">
                    {sorted.length}{hasSearch ? ` / ${data.length}` : ""} items
                </span>

                {/* Refresh */}
                <button
                    onClick={handleRefresh}
                    title="Refresh"
                    className={`text-[var(--text-muted)] hover:text-white transition-colors ${
                        isRefreshing ? "animate-spin text-[var(--accent-primary)]" : ""
                    }`}
                >
                    <i className="fa-solid fa-rotate-right text-sm"></i>
                </button>
            </div>

            {/* ── Column headers ── */}
            <div className="flex items-center px-4 py-1.5 text-[9px] font-mono font-bold text-[var(--text-muted)]
                border-b border-[var(--border-dim)] bg-[var(--bg-input)]/10 select-none shrink-0">
                <div
                    className="flex-1 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort("name")}
                >
                    Name <SortIndicator col="name" />
                </div>
                <div
                    className="w-24 shrink-0 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort("kind")}
                >
                    Kind <SortIndicator col="kind" />
                </div>
                <div
                    className="w-36 text-right shrink-0 cursor-pointer hover:text-white transition-colors hidden md:block"
                    onClick={() => handleSort("modified")}
                >
                    Date Modified <SortIndicator col="modified" />
                </div>
                <div
                    className="w-20 text-right shrink-0 ml-2 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort("size")}
                >
                    Size <SortIndicator col="size" />
                </div>
            </div>

            {/* ── File list ── */}
            <div className="flex-1 overflow-y-auto">
                {/* Parent directory (..) */}
                {parentPath !== null && !hasSearch && (
                    <div
                        onClick={() => onNavigate(parentPath)}
                        className="flex items-center px-4 py-2 hover:bg-[var(--bg-input)] border-b border-[var(--border-dim)]/20
                            cursor-pointer group text-[11px] font-mono transition-colors"
                    >
                        <div className="flex-1 flex items-center min-w-0 pr-2">
                            <i className="fa-regular fa-folder text-[var(--accent-primary)] mr-3 text-xs shrink-0"></i>
                            <span className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors">..</span>
                        </div>
                        <div className="w-24 shrink-0 text-[var(--text-muted)]">Folder</div>
                        <div className="w-36 text-right text-[var(--text-muted)] hidden md:block">—</div>
                        <div className="w-20 text-right ml-2 text-[var(--text-muted)]">—</div>
                    </div>
                )}

                {/* Empty state */}
                {sorted.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-14 text-[var(--text-muted)]">
                        <i className={`text-3xl mb-3 ${hasSearch ? "fa-solid fa-magnifying-glass" : "fa-regular fa-folder-open"}`}></i>
                        <p className="text-[11px] font-mono">
                            {hasSearch ? "No results match your search" : "Empty directory"}
                        </p>
                    </div>
                )}

                {/* Rows */}
                {sorted.map((node, idx) => {
                    const isDir = node.type === "directory";
                    const isSelected = !isDir && node.path === selectedFilePath;
                    const kind = getCategoryLabel(node.name, node.type);
                    const iconClass = getIconClass(node.name, node.type);

                    return (
                        <div
                            key={`${node.path}-${idx}`}
                            onClick={() => isDir ? onNavigate(node.path) : onFileSelect?.(node)}
                            className={`flex items-center px-4 py-2 border-b border-[var(--border-dim)]/20 last:border-0
                                cursor-pointer group text-[11px] font-mono transition-colors
                                ${isSelected
                                    ? "bg-[var(--accent-primary)]/10 border-l-2 border-l-[var(--accent-primary)]"
                                    : "hover:bg-[var(--bg-input)]"
                                }`}
                        >
                            <div className="flex-1 flex items-center min-w-0 pr-2">
                                <i className={`${iconClass} mr-3 text-xs shrink-0`}></i>
                                <span
                                    className={`truncate ${
                                        isDir
                                            ? "text-white font-medium group-hover:text-[var(--accent-primary)] transition-colors"
                                            : "text-[var(--text-main)]"
                                    }`}
                                >
                                    {node.name}
                                </span>
                            </div>
                            <div className="w-24 shrink-0 text-[var(--text-muted)]">{kind}</div>
                            <div className="w-36 text-right text-[var(--text-muted)] hidden md:block">{node.modified}</div>
                            <div className="w-20 text-right ml-2 text-[var(--text-muted)]">{node.size ?? "—"}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
