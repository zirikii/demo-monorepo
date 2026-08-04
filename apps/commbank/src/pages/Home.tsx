import { PageLayout } from "@/components/layout/PageLayout";
import { AppPromo } from "@/components/marketing/AppPromo";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { HeroCarousel } from "@/components/marketing/HeroCarousel";
import { LifeStages } from "@/components/marketing/LifeStages";
import { NewsTeasers } from "@/components/marketing/NewsTeasers";
import { QuickLinks } from "@/components/marketing/QuickLinks";
import { SecurityStrip } from "@/components/marketing/SecurityStrip";
import { Section } from "@/components/layout/Section";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProductsByCategory } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Bank accounts, credit cards, home loans and insurance");
  const featured = getProductsByCategory("Bank accounts").slice(0, 3);

  return (
    <PageLayout>
      <HeroCarousel />
      <QuickLinks />

      <Section
        tone="tint"
        title="Popular everyday and savings accounts"
        intro="Whether you're spending day to day or growing a balance, choose the account that matches how you plan to use your money."
      >
        <ProductGrid products={featured} />
      </Section>

      <AppPromo />
      <LifeStages />
      <SecurityStrip />
      <NewsTeasers />
      <HelpBlock />
    </PageLayout>
  );
}
