"use client";

import React from "react";
import { studioData } from "@/data/studio";

export default function StudioFooter() {
  return (
    <footer className="w-full max-w-5xl mx-auto px-4 mt-20">
      {/* Inverse Surface Block */}
      <div className="bg-[#000000] text-[#ffffff] rounded-xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
        <div>
          <span className="text-xs font-mono text-[#e2ff70] uppercase tracking-wider block mb-2">
            // Open for Collaboration
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tighter uppercase mb-4">
            Got a Vision?
          </h2>
          <p className="text-xs sm:text-sm text-[#ffffff]/70 max-w-md leading-relaxed">
            Building hyper-realistic virtual identities, dynamic web environments, and interactive digital ecosystems.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <a
            href={`mailto:${studioData.email}`}
            className="bg-[#e2ff70] text-[#000000] hover:bg-[#ffffff] text-xs font-bold uppercase tracking-tight px-6 py-3 rounded-full text-center transition-colors duration-150"
          >
            Start a Project
          </a>
        </div>
      </div>

      <div className="flex justify-between items-center py-6 text-[11px] font-mono text-[#000000]/50">
        <span>© 2026 {studioData.name}</span>
        <span>All systems nominal</span>
      </div>
    </footer>
  );
}
