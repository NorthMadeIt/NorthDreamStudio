"use client";

import React, { useState } from "react";
import { studioData } from "@/data/studio";

export default function CentralNav({ toggleMenu, isMenuOpen }) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#f4f4f4] border border-[#e5e7eb] px-4 py-2 rounded-full shadow-sm text-sm text-[#000000] font-medium">
      {/* Studio Wordmark */}
      <span className="font-bold tracking-tighter uppercase text-xs sm:text-sm">
        {studioData.name}
      </span>

      {/* Carbon Status Pip */}
      <span className="w-2.5 h-2.5 rounded-full bg-[#000000] inline-block" />

      {/* Menu Action Pill */}
      <button
        onClick={toggleMenu}
        className="bg-[#e2ff70] hover:opacity-90 text-[#000000] px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-1 cursor-pointer"
      >
        <span>{isMenuOpen ? "Close" : "Menu"}</span>
      </button>
    </nav>
  );
}
