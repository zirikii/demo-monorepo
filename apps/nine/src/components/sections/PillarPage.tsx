import type { ReactNode } from "react";
import { articlesByPillar } from "@/data/articles";
import { pillars } from "@/data/pillars";
import type { PillarId } from "@/data/types";
import { cn } from "@/lib/cn";
import { ArticleCard } from "../article/ArticleCard";
import { ArticleGrid } from "./ArticleGrid";
import { MostPopular } from "./MostPopular";
import { EmptyState } from "../ui/EmptyState";

type Props = {
  pillar: PillarId;
  /** Rendered above the article grid (e.g. live scores, show cards, deals). */
  topSlot?: ReactNode;
  /** Rendered in the sidebar below Most Read. */
  sideSlot?: ReactNode;
};

export function PillarPage({ pillar, topSlot, sideSlot }: Props) {
  const meta = pillars[pillar];
  const items = articlesByPillar(pillar);
  const [lead, ...rest] = items;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
      <header className="mb-6 border-b border-line pb-5">
        <div className="flex items-center gap-3">
          <span className={cn("h-8 w-1.5 rounded-full", meta.bg)} />
          <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{meta.label}</h1>
        </div>
        <p className="mt-2 max-w-2xl text-[15px] text-ink-soft">{meta.blurb}</p>
      </header>

      {topSlot ? <div className="mb-8">{topSlot}</div> : null}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          {lead ? (
            <div className="mb-8 border-b border-line pb-8">
              <ArticleCard article={lead} variant="lead" />
            </div>
          ) : null}
          {rest.length > 0 ? (
            <ArticleGrid articles={rest} columns={2} />
          ) : (
            <EmptyState
              title="No stories yet"
              description="Check back soon for the latest in this section."
            />
          )}
        </div>
        <aside className="space-y-5">
          <MostPopular />
          {sideSlot}
        </aside>
      </div>
    </div>
  );
}
