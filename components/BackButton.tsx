"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-6 py-3"
        >
            <ArrowLeft className="w-5 h-5" />
            Go Back
        </button>
    );
}
