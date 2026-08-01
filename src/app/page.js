"use client";

import React from "react";
import Scene from "@/components/canvas/Scene";
import ExpandableStudioCard from "@/components/ui/ExpandableStudioCard";
import { studioData } from "@/data/studio";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-[#f5f5f5] relative overflow-hidden select-none">
      
      {/* Background Watermark Logo (Flashing/Static as seen in Screenshot 1) */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[12vw] font-black tracking-tighter uppercase text-[#000000]/[0.04] whitespace-nowrap select-none">
          {studioData.name}
        </h1>
      </div>

      {/* Interactive 3D Canvas */}
      <Scene />

      {/* Central Expandable Pill / Studio Card */}
      <ExpandableStudioCard />

    </main>
  );
}
