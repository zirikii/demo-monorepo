import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HelpSection } from "@/components/marketing/HelpSection";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const timeline = [
  { year: "1911", event: "The Commonwealth Bank is established by an Act of Federal Parliament." },
  { year: "1912", event: "The first branch opens in Melbourne, with agencies in post offices." },
  { year: "1991", event: "The black and yellow diamond, designed by Ken Cato, is introduced." },
  { year: "1996", event: "Full privatisation completes and the bank lists on the ASX." },
  { year: "2020", event: "The diamond is refreshed and the conjoined 'mm' ligature is retired." },
  {
    year: "2026",
    event: "CommBank Yello expands with more benefits and a personalised offer hub.",
  },
];

const values = [
  {
    title: "Care",
    description: "We put our customers first and take responsibility for the outcomes we create.",
  },
  {
    title: "Courage",
    description:
      "We speak up, challenge the status quo, and do the right thing even when it's hard.",
  },
  {
    title: "Commitment",
    description: "We follow through, keep our promises and stay focused on the long term.",
  },
];

export function AboutPage() {
  useDocumentTitle("About us");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "About us" }]} />
      <PageHero
        eyebrow="About us"
        title="Building a brighter future for all"
        description="Australia's largest bank, serving personal, business and institutional customers across the country."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Our values" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title}>
                <h3 className="text-lg font-bold text-black">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading title="A short history" />
          <ol className="mt-8 space-y-4">
            {timeline.map((entry) => (
              <li
                key={entry.year}
                className="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-6 py-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <Badge tone="black" className="w-fit">
                  {entry.year}
                </Badge>
                <p className="text-sm text-ink-soft">{entry.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            title="Want to know more?"
            description="Read the latest from our newsroom, or explore roles across the group."
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/newsroom">Visit the newsroom</ButtonLink>
            <ButtonLink to="/careers" variant="outline">
              Explore careers
            </ButtonLink>
          </div>
        </div>
      </section>

      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Historical dates reflect publicly documented milestones and are included for realism.
          Everything else on this site is fabricated demo content.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}

const roles = [
  {
    title: "Senior Software Engineer, Digital Banking",
    location: "Sydney, NSW · Hybrid",
    team: "Technology",
  },
  {
    title: "Home Lending Specialist",
    location: "Parramatta, NSW · On site",
    team: "Retail Banking",
  },
  {
    title: "Data Scientist, Fraud & Scams",
    location: "Melbourne, VIC · Hybrid",
    team: "Technology",
  },
  {
    title: "Business Banking Manager",
    location: "Brisbane, QLD · On site",
    team: "Business Banking",
  },
  { title: "Product Manager, Payments", location: "Sydney, NSW · Hybrid", team: "Product" },
  { title: "Risk Analyst, Credit Portfolio", location: "Sydney, NSW · Hybrid", team: "Risk" },
  {
    title: "Customer Service Specialist",
    location: "Adelaide, SA · On site",
    team: "Contact Centre",
  },
  { title: "Site Reliability Engineer", location: "Melbourne, VIC · Remote", team: "Technology" },
];

export function CareersPage() {
  useDocumentTitle("Careers");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Careers" }]} />
      <PageHero
        eyebrow="Careers"
        title="Do work that matters"
        description="Roles across technology, retail and business banking, risk, and operations."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            title="Open roles"
            description="Demo listings — none of these are real."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <li key={role.title}>
                <Card className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-black">{role.title}</h3>
                    <Badge tone="neutral">{role.team}</Badge>
                  </div>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{role.location}</p>
                  <div className="mt-5">
                    <ButtonLink to="/support" size="sm">
                      View role
                    </ButtonLink>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HelpSection />
      <ThingsYouShouldKnow>
        <p>These job listings are fabricated for the demo. No applications are accepted here.</p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
