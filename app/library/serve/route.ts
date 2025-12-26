import { DataLibrarian } from "@/types/config";
import fs from "fs";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// We need to parse the config file manually here because we are in an API route
// and we want to ensure we're getting fresh data if possible, though importing from types/config
// is fine if it's consistent.
// However, reusing the logic from page.tsx is better for consistency.

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filePathParam = searchParams.get("path");

    if (!filePathParam) {
        return NextResponse.json({ error: "Path parameter is required" }, { status: 400 });
    }

    try {
        const rootPath = DataLibrarian.Config.server.root_path;

        // Sanitize and resolve the path
        // Join root path with the requested relative path
        const safeRoot = path.resolve(rootPath);
        const requestedPath = path.resolve(safeRoot, filePathParam.replace(/^\/+/, '')); // Remove leading slashes

        // Security check: ensure the resolved path starts with the root path
        if (!requestedPath.startsWith(safeRoot)) {
            return NextResponse.json({ error: "Access denied: Invalid path" }, { status: 403 });
        }

        if (!fs.existsSync(requestedPath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const stat = fs.statSync(requestedPath);
        if (stat.isDirectory()) {
            return NextResponse.json({ error: "Cannot serve a directory" }, { status: 400 });
        }

        // Determine MIME tyep
        const mimeType = mime.getType(requestedPath) || "application/octet-stream";

        // Read file stream
        // For larger files, streams are better. 
        // nodejs fs.createReadStream is compatible with Web Streams via some bridging or using `streamFile` helper from next (not always available directly in app router same way)
        // But for standard Next.js App Router we can return a BodyInit.

        const fileBuffer = fs.readFileSync(requestedPath);

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": mimeType,
                "Content-Length": stat.size.toString(),
                "Content-Disposition": `inline; filename="${path.basename(requestedPath)}"`,
            },
        });

    } catch (error) {
        console.error("Error serving file:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
