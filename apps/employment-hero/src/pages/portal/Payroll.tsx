import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { payRuns } from "@/data/payroll";
import { formatCurrency, formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PortalPayrollPage() {
  useDocumentTitle("Payroll");
  return (
    <PortalLayout title="Payroll">
      <div className="grid gap-4">
        {payRuns.map((run) => (
          <article key={run.id} className="flex flex-wrap items-center justify-between gap-3 rounded-eh-lg border border-line bg-white p-5 shadow-eh">
            <div>
              <h2 className="font-bold">{run.period}</h2>
              <p className="text-sm text-ink-faint">Pay date {formatDate(run.payDate)} · {run.employees} employees</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-bold">{formatCurrency(run.total)}</p>
              <Badge tone={run.status === "Paid" ? "success" : run.status === "Processing" ? "purple" : "soft"}>{run.status}</Badge>
            </div>
          </article>
        ))}
      </div>
    </PortalLayout>
  );
}
