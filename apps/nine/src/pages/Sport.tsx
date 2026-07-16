import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PillarPage } from "@/components/sections/PillarPage";
import { LiveScores } from "@/components/sport/LiveScores";

export function SportPage() {
  useDocumentTitle("Sport");
  return (
    <PageLayout>
      <PillarPage pillar="sport" topSlot={<LiveScores />} />
    </PageLayout>
  );
}
