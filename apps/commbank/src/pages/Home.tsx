import { PageLayout } from "@/components/layout/PageLayout";
import { HomeHero } from "@/components/home/HomeHero";
import { QuickLinks } from "@/components/home/QuickLinks";
import { ProductGrid } from "@/components/home/ProductGrid";
import { YelloPromo } from "@/components/home/YelloPromo";
import { AppPromo } from "@/components/home/AppPromo";
import { NewsStrip } from "@/components/home/NewsStrip";
import { HelpSection } from "@/components/marketing/HelpSection";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("");

  return (
    <PageLayout>
      <HomeHero />
      <QuickLinks />
      <ProductGrid />
      <YelloPromo />
      <AppPromo />
      <NewsStrip />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Rates and offers shown on this page are illustrative and were fabricated for this demo.
          Applications for credit are subject to approval in the real world.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
