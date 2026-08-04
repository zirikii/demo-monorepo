import { Check } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { HelpSection } from "@/components/marketing/HelpSection";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { institutionalServices } from "@/data/insurance";

const stats = [
  { value: "24 hours", label: "Trading desks across Sydney, London and New York" },
  { value: "200+", label: "Countries reachable through our payments network" },
  { value: "AA-", label: "Long-term issuer credit rating (illustrative)" },
];

export function InstitutionalPage() {
  useDocumentTitle("Institutional banking");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Institutional" }]} />
      <PageHero
        eyebrow="Institutional"
        title="Institutional banking and markets"
        description="Global markets, transaction banking, capital markets and sustainable finance for corporate, government and institutional clients."
        tone="black"
        actions={
          <ButtonLink to="/support" size="lg">
            Speak to our team
          </ButtonLink>
        }
      />

      <section className="border-b border-line py-12">
        <div className="container-page">
          <dl className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t-2 border-cba-yellow pt-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-bold text-black">{stat.value}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="What we do" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {institutionalServices.map((service) => (
              <Card key={service.id} id={service.id} as="article" className="scroll-mt-28">
                <h3 className="text-lg font-bold text-black">{service.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{service.description}</p>
                <ul className="mt-4 space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-ink-soft">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Institutional products and services would be offered to wholesale clients only. All
          figures on this page are demo content and do not represent real capability or ratings.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
