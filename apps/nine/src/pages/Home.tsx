import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ArticleCard } from "@/components/article/ArticleCard";
import { MostPopular } from "@/components/sections/MostPopular";
import { WeatherStrip } from "@/components/sections/WeatherStrip";
import { VideoRail } from "@/components/sections/VideoRail";
import { PillarRail } from "@/components/sections/PillarRail";
import { featuredArticles } from "@/data/articles";
import { pillarOrder } from "@/data/pillars";

export function HomePage() {
  useDocumentTitle("");
  const featured = featuredArticles();
  const [lead, second, third, ...more] = featured;

  return (
    <PageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
        {/* Top stories */}
        <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-6 md:grid-cols-2">
            {lead ? <ArticleCard article={lead} variant="lead" className="md:col-span-2" /> : null}
            {second ? <ArticleCard article={second} showPillar /> : null}
            {third ? <ArticleCard article={third} showPillar /> : null}
            <div className="grid gap-1 md:col-span-2">
              {more.slice(0, 4).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="text" showPillar />
              ))}
            </div>
          </div>
          <aside className="space-y-5">
            <MostPopular />
            <WeatherStrip />
          </aside>
        </section>

        {/* Video */}
        <section className="mt-12 border-t border-line pt-8">
          <SectionHeader title="Latest video" to="/video" moreLabel="All video" />
          <VideoRail limit={6} />
        </section>

        {/* Per-pillar rails */}
        <div className="mt-4 space-y-12">
          {pillarOrder.map((pillar) => (
            <section key={pillar} className="border-t border-line pt-8">
              <PillarRail pillar={pillar} />
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
