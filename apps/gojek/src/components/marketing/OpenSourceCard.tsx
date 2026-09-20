import { Star } from "lucide-react";
import type { OpenSourceProject } from "@/data/types";
import { formatCompact } from "@/lib/format";

export function OpenSourceCard({ project }: { project: OpenSourceProject }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-go-lg bg-white/5 p-6 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-mono text-lg font-bold text-white">{project.name}</h3>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-white/60">
          <Star aria-hidden="true" className="h-3.5 w-3.5" />
          {formatCompact(project.stars)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-white/65">{project.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <span className="rounded-full bg-go-green/20 px-2.5 py-0.5 text-xs font-bold text-go-green-soft">
          {project.language}
        </span>
        {project.topics.map((topic) => (
          <span key={topic} className="text-xs text-white/40">
            #{topic}
          </span>
        ))}
      </div>
    </article>
  );
}
