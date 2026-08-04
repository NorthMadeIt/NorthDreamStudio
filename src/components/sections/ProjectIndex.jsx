"use client";

import React, { useState } from "react";
import { projects } from "@/data/projects";

const LAYOUTS = [
  { mode: "list", icon: "☰" },
  { mode: "grid", icon: "▦" },
  { mode: "single", icon: "▬" },
];

function Thumbnail({ color, title, index, className = "" }) {
  return (
    <div
      className={`relative flex items-end justify-start overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(155deg, ${color} 0%, ${color}cc 55%, ${color}88 100%)`,
      }}
    >
      <span
        className="absolute -bottom-3 -left-1 text-5xl font-black opacity-15 select-none leading-none"
        style={{ color: "#ffffff" }}
      >
        {index}
      </span>
      <span className="sr-only">{title}</span>
    </div>
  );
}

export default function ProjectIndex() {
  const [layout, setLayout] = useState("list");

  return (
    <section id="work-top" className="w-full max-w-5xl mx-auto px-4 py-16">
      {/* WORK header */}
      <div className="flex justify-between items-center pb-4 border-b border-[#e5e7eb] text-xs text-[#000000]/60 uppercase tracking-wider">
        <span className="font-black tracking-tight text-sm text-[#000000]">Work</span>
        <span>{projects.length} Selected</span>
      </div>

      {/* Layout toggle moved to bottom to match reference — see end of section */}

      {/* LIST */}
      {layout === "list" && (
        <ul className="divide-y divide-[#e5e7eb]">
          {projects.map((project) => (
            <li key={project.id}>
              <a
                href={`/projects/${project.id}`}
                className="group flex items-center gap-4 py-4 px-2 transition-colors duration-200 hover:bg-[#f4f4f4] rounded"
              >
                <Thumbnail
                  color={project.color}
                  title={project.title}
                  index={project.id}
                  className="w-14 h-14 rounded shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-base font-medium text-[#000000] truncate group-hover:translate-x-1 transition-transform duration-200">
                    {project.title}
                  </div>
                  <div className="text-xs text-[#000000]/50">{project.category}</div>
                </div>
                <span className="text-xs text-[#000000]/50 shrink-0">{project.year}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* GRID */}
      {layout === "grid" && (
        <div className="grid grid-cols-2 gap-3">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.id}`}
              className="relative h-40 rounded overflow-hidden border border-[#e5e7eb] group"
            >
              <Thumbnail color={project.color} title={project.title} index={project.id} className="absolute inset-0" />
              <span className="absolute top-2 left-2 bg-[#ffffff] px-2.5 py-1 rounded-full text-[11px] font-bold uppercase text-[#000000] group-hover:bg-[#e2ff70] transition-colors">
                {project.title}
              </span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#ffffff]/80">
                {project.year}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* SINGLE */}
      {layout === "single" && (
        <div className="space-y-3">
          {projects.map((project) => (
            <a key={project.id} href={`/projects/${project.id}`} className="block group">
              <div className="flex justify-between items-center px-1 pb-2 text-xs">
                <span className="font-bold uppercase text-[#000000]">{project.title}</span>
                <span className="text-[#000000]/50">{project.year}</span>
              </div>
              <Thumbnail
                color={project.color}
                title={project.title}
                index={project.id}
                className="w-full h-48 rounded"
              />
            </a>
          ))}
        </div>
      )}

      {/* Bottom control bar — matches reference: "Back to top" + segmented toggle */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#e5e7eb]">
        <a
          href="#work-top"
          className="text-sm text-[#000000]/70 hover:text-[#000000] transition-colors"
        >
          Back to top
        </a>
        <div className="flex rounded overflow-hidden border border-[#e5e7eb]">
          {LAYOUTS.map(({ mode, icon }, i) => (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              aria-label={`${mode} view`}
              className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${
                i > 0 ? "border-l border-[#e5e7eb]" : ""
              } ${
                layout === mode
                  ? "bg-[#e2ff70] text-[#000000]"
                  : "bg-[#f4f4f4] text-[#000000]/50"
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
