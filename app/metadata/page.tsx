import { Suspense } from "react";
import MetadataExplorer from "@/components/metadata/MetadataExplorer";

export default function MetadataPage() {
    return (
        <div className="h-full -m-6 overflow-hidden">
            <Suspense fallback={
                <div className="flex items-center justify-center h-full text-[var(--text-muted)] font-mono text-sm">
                    <i className="fa-solid fa-circle-notch fa-spin mr-2 text-[var(--accent-primary)]"></i>
                    Loading...
                </div>
            }>
                <MetadataExplorer />
            </Suspense>
        </div>
    );
}
