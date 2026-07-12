import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceGrid } from "@/components/shared/ServiceGrid";
import { dineBenefits } from "@/data/services";

export function DineAndShopPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Dine & Shop" title="Dine & Shop at Changi Airport's Terminals & Jewel" description="Enhance your experience when you dine and shop at Changi with rewards, concierge support, Changi Pay, and seamless collection." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#2f271f]">More dine and shop options</h2>
        <p className="mt-3 text-[#665448]">Enhance your experience when you dine and shop at Changi.</p>
        <div className="mt-8"><ServiceGrid services={dineBenefits} /></div>
      </section>
    </PageLayout>
  );
}
