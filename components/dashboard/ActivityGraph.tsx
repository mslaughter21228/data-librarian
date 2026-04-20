"use client";

import { useEffect, useState } from "react";

interface ActivityData {
    labels: string[];
    scanned: number[];
    duplicates: number[];
    runs: number[];
    total_runs: number;
    total_scanned: number;
    total_duplicates: number;
}

const CHART_H = 130;
const BAR_W = 12;
const PAD = { top: 8, bottom: 28, left: 44, right: 12 };

function formatCount(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
    return String(n);
}

export default function ActivityGraph() {
    const [data, setData] = useState<ActivityData | null>(null);
    const [error, setError] = useState(false);
    const [lastFetch, setLastFetch] = useState<Date | null>(null);

    const fetchActivity = () => {
        fetch("http://localhost:2226/api/activity")
            .then(r => r.json())
            .then(r => {
                if (r.success) {
                    setData(r.data);
                    setLastFetch(new Date());
                    setError(false);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    };

    useEffect(() => {
        fetchActivity();
        const interval = setInterval(fetchActivity, 60_000); // refresh every 60s (historical data)
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return (
            <div className="h-48 flex flex-col items-center justify-center text-[var(--text-muted)] font-mono text-sm gap-2">
                <i className="fa-solid fa-triangle-exclamation text-warning text-xl"></i>
                <span>Backend unavailable — start the server to see activity</span>
                <button
                    onClick={fetchActivity}
                    className="mt-1 text-xs text-[var(--accent-primary)] hover:underline"
                >
                    <i className="fa-solid fa-rotate-right mr-1"></i> Retry
                </button>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-48 flex items-center justify-center text-[var(--text-muted)] font-mono text-sm">
                <i className="fa-solid fa-circle-notch fa-spin mr-2 text-[var(--accent-primary)]"></i>
                Loading activity...
            </div>
        );
    }

    const allVals = [...data.scanned, ...data.duplicates];
    const maxVal = Math.max(...allVals, 1);

    // Nice round Y max
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxVal)));
    const niceMax = Math.ceil(maxVal / magnitude) * magnitude;
    const yTicks = [0, Math.round(niceMax * 0.5), niceMax];

    const numDays = data.labels.length;
    // Each day: scanned bar + dupes bar + 2px gap + 4px padding between days
    const dayWidth = BAR_W * 2 + 2 + 4;
    const svgW = PAD.left + numDays * dayWidth + PAD.right;
    const svgH = PAD.top + CHART_H + PAD.bottom;
    const baselineY = PAD.top + CHART_H;

    const hasAnyData = data.total_scanned > 0 || data.total_duplicates > 0;

    return (
        <div className="w-full">
            {/* Summary pills */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4 text-xs font-mono">
                <span className="text-[var(--text-muted)]">
                    Runs (14d):&nbsp;<span className="text-[var(--accent-primary)]">{data.total_runs}</span>
                </span>
                <span className="text-[var(--text-muted)]">
                    Files Scanned:&nbsp;<span className="text-info">{data.total_scanned.toLocaleString()}</span>
                </span>
                <span className="text-[var(--text-muted)]">
                    Duplicates Found:&nbsp;<span className="text-error">{data.total_duplicates.toLocaleString()}</span>
                </span>
                {lastFetch && (
                    <span className="text-[var(--text-muted)] opacity-60 ml-auto">
                        Updated {lastFetch.toLocaleTimeString('en-US', { hour12: false })}
                    </span>
                )}
            </div>

            {/* Chart */}
            <div className="overflow-x-auto">
                <svg
                    viewBox={`0 0 ${svgW} ${svgH}`}
                    width="100%"
                    style={{ minWidth: `${Math.min(svgW, 600)}px`, maxWidth: '100%' }}
                    className="font-mono overflow-visible"
                >
                    {/* Y grid + labels */}
                    {yTicks.map((tick, i) => {
                        const y = baselineY - (tick / niceMax) * CHART_H;
                        return (
                            <g key={i}>
                                <line
                                    x1={PAD.left} y1={y}
                                    x2={svgW - PAD.right} y2={y}
                                    stroke="var(--border-dim)" strokeDasharray="3,3" strokeWidth="0.5"
                                />
                                <text
                                    x={PAD.left - 5} y={y + 3.5}
                                    textAnchor="end" fontSize="9"
                                    fill="var(--text-muted)"
                                >
                                    {formatCount(tick)}
                                </text>
                            </g>
                        );
                    })}

                    {/* Bars */}
                    {data.labels.map((label, i) => {
                        const xBase = PAD.left + i * dayWidth;
                        const scH = (data.scanned[i] / niceMax) * CHART_H;
                        const dupH = (data.duplicates[i] / niceMax) * CHART_H;
                        const hasRun = data.runs[i] > 0;
                        const isToday = i === numDays - 1;

                        // Show label every 2 days, plus always today
                        const showLabel = i % 2 === 0 || isToday;
                        const labelParts = label.split(' '); // ["Apr", "13"]

                        return (
                            <g key={i}>
                                {/* Scanned bar */}
                                <rect
                                    x={xBase}
                                    y={baselineY - Math.max(scH, hasRun ? 1.5 : 0)}
                                    width={BAR_W}
                                    height={Math.max(scH, hasRun ? 1.5 : 0)}
                                    fill="var(--accent-primary)"
                                    opacity="0.55"
                                    rx="1"
                                >
                                    <title>{`${label}: ${data.scanned[i].toLocaleString()} files scanned`}</title>
                                </rect>

                                {/* Duplicates bar */}
                                <rect
                                    x={xBase + BAR_W + 2}
                                    y={baselineY - Math.max(dupH, hasRun ? 1.5 : 0)}
                                    width={BAR_W}
                                    height={Math.max(dupH, hasRun ? 1.5 : 0)}
                                    fill="#ff4444"
                                    opacity="0.75"
                                    rx="1"
                                >
                                    <title>{`${label}: ${data.duplicates[i].toLocaleString()} duplicates found`}</title>
                                </rect>

                                {/* Run indicator dot */}
                                {hasRun && (
                                    <circle
                                        cx={xBase + BAR_W + 1}
                                        cy={baselineY - CHART_H - 4}
                                        r="2"
                                        fill="var(--accent-primary)"
                                        opacity="0.8"
                                    >
                                        <title>{`${label}: ${data.runs[i]} dedupe run(s)`}</title>
                                    </circle>
                                )}

                                {/* X axis label */}
                                {showLabel && (
                                    <>
                                        <text
                                            x={xBase + BAR_W + 1}
                                            y={baselineY + 12}
                                            textAnchor="middle"
                                            fontSize="8"
                                            fill={isToday ? "var(--accent-primary)" : "var(--text-muted)"}
                                        >
                                            {labelParts[0]}
                                        </text>
                                        <text
                                            x={xBase + BAR_W + 1}
                                            y={baselineY + 21}
                                            textAnchor="middle"
                                            fontSize="8"
                                            fill={isToday ? "var(--accent-primary)" : "var(--text-muted)"}
                                        >
                                            {labelParts[1]}
                                        </text>
                                    </>
                                )}
                            </g>
                        );
                    })}

                    {/* Baseline */}
                    <line
                        x1={PAD.left} y1={baselineY}
                        x2={svgW - PAD.right} y2={baselineY}
                        stroke="var(--border-dim)" strokeWidth="1"
                    />
                </svg>
            </div>

            {/* Legend + empty-state hint */}
            <div className="flex items-center gap-4 mt-1 text-xs font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-2 rounded-sm" style={{ background: 'var(--accent-primary)', opacity: 0.55 }}></span>
                    Files Scanned
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-2 rounded-sm" style={{ background: '#ff4444', opacity: 0.75 }}></span>
                    Duplicates Found
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)', opacity: 0.8 }}></span>
                    Run Marker
                </span>
                {!hasAnyData && (
                    <span className="ml-auto opacity-50">No runs in last 14 days</span>
                )}
            </div>
        </div>
    );
}
