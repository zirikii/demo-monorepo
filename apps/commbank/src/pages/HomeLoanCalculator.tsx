import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { LoanCalculator } from "@/components/banking/LoanCalculator";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomeLoanCalculatorPage() {
  useDocumentTitle("Home loan calculator");
  return (
    <PageLayout>
      <PageHero
        eyebrow="Home loans"
        title="Home loan calculator"
        summary="Estimate repayments with demo rates. Not a credit decision or offer."
        primaryCta={{ label: "Talk to us", to: "/contact" }}
        secondaryCta={{ label: "Buying a home", to: "/home-loans/buying" }}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <LoanCalculator />
      </div>
    </PageLayout>
  );
}
