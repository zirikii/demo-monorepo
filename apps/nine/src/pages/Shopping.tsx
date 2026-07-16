import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHero } from "@/components/layout/SectionHero";
import { StoryCard } from "@/components/article/StoryCard";
import { deals } from "@/data/deals";
import { getByPillar } from "@/data/articles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ShoppingPage() {
  useDocumentTitle("Shopping");
  const stories = getByPillar("shopping");

  return (
    <PageLayout>
      <SectionHero pillar="shopping" dek="Deals, product picks and seasonal sales worth knowing." />
      <section>
        <h2 className="mb-4 font-display text-2xl font-bold">Editor picks</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((d) => (
            <div key={d.id} className="rounded-lg border border-nine-line bg-nine-wash p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-nine-blue">{d.merchant}</p>
              <h3 className="mt-1 font-display text-xl font-bold">{d.title}</h3>
              <p className="mt-2 text-sm text-nine-muted">{d.blurb}</p>
              <p className="mt-3 text-lg font-bold text-nine-ink">
                {d.price}{" "}
                {d.was && <span className="text-sm font-normal text-nine-muted line-through">{d.was}</span>}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold">Shopping stories</h2>
          <Link to="/newsletter" className="text-sm font-semibold text-nine-blue">
            Deal alerts
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
