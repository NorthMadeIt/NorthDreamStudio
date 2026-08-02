"use client";

import React, { useState, useRef, useEffect } from "react";

// Project Database
const PROJECTS = [
  {
    id: "pp-model",
    title: "PP Model",
    client: "Pangram Pangram",
    year: "2025",
    tags: ["Typeface", "Motion", "3D Render"],
    description:
      "Visuals and campaign created for Pangram Pangram for their new typeface launch PP Model. We created motion assets and still imagery representing the process of creating a model car based on Tamiya car models.",
    credits: "Inari Type, Mathieu Desjardins, Francesca Bolognini",
    color: "#1a1a1a",
  },
  {
    id: "50-50",
    title: "50-50",
    client: "Independent",
    year: "2025",
    tags: ["Identity", "Digital"],
    description: "Interactive brand experiment exploring dualistic balance in web aesthetics.",
    credits: "NorthDreamStudio",
    color: "#ff007a",
  },
  {
    id: "toyota",
    title: "Toyota e-collection",
    client: "Toyota",
    year: "2024",
    tags: ["3D Concept", "Automotive"],
    description: "Digital asset collection designed for Toyota EV global concept launch.",
    credits: "Studio Nari Collaboration",
    color: "#222222",
  },
  {
    id: "daisy-chain",
    title: "Daisy Chain",
    client: "Ecosystem",
    year: "2024",
    tags: ["Web3", "UI/UX"],
    description: "Connected asset network UI layout and interactive reward mechanics.",
    credits: "NorthDreamStudio",
    color: "#e2ff70",
  },
  {
    id: "studio-nari",
    title: "Studio Nari",
    client: "Nari",
    year: "2024",
    tags: ["Portfolio", "Web Arch"],
    description: "Headless portfolio web application and dynamic asset archive.",
    credits: "Twomuch.Studio x Nari",
    color: "#111111",
  },
];

const DRAWING_COLORS = ["#4a2a18", "#e2ff70", "#ff00b7", "#000000", "#ffffff"];

export default function ExpandableStudioCard() {
  // Navigation & View States
  const [selectedProject, setSelectedProject] = useState(null); // null = Index View
  const [layoutMode, setLayoutMode] = useState("list"); // 'list' | 'grid' | 'single'
  
  // Interactive Canvas State
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff00b7");
  const [drawingCount, setDrawingCount] = useState(6913);

  // Initialize Canvas Drawing Context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  // Canvas Handlers
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

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handlePushDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawingCount((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#ffffff] border-2 border-[#000000] rounded-none overflow-hidden font-mono text-[#000000] select-none shadow-2xl relative">
      
      {/* GLOBAL HEADER BAR */}
      <div className="bg-[#ffffff] border-b-2 border-[#000000] p-2.5 flex justify-between items-center z-30 relative font-bold text-xs">
        <span className="font-black text-sm uppercase tracking-tight">Twomuch.Studio</span>
        <div className="flex items-center gap-1.5">
          <span className="bg-[#4a2a18] text-[#ffffff] px-2 py-0.5 text-[11px] font-bold rounded-full flex items-center gap-1">
            <span>😶</span> 1 <span>😶</span>
          </span>
          <button className="bg-[#e2ff70] px-3 py-1 border border-[#000000] font-black uppercase text-xs">
            Menu •
          </button>
        </div>
      </div>

      {/* VIEW 1: PROJECT DETAIL VIEW */}
      {selectedProject ? (
        <div className="bg-[#111111] text-[#ffffff] min-h-[80vh] flex flex-col justify-between p-4 space-y-6">
          
          {/* Top Sticky Nav */}
          <div className="flex justify-between items-center border-b border-[#333333] pb-3">
            <button
              onClick={() => setSelectedProject(null)}
              className="bg-[#e2ff70] text-[#000000] px-3 py-1 font-black text-xs uppercase"
            >
              ← All Projects
            </button>
            <span className="text-xs text-[#888888] font-bold">{selectedProject.year}</span>
          </div>

          {/* Project Header Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-black uppercase leading-tight tracking-wide">
              {selectedProject.title}
            </h1>
            <p className="text-xs leading-relaxed text-[#cccccc] font-sans">
              {selectedProject.description}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#222222] text-[11px]">
              <div>
                <span className="text-[#666666] block uppercase text-[9px] font-bold">Client</span>
                <span className="font-bold">{selectedProject.client}</span>
              </div>
              <div>
                <span className="text-[#666666] block uppercase text-[9px] font-bold">Credits</span>
                <span className="font-bold text-[#aaaaaa]">{selectedProject.credits}</span>
              </div>
            </div>
          </div>

          {/* Media Asset Stack Mockup */}
          <div className="space-y-3 pt-4">
            <div className="w-full h-52 bg-[#222222] border border-[#333333] flex items-center justify-center text-xs font-mono text-[#666666]">
              [ {selectedProject.title} Asset Showcase 01 ]
            </div>
            <div className="w-full h-52 bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-xs font-mono text-[#666666]">
              [ {selectedProject.title} Asset Showcase 02 ]
            </div>
          </div>

          {/* Sticky Drawer Trigger */}
          <button
            onClick={() => setSelectedProject(null)}
            className="w-full bg-[#e2ff70] text-[#000000] py-2.5 font-black text-xs uppercase border-2 border-[#000000] sticky bottom-0"
          >
            More projects
          </button>
        </div>
      ) : (
        /* VIEW 2: INDEX / HOME VIEW WITH DRAWING CANVAS & PROJECT LIST */
        <div className="bg-[#f0f0f0] pb-12">
          
          {/* TOP SECTION: DRAWING CIRCLE WIDGET */}
          <div className="bg-[#e5e5e5] p-4 border-b-2 border-[#000000] flex flex-col items-center justify-center relative">
            <div className="relative w-64 h-64 bg-[#ffffff] rounded-full border-2 border-[#000000] overflow-hidden shadow-inner cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={256}
                height={256}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full touch-none"
              />

              {/* Color Swatches Overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#ffffff]/90 backdrop-blur border border-[#000000] p-1 flex gap-1.5 rounded-full z-10">
                {DRAWING_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-5 h-5 rounded-full border border-[#000000] transition-transform ${
                      selectedColor === color ? "scale-125 ring-2 ring-[#000000]" : ""
                    }`}
                  />
                ))}
              </div>

              {/* Push Drawing Button (+) */}
              <button
                onClick={handlePushDrawing}
                className="absolute bottom-3 left-3 bg-[#ffffff] border-2 border-[#000000] w-8 h-8 rounded-full font-black text-lg flex items-center justify-center hover:bg-[#e2ff70] active:scale-90 transition-all z-10"
              >
                +
              </button>
            </div>

            {/* Submissions Badge Bar */}
            <div className="w-full bg-[#ff00b7] text-[#ffffff] mt-3 py-1.5 px-3 border border-[#000000] flex justify-between items-center text-xs font-black">
              <span>View all</span>
              <span>{drawingCount} drawings</span>
            </div>
          </div>

          {/* SECTION HEADER */}
          <div className="p-2.5 bg-[#ffffff] border-b-2 border-[#000000] flex justify-between items-center font-black text-xs">
            <span className="uppercase tracking-widest">WORK</span>
            <span className="text-sm">↓</span>
          </div>

          {/* PROJECT LISTINGS - DYNAMIC BASED ON LAYOUT MODE */}
          <div className="p-2">
            
            {/* 1. LIST VIEW MODE (☰) */}
            {layoutMode === "list" && (
              <div className="divide-y divide-[#e0e0e0] border border-[#000000] bg-[#ffffff]">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-3 p-2 hover:bg-[#e2ff70] cursor-pointer transition-colors"
                  >
                    <div
                      className="w-10 h-10 border border-[#000000] shrink-0 bg-[#cccccc]"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="font-bold text-xs uppercase tracking-tight flex-1">
                      {project.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 2. GRID VIEW MODE (::) */}
            {layoutMode === "grid" && (
              <div className="grid grid-cols-2 gap-2">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="relative bg-[#ffffff] border-2 border-[#000000] h-36 p-2 flex flex-col justify-between cursor-pointer hover:border-[#ff00b7] transition-all overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="relative z-10 bg-[#ffffff] border border-[#000000] px-2 py-0.5 text-[10px] font-black uppercase w-max">
                      {project.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 3. SINGLE FEED VIEW MODE (=) */}
            {layoutMode === "single" && (
              <div className="space-y-3">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="bg-[#ffffff] border-2 border-[#000000] p-2 space-y-2 cursor-pointer hover:brightness-95"
                  >
                    <span className="bg-[#ffffff] border border-[#000000] px-2 py-0.5 text-xs font-black uppercase inline-block">
                      {project.title}
                    </span>
                    <div
                      className="w-full h-44 border border-[#000000] flex items-center justify-center font-mono text-xs text-[#ffffff]"
                      style={{ backgroundColor: project.color }}
                    >
                      [ {project.title} Preview Image ]
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* FLOATING BOTTOM CONTROL BAR */}
          <div className="fixed bottom-3 right-3 bg-[#ffffff] border-2 border-[#000000] flex items-center z-40 shadow-xl">
            <button
              onClick={() => setLayoutMode("list")}
              className={`p-2 px-3 border-r border-[#000000] text-xs font-black ${
                layoutMode === "list" ? "bg-[#e2ff70]" : "bg-[#ffffff]"
              }`}
            >
              ☰
            </button>
            <button
              onClick={() => setLayoutMode("grid")}
              className={`p-2 px-3 border-r border-[#000000] text-xs font-black ${
                layoutMode === "grid" ? "bg-[#e2ff70]" : "bg-[#ffffff]"
              }`}
            >
              ::
            </button>
            <button
              onClick={() => setLayoutMode("single")}
              className={`p-2 px-3 text-xs font-black ${
                layoutMode === "single" ? "bg-[#e2ff70]" : "bg-[#ffffff]"
              }`}
            >
              =
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
