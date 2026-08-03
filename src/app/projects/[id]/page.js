import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default function ProjectDetailPage({ params }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return notFound();

  const index = projects.findIndex((p) => p.id === params.id);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="min-h-screen bg-[#000000] text-[#ffffff]">
      <div className="max-w-3xl mx-auto px-6 py-10 sm:py-16">
        {/* Back + year */}
        <div className="flex justify-between items-center pb-8 border-b border-[#ffffff]/15">
          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-[#ffffff]/60 hover:text-[#e2ff70] transition-colors"
          >
            ← All Projects
          </Link>
          <span className="text-xs text-[#ffffff]/50 font-mono">{project.year}</span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.95]">
          {project.title}
        </h1>

        {/* Metadata row */}
        <div className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-[#ffffff]/10 text-sm">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-[#ffffff]/40 mb-1">
              Category
            </span>
            <span className="font-medium">{project.category}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-[#ffffff]/40 mb-1">
              Studio
            </span>
            <span className="font-medium">NorthDreamStudio</span>
          </div>
        </div>

        {/* Asset stack — swap these for real case-study imagery */}
        <div className="mt-10 space-y-4">
          <div
            className="w-full h-64 sm:h-80 rounded-2xl"
            style={{ backgroundColor: project.color }}
          />
          <div
            className="w-full h-48 sm:h-64 rounded-2xl opacity-70"
            style={{ backgroundColor: project.color }}
          />
        </div>

        {/* Next project */}
        <Link
          href={`/projects/${next.id}`}
          className="mt-12 flex items-center justify-between border-t border-[#ffffff]/15 pt-6 group"
        >
          <span className="text-xs uppercase tracking-wider text-[#ffffff]/40">
            Next Project
          </span>
          <span className="text-lg font-bold group-hover:text-[#e2ff70] transition-colors">
            {next.title} →
          </span>
        </Link>
      </div>
    </main>
  );
}
