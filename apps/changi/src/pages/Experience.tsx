import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Card } from "@/components/ui/Card";
import { attractions } from "@/data/services";

export function ExperiencePage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Experience" title="Experience Changi Airport: Attractions, Events & Tours" description="Discover gardens, immersive installations, and memorable terminal attractions before, after, or between flights." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between"><h2 className="text-3xl font-bold">Attractions</h2><span className="text-sm font-bold text-[#806d5d]">View all</span></div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {attractions.map((item) => <Card key={item.title}><h3 className="text-2xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#665448]">{item.description}</p></Card>)}
        </div>
      </section>
    </PageLayout>
  );
}
