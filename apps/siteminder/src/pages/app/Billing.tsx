import { CreditCard, Landmark, Wallet } from "lucide-react";
import { useProperty } from "@/features/property/PropertyProvider";
import { invoiceTotal, invoiceUnpaid, PLANS } from "@/features/property/views";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency, formatDate } from "@/lib/format";
import { AskSupport, InvoiceBadge, PageTitle, Panel } from "./ui";

export function BillingPage() {
  useDocumentTitle("Billing");
  const { property, invoices } = useProperty();
  const plan = PLANS[property.plan];
  const due = invoices.filter(invoiceUnpaid);

  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle
        title="Billing"
        body={`Invoices go to ${property.billingEmail}. ABN ${property.abn}.`}
        actions={
          <AskSupport step="billing" label="Help with billing" className="btn-outline hover:no-underline">
            Billing help
          </AskSupport>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Panel>
          <p className="text-sm text-ink-faint">Current plan</p>
          <p className="mt-1 text-xl font-bold text-heading">{plan.name}</p>
          <p className="text-sm text-ink-soft">{plan.price ? `${formatCurrency(plan.price)} / month + usage` : "Custom pricing"}</p>
          <AskSupport step="account.plan" label="Change my plan" className="mt-3">
            Change plan
          </AskSupport>
        </Panel>
        <Panel>
          <p className="text-sm text-ink-faint">Payment method</p>
          <p className="mt-1 flex items-center gap-2 text-xl font-bold text-heading">
            {property.directDebit ? <Landmark className="size-5" aria-hidden /> : <CreditCard className="size-5" aria-hidden />}
            {property.directDebit ? "Direct debit" : `${property.card.brand} •••• ${property.card.last4}`}
          </p>
          <p className="text-sm text-ink-soft">{property.directDebit ? "Invoices are paid automatically on the due date" : "Charged when you pay an invoice"}</p>
          {!property.directDebit && (
            <AskSupport step="billing.directdebit" label="Set up direct debit" className="mt-3">
              Set up direct debit
            </AskSupport>
          )}
        </Panel>
        <Panel>
          <p className="text-sm text-ink-faint">Account credit</p>
          <p className="mt-1 flex items-center gap-2 text-xl font-bold text-heading">
            <Wallet className="size-5" aria-hidden /> {formatCurrency(property.credit)}
          </p>
          <p className="text-sm text-ink-soft">Applied to your next invoice automatically</p>
          {property.credit > 0 && (
            <AskSupport step="billing.refund" label="Refund my credit" className="mt-3">
              Request a refund
            </AskSupport>
          )}
        </Panel>
      </div>

      <Panel title="Invoices" className="mt-6" action={due.length ? <span className="text-sm text-ink-faint">{due.length} unpaid</span> : undefined}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="pb-3 font-semibold">Invoice</th>
                <th className="pb-3 font-semibold">Period</th>
                <th className="pb-3 font-semibold">Due</th>
                <th className="pb-3 text-right font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {invoices.map((i) => (
                <tr key={i.id} className="align-top">
                  <td className="py-3 pr-4 font-mono text-xs text-ink-soft">{i.id}</td>
                  <td className="py-3 pr-4">
                    <span className="block font-semibold text-heading">{i.period}</span>
                    <ul className="mt-1 space-y-0.5 text-xs text-ink-faint">
                      {i.lines.map((l) => (
                        <li key={l.label}>
                          {l.label} · {formatCurrency(l.amount)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 pr-4 text-ink-soft">{formatDate(i.due)}</td>
                  <td className="py-3 pr-4 text-right font-semibold tabular-nums">{formatCurrency(invoiceTotal(i))}</td>
                  <td className="py-3 pr-4">
                    <InvoiceBadge status={i.status} />
                  </td>
                  <td className="space-y-1 py-3 text-right">
                    {invoiceUnpaid(i) ? (
                      <>
                        <AskSupport step="billing.pay" recordId={i.id} label={`Pay invoice ${i.id}`}>
                          Pay
                        </AskSupport>
                        <AskSupport step="billing.high" recordId={i.id} label={`Why is invoice ${i.id} higher?`} className="block text-ink-soft">
                          Why is it higher?
                        </AskSupport>
                      </>
                    ) : (
                      <span className="text-xs text-ink-faint">Paid {i.paidAt ? formatDate(i.paidAt) : ""}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
