import { useState } from "react";
import { AccountLayout } from "@/components/account/AccountLayout";
import { ServiceIcon } from "@/components/account/ServiceIcon";
import { Badge } from "@/components/ui/Badge";
import { bills, type Bill, type ServiceKind } from "@/data/account";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { formatCurrency, formatDate } from "@/lib/format";

const FILTERS: { label: string; value: ServiceKind | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Electricity", value: "electricity" },
  { label: "Gas", value: "gas" },
  { label: "Internet", value: "internet" },
  { label: "Mobile", value: "mobile" },
];

function StatusBadge({ status }: { status: Bill["status"] }) {
  switch (status) {
    case "paid":
      return <Badge tone="positive">Paid</Badge>;
    case "due":
      return <Badge tone="blue">Due</Badge>;
    case "overdue":
      return <Badge tone="critical">Overdue</Badge>;
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export function AccountBillsPage() {
  useDocumentTitle("Bills & payments");
  const { open } = useAssistant();
  const [filter, setFilter] = useState<ServiceKind | "all">("all");
  const rows = bills.filter((b) => filter === "all" || b.kind === filter).sort((a, b) => b.issued.localeCompare(a.issued));

  return (
    <AccountLayout title="Bills & payments">
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter bills">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border-2 px-4 py-1.5 text-sm font-bold",
              filter === f.value ? "border-agl-blue bg-agl-sky text-agl-blue" : "border-line-soft text-ink-soft hover:border-agl-blue",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-agl-lg border border-line-soft bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-tint text-xs tracking-wide text-ink-soft uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">Service</th>
              <th scope="col" className="px-4 py-3">Period</th>
              <th scope="col" className="px-4 py-3">Due</th>
              <th scope="col" className="px-4 py-3 text-right">Amount</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {rows.map((bill) => (
              <tr key={bill.id}>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-bold text-ink capitalize">
                    <ServiceIcon kind={bill.kind} className="h-4 w-4 text-agl-blue" />
                    {bill.kind}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {formatDate(bill.periodStart, "short")} – {formatDate(bill.periodEnd, "short")}
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(bill.due, "short")}</td>
                <td className="px-4 py-3 text-right font-extrabold text-ink">{formatCurrency(bill.amount)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={bill.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  {bill.status !== "paid" && (
                    <button
                      type="button"
                      onClick={() => open({ step: "billing.pay", label: `Pay my ${bill.kind} bill` })}
                      className="font-bold text-agl-blue hover:underline"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AccountLayout>
  );
}
