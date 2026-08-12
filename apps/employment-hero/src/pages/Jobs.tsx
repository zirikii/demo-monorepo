import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { JobCard } from "@/components/marketing/JobCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getJob, jobCategories, jobs, salaryBenchmarks } from "@/data/jobs";
import { formatCurrencyWhole, formatDate, formatNumber, pluralise } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function JobsPage() {
  useDocumentTitle("Jobs");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [workType, setWorkType] = useState("All types");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesTerm =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term);
      const matchesCategory = category === "All categories" || job.category === category;
      const matchesType = workType === "All types" || job.workType === workType;
      return matchesTerm && matchesCategory && matchesType;
    });
  }, [query, category, workType]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="For job seekers"
        title="Get matched. Get hired. Get paid."
        blurb="Build one profile and let SmartMatch put you in front of employers who are hiring right now, instead of applying into a void."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Jobs" }]}
      >
        <div className="grid gap-3 rounded-eh-lg border border-eh-line bg-white p-4 sm:grid-cols-[2fr_1fr_1fr]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, company or location"
            aria-label="Search jobs"
            className="h-11 rounded-eh border border-eh-line px-4 text-sm outline-none focus:border-eh-purple"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
            className="h-11 rounded-eh border border-eh-line px-4 text-sm outline-none focus:border-eh-purple"
          >
            <option>All categories</option>
            {jobCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={workType}
            onChange={(event) => setWorkType(event.target.value)}
            aria-label="Filter by work type"
            className="h-11 rounded-eh border border-eh-line px-4 text-sm outline-none focus:border-eh-purple"
          >
            <option>All types</option>
            {["Full time", "Part time", "Casual", "Contract"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </PageHero>

      <Section className="pt-10">
        <p className="text-sm text-eh-ink-faint">{pluralise(filtered.length, "role")} found</p>
        {filtered.length ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {filtered.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState
              title="No roles match those filters"
              body="Try widening the category or work type, or clear the search box."
            />
          </div>
        )}
      </Section>

      <CtaBand
        title="Know what you should be paid."
        blurb="Salary benchmarking built from the payslips of more than three million employees."
        primaryLabel="See salary data"
        primaryTo="/jobs/salary-benchmarking"
        secondaryLabel="Job hunting tips"
        secondaryTo="/resources/job-seekers"
      />
    </SiteLayout>
  );
}

export function JobDetailPage() {
  const { slug = "" } = useParams();
  const job = getJob(slug);

  useDocumentTitle(job?.title ?? "Jobs");

  if (!job) return <Navigate to="/jobs" replace />;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={job.category}
        title={job.title}
        blurb={job.summary}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Jobs", to: "/jobs" },
          { label: job.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="purple">{job.workType}</Badge>
          <Badge tone="neutral">{job.location}</Badge>
          <Badge tone="lime">{job.salary}</Badge>
          <span className="text-sm text-eh-ink-faint">Posted {formatDate(job.postedAt)}</span>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-eh-ink">About the role</h2>
              <p className="mt-3 text-base leading-relaxed text-eh-ink-soft">{job.summary}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-eh-ink">What you will do</h2>
              <ul className="mt-4 space-y-2.5">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-eh-ink-soft">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-eh-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-eh-ink">What you will bring</h2>
              <ul className="mt-4 space-y-2.5">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-eh-ink-soft">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-eh-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-eh-xl border border-eh-line bg-eh-purple-wash p-7">
            <p className="text-xs font-bold tracking-[0.14em] text-eh-ink-faint uppercase">
              Employer
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-eh-ink">{job.company}</p>
            <dl className="mt-6 space-y-3 text-sm">
              {[
                { label: "Location", value: job.location },
                { label: "Work type", value: job.workType },
                { label: "Salary", value: job.salary },
                { label: "Category", value: job.category },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-4">
                  <dt className="text-eh-ink-faint">{row.label}</dt>
                  <dd className="text-right font-medium text-eh-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink to="/start-free" className="mt-6 w-full">
              Apply with SmartMatch
            </ButtonLink>
            <p className="mt-3 text-center text-xs text-eh-ink-faint">
              Demo listing — no application is submitted.
            </p>
          </aside>
        </div>
      </Section>

      <CtaBand
        title="One profile. Every matching role."
        blurb="SmartMatch keeps working after you apply, so the next opportunity finds you."
        primaryLabel="Browse more jobs"
        primaryTo="/jobs"
        secondaryLabel="Interview guides"
        secondaryTo="/resources/job-seekers"
      />
    </SiteLayout>
  );
}

export function SalaryBenchmarkingPage() {
  useDocumentTitle("Salary benchmarking");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="For job seekers"
        title="Know what you are worth."
        blurb="Advertised ranges are negotiating positions. These figures come from actual payslips, so they reflect what people are really paid."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Jobs", to: "/jobs" },
          { label: "Salary benchmarking" },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="Australian medians"
          title="Base salary by role"
          blurb="Full-time equivalent base salary, excluding superannuation and bonuses."
        />
        <div className="mt-10 overflow-x-auto rounded-eh-lg border border-eh-line bg-white">
          <table className="w-full min-w-3xl text-sm">
            <thead className="bg-eh-surface-tint text-left">
              <tr>
                {["Role", "25th percentile", "Median", "75th percentile", "Sample size"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-5 py-3.5 text-xs font-bold tracking-wide text-eh-ink-faint uppercase"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-eh-line-soft">
              {salaryBenchmarks.map((row) => (
                <tr key={row.role}>
                  <th scope="row" className="px-5 py-4 text-left font-semibold text-eh-ink">
                    {row.role}
                  </th>
                  <td className="px-5 py-4 text-eh-ink-soft">{formatCurrencyWhole(row.p25)}</td>
                  <td className="px-5 py-4 font-semibold text-eh-purple">
                    {formatCurrencyWhole(row.median)}
                  </td>
                  <td className="px-5 py-4 text-eh-ink-soft">{formatCurrencyWhole(row.p75)}</td>
                  <td className="px-5 py-4 text-eh-ink-faint">{formatNumber(row.sample)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-eh-ink-faint">
          Demo figures. Not real salary data and not advice.
        </p>
      </Section>

      <CtaBand
        title="Ready to test the market?"
        blurb="Roles across Australia and New Zealand, updated daily."
        primaryLabel="Browse jobs"
        primaryTo="/jobs"
      />
    </SiteLayout>
  );
}
