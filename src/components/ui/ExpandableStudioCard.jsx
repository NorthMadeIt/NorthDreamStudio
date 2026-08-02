"use client";

import React, { useState, useRef, useEffect } from "react";

const PROJECTS = [
  {
    id: "pp-model",
    title: "PP Model",
    client: "Pangram Pangram",
    year: "2025",
    description:
      "Visuals and campaign created for Pangram Pangram for their new typeface launch PP Model. Motion assets and still imagery based on Tamiya car models.",
    credits: "Inari Type, Mathieu Desjardins, Francesca Bolognini",
    color: "#1a1a1a",
  },
  {
    id: "50-50",
    title: "50-50",
    client: "Independent",
    year: "2025",
    description: "Interactive brand experiment exploring dualistic balance in web aesthetics.",
    credits: "NorthDreamStudio",
    color: "#ff00b7",
  },
  {
    id: "toyota",
    title: "Toyota e-collection",
    client: "Toyota",
    year: "2024",
    description: "Digital asset collection designed for Toyota EV global concept launch.",
    credits: "Studio Nari Collaboration",
    color: "#222222",
  },
  {
    id: "daisy-chain",
    title: "Daisy Chain",
    client: "Ecosystem",
    year: "2024",
    description: "Connected asset network UI layout and interactive reward mechanics.",
    credits: "NorthDreamStudio",
    color: "#e2ff70",
  },
  {
    id: "studio-nari",
    title: "Studio Nari",
    client: "Nari",
    year: "2024",
    description: "Headless portfolio web application and dynamic asset archive.",
    credits: "Twomuch.Studio x Nari",
    color: "#111111",
  },
];

const DRAWING_COLORS = ["#4a2a18", "#e2ff70", "#ff00b7", "#000000", "#ffffff"];

export default function ExpandableStudioCard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [layoutMode, setLayoutMode] = useState("list");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff00b7");
  const [drawingCount, setDrawingCount] = useState(6913);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.strokeStyle = selectedColor;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const handlePushDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawingCount((c) => c + 1);
  };

  return (
    <div className="fixed inset-x-2 top-1/2 -translate-y-1/2 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-[#ffffff] border-2 border-[#000000] rounded-none overflow-hidden font-mono text-[#000000] select-none shadow-2xl relative pointer-events-auto max-h-[88vh] flex flex-col">

        {/* HEADER */}
        <div className="bg-[#ffffff] border-b-2 border-[#000000] p-2.5 flex justify-between items-center shrink-0 z-30">
          <button
            onClick={() => {
              setSelectedProject(null);
              setIsMenuOpen(false);
            }}
            className="font-black text-sm uppercase tracking-tight cursor-pointer"
          >
            Twomuch.Studio
          </button>

          <div className="flex items-center gap-1.5">
            <span className="bg-[#4a2a18] text-[#ffffff] px-2 py-0.5 text-[11px] font-bold rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]" />
              1
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]" />
            </span>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`px-3 py-1 border-2 border-[#000000] font-black uppercase text-xs transition-colors ${
                isMenuOpen
                  ? "bg-[#ff00b7] text-[#ffffff]"
                  : "bg-[#e2ff70] text-[#000000]"
              }`}
            >
              {isMenuOpen ? "Close ✕" : "Menu •"}
            </button>
          </div>
        </div>

        {/* MENU OVERLAY */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-[49px] bottom-0 bg-[#ffffff] z-50 flex flex-col justify-between p-5 border-t-0">
            <div className="flex flex-col gap-0 my-auto">
              {[
                { label: "01. Selected Work", badge: `[${PROJECTS.length}]`, badgeClass: "bg-[#e2ff70] text-[#000000]" },
                { label: "02. Collaborative Canvas", badge: "LIVE", badgeClass: "bg-[#ff00b7] text-[#ffffff]" },
                { label: "03. Studio Profile", badge: null },
                { label: "04. Contact & Inquiries", badge: null },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setSelectedProject(null);
                    setIsMenuOpen(false);
                  }}
                  className="text-xl font-black uppercase text-left hover:text-[#ff00b7] transition-colors border-b-2 border-[#000000] py-3 flex justify-between items-center"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 border border-[#000000] font-bold ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="border-t-2 border-[#000000] pt-4 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#666666] uppercase text-[10px] font-bold">Studio Status</span>
                <span className="bg-[#e2ff70] px-2 py-0.5 border border-[#000000] font-bold text-[10px] uppercase">
                  Available Q3/Q4
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#666666] uppercase text-[10px] font-bold">Location</span>
                <span className="font-bold">London / Remote</span>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT DETAIL */}
        {selectedProject ? (
          <div className="bg-[#111111] text-[#ffffff] flex-1 overflow-y-auto flex flex-col">
            <div className="p-4 space-y-5 flex-1">
              <div className="flex justify-between items-center border-b border-[#333] pb-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-[#e2ff70] text-[#000000] px-3 py-1 font-black text-xs uppercase border border-[#000000]"
                >
                  ← All Projects
                </button>
                <span className="text-xs text-[#888] font-bold">{selectedProject.year}</span>
              </div>

              <h1 className="text-2xl font-black uppercase leading-none tracking-tight">
                {selectedProject.title}
              </h1>

              <p className="text-xs leading-relaxed text-[#ccc] font-sans">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#222] text-[11px]">
                <div>
                  <span className="text-[#666] block uppercase text-[9px] font-bold mb-0.5">Client</span>
                  <span className="font-bold">{selectedProject.client}</span>
                </div>
                <div>
                  <span className="text-[#666] block uppercase text-[9px] font-bold mb-0.5">Credits</span>
                  <span className="font-bold text-[#aaa]">{selectedProject.credits}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="w-full h-48 bg-[#222] border border-[#333] flex items-center justify-center text-xs text-[#666]">
                  [ {selectedProject.title} Asset 01 ]
                </div>
                <div className="w-full h-48 bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-xs text-[#666]">
                  [ {selectedProject.title} Asset 02 ]
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full bg-[#e2ff70] text-[#000000] py-3 font-black text-xs uppercase border-t-2 border-[#000000] shrink-0"
            >
              More projects
            </button>
          </div>
        ) : (
          /* INDEX VIEW */
          <div className="bg-[#f0f0f0] flex-1 overflow-y-auto custom-scrollbar">
            {/* DRAWING CANVAS */}
            <div className="bg-[#e5e5e5] p-4 border-b-2 border-[#000000] flex flex-col items-center">
              <div className="relative w-60 h-60 bg-[#ffffff] rounded-full border-2 border-[#000000] overflow-hidden shadow-inner cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={240}
                  height={240}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full touch-none"
                />

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#ffffff]/95 border border-[#000000] p-1 flex gap-1.5 rounded-full z-10">
                  {DRAWING_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-5 h-5 rounded-full border border-[#000000] transition-transform ${
                        selectedColor === color ? "scale-125 ring-1 ring-[#000000]" : ""
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handlePushDrawing}
                  className="absolute bottom-3 left-3 bg-[#ffffff] border-2 border-[#000000] w-8 h-8 rounded-full font-black text-lg flex items-center justify-center hover:bg-[#e2ff70] active:scale-90 transition-all z-10"
                >
                  +
                </button>
              </div>

              <div className="w-full bg-[#ff00b7] text-[#ffffff] mt-3 py-1.5 px-3 border-2 border-[#000000] flex justify-between items-center text-xs font-black">
                <span>View all</span>
                <span>{drawingCount} drawings</span>
              </div>
            </div>

            {/* WORK HEADER */}
            <div className="p-2.5 bg-[#ffffff] border-b-2 border-[#000000] flex justify-between items-center font-black text-xs sticky top-0 z-10">
              <span className="uppercase tracking-widest">WORK</span>
              <span>↓</span>
            </div>

            {/* PROJECTS */}
            <div className="p-2 pb-16">
              {layoutMode === "list" && (
                <div className="border-2 border-[#000000] bg-[#ffffff] divide-y divide-[#000000]">
                  {PROJECTS.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-3 p-2.5 hover:bg-[#e2ff70] cursor-pointer transition-colors"
                    >
                      <div
                        className="w-10 h-10 border border-[#000000] shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="font-bold text-xs uppercase tracking-tight flex-1">
                        {project.title}
                      </span>
                      <span className="text-[10px] text-[#666] font-mono">{project.year}</span>
                    </div>
                  ))}
                </div>
              )}

              {layoutMode === "grid" && (
                <div className="grid grid-cols-2 gap-2">
                  {PROJECTS.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="relative bg-[#ffffff] border-2 border-[#000000] h-36 p-2 flex flex-col justify-between cursor-pointer hover:border-[#ff00b7] transition-all overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="relative z-10 bg-[#ffffff] border border-[#000000] px-2 py-0.5 text-[10px] font-black uppercase w-max">
                        {project.title}
                      </span>
                      <span className="relative z-10 text-[10px] font-mono opacity-60">{project.year}</span>
                    </div>
                  ))}
                </div>
              )}

              {layoutMode === "single" && (
                <div className="space-y-2">
                  {PROJECTS.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="bg-[#ffffff] border-2 border-[#000000] p-2 space-y-2 cursor-pointer hover:brightness-95"
                    >
                      <div className="flex justify-between items-center">
                        <span className="bg-[#ffffff] border border-[#000000] px-2 py-0.5 text-xs font-black uppercase">
                          {project.title}
                        </span>
                        <span className="text-[10px] font-mono opacity-60">{project.year}</span>
                      </div>
                      <div
                        className="w-full h-40 border border-[#000000] flex items-center justify-center text-xs text-[#ffffff] font-mono"
                        style={{ backgroundColor: project.color }}
                      >
                        [ Preview ]
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FLOATING LAYOUT CONTROLS */}
            <div className="absolute bottom-3 right-3 bg-[#ffffff] border-2 border-[#000000] flex items-center z-40 shadow-lg">
              {[
                { mode: "list", icon: "☰" },
                { mode: "grid", icon: "::" },
                { mode: "single", icon: "=" },
              ].map((btn, i) => (
                <button
                  key={btn.mode}
                  onClick={() => setLayoutMode(btn.mode)}
                  className={`p-2 px-3 text-xs font-black ${
                    i < 2 ? "border-r border-[#000000]" : ""
                  } ${
                    layoutMode === btn.mode ? "bg-[#e2ff70]" : "bg-[#ffffff]"
                  }`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
