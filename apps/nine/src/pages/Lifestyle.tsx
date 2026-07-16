import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PillarPage } from "@/components/sections/PillarPage";

export function LifestylePage() {
  useDocumentTitle("Lifestyle");
  return (
    <PageLayout>
      <PillarPage pillar="lifestyle" />
    </PageLayout>
  );
}
