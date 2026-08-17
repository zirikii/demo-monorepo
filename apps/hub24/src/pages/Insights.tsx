import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSIGHT_CATEGORIES, INSIGHTS } from "@/data/insights";
import { formatDate, readingTime } from "@/lib/format";
import { cn } from "@/lib/cn";

type Filter = (typeof INSIGHT_CATEGORIES)[number] | "All";

const FILTERS: Filter[] = ["All", ...INSIGHT_CATEGORIES];

export default function InsightsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const insights = (filter === "All" ? INSIGHTS : INSIGHTS.filter((item) => item.category === filter))
    .slice()
    .sort((a, b) => b.published.localeCompare(a.published));

  return (
    <PageLayout title="Insights">
      <PageHero
        eyebrow="Insights"
        title="The latest industry insights from our team and leading advice experts"
        body="Commentary on markets, practice management, managed portfolios, regulation and the technology behind advice."
        crumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
      />

      <Section>
        <SectionHeading eyebrow="Browse" title="Filter by topic" />

        <div role="group" aria-label="Filter insights by category" className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className={cn(
                "focus-h24 rounded-full border px-4 py-2 text-sm font-semibold transition",
                filter === option
                  ? "border-h24-teal bg-h24-teal text-white"
                  : "border-line bg-white text-ink-soft hover:border-h24-teal hover:text-h24-teal-dark",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {insights.length === 0 ? (
          <EmptyState className="mt-10" title="Nothing published in this topic yet" />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <LinkCard
                key={insight.slug}
                to={`/insights/${insight.slug}/`}
                className="flex h-full flex-col gap-3"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                  {insight.category}
                </span>
                <CardHeading>{insight.title}</CardHeading>
                <CardBody className="flex-1">{insight.excerpt}</CardBody>
                <span className="text-xs text-ink-faint">
                  {insight.author} · {formatDate(insight.published)} ·{" "}
                  {readingTime(insight.body.join(" "))}
                </span>
              </LinkCard>
            ))}
          </div>
        )}
      </Section>

      <CtaBand
        eyebrow="Professional development"
        title="Looking for CPD-accredited material?"
        body="Our professional development page connects advisers with accredited material from HUB24 and the investment managers on the platform."
        primary={{ label: "CPD education", to: "/cpd-education/" }}
        secondary={{ label: "Product documents", to: "/product-documents/" }}
      />
    </PageLayout>
  );
}
