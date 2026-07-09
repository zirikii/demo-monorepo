import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaSection } from "@/components/shared/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { jobOpenings } from "@/data/company";

const perks = [
  { title: "Genuinely flexible", copy: "Remote-friendly roles with hubs to visit, not commutes to endure. Outcomes over hours." },
  { title: "Meaningful scale", copy: "Your work ships to universities, councils, and health services used by millions of people." },
  { title: "Learning built in", copy: "A personal development budget, internal academies, and conference time that actually gets used." },
  { title: "Global by default", copy: "Teams span Sydney to Edinburgh to New York — expect collaborators, customers, and career paths on three continents." },
];

export function CareersPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Careers" }]} />
      <PageHero
        eyebrow="Careers — We're hiring"
        title="Build the platform behind public-good digital services"
        copy="Engineers, designers, and customer teams at Squiz spend their days making government, education, and health experiences work better for real people."
      >
        <Button to="#open-roles" size="lg" withArrow>
          See open roles
        </Button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Life at Squiz" title="Why people stay" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.title} className="rounded-2xl border border-cream-deep bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-navy">{perk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{perk.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="open-roles" className="bg-cream-alt py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="Open roles" title="Current openings" copy={`${jobOpenings.length} roles across four teams.`} />
          <ul className="mt-10 space-y-4">
            {jobOpenings.map((job) => (
              <li
                key={job.id}
                className="flex flex-col gap-4 rounded-2xl border border-cream-deep bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-navy">{job.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {job.team} · {job.location}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge tint={job.type === "Full-time" ? "mint" : "orange"}>{job.type}</Badge>
                  <Button to="/contact" variant="secondary" size="sm">
                    Apply
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        title="Don't see your role?"
        copy="Tell us what you're brilliant at — we keep expressions of interest for every team."
        primaryLabel="Get in touch"
        primaryTo="/contact"
        secondaryLabel="About Squiz"
        secondaryTo="/about"
      />
    </PageLayout>
  );
}
