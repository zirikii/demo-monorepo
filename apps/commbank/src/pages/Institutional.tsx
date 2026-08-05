import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { NewsTeasers } from "@/components/marketing/NewsTeasers";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const capabilities = [
  {
    id: "markets",
    title: "Global markets",
    body: "Foreign exchange, interest rate and commodity risk management, backed by research from CommBank Economics.",
  },
  {
    id: "transaction-banking",
    title: "Transaction banking",
    body: "Domestic and cross-border payments, liquidity management, and API-based integration with your ERP.",
  },
  {
    id: "capital-markets",
    title: "Capital markets",
    body: "Debt origination and syndication across corporate, financial institution and government issuers.",
  },
  {
    id: "sustainable",
    title: "Sustainable finance",
    body: "Green, social and sustainability-linked loans and bonds, with reporting aligned to market frameworks.",
  },
];

const industries = [
  "Resources & energy",
  "Infrastructure",
  "Property",
  "Government",
  "Financial institutions",
  "Agriculture",
  "Health & education",
  "Technology",
];

export function InstitutionalPage() {
  useDocumentTitle("Institutional");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Institutional" }]} />
      <PageHero
        tone="dark"
        eyebrow="Institutional"
        title="Institutional Banking and Markets"
        intro="Working with corporate, government and institutional clients across Australia, New Zealand, Asia, Europe and North America."
      >
        <ButtonLink to="/support/contact-us" variant="primary">
          Contact our team
        </ButtonLink>
        <ButtonLink to="/newsroom" variant="secondary">
          Economic insights
        </ButtonLink>
      </PageHero>

      <Section title="Capabilities">
        <div className="grid gap-6 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <div
              key={capability.id}
              id={capability.id}
              className="scroll-mt-28 rounded-cba-lg border border-line-soft p-6"
            >
              <h3 className="text-lg font-bold text-ink">{capability.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{capability.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="industries" tone="tint" title="Industries we serve">
        <ul className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <li
              key={industry}
              className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink"
            >
              {industry}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Scale that supports complex mandates">
        <dl className="grid gap-6 sm:grid-cols-3">
          {[
            { value: "$1.25tn", label: "Total assets" },
            { value: "17.6m", label: "Customers" },
            { value: "AA−", label: "Long-term credit rating" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-cba-lg bg-ink p-8 text-surface">
              <dt className="text-[13px] uppercase tracking-wider text-surface/60">{stat.label}</dt>
              <dd className="mt-2 text-4xl font-extrabold text-cba-yellow">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[13px] text-ink-faint">
          Illustrative demo figures based on publicly reported group metrics.
        </p>
      </Section>

      <NewsTeasers limit={3} />
      <HelpBlock />
    </PageLayout>
  );
}
