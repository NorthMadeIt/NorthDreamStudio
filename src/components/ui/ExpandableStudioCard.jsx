"use client";

import React, { useState, useRef } from "react";
import { studioData } from "@/data/studio";
import PlanetGlobe from "./PlanetGlobe";

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

  return (
    <div className="fixed inset-x-2 top-1/2 -translate-y-1/2 z-40 flex justify-center pointer-events-none">
      <div
        className={`bg-[#ffffff] text-[#000000] border border-[#000000] shadow-2xl transition-all duration-200 ease-in-out pointer-events-auto flex flex-col ${
          isExpanded
            ? "w-full max-w-md h-[85vh] rounded-none"
            : "w-auto h-[52px] rounded-full"
        }`}
      >
        {/* Sticky Top Header Bar */}
        <div className="flex items-center justify-between p-1.5 bg-[#ffffff] border-b border-[#000000] shrink-0 gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-extrabold text-sm sm:text-base uppercase tracking-tighter px-2 py-1 cursor-pointer"
          >
            {studioData.name}
          </button>

          {/* Online Counter Mascot Badge */}
          <div className="flex items-center gap-1.5 bg-[#4a2e18] text-[#ffffff] px-2.5 py-1 rounded-full text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#ffffff]" />
            <span>1</span>
            <span className="w-2 h-2 rounded-full bg-[#ffffff]" />
          </div>

          {/* Voltage Lime Menu Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#e2ff70] hover:brightness-95 text-[#000000] text-xs sm:text-sm font-black px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer border border-[#000000]"
          >
            <span>Menu</span>
            <span className="text-xs">●</span>
          </button>
        </div>

        {/* Scrollable Content Container */}
        {isExpanded && (
          <div
            ref={scrollRef}
            className="overflow-y-auto custom-scrollbar flex-1 text-xs font-sans bg-[#ffffff]"
          >
            {/* Bio Section */}
            <div className="p-4 space-y-2">
              <p className="text-sm font-extrabold leading-tight tracking-tight">
                {studioData.shortBio}
              </p>

              <button
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="text-xs font-semibold text-[#000000]/60 underline cursor-pointer hover:text-[#000000]"
              >
                {showMoreInfo ? "Less info" : "More info"}
              </button>
            </div>

            {/* Collapsible Info (Clients, About, Awards) */}
            {showMoreInfo && (
              <div className="p-4 space-y-4 border-t border-[#000000] bg-[#f4f4f4]">
                <div>
                  <h4 className="font-black uppercase text-[11px] mb-2 tracking-wide">
                    Clients
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1 text-xs font-bold">
                    {studioData.clients.map((client, idx) => (
                      <span key={idx}>{client}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-black uppercase text-[11px] mb-1 tracking-wide">
                    About
                  </h4>
                  <p className="text-xs font-medium leading-relaxed">
                    {studioData.fullBio}
                  </p>
                </div>

                <div>
                  <h4 className="font-black uppercase text-[11px] mb-1 tracking-wide">
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
                className="bg-[#ffffff] hover:bg-[#f4f4f4] text-center py-2.5 font-extrabold text-xs border border-[#000000] transition-colors"
              >
                Email
              </a>
              <a
                href={studioData.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-[#ffffff] hover:bg-[#f4f4f4] text-center py-2.5 font-extrabold text-xs border border-[#000000] transition-colors"
              >
                Instagram
              </a>
            </div>

            {/* Project Showcase Gallery Carousel */}
            <div className="border-t border-[#000000]">
              <div className="relative aspect-square bg-[#000000]">
                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 border-t border-[#000000] bg-[#ffffff]">
                <h3 className="font-extrabold text-base tracking-tight">
                  {activeMedia.title}
                </h3>
              </div>

              {/* Number Selection Bar (1 2 3 4 5 6 7 8 More) */}
              <div className="flex border-t border-[#000000] overflow-x-auto">
                {studioData.showcase.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`px-3 py-2 text-xs font-black border-r last:border-r-0 border-[#000000] cursor-pointer transition-colors shrink-0 ${
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

            {/* Modular Grid: SHOP + PLANET GLOBE */}
            <div className="grid grid-cols-2 aspect-[2/1] border-t border-[#000000]">
              {/* Shop Module */}
              <div className="bg-[#e2ff70] border-r border-[#000000] p-3 flex flex-col justify-between cursor-pointer hover:brightness-95 transition-all">
                <div className="w-10 h-8 border-2 border-[#000000] relative flex items-center justify-center">
                  {/* Shopping Cart Icon Grid */}
                  <div className="w-6 h-4 border-b-2 border-l-2 border-[#000000]" />
                  <div className="absolute -bottom-1 left-1 w-1.5 h-1.5 bg-[#000000] rounded-full" />
                  <div className="absolute -bottom-1 right-1 w-1.5 h-1.5 bg-[#000000] rounded-full" />
                </div>
                <span className="font-extrabold text-sm uppercase tracking-tight">
                  Shop
                </span>
              </div>

              {/* 3D Planet Module */}
              <div className="h-full w-full">
                <PlanetGlobe />
              </div>
            </div>

            {/* Interactive Drawing Pad Banner */}
            <div className="border-t border-[#000000] bg-[#e5e5e5] p-3">
              <div className="bg-[#ffffff] border border-[#000000] p-3 text-center space-y-2">
                <div className="h-16 border border-dashed border-[#888888] flex items-center justify-center font-mono text-[10px] text-[#555555]">
                  [ Interactive Canvas Workspace ]
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono border-t border-[#e5e7eb] pt-2">
                  <span className="bg-[#ff00ea] text-[#ffffff] px-2 py-0.5 font-bold">
                    View all
                  </span>
                  <span className="font-bold">6910 drawings</span>
                </div>
              </div>
            </div>

            {/* WORK Archive Section */}
            <div className="border-t border-[#000000]">
              <div className="p-3 bg-[#ffffff] border-b border-[#000000] flex items-center justify-between">
                <h3 className="font-black text-xl tracking-tighter uppercase font-mono">
                  WORK
                </h3>
                <span className="text-base font-bold">↓</span>
              </div>

              {/* Interactive Project List Items */}
              <div className="divide-y divide-[#000000]">
                {studioData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="flex items-center justify-between p-3 bg-[#ffffff] hover:bg-[#e2ff70] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#000000] text-[#ffffff] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {proj.id}
                      </div>
                      <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#000000]">
                        {proj.title}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-[#000000]/60 font-semibold">
                      {proj.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Bottom Controls */}
            <div className="sticky bottom-0 bg-[#ffffff] border-t border-[#000000] p-2 flex items-center justify-between text-xs font-bold z-10">
              <button
                onClick={scrollToTop}
                className="hover:underline cursor-pointer font-bold"
              >
                Back to top
              </button>

              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`border border-[#000000] px-2 py-1 font-mono text-xs cursor-pointer ${
                    viewMode === "list" ? "bg-[#e2ff70]" : "bg-[#ffffff]"
                  }`}
                >
                  ≡
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`border border-[#000000] px-2 py-1 font-mono text-xs cursor-pointer ${
                    viewMode === "grid" ? "bg-[#e2ff70]" : "bg-[#ffffff]"
                  }`}
                >
                  ::
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`border border-[#000000] px-2 py-1 font-mono text-xs cursor-pointer ${
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

      {/* Project Detail Modal View (Appears when clicking a project in WORK list) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border-2 border-[#000000] w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-[#000000] pb-3">
              <div>
                <span className="font-mono text-xs text-[#000000]/50 block">
                  Project {selectedProject.id}
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-[#000000] text-[#ffffff] hover:bg-[#e2ff70] hover:text-[#000000] px-3 py-1 font-bold text-xs uppercase cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="aspect-video bg-[#000000] flex items-center justify-center text-[#ffffff] font-mono text-xs">
                [ {selectedProject.title} Project Media Showcase ]
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                Category: <span className="font-mono">{selectedProject.category}</span>
              </p>
              <p className="text-xs text-[#000000]/80">
                Created in {selectedProject.year}. Detailed case study breakdown and custom asset sheet for {selectedProject.title}.
              </p>
            </div>

            <div className="pt-3 border-t border-[#000000] flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-[#e2ff70] text-[#000000] border border-[#000000] px-4 py-2 font-black text-xs uppercase cursor-pointer"
              >
                Back to Index
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                                            }
