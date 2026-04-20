"use client";
import { useState } from 'react';

export default function OrganizeLibraryButton() {
    const [status, setStatus] = useState("");

    const handleOrganize = async () => {
        setStatus("Starting organization...");
        
        // Sending the POST request to "The Archives" backend on port 2226
        const response = await fetch("http://localhost:2226/api/action", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "organize" }) 
        });

        const data = await response.json();
        
        // Checking the success state as defined in your architecture docs
        if (data.success) {
            setStatus("Success: " + data.message);
        } else {
            setStatus("Error: Could not start the module.");
        }
    };

    return (
        <div className="flex flex-col items-start gap-3 p-4 bg-[var(--bg-card)] rounded-lg border border-[var(--border-dim)]">
            <h3 className="text-[var(--text-main)] font-semibold">Library Management</h3>
            <p className="text-[var(--text-muted)] text-sm mb-2">
                Scan your library, extract metadata, and automatically sort books into Author folders.
            </p>
            <button 
                onClick={handleOrganize}
                // Using your semantic color variables for a primary action button
                className="bg-primary text-[var(--bg-dark)] px-4 py-2 rounded font-bold hover:brightness-110 transition-all"
            >
                Organize Library
            </button>
            {/* Displaying the status message using the info semantic color */}
            {status && <p className="text-info text-sm mt-2">{status}</p>}
        </div>
    );
}
