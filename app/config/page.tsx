"use client";

import { useTerminal } from "@/context/TerminalContext";
import { useState, useEffect } from "react";

export default function ConfigPage() {
    const { addLog } = useTerminal();
    const [saved, setSaved] = useState(false);
    const [port, setPort] = useState("2226");
    const [moveDuplicates, setMoveDuplicates] = useState(false);
    const [defaultTargetFolder, setDefaultTargetFolder] = useState("");
    const [duplicateHoldingDir, setDuplicateHoldingDir] = useState("./_DuplicateHoldingBin");
    const [logNamePrefix, setLogNamePrefix] = useState("_duplicate_log");
    const [excludedFolders, setExcludedFolders] = useState("_DuplicateHoldingBin");
    const [userExcludedFiles, setUserExcludedFiles] = useState("");
    const [pdfTargetChunkMb, setPdfTargetChunkMb] = useState("100");
    const [pdfPageChunkLimit, setPdfPageChunkLimit] = useState("1000");

    useEffect(() => {
        fetch("http://localhost:2226/get_config")
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const d = result.data;
                    setPort(String(d.PORT || "2226"));
                    setMoveDuplicates(d.MOVE_DUPLICATES || false);
                    setDefaultTargetFolder(d.DEFAULT_TARGET_FOLDER || "");
                    setDuplicateHoldingDir(d.DUPLICATE_HOLDING_DIR || "./_DuplicateHoldingBin");
                    setLogNamePrefix(d.LOG_NAME_PREFIX || "_duplicate_log");
                    setExcludedFolders((d.EXCLUDED_FOLDERS || []).join(", "));
                    setUserExcludedFiles((d.USER_EXCLUDED_FILES || []).join(", "));
                    setPdfTargetChunkMb(String(d.PDF_TARGET_CHUNK_MB || "100"));
                    setPdfPageChunkLimit(String(d.PDF_PAGE_CHUNK_LIMIT || "1000"));
                }
            })
            .catch(() => addLog("Could not load config from backend.", "error"));
    }, []);

    const handleSave = async () => {
        const config = {
            PORT: parseInt(port),
            MOVE_DUPLICATES: moveDuplicates,
            DEFAULT_TARGET_FOLDER: defaultTargetFolder,
            DUPLICATE_HOLDING_DIR: duplicateHoldingDir,
            LOG_NAME_PREFIX: logNamePrefix,
            EXCLUDED_FOLDERS: excludedFolders.split(",").map((s: string) => s.trim()).filter((s: string) => s),
            USER_EXCLUDED_FILES: userExcludedFiles.split(",").map((s: string) => s.trim()).filter((s: string) => s),
            PDF_TARGET_CHUNK_MB: parseFloat(pdfTargetChunkMb),
            PDF_PAGE_CHUNK_LIMIT: parseInt(pdfPageChunkLimit),
        };
        try {
            const res = await fetch("http://localhost:2226/save_config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            const result = await res.json();
            if (result.success) {
                addLog("Configuration saved successfully.", "success");
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } else {
                addLog("Failed to save config: " + result.error, "error");
            }
        } catch (error) {
            addLog("Could not connect to backend: " + error, "error");
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="bg-[var(--bg-card)] border border-[var(--border-dim)] p-8 shadow-lg">
                <h3 className="font-heading text-xl text-secondary mb-6 border-b border-[var(--border-dim)] pb-4 flex items-center">
                    <i className="fa-solid fa-gear mr-3 text-[var(--accent-primary)]"></i>
                    System Configuration
                </h3>
                {/* About panel */}
                <div className="bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm p-4 space-y-2 mb-8">
                    <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-2">About this view</p>
                    <ul className="space-y-1 text-xs font-mono text-[var(--text-muted)]">
                        <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Settings are stored in <span className="text-[var(--text-main)]">config.json</span> in the project root and loaded at backend startup</li>
                        <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Changes saved here take effect immediately — no restart required for most settings</li>
                        <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>The <span className="text-[var(--text-main)]">Default Target Folder</span> is the fallback path used by all modules on first launch</li>
                        <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Each module also remembers the last path you used independently of this setting</li>
                    </ul>
                </div>
                <div className="space-y-8">
                    <section>
                        <h4 className="text-sm font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2 border-l-2 border-[var(--accent-primary)] pl-3">
                            Server Settings
                        </h4>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mb-4 pl-3">Backend API port. Changing this requires a full app restart to take effect.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--bg-input)]/30 p-3 border border-[var(--border-dim)]">
                            <div className="space-y-1">
                                <label className="text-xs text-[var(--text-main)] font-mono">Port</label>
                                <input type="number" value={port} onChange={e => setPort(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4 className="text-sm font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2 border-l-2 border-error pl-3">
                            deDupe Module
                        </h4>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mb-4 pl-3">Controls duplicate scanning behavior. Keep <span className="text-[var(--text-main)]">Move Duplicates</span> unchecked for Dry Run mode until you've reviewed a scan log and are confident in the results.</p>
                        <div className="bg-[var(--bg-input)]/30 p-3 border border-[var(--border-dim)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 md:col-span-2 border-b border-[var(--border-dim)] pb-4">
                                    <input type="checkbox" checked={moveDuplicates} onChange={e => setMoveDuplicates(e.target.checked)} className="h-4 w-4 accent-[var(--accent-primary)]" />
                                    <span className="text-sm font-mono text-[var(--text-main)]">Move Duplicates (uncheck for Dry Run)</span>
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Default Target Folder</label>
                                    <input type="text" value={defaultTargetFolder} onChange={e => setDefaultTargetFolder(e.target.value)} placeholder="/path/to/library" className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Duplicate Holding Directory</label>
                                    <input type="text" value={duplicateHoldingDir} onChange={e => setDuplicateHoldingDir(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Log File Prefix</label>
                                    <input type="text" value={logNamePrefix} onChange={e => setLogNamePrefix(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Excluded Folders (comma separated)</label>
                                    <input type="text" value={excludedFolders} onChange={e => setExcludedFolders(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Excluded Files (comma separated)</label>
                                    <input type="text" value={userExcludedFiles} onChange={e => setUserExcludedFiles(e.target.value)} placeholder="file1.txt, file2.pdf" className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4 className="text-sm font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2 border-l-2 border-info pl-3">
                            Segmenting Module
                        </h4>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mb-4 pl-3">Controls PDF splitting. Files larger than <span className="text-[var(--text-main)]">Max File Size</span> are split into chunks. The page count is a starting estimate — the splitter auto-adjusts it to hit the size target.</p>
                        <div className="bg-[var(--bg-input)]/30 p-3 border border-[var(--border-dim)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Max File Size (MB)</label>
                                    <input type="number" value={pdfTargetChunkMb} onChange={e => setPdfTargetChunkMb(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Page Chunk Limit</label>
                                    <input type="number" value={pdfPageChunkLimit} onChange={e => setPdfPageChunkLimit(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="flex justify-end pt-8 border-t border-[var(--border-dim)] mt-8">
                    <button onClick={handleSave} className="bg-[var(--accent-primary)] text-[#09161c] hover:opacity-90 px-8 py-3 rounded-sm font-bold font-mono tracking-wide transition-all">
                        <i className={`fa-solid ${saved ? "fa-check" : "fa-save"} mr-2`}></i>
                        {saved ? "Saved!" : "Save Configuration"}
                    </button>
                </div>
            </div>
        </div>
    );
}
