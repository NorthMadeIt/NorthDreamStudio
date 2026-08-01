"use client";

import React, { useState } from "react";
import { studioData } from "@/data/studio";

export default function ExpandableStudioCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const activeMedia = studioData.showcase[activeSlideIndex];

  return (
    <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-40 flex justify-center pointer-events-none">
      <div
        className={`bg-[#ffffff] text-[#000000] border border-[#e5e7eb] rounded-2xl shadow-2xl transition-all duration-300 ease-in-out pointer-events-auto overflow-hidden flex flex-col ${
          isExpanded
            ? "w-full max-w-md max-h-[85vh]"
            : "w-auto max-h-[52px]"
        }`}
      >
        {/* Sticky Header Pill Bar */}
        <div className="flex items-center justify-between p-2 bg-[#ffffff] border-b border-[#e5e7eb] shrink-0 gap-3">
          {/* Brand Name */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-bold text-sm uppercase tracking-tight px-3 py-1 cursor-pointer"
          >
            {studioData.name}
          </button>

          {/* Status Counter Badge */}
          <div className="flex items-center gap-1.5 bg-[#4a2e18] text-[#ffffff] px-3 py-1 rounded-full text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#e2ff70]" />
            <span>1</span>
            <span className="w-2 h-2 rounded-full bg-[#e2ff70]" />
          </div>

          {/* Voltage Lime Menu Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#e2ff70] hover:brightness-95 text-[#000000] text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Menu</span>
            <span className="text-[10px]">{isExpanded ? "●" : "⋮"}</span>
          </button>
        </div>

        {/* Scrollable Content Body (Visible when expanded) */}
        {isExpanded && (
          <div className="overflow-y-auto p-4 space-y-6 text-xs font-sans">
            
            {/* Short Bio */}
            <div>
              <p className="text-sm font-semibold leading-snug">
                {studioData.shortBio}
              </p>

              {/* Collapsible Info Button */}
              <button
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="mt-2 text-xs text-[#000000]/60 underline cursor-pointer hover:text-[#000000]"
              >
                {showMoreInfo ? "Less info" : "More info"}
              </button>
            </div>

            {/* Collapsible Details: Clients, About, Awards */}
            {showMoreInfo && (
              <div className="space-y-4 pt-2 border-t border-[#e5e7eb] animate-in fade-in duration-150">
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[10px] text-[#000000]/50 mb-1">
                    Clients
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1 font-medium">
                    {studioData.clients.map((client, idx) => (
                      <span key={idx}>{client}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[10px] text-[#000000]/50 mb-1">
                    About
                  </h4>
                  <p className="text-[#000000]/80 leading-relaxed">
                    {studioData.fullBio}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[10px] text-[#000000]/50 mb-1">
                    Awards
                  </h4>
                  <ul className="space-y-0.5 font-medium">
                    {studioData.awards.map((award, idx) => (
                      <li key={idx}>• {award}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Email & Instagram Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`mailto:${studioData.email}`}
                className="bg-[#f4f4f4] hover:bg-[#e5e7eb] text-center py-2.5 rounded-lg font-bold border border-[#e5e7eb] transition-colors"
              >
                Email
              </a>
              <a
                href={studioData.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-[#f4f4f4] hover:bg-[#e5e7eb] text-center py-2.5 rounded-lg font-bold border border-[#e5e7eb] transition-colors"
              >
                Instagram
              </a>
            </div>

            {/* Project Media Viewer / Gallery Carousel */}
            <div className="space-y-2 border-t border-[#e5e7eb] pt-4">
              <div className="relative aspect-square bg-[#000000] rounded-lg overflow-hidden flex items-center justify-center">
                {activeMedia.type === "image" ? (
                  <img
                    src={activeMedia.src}
                    alt={activeMedia.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={activeMedia.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Title & Pagination Selector Bar */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-tight">
                  {activeMedia.title}
                </h3>
              </div>

              {/* Media Number Tabs (1, 2, 3...) */}
              <div className="flex gap-1 overflow-x-auto pt-1">
                {studioData.showcase.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                      activeSlideIndex === idx
                        ? "bg-[#e2ff70] text-[#000000]"
                        : "bg-[#f4f4f4] hover:bg-[#e5e7eb]"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Play Widget Block */}
            <div className="border border-[#e5e7eb] rounded-lg p-3 bg-[#f9f9f9] text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#000000]/50 block mb-1">
                // Interactive Module
              </span>
              <div className="h-20 bg-[#ffffff] border border-dashed border-[#ccc] rounded flex items-center justify-center text-[#000000]/40 font-mono text-[11px]">
                [ Canvas Play Area ]
              </div>
            </div>

            {/* WORK Archive Index List */}
            <div className="border-t border-[#e5e7eb] pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-lg tracking-tighter uppercase font-mono">
                  WORK
                </h3>
                <span className="text-xs">↓</span>
              </div>

              <div className="divide-y divide-[#e5e7eb]">
                {studioData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="py-3 flex items-center justify-between hover:px-2 transition-all cursor-pointer group"
                  >
                    <span className="font-bold text-sm group-hover:translate-x-1 transition-transform">
                      {proj.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#000000]/50">
                      {proj.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-4 border-t border-[#e5e7eb] flex justify-between items-center text-[10px] font-mono text-[#000000]/50">
              <button
                onClick={() => {
                  const el = document.querySelector(".overflow-y-auto");
                  if (el) el.scrollTop = 0;
                }}
                className="hover:underline cursor-pointer"
              >
                Back to top
              </button>
              <span>© 2026 {studioData.name}</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
