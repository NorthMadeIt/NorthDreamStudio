"use client";

import React from "react";
import { studioData } from "@/data/studio";

export default function ProjectIndex() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center pb-4 hairline-b text-xs text-[#000000] opacity-60 uppercase tracking-wider">
        <span>Selected Work</span>
        <span>Archive '26</span>
      </div>

      <ul className="divide-y divide-[#e5e7eb]">
        {studioData.projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.link}
              className="group flex items-center justify-between py-5 px-3 transition-colors duration-200 hover:bg-[#f4f4f4] rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#000000] opacity-50 font-mono">
                  [{project.id}]
                </span>
                <span className="text-base sm:text-lg font-medium text-[#000000] group-hover:translate-x-1 transition-transform duration-200">
                  {project.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-xs bg-[#f4f4f4] border border-[#e5e7eb] px-2.5 py-1 rounded-full text-[#000000]">
                  {project.category}
                </span>
                <span className="text-xs text-[#000000] opacity-60">
                  {project.year}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
