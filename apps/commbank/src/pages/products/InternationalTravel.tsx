import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { FxCalculator } from "@/components/tools/FxCalculator";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { travelProducts } from "@/data/fx";
import { Check } from "lucide-react";

export function InternationalTravelPage() {
  useDocumentTitle("International & travel");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Banking", to: "/banking" }, { label: "International & travel" }]}
      />
      <PageHero
        eyebrow="International & travel"
        title="Travel products, overseas payments and exchange rates"
        description="Send money to more than 200 countries, load up to 13 currencies onto a Travel Money Card, and check the rate before you go."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Travel products & services" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {travelProducts.map((product) => (
              <Card key={product.id} id={product.id} as="article" className="scroll-mt-28">
                <h3 className="text-lg font-bold text-black">{product.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{product.description}</p>
                <ul className="mt-4 space-y-2.5">
                  {product.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-ink-soft">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="fx" className="scroll-mt-28 border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Foreign exchange calculator"
            title="Check the exchange rate"
            description="Convert Australian dollars into more than 10 currencies at indicative retail rates."
            className="mb-10"
          />
          <FxCalculator />
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Exchange rates in this demo are static and do not reflect live currency markets. In the
          real world, retail rates change throughout the day and include a margin.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
