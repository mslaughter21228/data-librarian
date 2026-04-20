"use client";

import { DataLibrarian } from "@/lib/head_librarian";
import { useEffect, useState } from "react";

interface TreeNodeProps {
    path: string;
    name: string;
    depth: number;
    currentPath: string;
    onNavigate: (path: string) => void;
}

function TreeNode({ path, name, depth, currentPath, onNavigate }: TreeNodeProps) {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<{ path: string; name: string }[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isActive = currentPath === path;
    const isAncestor = path !== "" && currentPath.startsWith(path + "/");

    // Auto-expand when this node is the active path or an ancestor of it
    useEffect(() => {
        if ((isActive || isAncestor) && !loaded) {
            loadChildren();
            setExpanded(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPath]);

    const loadChildren = async () => {
        if (loaded || isLoading) return;
        setIsLoading(true);
        try {
            const response = await DataLibrarian.HeadLibrarian.getCatalog(path);
            if (response.success && response.data) {
                const dirs = response.data
                    .filter((item) => item.type === "directory")
                    .map((item) => ({ path: item.path, name: item.name }));
                setChildren(dirs);
            }
        } finally {
            setIsLoading(false);
            setLoaded(true);
        }
    };

    const handleToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!expanded && !loaded) await loadChildren();
        setExpanded((prev) => !prev);
    };

    return (
        <div>
            <div
                className={`flex items-center cursor-pointer transition-colors text-[11px] font-mono select-none
                    ${isActive
                        ? "bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]"
                        : isAncestor
                            ? "text-white hover:bg-[var(--bg-input)]"
                            : "text-[var(--text-muted)] hover:bg-[var(--bg-input)] hover:text-[var(--text-main)]"
                    }`}
                style={{ paddingLeft: `${8 + depth * 14}px`, paddingRight: "8px", paddingTop: "5px", paddingBottom: "5px" }}
                onClick={() => onNavigate(path)}
            >
                {/* Expand / collapse toggle */}
                <button
                    className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-muted)] hover:text-white mr-1"
                    onClick={handleToggle}
                >
                    {isLoading ? (
                        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: "9px" }}></i>
                    ) : expanded ? (
                        <i className="fa-solid fa-chevron-down" style={{ fontSize: "8px" }}></i>
                    ) : (
                        <i className="fa-solid fa-chevron-right" style={{ fontSize: "8px" }}></i>
                    )}
                </button>

                {/* Folder icon */}
                <i
                    className={`fa-${expanded ? "solid" : "regular"} fa-folder mr-1.5 text-[var(--accent-primary)] shrink-0`}
                    style={{ fontSize: "11px" }}
                ></i>

                {/* Label */}
                <span className="truncate">{name}</span>
            </div>

            {/* Recursive children */}
            {expanded && children.length > 0 && (
                <div>
                    {children.map((child) => (
                        <TreeNode
                            key={child.path}
                            path={child.path}
                            name={child.name}
                            depth={depth + 1}
                            currentPath={currentPath}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Root Panel Component ─────────────────────────────────────────────────────
interface FolderTreeProps {
    currentPath: string;
    onNavigate: (path: string) => void;
}

export default function FolderTree({ currentPath, onNavigate }: FolderTreeProps) {
    const [rootDirs, setRootDirs] = useState<{ path: string; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const isRoot = currentPath === "";

    useEffect(() => {
        loadRoot();
    }, []);

    const loadRoot = async () => {
        setIsLoading(true);
        try {
            const response = await DataLibrarian.HeadLibrarian.getCatalog("");
            if (response.success && response.data) {
                const dirs = response.data
                    .filter((item) => item.type === "directory")
                    .map((item) => ({ path: item.path, name: item.name }));
                setRootDirs(dirs);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--bg-dark)] border-r border-[var(--border-dim)]">
            {/* Panel header */}
            <div className="px-3 py-2 border-b border-[var(--border-dim)] shrink-0">
                <span className="text-[9px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest">
                    Folders
                </span>
            </div>

            {/* Library Root entry */}
            <div
                className={`flex items-center gap-1.5 px-3 py-1.5 cursor-pointer border-b border-[var(--border-dim)]/40
                    text-[11px] font-mono transition-colors select-none
                    ${isRoot
                        ? "bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]"
                        : "text-[var(--text-muted)] hover:bg-[var(--bg-input)] hover:text-white"
                    }`}
                onClick={() => onNavigate("")}
            >
                <i className="fa-solid fa-house shrink-0" style={{ fontSize: "10px" }}></i>
                <span>Library Root</span>
            </div>

            {/* Scrollable tree */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <i className="fa-solid fa-circle-notch fa-spin text-[var(--accent-primary)] text-sm"></i>
                    </div>
                ) : rootDirs.length === 0 ? (
                    <p className="text-[10px] font-mono text-[var(--text-muted)] italic px-4 py-4">
                        No subfolders found
                    </p>
                ) : (
                    rootDirs.map((dir) => (
                        <TreeNode
                            key={dir.path}
                            path={dir.path}
                            name={dir.name}
                            depth={0}
                            currentPath={currentPath}
                            onNavigate={onNavigate}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
