import { PlayCircle } from "lucide-react";
import { videos } from "@/data/videos";
import { pillars } from "@/data/pillars";
import { gradientStyle, timeAgo } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Badge } from "../ui/Badge";

export function VideoRail({ limit = 6 }: { limit?: number }) {
  const clips = videos.slice(0, limit);
  return (
    <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
      {clips.map((clip) => (
        <article
          key={clip.id}
          className="group w-64 shrink-0 snap-start sm:w-auto"
        >
          <div
            className="relative aspect-video overflow-hidden rounded-lg"
            style={gradientStyle(clip.id, clip.pillar)}
          >
            <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
            <PlayCircle
              className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow"
              aria-hidden="true"
            />
            <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-bold text-white">
              {clip.live ? "● LIVE" : clip.duration}
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-1.5">
              <Badge pillar={clip.pillar}>{pillars[clip.pillar].label}</Badge>
              <span className="text-[11px] text-ink-faint">{clip.show}</span>
            </div>
            <h3 className={cn("mt-1 line-clamp-2 text-sm font-bold leading-snug text-ink")}>
              {clip.title}
            </h3>
            <p className="mt-0.5 text-xs text-ink-faint">{timeAgo(clip.publishedAt)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
