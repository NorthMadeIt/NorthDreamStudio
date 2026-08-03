"use client";

import React, { useState } from "react";
import { projects } from "@/data/projects";

const LAYOUTS = [
  { mode: "list", icon: "☰" },
  { mode: "grid", icon: "▦" },
  { mode: "single", icon: "▬" },
];

function Thumbnail({ color, title, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: color }}
    >
      <span className="sr-only">{title}</span>
    </div>
  );
}

export default function ProjectIndex() {
  const [layout, setLayout] = useState("list");

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
      {/* WORK header */}
      <div className="flex justify-between items-center pb-4 border-b border-[#e5e7eb] text-xs text-[#000000]/60 uppercase tracking-wider">
        <span className="font-black tracking-tight text-sm text-[#000000]">Work</span>
        <span>{projects.length} Selected</span>
      </div>

      {/* Layout toggle */}
      <div className="flex justify-end gap-1 py-3">
        {LAYOUTS.map(({ mode, icon }) => (
          <button
            key={mode}
            onClick={() => setLayout(mode)}
            aria-label={`${mode} view`}
            className={`w-9 h-9 rounded-full text-sm flex items-center justify-center border transition-colors ${
              layout === mode
                ? "bg-[#e2ff70] border-[#e2ff70] text-[#000000]"
                : "bg-[#f4f4f4] border-[#e5e7eb] text-[#000000]/60"
            }`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* LIST */}
      {layout === "list" && (
        <ul className="divide-y divide-[#e5e7eb]">
          {projects.map((project) => (
            <li key={project.id}>
              <a
                href={`/projects/${project.id}`}
                className="group flex items-center gap-4 py-4 px-2 transition-colors duration-200 hover:bg-[#f4f4f4] rounded-xl"
              >
                <Thumbnail
                  color={project.color}
                  title={project.title}
                  className="w-14 h-14 rounded-lg shrink-0"
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
              className="relative h-40 rounded-2xl overflow-hidden border border-[#e5e7eb] group"
            >
              <Thumbnail color={project.color} title={project.title} className="absolute inset-0" />
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
                className="w-full h-48 rounded-2xl"
              />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
