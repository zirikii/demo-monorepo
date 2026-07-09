import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Stat } from "../components/ui/Stat";
import { SuccessModal } from "../components/shared/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";
import { insuranceProducts } from "../data/finance";
import { insuranceFaqs } from "../data/faqs";
import { formatInr } from "../lib/format";
import { useState } from "react";

const infoSections = [
  {
    heading: "Insurance ka super market",
    paragraphs: [
      "Compare plans from leading insurers with transparent premiums and coverage summaries in plain language. Buy in minutes with digital KYC, store policies in one vault, and lean on claim support when it matters most. Premiums shown here are illustrative demo figures.",
    ],
  },
];

export function InsurancePage() {
  useDocumentTitle("Insurance Marketplace");
  const [pickedPlan, setPickedPlan] = useState(insuranceProducts[0].name);
  const success = useDisclosure();

  return (
    <PageLayout>
      <PageHero
        title={
          <>
            Insurance ka <span className="text-paytm-cyan">Super Market</span>
          </>
        }
        subtitle="A smart, simple, and transparent way to explore and purchase bike, car, health, term, and travel insurance."
      />

      <section aria-label="Platform stats" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-card p-8 shadow-card sm:grid-cols-4">
          <Stat value="45+" label="insurer partners" />
          <Stat value="3 min" label="average purchase time" />
          <Stat value="97%" label="claim-support satisfaction" />
          <Stat value="24x7" label="assistance helpline" />
        </div>
      </section>

      <section aria-label="Insurance plans" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceProducts.map((plan) => (
            <li key={plan.id} className="flex flex-col rounded-2xl bg-card p-6 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <Badge tone="cyan">{plan.category}</Badge>
                <p className="text-xs text-ink-faint">{plan.coverage}</p>
              </div>
              <h2 className="mt-3 text-base font-bold text-ink">{plan.name}</h2>
              <p className="mt-1 text-sm text-ink-soft">
                from{" "}
                <span className="text-lg font-extrabold text-paytm-navy">
                  {formatInr(plan.premiumFrom)}
                </span>
                <span className="text-xs">{plan.premiumUnit}</span>
              </p>
              <ul className="mt-3 flex-1 space-y-1.5">
                {plan.bullets.map((b) => (
                  <li key={b} className="text-xs text-ink-soft">
                    • {b}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-5"
                variant="outline"
                onClick={() => {
                  setPickedPlan(plan.name);
                  success.open();
                }}
              >
                Get Quote
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <FaqSection faqs={insuranceFaqs} />
      <SeoTextBlock sections={infoSections} />

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title="Quote Requested"
        lines={[
          { label: "Plan", value: pickedPlan },
          { label: "Status", value: "Quote generated (simulated)" },
          { label: "Note", value: "Demo — no policy is issued" },
        ]}
      />
    </PageLayout>
  );
}
