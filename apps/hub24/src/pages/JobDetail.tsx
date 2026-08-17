import { MapPin } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { findJob } from "@/data/company";
import { formatDate } from "@/lib/format";

export default function JobDetailPage() {
  const { id = "" } = useParams();
  const job = findJob(id);

  if (!job) {
    return <Navigate to="/about-us/careers/" replace />;
  }

  return (
    <PageLayout title={job.title}>
      <PageHero
        eyebrow={job.team}
        title={job.title}
        body={job.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Careers", to: "/about-us/careers/" },
          { label: job.title },
        ]}
        aside={
          <Card className="bg-white/95">
            <p className="text-xs font-bold tracking-[0.16em] text-ink-ghost uppercase">Role details</p>
            <dl className="mt-4 flex flex-col divide-y divide-line-soft text-sm">
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-faint">Team</dt>
                <dd className="font-semibold text-ink-strong">{job.team}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-faint">Type</dt>
                <dd className="font-semibold text-ink-strong">{job.type}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-faint">Location</dt>
                <dd className="flex items-center gap-1.5 font-semibold text-ink-strong">
                  <MapPin aria-hidden className="h-3.5 w-3.5" />
                  {job.location}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-faint">Posted</dt>
                <dd className="font-semibold text-ink-strong">{formatDate(job.posted)}</dd>
              </div>
            </dl>
          </Card>
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="The role" title="What you'll do" />
            <CheckList items={job.responsibilities} className="mt-6" />
          </div>
          <div>
            <SectionHeading eyebrow="About you" title="What we're looking for" />
            <CheckList items={job.requirements} className="mt-6" />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          <Badge>{job.team}</Badge>
          <Badge tone="neutral">{job.type}</Badge>
          <Badge tone="neutral">{job.location}</Badge>
        </div>
        <p className="mt-8 text-sm text-ink-faint">
          This role is invented for a demonstration build. Applications are not accepted here.
        </p>
      </Section>

      <CtaBand
        title="Interested in this kind of work?"
        body="Browse the rest of the open roles in this demo, or read about how the Group is structured."
        primary={{ label: "All open roles", to: "/about-us/careers/" }}
        secondary={{ label: "About HUB24", to: "/about-us/" }}
      />
    </PageLayout>
  );
}
