import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { JobFilters } from "@/components/careers/JobFilters";
import { JobTable } from "@/components/careers/JobTable";
import { Accordion } from "@/components/ui/Accordion";
import { PageLayout } from "@/components/layout/PageLayout";
import { CAREER_FAQS } from "@/data/faqs";
import { filterJobs } from "@/data/jobs";
import { SITE } from "@/data/site";
import type { JobTeam } from "@/data/types";

export default function CareersPage() {
  const [location, setLocation] = useState("All locations");
  const [team, setTeam] = useState<JobTeam | "all">("all");
  const jobs = useMemo(() => filterJobs(location, team), [location, team]);

  return (
    <PageLayout title="Join us">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">{SITE.careersEyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{SITE.careersHeadline}</h1>
        <p className="mt-3 text-2xl text-go-muted">{SITE.careersSub}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Link to="/careers" className="rounded-go-lg border border-white/8 bg-go-card p-6">
            <h2 className="text-2xl font-semibold">GoTo Financial</h2>
            <p className="mt-2 text-sm text-go-muted">
              Here&apos;s your chance to reinvent how we build our financial products.
            </p>
          </Link>
          <Link to="/careers" className="rounded-go-lg border border-white/8 bg-go-card p-6">
            <h2 className="text-2xl font-semibold">GoTo Group</h2>
            <p className="mt-2 text-sm text-go-muted">Help us empower progress and build a sustainable future.</p>
          </Link>
        </div>
      </section>
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Recent open positions</h2>
              <p className="mt-2 text-sm text-go-muted">{jobs.length} open jobs found</p>
            </div>
            <JobFilters location={location} team={team} onLocation={setLocation} onTeam={setTeam} />
          </div>
          <div className="mt-8">
            <JobTable jobs={jobs} />
          </div>
        </div>
      </section>
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="mb-6 text-3xl font-semibold">Hiring questions</h2>
          <Accordion items={CAREER_FAQS} />
        </div>
      </section>
    </PageLayout>
  );
}
