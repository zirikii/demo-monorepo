import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { CPD_MODULES } from "@/data/insights";
import { formatDate } from "@/lib/format";

const FORMATS = ["All formats", "Webinar", "Course", "Article", "Podcast"] as const;

export default function CpdEducationPage() {
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("All formats");
  const [provider, setProvider] = useState("All providers");

  const providers = useMemo(
    () => ["All providers", ...Array.from(new Set(CPD_MODULES.map((module) => module.provider)))],
    [],
  );

  const modules = CPD_MODULES.filter(
    (module) =>
      (format === "All formats" || module.format === format) &&
      (provider === "All providers" || module.provider === provider),
  );

  const totalHours = modules.reduce((total, module) => total + module.cpdHours, 0);

  return (
    <PageLayout title="CPD education">
      <PageHero
        eyebrow="Professional development"
        title="CPD-accredited education for advisers"
        body="Get the latest professional development, resources and valuable insights for you and your clients — from our technical team and the investment managers on the platform."
        crumbs={[{ label: "Home", to: "/" }, { label: "CPD education" }]}
      />

      <Section tone="tint">
        <div className="grid gap-8 sm:grid-cols-3">
          <Stat value={`${CPD_MODULES.length}`} label="Modules available" />
          <Stat
            value={`${CPD_MODULES.reduce((total, module) => total + module.cpdHours, 0)}`}
            label="Total CPD hours"
          />
          <Stat value={`${providers.length - 1}`} label="Contributing providers" />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Catalogue" title="Filter the catalogue" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
          <Field label="Format" htmlFor="cpd-format">
            <Select
              id="cpd-format"
              value={format}
              onChange={(event) => setFormat(event.target.value as (typeof FORMATS)[number])}
            >
              {FORMATS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Provider" htmlFor="cpd-provider">
            <Select
              id="cpd-provider"
              value={provider}
              onChange={(event) => setProvider(event.target.value)}
            >
              {providers.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <p className="mt-4 text-sm text-ink-faint">
          Showing {modules.length} of {CPD_MODULES.length} modules · {totalHours} CPD hours
        </p>

        {modules.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="No modules match those filters"
            body="Try widening the format or provider selection."
          />
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <Card key={module.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{module.format}</Badge>
                  <Badge tone="neutral">{module.cpdHours} CPD hours</Badge>
                </div>
                <CardHeading>{module.title}</CardHeading>
                <CardBody className="flex-1">{module.summary}</CardBody>
                <div className="flex flex-wrap gap-1.5 border-t border-line pt-3">
                  {module.areas.map((area) => (
                    <span key={area} className="text-xs text-ink-faint">
                      {area}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-ink-ghost">
                  {module.provider} · {formatDate(module.published)}
                </p>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <CtaBand
        eyebrow="Investment managers"
        title="Want to contribute CPD material?"
        body="Through our professional development page we connect advisers with the latest CPD-accredited material from the investment managers on the platform."
        primary={{ label: "Contact us", to: "/contact-us/" }}
        secondary={{ label: "HUB24 for investment managers", to: "/hub24-for-investment-managers/" }}
      />
    </PageLayout>
  );
}
