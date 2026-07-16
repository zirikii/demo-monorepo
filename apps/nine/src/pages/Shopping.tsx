import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PillarPage } from "@/components/sections/PillarPage";
import { DealsGrid } from "@/components/sections/DealsGrid";

export function ShoppingPage() {
  useDocumentTitle("Shopping");
  return (
    <PageLayout>
      <PillarPage pillar="shopping" topSlot={<DealsGrid />} />
    </PageLayout>
  );
}
