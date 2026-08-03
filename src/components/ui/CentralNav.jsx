"use client";

import React from "react";
import { studioData } from "@/data/studio";

function FaceDot() {
  return (
    <span className="relative w-4 h-4 rounded-full bg-[#ffffff] shrink-0 inline-flex items-center justify-center gap-[2px]">
      <span className="w-[3px] h-[3px] rounded-full bg-[#000000]" />
      <span className="w-[3px] h-[3px] rounded-full bg-[#000000]" />
    </span>
  );
}

export default function CentralNav({ toggleMenu, isMenuOpen, onlineCount = 1 }) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 text-sm text-[#000000] font-medium">
      {/* Studio Wordmark */}
      <span className="bg-[#f4f4f4] border border-[#e5e7eb] px-4 py-2 rounded-full font-black tracking-tighter uppercase text-xs sm:text-sm shadow-sm">
        {studioData.name}
      </span>

      {/* Live presence counter — static until real presence wiring exists */}
      <span className="bg-[#000000] text-[#ffffff] px-3 py-2 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm">
        <FaceDot />
        <span>{onlineCount}</span>
        <FaceDot />
      </span>

      {/* Menu Action Pill */}
      <button
        onClick={toggleMenu}
        className="bg-[#e2ff70] hover:opacity-90 text-[#000000] px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm"
      >
        <span>{isMenuOpen ? "Close" : "Menu"}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#000000] inline-block" />
      </button>
    </nav>
  );
} 