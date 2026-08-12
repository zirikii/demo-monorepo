import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PlatformLeavePage() {
  useDocumentTitle("Leave");
  const { leave, employees, decideLeave } = useWorkspace();

  const pending = leave.filter((request) => request.status === "Pending");
  const decided = leave.filter((request) => request.status !== "Pending");

  return (
    <PlatformLayout
      title="Leave"
      subtitle={`${pending.length} request${pending.length === 1 ? "" : "s"} awaiting a decision`}
    >
      <section>
        <h2 className="text-lg font-semibold text-eh-ink">Awaiting approval</h2>
        {pending.length ? (
          <ul className="mt-4 space-y-3">
            {pending.map((request) => {
              const employee = employees.find((item) => item.id === request.employeeId);
              return (
                <li
                  key={request.id}
                  className="flex flex-wrap items-center gap-4 rounded-eh-lg border border-eh-line bg-white p-5"
                >
                  <Avatar name={employee?.name ?? "Unknown"} />
                  <div className="min-w-48 flex-1">
                    <p className="font-semibold text-eh-ink">{employee?.name}</p>
                    <p className="text-sm text-eh-ink-faint">
                      {request.type} · {formatDate(request.startDate)} –{" "}
                      {formatDate(request.endDate)} · {request.days} days
                    </p>
                    <p className="mt-1 text-sm text-eh-ink-soft">{request.note}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => decideLeave(request.id, "Declined")}
                    >
                      Decline
                    </Button>
                    <Button size="sm" onClick={() => decideLeave(request.id, "Approved")}>
                      Approve
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-4">
            <EmptyState
              title="Nothing to approve"
              body="Every leave request has been actioned. New requests will appear here."
            />
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-eh-ink">Decided</h2>
        <div className="mt-4 overflow-hidden rounded-eh-lg border border-eh-line bg-white">
          <table className="w-full text-sm">
            <thead className="bg-eh-surface-tint text-left">
              <tr>
                {["Employee", "Type", "Dates", "Days", "Status"].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-5 py-3.5 text-xs font-bold tracking-wide text-eh-ink-faint uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-eh-line-soft">
              {decided.map((request) => {
                const employee = employees.find((item) => item.id === request.employeeId);
                return (
                  <tr key={request.id}>
                    <td className="px-5 py-4 font-medium text-eh-ink">{employee?.name}</td>
                    <td className="px-5 py-4 text-eh-ink-soft">{request.type}</td>
                    <td className="px-5 py-4 text-eh-ink-soft">
                      {formatDate(request.startDate)} – {formatDate(request.endDate)}
                    </td>
                    <td className="px-5 py-4 text-eh-ink-soft">{request.days}</td>
                    <td className="px-5 py-4">
                      <Badge tone={request.status === "Approved" ? "positive" : "critical"}>
                        {request.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </PlatformLayout>
  );
}
