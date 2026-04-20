"use client";

import { useTerminal } from "@/context/TerminalContext";
import { DataLibrarian as StaticConfig } from "@/types/config";
import { useState, useEffect } from "react";

const STORAGE_KEY_PDF    = "dl_binder_pdf_source";
const STORAGE_KEY_TEXT   = "dl_binder_text_source";
const STORAGE_KEY_OUTPUT = "dl_binder_output";

type Mode = "pdf" | "text";

export default function BinderPage() {
    const { addLog } = useTerminal();
    const [mode, setMode]             = useState<Mode>("pdf");
    const [pdfSource, setPdfSource]   = useState("");
    const [textSource, setTextSource] = useState("");
    const [outputPath, setOutputPath] = useState("");
    const [outputName, setOutputName] = useState("merged_book.pdf");
    const [isRunning, setIsRunning]   = useState(false);
    const [preview, setPreview]       = useState<string | null>(null);
    const [previewLoading, setPreviewLoading] = useState(false);

    useEffect(() => {
        const cfg = StaticConfig.Config;
        const base = localStorage.getItem(STORAGE_KEY_OUTPUT)
            || cfg.DEFAULT_TARGET_FOLDER || "";
        setPdfSource(localStorage.getItem(STORAGE_KEY_PDF) || cfg.DEFAULT_TARGET_FOLDER || "");
        setTextSource(localStorage.getItem(STORAGE_KEY_TEXT) || "");
        setOutputPath(base);

        fetch("http://localhost:2226/get_config")
            .then(r => r.json())
            .then(r => {
                if (!r.success) return;
                if (!localStorage.getItem(STORAGE_KEY_PDF) && r.data.DEFAULT_TARGET_FOLDER)
                    setPdfSource(r.data.DEFAULT_TARGET_FOLDER);
                if (!localStorage.getItem(STORAGE_KEY_OUTPUT) && r.data.DEFAULT_TARGET_FOLDER)
                    setOutputPath(r.data.DEFAULT_TARGET_FOLDER);
            })
            .catch(() => {});
    }, []);

    // When switching to text mode, try to scan the folder for a preview
    const scanTextFolder = async (folder: string) => {
        if (!folder) { setPreview(null); return; }
        setPreviewLoading(true);
        try {
            const res = await fetch("http://localhost:2226/api/bind/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ folder }),
            });
            const data = await res.json();
            if (data.success) setPreview(data.summary);
            else setPreview(null);
        } catch { setPreview(null); }
        finally { setPreviewLoading(false); }
    };

    const handleTextSourceChange = (val: string) => {
        setTextSource(val);
        localStorage.setItem(STORAGE_KEY_TEXT, val);
        setPreview(null);
    };

    const handleScanClick = () => scanTextFolder(textSource);

    const pollStatus = () => {
        const interval = setInterval(async () => {
            try {
                const res  = await fetch("http://localhost:2226/api/bind/status");
                const data = await res.json();
                if (data.progress?.message) addLog(data.progress.message, "info");
                if (!data.running) {
                    const msg = data.progress?.message ?? "";
                    if (msg.toLowerCase().startsWith("done") || msg.toLowerCase().startsWith("merged") || msg.toLowerCase().includes("→")) {
                        addLog("Binding complete.", "success");
                    } else if (msg.toLowerCase().startsWith("error")) {
                        addLog(msg, "error");
                    }
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
        const source = mode === "pdf" ? pdfSource : textSource;
        if (!source) { addLog("Source folder is required.", "error"); return; }
        if (!outputPath) { addLog("Output folder is required.", "error"); return; }
        if (!outputName) { addLog("Output filename is required.", "error"); return; }

        const fullOutput = outputPath.replace(/\/+$/, "") + "/" + outputName;
        addLog(`Starting ${mode === "pdf" ? "PDF merge" : "text page stitch"}...`, "warn");
        addLog(`Source: ${source}`, "info");
        addLog(`Output: ${fullOutput}`, "info");
        setIsRunning(true);

        try {
            const res = await fetch("http://localhost:2226/api/bind/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode, source_folder: source, output_path: fullOutput }),
            });
            const data = await res.json();
            if (data.success) {
                addLog("Binder started.", "success");
                pollStatus();
            } else {
                addLog(data.error ?? "Failed to start.", "error");
                setIsRunning(false);
            }
        } catch (e) {
            addLog(`Backend error: ${e}`, "error");
            setIsRunning(false);
        }
    };

    const defaultOutputName = mode === "pdf" ? "merged_book.pdf" : "stitched_book.txt";

    const tabClass = (t: Mode) =>
        `px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all ${
            mode === t
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : "border-transparent text-[var(--text-muted)] hover:text-white"
        }`;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--bg-card)] border border-[var(--border-dim)] shadow-lg">

                {/* Header */}
                <div className="px-8 pt-8 pb-0 border-b border-[var(--border-dim)]">
                    <h3 className="font-heading text-xl text-secondary mb-4 flex items-center">
                        <i className="fa-solid fa-layer-group mr-3 text-[var(--accent-primary)]"></i>
                        Binder
                    </h3>
                    {/* Mode tabs */}
                    <div className="flex gap-0">
                        <button className={tabClass("pdf")} onClick={() => { setMode("pdf"); setPreview(null); }}>
                            <i className="fa-regular fa-file-pdf mr-1.5"></i>Merge PDFs
                        </button>
                        <button className={tabClass("text")} onClick={() => { setMode("text"); setPreview(null); }}>
                            <i className="fa-regular fa-file-lines mr-1.5"></i>Stitch Text Pages
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    {/* ── PDF MODE ── */}
                    {mode === "pdf" && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                    Source Folder
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-[var(--border-dim)] bg-[var(--bg-input)] text-[var(--text-muted)]">
                                        <i className="fa-solid fa-folder-open text-xs"></i>
                                    </span>
                                    <input type="text" value={pdfSource}
                                        onChange={e => { setPdfSource(e.target.value); localStorage.setItem(STORAGE_KEY_PDF, e.target.value); }}
                                        placeholder="/path/to/folder"
                                        className="flex-1 rounded-r bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-4 py-2.5 focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none font-mono text-sm placeholder-[var(--text-muted)] transition-all"
                                    />
                                </div>
                                <p className="text-[10px] text-[var(--text-muted)] font-mono">All .pdf files in this folder will be merged in alphabetical order.</p>
                            </div>

                            <div className="bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm p-4 space-y-1">
                                <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-2">What this does</p>
                                {[
                                    "Scans the source folder for all PDF files",
                                    "Sorts them alphabetically (so part_1.pdf, part_2.pdf… merge correctly)",
                                    "Combines every page into a single output PDF",
                                    "Original files are left untouched",
                                ].map((s, i) => (
                                    <p key={i} className="text-xs font-mono text-[var(--text-muted)]">
                                        <i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>{s}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ── TEXT MODE ── */}
                    {mode === "text" && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                    Page Files Folder
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex flex-1">
                                        <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-[var(--border-dim)] bg-[var(--bg-input)] text-[var(--text-muted)]">
                                            <i className="fa-solid fa-folder-open text-xs"></i>
                                        </span>
                                        <input type="text" value={textSource}
                                            onChange={e => handleTextSourceChange(e.target.value)}
                                            placeholder="/path/to/39015004288299"
                                            className="flex-1 rounded-r bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-4 py-2.5 focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none font-mono text-sm placeholder-[var(--text-muted)] transition-all"
                                        />
                                    </div>
                                    <button onClick={handleScanClick} disabled={!textSource || previewLoading}
                                        className="px-4 py-2 text-xs font-mono border border-[var(--border-dim)] bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent-primary)] rounded-sm transition-all disabled:opacity-40">
                                        <i className={`fa-solid ${previewLoading ? "fa-spinner fa-spin" : "fa-magnifying-glass"} mr-1.5`}></i>
                                        Scan
                                    </button>
                                </div>
                                <p className="text-[10px] text-[var(--text-muted)] font-mono">
                                    Folder of numbered .txt page files — e.g. 00000001.txt, 00000002.txt …
                                </p>
                            </div>

                            {/* Scan preview */}
                            {preview && (
                                <div className="px-4 py-3 bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20 rounded-sm">
                                    <p className="text-xs font-mono text-[var(--accent-primary)]">
                                        <i className="fa-solid fa-circle-check mr-2"></i>{preview}
                                    </p>
                                </div>
                            )}

                            <div className="bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm p-4 space-y-1">
                                <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-2">What this does</p>
                                {[
                                    "Finds all .txt files in the folder and sorts them numerically",
                                    "Stitches each page in order into a single text document",
                                    "Skips blank pages automatically",
                                    "Original page files are left untouched",
                                ].map((s, i) => (
                                    <p key={i} className="text-xs font-mono text-[var(--text-muted)]">
                                        <i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>{s}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ── Shared: output path + filename ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Output Folder</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-[var(--border-dim)] bg-[var(--bg-input)] text-[var(--text-muted)]">
                                    <i className="fa-solid fa-folder text-xs"></i>
                                </span>
                                <input type="text" value={outputPath}
                                    onChange={e => { setOutputPath(e.target.value); localStorage.setItem(STORAGE_KEY_OUTPUT, e.target.value); }}
                                    placeholder="/path/to/output"
                                    className="flex-1 rounded-r bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-4 py-2.5 focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none font-mono text-sm placeholder-[var(--text-muted)] transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Output Filename</label>
                            <input type="text"
                                value={outputName}
                                onChange={e => setOutputName(e.target.value)}
                                placeholder={defaultOutputName}
                                className="w-full rounded bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-4 py-2.5 focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none font-mono text-sm placeholder-[var(--text-muted)] transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[var(--border-dim)] flex justify-end">
                        <button onClick={handleStart} disabled={isRunning}
                            className="bg-[var(--accent-primary)] text-[#09161c] hover:opacity-90 px-8 py-3 rounded-sm font-bold font-mono tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                            <i className={`fa-solid ${isRunning ? "fa-spinner fa-spin" : "fa-layer-group"} mr-2`}></i>
                            {isRunning ? "Binding…" : "Bind"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
