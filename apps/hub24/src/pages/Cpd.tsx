import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { CPD_MODULES } from "@/data/cpd";

export default function CpdPage() {
  return (
    <PageLayout title="CPD education">
      <PageHero
        eyebrow="Professional development"
        title="CPD-accredited education for advisers"
        body="We connect advisers with material from HUB24 and investment managers so you can stay current on strategies, markets and platform capability."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {CPD_MODULES.map((module) => (
            <article key={module.id} className="rounded-hub-lg border border-line p-5">
              <div className="flex flex-wrap gap-2">
                <Badge>{module.topic}</Badge>
                <Badge tone="neutral">{module.format}</Badge>
              </div>
              <h2 className="mt-3 text-lg font-bold">{module.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">
                {module.provider} · {module.hours} hour{module.hours === 1 ? "" : "s"}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
