import { useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { InsightCard } from "@/components/marketing/InsightCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { INSIGHT_CATEGORIES, insightsByCategory } from "@/data/insights";

export default function InsightsPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "All";
  const insights = insightsByCategory(category);

  function selectCategory(next: string) {
    if (next === "All") {
      setParams({});
      return;
    }
    setParams({ category: next });
  }

  return (
    <PageLayout title="Insights">
      <PageHero
        eyebrow="Insights &amp; education"
        title="Insights from the HUB24 Group"
        body="Media releases, adviser insights, research and technical explainers from across the group."
        crumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
      />

      <Section>
        <SectionHeading eyebrow="Browse" title="Filter by category" />
        <Tabs
          className="mt-6"
          label="Filter insights by category"
          tabs={[...INSIGHT_CATEGORIES]}
          active={category}
          onChange={selectCategory}
        />

        {insights.length === 0 ? (
          <EmptyState
            title="Nothing published in this category yet"
            body="Try another category or browse all insights."
          />
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        )}
      </Section>

      <CtaBand
        title="Want this in your inbox?"
        body="In the real world you could subscribe to HUB24 insights. This demo does not collect email addresses."
        primary={{ label: "Contact us", to: "/contact-us" }}
        secondary={{ label: "CPD education", to: "/education" }}
      />
    </PageLayout>
  );
}
