import { Link } from "react-router-dom";
import { Banknote, Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Job } from "@/data/types";
import { formatDate } from "@/lib/format";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      to={`/jobs/${job.slug}`}
      className="focus-eh group block rounded-eh-lg border border-eh-line bg-white p-6 transition hover:border-eh-purple hover:shadow-eh-lift"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-eh-ink group-hover:text-eh-purple">
            {job.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-eh-ink-soft">{job.company}</p>
        </div>
        <Badge tone="neutral">{job.workType}</Badge>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-eh-ink-soft">{job.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-eh-ink-faint">
        <li className="inline-flex items-center gap-1.5">
          <MapPin size={13} /> {job.location}
        </li>
        <li className="inline-flex items-center gap-1.5">
          <Banknote size={13} /> {job.salary}
        </li>
        <li className="inline-flex items-center gap-1.5">
          <Briefcase size={13} /> {job.category}
        </li>
        <li>Posted {formatDate(job.postedAt)}</li>
      </ul>
    </Link>
  );
}
