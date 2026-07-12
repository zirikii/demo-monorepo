import { CookieBanner } from "@/components/layout/CookieBanner";
import { PageLayout } from "@/components/layout/PageLayout";
import { AppPromo } from "@/components/shared/AppPromo";
import { AssuranceStrip } from "@/components/home/AssuranceStrip";
import { DestinationGrid } from "@/components/home/DestinationGrid";
import { DirectionTabs } from "@/components/home/DirectionTabs";
import { WhatsHappening } from "@/components/home/WhatsHappening";

export function HomePage() {
  return (
    <PageLayout>
      <DirectionTabs />
      <WhatsHappening />
      <DestinationGrid />
      <AssuranceStrip />
      <section className="px-4 pb-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><AppPromo /></div></section>
      <CookieBanner />
    </PageLayout>
  );
}
