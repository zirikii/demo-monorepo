import { useState } from "react";
import { MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { CAREER_ROLES } from "@/data/company";
import { longDate } from "@/lib/format";

const TEAMS = ["All", ...Array.from(new Set(CAREER_ROLES.map((role) => role.team)))];

export default function CareersPage() {
  const [team, setTeam] = useState("All");
  const [openRole, setOpenRole] = useState<string | null>(null);
  const roles = team === "All" ? CAREER_ROLES : CAREER_ROLES.filter((role) => role.team === team);

  return (
    <PageLayout title="Careers">
      <PageHero
        eyebrow="Careers"
        title="Build the technology behind Australian advice"
        body="We're a technology company operating in a regulated industry, which makes the work unusually concrete: the thing you ship changes what an adviser can do that week."
        crumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Working here"
            title="What you can expect"
            body="Hybrid working across five offices, real ownership of a product surface, and a company small enough that decisions are traceable to people."
          />
          <Card>
            <CheckList
              items={[
                "Hybrid working across Sydney, Melbourne, Brisbane, Perth and Adelaide",
                "Professional development budget and CPD support",
                "Employee share plan participation",
                "Paid parental leave and flexible return-to-work",
                "Volunteering days and matched giving",
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Open roles" title={`${CAREER_ROLES.length} current openings`} />
        <Tabs
          className="mt-6"
          label="Filter roles by team"
          tabs={TEAMS}
          active={team}
          onChange={setTeam}
        />

        {roles.length === 0 ? (
          <EmptyState title="No roles in this team" body="Try another team or check back later." />
        ) : (
          <ul className="mt-8 flex flex-col gap-4">
            {roles.map((role) => {
              const expanded = openRole === role.id;
              return (
                <li key={role.id}>
                  <Card className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">
                          {role.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
                          <Badge tone="blue">{role.team}</Badge>
                          <span className="inline-flex items-center gap-1">
                            <MapPin aria-hidden className="h-4 w-4" />
                            {role.location}
                          </span>
                          <span>{role.type}</span>
                          <span>Posted {longDate(role.posted)}</span>
                        </div>
                        <p className="max-w-2xl text-ink-soft">{role.summary}</p>
                      </div>
                      <Button
                        variant="secondary"
                        aria-expanded={expanded}
                        onClick={() => setOpenRole(expanded ? null : role.id)}
                      >
                        {expanded ? "Hide details" : "View role"}
                      </Button>
                    </div>
                    {expanded ? (
                      <div className="animate-hub-fade border-t border-line pt-4">
                        <p className="mb-3 text-sm font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                          What you&rsquo;ll do
                        </p>
                        <CheckList items={role.responsibilities} />
                        <p className="mt-4 text-sm text-ink-faint">
                          Demo listing — applications are not accepted through this site.
                        </p>
                      </div>
                    ) : null}
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <CtaBand
        title="Nothing quite right?"
        body="Tell us what you do and we'll keep you in mind — in the real world, at least."
        primary={{ label: "Contact us", to: "/contact-us" }}
        secondary={{ label: "About HUB24", to: "/about-us" }}
      />
    </PageLayout>
  );
}
