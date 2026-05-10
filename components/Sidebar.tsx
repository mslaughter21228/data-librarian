"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 bg-[var(--bg-panel)] border-r border-[var(--border-dim)] flex flex-col z-20 h-full">
            <div className="h-20 flex items-center justify-center border-b border-[var(--border-dim)] bg-[var(--bg-dark)]">
                <img src="/logo.png" alt="Data Librarian" className="h-14 w-auto brightness-0 invert drop-shadow-[0_0_18px_rgba(0,240,255,0.9)] drop-shadow-[0_0_6px_rgba(0,240,255,1)]" />
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 space-y-0.5">
                <Link
                    href="/dashboard"
                    className={`flex items-center px-6 py-2 text-[var(--text-main)] transition-all border-l-2 ${isActive("/dashboard")
                        ? "bg-[var(--bg-input)] border-[var(--accent-primary)] text-white"
                        : "border-transparent hover:bg-[var(--bg-input)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-white"
                        }`}
                >
                    <i className="fa-solid fa-chart-line text-sm w-6 mr-3 text-[var(--accent-primary)]"></i>
                    <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <Link
                    href="/library"
                    className={`flex items-center px-6 py-2 text-[var(--text-main)] transition-all border-l-2 ${isActive("/library")
                        ? "bg-[var(--bg-input)] border-[var(--accent-primary)] text-white"
                        : "border-transparent hover:bg-[var(--bg-input)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-white"
                        }`}
                >
                    <i className="fa-solid fa-book text-sm w-6 mr-3 text-[var(--accent-primary)]"></i>
                    <span className="text-sm font-medium">Library</span>
                </Link>

                <div className="px-4 mt-6 mb-2 text-[10px] font-bold text-secondary uppercase tracking-wider font-mono opacity-80">
                    Core Modules
                </div>
                <Link
                    href="/organize"
                    className={`flex items-center px-6 py-2 text-[var(--text-main)] transition-all border-l-2 ${isActive("/organize")
                        ? "bg-[var(--bg-input)] border-[var(--accent-primary)] text-white"
                        : "border-transparent hover:bg-[var(--bg-input)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-white"
                        }`}
                >
                    <i className="fa-solid fa-folder-tree text-sm w-6 mr-3 text-[var(--accent-primary)]"></i>
                    <span className="text-sm font-medium">Organize Library</span>
                </Link>
                <Link
                    href="/metadata"
                    className={`flex items-center px-6 py-2 text-[var(--text-main)] transition-all border-l-2 ${isActive("/metadata")
                        ? "bg-[var(--bg-input)] border-[var(--accent-primary)] text-white"
                        : "border-transparent hover:bg-[var(--bg-input)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-white"
                        }`}
                >
                    <i className="fa-solid fa-tag text-sm w-6 mr-3 text-[var(--accent-primary)]"></i>
                    <span className="text-sm font-medium">Metadata</span>
                </Link>
                <Link
                    href="/dedupe"
                    className={`flex items-center px-6 py-2 text-[var(--text-main)] transition-all border-l-2 ${isActive("/dedupe")
                        ? "bg-[var(--bg-input)] border-[var(--accent-primary)] text-white"
                        : "border-transparent hover:bg-[var(--bg-input)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-white"
                        }`}
                >
                    <i className="fa-solid fa-trash-can text-sm w-6 mr-3 text-[var(--accent-primary)]"></i>
                    <span className="text-sm font-medium">deDupe</span>
                </Link>
                <Link
                    href="/segmenting"
                    className={`flex items-center px-6 py-2 text-[var(--text-main)] transition-all border-l-2 ${isActive("/segmenting")
                        ? "bg-[var(--bg-input)] border-[var(--accent-primary)] text-white"
                        : "border-transparent hover:bg-[var(--bg-input)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-white"
                        }`}
                >
                    <i className="fa-regular fa-file-pdf text-sm w-6 mr-3 text-[var(--accent-primary)]"></i>
                    <span className="text-sm font-medium">Segmenting</span>
                </Link>
                <Link
                    href="/binder"
                    className={`flex items-center px-6 py-2 text-[var(--text-main)] transition-all border-l-2 ${isActive("/binder")
                        ? "bg-[var(--bg-input)] border-[var(--accent-primary)] text-white"
                        : "border-transparent hover:bg-[var(--bg-input)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-white"
                        }`}
                >
                    <i className="fa-solid fa-layer-group text-sm w-6 mr-3 text-[var(--accent-primary)]"></i>
                    <span className="text-sm font-medium">Binder</span>
                </Link>
            </nav>

            {/* Footer / Settings */}
            <div className="p-3 border-t border-[var(--border-dim)] bg-[#050b0e]">
                <Link
                    href="/config"
                    className={`flex items-center px-4 py-2 rounded transition-colors ${isActive("/config")
                        ? "text-[var(--accent-primary)] bg-[var(--bg-input)] font-bold"
                        : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-input)]"
                        }`}
                >
                    <i className="fa-solid fa-gear text-lg mr-3 text-[var(--accent-primary)]"></i>
                    <span className="text-sm font-medium">Settings</span>
                </Link>
            </div>
        </aside>
    );
}
