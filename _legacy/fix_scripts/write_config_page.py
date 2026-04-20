content = '''"use client";

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
                <h3 className="font-mono text-xl text-secondary mb-6 border-b border-[var(--border-dim)] pb-4 flex items-center">
                    <i className="fa-solid fa-gear mr-3 text-[var(--accent-primary)]"></i>
                    SYSTEM_CONFIGURATION
                </h3>
                <div className="space-y-8">
                    <section>
                        <h4 className="text-sm font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider mb-4 border-l-2 border-[var(--accent-primary)] pl-3">
                            [Server_Settings]
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--bg-input)]/30 p-3 border border-[var(--border-dim)]">
                            <div className="space-y-1">
                                <label className="text-xs text-[var(--text-main)] font-mono">Port</label>
                                <input type="number" value={port} onChange={e => setPort(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                            </div>
                        </div>
                    </section>

<section>
                        <h4 className="text-sm font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider mb-4 border-l-2 border-info pl-3">
                            [Segmenting_Module]
                        </h4>
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
'''

with open('/home/mslaughter-admin/projects/data-librarian-main/app/config/page.tsx', 'w') as f:
    f.write(content)

print('Done!')
