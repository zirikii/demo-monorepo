import { useState } from "react";
import { MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StatBand } from "@/components/marketing/StatBand";
import { Badge } from "@/components/ui/Badge";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOBS } from "@/data/company";
import { GROUP_METRICS } from "@/data/site";
import { formatDate, formatNumber } from "@/lib/format";

export default function CareersPage() {
  const [team, setTeam] = useState("All teams");
  const teams = ["All teams", ...Array.from(new Set(JOBS.map((job) => job.team)))];
  const jobs = team === "All teams" ? JOBS : JOBS.filter((job) => job.team === team);

  return (
    <PageLayout title="Careers">
      <PageHero
        eyebrow="Careers"
        title="Build the platform behind Australian advice"
        body="We're a team of over a thousand people working on the platform, data and technology that lets financial professionals do more for their clients."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "About us", to: "/about-us/" },
          { label: "Careers" },
        ]}
      />

      <Section tone="tint">
        <StatBand
          columns={3}
          items={[
            { value: formatNumber(GROUP_METRICS.employees), label: "Employees (FTE)" },
            { value: "78%", label: "People engagement", note: "Up from 76% the prior year" },
            { value: `${JOBS.length}`, label: "Open roles in this demo" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading eyebrow="Open roles" title="Where we're hiring" />

        <Field label="Team" htmlFor="careers-team" className="mt-6 max-w-xs">
          <Select id="careers-team" value={team} onChange={(event) => setTeam(event.target.value)}>
            {teams.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        {jobs.length === 0 ? (
          <EmptyState className="mt-10" title="No roles open in that team right now" />
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <LinkCard
                key={job.id}
                to={`/about-us/careers/${job.id}/`}
                className="flex h-full flex-col gap-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{job.team}</Badge>
                  <Badge tone="neutral">{job.type}</Badge>
                </div>
                <CardHeading>{job.title}</CardHeading>
                <CardBody className="flex-1">{job.summary}</CardBody>
                <p className="flex items-center gap-1.5 text-xs text-ink-faint">
                  <MapPin aria-hidden className="h-3.5 w-3.5" />
                  {job.location} · posted {formatDate(job.posted)}
                </p>
              </LinkCard>
            ))}
          </div>
        )}

        <p className="mt-8 text-sm text-ink-faint">
          These roles are invented for a demonstration build. Applications are not accepted here.
        </p>
      </Section>

      <CtaBand
        title="Nothing quite right?"
        body="In the real world you'd register your interest. In this demo, use the contact page."
      />
    </PageLayout>
  );
}
