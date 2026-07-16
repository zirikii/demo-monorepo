import { articlesByPillar } from "@/data/articles";
import { pillars } from "@/data/pillars";
import type { PillarId } from "@/data/types";
import { SectionHeader } from "../layout/SectionHeader";
import { ArticleCard } from "../article/ArticleCard";

export function PillarRail({ pillar }: { pillar: PillarId }) {
  const meta = pillars[pillar];
  const items = articlesByPillar(pillar);
  if (items.length === 0) return null;
  const [lead, ...rest] = items;

  return (
    <section>
      <SectionHeader title={meta.label} pillar={pillar} to={meta.to} moreLabel={`More ${meta.label}`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ArticleCard article={lead} variant="lead" />
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {rest.slice(0, 4).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
