import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StatBand } from "@/components/marketing/StatBand";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/data/site";

const LEADERSHIP = [
  { name: "Ben Thompson", role: "Chief Executive Officer & Co-founder" },
  { name: "Dave Tong", role: "Chief Product & Technology Officer & Co-founder" },
  { name: "Alex Hattingh", role: "Chief People Officer" },
  { name: "Kevin Fitzgerald", role: "Managing Director, Asia Pacific" },
];

const HUBS = [
  { city: "Sydney", detail: "Level 2, 441 Kent Street, Sydney NSW 2000 — global headquarters" },
  { city: "Auckland", detail: "Level 4, 4 Graham Street, Auckland 1010" },
  { city: "London", detail: "10 John Street, London WC1N 2EB" },
  { city: "Singapore", detail: "600 North Bridge Road, Parkview Square, Singapore 188778" },
  { city: "Kuala Lumpur", detail: "Level 20, AIA Tower, Capsquare, 50100 Kuala Lumpur" },
];

const TIMELINE = [
  { year: "2014", event: "Founded in Sydney to make employment easier for Australian SMBs." },
  { year: "2018", event: "Payroll joins the platform, bringing award interpretation in-house." },
  { year: "2021", event: "The employment superapp launches for employees." },
  { year: "2022", event: "Reaches unicorn valuation and expands across Asia Pacific and the UK." },
  { year: "2025", event: "Employment OS and Hero AI agents launch; the Work app is rebranded." },
  { year: "2026", event: "HeroForce brings fully managed employment to 180+ countries." },
];

export default function AboutPage() {
  return (
    <PageLayout title="About us">
      <PageHero
        eyebrow="About us"
        title="We're revolutionising the way people work"
        body={`Employment Hero connects and empowers over 350,000 businesses. Our mission is simple: ${SITE.mission.toLowerCase()}`}
        crumbs={[{ label: "Home", to: "/" }, { label: "About us" }]}
      />

      <Section tone="deep" className="py-12 md:py-16">
        <StatBand />
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Our story" title="It started with a badly managed employment relationship" />
            <p className="text-[1.05rem] leading-relaxed text-ink-soft">
              Employment Hero was founded in {SITE.founded} by an employment lawyer who had spent two
              decades watching small businesses get employment wrong — not because they wanted to, but
              because the obligations were scattered across a dozen systems and nobody joined them up.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-ink-soft">
              The first product was a compliant contract generator. The insight that made everything
              else possible was that the contract, the payroll profile, the leave balance and the
              performance record are all views of the same employment relationship — and if you hold
              that relationship in one place, the software can act on it rather than just record it.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-ink-soft">
              That idea became the Employment Operating System, and today it runs employment for more
              than 350,000 businesses and the 2.5 million people who work for them.
            </p>
          </div>
          <ol className="flex flex-col gap-4">
            {TIMELINE.map((entry) => (
              <li key={entry.year} className="flex gap-5 rounded-eh-lg border border-line bg-surface-tint p-5">
                <span className="text-lg font-extrabold text-eh-purple">{entry.year}</span>
                <span className="text-[0.98rem] leading-relaxed text-ink-soft">{entry.event}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Leadership" title="Who runs the place" className="mb-10" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((person) => (
            <Card key={person.name} className="flex flex-col items-start gap-3">
              <Avatar name={person.name} size="lg" />
              <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{person.name}</h3>
              <p className="text-sm text-ink-soft">{person.role}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Hero hubs"
          title="Remote-first, with five places to gather"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HUBS.map((hub) => (
            <Card key={hub.city} className="flex flex-col gap-2">
              <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{hub.city}</h3>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">{hub.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want to work with us?"
        body="We hire across engineering, product, sales and customer teams in every hub and remotely."
        primaryLabel="See open roles"
        primaryTo="/careers"
        secondaryLabel="Read customer stories"
        secondaryTo="/case-studies"
      />
    </PageLayout>
  );
}
