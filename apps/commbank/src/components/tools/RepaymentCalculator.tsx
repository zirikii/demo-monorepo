import { useMemo, useState } from "react";
import { SelectField, TextField } from "@/components/ui/Field";
import { Tabs } from "@/components/ui/Tabs";
import { calculateRepayment, type RepaymentFrequency } from "@/lib/calculators";
import { formatCurrency, formatCurrencyWhole } from "@/lib/format";

const frequencyOptions = [
  { id: "weekly" as const, label: "Weekly" },
  { id: "fortnightly" as const, label: "Fortnightly" },
  { id: "monthly" as const, label: "Monthly" },
];

export function RepaymentCalculator() {
  const [amount, setAmount] = useState("650000");
  const [rate, setRate] = useState("5.89");
  const [years, setYears] = useState("30");
  const [frequency, setFrequency] = useState<RepaymentFrequency>("monthly");
  const [interestOnly, setInterestOnly] = useState(false);

  const result = useMemo(
    () =>
      calculateRepayment({
        principal: Number(amount) || 0,
        annualRate: Number(rate) || 0,
        years: Number(years) || 0,
        frequency,
        interestOnly,
      }),
    [amount, rate, years, frequency, interestOnly],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <TextField
          label="Loan amount"
          prefix="$"
          inputMode="numeric"
          value={amount}
          onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ""))}
          hint="How much you'd like to borrow"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Interest rate (% p.a.)"
            inputMode="decimal"
            value={rate}
            onChange={(event) => setRate(event.target.value.replace(/[^0-9.]/g, ""))}
            hint="Standard Variable Rate is currently 5.89% p.a."
          />
          <SelectField
            label="Loan term"
            value={years}
            onChange={(event) => setYears(event.target.value)}
            hint="Most home loans run for 25 to 30 years"
          >
            {[10, 15, 20, 25, 30].map((term) => (
              <option key={term} value={term}>
                {term} years
              </option>
            ))}
          </SelectField>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-black">Repayment frequency</p>
          <Tabs
            options={frequencyOptions}
            value={frequency}
            onChange={setFrequency}
            ariaLabel="Repayment frequency"
          />
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-line bg-surface-tint p-4">
          <input
            id="interest-only"
            type="checkbox"
            checked={interestOnly}
            onChange={(event) => setInterestOnly(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-black"
          />
          <label htmlFor="interest-only" className="text-sm text-ink-soft">
            <span className="block font-semibold text-black">Interest Only payments</span>
            Your payments only cover interest, so the loan balance stays the same for the
            interest-only period.
          </label>
        </div>
      </form>

      <aside
        aria-live="polite"
        className="h-fit rounded-2xl border-2 border-black bg-surface p-6 lg:sticky lg:top-32"
      >
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
          Your estimated repayment
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-black">
          {formatCurrency(result.repayment)}
        </p>
        <p className="text-sm text-ink-soft">per {frequency.replace("ly", "")}</p>

        <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Number of repayments</dt>
            <dd className="font-semibold text-black tabular-nums">{result.numberOfRepayments}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Total interest</dt>
            <dd className="font-semibold text-black tabular-nums">
              {formatCurrencyWhole(result.totalInterest)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Total repaid</dt>
            <dd className="font-semibold text-black tabular-nums">
              {formatCurrencyWhole(result.totalRepaid)}
            </dd>
          </div>
        </dl>

        <p className="mt-5 text-xs leading-relaxed text-ink-muted">
          Estimates only. Calculations assume the interest rate doesn&apos;t change over the life of
          the loan and exclude fees, charges and Lenders&apos; Mortgage Insurance.
        </p>
      </aside>
    </div>
  );
}
