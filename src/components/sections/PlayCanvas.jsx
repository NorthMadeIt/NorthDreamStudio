"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

const PALETTE = ["#000000", "#e2ff70", "#ff00b7", "#68340e", "#ffffff", "#d4d4d4"];
const MIN_COLUMNS = 4;
const MAX_COLUMNS = 24;

function randomSeed(columns) {
  return Array.from({ length: columns }, () => ({
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    heightRatio: 0.25 + Math.random() * 0.7,
    phase: Math.random() * Math.PI * 2,
  }));
}

export default function PlayCanvas() {
  const canvasRef = useRef(null);
  const [columns, setColumns] = useState(12);
  const [seed, setSeed] = useState(() => randomSeed(12));
  const frameRef = useRef(0);

  const remix = useCallback(() => {
    setSeed(randomSeed(columns));
  }, [columns]);

  const handleColumnsChange = (e) => {
    const next = Number(e.target.value);
    setColumns(next);
    setSeed(randomSeed(next));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const render = (t) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#e5e7eb";
      ctx.fillRect(0, 0, width, height);

      const gap = width * 0.015;
      const colWidth = (width - gap * (columns + 1)) / columns;

      seed.forEach((bar, i) => {
        const wobble = Math.sin(t / 900 + bar.phase) * 0.06;
        const h = height * Math.min(0.95, Math.max(0.08, bar.heightRatio + wobble));
        const x = gap + i * (colWidth + gap);
        const y = height - h;
        const radius = Math.min(colWidth / 2, 14);

        ctx.fillStyle = bar.color;
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.lineTo(x + colWidth - radius, y);
        ctx.arcTo(x + colWidth, y, x + colWidth, y + radius, radius);
        ctx.lineTo(x + colWidth, height);
        ctx.lineTo(x, height);
        ctx.closePath();
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameRef.current);
  }, [seed, columns]);

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-5">
      <canvas
        ref={canvasRef}
        width={640}
        height={640}
        className="w-full aspect-square rounded border border-[#e5e7eb] shadow-sm"
      />

      <div className="w-full flex items-center gap-3 bg-[#f4f4f4] border border-[#e5e7eb] rounded-full px-5 py-3">
        <span className="text-xs font-bold uppercase shrink-0">Columns {columns}</span>
        <input
          type="range"
          min={MIN_COLUMNS}
          max={MAX_COLUMNS}
          value={columns}
          onChange={handleColumnsChange}
          className="flex-1 accent-[#e2ff70]"
        />
      </div>

      <button
        onClick={remix}
        className="w-full bg-[#e2ff70] text-[#000000] py-3 px-6 rounded-full font-bold text-sm uppercase tracking-tight active:scale-[0.98] transition-transform"
      >
        Remix
      </button>
    </div>
  );
}