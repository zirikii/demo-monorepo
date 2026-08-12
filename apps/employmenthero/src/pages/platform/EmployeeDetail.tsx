import { Navigate, useParams } from "react-router-dom";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { LEAVE_REQUESTS, PERFORMANCE_REVIEWS, getEmployee } from "@/data/platform";
import { formatCurrency, formatDate } from "@/lib/format";

export default function PlatformEmployeeDetail() {
  const { id = "" } = useParams();
  const employee = getEmployee(id);

  if (!employee) {
    return <Navigate to="/platform/people" replace />;
  }

  const leave = LEAVE_REQUESTS.filter((request) => request.employee === employee.name);
  const reviews = PERFORMANCE_REVIEWS.filter((review) => review.employee === employee.name);

  return (
    <PlatformLayout
      title={employee.name}
      description={`${employee.jobTitle} · ${employee.location}`}
      actions={
        <ButtonLink to="/platform/people" variant="secondary" size="sm">
          Back to people
        </ButtonLink>
      }
    >
      <div className="rounded-eh-lg border border-line bg-white p-6">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar name={employee.name} size="lg" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">{employee.name}</h2>
            <p className="text-ink-soft">
              {employee.jobTitle} · {employee.department}
            </p>
            <p className="text-sm text-ink-faint">{employee.email}</p>
          </div>
          <Badge className="ml-auto" tone={employee.status === "Active" ? "positive" : "caution"}>
            {employee.status}
          </Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Base rate" value={`${formatCurrency(employee.baseRate)}/hr`} />
        <StatTile label="Annual leave" value={`${employee.leaveBalance.annual} hrs`} />
        <StatTile label="Personal leave" value={`${employee.leaveBalance.personal} hrs`} />
        <StatTile label="Started" value={formatDate(employee.startDate)} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard title="Employment details">
          <dl className="flex flex-col gap-3 text-sm">
            {[
              ["Employment type", employee.employmentType],
              ["Award", employee.award],
              ["Department", employee.department],
              ["Location", employee.location],
              ["Reports to", employee.manager],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 border-b border-line-soft pb-3 last:border-b-0">
                <dt className="text-ink-faint">{label}</dt>
                <dd className="text-right font-semibold text-ink-strong">{value}</dd>
              </div>
            ))}
          </dl>
        </PanelCard>

        <PanelCard title="Leave history" action={{ label: "All leave", to: "/platform/leave" }}>
          {leave.length ? (
            <ul className="flex flex-col gap-3">
              {leave.map((request) => (
                <li
                  key={request.id}
                  className="flex items-center justify-between gap-3 rounded-eh border border-line px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink-strong">
                      {request.type} leave · {request.days} days
                    </p>
                    <p className="text-xs text-ink-faint">
                      {formatDate(request.from)} – {formatDate(request.to)}
                    </p>
                  </div>
                  <Badge tone={request.status === "Approved" ? "positive" : request.status === "Declined" ? "critical" : "caution"}>
                    {request.status}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-faint">No leave recorded for this employee.</p>
          )}
        </PanelCard>
      </div>

      <div className="mt-6">
        <PanelCard title="Performance" action={{ label: "All reviews", to: "/platform/performance" }}>
          {reviews.length ? (
            <ul className="flex flex-col gap-3">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="flex items-center justify-between gap-3 rounded-eh border border-line px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink-strong">{review.cycle}</p>
                    <p className="text-xs text-ink-faint">
                      Reviewer {review.reviewer} · due {formatDate(review.dueOn)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {review.rating ? (
                      <span className="text-sm font-bold text-ink-strong">{review.rating} / 5</span>
                    ) : null}
                    <Badge tone={review.status === "Complete" ? "positive" : "caution"}>
                      {review.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-faint">No review cycles assigned yet.</p>
          )}
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
