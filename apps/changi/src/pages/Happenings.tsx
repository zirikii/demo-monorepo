import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { HappeningsSection } from "@/components/marketing/HappeningsSection";

export function HappeningsPage() {
  useDocumentTitle("Happenings");
  return (
    <PageLayout>
      <PageHero
        title="Happenings"
        subtitle="Seasonal events, outlet deals, and limited-time collaborations."
        crumbs={[{ label: "Happenings" }]}
      />
      <HappeningsSection />
    </PageLayout>
  );
}
