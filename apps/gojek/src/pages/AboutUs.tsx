import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Card, CardBody } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatTile } from "@/components/ui/StatTile";
import { IMPACT_STATS, LEADERS, OFFICES, TIMELINE } from "@/data/culture";
import { formatNumber, initials } from "@/lib/format";

export default function AboutUsPage() {
  return (
    <PageLayout title="About us">
      <PageHero
        eyebrow="About us"
        title="A call centre with twenty riders, sixteen years ago"
        body="We started by answering a phone and dispatching motorbike couriers around Jakarta. The platform underneath that idea now carries a substantial share of a country's daily errands."
      />

      <Section width="wide">
        <SectionHeading
          eyebrow="Impact"
          title="What the platform carries today"
          body="Every number here is dummy data for this demo, sized to be plausible rather than accurate."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((stat) => (
            <StatTile key={stat.label} value={stat.value} label={stat.label} detail={stat.detail} />
          ))}
        </div>
      </Section>

      <Section tone="tint" width="wide">
        <SectionHeading eyebrow="History" title="How we got here" />
        <ol className="mt-12 flex flex-col gap-0 border-l-2 border-go-green-tint-strong pl-6">
          {TIMELINE.map((entry) => (
            <li key={entry.year} className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[1.9rem] h-3.5 w-3.5 rounded-full border-2 border-white bg-go-green"
              />
              <span className="text-sm font-extrabold tracking-[0.18em] text-go-green uppercase">
                {entry.year}
              </span>
              <h3 className="mt-1 text-xl font-extrabold tracking-tight text-ink-strong">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{entry.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section width="wide">
        <SectionHeading
          eyebrow="Leadership"
          title="The people accountable for the technology"
          body="Fictional leadership team for this demo build."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((leader) => (
            <Card key={leader.name}>
              <CardBody className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-go-green-tint text-sm font-extrabold text-go-green-deep"
                >
                  {initials(leader.name)}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-base font-extrabold text-ink-strong">{leader.name}</span>
                  <span className="text-sm font-semibold text-go-green">{leader.role}</span>
                  <span className="text-sm text-ink-soft">{leader.focus}</span>
                </span>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="dark" width="wide">
        <SectionHeading
          eyebrow="Where we work"
          tone="dark"
          title="Six offices, one engineering organisation"
          body="Teams are distributed on purpose. Decisions live in documents so that nobody's location decides whether they get a say."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFICES.map((office) => (
            <div key={office.city} className="rounded-go-lg bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-xl font-extrabold tracking-tight text-white">{office.city}</p>
              <p className="text-sm text-white/55">{office.country}</p>
              <p className="mt-3 text-sm text-white/70">{office.focus}</p>
              <p className="mt-4 text-xs font-bold tracking-wide text-go-green-soft uppercase">
                {formatNumber(office.headcount)} people
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
