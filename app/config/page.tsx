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
    // New keys added in Gap 1 / Gap 2
    const [secondaryScanFolder, setSecondaryScanFolder] = useState("");
    const [dedupeKeeperScoring, setDedupeKeeperScoring] = useState(true);
    const [dedupePreferredExtensions, setDedupePreferredExtensions] = useState(".pdf, .epub");
    const [cleanerExtractMetadata, setCleanerExtractMetadata] = useState(true);
    // Persistent index
    const [libraryMountPath, setLibraryMountPath] = useState("/mnt/library");

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
                    setSecondaryScanFolder(d.SECONDARY_SCAN_FOLDER || "");
                    setDedupeKeeperScoring(d.DEDUPE_KEEPER_SCORING !== false);
                    setDedupePreferredExtensions((d.DEDUPE_PREFERRED_EXTENSIONS || [".pdf", ".epub"]).join(", "));
                    setCleanerExtractMetadata(d.CLEANER_EXTRACT_METADATA_BEFORE_RENAME !== false);
                    setLibraryMountPath(d.LIBRARY_MOUNT_PATH || "/mnt/library");
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
            SECONDARY_SCAN_FOLDER: secondaryScanFolder.trim(),
            DEDUPE_KEEPER_SCORING: dedupeKeeperScoring,
            DEDUPE_PREFERRED_EXTENSIONS: dedupePreferredExtensions.split(",").map((s: string) => s.trim()).filter((s: string) => s),
            CLEANER_EXTRACT_METADATA_BEFORE_RENAME: cleanerExtractMetadata,
            LIBRARY_MOUNT_PATH: libraryMountPath.trim(),
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
                        <h4 className="text-sm font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2 border-l-2 border-[var(--accent-primary)] pl-3">
                            deDupe — Advanced
                        </h4>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mb-4 pl-3">
                            Keeper scoring picks the best copy when duplicates are found. The secondary scan folder lets you compare an intake folder against the main library in a single pass.
                        </p>
                        <div className="bg-[var(--bg-input)]/30 p-3 border border-[var(--border-dim)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 md:col-span-2 border-b border-[var(--border-dim)] pb-4">
                                    <input type="checkbox" checked={dedupeKeeperScoring} onChange={e => setDedupeKeeperScoring(e.target.checked)} className="h-4 w-4 accent-[var(--accent-primary)]" />
                                    <span className="text-sm font-mono text-[var(--text-main)]">Use Keeper Scoring (recommended — picks best copy by depth, name cleanliness, format)</span>
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Secondary Scan Folder</label>
                                    <input type="text" value={secondaryScanFolder} onChange={e => setSecondaryScanFolder(e.target.value)} placeholder="/path/to/intake or downloads folder (optional)" className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                    <p className="text-[10px] font-mono text-[var(--text-muted)]">Files here are compared against the primary library. Library always wins ties.</p>
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Preferred Extensions (comma separated)</label>
                                    <input type="text" value={dedupePreferredExtensions} onChange={e => setDedupePreferredExtensions(e.target.value)} placeholder=".pdf, .epub" className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                    <p className="text-[10px] font-mono text-[var(--text-muted)]">When two copies have equal scores, these formats are preferred as the keeper.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2 border-l-2 border-[var(--accent-primary)] pl-3">
                            Persistent Index
                        </h4>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mb-4 pl-3">
                            When deDupe scans the NAS mount path, it saves file hashes to a local database (<span className="text-[var(--text-main)]">~/.librarian/library_index.db</span>). On future runs, only new or changed files are re-hashed — dramatically faster for large libraries. Scans of any other folder (iCloud, staging, etc.) always use in-memory hashing and nothing is stored.
                        </p>
                        <div className="bg-[var(--bg-input)]/30 p-3 border border-[var(--border-dim)]">
                            <div className="space-y-1">
                                <label className="text-xs text-[var(--text-main)] font-mono">NAS / Library Mount Path</label>
                                <input
                                    type="text"
                                    value={libraryMountPath}
                                    onChange={e => setLibraryMountPath(e.target.value)}
                                    placeholder="/mnt/library"
                                    className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none"
                                />
                                <p className="text-[10px] font-mono text-[var(--text-muted)]">Scans of this path (and any subfolder within it) use the persistent index. Leave as-is if your NAS mounts at /mnt/library.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2 border-l-2 border-[var(--accent-primary)] pl-3">
                            File Cleaner
                        </h4>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mb-4 pl-3">
                            When enabled, Anna&apos;s Archive filenames are parsed for embedded metadata (ISBN, author, year, publisher) before the filename is cleaned. Extracted values are written to XMP metadata gaps only — existing metadata is never overwritten.
                        </p>
                        <div className="bg-[var(--bg-input)]/30 p-3 border border-[var(--border-dim)]">
                            <div className="flex items-center space-x-3">
                                <input type="checkbox" checked={cleanerExtractMetadata} onChange={e => setCleanerExtractMetadata(e.target.checked)} className="h-4 w-4 accent-[var(--accent-primary)]" />
                                <span className="text-sm font-mono text-[var(--text-main)]">Extract metadata from filename before cleaning (recommended for Anna&apos;s Archive files)</span>
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
