import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ButtonLink } from "@/components/ui/Button";
import { RateTable } from "@/components/ui/RateTable";
import { cardAndLoanRates, feeSchedule, homeLoanRates, savingsRates } from "@/data/rates";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function RatesAndFeesPage() {
  useDocumentTitle("Rates & fees");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Rates & fees" }]} />
      <PageHero
        eyebrow="Rates & calculators"
        title="Rates & fees"
        intro="Current interest rates and fees across savings, home loans, credit cards and personal lending. All figures are illustrative demo values."
      >
        <ButtonLink to="/tools-and-calculators" variant="dark">
          Tools & calculators
        </ButtonLink>
        <ButtonLink to="/home-loans/rates" variant="secondary">
          Home loan rates
        </ButtonLink>
      </PageHero>

      <Section title="Savings and Term Deposits">
        <div className="space-y-12">
          {savingsRates.map((group) => (
            <RateTable key={group.id} group={group} />
          ))}
        </div>
      </Section>

      <Section tone="tint" title="Home loans">
        <div className="space-y-12">
          {homeLoanRates.map((group) => (
            <RateTable key={group.id} group={group} />
          ))}
        </div>
      </Section>

      <Section title="Cards and personal lending">
        <div className="space-y-12">
          {cardAndLoanRates.map((group) => (
            <RateTable key={group.id} group={group} />
          ))}
        </div>
      </Section>

      <Section tone="tint" title="Everyday fees">
        <div className="space-y-12">
          {feeSchedule.map((group) => (
            <RateTable key={group.id} group={group} />
          ))}
        </div>
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "Information provided, including interest rates and fees, is subject to change.",
          "Comparison rates are calculated on a $150,000 secured loan over a 25 year term. WARNING: a comparison rate is true only for the examples given.",
          "All rates on this page are fictional demo values and should not be relied upon.",
        ]}
      />
    </PageLayout>
  );
}
