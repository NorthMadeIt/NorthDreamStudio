"use client";

import React, { useEffect } from "react";
import { studioData } from "@/data/studio";

export default function MenuOverlay({ isOpen, onClose }) {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-[#000000] text-[#ffffff] flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-200">
      {/* Top Header inside Overlay */}
      <div className="flex justify-between items-center pb-6 border-b border-[#e5e7eb]/20">
        <span className="text-xs font-mono tracking-wider opacity-60 uppercase">
          {studioData.name} — Directory
        </span>
        
        {/* ESC Hint Badge */}
        <span className="text-[10px] font-mono opacity-40 uppercase hidden sm:inline-block">
          Press [ESC] to exit
        </span>
      </div>

      {/* Main Navigation Links */}
      <div className="my-auto py-8">
        <nav className="flex flex-col gap-6 text-3xl sm:text-6xl font-black uppercase tracking-tighter">
          <a
            href="#work"
            onClick={onClose}
            className="group flex items-center gap-4 text-[#ffffff] hover:text-[#e2ff70] transition-colors duration-150 w-fit"
          >
            <span className="text-xs font-mono text-[#ffffff]/40 group-hover:text-[#e2ff70]">
              [01]
            </span>
            <span>Selected Work</span>
          </a>

          <a
            href="#about"
            onClick={onClose}
            className="group flex items-center gap-4 text-[#ffffff] hover:text-[#e2ff70] transition-colors duration-150 w-fit"
          >
            <span className="text-xs font-mono text-[#ffffff]/40 group-hover:text-[#e2ff70]">
              [02]
            </span>
            <span>Studio Bio</span>
          </a>

          <a
            href="#contact"
            onClick={onClose}
            className="group flex items-center gap-4 text-[#ffffff] hover:text-[#e2ff70] transition-colors duration-150 w-fit"
          >
            <span className="text-xs font-mono text-[#ffffff]/40 group-hover:text-[#e2ff70]">
              [03]
            </span>
            <span>Direct Inquiries</span>
          </a>
        </nav>
      </div>

      {/* Footer Info inside Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#e5e7eb]/20 text-xs">
        <div>
          <p className="font-mono text-[#ffffff]/40 mb-1">Email Inquiry</p>
          <a
            href={`mailto:${studioData.email}`}
            className="hover:text-[#e2ff70] transition-colors underline underline-offset-4"
          >
            {studioData.email}
          </a>
        </div>

        <div>
          <p className="font-mono text-[#ffffff]/40 mb-1">Social Platforms</p>
          <div className="flex gap-4">
            <a
              href={`https://instagram.com/${studioData.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#e2ff70] transition-colors underline underline-offset-4"
            >
              Instagram
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#e2ff70] transition-colors underline underline-offset-4"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
