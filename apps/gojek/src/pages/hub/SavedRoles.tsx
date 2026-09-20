import { useState } from "react";
import { Link } from "react-router-dom";
import { HubLayout } from "@/components/hub/HubLayout";
import { JobCard } from "@/components/marketing/JobCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { findJob } from "@/data/jobs";
import { readSavedRoles, toggleSavedRole } from "@/lib/applications";

export default function HubSavedRolesPage() {
  const [saved, setSaved] = useState(() => readSavedRoles());
  const jobs = saved.map(findJob).filter((job) => job !== undefined);

  return (
    <HubLayout
      title="Saved roles"
      description="Roles you bookmarked while browsing. Saved in this browser only."
    >
      {jobs.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          body="Use the save button on any role to keep it here while you decide."
          action={
            <Link
              to="/join-us"
              className="focus-go inline-flex h-10 items-center rounded-full bg-go-green px-5 text-sm font-bold text-white"
            >
              Browse roles
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div key={job.slug} className="flex flex-col gap-2">
              <JobCard job={job} />
              <Button
                variant="ghost"
                size="sm"
                className="self-end"
                onClick={() => setSaved(toggleSavedRole(job.slug))}
              >
                Remove from saved
              </Button>
            </div>
          ))}
        </div>
      )}
    </HubLayout>
  );
}
