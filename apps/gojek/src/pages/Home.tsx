import { JoinUsBand } from "@/components/layout/JoinUsBand";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/marketing/Hero";
import { OssGrid } from "@/components/marketing/OssGrid";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { StatStack } from "@/components/marketing/StatStack";
import { SITE } from "@/data/site";

export default function HomePage() {
  return (
    <PageLayout title={SITE.tagline}>
      <Hero />
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">{SITE.techPowers}</h2>
          <p className="mt-6 max-w-2xl text-lg text-go-muted">{SITE.joinBand}</p>
        </div>
      </section>
      <ProductShowcase />
      <OssGrid />
      <StatStack />
      <JoinUsBand />
    </PageLayout>
  );
}
