import { useState } from "react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { savedPayees } from "@/data/netbank";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency } from "@/lib/format";

const payeeKindLabels = {
  payid: "PayID",
  account: "BSB & account",
  bpay: "BPAY",
} as const;

export function NetBankPayPage() {
  useDocumentTitle("Pay — NetBank");
  const { accounts, payBill } = useBanking();

  const [accountId, setAccountId] = useState("smart-access");
  const [payeeId, setPayeeId] = useState(savedPayees[0]?.id ?? "");
  const [amount, setAmount] = useState("120");
  const [reference, setReference] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const payee = savedPayees.find((item) => item.id === payeeId);
  const payable = accounts.filter((account) =>
    ["transaction", "savings", "credit"].includes(account.kind),
  );

  return (
    <NetBankLayout
      title="Pay someone or a bill"
      intro="Pay a saved payee with PayID, BSB and account number, or BPAY. Nothing leaves your browser."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <form
          className="space-y-5 rounded-cba-lg bg-surface p-6 shadow-cba"
          onSubmit={(event) => {
            event.preventDefault();
            const value = Number(amount);
            const result = payBill(accountId, payee?.name ?? "Payee", value, reference);
            if (result.ok) {
              setError(null);
              setSuccess(`${formatCurrency(value)} scheduled to ${payee?.name ?? "your payee"}.`);
            } else {
              setSuccess(null);
              setError(result.error);
            }
          }}
        >
          <SelectField
            label="Pay from"
            value={accountId}
            onChange={(event) => {
              setAccountId(event.target.value);
              setError(null);
              setSuccess(null);
            }}
          >
            {payable.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} — {formatCurrency(account.available)} available
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Pay to"
            value={payeeId}
            onChange={(event) => {
              setPayeeId(event.target.value);
              setError(null);
              setSuccess(null);
            }}
          >
            {savedPayees.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {item.detail}
              </option>
            ))}
          </SelectField>

          <TextField
            label="Amount"
            type="number"
            min={0}
            step={0.01}
            prefix="$"
            value={amount}
            error={error ?? undefined}
            onChange={(event) => {
              setAmount(event.target.value);
              setError(null);
              setSuccess(null);
            }}
          />

          <TextField
            label="Reference"
            hint="Optional — shown to the payee"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="e.g. Invoice 1042"
          />

          <Button type="submit" size="lg" className="w-full">
            Pay now
          </Button>

          {success ? (
            <p
              role="status"
              className="rounded-cba-md bg-positive/10 px-4 py-3 text-[15px] font-bold text-positive"
            >
              {success}
            </p>
          ) : null}
        </form>

        <div className="rounded-cba-lg bg-surface p-6 shadow-cba">
          <h2 className="text-base font-extrabold text-ink">Saved payees</h2>
          <ul className="mt-4 divide-y divide-line-soft">
            {savedPayees.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="text-[15px] font-semibold text-ink">{item.name}</p>
                  <p className="text-[13px] text-ink-faint">{item.detail}</p>
                </div>
                <Badge tone="muted">{payeeKindLabels[item.kind]}</Badge>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] leading-relaxed text-ink-faint">
            In the real NetBank, adding a new payee requires a NetCode sent to your mobile or the
            CommBank app.
          </p>
        </div>
      </div>
    </NetBankLayout>
  );
}
