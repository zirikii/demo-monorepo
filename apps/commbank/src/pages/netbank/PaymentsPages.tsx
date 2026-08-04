import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronRight, ReceiptText, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { accounts, billers, scheduledPayments } from "@/data/banking";
import { formatAud, formatDate } from "@/lib/format";

const paymentSchema = z.object({
  from: z.string().min(1),
  to: z.string().trim().min(2, "Choose or enter a destination"),
  amount: z.coerce.number().positive("Enter an amount above $0").max(10000, "Demo limit is $10,000"),
  description: z.string().trim().min(2, "Add a description"),
});

type PaymentValues = z.infer<typeof paymentSchema>;

function PaymentFlow({ mode }: { mode: "transfer" | "bpay" }) {
  const [step, setStep] = useState<"details" | "review" | "success">("details");
  const [values, setValues] = useState<PaymentValues | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      from: "smart-access",
      to: mode === "bpay" ? "AGL Energy" : "Jordan Morgan · BSB 062-111 · •• 9482",
      amount: mode === "bpay" ? 168.24 : 125,
      description: mode === "bpay" ? "Electricity bill" : "Weekend costs",
    },
  });
  const title = mode === "bpay" ? "Pay a bill with BPAY" : "Transfer money";
  const Icon = mode === "bpay" ? ReceiptText : Send;

  if (step === "success" && values) {
    return (
      <div className="mx-auto max-w-xl surface-card p-8 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto h-14 w-14 text-cba-positive" />
        <h1 className="mt-5 text-3xl font-bold">{mode === "bpay" ? "Bill payment scheduled" : "Transfer complete"}</h1>
        <p className="mt-3 text-cba-ink-soft">{formatAud(values.amount)} to {values.to}</p>
        <p className="mt-2 text-sm text-cba-muted">Demo receipt CBA-{Date.now().toString().slice(-8)}</p>
        <Button className="mt-7" onClick={() => { reset(); setValues(null); setStep("details"); }}>Make another {mode === "bpay" ? "payment" : "transfer"}</Button>
      </div>
    );
  }

  if (step === "review" && values) {
    const source = accounts.find((account) => account.id === values.from);
    return (
      <div className="mx-auto max-w-xl">
        <button className="text-sm font-semibold underline" type="button" onClick={() => setStep("details")}>← Edit details</button>
        <div className="mt-4 surface-card p-7">
          <p className="text-sm font-semibold text-cba-positive">Review</p>
          <h1 className="mt-2 text-3xl font-bold">Check your {mode === "bpay" ? "payment" : "transfer"}</h1>
          <dl className="mt-7 divide-y divide-cba-line">
            {[["From", source?.name ?? "Account"], ["To", values.to], ["Description", values.description], ["Amount", formatAud(values.amount)]].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-4"><dt className="text-cba-muted">{label}</dt><dd className="text-right font-semibold">{value}</dd></div>
            ))}
          </dl>
          <div className="mt-6 rounded-xl bg-cba-info-soft p-4 text-sm text-cba-info">This action is simulated and does not move money.</div>
          <Button className="mt-6 w-full" onClick={() => setStep("success")}>Confirm {mode === "bpay" ? "payment" : "transfer"}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <Icon aria-hidden="true" className="h-8 w-8 text-cba-positive" />
      <h1 className="mt-3 text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-cba-ink-soft">Make a fictional payment from your demo account.</p>
      <form className="mt-7 surface-card space-y-5 p-6 sm:p-8" onSubmit={handleSubmit((data) => { setValues(data); setStep("review"); })}>
        <label className="block text-sm font-semibold">From
          <select className="field mt-2" {...register("from")}>
            {accounts.filter((account) => account.type === "transaction").map((account) => <option key={account.id} value={account.id}>{account.name} · {formatAud(account.available)}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold">{mode === "bpay" ? "Biller" : "To"}
          {mode === "bpay" ? (
            <select className="field mt-2" {...register("to")}>{billers.map((biller) => <option key={biller.code}>{biller.name}</option>)}</select>
          ) : <input className="field mt-2" {...register("to")} />}
          {errors.to ? <span className="text-xs text-cba-critical">{errors.to.message}</span> : null}
        </label>
        <label className="block text-sm font-semibold">Amount
          <input className="field mt-2" type="number" min="0.01" step="0.01" {...register("amount")} />
          {errors.amount ? <span className="text-xs text-cba-critical">{errors.amount.message}</span> : null}
        </label>
        <label className="block text-sm font-semibold">Description
          <input className="field mt-2" maxLength={40} {...register("description")} />
          {errors.description ? <span className="text-xs text-cba-critical">{errors.description.message}</span> : null}
        </label>
        <Button className="w-full" type="submit">Review <ChevronRight aria-hidden="true" className="h-4 w-4" /></Button>
      </form>
    </div>
  );
}

export function TransferPage() {
  return <PaymentFlow mode="transfer" />;
}

export function BpayPage() {
  return <PaymentFlow mode="bpay" />;
}

export function ScheduledPaymentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Payments</h1>
      <p className="mt-2 text-cba-ink-soft">Upcoming and scheduled demo payments.</p>
      <div className="mt-7 surface-card overflow-hidden">
        {scheduledPayments.map((payment) => (
          <div key={payment.name} className="flex items-center justify-between gap-4 border-b border-cba-line p-5 last:border-0">
            <div><h2 className="font-semibold">{payment.name}</h2><p className="mt-1 text-xs text-cba-muted">{formatDate(payment.date)}</p></div>
            <strong>{formatAud(payment.amount)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
