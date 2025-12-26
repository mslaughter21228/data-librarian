"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FileNode {
    name: string;
    path: string;
    type: "file" | "directory";
    size?: string;
    created: string;
    modified: string;
}

const getFileCategory = (ext: string | undefined) => {
    if (!ext) return "unknown";

    // Video Formats (Modern & Legacy)
    if (['mp4', 'mkv', 'webm', 'avi', 'mov', 'wmv', 'flv', 'rm', 'rmvb', '3gp', 'm4v', 'mpg', 'mpeg', 'ogv', 'vob', 'mts', 'm2ts', 'divx'].includes(ext)) return "video";

    // Audio Formats
    if (['mp3', 'wav', 'flac', 'aac', 'm4a', 'wma', 'ogg', 'alac', 'aiff', 'caf', 'midi', 'mid', 'opus'].includes(ext)) return "audio";

    // Image Formats
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'ico', 'raw', 'heic', 'psd', 'ai'].includes(ext)) return "image";

    // Documents
    if (['pdf'].includes(ext)) return "pdf";
    if (['doc', 'docx', 'odt', 'rtf', 'pages', 'wps', 'wpd'].includes(ext)) return "word";
    if (['xls', 'xlsx', 'ods', 'csv', 'numbers', 'tsv'].includes(ext)) return "excel";
    if (['ppt', 'pptx', 'odp', 'key'].includes(ext)) return "powerpoint";
    if (['txt', 'md', 'log', 'ini', 'cfg', 'conf', 'env'].includes(ext)) return "text";

    // E-Books
    if (['epub', 'mobi', 'azw3', 'djvu', 'cbz', 'cbr', 'ibooks'].includes(ext)) return "ebook";

    // Code
    if (['js', 'ts', 'tsx', 'jsx', 'html', 'css', 'scss', 'less', 'py', 'java', 'c', 'cpp', 'cs', 'rb', 'php', 'go', 'swift', 'sql', 'sh', 'bat', 'json', 'xml', 'yaml', 'yml', 'fla'].includes(ext)) return "code";

    // Archives
    if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'iso', 'dmg', 'pkg'].includes(ext)) return "archive";

    return "unknown";
};

const FileIcon = ({ name, type }: { name: string; type: "file" | "directory" }) => {
    if (type === "directory") return <i className="fa-regular fa-folder text-[var(--accent-primary)] mr-3 text-sm"></i>;

    const ext = name.split('.').pop()?.toLowerCase();
    const category = getFileCategory(ext);

    switch (category) {
        case "video": return <i className="fa-regular fa-file-video text-media mr-3 text-sm"></i>;
        case "audio": return <i className="fa-regular fa-file-audio text-media mr-3 text-sm"></i>;
        case "image": return <i className="fa-regular fa-file-image text-image mr-3 text-sm"></i>;
        case "pdf": return <i className="fa-regular fa-file-pdf text-error mr-3 text-sm"></i>;
        case "word": return <i className="fa-regular fa-file-word text-info mr-3 text-sm"></i>;
        case "excel": return <i className="fa-regular fa-file-excel text-success mr-3 text-sm"></i>;
        case "powerpoint": return <i className="fa-regular fa-file-powerpoint text-warning mr-3 text-sm"></i>;
        case "text": return <i className="fa-regular fa-file-lines text-[var(--text-muted)] mr-3 text-sm"></i>;
        case "ebook": return <i className="fa-solid fa-book text-info mr-3 text-sm"></i>;
        case "code": return <i className="fa-regular fa-file-code text-secondary mr-3 text-sm"></i>;
        case "archive": return <i className="fa-regular fa-file-zipper text-warning mr-3 text-sm"></i>;
        default: return <i className="fa-regular fa-file-circle-question text-[var(--text-muted)] opacity-70 mr-3 text-sm"></i>;
    }
};

export default function FileTree({ data, currentPath }: { data: FileNode[], currentPath: string }) {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: keyof FileNode, direction: 'asc' | 'desc' } | null>(null);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.refresh();
        setTimeout(() => setIsRefreshing(false), 500); // Visual feedback
    };

    const handleSort = (key: keyof FileNode) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortedData = () => {
        if (!sortConfig) return data;

        return [...data].sort((a, b) => {
            if (a.type !== b.type) {
                // Always show directories first
                return a.type === 'directory' ? -1 : 1;
            }

            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Handle size sorting specifically
            if (sortConfig.key === 'size') {
                const parseSize = (s: string | undefined) => {
                    if (!s || s === '-' || s === 'N/A') return -1;
                    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                    const [val, unit] = s.split(' ');
                    const power = units.indexOf(unit);
                    return parseFloat(val) * Math.pow(1024, power);
                };
                aValue = parseSize(a.size) as any;
                bValue = parseSize(b.size) as any;
            }

            // Handle date sorting
            if (sortConfig.key === 'created' || sortConfig.key === 'modified') {
                aValue = new Date(a[sortConfig.key]).getTime() as any;
                bValue = new Date(b[sortConfig.key]).getTime() as any;
            }

            if ((aValue ?? '') < (bValue ?? '')) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if ((aValue ?? '') > (bValue ?? '')) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const sortedData = getSortedData();

    // Logic to calculate parent path for ".." entry
    const parentPath = currentPath ? currentPath.split('/').slice(0, -1).join('/') : null;

    const SortIcon = ({ column }: { column: keyof FileNode }) => {
        if (sortConfig?.key !== column) return <i className="fa-solid fa-sort text-[var(--text-muted)] opacity-30 ml-1"></i>;
        return <i className={`fa-solid fa-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'} text-[var(--accent-primary)] ml-1`}></i>;
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-[var(--bg-panel)] px-4 py-3 border-b border-[var(--border-dim)] flex justify-between items-center shrink-0">
                <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center">
                    Explorer
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[var(--accent-primary)]">{data.length} items</span>
                </span>
                <div className="space-x-2">
                    <button
                        onClick={handleRefresh}
                        className={`cursor-pointer text-[var(--text-muted)] hover:text-white transition-all ${isRefreshing ? 'animate-spin text-[var(--accent-primary)]' : ''}`}
                        title="Refresh"
                    >
                        <i className="fa-solid fa-rotate-right text-sm"></i>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="py-2">
                    <div className="flex flex-col">
                        {/* Header Row */}
                        <div className="flex items-center px-4 py-2 text-xs font-mono font-bold text-[var(--text-muted)] border-b border-[var(--border-dim)] bg-[var(--bg-input)]/20 select-none">
                            <div className="flex-1 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                                Name <SortIcon column="name" />
                            </div>
                            <div className="w-32 text-right hidden sm:block cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('modified')}>
                                Date Modified <SortIcon column="modified" />
                            </div>
                            <div className="w-32 text-right hidden lg:block ml-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('created')}>
                                Date Created <SortIcon column="created" />
                            </div>
                            <div className="w-24 text-right ml-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('size')}>
                                Size <SortIcon column="size" />
                            </div>
                        </div>

                        {/* Parent Directory Link */}
                        {parentPath !== null && (
                            <Link
                                href={`/library?path=${encodeURIComponent(parentPath)}`}
                                className="flex items-center px-4 py-2 hover:bg-[var(--bg-input)] transition-colors border-b border-[var(--border-dim)]/30 group text-sm font-mono"
                            >
                                <div className="flex-1 flex items-center min-w-0 pr-4">
                                    <i className="fa-regular fa-folder text-[var(--accent-primary)] mr-3 text-sm"></i>
                                    <span className="text-white font-medium group-hover:text-[var(--accent-primary)] transition-colors">
                                        ..
                                    </span>
                                </div>
                                <div className="w-32 text-right text-xs text-[var(--text-muted)] shrink-0 hidden sm:block">-</div>
                                <div className="w-32 text-right text-xs text-[var(--text-muted)] shrink-0 hidden lg:block ml-4">-</div>
                                <div className="w-24 text-right text-xs text-[var(--text-muted)] shrink-0 ml-4">-</div>
                            </Link>
                        )}

                        {/* File List */}
                        {sortedData.map((node, idx) => {
                            const isDirectory = node.type === "directory";
                            const href = isDirectory
                                ? `/library?path=${encodeURIComponent(node.path)}`
                                : `/library/serve?path=${encodeURIComponent(node.path)}`;

                            return (
                                <Link
                                    key={`${node.name}-${idx}`}
                                    href={href}
                                    target={isDirectory ? undefined : "_blank"}
                                    className="flex items-center px-4 py-2 hover:bg-[var(--bg-input)] transition-colors border-b border-[var(--border-dim)]/30 last:border-0 group text-sm font-mono"
                                >
                                    <div className="flex-1 flex items-center min-w-0 pr-4">
                                        <FileIcon name={node.name} type={node.type} />
                                        <span className={`truncate ${isDirectory ? "text-white font-medium group-hover:text-[var(--accent-primary)] transition-colors" : "text-[var(--text-main)]"}`}>
                                            {node.name}
                                        </span>
                                    </div>
                                    <div className="w-32 text-right text-xs text-[var(--text-muted)] shrink-0 hidden sm:block">
                                        {node.modified}
                                    </div>
                                    <div className="w-32 text-right text-xs text-[var(--text-muted)] shrink-0 hidden lg:block ml-4">
                                        {node.created}
                                    </div>
                                    <div className="w-24 text-right text-xs text-[var(--text-muted)] shrink-0 ml-4">
                                        {node.size || "-"}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
