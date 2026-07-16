import { Link } from "react-router-dom";
import type { Article, Pillar } from "@/data/articles";
import { getByPillar } from "@/data/articles";
import { StoryCard } from "@/components/article/StoryCard";
import { titleCase } from "@/lib/format";

export function PillarRail({ pillar, limit = 4 }: { pillar: Pillar; limit?: number }) {
  const items = getByPillar(pillar).slice(0, limit);
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-end justify-between border-b border-nine-line pb-2">
        <h2 className="font-display text-2xl font-bold text-nine-ink">{titleCase(pillar)}</h2>
        <Link to={`/${pillar}`} className="text-sm font-semibold text-nine-blue no-underline hover:underline">
          See all
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((a: Article) => (
          <StoryCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
