import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PillarPage } from "@/components/sections/PillarPage";

export function TravelPage() {
  useDocumentTitle("Travel");
  return (
    <PageLayout>
      <PillarPage pillar="travel" />
    </PageLayout>
  );
}
