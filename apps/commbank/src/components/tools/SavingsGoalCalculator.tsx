import { useMemo, useState } from "react";
import { SelectField, TextField } from "@/components/ui/Field";
import { calculateSavingsGoal } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";

export function SavingsGoalCalculator() {
  const [initial, setInitial] = useState("5000");
  const [monthly, setMonthly] = useState("800");
  const [months, setMonths] = useState("24");
  const [rate, setRate] = useState("5.00");

  const result = useMemo(
    () =>
      calculateSavingsGoal({
        initialDeposit: Number(initial) || 0,
        monthlyDeposit: Number(monthly) || 0,
        annualRate: Number(rate) || 0,
        months: Number(months) || 0,
      }),
    [initial, monthly, months, rate],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <TextField
          label="Starting balance"
          prefix="$"
          inputMode="numeric"
          value={initial}
          onChange={(event) => setInitial(event.target.value.replace(/[^0-9.]/g, ""))}
        />
        <TextField
          label="Monthly deposit"
          prefix="$"
          inputMode="numeric"
          value={monthly}
          onChange={(event) => setMonthly(event.target.value.replace(/[^0-9.]/g, ""))}
        />
        <SelectField
          label="Time frame"
          value={months}
          onChange={(event) => setMonths(event.target.value)}
        >
          {[6, 12, 24, 36, 60].map((count) => (
            <option key={count} value={count}>
              {count} months
            </option>
          ))}
        </SelectField>
        <TextField
          label="Interest rate (% p.a.)"
          inputMode="decimal"
          value={rate}
          onChange={(event) => setRate(event.target.value.replace(/[^0-9.]/g, ""))}
          hint="GoalSaver total variable rate is 5.00% p.a."
        />
      </form>

      <aside aria-live="polite" className="h-fit rounded-2xl border-2 border-black bg-surface p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
          Estimated balance
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-black">
          {formatCurrency(result.balance)}
        </p>
        <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">You contribute</dt>
            <dd className="font-semibold text-black tabular-nums">
              {formatCurrency(result.contributed)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Interest earned</dt>
            <dd className="font-semibold text-positive tabular-nums">
              {formatCurrency(result.interestEarned)}
            </dd>
          </div>
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-ink-muted">
          Assumes interest is compounded monthly and the rate stays the same. Estimates only.
        </p>
      </aside>
    </div>
  );
}
