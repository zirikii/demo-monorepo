import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PersonaHero } from "@/components/marketing/PersonaHero";
import { HappeningsSection } from "@/components/marketing/HappeningsSection";
import { DestinationsSection } from "@/components/marketing/DestinationsSection";

export function HomePage() {
  useDocumentTitle("Airport");
  return (
    <PageLayout>
      <h1 className="sr-only">Welcome to Singapore Changi Airport</h1>
      <PersonaHero />
      <HappeningsSection />
      <DestinationsSection />
    </PageLayout>
  );
}
