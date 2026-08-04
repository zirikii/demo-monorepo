import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatBalance } from "@/lib/format";

export function TransferPage() {
  useDocumentTitle("Transfers & BPAY");
  const { accounts, transfer } = useBanking();

  const [fromId, setFromId] = useState("smart-access");
  const [toId, setToId] = useState("netbank-saver");
  const [amount, setAmount] = useState("250");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ reference: string; amount: number } | null>(null);

  const from = accounts.find((account) => account.id === fromId);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = Number(amount);
    const result = transfer({ fromId, toId, amount: value, description: description.trim() });

    if (!result.ok) {
      setError(result.error);
      setReceipt(null);
      return;
    }

    setError(null);
    setReceipt({ reference: result.reference, amount: value });
    setAmount("");
    setDescription("");
  };

  return (
    <NetBankLayout title="Transfers & BPAY">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-start">
        <form
          onSubmit={submit}
          className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          <SelectField
            label="From account"
            value={fromId}
            onChange={(event) => setFromId(event.target.value)}
            hint={from ? `${formatBalance(from.available)} available` : undefined}
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} — {formatBalance(account.balance)}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="To account"
            value={toId}
            onChange={(event) => setToId(event.target.value)}
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} — {formatBalance(account.balance)}
              </option>
            ))}
          </SelectField>

          <TextField
            label="Amount"
            prefix="$"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ""))}
            error={error ?? undefined}
          />

          <TextField
            label="Description (optional)"
            placeholder="e.g. Rent, savings top-up"
            maxLength={40}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            hint="Appears on both statements"
          />

          <Button type="submit" size="lg" className="w-full">
            Transfer money
          </Button>
        </form>

        <div className="space-y-6">
          {error ? (
            <div
              role="alert"
              className="flex gap-3 rounded-2xl border-2 border-alert bg-alert/5 p-5"
            >
              <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-alert" />
              <div>
                <p className="text-sm font-bold text-black">We couldn&apos;t make that transfer</p>
                <p className="mt-1 text-sm text-ink-soft">{error}</p>
              </div>
            </div>
          ) : null}

          {receipt ? (
            <div
              role="status"
              className="flex gap-3 rounded-2xl border-2 border-positive bg-positive/5 p-5"
            >
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-positive" />
              <div>
                <p className="text-sm font-bold text-black">
                  {formatBalance(receipt.amount)} transferred
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  Reference {receipt.reference}. Both balances have been updated.
                </p>
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
              Your balances
            </h2>
            <ul className="mt-4 space-y-3">
              {accounts.map((account) => (
                <li key={account.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-ink-soft">{account.name}</span>
                  <span className="shrink-0 font-semibold tabular-nums text-black">
                    {formatBalance(account.balance)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-ink-muted">
            Transfers in this demo move money between mock accounts only and are persisted in your
            browser&apos;s local storage. Nothing leaves this device.
          </p>
        </div>
      </div>
    </NetBankLayout>
  );
}
