import FileTree from "@/components/library/FileTree";
import { DataLibrarian } from "@/types/config";
import fs from "fs";
import Link from "next/link";
import path from "path";

// Interface for our flat file node
interface FileNode {
    name: string;
    path: string; // Relative path from root
    type: "file" | "directory";
    size?: string;
    created: string;
    modified: string;
}

// Helper to format bytes
function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default async function LibraryPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const currentPath = typeof params.path === 'string' ? params.path : "";

    // Get root path from config
    const rootPath = DataLibrarian.Config.server.root_path;
    const fullPath = path.resolve(rootPath, currentPath);

    let fileData: FileNode[] = [];
    let error = null;

    try {
        // Security check: ensure fullPath starts with rootPath
        if (!fullPath.startsWith(path.resolve(rootPath))) {
            throw new Error("Invalid path");
        }

        if (fs.existsSync(fullPath)) {
            const items = fs.readdirSync(fullPath, { withFileTypes: true });

            // Sort: Directories first, then files
            items.sort((a, b) => {
                if (a.isDirectory() && !b.isDirectory()) return -1;
                if (!a.isDirectory() && b.isDirectory()) return 1;
                return a.name.localeCompare(b.name);
            });

            fileData = items.map(item => {
                const itemFullPath = path.join(fullPath, item.name);
                const isDirectory = item.isDirectory();
                let size = undefined;
                let created = "-";
                let modified = "-";

                try {
                    const stats = fs.statSync(itemFullPath);
                    if (!isDirectory) {
                        size = formatBytes(stats.size);
                    }
                    created = stats.birthtime.toLocaleString();
                    modified = stats.mtime.toLocaleString();
                } catch (e) {
                    size = "N/A";
                }

                return {
                    name: item.name,
                    // Store relative path for navigation
                    path: path.join(currentPath, item.name),
                    type: isDirectory ? "directory" : "file",
                    size: size,
                    created: created,
                    modified: modified
                };
            });
        } else {
            error = "Directory not found";
        }
    } catch (err) {
        console.error("Error reading library:", err);
        error = "Error loading directory";
    }

    // Generate Breadcrumbs
    const pathParts = currentPath.split(path.sep).filter(p => p);
    const breadcrumbs = [
        { name: path.basename(rootPath), path: "" },
        ...pathParts.map((part, index) => ({
            name: part,
            path: pathParts.slice(0, index + 1).join(path.sep)
        }))
    ];

    return (
        <div className="h-full flex flex-col p-6 w-full max-w-full overflow-hidden">
            {/* Header with Breadcrumbs */}
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="font-mono text-xl text-secondary flex items-center">
                    <i className="fa-solid fa-book mr-3 text-[var(--accent-primary)]"></i>
                    LIBRARY_INDEX
                </h3>

                <div className="flex items-center space-x-2 text-xs font-mono bg-[var(--bg-input)] px-3 py-1.5 rounded border border-[var(--border-dim)]">
                    {breadcrumbs.map((crumb, idx) => (
                        <div key={idx} className="flex items-center">
                            {idx > 0 && <span className="mx-2 text-[var(--text-muted)]">/</span>}
                            {idx === breadcrumbs.length - 1 ? (
                                <span className="text-[var(--accent-primary)] font-bold">{crumb.name}</span>
                            ) : (
                                <Link
                                    href={crumb.path ? `/library?path=${encodeURIComponent(crumb.path)}` : '/library'}
                                    className="text-[var(--text-muted)] hover:text-white transition-colors"
                                >
                                    {crumb.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-2 mb-4 rounded text-sm font-mono">
                    {error}
                </div>
            )}

            {/* Explorer Content */}
            <div className="flex-1 overflow-hidden flex flex-col bg-[var(--bg-card)] border border-[var(--border-dim)] rounded-sm shadow-sm relative">
                <FileTree data={fileData} currentPath={currentPath} />
            </div>
        </div>
    );
}
