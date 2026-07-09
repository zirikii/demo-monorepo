import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { StoryCard } from "@/components/shared/StoryCard";
import { stories } from "@/data/stories";
import { industries } from "@/data/industries";
import { cn } from "@/lib/cn";

export function CustomerStoriesPage() {
  const [filter, setFilter] = useState<string>("all");
  const usedIndustries = industries.filter((i) => stories.some((s) => s.industrySlug === i.slug));
  const visible = filter === "all" ? stories : stories.filter((s) => s.industrySlug === filter);

  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Customer stories" }]} />
      <PageHero
        eyebrow="Customer stories"
        title="Brilliant experiences, built with Squiz"
        copy="Fictionalized stories from the sectors we serve — universities, councils, advisory firms, banks, and utilities — showing what changes when teams get the platform out of their way."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter stories by industry">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              filter === "all" ? "bg-navy text-mint" : "bg-card text-navy hover:bg-cream-deep/60",
            )}
          >
            All industries
          </button>
          {usedIndustries.map((i) => (
            <button
              key={i.slug}
              type="button"
              onClick={() => setFilter(i.slug)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                filter === i.slug ? "bg-navy text-mint" : "bg-card text-navy hover:bg-cream-deep/60",
              )}
            >
              {i.name}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>
      <CtaSection />
    </PageLayout>
  );
}
