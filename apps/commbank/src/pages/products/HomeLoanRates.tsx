import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { RateTable } from "@/components/ui/RateTable";
import { Tabs } from "@/components/ui/Tabs";
import { ButtonLink } from "@/components/ui/Button";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  investmentFixedRates,
  investmentVariableRates,
  ownerOccupiedFixedRates,
  ownerOccupiedVariableRates,
} from "@/data/homeLoans";

const purposeOptions = [
  { id: "owner-occupied" as const, label: "Owner Occupied" },
  { id: "investment" as const, label: "Investment" },
];

type Purpose = (typeof purposeOptions)[number]["id"];

const packageBenefits = [
  "Save a minimum of 0.70% p.a. on a Standard Variable Rate home loan",
  "Save a minimum of 0.15% p.a. on Fixed Rate home loans",
  "$0 annual or monthly fees on one eligible credit card",
  "A non-refundable $395 annual package fee is payable in advance",
];

export function HomeLoanRatesPage() {
  useDocumentTitle("Home loan interest rates");
  const [purpose, setPurpose] = useState<Purpose>("owner-occupied");

  const variableRows =
    purpose === "owner-occupied" ? ownerOccupiedVariableRates : investmentVariableRates;
  const fixedRows = purpose === "owner-occupied" ? ownerOccupiedFixedRates : investmentFixedRates;
  const purposeLabel = purpose === "owner-occupied" ? "Owner Occupied" : "Investment";

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Home loans", to: "/home-loans" }, { label: "Interest rates" }]}
      />
      <PageHero
        eyebrow="Home loans"
        title="Home loan interest rates"
        description="Current rates for new borrowings, with and without Wealth Package discounts, by loan purpose and loan to value ratio."
        tone="light"
      />

      <section className="py-14">
        <div className="container-page">
          <Tabs
            options={purposeOptions}
            value={purpose}
            onChange={setPurpose}
            ariaLabel="Loan purpose"
          />

          <div className="mt-8 space-y-10">
            <RateTable
              caption={`Variable rates for new borrowings — ${purposeLabel}`}
              rows={variableRows}
            />
            <RateTable
              caption={`Fixed rates for new borrowings — ${purposeLabel}`}
              rows={fixedRows}
            />
          </div>
        </div>
      </section>

      <section
        id="wealth-package"
        className="scroll-mt-28 border-y border-line bg-surface-tint py-16"
      >
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Wealth Package"
              title="Interest rate discounts and fee waivers"
              description="For a non-refundable $395 annual fee, the Wealth Package gives you a discounted rate on eligible home loans plus a fee waiver on one eligible credit card."
            />
            <div className="mt-7">
              <ButtonLink to="/home-loans/calculator">See what you&apos;d repay</ButtonLink>
            </div>
          </div>
          <Card>
            <h3 className="text-base font-bold text-black">Package benefits</h3>
            <ul className="mt-4 space-y-2.5">
              {packageBenefits.map((benefit) => (
                <li key={benefit} className="text-sm text-ink-soft">
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Comparison rates are calculated on a $150,000 secured loan over a 25 year term. Warning:
          the comparison rate is true only for the example given and may not include all fees and
          charges. Different terms, fees or loan amounts might result in a different comparison
          rate.
        </p>
        <p>
          At the end of a fixed rate period the interest rate converts to the applicable Standard
          Variable Rate relevant to your loan purpose and repayment type at that time.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
