import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PillarPage } from "@/components/sections/PillarPage";
import { WeatherStrip } from "@/components/sections/WeatherStrip";

export function NewsPage() {
  useDocumentTitle("News");
  return (
    <PageLayout>
      <PillarPage pillar="news" sideSlot={<WeatherStrip />} />
    </PageLayout>
  );
}
