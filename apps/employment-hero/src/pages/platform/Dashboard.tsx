import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { activityFeed, complianceItems } from "@/data/platform";
import { formatCurrencyWhole, formatDate } from "@/lib/format";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PlatformDashboardPage() {
  useDocumentTitle("Dashboard");
  const { user } = useAuth();
  const { employees, leave, payRuns, candidates } = useWorkspace();

  const pendingLeave = leave.filter((request) => request.status === "Pending");
  const openPayRun = payRuns.find((run) => run.status !== "Finalised");
  const activeCandidates = candidates.filter((candidate) => candidate.stage !== "Hired");
  const onboarding = employees.filter((employee) => employee.status === "Onboarding");

  const tiles = [
    { label: "Employees", value: String(employees.length), to: "/platform/people" },
    { label: "Leave to approve", value: String(pendingLeave.length), to: "/platform/leave" },
    { label: "Candidates in flight", value: String(activeCandidates.length), to: "/platform/hiring" },
    { label: "Onboarding", value: String(onboarding.length), to: "/platform/people" },
  ];

  return (
    <PlatformLayout
      title={`Good morning, ${user?.name?.split(" ")[0] ?? "there"}`}
      subtitle={`${user?.company} · ${user?.plan} plan`}
      actions={
        <ButtonLink to="/platform/payroll" size="sm" className="hidden sm:inline-flex">
          Review pay run
        </ButtonLink>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            to={tile.to}
            className="focus-eh group rounded-eh-lg border border-eh-line bg-white p-5 transition hover:border-eh-purple hover:shadow-eh"
          >
            <p className="text-xs font-semibold tracking-wide text-eh-ink-faint uppercase">
              {tile.label}
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-eh-ink">{tile.value}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-eh-purple">
              View <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {openPayRun ? (
            <section className="rounded-eh-lg border border-eh-line bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-eh-ink">Next pay run</h2>
                  <p className="mt-0.5 text-sm text-eh-ink-faint">
                    {openPayRun.period} · pays {formatDate(openPayRun.payDate)}
                  </p>
                </div>
                <Badge tone="amber">{openPayRun.status}</Badge>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Employees", value: String(openPayRun.employees) },
                  { label: "Gross", value: formatCurrencyWhole(openPayRun.gross) },
                  { label: "Super", value: formatCurrencyWhole(openPayRun.superannuation) },
                  { label: "Net", value: formatCurrencyWhole(openPayRun.net) },
                ].map((item) => (
                  <div key={item.label} className="rounded-eh bg-eh-surface-tint p-4">
                    <dt className="text-[11px] tracking-wide text-eh-ink-faint uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-eh-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {openPayRun.anomalies.length ? (
                <ul className="mt-5 space-y-2">
                  {openPayRun.anomalies.map((anomaly) => (
                    <li
                      key={anomaly}
                      className="flex items-start gap-2.5 rounded-eh bg-eh-amber/12 px-4 py-3 text-sm text-eh-ink-soft"
                    >
                      <AlertTriangle size={15} className="mt-0.5 shrink-0 text-eh-amber" />
                      {anomaly}
                    </li>
                  ))}
                </ul>
              ) : null}

              <ButtonLink to="/platform/payroll" size="sm" className="mt-5">
                Open pay run
              </ButtonLink>
            </section>
          ) : null}

          <section className="rounded-eh-lg border border-eh-line bg-white p-6">
            <h2 className="text-lg font-semibold text-eh-ink">Leave awaiting your approval</h2>
            {pendingLeave.length ? (
              <ul className="mt-4 divide-y divide-eh-line-soft">
                {pendingLeave.map((request) => {
                  const employee = employees.find((item) => item.id === request.employeeId);
                  return (
                    <li key={request.id} className="flex items-center gap-3 py-3.5">
                      <Avatar name={employee?.name ?? "Unknown"} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-eh-ink">
                          {employee?.name}
                        </p>
                        <p className="truncate text-xs text-eh-ink-faint">
                          {request.type} · {formatDate(request.startDate)} –{" "}
                          {formatDate(request.endDate)} · {request.days} days
                        </p>
                      </div>
                      <Link
                        to="/platform/leave"
                        className="focus-eh shrink-0 text-sm font-semibold text-eh-purple hover:underline"
                      >
                        Review
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-eh-ink-faint">Nothing waiting. Everything is up to date.</p>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-eh-lg border border-eh-line bg-white p-6">
            <h2 className="text-lg font-semibold text-eh-ink">Compliance</h2>
            <ul className="mt-4 space-y-3">
              {complianceItems.map((item) => (
                <li key={item.name} className="flex items-start gap-2.5">
                  {item.status === "Current" ? (
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-eh-positive" />
                  ) : (
                    <AlertTriangle size={16} className="mt-0.5 shrink-0 text-eh-amber" />
                  )}
                  <span className="text-sm">
                    <span className="block font-medium text-eh-ink">{item.name}</span>
                    <span className="block text-xs text-eh-ink-faint">{item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-eh-lg border border-eh-line bg-white p-6">
            <h2 className="text-lg font-semibold text-eh-ink">Recent activity</h2>
            <ul className="mt-4 space-y-3.5">
              {activityFeed.map((item) => (
                <li key={item.text} className="text-sm">
                  <p className="text-eh-ink-soft">{item.text}</p>
                  <p className="mt-0.5 text-xs text-eh-ink-ghost">{formatDate(item.at)}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </PlatformLayout>
  );
}
