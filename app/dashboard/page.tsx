import StatCard from "@/components/dashboard/StatCard";
import ActivityGraph from "@/components/dashboard/ActivityGraph";
import { DataLibrarian } from "@/types/config";
import fs from "fs";
import path from "path";

/* 
    TODO: Total Size Calculation Performance Optimization
    
    Warning: The current implementation performs a synchronous recursive scan of the entire 
    library directory on every dashboard render. This is acceptable for small test libraries 
    but will likely cause significant performance issues (slow page loads, timeout errors) 
    with large datasets (TB+ size, 100k+ files).

    Future Improvements:
    1. Offline Calculation: Move this logic to a background worker or cron job that runs 
       periodically (e.g., nightly or on system triggers).
    2. Caching: Store the calculated total size and file count in a persistent store 
       (database, Redis, or even a local JSON file) and read from there.
    3. Event-Driven Updates: Recalculate only when the 'library refresh' API is called 
       or when file system changes are detected.
    4. First-Run Logic: Perform initial scan only on first application startup or 
       config change.
*/

function getLibraryStats(dirPath: string): { size: number; count: number } {
    let totalSize = 0;
    let fileCount = 0;

    if (!fs.existsSync(dirPath)) return { size: 0, count: 0 };

    try {
        const items = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(dirPath, item.name);
            if (item.isDirectory()) {
                const subStats = getLibraryStats(fullPath);
                totalSize += subStats.size;
                fileCount += subStats.count;
            } else {
                try {
                    const stats = fs.statSync(fullPath);
                    totalSize += stats.size;
                    fileCount++;
                } catch (e) {
                    // Ignore file access errors during scan
                }
            }
        }
    } catch (e) {
        console.error("Error calculating library stats:", e);
    }

    return { size: totalSize, count: fileCount };
}

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function Dashboard() {
    // Determine stats live (See TODO above)
    const rootPath = DataLibrarian.Config.DEFAULT_TARGET_FOLDER || "";
    const stats = getLibraryStats(rootPath);

    return (
        <div className="space-y-4">
            {/* About panel */}
            <div className="bg-[var(--bg-input)] border border-[var(--border-dim)] rounded-sm p-4 space-y-2">
                <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-2">About this view</p>
                <ul className="space-y-1 text-xs font-mono text-[var(--text-muted)]">
                    <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Live overview of your library based on the <span className="text-[var(--text-main)]">Default Target Folder</span> set in Configuration</li>
                    <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Total Size and file count are calculated on every page load — may be slow on very large libraries</li>
                    <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>System Activity chart tracks deDupe scan history from log files in <span className="text-[var(--text-main)]">_DuplicateHoldingBin/</span></li>
                    <li><i className="fa-solid fa-circle-dot text-[var(--accent-primary)] mr-2 text-[8px]"></i>Processing status reflects backend state — <span className="text-[var(--text-main)]">IDLE</span> means no module is currently running</li>
                </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Size"
                    value={formatBytes(stats.size)}
                    subtext={`${stats.count.toLocaleString()} files indexed`}
                    icon="fa-solid fa-database"
                />
                <StatCard
                    label="deDupe"
                    value="0"
                    subtext="Files flagged"
                    icon="fa-solid fa-trash-can"
                    accentColor="text-error"                    
                />
                <StatCard
                    label="Efficiency"
                    value="94%"
                    subtext="Space saved (Est.)"
                    icon="fa-solid fa-bolt"
                    accentColor="text-warning"
                />
                <StatCard
                    label="Processing"
                    value="IDLE"
                    subtext="System ready"
                    icon="fa-solid fa-microchip"
                    accentColor="text-info"
                />
            </div>

            <div className="border border-[var(--border-dim)] bg-[var(--bg-card)] p-4 rounded-sm">
                <h3 className="font-heading text-lg text-secondary mb-4 border-b border-[var(--border-dim)] pb-2 flex items-center">
                    <i className="fa-solid fa-chart-line mr-2 text-[var(--accent-primary)]"></i>
                    System Activity
                </h3>
                <ActivityGraph />
            </div>
        </div>
    );
}
