"use client";

import { useTerminal } from "@/context/TerminalContext";
import { DataLibrarian as StaticConfig } from "@/types/config";
import { useState, useEffect } from "react";

const STORAGE_KEY = "dl_last_path_organize";

export default function OrganizePage() {
    const { addLog } = useTerminal();
    const [targetPath, setTargetPath] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    // Pre-populate: localStorage first, then live config, then static build-time config
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setTargetPath(saved);
            return;
        }
        const staticDefault = StaticConfig.Config.DEFAULT_TARGET_FOLDER || "";
        if (staticDefault) setTargetPath(staticDefault);

        fetch("http://localhost:2226/get_config")
            .then(res => res.json())
            .then(result => {
                if (result.success && result.data.DEFAULT_TARGET_FOLDER) {
                    setTargetPath(result.data.DEFAULT_TARGET_FOLDER);
                }
            })
            .catch(() => {});
    }, []);

    const handlePathChange = (newPath: string) => {
        setTargetPath(newPath);
        localStorage.setItem(STORAGE_KEY, newPath);
    };

    const handleStart = async () => {
        if (!targetPath) {
            addLog("Target folder path is required.", "error");
            return;
        }

        if (isRunning) {
            addLog("Organizer is already running.", "warn");
            return;
        }

        addLog("Initializing Library Organizer...", "warn");
        addLog(`Source: ${targetPath}`, "info");
        addLog(`Destination: ${targetPath}/Organized_Books`, "info");
        setIsRunning(true);

        try {
            const response = await fetch("http://localhost:2226/api/action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "organize", target_folder: targetPath }),
            });

            const data = await response.json();

            if (data.status === "started") {
                addLog("Organizer running — scanning for PDF and EPUB files...", "success");
                pollStatus();
            } else if (data.status === "running") {
                addLog("Organizer is already running.", "warn");
                setIsRunning(false);
            } else {
                addLog(`Failed to start: ${data.message || "Unknown error"}`, "error");
                setIsRunning(false);
            }
        } catch (error) {
            addLog(`Failed to connect to backend: ${error}`, "error");
            setIsRunning(false);
        }
    };

    const pollStatus = () => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch("http://localhost:2226/check_organize_status");
                const data = await res.json();

                if (!data.running) {
                    addLog("Library organization complete. Files moved to Organized_Books/.", "success");
                    setIsRunning(false);
                    clearInterval(interval);
                }
            } catch {
                addLog("Lost connection to backend.", "error");
                setIsRunning(false);
                clearInterval(interval);
            }
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--bg-card)] border border-[var(--border-dim)] p-8 shadow-lg">
                <h3 className="font-heading text-xl text-secondary mb-6 border-b border-[var(--border-dim)] pb-4 flex items-center">
                    <i className="fa-solid fa-folder-tree mr-3 text-[var(--accent-primary)]"></i>
                    Organize Library
                </h3>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            Source Folder (Absolute Path)
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-[var(--border-dim)] bg-[var(--bg-input)] text-[var(--text-muted)]">
                                <i className="fa-solid fa-folder-open text-xs"></i>
                            </span>
                            <input
                                type="text"
                                value={targetPath}
                                onChange={(e) => handlePathChange(e.target.value)}
                                placeholder="/path/to/library"
                                className="flex-1 block w-full rounded-none rounded-r bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-4 py-2.5 focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none font-mono text-sm placeholder-[var(--text-muted)] transition-all"
                            />
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)] font-mono">
                            PDF and EPUB files will be moved into a new <span className="text-[var(--accent-primary)]">Organized_Books/</span> subfolder, sorted by Author.
                        </p>
                    </div>

                    {/* Info box */}
                    <div className="bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm p-4 space-y-2">
                        <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-2">What this does</p>
                        <ul className="space-y-1 text-xs font-mono text-[var(--text-muted)]">
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Scans all subfolders for PDF and EPUB files</li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Extracts author and title from file metadata</li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Creates <span className="text-[var(--text-main)]">Organized_Books/Author/</span> subfolders</li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Renames files to <span className="text-[var(--text-main)]">Author - Title.ext</span></li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Non-PDF/EPUB files are left untouched</li>
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-[var(--border-dim)] flex justify-end">
                        <button
                            onClick={handleStart}
                            disabled={isRunning}
                            className="bg-[var(--accent-primary)] text-[#09161c] hover:opacity-90 px-8 py-3 rounded-sm font-bold font-mono tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <i className={`fa-solid ${isRunning ? "fa-spinner fa-spin" : "fa-play"} mr-2`}></i>
                            {isRunning ? "Running..." : "Start"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
