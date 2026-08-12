import { Link, Navigate, useParams } from "react-router-dom";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatCurrencyWhole, formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PlatformEmployeeDetailPage() {
  const { employeeId = "" } = useParams();
  const { employees, leave } = useWorkspace();
  const employee = employees.find((item) => item.id === employeeId);

  useDocumentTitle(employee?.name ?? "Employee");

  if (!employee) return <Navigate to="/platform/people" replace />;

  const history = leave.filter((request) => request.employeeId === employee.id);

  return (
    <PlatformLayout title={employee.name} subtitle={`${employee.role} · ${employee.team}`}>
      <Link
        to="/platform/people"
        className="focus-eh text-sm font-semibold text-eh-purple hover:underline"
      >
        ← Back to people
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="rounded-eh-lg border border-eh-line bg-white p-6">
          <div className="flex items-center gap-4">
            <Avatar name={employee.name} size="lg" />
            <div>
              <p className="font-display text-xl font-bold text-eh-ink">{employee.name}</p>
              <p className="text-sm text-eh-ink-faint">{employee.email}</p>
              <Badge tone={employee.status === "Active" ? "positive" : "purple"} className="mt-2">
                {employee.status}
              </Badge>
            </div>
          </div>

          <dl className="mt-6 space-y-3.5 text-sm">
            {[
              { label: "Role", value: employee.role },
              { label: "Team", value: employee.team },
              { label: "Manager", value: employee.manager },
              { label: "Location", value: employee.location },
              { label: "Employment type", value: employee.employmentType },
              { label: "Start date", value: formatDate(employee.startDate) },
              { label: "Base salary", value: formatCurrencyWhole(employee.salary) },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-4 border-b border-eh-line-soft pb-3"
              >
                <dt className="text-eh-ink-faint">{row.label}</dt>
                <dd className="text-right font-medium text-eh-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="space-y-6">
          <section className="rounded-eh-lg border border-eh-line bg-white p-6">
            <h2 className="text-lg font-semibold text-eh-ink">Leave balances</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-eh bg-eh-surface-tint p-5">
                <dt className="text-xs tracking-wide text-eh-ink-faint uppercase">Annual leave</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-eh-ink">
                  {employee.leaveBalance.annual} days
                </dd>
              </div>
              <div className="rounded-eh bg-eh-surface-tint p-5">
                <dt className="text-xs tracking-wide text-eh-ink-faint uppercase">
                  Personal leave
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold text-eh-ink">
                  {employee.leaveBalance.personal} days
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-eh-lg border border-eh-line bg-white p-6">
            <h2 className="text-lg font-semibold text-eh-ink">Leave history</h2>
            {history.length ? (
              <ul className="mt-4 divide-y divide-eh-line-soft">
                {history.map((request) => (
                  <li key={request.id} className="flex items-center justify-between gap-4 py-3.5">
                    <div>
                      <p className="text-sm font-medium text-eh-ink">{request.type}</p>
                      <p className="text-xs text-eh-ink-faint">
                        {formatDate(request.startDate)} – {formatDate(request.endDate)} ·{" "}
                        {request.days} days
                      </p>
                    </div>
                    <Badge
                      tone={
                        request.status === "Approved"
                          ? "positive"
                          : request.status === "Declined"
                            ? "critical"
                            : "amber"
                      }
                    >
                      {request.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-eh-ink-faint">No leave recorded yet.</p>
            )}
          </section>
        </div>
      </div>
    </PlatformLayout>
  );
}
