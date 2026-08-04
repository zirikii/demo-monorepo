import { Check } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { investingProducts } from "@/data/insurance";

export function InvestingSuperPage() {
  useDocumentTitle("Investing & Super");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Investing & Super" }]} />
      <PageHero
        eyebrow="Investing & Super"
        title="Grow your wealth and keep an eye on your super"
        description="Trade shares with CommSec, invest in ETFs and managed funds, and see your Essential Super balance alongside your everyday banking."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Investing and superannuation" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {investingProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                as="article"
                className="flex h-full flex-col scroll-mt-28"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-black">{product.name}</h3>
                  <Badge tone="neutral">{product.priceLabel}</Badge>
                </div>
                <p className="text-sm font-medium text-ink-muted">{product.tagline}</p>
                <p className="mt-3 text-sm text-ink-soft">{product.description}</p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {product.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-ink-soft">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <ButtonLink to="/support">Find out more</ButtonLink>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          In the real world, Essential Super is issued by Colonial First State as trustee, and
          CommSec is a wholly owned but non-guaranteed subsidiary of CommBank. Investments can go
          down as well as up.
        </p>
        <p>
          Nothing on this page is financial advice. All fees, rates and product details are demo
          content.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
