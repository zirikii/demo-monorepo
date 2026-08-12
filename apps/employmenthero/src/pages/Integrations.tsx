import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tabs } from "@/components/ui/Tabs";
import { INTEGRATION_CATEGORIES, INTEGRATIONS } from "@/data/integrations";

const TABS = ["All", ...INTEGRATION_CATEGORIES] as const;
type Tab = (typeof TABS)[number];

export default function IntegrationsPage() {
  const [category, setCategory] = useState<Tab>("All");

  const integrations = useMemo(
    () =>
      category === "All"
        ? INTEGRATIONS
        : INTEGRATIONS.filter((integration) => integration.category === category),
    [category],
  );

  return (
    <PageLayout title="Integrations">
      <PageHero
        eyebrow="Integrations"
        title="Connect the tools you already run"
        body="Accounting, rostering, point of sale, identity and hiring — plus an open API and webhooks for everything else."
        crumbs={[{ label: "Home", to: "/" }, { label: "Integrations" }]}
      />

      <Section tone="white">
        <Tabs tabs={TABS} active={category} onChange={setCategory} label="Integration category" className="mb-10" />

        {integrations.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <Card key={integration.name} className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">
                    {integration.name}
                  </h2>
                  {integration.badge ? <Badge>{integration.badge}</Badge> : null}
                </div>
                <span className="text-xs font-semibold text-ink-faint uppercase">
                  {integration.category}
                </span>
                <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                  {integration.description}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing in that category"
            body="Switch the filter back to All to see every available integration."
          />
        )}
      </Section>

      <CtaBand
        title="Need something custom?"
        body="The Employment Hero API and webhooks let you build against the same employment record the product uses."
        primaryLabel="Talk to sales"
        primaryTo="/request-a-demo"
        secondaryLabel="See pricing"
        secondaryTo="/pricing"
      />
    </PageLayout>
  );
}
