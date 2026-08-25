import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

const ROLES = [
  { title: "Staff Product Designer, Jira", location: "Sydney · Hybrid", team: "Design" },
  {
    title: "Principal Engineer, Teamwork Graph",
    location: "San Francisco · Hybrid",
    team: "Platform",
  },
  { title: "Rovo Agent Engineer", location: "Bengaluru · Hybrid", team: "AI" },
  { title: "Enterprise Account Executive", location: "Singapore · Remote", team: "Sales" },
];

export default function CareersPage() {
  return (
    <PageLayout title="Careers">
      <PageHero
        eyebrow="Careers"
        title="Build the system of work"
        body="These listings are invented for the demo. Nothing is submitted anywhere."
        crumbs={[{ label: "Company", to: "/company" }, { label: "Careers" }]}
      />
      <Section>
        <ul className="flex flex-col divide-y divide-line rounded-atl-lg border border-line">
          {ROLES.map((role) => (
            <li
              key={role.title}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-5"
            >
              <div>
                <h2 className="font-extrabold">{role.title}</h2>
                <p className="text-sm text-ink-faint">
                  {role.team} · {role.location}
                </p>
              </div>
              <ButtonLink to="/contact" variant="secondary" size="sm">
                View role
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
