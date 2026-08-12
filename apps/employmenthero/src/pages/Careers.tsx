import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const OPEN_ROLES = [
  { title: "Senior Product Engineer, Payroll", team: "Engineering", location: "Sydney / Remote" },
  { title: "Staff Engineer, Hero AI", team: "Engineering", location: "Sydney / Remote" },
  { title: "Product Manager, Hiring", team: "Product", location: "Melbourne / Remote" },
  { title: "Implementation Consultant", team: "Customer", location: "Brisbane" },
  { title: "Payroll Specialist, Managed Services", team: "Customer", location: "Sydney" },
  { title: "Account Executive, Mid-market", team: "Sales", location: "Perth" },
  { title: "HR Adviser", team: "Advisory", location: "Remote, Australia" },
  { title: "Partner Manager, Accounting", team: "Partnerships", location: "Auckland" },
  { title: "Content Designer", team: "Design", location: "Remote, Australia" },
  { title: "Data Engineer, Analytics Platform", team: "Engineering", location: "Kuala Lumpur" },
];

const BENEFITS = [
  "Remote-first with five Hero Hubs to gather in",
  "Employee share options from your first day",
  "Employment Hero Work benefits, EAP and Earned Wage Access",
  "A learning budget and time set aside to use it",
  "Sixteen weeks paid parental leave for all parents",
  "Dog-friendly offices, because we mean it",
];

export default function CareersPage() {
  return (
    <PageLayout title="Careers">
      <PageHero
        eyebrow="Careers"
        title="Help us make employment easier for everyone"
        body="There's never been a more exciting time to join one of the fastest-growing SaaS companies in Australia."
        crumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
        actions={
          <ButtonLink to="/jobs" variant="inverse" size="lg">
            Browse the job board
          </ButtonLink>
        }
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Why here" title="What you get working at Employment Hero" />
            <CheckList items={BENEFITS} />
          </div>
          <Card className="flex flex-col gap-4 bg-surface-tint">
            <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">How we hire</h3>
            <ol className="flex flex-col gap-3 text-[0.98rem] leading-relaxed text-ink-soft">
              <li>
                <span className="font-bold text-ink-strong">1. Intro call</span> — 30 minutes with a
                recruiter to cover the role, the team and what you are looking for.
              </li>
              <li>
                <span className="font-bold text-ink-strong">2. Craft interview</span> — a working
                session with the hiring manager on a real problem from the team&apos;s backlog.
              </li>
              <li>
                <span className="font-bold text-ink-strong">3. Team interview</span> — meet two people
                you would work with day to day.
              </li>
              <li>
                <span className="font-bold text-ink-strong">4. Offer</span> — we share the band, the
                equity and the reasoning behind both.
              </li>
            </ol>
            <p className="text-sm text-ink-faint">
              We aim to close every process within two weeks and give feedback either way.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Open roles" title="Where we're hiring right now" className="mb-10" />
        <div className="overflow-hidden rounded-eh-lg border border-line bg-white">
          <ul className="divide-y divide-line-soft">
            {OPEN_ROLES.map((role) => (
              <li
                key={role.title}
                className="flex flex-col gap-2 px-6 py-5 transition hover:bg-surface-tint sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[1.02rem] font-bold text-ink-strong">{role.title}</span>
                  <span className="text-sm text-ink-faint">{role.location}</span>
                </div>
                <Badge tone="neutral">{role.team}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-ink-faint">
          Nothing that fits? Employment Hero Jobs carries roles from 350,000+ businesses across
          Australia.
        </p>
      </Section>

      <CtaBand
        title="Looking for a job, not a career here?"
        body="Employment Hero Jobs connects candidates with roles at hundreds of thousands of Australian businesses."
        primaryLabel="Find a job"
        primaryTo="/jobs"
        secondaryLabel="About Employment Hero"
        secondaryTo="/about-us"
      />
    </PageLayout>
  );
}
