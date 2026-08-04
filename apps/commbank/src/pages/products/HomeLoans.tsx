import { Link } from "react-router-dom";
import { ArrowRight, Clock, LifeBuoy, Trophy } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { Card, SectionHeading } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { homeLoanFaqs, homeLoanProducts, lifeStages } from "@/data/homeLoans";
import { formatRate } from "@/lib/format";

const reasons = [
  {
    Icon: Trophy,
    title: "Helping you into your first home sooner",
    description:
      "Awarded Canstar's Bank of the Year for First Home Buyers and Digital Banking in 2025, with flexible features to suit your needs.",
  },
  {
    Icon: Clock,
    title: "Fast conditional approval",
    description:
      "Eligible customers receive conditional approval in as little as 10 minutes when they apply online.",
  },
  {
    Icon: LifeBuoy,
    title: "Support at every step",
    description:
      "Expert guides, calculators, and help with government grants and schemes — all designed to make your journey easier.",
  },
];

export function HomeLoansPage() {
  useDocumentTitle("Home loans");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Home loans" }]} />
      <PageHero
        eyebrow="Limited time offer"
        title="Earn up to 300,000 Qantas Points"
        description="Enjoy our low variable rate, unlimited additional repayments and the option to link one offset account with a CommBank Digi Home Loan. Apply online by 30 September 2026 and settle by 31 December 2026."
        actions={
          <>
            <ButtonLink to="/register" variant="secondary" size="lg">
              Get started
            </ButtonLink>
            <ButtonLink to="/home-loans/calculator" variant="outline" size="lg">
              Calculate repayments
            </ButtonLink>
          </>
        }
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Why choose CommBank?" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reasons.map(({ Icon, title, description }) => (
              <Card key={title}>
                <Icon aria-hidden="true" className="mb-3 h-6 w-6 text-black" />
                <h3 className="text-lg font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading
            title="Choose a home loan that's right for you"
            description="Compare the rate, offset options and features of each loan."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {homeLoanProducts.map((loan) => (
              <ProductCard
                key={loan.id}
                id={loan.id}
                name={loan.name}
                tagline={loan.tagline}
                headline={formatRate(loan.variableRate)}
                headlineLabel={`Comparison rate ${formatRate(loan.comparisonRate)}`}
                features={loan.features}
                badge={loan.badge}
                ctaLabel="Apply online"
                ctaTo="/register"
                footnote={loan.offsetAccounts}
              />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/home-loans/rates" variant="outline">
              See all home loan rates
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            title="Explore different life stages"
            description="Whatever stage you're at, there's a path into your next property."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {lifeStages.map((stage) => (
              <li key={stage.id} id={stage.id} className="scroll-mt-28">
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg font-bold text-black">{stage.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{stage.description}</p>
                  <Link
                    to="/home-loans/calculator"
                    className="focus-ring mt-5 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-black hover:underline"
                  >
                    {stage.linkLabel}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="container-page">
          <SectionHeading title="Frequently asked questions" />
          <Accordion
            className="mt-8"
            items={homeLoanFaqs.map((faq) => ({
              id: faq.question,
              title: faq.question,
              content: faq.answer,
            }))}
          />
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Comparison rates are calculated on a $150,000 secured loan over a 25 year term. Warning:
          the comparison rate is true only for the example given and may not include all fees and
          charges.
        </p>
        <p>
          Wealth Package benefits carry a non-refundable $395 annual fee payable in advance.
          Approval and loan limits would be subject to credit assessment.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
