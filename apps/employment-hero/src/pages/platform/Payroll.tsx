import { AlertTriangle } from "lucide-react";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatCurrency, formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PlatformPayrollPage() {
  useDocumentTitle("Payroll");
  const { payRuns, approvePayRun } = useWorkspace();

  const open = payRuns.filter((run) => run.status !== "Finalised");
  const finalised = payRuns.filter((run) => run.status === "Finalised");

  return (
    <PlatformLayout title="Payroll" subtitle="Fortnightly cycle · Single Touch Payroll Phase 2">
      <section>
        <h2 className="text-lg font-semibold text-eh-ink">Open pay runs</h2>
        {open.length ? (
          <div className="mt-4 space-y-4">
            {open.map((run) => (
              <article key={run.id} className="rounded-eh-lg border border-eh-line bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-eh-ink">{run.period}</h3>
                    <p className="mt-0.5 text-sm text-eh-ink-faint">
                      Pays {formatDate(run.payDate)} · {run.employees} employees
                    </p>
                  </div>
                  <Badge tone="amber">{run.status}</Badge>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Gross", value: formatCurrency(run.gross) },
                    { label: "PAYG", value: formatCurrency(run.tax) },
                    { label: "Super", value: formatCurrency(run.superannuation) },
                    { label: "Net", value: formatCurrency(run.net) },
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

                {run.anomalies.length ? (
                  <ul className="mt-5 space-y-2">
                    {run.anomalies.map((anomaly) => (
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

                <Button className="mt-5" onClick={() => approvePayRun(run.id)}>
                  Approve and finalise
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-3 rounded-eh-lg border border-eh-line bg-white p-6 text-sm text-eh-ink-faint">
            No pay run is open. The next cycle opens after the current period closes.
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-eh-ink">Finalised</h2>
        <div className="mt-4 overflow-x-auto rounded-eh-lg border border-eh-line bg-white">
          <table className="w-full min-w-3xl text-sm">
            <thead className="bg-eh-surface-tint text-left">
              <tr>
                {["Period", "Pay date", "Employees", "Gross", "PAYG", "Super", "Net"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-5 py-3.5 text-xs font-bold tracking-wide text-eh-ink-faint uppercase"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-eh-line-soft">
              {finalised.map((run) => (
                <tr key={run.id}>
                  <td className="px-5 py-4 font-medium text-eh-ink">{run.period}</td>
                  <td className="px-5 py-4 text-eh-ink-soft">{formatDate(run.payDate)}</td>
                  <td className="px-5 py-4 text-eh-ink-soft">{run.employees}</td>
                  <td className="px-5 py-4 text-eh-ink-soft">{formatCurrency(run.gross)}</td>
                  <td className="px-5 py-4 text-eh-ink-soft">{formatCurrency(run.tax)}</td>
                  <td className="px-5 py-4 text-eh-ink-soft">
                    {formatCurrency(run.superannuation)}
                  </td>
                  <td className="px-5 py-4 font-medium text-eh-ink">{formatCurrency(run.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PlatformLayout>
  );
}
