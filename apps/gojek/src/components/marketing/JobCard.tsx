import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import type { Job } from "@/data/types";
import { formatDate } from "@/lib/format";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group rounded-go-lg border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-go-lift">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
            <Link to={`/join-us/${job.slug}`} className="focus-go hover:text-go-green">
              {job.title}
            </Link>
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase aria-hidden="true" className="h-4 w-4 text-ink-ghost" />
              {job.team}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="h-4 w-4 text-ink-ghost" />
              {job.location}
            </span>
            <span className="text-ink-faint">Posted {formatDate(job.postedOn)}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Badge tone={job.type === "Internship" ? "info" : "brand"}>{job.type}</Badge>
          <Link
            to={`/join-us/${job.slug}`}
            className="focus-go inline-flex items-center gap-1.5 text-sm font-bold text-go-green"
            aria-label={`View ${job.title}`}
          >
            View role
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
