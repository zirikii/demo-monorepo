import { Building2, Factory, Sun } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const segments = [
  { id: "small", Icon: Building2, title: "Small business", body: "Energy plans for businesses using under 100MWh a year, with bill credits for new customers." },
  { id: "large", Icon: Factory, title: "Large business", body: "Tailored electricity and gas contracts, demand response and energy data for multi-site operations." },
  { id: "solar", Icon: Sun, title: "Business solar", body: "Commercial solar, batteries and power purchase agreements designed around your load." },
];

export function BusinessPage() {
  useDocumentTitle("Business energy");
  return (
    <PageLayout>
      <PageHero tone="blue" crumbs={[{ label: "Business" }]} eyebrow="Business" title="Energy that works as hard as you do" intro="From cafés to manufacturing plants, we help Australian businesses manage cost and carbon." />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {segments.map(({ id, Icon, title, body }) => (
            <article key={id} id={id} className="rounded-agl-lg border border-line-soft p-6">
              <Icon className="h-8 w-8 text-agl-blue" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-extrabold text-ink">{title}</h2>
              <p className="mt-1 text-ink-soft">{body}</p>
            </article>
          ))}
        </div>
        <ButtonLink to="/contact-us" className="mt-8">
          Talk to a business specialist
        </ButtonLink>
      </Section>
    </PageLayout>
  );
}
