import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatsBand } from "@/components/marketing/StatsBand";
import { platformStats } from "@/data/stats";

export function TechPowersSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our tech powers Southeast Asia"
          title="Built for scale, from the streets of Jakarta to the region"
          description="One platform connects consumers, driver-partners and merchants across the region — reliably, at massive scale, every single day."
        />
        <div className="mt-12 rounded-3xl border border-line bg-surface p-8 sm:p-12">
          <StatsBand stats={platformStats} />
        </div>
      </Container>
    </section>
  );
}
