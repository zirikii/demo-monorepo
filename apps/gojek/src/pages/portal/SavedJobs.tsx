import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { JOBS } from "@/data/jobs";
import { readSavedJobs, toggleSavedJob } from "@/lib/applications";

export default function PortalSavedJobsPage() {
  const [saved, setSaved] = useState(readSavedJobs);
  const jobs = JOBS.filter((job) => saved.includes(job.slug));

  return (
    <PortalLayout title="Saved jobs">
      <h1 className="text-3xl font-semibold">Saved jobs</h1>
      {jobs.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No bookmarks"
            body="Save a role from a job page. The list is local to this browser."
            action={<ButtonLink to="/careers">Join us</ButtonLink>}
          />
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-white/8">
          {jobs.map((job) => (
            <li key={job.slug} className="flex items-center justify-between gap-4 py-4">
              <div>
                <Link to={`/careers/${job.slug}`} className="font-semibold hover:text-go-green">
                  {job.title}
                </Link>
                <p className="text-sm text-go-faint">
                  {job.location} · {job.org}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSaved(toggleSavedJob(job.slug))}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </PortalLayout>
  );
}
