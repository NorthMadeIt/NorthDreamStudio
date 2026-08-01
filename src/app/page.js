"use client";

import React, { useState } from "react";
import DynamicScene from "@/components/canvas/Scene";
import CentralNav from "@/components/ui/CentralNav";
import MenuOverlay from "@/components/ui/MenuOverlay";
import ProjectIndex from "@/components/sections/ProjectIndex";
import { studioData } from "@/data/studio";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#e5e7eb] text-[#000000] relative pb-28 pt-12 overflow-hidden">
      {/* Interactive 3D Canvas Background */}
      <DynamicScene />

      {/* Foreground UI Layer */}
      <div className="relative z-10 pointer-events-none">
        <section className="px-6 max-w-5xl mx-auto mb-16 pointer-events-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tighter uppercase mb-3">
            {studioData.name}
          </h1>
          <p className="text-base sm:text-lg max-w-xl text-[#000000] opacity-80 leading-snug">
            {studioData.bio}
          </p>
        </section>

        <div className="pointer-events-auto">
          <ProjectIndex />
        </div>
      </div>

      {/* Fullscreen Inverse Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Persistent Center Floating Nav */}
      <CentralNav
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
    </main>
  );
}
