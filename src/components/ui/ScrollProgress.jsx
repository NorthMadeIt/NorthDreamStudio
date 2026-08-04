"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Thumb height is a fraction of the track, min 40px so it never disappears
  const thumbHeightPct = 18;
  const topPct = progress * (100 - thumbHeightPct);

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 h-[60vh] w-1.5 rounded-full bg-[#ffffff] shadow-sm pointer-events-none">
      <div
        className="absolute w-full rounded-full bg-[#ff00b7] transition-[top] duration-100"
        style={{ height: `${thumbHeightPct}%`, top: `${topPct}%` }}
      />
    </div>
  );
}
