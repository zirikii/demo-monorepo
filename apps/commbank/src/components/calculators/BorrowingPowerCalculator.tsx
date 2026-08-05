import { useMemo, useState } from "react";
import { SERVICEABILITY_BUFFER, calculateBorrowingPower } from "@/lib/calculators";
import { formatCurrencyWhole, formatRate } from "@/lib/format";
import { SelectField, TextField } from "../ui/Field";

export function BorrowingPowerCalculator() {
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [partnerIncome, setPartnerIncome] = useState(0);
  const [dependants, setDependants] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(2600);
  const [monthlyCommitments, setMonthlyCommitments] = useState(400);
  const [rate, setRate] = useState(5.89);
  const [years, setYears] = useState(30);

  const capacity = useMemo(
    () =>
      calculateBorrowingPower({
        annualIncome,
        partnerIncome,
        dependants,
        monthlyExpenses,
        monthlyCommitments,
        annualRate: rate,
        years,
      }),
    [annualIncome, partnerIncome, dependants, monthlyExpenses, monthlyCommitments, rate, years],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Your annual income"
            hint="Before tax"
            type="number"
            min={0}
            step={1000}
            prefix="$"
            value={annualIncome}
            onChange={(event) => setAnnualIncome(Number(event.target.value))}
          />
          <TextField
            label="Partner's annual income"
            hint="Leave as 0 if applying alone"
            type="number"
            min={0}
            step={1000}
            prefix="$"
            value={partnerIncome}
            onChange={(event) => setPartnerIncome(Number(event.target.value))}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Dependants"
            value={dependants}
            onChange={(event) => setDependants(Number(event.target.value))}
          >
            {[0, 1, 2, 3, 4, 5].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Loan term"
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
          >
            {[20, 25, 30].map((option) => (
              <option key={option} value={option}>
                {option} years
              </option>
            ))}
          </SelectField>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Monthly living expenses"
            type="number"
            min={0}
            step={50}
            prefix="$"
            value={monthlyExpenses}
            onChange={(event) => setMonthlyExpenses(Number(event.target.value))}
          />
          <TextField
            label="Other monthly commitments"
            hint="Loans, cards, HECS"
            type="number"
            min={0}
            step={50}
            prefix="$"
            value={monthlyCommitments}
            onChange={(event) => setMonthlyCommitments(Number(event.target.value))}
          />
        </div>
        <TextField
          label="Interest rate"
          hint="% per annum"
          type="number"
          min={0}
          step={0.01}
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
        />
      </form>

      <div className="rounded-cba-lg bg-surface-tint p-8">
        <p className="text-[13px] font-bold uppercase tracking-wider text-ink-faint">
          You may be able to borrow
        </p>
        <p data-testid="borrowing-power" className="mt-2 text-5xl font-extrabold text-ink">
          {formatCurrencyWhole(capacity)}
        </p>
        <p className="mt-6 border-t border-line pt-6 text-[15px] leading-relaxed text-ink-soft">
          Assessed at {formatRate(rate + SERVICEABILITY_BUFFER)}, which adds a{" "}
          {SERVICEABILITY_BUFFER.toFixed(2)}% serviceability buffer to the rate you entered.
        </p>
        <p className="mt-4 text-[12px] leading-relaxed text-ink-faint">
          This is an estimate only, not a loan approval or a pre-approval. Applications are subject
          to credit approval, satisfactory security and minimum deposit requirements.
        </p>
      </div>
    </div>
  );
}
