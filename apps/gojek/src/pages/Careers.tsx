import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { BenefitGrid } from "@/components/marketing/BenefitGrid";
import { filterJobs, jobLocations, jobTeams } from "@/data/jobs";
import { lifeBenefits } from "@/data/benefits";

export function CareersPage() {
  const [team, setTeam] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => filterJobs(query, team, location), [query, team, location]);

  return (
    <PageLayout title="Careers — Gojek (Demo)">
      <PageHero
        eyebrow="Careers"
        title="Build the super-app that moves Southeast Asia"
        description="Join a team solving real problems at massive scale — for consumers, driver-partners and merchants alike."
      />

      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label htmlFor="job-search" className="mb-1.5 block text-sm font-semibold text-ink">
              Search roles
            </label>
            <input
              id="job-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'engineer' or 'product'"
              className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-gojek focus:ring-2 focus:ring-gojek/30"
            />
          </div>
          <SelectField
            label="Team"
            name="team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <option value="all">All teams</option>
            {jobTeams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="all">All locations</option>
            {jobLocations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </SelectField>
        </div>

        <p className="mt-6 text-sm text-ink-soft" aria-live="polite">
          {results.length} open {results.length === 1 ? "role" : "roles"}
        </p>

        <div className="mt-4 space-y-3">
          {results.length === 0 ? (
            <EmptyState
              title="No roles match your filters"
              description="Try broadening your search or clearing the filters."
              action={
                <Button
                  onClick={() => {
                    setQuery("");
                    setTeam("all");
                    setLocation("all");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          ) : (
            results.map((job) => (
              <Link
                key={job.id}
                to="/signup"
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-gojek sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-ink">{job.title}</h3>
                    <Badge>{job.type}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{job.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-faint">
                    <span>{job.team}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin aria-hidden="true" className="h-4 w-4" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-gojek">
                  Apply
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            ))
          )}
        </div>
      </Container>

      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Life at Gojek" title="Benefits for you and your family" />
          <div className="mt-10">
            <BenefitGrid items={lifeBenefits} />
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
