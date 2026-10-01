import {
  CalendarClock,
  CreditCard,
  Landmark,
  Receipt,
  SplitSquareHorizontal,
  Wallet,
} from "lucide-react";
import { useProperty } from "@/features/property/PropertyProvider";
import { invoiceTotal } from "@/features/property/views";
import { formatCurrency } from "@/lib/format";
import type { TemplateValues } from "../../flows";
import { CardShell, Row } from "./CardShell";

function useInvoice(values: TemplateValues) {
  const { invoices } = useProperty();
  const index = invoices.findIndex((i) => i.id === values.invoiceId);
  return { invoice: invoices[index], previous: index >= 0 ? invoices[index + 1] : undefined };
}

export function InvoiceCard({ values }: { values: TemplateValues }) {
  const { invoice } = useInvoice(values);
  return (
    <CardShell
      title={`Invoice · ${values.invoicePeriod}`}
      icon={<Receipt className="size-4 text-royal" aria-hidden />}
    >
      <p className="-mt-2 mb-2 font-mono text-[11px] text-ink-faint">{values.invoiceId}</p>
      {invoice && (
        <ul className="mb-2 space-y-1 border-b border-line-soft pb-2 text-xs">
          {invoice.lines.map((l) => (
            <li key={l.label} className="flex justify-between gap-3">
              <span className="text-ink-soft">{l.label}</span>
              <span className="tabular-nums text-heading">{formatCurrency(l.amount)}</span>
            </li>
          ))}
        </ul>
      )}
      <Row label="Total" value={values.invoiceTotal} strong />
      <Row label="Due" value={values.invoiceDue} />
    </CardShell>
  );
}

export function PaymentConfirmCard({ values }: { values: TemplateValues }) {
  return (
    <CardShell
      title="Confirm payment"
      icon={<CreditCard className="size-4 text-royal" aria-hidden />}
    >
      <Row label="Invoice" value={values.invoiceId} />
      <Row label="Pay with" value={values.cardLabel} />
      <Row label="Amount" value={values.invoiceTotal} strong />
    </CardShell>
  );
}

export function BankTransferCard({ values }: { values: TemplateValues }) {
  return (
    <CardShell title="Bank transfer" icon={<Landmark className="size-4 text-royal" aria-hidden />}>
      <Row label="Account name" value="SiteMinder Distribution Pty Ltd" />
      <Row label="BSB" value="062-000" />
      <Row label="Account" value="1234 5678" />
      <Row label="Reference" value={values.invoiceId} />
      <Row label="Amount" value={values.invoiceTotal} strong />
      <p className="mt-2 text-[11px] text-ink-faint">Demo details only — don&apos;t send money.</p>
    </CardShell>
  );
}

export function InvoiceCompareCard({ values }: { values: TemplateValues }) {
  const { invoice, previous } = useInvoice(values);
  const labels = [
    ...new Set(
      [...(invoice?.lines ?? []), ...(previous?.lines ?? [])].map((l) =>
        l.label.replace(/\s*\(\d+ bookings\)/, ""),
      ),
    ),
  ];
  const amount = (lines: { label: string; amount: number }[] | undefined, label: string) =>
    lines?.find((l) => l.label.startsWith(label))?.amount ?? 0;
  return (
    <CardShell title="Month on month" icon={<Receipt className="size-4 text-royal" aria-hidden />}>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-1 text-xs">
        <span />
        <span className="text-right font-semibold text-ink-faint">Before</span>
        <span className="text-right font-semibold text-ink-faint">
          {(values.invoicePeriod ?? "").split(" ")[0]}
        </span>
        {labels.map((label) => {
          const now = amount(invoice?.lines, label);
          const before = amount(previous?.lines, label);
          return (
            <div key={label} className="contents">
              <span className="truncate text-ink-soft">{label}</span>
              <span className="text-right tabular-nums text-ink-faint">
                {formatCurrency(before)}
              </span>
              <span
                className={
                  now > before + 0.5
                    ? "text-right font-semibold tabular-nums text-caution"
                    : "text-right tabular-nums text-heading"
                }
              >
                {formatCurrency(now)}
              </span>
            </div>
          );
        })}
        <span className="border-t border-line-soft pt-1 font-semibold text-heading">Total</span>
        <span className="border-t border-line-soft pt-1 text-right tabular-nums">
          {previous ? formatCurrency(invoiceTotal(previous)) : values.invoicePrevTotal}
        </span>
        <span className="border-t border-line-soft pt-1 text-right font-bold tabular-nums text-heading">
          {values.invoiceTotal}
        </span>
      </div>
    </CardShell>
  );
}

export function CreditRefundCard({ values }: { values: TemplateValues }) {
  return (
    <CardShell title="Account credit" icon={<Wallet className="size-4 text-royal" aria-hidden />}>
      <Row label="Available" value={values.creditAmount} strong />
      <Row label="Refund to" value={values.cardLabel} />
      <p className="mt-1 text-[11px] text-ink-faint">Refunds land in 3–5 business days.</p>
    </CardShell>
  );
}

export function ExtensionCard({ values }: { values: TemplateValues }) {
  return (
    <CardShell
      title="14-day extension"
      icon={<CalendarClock className="size-4 text-royal" aria-hidden />}
    >
      <Row label="Invoice" value={values.invoiceId} />
      <Row label="Amount" value={values.invoiceTotal} />
      <Row label="Was due" value={values.invoiceDue} />
      <Row label="New due date" value={values.invoiceExtendedDue} strong />
      <p className="mt-1 text-[11px] text-ink-faint">
        No late fee. Your service isn&apos;t affected.
      </p>
    </CardShell>
  );
}

export function InstalmentCard({ values }: { values: TemplateValues }) {
  return (
    <CardShell
      title="Instalment plan"
      icon={<SplitSquareHorizontal className="size-4 text-royal" aria-hidden />}
    >
      <ol className="space-y-1.5">
        {["Today", "In 1 month", "In 2 months"].map((when, i) => (
          <li
            key={when}
            className="flex items-center justify-between rounded-xl bg-canvas px-3 py-2 text-xs"
          >
            <span className="text-ink-soft">
              Payment {i + 1} · {when}
            </span>
            <span className="font-semibold tabular-nums text-heading">
              {values.instalmentAmount}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[11px] text-ink-faint">Taken from your {values.cardLabel}.</p>
    </CardShell>
  );
}
