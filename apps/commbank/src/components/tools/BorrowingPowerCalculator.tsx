import { useMemo, useState } from "react";
import { SelectField, TextField } from "@/components/ui/Field";
import { calculateBorrowingPower } from "@/lib/calculators";
import { formatCurrencyWhole } from "@/lib/format";

export function BorrowingPowerCalculator() {
  const [income, setIncome] = useState("145000");
  const [expenses, setExpenses] = useState("3200");
  const [commitments, setCommitments] = useState("450");
  const [dependants, setDependants] = useState("1");

  const estimate = useMemo(
    () =>
      calculateBorrowingPower({
        annualIncome: Number(income) || 0,
        monthlyExpenses: Number(expenses) || 0,
        existingRepayments: Number(commitments) || 0,
        dependants: Number(dependants) || 0,
        assessmentRate: 8.89,
        years: 30,
      }),
    [income, expenses, commitments, dependants],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <TextField
          label="Combined annual income (before tax)"
          prefix="$"
          inputMode="numeric"
          value={income}
          onChange={(event) => setIncome(event.target.value.replace(/[^0-9.]/g, ""))}
        />
        <TextField
          label="Monthly living expenses"
          prefix="$"
          inputMode="numeric"
          value={expenses}
          onChange={(event) => setExpenses(event.target.value.replace(/[^0-9.]/g, ""))}
        />
        <TextField
          label="Existing monthly loan repayments"
          prefix="$"
          inputMode="numeric"
          value={commitments}
          onChange={(event) => setCommitments(event.target.value.replace(/[^0-9.]/g, ""))}
        />
        <SelectField
          label="Dependants"
          value={dependants}
          onChange={(event) => setDependants(event.target.value)}
        >
          {[0, 1, 2, 3, 4, 5].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </SelectField>
      </form>

      <aside aria-live="polite" className="h-fit rounded-2xl border-2 border-black bg-surface p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
          You may be able to borrow
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-black">
          {formatCurrencyWhole(estimate)}
        </p>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          Assessed over 30 years at a serviceability rate of 8.89% p.a., which is above the
          advertised rate to allow for future rate rises. Indicative only and not an offer of
          credit.
        </p>
      </aside>
    </div>
  );
}
