import { useState } from "react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency, maskAccountNumber } from "@/lib/format";

export function NetBankTransferPage() {
  useDocumentTitle("Transfer — NetBank");
  const { accounts, transfer } = useBanking();

  const [fromId, setFromId] = useState("smart-access");
  const [toId, setToId] = useState("netbank-saver");
  const [amount, setAmount] = useState("250");
  const [description, setDescription] = useState("Transfer");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const transferable = accounts.filter((account) => account.kind !== "term-deposit");

  return (
    <NetBankLayout
      title="Transfer money"
      intro="Move money between your own CommBank accounts. Balances update immediately in this demo."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <form
          className="space-y-5 rounded-cba-lg bg-surface p-6 shadow-cba"
          onSubmit={(event) => {
            event.preventDefault();
            const value = Number(amount);
            const result = transfer(fromId, toId, value, description);
            if (result.ok) {
              setError(null);
              setSuccess(
                `${formatCurrency(value)} transferred to ${
                  accounts.find((account) => account.id === toId)?.name ?? "your account"
                }.`,
              );
            } else {
              setSuccess(null);
              setError(result.error);
            }
          }}
        >
          <SelectField
            label="From"
            value={fromId}
            onChange={(event) => {
              setFromId(event.target.value);
              setError(null);
              setSuccess(null);
            }}
          >
            {transferable.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} — {formatCurrency(account.available)} available
              </option>
            ))}
          </SelectField>

          <SelectField
            label="To"
            value={toId}
            onChange={(event) => {
              setToId(event.target.value);
              setError(null);
              setSuccess(null);
            }}
          >
            {transferable.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} — {maskAccountNumber(account.bsb, account.number)}
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
            label="Description"
            hint="Appears on both accounts"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <Button type="submit" size="lg" className="w-full">
            Transfer
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
          <h2 className="text-base font-extrabold text-ink">Your balances</h2>
          <ul className="mt-4 divide-y divide-line-soft">
            {accounts.map((account) => (
              <li key={account.id} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-[15px] text-ink-soft">{account.name}</span>
                <span className="shrink-0 text-[15px] font-bold tabular-nums text-ink">
                  {formatCurrency(account.balance)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] leading-relaxed text-ink-faint">
            Term Deposits cannot be used for transfers until maturity. All balances are demo data
            stored in your browser.
          </p>
        </div>
      </div>
    </NetBankLayout>
  );
}
