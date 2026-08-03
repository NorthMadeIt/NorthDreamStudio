"use client";

import { useState } from "react";
import Scene from "@/components/canvas/Scene";
import CentralNav from "@/components/ui/CentralNav";
import MenuOverlay from "@/components/ui/MenuOverlay";
import ProjectIndex from "@/components/sections/ProjectIndex";
import StudioFooter from "@/components/sections/StudioFooter";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#e5e7eb]">
      {/* Hero: full-viewport touch-reactive 3D field */}
      <section className="relative h-screen w-full overflow-hidden">
        <Scene />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pointer-events-none">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#000000]">
            NorthDreamStudio
          </h1>
          <p className="mt-3 max-w-sm text-sm text-[#000000]/60">
            A creative technology studio building hyper-realistic virtual
            identities and interactive digital ecosystems.
          </p>
        </div>
      </section>

      {/* Content flow below the hero */}
      <div className="relative z-10 bg-[#e5e7eb]">
        <ProjectIndex />
        <StudioFooter />
      </div>

      {/* Persistent shell */}
      <CentralNav
        toggleMenu={() => setIsMenuOpen((open) => !open)}
        isMenuOpen={isMenuOpen}
      />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}
