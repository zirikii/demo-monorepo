import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { videos } from "@/data/videos";
import { pillars, pillarOrder } from "@/data/pillars";
import type { PillarId } from "@/data/types";
import { gradientStyle, timeAgo } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export function VideoPage() {
  useDocumentTitle("Video · 9Now");
  const [filter, setFilter] = useState<PillarId | "all">("all");
  const clips = filter === "all" ? videos : videos.filter((v) => v.pillar === filter);
  const [hero, ...rest] = clips;

  return (
    <PageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
        <header className="mb-6 border-b border-line pb-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-nine-deep" />
            <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">Video &amp; 9Now</h1>
          </div>
          <p className="mt-2 max-w-2xl text-[15px] text-ink-soft">
            Live streams, highlights and full episodes from across the Nine network.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </FilterButton>
          {pillarOrder.map((p) => (
            <FilterButton key={p} active={filter === p} onClick={() => setFilter(p)}>
              {pillars[p].label}
            </FilterButton>
          ))}
        </div>

        {hero ? (
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <article className="group">
              <div
                className="relative aspect-video overflow-hidden rounded-xl"
                style={gradientStyle(hero.id, hero.pillar)}
              >
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10" />
                <PlayCircle className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-white" aria-hidden="true" />
                <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-xs font-bold text-white">
                  {hero.live ? "● LIVE" : hero.duration}
                </span>
              </div>
              <div className="mt-3">
                <Badge pillar={hero.pillar}>{pillars[hero.pillar].label}</Badge>
                <h2 className="mt-1.5 text-2xl font-black leading-tight text-ink">{hero.title}</h2>
                <p className="mt-1 text-sm text-ink-faint">
                  {hero.show} · {timeAgo(hero.publishedAt)}
                </p>
              </div>
            </article>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {rest.slice(0, 3).map((clip) => (
                <article key={clip.id} className="group flex gap-3">
                  <div
                    className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg"
                    style={gradientStyle(clip.id, clip.pillar)}
                  >
                    <PlayCircle className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className={cn("text-[11px] font-bold uppercase", pillars[clip.pillar].text)}>
                      {pillars[clip.pillar].label}
                    </span>
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-ink">{clip.title}</h3>
                    <p className="text-xs text-ink-faint">{clip.show}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {rest.slice(3).map((clip) => (
            <article key={clip.id} className="group">
              <div
                className="relative aspect-video overflow-hidden rounded-lg"
                style={gradientStyle(clip.id, clip.pillar)}
              >
                <PlayCircle className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white" aria-hidden="true" />
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-bold text-white">
                  {clip.live ? "● LIVE" : clip.duration}
                </span>
              </div>
              <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-ink">{clip.title}</h3>
              <p className="text-xs text-ink-faint">{clip.show}</p>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
        active ? "bg-nine-deep text-white" : "border border-line bg-card text-ink-soft hover:bg-surface",
      )}
    >
      {children}
    </button>
  );
}
