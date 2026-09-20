import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { JOBS } from "@/data/jobs";
import { useAuth } from "@/hooks/useAuth";
import { readApplications, readSavedJobs, readWatchedOss, statusLabel } from "@/lib/applications";

export default function PortalDashboardPage() {
  const { user } = useAuth();
  const applications = readApplications();
  const saved = readSavedJobs();
  const watched = readWatchedOss();
  const savedJobs = JOBS.filter((job) => saved.includes(job.slug)).slice(0, 3);

  return (
    <PortalLayout title="Portal">
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user?.name.split(" ")[0]}.</h1>
      <p className="mt-2 text-go-muted">
        {user?.role} · {user?.hub} · dummy applicant roster
      </p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Applications" value={String(applications.length)} />
        <Stat label="Saved jobs" value={String(saved.length)} />
        <Stat label="OSS watchlist" value={String(watched.length)} />
      </dl>
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Pipeline</h2>
          <Link to="/portal/applications" className="text-sm text-go-green hover:underline">
            View all
          </Link>
        </div>
        {applications.length === 0 ? (
          <p className="mt-4 text-sm text-go-muted">
            No applications yet.{" "}
            <Link to="/careers" className="text-go-green hover:underline">
              Find a role
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/8">
            {applications.slice(0, 4).map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3 text-sm">
                <span>{item.jobTitle}</span>
                <span className="text-go-faint">{statusLabel(item.status)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Saved jobs</h2>
        {savedJobs.length === 0 ? (
          <p className="mt-4 text-sm text-go-muted">Nothing saved. Bookmark a role from Join us.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {savedJobs.map((job) => (
              <li key={job.slug}>
                <Link to={`/careers/${job.slug}`} className="text-sm hover:text-go-green">
                  {job.title} · {job.location}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PortalLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-go-lg border border-white/8 bg-go-card p-5">
      <dt className="text-xs text-go-faint">{label}</dt>
      <dd className="mt-2 text-3xl font-semibold">{value}</dd>
    </div>
  );
}
