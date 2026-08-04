import { PageLayout } from "@/components/layout/PageLayout";
import { HomeHero } from "@/components/marketing/HomeHero";
import { CategoryGrid } from "@/components/marketing/CategoryGrid";
import { HighlightsRow } from "@/components/marketing/HighlightsRow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("CommBank - bank accounts, credit cards, home loans and insurance (Demo)");
  return (
    <PageLayout>
      <HomeHero />
      <CategoryGrid />
      <HighlightsRow />
    </PageLayout>
  );
}
