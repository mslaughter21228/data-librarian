"use client";

import { useState, useEffect } from "react";
import { DataLibrarian as Types } from "@/types/library";

interface XmpMetadata {
    title: string;
    creator: string;
    publisher: string;
    date: string;
    language: string;
    subject: string[]; // tags/keywords
    description: string;
    series: string;
    series_number: string;
}

interface MetadataRecord {
    path: string;
    filename: string;
    size: number;
    modified: string;
    xmp: XmpMetadata;
}

interface MetadataPanelProps {
    file: Types.CatalogCard | null;
}

const EMPTY_XMP: XmpMetadata = {
    title: '',
    creator: '',
    publisher: '',
    date: '',
    language: '',
    subject: [],
    description: '',
    series: '',
    series_number: '',
};

function formatBytes(n: number): string {
    if (n >= 1_073_741_824) return `${(n / 1_073_741_824).toFixed(2)} GB`;
    if (n >= 1_048_576) return `${(n / 1_048_576).toFixed(2)} MB`;
    if (n >= 1_024) return `${(n / 1_024).toFixed(1)} KB`;
    return `${n} B`;
}

export default function MetadataPanel({ file }: MetadataPanelProps) {
    const [meta, setMeta] = useState<MetadataRecord | null>(null);
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState<XmpMetadata>(EMPTY_XMP);
    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');

    useEffect(() => {
        if (!file) {
            setMeta(null);
            setEditing(false);
            return;
        }
        setLoading(true);
        setEditing(false);
        setSaveStatus('idle');
        fetch("http://localhost:2226/api/metadata/get", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: file.path }),
        })
            .then(r => r.json())
            .then(r => {
                if (r.success && r.data) {
                    setMeta(r.data);
                    setDraft(r.data.xmp ?? EMPTY_XMP);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [file?.path]);

    const handleEdit = () => {
        if (meta) setDraft({ ...meta.xmp });
        setEditing(true);
        setSaveStatus('idle');
    };

    const handleCancel = () => {
        setEditing(false);
        setSaveStatus('idle');
    };

    const handleSave = async () => {
        if (!file) return;
        setSaving(true);
        try {
            const res = await fetch("http://localhost:2226/api/metadata/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path: file.path, metadata: draft }),
            });
            const data = await res.json();
            if (data.success) {
                setMeta(prev => prev ? { ...prev, xmp: { ...draft } } : null);
                setEditing(false);
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch {
            setSaveStatus('error');
        } finally {
            setSaving(false);
        }
    };

    const handleAddTag = () => {
        const tag = tagInput.trim();
        if (tag && !draft.subject.includes(tag)) {
            setDraft(d => ({ ...d, subject: [...d.subject, tag] }));
        }
        setTagInput("");
    };

    const handleRemoveTag = (tag: string) => {
        setDraft(d => ({ ...d, subject: d.subject.filter(t => t !== tag) }));
    };

    // Empty state
    if (!file) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <i className="fa-solid fa-tag text-4xl text-[var(--text-muted)] opacity-30 mb-4"></i>
                <p className="text-sm font-mono text-[var(--text-muted)]">Select a file to view and edit its metadata</p>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[var(--accent-primary)]"></i>
            </div>
        );
    }

    const xmp = editing ? draft : (meta?.xmp ?? EMPTY_XMP);
    const fieldClass = "w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 rounded focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none font-mono text-xs transition-all";
    const readonlyClass = "w-full bg-transparent text-[var(--text-main)] font-mono text-xs py-1";

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* File header */}
            <div className="px-5 py-4 border-b border-[var(--border-dim)] bg-[var(--bg-dark)] shrink-0">
                <p className="text-sm font-mono text-[var(--text-main)] font-bold truncate" title={file.name}>
                    {file.name}
                </p>
                <div className="flex gap-3 mt-1 text-[10px] font-mono text-[var(--text-muted)]">
                    {meta && <span>{formatBytes(meta.size)}</span>}
                    <span>{file.modified}</span>
                    {file.path && <span className="truncate opacity-60" title={file.path}>{file.path}</span>}
                </div>
            </div>

            {/* Save status banner */}
            {saveStatus === 'saved' && (
                <div className="mx-5 mt-3 px-3 py-1.5 bg-success/10 border border-success/20 text-success text-xs font-mono rounded flex items-center gap-2 shrink-0">
                    <i className="fa-solid fa-circle-check"></i> Metadata saved
                </div>
            )}
            {saveStatus === 'error' && (
                <div className="mx-5 mt-3 px-3 py-1.5 bg-error/10 border border-error/20 text-error text-xs font-mono rounded flex items-center gap-2 shrink-0">
                    <i className="fa-solid fa-triangle-exclamation"></i> Save failed — check backend
                </div>
            )}

            {/* Fields */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {[
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'creator', label: 'Author(s)', type: 'text' },
                    { key: 'publisher', label: 'Publisher', type: 'text' },
                    { key: 'date', label: 'Publication Date', type: 'text', placeholder: 'YYYY or YYYY-MM-DD' },
                    { key: 'language', label: 'Language', type: 'text', placeholder: 'en, fr, de, ...' },
                    { key: 'series', label: 'Series', type: 'text' },
                    { key: 'series_number', label: 'Series #', type: 'text' },
                ].map(({ key, label, type, placeholder }) => (
                    <div key={key} className="space-y-1">
                        <label className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            {label}
                        </label>
                        {editing ? (
                            <input
                                type={type}
                                value={(draft as any)[key] ?? ''}
                                placeholder={placeholder}
                                onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                                className={fieldClass}
                            />
                        ) : (
                            <p className={readonlyClass}>
                                {(xmp as any)[key] || <span className="opacity-30">—</span>}
                            </p>
                        )}
                    </div>
                ))}

                {/* Description */}
                <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Description</label>
                    {editing ? (
                        <textarea
                            value={draft.description}
                            onChange={e => setDraft(d => ({ ...d, description: e.target.value }))}
                            rows={3}
                            className={`${fieldClass} resize-none`}
                        />
                    ) : (
                        <p className={`${readonlyClass} whitespace-pre-wrap`}>
                            {xmp.description || <span className="opacity-30">—</span>}
                        </p>
                    )}
                </div>

                {/* Tags */}
                <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        Tags / Keywords
                    </label>
                    <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                        {(editing ? draft.subject : xmp.subject).map(tag => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 bg-[var(--bg-input)] border border-[var(--border-dim)] rounded text-[var(--accent-primary)]"
                            >
                                {tag}
                                {editing && (
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="hover:text-error transition-colors ml-0.5"
                                    >
                                        <i className="fa-solid fa-xmark text-[8px]"></i>
                                    </button>
                                )}
                            </span>
                        ))}
                        {!editing && xmp.subject.length === 0 && (
                            <span className="text-xs font-mono opacity-30">—</span>
                        )}
                    </div>
                    {editing && (
                        <div className="flex gap-2 mt-1">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                placeholder="Add tag..."
                                className={`${fieldClass} flex-1`}
                            />
                            <button
                                onClick={handleAddTag}
                                className="px-3 py-1 text-xs font-mono bg-[var(--bg-input)] border border-[var(--border-dim)] text-[var(--accent-primary)] rounded hover:bg-[var(--accent-primary)]/10 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Action bar */}
            <div className="px-5 py-3 border-t border-[var(--border-dim)] flex gap-2 shrink-0 bg-[var(--bg-dark)]">
                {editing ? (
                    <>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 bg-[var(--accent-primary)] text-[#09161c] font-bold font-mono text-xs py-2 rounded-sm hover:opacity-90 transition-all disabled:opacity-50"
                        >
                            <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-floppy-disk'} mr-1.5`}></i>
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 font-mono text-xs bg-[var(--bg-input)] border border-[var(--border-dim)] text-[var(--text-muted)] rounded-sm hover:text-white hover:bg-[var(--bg-card)] transition-colors"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="flex-1 bg-[var(--bg-input)] border border-[var(--border-dim)] text-[var(--text-main)] font-mono text-xs py-2 rounded-sm hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all"
                    >
                        <i className="fa-solid fa-pen mr-1.5"></i>
                        Edit Metadata
                    </button>
                )}
            </div>
        </div>
    );
}
