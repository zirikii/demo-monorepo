import { useState } from "react";
import { MapPin, Sparkles } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getJob, JOB_LISTINGS } from "@/data/jobs";
import { formatDate } from "@/lib/format";

export default function JobDetailPage() {
  const { id = "" } = useParams();
  const job = getJob(id);
  const [applied, setApplied] = useState(false);

  if (!job) {
    return <Navigate to="/jobs" replace />;
  }

  const similar = JOB_LISTINGS.filter(
    (candidate) => candidate.id !== job.id && candidate.category === job.category,
  ).slice(0, 3);

  return (
    <PageLayout title={job.title}>
      <PageHero
        eyebrow={job.company}
        title={job.title}
        body={job.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Find a job", to: "/jobs" },
          { label: job.title },
        ]}
        aside={
          <Card className="border-white/15 bg-white/5 text-white">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-extrabold tracking-[0.14em] text-eh-violet-soft uppercase">
                SmartMatch
              </span>
              <Badge tone="neutral" className="bg-white/15 text-white">
                <Sparkles aria-hidden className="h-3 w-3" />
                {job.smartMatch}% match
              </Badge>
            </div>
            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-eh-violet-soft">Pay</dt>
                <dd className="text-right font-bold">{job.salary}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-eh-violet-soft">Work type</dt>
                <dd className="text-right font-bold">{job.workType}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-eh-violet-soft">Location</dt>
                <dd className="text-right font-bold">{job.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-eh-violet-soft">Posted</dt>
                <dd className="text-right font-bold">{formatDate(job.postedOn)}</dd>
              </div>
            </dl>
            <Button
              variant="inverse"
              size="lg"
              className="mt-6 w-full"
              onClick={() => setApplied(true)}
              disabled={applied}
            >
              {applied ? "Application sent" : "Apply with Employment Hero"}
            </Button>
            {applied ? (
              <p className="mt-3 text-center text-xs text-eh-violet-soft">
                Demo only — nothing was submitted to an employer.
              </p>
            ) : null}
          </Card>
        }
      />

      <Section tone="white">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
              What you&apos;ll be doing
            </h2>
            <CheckList items={job.responsibilities} />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
              What you&apos;ll need
            </h2>
            <CheckList items={job.requirements} />
          </div>
        </div>
        <p className="mx-auto mt-10 flex max-w-4xl items-center gap-1.5 text-sm text-ink-faint">
          <MapPin aria-hidden className="h-3.5 w-3.5" />
          {job.location} · {job.category}
        </p>
      </Section>

      {similar.length ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Similar roles" title={`More in ${job.category}`} className="mb-10" />
          <div className="grid gap-5 md:grid-cols-3">
            {similar.map((item) => (
              <LinkCard key={item.id} to={`/jobs/${item.id}`} className="flex flex-col gap-2">
                <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{item.title}</h3>
                <p className="text-sm text-ink-soft">{item.company}</p>
                <p className="text-sm text-ink-faint">{item.location}</p>
              </LinkCard>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Get matched instead of applying"
        body="Build one profile in the Employment Hero Work app and let employers come to you."
        primaryLabel="Create a profile"
        primaryTo="/signup"
        secondaryLabel="Browse all jobs"
        secondaryTo="/jobs"
      />
    </PageLayout>
  );
}
