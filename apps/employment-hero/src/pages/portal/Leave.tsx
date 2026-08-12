import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { leaveRequests } from "@/data/leave";
import { formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PortalLeavePage() {
  useDocumentTitle("Leave");
  return (
    <PortalLayout title="Leave">
      <div className="overflow-x-auto rounded-eh-lg border border-line bg-white shadow-eh">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-soft text-ink-faint">
            <tr>
              <th className="px-4 py-3 font-semibold">Employee</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Dates</th>
              <th className="px-4 py-3 font-semibold">Days</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((req) => (
              <tr key={req.id} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">{req.employeeName}</td>
                <td className="px-4 py-3">{req.type}</td>
                <td className="px-4 py-3">{formatDate(req.from)} – {formatDate(req.to)}</td>
                <td className="px-4 py-3">{req.days}</td>
                <td className="px-4 py-3">
                  <Badge tone={req.status === "Approved" ? "success" : req.status === "Pending" ? "warn" : "danger"}>
                    {req.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
