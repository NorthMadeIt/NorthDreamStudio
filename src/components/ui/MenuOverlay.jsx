"use client";

import React, { useEffect } from "react";
import { studioData } from "@/data/studio";
import { projects } from "@/data/projects";

const MENU_ITEMS = [
  { label: "Selected Work", href: "/", badge: `${projects.length}`, badgeStyle: "bg-[#e2ff70] text-[#000000]" },
  { label: "Collaborative Canvas", href: "/draw", badge: "LIVE", badgeStyle: "bg-[#ff00b7] text-[#ffffff]" },
  { label: "Play", href: "/play", badge: "NEW", badgeStyle: "bg-[#000000] text-[#ffffff]" },
  { label: "Studio Profile", href: "#about", badge: null },
  { label: "Contact & Inquiries", href: "#contact", badge: null },
];

export default function MenuOverlay({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-x-4 bottom-24 z-40 flex justify-center transition-all duration-200 ${
        isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-sm bg-[#ffffff] border border-[#e5e7eb] rounded shadow-lg overflow-hidden">
        {/* Menu items */}
        <div className="divide-y divide-[#e5e7eb]">
          {MENU_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3.5 hover:bg-[#f4f4f4] transition-colors group"
            >
              <span className="text-sm font-bold text-[#000000] group-hover:text-[#000000]">
                {item.label}
              </span>
              {item.badge && (
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.badgeStyle}`}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Footer info */}
        <div className="border-t border-[#e5e7eb] bg-[#f4f4f4] px-4 py-3 flex items-center justify-between text-xs">
          <a
            href={`mailto:${studioData.email}`}
            className="text-[#000000]/70 hover:text-[#000000] underline underline-offset-2"
          >
            Email
          </a>
          <a
            href={`https://instagram.com/${studioData.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#000000]/70 hover:text-[#000000] underline underline-offset-2"
          >
            Instagram
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#000000]/70 hover:text-[#000000] underline underline-offset-2"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}