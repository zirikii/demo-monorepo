import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { LoanCalculator } from "@/components/banking/LoanCalculator";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function CalculatorsPage() {
  useDocumentTitle("Tools & calculators");
  return (
    <PageLayout>
      <PageHero
        eyebrow="Tools"
        title="Tools & calculators"
        summary="Plan home loan and personal loan repayments with demo maths."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6">
        <LoanCalculator title="Home loan calculator" />
        <LoanCalculator title="Personal loan calculator" defaultPrincipal={25000} defaultRate={9.99} defaultYears={5} />
      </div>
    </PageLayout>
  );
}
