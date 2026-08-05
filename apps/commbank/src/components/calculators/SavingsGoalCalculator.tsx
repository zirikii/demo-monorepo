import { useMemo, useState } from "react";
import { calculateSavingsGoal } from "@/lib/calculators";
import { formatCurrency, formatCurrencyWhole } from "@/lib/format";
import { SelectField, TextField } from "../ui/Field";

export function SavingsGoalCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(5000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(800);
  const [rate, setRate] = useState(5.2);
  const [months, setMonths] = useState(24);

  const result = useMemo(
    () => calculateSavingsGoal({ initialDeposit, monthlyDeposit, annualRate: rate, months }),
    [initialDeposit, monthlyDeposit, rate, months],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Starting balance"
            type="number"
            min={0}
            step={100}
            prefix="$"
            value={initialDeposit}
            onChange={(event) => setInitialDeposit(Number(event.target.value))}
          />
          <TextField
            label="Monthly deposit"
            type="number"
            min={0}
            step={50}
            prefix="$"
            value={monthlyDeposit}
            onChange={(event) => setMonthlyDeposit(Number(event.target.value))}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Interest rate"
            hint="% per annum, compounded monthly"
            type="number"
            min={0}
            step={0.01}
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
          />
          <SelectField
            label="Time frame"
            value={months}
            onChange={(event) => setMonths(Number(event.target.value))}
          >
            {[6, 12, 24, 36, 60].map((option) => (
              <option key={option} value={option}>
                {option} months
              </option>
            ))}
          </SelectField>
        </div>
      </form>

      <div className="rounded-cba-lg bg-cba-yellow p-8">
        <p className="text-[13px] font-bold uppercase tracking-wider text-ink/70">
          Projected balance
        </p>
        <p data-testid="savings-balance" className="mt-2 text-5xl font-extrabold text-ink">
          {formatCurrencyWhole(result.balance)}
        </p>
        <dl className="mt-8 space-y-3 border-t border-ink/20 pt-6 text-[15px] text-ink">
          <div className="flex justify-between gap-4">
            <dt className="text-ink/70">You deposit</dt>
            <dd className="font-bold">{formatCurrencyWhole(result.contributed)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink/70">Interest earned</dt>
            <dd className="font-bold">{formatCurrency(result.interestEarned)}</dd>
          </div>
        </dl>
        <p className="mt-6 text-[12px] leading-relaxed text-ink/60">
          Assumes the rate stays the same for the whole period and deposits are made at the end of
          each month. Introductory rates only apply for the promotional period.
        </p>
      </div>
    </div>
  );
}
