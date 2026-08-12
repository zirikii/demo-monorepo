import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { TextInput } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { RESOURCE_AUDIENCES, RESOURCES } from "@/data/resources";
import type { Resource } from "@/data/types";

const AUDIENCE_TABS = ["All", ...RESOURCE_AUDIENCES] as const;
type AudienceTab = (typeof AUDIENCE_TABS)[number];

const TYPE_TONE: Record<Resource["type"], "purple" | "info" | "positive" | "caution" | "neutral"> = {
  Guide: "purple",
  Template: "info",
  Webinar: "positive",
  Report: "caution",
  Checklist: "neutral",
};

export default function ResourcesPage() {
  const [audience, setAudience] = useState<AudienceTab>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return RESOURCES.filter((resource) => {
      const matchesAudience = audience === "All" || resource.audience === audience;
      const matchesQuery =
        !needle ||
        resource.title.toLowerCase().includes(needle) ||
        resource.description.toLowerCase().includes(needle);
      return matchesAudience && matchesQuery;
    });
  }, [audience, query]);

  return (
    <PageLayout title="Resource hub">
      <PageHero
        eyebrow="Resource hub"
        title="Guides, templates and award updates"
        body="Everything Australian employers, employees, job seekers and partners need to stay across Fair Work changes, Payday Super and modern award rates."
        crumbs={[{ label: "Home", to: "/" }, { label: "Resources" }]}
      />

      <Section tone="white">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Tabs tabs={AUDIENCE_TABS} active={audience} onChange={setAudience} label="Audience" />
          <TextInput
            type="search"
            aria-label="Search resources"
            placeholder="Search resources"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="md:max-w-xs"
          />
        </div>

        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => (
              <Card key={resource.slug} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Badge tone={TYPE_TONE[resource.type]}>{resource.type}</Badge>
                  <span className="text-xs text-ink-faint">{resource.audience}</span>
                </div>
                <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                  {resource.title}
                </h3>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {resource.description}
                </p>
                <span className="text-sm font-semibold text-ink-faint">{resource.readTime}</span>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No resources match that search"
            body="Try a different keyword, or switch the audience filter back to All."
          />
        )}
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Also worth reading"
          title="The blog"
          body="Longer-form thinking on payroll compliance, hiring and retention from the Employment Hero team."
        />
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
