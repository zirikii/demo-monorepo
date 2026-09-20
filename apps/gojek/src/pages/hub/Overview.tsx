import { ArrowRight, CalendarDays, CheckCircle2, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { HubLayout } from "@/components/hub/HubLayout";
import { StageTracker } from "@/components/hub/StageTracker";
import { Card, CardBody } from "@/components/ui/Card";
import { findJob } from "@/data/jobs";
import { HUB_CHECKLIST, SEEDED_INTERVIEWS } from "@/data/hub";
import { useAuth } from "@/hooks/useAuth";
import { readApplications, readSavedRoles, stageProgress } from "@/lib/applications";
import { formatDate, formatJakartaTime } from "@/lib/format";

export default function HubOverviewPage() {
  const { user } = useAuth();
  const applications = readApplications();
  const saved = readSavedRoles();
  const nextInterview = [...SEEDED_INTERVIEWS].sort((a, b) =>
    a.startsAt.localeCompare(b.startsAt),
  )[0];
  const active = applications[0];

  return (
    <HubLayout
      title={`Welcome back, ${user?.name.split(" ")[0] ?? "there"}`}
      description="Everything in this hub is stored in your browser. Nothing is submitted anywhere."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardBody className="flex flex-col gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-ink-strong">
              {applications.length}
            </span>
            <span className="text-sm font-bold text-ink-soft">Active applications</span>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex flex-col gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-ink-strong">
              {SEEDED_INTERVIEWS.length}
            </span>
            <span className="text-sm font-bold text-ink-soft">Scheduled interviews</span>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex flex-col gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-ink-strong">
              {saved.length}
            </span>
            <span className="text-sm font-bold text-ink-soft">Saved roles</span>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {active ? (
          <Card>
            <CardBody className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-extrabold tracking-[0.16em] text-ink-ghost uppercase">
                    Furthest along
                  </span>
                  <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
                    {findJob(active.jobSlug)?.title ?? active.jobSlug}
                  </h2>
                  <p className="text-sm text-ink-faint">
                    {active.id} · submitted {formatDate(active.submittedOn)}
                  </p>
                </div>
                <span className="rounded-full bg-go-green-tint px-3 py-1 text-xs font-extrabold text-go-green-deep">
                  {stageProgress(active.stage)}%
                </span>
              </div>

              <StageTracker stage={active.stage} />
              <p className="text-sm leading-relaxed text-ink-soft">{active.note}</p>

              <Link
                to="/hub/applications"
                className="focus-go inline-flex w-fit items-center gap-1.5 text-sm font-bold text-go-green"
              >
                All applications
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </CardBody>
          </Card>
        ) : null}

        <Card>
          <CardBody className="flex flex-col gap-4">
            <span className="text-xs font-extrabold tracking-[0.16em] text-ink-ghost uppercase">
              Next interview
            </span>
            {nextInterview ? (
              <>
                <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">
                  {nextInterview.title}
                </h2>
                <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
                  <CalendarDays aria-hidden="true" className="h-4 w-4 text-ink-ghost" />
                  {formatJakartaTime(nextInterview.startsAt)}
                </p>
                <p className="text-sm text-ink-soft">
                  {nextInterview.format} · {nextInterview.durationMinutes} minutes
                </p>
                <p className="text-sm text-ink-faint">Panel: {nextInterview.panel.join(", ")}</p>
              </>
            ) : (
              <p className="text-sm text-ink-soft">Nothing scheduled yet.</p>
            )}
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody className="flex flex-col gap-4">
          <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">
            Application checklist
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {HUB_CHECKLIST.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm">
                {item.done ? (
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-go-green" />
                ) : (
                  <Circle aria-hidden="true" className="h-4 w-4 text-ink-ghost" />
                )}
                <span className={item.done ? "text-ink-soft" : "font-semibold text-ink-strong"}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </HubLayout>
  );
}
