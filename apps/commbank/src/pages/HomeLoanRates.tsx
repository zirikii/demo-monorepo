import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { RepaymentsCalculator } from "@/components/calculators/RepaymentsCalculator";
import { ButtonLink } from "@/components/ui/Button";
import { RateTable } from "@/components/ui/RateTable";
import { homeLoanRates } from "@/data/rates";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomeLoanRatesPage() {
  useDocumentTitle("Home loan interest rates");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Home loans", to: "/home-loans" }, { label: "Interest rates" }]}
      />
      <PageHero
        eyebrow="Home loans"
        title="Home loan interest rates"
        intro="Current rates for new borrowings across our variable and fixed rate home loans. Rates shown are illustrative demo values and are subject to change."
      >
        <ButtonLink to="/home-loans/types" variant="dark">
          Compare loan types
        </ButtonLink>
        <ButtonLink to="/rates-and-fees" variant="secondary">
          All rates & fees
        </ButtonLink>
      </PageHero>

      <Section title="Current rates">
        <div className="space-y-12">
          {homeLoanRates.map((group) => (
            <RateTable key={group.id} group={group} />
          ))}
        </div>
      </Section>

      <Section tone="tint" title="What would that cost me?">
        <RepaymentsCalculator />
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "Rates apply to new lending only and may include a margin below or above the applicable reference rate.",
          "Wealth Package benefits apply to eligible home loans or lines of credit. A non-refundable annual fee of $395 is payable in advance.",
          "Comparison rate calculated on a $150,000 secured loan over a 25 year term. WARNING: a comparison rate is true only for the examples given and may not include all fees and charges.",
          "Information provided, including interest rates, is subject to change.",
        ]}
      />
    </PageLayout>
  );
}
