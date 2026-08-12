import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";

const TIERS = [
  {
    name: "Referral partner",
    detail: "Introduce a client and we take it from there. Commission on every closed referral.",
    fit: "Accountants and bookkeepers with a small client book",
  },
  {
    name: "Advisory partner",
    detail:
      "Run implementations yourself with partner pricing, a dedicated partner manager and co-marketing.",
    fit: "Practices building a recurring advisory line",
  },
  {
    name: "Managed partner",
    detail:
      "Deliver payroll and HR as a service on Employment Hero, with white-labelled reporting for your clients.",
    fit: "Outsourced payroll bureaus and HR consultancies",
  },
];

export default function PartnerNetworkPage() {
  return (
    <PageLayout title="Partner network">
      <PageHero
        eyebrow="Partner network"
        title="Help your clients save time and stay compliant"
        body="Accountants, bookkeepers, payroll bureaus and HR consultancies build recurring revenue on Employment Hero — and stop firefighting award compliance for their clients."
        crumbs={[{ label: "Home", to: "/" }, { label: "Partner network" }]}
        actions={
          <ButtonLink to="/contact" variant="inverse" size="lg">
            Become a partner
          </ButtonLink>
        }
      />

      <Section tone="white" className="py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          <Stat value="6,400+" label="partner practices" />
          <Stat value="38%" label="average uplift in recurring revenue" />
          <Stat value="1 hour" label="median partner support response" />
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Partner tiers" title="Three ways to work with us" className="mb-10" />
        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((tier) => (
            <Card key={tier.name} className="flex flex-col gap-3">
              <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">{tier.name}</h2>
              <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{tier.detail}</p>
              <p className="rounded-eh bg-eh-tint px-4 py-3 text-sm font-semibold text-eh-purple-dark">
                Best for: {tier.fit}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="What you get" title="Support that respects your practice" />
            <CheckList
              items={[
                "Partner pricing and margin on every client account",
                "A dedicated partner manager and a one-hour support target",
                "Migration templates, comms scripts and a cutover plan",
                "Quarterly compliance briefings across Fair Work, the ATO and state payroll tax",
                "Co-marketing assets and listing in the partner directory",
                "Practice-level reporting across every client you manage",
              ]}
            />
          </div>
          <TestimonialCard
            testimonial={{
              quote:
                "We moved 40 clients across in a quarter. The migration kit did most of the work and our payroll team stopped losing Fridays to award questions.",
              name: "Nadia Fischer",
              role: "Client Services Director",
              company: "Ledgerline Advisory",
            }}
          />
        </div>
      </Section>

      <CtaBand
        title="Ready to join the partner network?"
        body="Tell us about your practice and your client book, and we'll match you to the right tier."
        primaryLabel="Become a partner"
        primaryTo="/contact"
        secondaryLabel="Partner resources"
        secondaryTo="/resources"
      />
    </PageLayout>
  );
}
