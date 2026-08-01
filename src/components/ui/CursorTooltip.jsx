"use client";

import React from "react";
import useMousePosition from "@/hooks/useMousePosition";

export default function CursorTooltip({ label, visible }) {
  const { x, y } = useMousePosition();

  if (!visible || !label) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 bg-[#000000] text-[#ffffff] text-[12px] px-3 py-1 rounded-full font-mono -translate-x-1/2 -translate-y-8 shadow-sm transition-opacity duration-150"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {label}
    </div>
  );
}
