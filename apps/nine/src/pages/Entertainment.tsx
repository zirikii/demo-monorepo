import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PillarPage } from "@/components/sections/PillarPage";
import { ShowsGrid } from "@/components/sections/ShowsGrid";

export function EntertainmentPage() {
  useDocumentTitle("Entertainment");
  return (
    <PageLayout>
      <PillarPage pillar="entertainment" topSlot={<ShowsGrid />} />
    </PageLayout>
  );
}
