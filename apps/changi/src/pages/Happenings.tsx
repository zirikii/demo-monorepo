import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceGrid } from "@/components/shared/ServiceGrid";
import { WhatsHappening } from "@/components/home/WhatsHappening";
import { airportServices, dineBenefits } from "@/data/services";

export function HappeningsPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Happenings" title="Happenings at Changi Airport: Events, Deals & Promotions" description="Experience Changi through seasonal events, outlet deals, Changi Pay, facilities, lost and found, and Wi-Fi access." />
      <WhatsHappening />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><ServiceGrid services={[dineBenefits[0], dineBenefits[2], airportServices[2], airportServices[4], airportServices[5]]} /></section>
    </PageLayout>
  );
}
