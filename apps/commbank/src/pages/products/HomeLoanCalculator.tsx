import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RepaymentCalculator } from "@/components/tools/RepaymentCalculator";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Card";
import { HelpSection } from "@/components/marketing/HelpSection";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomeLoanCalculatorPage() {
  useDocumentTitle("Home loan repayments calculator");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Home loans", to: "/home-loans" }, { label: "Repayments calculator" }]}
      />
      <PageHero
        eyebrow="Calculator"
        title="Home loan repayments calculator"
        description="Work out what your repayments could be, how much interest you'd pay, and how the numbers change with a different rate, term or frequency."
        tone="light"
      />

      <section className="py-14">
        <div className="container-page">
          <RepaymentCalculator />
        </div>
      </section>

      <section className="border-t border-line bg-surface-tint py-14">
        <div className="container-page">
          <SectionHeading
            title="Ready for the next step?"
            description="Start your application online and, if eligible, receive conditional approval in minutes."
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/register">Apply online</ButtonLink>
            <ButtonLink to="/home-loans/rates" variant="outline">
              Compare rates
            </ButtonLink>
            <ButtonLink to="/tools-and-calculators" variant="outline">
              More calculators
            </ButtonLink>
          </div>
        </div>
      </section>

      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Calculations are estimates provided as a guide only. They assume interest rates don&apos;t
          change over the life of the loan and exclude fees, charges, stamp duty and Lenders&apos;
          Mortgage Insurance. Calculations are not a loan approval.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
