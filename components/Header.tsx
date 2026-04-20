"use client";

import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case "/dashboard":
                return "Dashboard";
            case "/organize":
                return "Organize Library";
            case "/dedupe":
                return "deDupe Tool";
            case "/segmenting":
                return "Segmenting Tool";
            case "/library":
                return "Library Index";
            case "/config":
                return "Configuration";
            default:
                return "Data Librarian";
        }
    };

    // Mock status for now - in real app this would come from a Context/Store
    const status = "RUNNING"; // STOPPED, RUNNING, CANCELLED

    const getStatusColor = () => {
        if (status === "RUNNING") return "text-[var(--accent-primary)] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]";
        if (status === "STOPPED") return "text-gray-400"; // Gray/Dim
        if (status === "CANCELLED") return "text-warning drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]";
        return "text-[var(--text-muted)]";
    };

    return (
        <header className="h-20 bg-[var(--bg-panel)]/90 backdrop-blur-sm border-b border-[var(--border-dim)] flex items-center justify-between px-6 sticky top-0 z-10 w-full">
            <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-heading text-secondary tracking-wide">
                    {getTitle()}
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--bg-input)] border border-[var(--border-dim)] text-[var(--text-main)]">
                    v2.5.0-beta
                </span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center border border-[var(--border-dim)] bg-[var(--bg-input)] px-5 py-2.5 rounded-sm">
                    <span className="text-xs font-mono text-secondary mr-4 tracking-widest">SYSTEM STATUS</span>
                    <i className={`fa-solid fa-circle text-xs mr-2.5 ${getStatusColor()}`}></i>
                    <span className={`text-base font-bold font-mono tracking-wider ${getStatusColor()}`}>
                        {status}
                    </span>
                </div>
            </div>
        </header>
    );
}
