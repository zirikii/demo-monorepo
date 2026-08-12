import { useMemo, useState } from "react";
import { MapPin, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { LinkCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Select, TextInput } from "@/components/ui/Field";
import { JOB_CATEGORIES, JOB_LISTINGS } from "@/data/jobs";
import { formatDate } from "@/lib/format";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");

  const jobs = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return JOB_LISTINGS.filter((job) => {
      const matchesCategory = category === "All categories" || job.category === category;
      const matchesQuery =
        !needle ||
        job.title.toLowerCase().includes(needle) ||
        job.company.toLowerCase().includes(needle) ||
        job.location.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <PageLayout title="Find a job">
      <PageHero
        eyebrow="Employment Hero Jobs"
        title="Find work at 350,000+ Australian businesses"
        body="Create one profile, get matched by SmartMatch, and apply with a single tap from the Employment Hero Work app."
        crumbs={[{ label: "Home", to: "/" }, { label: "Find a job" }]}
      />

      <Section tone="white">
        <div className="mb-10 flex flex-col gap-4 md:flex-row">
          <TextInput
            type="search"
            aria-label="Search jobs"
            placeholder="Search by role, business or suburb"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Select
            aria-label="Filter by category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="md:max-w-xs"
          >
            <option>All categories</option>
            {JOB_CATEGORIES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        </div>

        {jobs.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <LinkCard key={job.id} to={`/jobs/${job.id}`} className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
                      {job.title}
                    </h2>
                    <span className="text-sm font-semibold text-ink-soft">{job.company}</span>
                  </div>
                  <Badge>
                    <Sparkles aria-hidden className="h-3 w-3" />
                    {job.smartMatch}% match
                  </Badge>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-ink-faint">
                  <MapPin aria-hidden className="h-3.5 w-3.5" />
                  {job.location} · {job.workType}
                </p>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{job.summary}</p>
                <div className="flex items-center justify-between border-t border-line-soft pt-3 text-sm">
                  <span className="font-bold text-ink-strong">{job.salary}</span>
                  <span className="text-ink-faint">Posted {formatDate(job.postedOn)}</span>
                </div>
              </LinkCard>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No roles match that search"
            body="Try a broader keyword or reset the category filter to see every open role."
          />
        )}
      </Section>

      <CtaBand
        title="Hiring instead?"
        body="SmartMatch surfaces candidates from this pool before you spend a dollar on advertising."
        primaryLabel="See how hiring works"
        primaryTo="/products/hiring"
        secondaryLabel="Request a demo"
        secondaryTo="/request-a-demo"
      />
    </PageLayout>
  );
}
