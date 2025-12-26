"use client";

import { DataLibrarian } from "@/lib/head_librarian";
import { DataLibrarian as Types } from "@/types/library";
import { useEffect, useState } from 'react';
import FileTree from "./FileTree";

// Simple SessionStorage Hook (Simulated inline for simplicity, can move to lib/hooks)
function useSessionPath(key: string, defaultValue: string) {
    const [value, setValue] = useState(defaultValue);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const stored = sessionStorage.getItem(key);
        if (stored !== null) {
            setValue(stored);
        }
    }, [key]);

    const setStoredValue = (newValue: string) => {
        setValue(newValue);
        sessionStorage.setItem(key, newValue);
    };

    return [value, setStoredValue, isMounted] as const;
}

export default function LibraryExplorer() {
    const [currentPath, setCurrentPath, isMounted] = useSessionPath("current_path", "");
    const [cards, setCards] = useState<Types.CatalogCard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch Catalog when Path Changes
    useEffect(() => {
        if (!isMounted) return;
        loadCatalog(currentPath);
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
        } catch (e) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = (path: string) => {
        setCurrentPath(path);
    };

    const handleRefresh = () => {
        loadCatalog(currentPath, true);
    };

    // Breadcrumbs Logic
    const pathParts = currentPath.split('/').filter(p => p);
    const breadcrumbs = [
        { name: "Root", path: "" },
        ...pathParts.map((part, index) => ({
            name: part,
            path: pathParts.slice(0, index + 1).join('/')
        }))
    ];

    if (!isMounted) return null; // Prevent hydration mismatch with session storage

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
                            <button
                                onClick={() => handleNavigate(crumb.path)}
                                className={`hover:text-white transition-colors ${idx === breadcrumbs.length - 1 ? "text-[var(--accent-primary)] font-bold cursor-default" : "text-[var(--text-muted)]"}`}
                                disabled={idx === breadcrumbs.length - 1}
                            >
                                {crumb.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-2 mb-4 rounded text-sm font-mono">
                    <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                    {error}
                </div>
            )}

            {/* Explorer Content */}
            <div className={`flex-1 overflow-hidden flex flex-col bg-[var(--bg-card)] border border-[var(--border-dim)] rounded-sm shadow-sm relative ${loading ? 'opacity-70 pointer-events-none' : ''}`}>
                <FileTree
                    data={cards}
                    currentPath={currentPath}
                    onNavigate={handleNavigate}
                    onRefresh={handleRefresh}
                />

                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <i className="fa-solid fa-circle-notch fa-spin text-4xl text-[var(--accent-primary)]"></i>
                    </div>
                )}
            </div>
        </div>
    );
}
