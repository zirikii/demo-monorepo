import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AwardsSection } from "@/components/marketing/AwardsSection";

const timeline = [
  { year: "2010", body: "Gojek starts as a call centre connecting 20 ojek (motorbike taxi) drivers." },
  { year: "2015", body: "The Gojek app launches, bringing rides, delivery and payments together." },
  { year: "2016", body: "GoPay is introduced, accelerating the shift to cashless in Indonesia." },
  { year: "2018", body: "Gojek expands beyond Indonesia into Southeast Asia." },
  { year: "2021", body: "Gojek and Tokopedia merge to form the GoTo Group." },
  { year: "2024", body: "20+ products serve millions of customers across the region." },
];

const values = [
  { title: "Speed", body: "We move fast, ship, learn and iterate — bias to action." },
  { title: "Impact", body: "We measure success by the lives we improve, not vanity metrics." },
  { title: "Innovation", body: "We solve hard problems with technology built for our streets." },
];

export function AboutPage() {
  return (
    <PageLayout title="About — Gojek (Demo)">
      <PageHero
        eyebrow="About"
        title="Driven by a social mission since 2010"
        description="Gojek began by helping ojek drivers find more passengers. Today it's a super-app improving livelihoods across Southeast Asia."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Our journey" title="From 20 drivers to a super-app" />
          <ol className="mt-10 space-y-6 border-l-2 border-line pl-6">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-gojek" />
                <p className="text-sm font-bold text-gojek">{item.year}</p>
                <p className="mt-1 max-w-2xl leading-relaxed text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What we value" title="How we work" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-line bg-card p-6">
                <h3 className="text-lg font-bold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <AwardsSection />

      <section id="help" className="scroll-mt-20 py-16">
        <Container>
          <div className="rounded-3xl border border-line bg-card p-8 sm:p-12">
            <SectionHeading
              eyebrow="Help"
              title="Need a hand?"
              description="This is a demo, so support links are illustrative. In the real Gojek app, help is available 24/7 for consumers, drivers and merchants."
            />
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
