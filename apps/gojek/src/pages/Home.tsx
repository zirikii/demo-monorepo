import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Hero } from "@/components/marketing/Hero";
import { TechPowersSection } from "@/components/marketing/TechPowersSection";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { PartnersSection } from "@/components/marketing/PartnersSection";
import { StatsBand } from "@/components/marketing/StatsBand";
import { AwardsSection } from "@/components/marketing/AwardsSection";
import { Testimonials } from "@/components/marketing/Testimonials";
import { CareersTeaser } from "@/components/marketing/CareersTeaser";
import { DownloadApp } from "@/components/marketing/DownloadApp";
import { ecosystemStats } from "@/data/stats";

export function HomePage() {
  return (
    <PageLayout title="Gojek — 3 countries. 20+ products. (Demo)">
      <Hero />
      <TechPowersSection />
      <ProductShowcase />

      <section className="bg-gojek py-16 text-white sm:py-20">
        <Container>
          <SectionHeading
            title={<span className="text-white">An ecosystem that lifts everyone</span>}
            description={
              <span className="text-white/80">
                Every ride, order and payment supports millions of partners across the region.
              </span>
            }
          />
          <div className="mt-10">
            <StatsBand stats={ecosystemStats} tone="green" />
          </div>
        </Container>
      </section>

      <PartnersSection />
      <Testimonials />
      <AwardsSection />
      <CareersTeaser />
      <DownloadApp />
    </PageLayout>
  );
}
