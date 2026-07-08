import { useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FormBand } from "../components/shared/FormBand";
import { RechargeForm } from "../components/recharge/RechargeForm";
import { OperatorGrid } from "../components/recharge/OperatorGrid";
import { PlanBrowser } from "../components/recharge/PlanBrowser";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { mobileOperators } from "../data/operators";
import { rechargeFaqs } from "../data/faqs";

const infoSections = [
  {
    heading: "Mobile recharge in seconds",
    paragraphs: [
      "Recharge any prepaid number — Airtel, Jio, Vi, BSNL, or MTNL — by entering the number, picking a plan, and confirming. Saved numbers make repeat recharges a two-tap job, and plan details are always shown before you pay so there are no surprises.",
      "Postpaid users can fetch their latest bill by number and clear it instantly. Every transaction generates a receipt in your history for easy reference.",
    ],
  },
  {
    heading: "Find the right plan without operator hopping",
    paragraphs: [
      "Compare unlimited, data, talktime, and annual packs side by side. Each card lists validity, daily data, calling benefits, and any extras like streaming bundles — so you can pick by value, not guesswork.",
    ],
  },
];

export function MobileRechargePage() {
  useDocumentTitle("Mobile Recharge & Bill Payment");
  const [prefillAmount, setPrefillAmount] = useState("");

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">Mobile recharge and postpaid bill payment</h1>
      <FormBand
        aside={
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Instant recharges, <br /> every operator
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
              Prepaid top-ups and postpaid bills for all major operators, with plans you can browse
              before paying. This demo simulates the payment step.
            </p>
          </div>
        }
      >
        <RechargeForm prefillAmount={prefillAmount} />
      </FormBand>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <OperatorGrid operators={mobileOperators} />
        <PlanBrowser onPickPlan={(price) => setPrefillAmount(String(price))} />
      </div>

      <FaqSection faqs={rechargeFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
