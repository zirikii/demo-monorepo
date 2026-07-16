import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHero } from "@/components/layout/SectionHero";
import { StoryCard } from "@/components/article/StoryCard";
import { getByPillar, type Pillar } from "@/data/articles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { titleCase } from "@/lib/format";
import { cn } from "@/lib/cn";

const PILLAR_COPY: Record<Pillar, string> = {
  news: "Breaking Australian and world news from the Nine newsroom.",
  sport: "NRL, AFL, cricket, tennis and more from Wide World of Sports.",
  lifestyle: "Fashion, food, wellness and motoring — formerly 9Honey territory.",
  travel: "Road trips, city stopovers and trends for Aussie travellers.",
  entertainment: "Showbiz, film and the stories everyone is sharing.",
  shopping: "Deals, product picks and seasonal sales worth knowing.",
  tv: "Companion coverage for Channel 9’s biggest shows.",
};

export function SectionPage({ pillar }: { pillar: Pillar }) {
  useDocumentTitle(titleCase(pillar));
  const all = getByPillar(pillar);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(all.map((a) => a.category)))],
    [all],
  );
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? all : all.filter((a) => a.category === cat);

  return (
    <PageLayout>
      <SectionHero pillar={pillar} dek={PILLAR_COPY[pillar]} />
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm font-semibold transition-colors",
              cat === c
                ? "border-nine-ink bg-nine-ink text-white"
                : "border-nine-line bg-white text-nine-muted hover:border-nine-cyan",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <StoryCard key={a.slug} article={a} />
        ))}
      </div>
    </PageLayout>
  );
}
