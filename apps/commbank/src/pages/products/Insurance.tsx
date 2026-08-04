import { Check } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { insuranceProducts } from "@/data/insurance";

export function InsurancePage() {
  useDocumentTitle("Insurance");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Insurance" }]} />
      <PageHero
        eyebrow="Insurance"
        title="Protect your home, car, travel and the people who rely on you"
        description="Insurance products distributed by CommBank and issued by our specialist insurance partners."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Our insurance products" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {insuranceProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                as="article"
                className="flex h-full flex-col scroll-mt-28"
              >
                <h3 className="text-lg font-bold text-black">{product.name}</h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">{product.tagline}</p>
                <p className="mt-3 text-sm text-ink-soft">{product.description}</p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {product.coverPoints.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-ink-soft">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {product.fromPrice ? (
                  <p className="mt-4 text-sm font-semibold text-black">{product.fromPrice}</p>
                ) : null}
                <div className="mt-5">
                  <ButtonLink to="/support">Get a quote</ButtonLink>
                </div>
                <p className="mt-4 border-t border-line pt-3 text-xs text-ink-muted">
                  {product.issuer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          In the real world, Home, Landlord and Car Insurance are issued by Hollard Insurance
          Partners Limited; Travel Insurance by Zurich Australian Insurance Limited through
          Cover-More; Life Insurance by AIA Australia; and Pet Insurance by PetSure. CommBank
          distributes rather than issues these products.
        </p>
        <p>
          Always read the Product Disclosure Statement, Premium, Excess and Discount Guide, Key
          Facts Sheet and Financial Services Guide before making a decision. This page is demo
          content and is not an offer of insurance.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
