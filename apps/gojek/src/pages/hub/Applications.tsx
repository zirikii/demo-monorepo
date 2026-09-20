import { useState } from "react";
import { Link } from "react-router-dom";
import { HubLayout } from "@/components/hub/HubLayout";
import { StageTracker } from "@/components/hub/StageTracker";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { findJob } from "@/data/jobs";
import { readApplications, stageProgress, withdrawApplication } from "@/lib/applications";
import { formatDate } from "@/lib/format";

export default function HubApplicationsPage() {
  const [applications, setApplications] = useState(() => readApplications());

  return (
    <HubLayout
      title="Applications"
      description="Every application you have submitted in this demo, with its current stage."
    >
      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          body="Browse the open roles and apply — the application will appear here immediately."
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
          {applications.map((application) => {
            const job = findJob(application.jobSlug);
            return (
              <Card key={application.id}>
                <CardBody className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">
                        {job ? (
                          <Link
                            to={`/join-us/${job.slug}`}
                            className="focus-go hover:text-go-green"
                          >
                            {job.title}
                          </Link>
                        ) : (
                          application.jobSlug
                        )}
                      </h2>
                      <p className="text-sm text-ink-faint">
                        {application.id} · {job?.team ?? "—"} · {job?.location ?? "—"}
                      </p>
                    </div>
                    <span className="rounded-full bg-go-green-tint px-3 py-1 text-xs font-extrabold text-go-green-deep">
                      {stageProgress(application.stage)}% complete
                    </span>
                  </div>

                  <StageTracker stage={application.stage} />

                  <p className="text-sm leading-relaxed text-ink-soft">{application.note}</p>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-xs text-ink-faint">
                    <span>
                      Submitted {formatDate(application.submittedOn)} · updated{" "}
                      {formatDate(application.updatedOn)} · recruiter {application.recruiter}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setApplications(withdrawApplication(application.id))}
                    >
                      Withdraw
                    </Button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </HubLayout>
  );
}
