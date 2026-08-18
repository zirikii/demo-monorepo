import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDUCATION_ITEMS } from "@/data/company";

export default function EducationPage() {
  const masterclasses = EDUCATION_ITEMS.filter((item) => item.format === "Masterclass");
  const webinars = EDUCATION_ITEMS.filter((item) => item.format !== "Masterclass");
  const totalPoints = EDUCATION_ITEMS.reduce((sum, item) => sum + item.cpdPoints, 0);

  return (
    <PageLayout title="CPD education">
      <PageHero
        eyebrow="Insights &amp; education"
        title="CPD education for advice professionals"
        body={`Accredited learning across managed portfolios, retirement income, SMSF and practice management — ${totalPoints} CPD points available across the current catalogue.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "CPD education" }]}
      />

      <Section id="masterclass">
        <SectionHeading eyebrow="Featured" title="Masterclass series" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {masterclasses.map((item) => (
            <Card key={item.slug} tone="navy" className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="inverse">{item.format}</Badge>
                <Badge tone="inverse">{item.cpdPoints} CPD points</Badge>
                <span className="text-sm text-white/70">{item.duration}</span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">{item.title}</h3>
              <p className="text-white/80">{item.summary}</p>
              <p className="text-sm text-white/60">Presented by {item.presenter}</p>
              <ul className="flex flex-wrap gap-2">
                {item.topics.map((topic) => (
                  <li key={topic}>
                    <Badge tone="inverse">{topic}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="webinars" tone="tint">
        <SectionHeading eyebrow="Catalogue" title="Webinars, courses and podcasts" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {webinars.map((item) => (
            <Card key={item.slug} className="flex h-full flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="teal">{item.format}</Badge>
                {item.cpdPoints > 0 ? <Badge>{item.cpdPoints} CPD</Badge> : null}
                <span className="text-sm text-ink-faint">{item.duration}</span>
              </div>
              <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                {item.title}
              </h3>
              <p className="flex-1 text-ink-soft">{item.summary}</p>
              <p className="text-sm text-ink-faint">Presented by {item.presenter}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-faint">
          Demo catalogue. Sessions are not bookable and no CPD is actually awarded.
        </p>
      </Section>

      <CtaBand
        title="Bring education to your practice"
        body="Our team runs sessions for practices and licensee networks on managed portfolios, retirement income and platform capability."
        primary={{ label: "Request a session", to: "/contact-us#demo" }}
        secondary={{ label: "Read insights", to: "/insights" }}
      />
    </PageLayout>
  );
}
