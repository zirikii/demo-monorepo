import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { JobCard } from "@/components/marketing/JobCard";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SelectField } from "@/components/ui/Field";
import { Pagination } from "@/components/ui/Pagination";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOBS, JOB_LOCATIONS, JOB_TEAMS } from "@/data/jobs";
import type { JobType } from "@/data/types";
import { pluralise } from "@/lib/format";
import { JOBS_PER_PAGE, filterJobs, pageCount, paginate, sortJobsByRecency } from "@/lib/jobs";

const JOB_TYPES: JobType[] = ["Full-time", "Contract", "Internship"];

const PROCESS_STEPS = [
  {
    question: "1. Application review",
    answer:
      "A recruiter and the hiring manager read every application. You hear back either way, usually within three working days.",
  },
  {
    question: "2. Recruiter conversation",
    answer:
      "Thirty minutes on what you are looking for, what the team actually works on, and whether the level and location line up.",
  },
  {
    question: "3. Craft interview",
    answer:
      "For engineers this is a debugging session in a real repository rather than an algorithm puzzle. For designers it is a walkthrough of work you have shipped.",
  },
  {
    question: "4. System or portfolio deep dive",
    answer:
      "A design discussion scoped to a problem the team genuinely owns. We publish the rubric before the interview, not after.",
  },
  {
    question: "5. Team match and offer",
    answer:
      "You meet the squads with open headcount and choose where you want to land. Offers follow within a week of the final conversation.",
  },
];

export default function JoinUsPage() {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<JobType | "">("");
  const [page, setPage] = useState(1);

  const matches = useMemo(
    () => sortJobsByRecency(filterJobs({ query, team, location, type })),
    [query, team, location, type],
  );

  const pages = pageCount(matches.length, JOBS_PER_PAGE);
  const currentPage = Math.min(page, pages);
  const visible = paginate(matches, currentPage, JOBS_PER_PAGE);

  function reset() {
    setQuery("");
    setTeam("");
    setLocation("");
    setType("");
    setPage(1);
  }

  return (
    <PageLayout title="Join us">
      <PageHero
        eyebrow="Join us"
        title="Build the tech that a country runs on"
        body={`${JOBS.length} open roles across engineering, data, design, and product, in six offices and remote across Southeast Asia.`}
      />

      <Section width="wide">
        <SectionHeading eyebrow="Open roles" title="Find your team" />

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="relative">
            <label htmlFor="role-search" className="sr-only">
              Search roles
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-ghost"
            />
            <input
              id="role-search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by title, stack, or keyword"
              className="focus-go h-11 w-full rounded-go-sm border border-line bg-white pr-4 pl-10 text-sm text-ink placeholder:text-ink-ghost"
            />
          </div>

          <SelectField
            label="Team"
            value={team}
            onChange={(event) => {
              setTeam(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All teams</option>
            {JOB_TEAMS.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Location"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All locations</option>
            {JOB_LOCATIONS.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Type"
            value={type}
            onChange={(event) => {
              setType(event.target.value as JobType | "");
              setPage(1);
            }}
          >
            <option value="">All types</option>
            {JOB_TYPES.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-ink-faint" role="status">
            {pluralise(matches.length, "role")} open
          </p>
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset filters
          </Button>
        </div>

        {visible.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No roles match those filters"
              body="Widen the search, or check back next week — we post new roles most Mondays."
              action={
                <Button variant="secondary" size="sm" onClick={reset}>
                  Clear filters
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-col gap-4">
              {visible.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>

            <div className="mt-12">
              <Pagination
                page={currentPage}
                pages={pages}
                onChange={setPage}
                label="Roles pagination"
              />
            </div>
          </>
        )}
      </Section>

      <Section id="process" tone="tint" width="wide">
        <SectionHeading
          eyebrow="Interview process"
          title="What to expect, start to finish"
          body="Five steps, usually within three weeks. We publish the rubric for each stage before you sit it."
        />
        <div className="mt-10 max-w-3xl">
          <Accordion items={PROCESS_STEPS} />
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
