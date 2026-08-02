"use client";

import React, { useState, useRef } from "react";
import { studioData } from "@/data/studio";

export default function ExpandableStudioCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'grid' | 'compact'
  const scrollRef = useRef(null);

  const activeMedia = studioData.showcase[activeSlideIndex] || studioData.showcase[0];

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShopRedirect = () => {
    window.open("https://twomuch.studio", "_blank");
  };

  return (
    <div className="fixed inset-x-2 top-1/2 -translate-y-1/2 z-40 flex justify-center pointer-events-none">
      <div
        className={`bg-[#ffffff] text-[#000000] border border-[#000000] shadow-2xl transition-all duration-150 ease-in-out pointer-events-auto flex flex-col ${
          isExpanded
            ? "w-full max-w-md h-[88vh] rounded-none"
            : "w-auto h-[50px] rounded-full"
        }`}
      >
        {/* Sticky Top Bar */}
        <div className="flex items-center justify-between p-1 bg-[#ffffff] border-b border-[#000000] shrink-0 gap-1.5">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-black text-sm uppercase tracking-tighter px-2 py-1 cursor-pointer select-none"
          >
            {studioData.name}
          </button>

          {/* Online Counter Mascot Badge */}
          <div className="flex items-center gap-1 bg-[#4a2e18] text-[#ffffff] px-2.5 py-1 rounded-full text-[11px] font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#ffffff]" />
            <span>1</span>
            <span className="w-2 h-2 rounded-full bg-[#ffffff]" />
          </div>

          {/* Voltage Lime Menu Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#e2ff70] hover:brightness-95 text-[#000000] text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1 cursor-pointer border border-[#000000]"
          >
            <span>Menu</span>
            <span className="text-[10px]">●</span>
          </button>
        </div>

        {/* Scrollable Main Body */}
        {isExpanded && (
          <div
            ref={scrollRef}
            className="overflow-y-auto custom-scrollbar flex-1 text-xs font-sans bg-[#ffffff]"
          >
            {/* Bio Header — Tight Spacing */}
            <div className="p-3 space-y-1.5">
              <p className="text-sm font-extrabold leading-snug tracking-tight">
                {studioData.shortBio}
              </p>

              <button
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="text-xs font-bold text-[#000000]/60 underline cursor-pointer hover:text-[#000000] block"
              >
                {showMoreInfo ? "Less info" : "More info"}
              </button>
            </div>

            {/* Collapsible Info (Clients, About, Awards) */}
            {showMoreInfo && (
              <div className="p-3 space-y-3 border-t border-[#000000] bg-[#f4f4f4] text-xs">
                <div>
                  <h4 className="font-black uppercase text-[10px] mb-1 tracking-wider text-[#000000]/70">
                    Clients
                  </h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-bold leading-tight">
                    {studioData.clients.map((client, idx) => (
                      <span key={idx}>{client}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-black uppercase text-[10px] mb-1 tracking-wider text-[#000000]/70">
                    About
                  </h4>
                  <p className="font-medium leading-normal text-[11px]">
                    {studioData.fullBio}
                  </p>
                </div>

                <div>
                  <h4 className="font-black uppercase text-[10px] mb-1 tracking-wider text-[#000000]/70">
                    Awards
                  </h4>
                  <ul className="font-bold space-y-0.5 text-[11px]">
                    {studioData.awards.map((award, idx) => (
                      <li key={idx}>• {award}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Email & Instagram Buttons */}
            <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
              <a
                href={`mailto:${studioData.email}`}
                className="bg-[#ffffff] hover:bg-[#f4f4f4] text-center py-2 font-extrabold text-xs border border-[#000000] transition-colors"
              >
                Email
              </a>
              <a
                href={studioData.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-[#ffffff] hover:bg-[#f4f4f4] text-center py-2 font-extrabold text-xs border border-[#000000] transition-colors"
              >
                Instagram
              </a>
            </div>

            {/* Showcase Image Slider */}
            <div className="border-t border-[#000000]">
              <div className="relative aspect-square bg-[#000000]">
                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-2.5 border-t border-[#000000] bg-[#ffffff]">
                <h3 className="font-extrabold text-sm tracking-tight">
                  {activeMedia.title}
                </h3>
              </div>

              {/* Number Buttons Bar */}
              <div className="flex border-t border-[#000000] overflow-x-auto">
                {studioData.showcase.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-black border-r last:border-r-0 border-[#000000] cursor-pointer shrink-0 transition-colors ${
                      activeSlideIndex === idx
                        ? "bg-[#e2ff70] text-[#000000]"
                        : "bg-[#ffffff] hover:bg-[#f4f4f4]"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* SHOP + ONLINE PLANET RADAR MODULE */}
            <div className="grid grid-cols-2 aspect-[2/1] border-t border-[#000000]">
              {/* Shop Module */}
              <div
                onClick={handleShopRedirect}
                className="bg-[#e2ff70] border-r border-[#000000] p-2.5 flex flex-col justify-between cursor-pointer hover:brightness-95 transition-all select-none"
              >
                {/* Clean Vector Trolley Icon */}
                <svg
                  className="w-8 h-8 text-[#000000]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  <circle cx="10" cy="21" r="1" fill="currentColor" />
                  <circle cx="18" cy="21" r="1" fill="currentColor" />
                </svg>
                <span className="font-black text-xs uppercase tracking-tight">
                  Shop
                </span>
              </div>

              {/* Planet Globe Radar */}
              <div className="bg-[#4a2e18] p-2.5 flex flex-col justify-between relative overflow-hidden select-none">
                <div className="flex justify-between items-start text-[#ffffff] font-bold text-[10px] tracking-tight z-10">
                  <span>Online</span>
                </div>

                {/* Animated Sphere Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-[#ffffff]/40 relative flex items-center justify-center animate-spin [animation-duration:12s]">
                    <div className="w-full h-[1px] bg-[#ffffff]/30 absolute top-1/2 -translate-y-1/2" />
                    <div className="h-full w-[1px] bg-[#ffffff]/30 absolute left-1/2 -translate-x-1/2" />
                    <div className="w-2 h-2 bg-[#ff0000] absolute top-1 right-1" />
                  </div>
                </div>

                <div className="text-right text-[#ffffff] font-mono text-[10px] font-bold z-10">
                  1
                </div>
              </div>
            </div>

            {/* PLAY / Interactive Drawing Section */}
            <div className="border-t border-[#000000] bg-[#e5e5e5] p-2.5">
              <div
                onClick={() => window.open("https://twomuch.studio", "_blank")}
                className="bg-[#ffffff] border border-[#000000] p-2.5 cursor-pointer hover:border-[#ff00ea] transition-colors"
              >
                <div className="h-16 border border-dashed border-[#888888] flex items-center justify-center font-mono text-[10px] text-[#555555]">
                  [ Interactive Drawing Pad ]
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono border-t border-[#e5e7eb] pt-2 mt-2">
                  <span className="bg-[#ff00ea] text-[#ffffff] px-2 py-0.5 font-bold uppercase">
                    View all
                  </span>
                  <span className="font-bold">6910 drawings</span>
                </div>
              </div>
            </div>

            {/* WORK INDEX SECTION */}
            <div className="border-t border-[#000000]">
              <div className="p-2.5 bg-[#ffffff] border-b border-[#000000] flex items-center justify-between">
                <h3 className="font-black text-lg tracking-tighter uppercase font-mono">
                  WORK
                </h3>
                <span className="text-sm font-bold">↓</span>
              </div>

              {/* DYNAMIC VIEW MODES: Single List (≡), Grid (::), Compact (=) */}
              {viewMode === "list" && (
                <div className="divide-y divide-[#000000]">
                  {studioData.projects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="flex items-center justify-between p-2.5 bg-[#ffffff] hover:bg-[#e2ff70] cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 bg-[#000000] text-[#ffffff] font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                          {proj.id}
                        </div>
                        <span className="font-extrabold text-xs tracking-tight text-[#000000]">
                          {proj.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#000000]/60 font-semibold">
                        {proj.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === "grid" && (
                <div className="grid grid-cols-2 gap-px bg-[#000000]">
                  {studioData.projects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="p-3 bg-[#ffffff] hover:bg-[#e2ff70] cursor-pointer aspect-square flex flex-col justify-between"
                    >
                      <span className="font-mono text-[10px] font-bold">
                        #{proj.id}
                      </span>
                      <span className="font-extrabold text-xs tracking-tight">
                        {proj.title}
                      </span>
                      <span className="text-[9px] font-mono opacity-60">
                        {proj.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === "compact" && (
                <div className="divide-y divide-[#e5e7eb] text-[11px] font-mono">
                  {studioData.projects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="px-2.5 py-1.5 flex justify-between hover:bg-[#e2ff70] cursor-pointer"
                    >
                      <span className="font-bold">{proj.title}</span>
                      <span className="opacity-60">{proj.year}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* STICKY FOOTER WITH FUNCTIONAL VIEW TOGGLES */}
            <div className="sticky bottom-0 bg-[#ffffff] border-t border-[#000000] p-1.5 flex items-center justify-between text-xs font-bold z-10">
              <button
                onClick={scrollToTop}
                className="hover:underline cursor-pointer font-bold px-1"
              >
                Back to top
              </button>

              {/* Connected View Switchers */}
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode("list")}
                  title="Single Column List"
                  className={`border border-[#000000] px-2 py-0.5 font-mono text-xs cursor-pointer ${
                    viewMode === "list" ? "bg-[#e2ff70]" : "bg-[#ffffff]"
                  }`}
                >
                  ≡
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  title="2x2 Grid View"
                  className={`border border-[#000000] px-2 py-0.5 font-mono text-xs cursor-pointer ${
                    viewMode === "grid" ? "bg-[#e2ff70]" : "bg-[#ffffff]"
                  }`}
                >
                  ::
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  title="Compact Minimal View"
                  className={`border border-[#000000] px-2 py-0.5 font-mono text-xs cursor-pointer ${
                    viewMode === "compact" ? "bg-[#e2ff70]" : "bg-[#ffffff]"
                  }`}
                >
                  =
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Project Overlay Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-3 pointer-events-auto">
          <div className="bg-[#ffffff] border-2 border-[#000000] w-full max-w-sm p-4 space-y-3 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-[#000000] pb-2">
              <h2 className="text-base font-black uppercase tracking-tight">
                {selectedProject.title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-[#000000] text-[#ffffff] px-2 py-0.5 font-bold text-xs uppercase cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-[#000000] flex items-center justify-center text-[#ffffff] font-mono text-[11px]">
              [ {selectedProject.title} Preview ]
            </div>

            <p className="text-xs font-semibold leading-relaxed">
              Category: <span className="font-mono">{selectedProject.category}</span>
            </p>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full bg-[#e2ff70] text-[#000000] border border-[#000000] py-1.5 font-black text-xs uppercase cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
