import { useState } from "react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField, ToggleRow } from "@/components/ui/Field";
import type { RecurringFrequency } from "@/data/types";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency, formatDate, maskAccountNumber, todayIso } from "@/lib/format";
import { frequencyLabels } from "@/lib/recurring";

type EndMode = "never" | "count";

export function NetBankTransferPage() {
  useDocumentTitle("Transfer — NetBank");
  const { accounts, transfer, recurringTransfers, createRecurring, cancelRecurring } =
    useBanking();

  const [fromId, setFromId] = useState("smart-access");
  const [toId, setToId] = useState("netbank-saver");
  const [amount, setAmount] = useState("250");
  const [description, setDescription] = useState("Transfer");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<RecurringFrequency>("monthly");
  const [startDate, setStartDate] = useState(() => todayIso());
  const [endMode, setEndMode] = useState<EndMode>("never");
  const [paymentCount, setPaymentCount] = useState("12");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const transferable = accounts.filter((account) => account.kind !== "term-deposit");
  const activeRecurring = recurringTransfers.filter((item) => item.status === "active");

  const accountName = (id: string) =>
    accounts.find((account) => account.id === id)?.name ?? "your account";

  const clearFeedback = () => {
    setError(null);
    setSuccess(null);
  };

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

            if (!isRecurring) {
              const result = transfer(fromId, toId, value, description);
              if (result.ok) {
                setError(null);
                setSuccess(
                  `${formatCurrency(value)} transferred to ${accountName(toId)}.`,
                );
              } else {
                setSuccess(null);
                setError(result.error);
              }
              return;
            }

            const remainingPayments =
              endMode === "never" ? null : Number.parseInt(paymentCount, 10);
            const result = createRecurring({
              fromId,
              toId,
              amount: value,
              description,
              frequency,
              startDate,
              remainingPayments,
            });

            if (result.ok) {
              setError(null);
              const toLabel = accountName(toId);
              if (result.paymentsProcessed > 0) {
                setSuccess(
                  `${formatCurrency(value)} transferred to ${toLabel}. Your ${frequencyLabels[frequency].toLowerCase()} regular transfer is set up.`,
                );
              } else {
                setSuccess(
                  `Regular transfer to ${toLabel} is set up. The first payment is scheduled for ${formatDate(startDate)}.`,
                );
              }
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
              clearFeedback();
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
              clearFeedback();
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
            error={!isRecurring ? (error ?? undefined) : undefined}
            onChange={(event) => {
              setAmount(event.target.value);
              clearFeedback();
            }}
          />

          <TextField
            label="Description"
            hint="Appears on both accounts"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <section className="overflow-hidden rounded-cba-md border border-line-soft">
            <div className="px-4 sm:px-5">
              <ToggleRow
                label="Make this a regular transfer"
                description="Repeat this transfer on a schedule you choose."
                checked={isRecurring}
                onChange={(next) => {
                  setIsRecurring(next);
                  clearFeedback();
                }}
              />
            </div>

            {isRecurring ? (
              <div className="space-y-5 border-t border-line-soft bg-surface-tint px-4 py-5 sm:px-5">
                <div>
                  <h3 className="text-sm font-bold text-ink">Transfer schedule</h3>
                  <p className="mt-0.5 text-[13px] text-ink-faint">
                    Choose how often to transfer and when payments should run.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Frequency"
                    value={frequency}
                    onChange={(event) => {
                      setFrequency(event.target.value as RecurringFrequency);
                      clearFeedback();
                    }}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="fortnightly">Fortnightly</option>
                    <option value="monthly">Monthly</option>
                  </SelectField>

                  <TextField
                    label="Start date"
                    type="date"
                    value={startDate}
                    onChange={(event) => {
                      setStartDate(event.target.value);
                      clearFeedback();
                    }}
                  />
                </div>

                <div
                  className={
                    endMode === "count" ? "grid gap-5 sm:grid-cols-2 sm:items-start" : undefined
                  }
                >
                  <SelectField
                    label="Ends"
                    value={endMode}
                    onChange={(event) => {
                      setEndMode(event.target.value as EndMode);
                      clearFeedback();
                    }}
                  >
                    <option value="never">Never</option>
                    <option value="count">After a number of payments</option>
                  </SelectField>

                  {endMode === "count" ? (
                    <TextField
                      label="Number of payments"
                      type="number"
                      min={1}
                      step={1}
                      value={paymentCount}
                      onChange={(event) => {
                        setPaymentCount(event.target.value);
                        clearFeedback();
                      }}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </section>

          <Button type="submit" size="lg" className="w-full">
            {isRecurring ? "Set up regular transfer" : "Transfer"}
          </Button>

          {error && isRecurring ? (
            <p
              role="alert"
              className="rounded-cba-md border border-critical/15 bg-critical/10 px-4 py-3 text-[15px] font-bold text-critical"
            >
              {error}
            </p>
          ) : null}

          {success ? (
            <p
              role="status"
              className="rounded-cba-md border border-positive/15 bg-positive/10 px-4 py-3 text-[15px] font-bold text-positive"
            >
              {success}
            </p>
          ) : null}
        </form>

        <div className="space-y-6">
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

          <div className="rounded-cba-lg bg-surface p-6 shadow-cba">
            <h2 className="text-base font-extrabold text-ink">Regular transfers</h2>
            {activeRecurring.length === 0 ? (
              <div
                className="mt-4 rounded-cba-md border border-dashed border-line-soft bg-surface-tint px-4 py-6 text-center"
              >
                <p className="text-[15px] font-bold text-ink">No regular transfers yet</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                  Turn on regular transfer above to schedule money between your accounts.
                </p>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-line-soft">
                {activeRecurring.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-bold text-ink">
                        {formatCurrency(item.amount)} · {frequencyLabels[item.frequency]}
                      </p>
                      <p className="mt-0.5 text-[13px] text-ink-soft">
                        {accountName(item.fromId)} → {accountName(item.toId)}
                      </p>
                      <p className="mt-1 text-[13px] text-ink-faint">
                        Next payment {formatDate(item.nextDate)}
                        {item.remainingPayments !== null
                          ? ` · ${item.remainingPayments} payment${item.remainingPayments === 1 ? "" : "s"} left`
                          : ""}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="shrink-0 self-start py-2"
                      onClick={() => {
                        cancelRecurring(item.id);
                        setSuccess("Regular transfer cancelled.");
                        setError(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-5 text-[13px] leading-relaxed text-ink-faint">
              Due regular transfers run when you open NetBank in this demo. In the real NetBank app
              they process on the scheduled date.
            </p>
          </div>
        </div>
      </div>
    </NetBankLayout>
  );
}
