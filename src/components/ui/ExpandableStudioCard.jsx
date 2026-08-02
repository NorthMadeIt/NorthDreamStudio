"use client";

import React, { useState } from "react";
import ShopSection from "@/components/ui/ShopSection";

export default function ExpandableStudioCard() {
  const [currentView, setCurrentView] = useState("main"); // 'main' | 'shop'

  return (
    <div className="w-full max-w-md mx-auto bg-[#ffffff] border-2 border-[#000000] rounded-none overflow-hidden font-sans">
      
      {/* CARD NAVIGATION BAR */}
      {currentView === "shop" && (
        <button
          onClick={() => setCurrentView("main")}
          className="w-full bg-[#000000] text-[#ffffff] py-2 font-mono text-xs font-bold uppercase rounded-none flex items-center justify-center gap-2 border-b-2 border-[#000000]"
        >
          <span>←</span> Back to Studio Portfolio
        </button>
      )}

      {/* VIEW SWITCHER */}
      {currentView === "shop" ? (
        <ShopSection />
      ) : (
        /* MAIN STUDIO CARD CONTENT */
        <div className="p-4 space-y-4">
          <div className="border-b-2 border-[#000000] pb-2 flex justify-between items-center font-mono">
            <h2 className="font-black text-lg uppercase tracking-tight">Studio</h2>
            <span className="text-xs bg-[#e2ff70] px-2 py-0.5 border border-[#000000] font-bold rounded-none">
              Active
            </span>
          </div>

          {/* GRID MODULES */}
          <div className="grid grid-cols-2 gap-2 font-mono">
            {/* SHOP TILE */}
            <div
              onClick={() => setCurrentView("shop")}
              className="bg-[#e2ff70] border-2 border-[#000000] p-4 flex flex-col justify-between cursor-pointer hover:brightness-95 active:scale-[0.98] transition-all rounded-none min-h-[110px]"
            >
              <span className="text-2xl">🛒</span>
              <span className="font-black text-xs uppercase tracking-tight">Shop</span>
            </div>

            {/* SHOWCASE TILE */}
            <div className="bg-[#ffffff] border-2 border-[#000000] p-4 flex flex-col justify-between rounded-none min-h-[110px]">
              <span className="text-2xl">⚡</span>
              <span className="font-black text-xs uppercase tracking-tight">Works</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
