import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHero } from "@/components/layout/SectionHero";
import { StoryCard } from "@/components/article/StoryCard";
import { tvShows } from "@/data/shows";
import { getByPillar } from "@/data/articles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function TvPage() {
  useDocumentTitle("TV");
  const stories = getByPillar("tv");

  return (
    <PageLayout>
      <SectionHero pillar="tv" title="TV" dek="Companion coverage for Channel 9’s biggest shows." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tvShows.map((show) => (
          <Link
            key={show.slug}
            to={`/tv/show/${show.slug}`}
            className="story-lift group overflow-hidden rounded-lg no-underline"
          >
            <div
              className="flex h-36 items-end p-4 text-white"
              style={{ background: `linear-gradient(135deg, ${show.tone}, #070720)` }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">{show.network}</p>
                <h2 className="font-display text-2xl font-bold group-hover:text-nine-cyan">{show.title}</h2>
              </div>
            </div>
            <div className="border border-t-0 border-nine-line p-4">
              <p className="text-xs font-semibold text-nine-blue">{show.airs}</p>
              <p className="mt-1 text-sm text-nine-muted">{show.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="mb-4 font-display text-2xl font-bold">Latest TV stories</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
