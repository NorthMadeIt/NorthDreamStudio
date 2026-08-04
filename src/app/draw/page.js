"use client";

import { useState } from "react";
import DrawCanvas from "@/components/sections/DrawCanvas";
import CentralNav from "@/components/ui/CentralNav";
import MenuOverlay from "@/components/ui/MenuOverlay";

export default function DrawPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#e5e7eb] flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[#000000]">
          Community Canvas
        </h1>
        <p className="mt-2 text-sm text-[#000000]/60 max-w-xs mx-auto">
          Leave a mark. Every drawing joins the collective wall.
        </p>
      </div>

      <DrawCanvas />

      <CentralNav
        toggleMenu={() => setIsMenuOpen((open) => !open)}
        isMenuOpen={isMenuOpen}
      />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}
