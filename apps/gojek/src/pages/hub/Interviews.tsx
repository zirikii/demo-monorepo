import { CalendarDays, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { HubLayout } from "@/components/hub/HubLayout";
import { Card, CardBody } from "@/components/ui/Card";
import { SEEDED_INTERVIEWS } from "@/data/hub";
import { findJob } from "@/data/jobs";
import { formatJakartaTime } from "@/lib/format";

export default function HubInterviewsPage() {
  const interviews = [...SEEDED_INTERVIEWS].sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <HubLayout
      title="Interviews"
      description="Scheduled conversations across your active applications. Times are shown in Jakarta time."
    >
      <div className="flex flex-col gap-4">
        {interviews.map((interview) => {
          const job = findJob(interview.jobSlug);
          return (
            <Card key={interview.id}>
              <CardBody className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">
                    {interview.title}
                  </h2>
                  {job ? (
                    <Link
                      to={`/join-us/${job.slug}`}
                      className="focus-go text-sm font-bold text-go-green hover:underline"
                    >
                      {job.title}
                    </Link>
                  ) : null}
                </div>

                <dl className="grid gap-3 text-sm text-ink-soft sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays aria-hidden="true" className="h-4 w-4 text-ink-ghost" />
                    <div>
                      <dt className="sr-only">Starts</dt>
                      <dd>{formatJakartaTime(interview.startsAt)}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock aria-hidden="true" className="h-4 w-4 text-ink-ghost" />
                    <div>
                      <dt className="sr-only">Duration</dt>
                      <dd>
                        {interview.durationMinutes} minutes · {interview.format}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users aria-hidden="true" className="h-4 w-4 text-ink-ghost" />
                    <div>
                      <dt className="sr-only">Panel</dt>
                      <dd>{interview.panel.join(", ")}</dd>
                    </div>
                  </div>
                </dl>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </HubLayout>
  );
}
