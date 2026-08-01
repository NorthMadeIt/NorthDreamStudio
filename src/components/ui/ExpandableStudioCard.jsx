"use client";

import React, { useState, useRef } from "react";
import { studioData } from "@/data/studio";

export default function ExpandableStudioCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const scrollRef = useRef(null);

  const activeMedia = studioData.showcase[activeSlideIndex];

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-x-2 top-1/2 -translate-y-1/2 z-40 flex justify-center pointer-events-none">
      <div
        className={`bg-[#ffffff] text-[#000000] border border-[#000000] shadow-2xl transition-all duration-200 ease-in-out pointer-events-auto flex flex-col ${
          isExpanded
            ? "w-full max-w-md max-h-[85vh] rounded-none" /* SQUARE CORNERS WHEN EXPANDED */
            : "w-auto max-h-[52px] rounded-full"          /* PILL WHEN COLLAPSED */
        }`}
      >
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between p-1.5 bg-[#ffffff] border-b border-[#000000] shrink-0 gap-2">
          {/* Studio Title */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-extrabold text-base uppercase tracking-tighter px-3 py-1 cursor-pointer"
          >
            {studioData.name}
          </button>

          {/* Center Mascot Pill Badge */}
          <div className="flex items-center gap-1.5 bg-[#4a2e18] text-[#ffffff] px-3 py-1 rounded-full text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#ffffff]" />
            <span>1</span>
            <span className="w-2 h-2 rounded-full bg-[#ffffff]" />
          </div>

          {/* Voltage Lime Menu Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#e2ff70] hover:brightness-95 text-[#000000] text-sm font-black px-4 py-1.5 rounded-full flex items-center gap-1 cursor-pointer border border-[#000000]"
          >
            <span>Menu</span>
            <span className="text-xs">●</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        {isExpanded && (
          <div
            ref={scrollRef}
            className="overflow-y-auto custom-scrollbar flex-1 text-xs font-sans bg-[#ffffff]"
          >
            {/* Bio Section */}
            <div className="p-4 space-y-2">
              <p className="text-base font-bold leading-tight tracking-tight">
                {studioData.shortBio}
              </p>

              <button
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="text-xs font-semibold text-[#000000]/60 underline cursor-pointer hover:text-[#000000]"
              >
                {showMoreInfo ? "Less info" : "More info"}
              </button>
            </div>

            {/* Collapsible Info */}
            {showMoreInfo && (
              <div className="p-4 space-y-4 border-t border-[#e5e7eb] bg-[#f9f9f9]">
                <div>
                  <h4 className="font-extrabold uppercase text-[11px] mb-2 tracking-wide">
                    Clients
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1 text-xs font-bold">
                    {studioData.clients.map((client, idx) => (
                      <span key={idx}>{client}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold uppercase text-[11px] mb-1 tracking-wide">
                    About
                  </h4>
                  <p className="text-xs font-medium leading-relaxed">
                    {studioData.fullBio}
                  </p>
                </div>

                <div>
                  <h4 className="font-extrabold uppercase text-[11px] mb-1 tracking-wide">
                    Awards
                  </h4>
                  <ul className="text-xs font-bold space-y-0.5">
                    {studioData.awards.map((award, idx) => (
                      <li key={idx}>• {award}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Email & Instagram Buttons */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
              <a
                href={`mailto:${studioData.email}`}
                className="bg-[#ffffff] hover:bg-[#f4f4f4] text-center py-2.5 font-bold text-xs border border-[#000000] transition-colors"
              >
                Email
              </a>
              <a
                href={studioData.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-[#ffffff] hover:bg-[#f4f4f4] text-center py-2.5 font-bold text-xs border border-[#000000] transition-colors"
              >
                Instagram
              </a>
            </div>

            {/* Media Showcase Slider */}
            <div className="border-t border-[#000000]">
              <div className="relative aspect-square bg-[#000000]">
                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 border-t border-[#000000]">
                <h3 className="font-extrabold text-lg tracking-tight">
                  {activeMedia.title}
                </h3>
              </div>

              {/* Number Buttons (1, 2, 3...) */}
              <div className="flex border-t border-[#000000]">
                {studioData.showcase.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`flex-1 py-2 text-xs font-bold border-r last:border-r-0 border-[#000000] cursor-pointer transition-colors ${
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

            {/* Interactive Drawing/Play Canvas Banner */}
            <div className="border-t border-[#000000] bg-[#f0f0f0] p-4 text-center">
              <div className="h-28 bg-[#ffffff] border border-[#000000] flex flex-col items-center justify-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider">
                  Interactive Module
                </span>
                <span className="text-[10px] font-mono opacity-60">
                  [ Canvas Sandbox ]
                </span>
              </div>
            </div>

            {/* WORK Archive Index Section */}
            <div className="border-t border-[#000000]">
              <div className="p-3 bg-[#ffffff] border-b border-[#000000] flex items-center justify-between">
                <h3 className="font-black text-xl tracking-tighter uppercase">
                  WORK
                </h3>
                <span className="text-base font-bold">↓</span>
              </div>

              {/* Project Row Items */}
              <div className="divide-y divide-[#e5e7eb]">
                {studioData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex items-center justify-between p-3 bg-[#f9f9f9] hover:bg-[#e2ff70] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Square Thumbnail Placeholder */}
                      <div className="w-8 h-8 bg-[#000000] shrink-0 border border-[#000000]" />
                      <span className="font-extrabold text-base tracking-tight text-[#000000]">
                        {proj.title}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-[#000000]/60">
                      {proj.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Bottom Footer Controls */}
            <div className="sticky bottom-0 bg-[#ffffff] border-t border-[#000000] p-2 flex items-center justify-between text-xs font-bold z-10">
              <button
                onClick={scrollToTop}
                className="hover:underline cursor-pointer"
              >
                Back to top
              </button>

              {/* Layout Toggle Buttons */}
              <div className="flex gap-1">
                <button className="bg-[#e2ff70] border border-[#000000] px-2 py-1 font-mono text-xs">
                  ≡
                </button>
                <button className="bg-[#ffffff] hover:bg-[#f4f4f4] border border-[#000000] px-2 py-1 font-mono text-xs">
                  ::
                </button>
                <button className="bg-[#ffffff] hover:bg-[#f4f4f4] border border-[#000000] px-2 py-1 font-mono text-xs">
                  =
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
