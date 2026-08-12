import { useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { integrationCategories, integrations } from "@/data/integrations";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function IntegrationsPage() {
  useDocumentTitle("Integrations");
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All"
      ? integrations
      : integrations.filter((integration) => integration.category === category);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Integrations"
        title="Connect the tools you already pay for."
        blurb="Accounting, identity, communication and recruitment platforms read from the same employment record, so nothing gets re-keyed between systems."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Integrations" }]}
      >
        <Tabs
          items={[
            { id: "All", label: "All" },
            ...integrationCategories.map((item) => ({ id: item, label: item })),
          ]}
          active={category}
          onChange={setCategory}
          ariaLabel="Filter integrations by category"
        />
      </PageHero>

      <Section className="pt-10">
        {filtered.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((integration) => (
              <div
                key={integration.name}
                className="rounded-eh-lg border border-eh-line bg-white p-6 transition hover:border-eh-purple hover:shadow-eh"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-eh bg-eh-purple-tint font-display text-base font-bold text-eh-purple">
                    {integration.name.slice(0, 2)}
                  </span>
                  <div>
                    <h2 className="font-semibold text-eh-ink">{integration.name}</h2>
                    <Badge tone="neutral" className="mt-1">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-eh-ink-soft">
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No integrations in that category yet"
            body="Try another category, or ask us about connecting a tool that is not listed."
          />
        )}
      </Section>

      <CtaBand
        title="Missing an integration you need?"
        blurb="Tell us what you use and we will let you know where it sits on the roadmap."
        primaryLabel="Get in touch"
        primaryTo="/contact"
        secondaryLabel="See pricing"
        secondaryTo="/pricing"
      />
    </SiteLayout>
  );
}
