"use client";

import React, { useRef, useState, useCallback } from "react";

const PALETTE = ["#68340e", "#e2ff70", "#ff00b7", "#000000"];

export default function DrawCanvas() {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [color, setColor] = useState(PALETTE[3]);
  // Starting count mirrors reference scale; wire to a real backend to persist across users.
  const [drawingCount, setDrawingCount] = useState(6913);
  const [hasDrawn, setHasDrawn] = useState(false);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const { x, y } = getPos(e);
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
      isDrawing.current = true;
      setHasDrawn(true);
    },
    [color]
  );

  const draw = useCallback((e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }, []);

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSubmit = () => {
    if (!hasDrawn) return;
    // TODO: POST canvas.toDataURL() to a real endpoint once one exists.
    handleClear();
    setDrawingCount((c) => c + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#ffffff] border border-[#e5e7eb] shadow-sm overflow-hidden">
        <canvas
          ref={canvasRef}
          width={480}
          height={480}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          className="w-full h-full touch-none cursor-crosshair"
        />

        {/* Color palette */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#ffffff]/95 border border-[#e5e7eb] p-1.5 flex gap-2 rounded-full shadow-sm">
          {PALETTE.map((swatch) => (
            <button
              key={swatch}
              onClick={() => setColor(swatch)}
              aria-label={`Select color ${swatch}`}
              style={{ backgroundColor: swatch }}
              className={`w-6 h-6 rounded-full border border-[#e5e7eb] transition-transform ${
                color === swatch ? "scale-125 ring-2 ring-[#000000]/20" : ""
              }`}
            />
          ))}
        </div>

        {/* Clear */}
        <button
          onClick={handleClear}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f4f4f4] border border-[#e5e7eb] text-xs font-bold flex items-center justify-center hover:bg-[#e5e7eb] transition-colors"
        >
          ✕
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!hasDrawn}
        className="w-full max-w-xs bg-[#e2ff70] disabled:opacity-40 disabled:cursor-not-allowed text-[#000000] py-3 px-6 rounded-full font-bold text-sm uppercase tracking-tight transition-opacity active:scale-[0.98]"
      >
        Submit Drawing
      </button>

      <div className="w-full max-w-xs flex justify-between items-center bg-[#f4f4f4] border border-[#e5e7eb] rounded-full px-5 py-3 text-xs font-medium text-[#000000]">
        <span>View all</span>
        <span>{drawingCount.toLocaleString()} drawings</span>
      </div>
    </div>
  );
}