"use client";

import { useTerminal } from "@/context/TerminalContext";
import { DataLibrarian as StaticConfig } from "@/types/config";
import { useState, useEffect } from "react";

const SHARED_PATH_KEY = "dl_active_library_path";

export default function SegmentingPage() {
    const { addLog, setLogFilePath } = useTerminal();
    const [targetPath, setTargetPath] = useState("");
    const [maxSize, setMaxSize] = useState("100");
    const [pageCount, setPageCount] = useState("1000");
    const [isRunning, setIsRunning] = useState(false);

    // Read shared active library path + config values for size/page settings
    useEffect(() => {
        const cfg = StaticConfig.Config;
        const shared = localStorage.getItem(SHARED_PATH_KEY);
        if (shared) setTargetPath(shared);
        else if (cfg.DEFAULT_TARGET_FOLDER) setTargetPath(cfg.DEFAULT_TARGET_FOLDER);
        if (cfg.PDF_TARGET_CHUNK_MB) setMaxSize(String(cfg.PDF_TARGET_CHUNK_MB));
        if (cfg.PDF_PAGE_CHUNK_LIMIT) setPageCount(String(cfg.PDF_PAGE_CHUNK_LIMIT));

        fetch("http://localhost:2226/get_config")
            .then(res => res.json())
            .then(result => {
                if (!result.success) return;
                const d = result.data;
                if (!shared && d.DEFAULT_TARGET_FOLDER) setTargetPath(d.DEFAULT_TARGET_FOLDER);
                if (d.PDF_TARGET_CHUNK_MB) setMaxSize(String(d.PDF_TARGET_CHUNK_MB));
                if (d.PDF_PAGE_CHUNK_LIMIT) setPageCount(String(d.PDF_PAGE_CHUNK_LIMIT));
            })
            .catch(() => {});
    }, []);

    const pollPdfStatus = () => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch("http://localhost:2226/check_pdf_status");
                const data = await res.json();
                if (!data.running) {
                    addLog("PDF splitter completed.", "success");
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

    const handleStart = async () => {
        if (!targetPath) {
            addLog("Target folder path is required", "error");
            return;
        }

        addLog(`Initializing PDF Segmenter...`, "warn");
        addLog(`Target: ${targetPath} | Max Size: ${maxSize}MB | Initial Pages: ${pageCount}`, "info");
        setIsRunning(true);

        try {
            const response = await fetch("http://localhost:2226/run_pdf_splitter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    target_folder: targetPath,
                    max_size_mb: parseFloat(maxSize),
                    initial_page_count: parseInt(pageCount),
                }),
            });
            const data = await response.json();
            if (data.status === "started") {
                addLog("PDF splitter started. Scanning for large files...", "success");
                pollPdfStatus();
            } else if (data.status === "running") {
                addLog("PDF splitter is already running.", "warn");
                setIsRunning(false);
            }
        } catch (error) {
            addLog(`Failed to connect to backend: ${error}`, "error");
            setIsRunning(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--bg-card)] border border-[var(--border-dim)] p-8 shadow-lg">
                <h3 className="font-heading text-xl text-secondary mb-6 border-b border-[var(--border-dim)] pb-4 flex items-center">
                    <i className="fa-regular fa-file-pdf mr-3 text-[var(--accent-primary)]"></i>
                    Segmenting Tool
                </h3>

                <div className="space-y-6">
                    {/* Active folder display */}
                    <div className="space-y-2">
                        <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            Target Folder
                        </label>
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm">
                            <i className="fa-solid fa-folder text-[var(--accent-primary)]"></i>
                            <span className="font-mono text-sm text-[var(--text-main)] break-all">
                                {targetPath || <span className="text-[var(--text-muted)]">No folder selected — go to Library tab to set active folder</span>}
                            </span>
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)] font-mono">
                            Active folder is set from the <span className="text-[var(--accent-primary)]">Library</span> tab. PDFs larger than the max size will be split into chunks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Max File Size */}
                        <div className="space-y-2">
                            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                Max File Size (MB)
                            </label>
                            <input
                                type="number"
                                value={maxSize}
                                onChange={(e) => setMaxSize(e.target.value)}
                                className="block w-full rounded bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-4 py-2.5 focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none font-mono text-sm transition-all"
                            />
                            <p className="text-[10px] text-[var(--text-muted)] font-mono">
                                PDFs larger than this will be split into chunks.
                            </p>
                        </div>

                        {/* Page Count */}
                        <div className="space-y-2">
                            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                Initial Page Count (Est.)
                            </label>
                            <input
                                type="number"
                                value={pageCount}
                                onChange={(e) => setPageCount(e.target.value)}
                                className="block w-full rounded bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-4 py-2.5 focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none font-mono text-sm transition-all"
                            />
                            <p className="text-[10px] text-[var(--text-muted)] font-mono">
                                Starting estimate; auto-adjusts to meet size target.
                            </p>
                        </div>
                    </div>

                    {/* Info box */}
                    <div className="bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm p-4 space-y-2">
                        <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-2">What this does</p>
                        <ul className="space-y-1 text-xs font-mono text-[var(--text-muted)]">
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Scans the target folder for PDF files exceeding the Max File Size</li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Splits large PDFs into numbered chunks: <span className="text-[var(--text-main)]">filename_pages_1-250.pdf</span>, etc.</li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Page count auto-adjusts per file to stay under the size limit</li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Chunks are saved alongside the original in the same folder</li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Original PDF files are <span className="text-[var(--text-main)]">left in place</span> — nothing is deleted</li>
                            <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Files already under the size limit are skipped entirely</li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-[var(--border-dim)] flex justify-end">
                        <button
                            onClick={handleStart}
                            disabled={isRunning}
                            className="bg-[var(--accent-primary)] text-[#09161c] hover:opacity-90 px-8 py-3 rounded-sm font-bold font-mono tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
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
