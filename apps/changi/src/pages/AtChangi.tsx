import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceGrid } from "@/components/shared/ServiceGrid";
import { Card } from "@/components/ui/Card";
import { airportServices } from "@/data/services";

export function AtChangiPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="At Changi" title="Changi Airport Guide: Terminal Maps & Facilities" description="Explore terminals, services, transport, free Wi-Fi, lost and found, and wayfinding across Changi Airport.">
        <Card><h2 className="text-2xl font-bold">Find your way</h2><p className="mt-3 text-sm leading-6 text-[#665448]">Travel to, from, and within Changi Airport with ease using comprehensive transport guides.</p></Card>
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Airport Services</h2>
        <div className="mt-8"><ServiceGrid services={airportServices} /></div>
      </section>
    </PageLayout>
  );
}
