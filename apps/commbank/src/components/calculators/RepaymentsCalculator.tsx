import { useMemo, useState } from "react";
import {
  calculateLvr,
  calculateRepayments,
  requiresLmi,
  type RepaymentFrequency,
  type RepaymentType,
} from "@/lib/calculators";
import { formatCurrency, formatCurrencyWhole, formatPercent } from "@/lib/format";
import { SelectField, TextField } from "../ui/Field";
import { Tabs } from "../ui/Tabs";

const frequencyOptions = [
  { value: "monthly" as const, label: "Monthly" },
  { value: "fortnightly" as const, label: "Fortnightly" },
  { value: "weekly" as const, label: "Weekly" },
];

const typeOptions = [
  { value: "principal-and-interest" as const, label: "Principal & Interest" },
  { value: "interest-only" as const, label: "Interest Only" },
];

export function RepaymentsCalculator() {
  const [propertyValue, setPropertyValue] = useState(850000);
  const [amount, setAmount] = useState(650000);
  const [rate, setRate] = useState(5.89);
  const [years, setYears] = useState(30);
  const [frequency, setFrequency] = useState<RepaymentFrequency>("monthly");
  const [type, setType] = useState<RepaymentType>("principal-and-interest");

  const result = useMemo(
    () => calculateRepayments({ amount, annualRate: rate, years, frequency, type }),
    [amount, rate, years, frequency, type],
  );

  const lvr = calculateLvr(amount, propertyValue);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <TextField
          label="Property value"
          type="number"
          min={0}
          step={5000}
          prefix="$"
          value={propertyValue}
          onChange={(event) => setPropertyValue(Number(event.target.value))}
        />
        <TextField
          label="Loan amount"
          type="number"
          min={0}
          step={5000}
          prefix="$"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Interest rate"
            hint="% per annum"
            type="number"
            min={0}
            step={0.01}
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
          />
          <SelectField
            label="Loan term"
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
          >
            {[10, 15, 20, 25, 30].map((option) => (
              <option key={option} value={option}>
                {option} years
              </option>
            ))}
          </SelectField>
        </div>

        <div>
          <p className="text-sm font-bold text-ink">Repayment frequency</p>
          <Tabs
            className="mt-2"
            label="Repayment frequency"
            options={frequencyOptions}
            value={frequency}
            onChange={setFrequency}
          />
        </div>

        <div>
          <p className="text-sm font-bold text-ink">Repayment type</p>
          <Tabs
            className="mt-2"
            label="Repayment type"
            options={typeOptions}
            value={type}
            onChange={setType}
          />
        </div>
      </form>

      <div className="rounded-cba-lg bg-ink p-8 text-surface">
        <p className="text-[13px] font-bold uppercase tracking-wider text-surface/60">
          Estimated {frequency} repayment
        </p>
        <p data-testid="repayment-amount" className="mt-2 text-5xl font-extrabold text-cba-yellow">
          {formatCurrency(result.perPeriod)}
        </p>

        <dl className="mt-8 space-y-3 border-t border-surface/20 pt-6 text-[15px]">
          <div className="flex justify-between gap-4">
            <dt className="text-surface/70">Total repaid</dt>
            <dd className="font-bold">{formatCurrencyWhole(result.totalRepaid)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-surface/70">Total interest</dt>
            <dd className="font-bold">{formatCurrencyWhole(result.totalInterest)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-surface/70">Number of repayments</dt>
            <dd className="font-bold">{result.periods}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-surface/70">Loan to Value Ratio</dt>
            <dd className="font-bold">{formatPercent(lvr, 1)}</dd>
          </div>
        </dl>

        {requiresLmi(amount, propertyValue) ? (
          <p className="mt-6 rounded-cba-md bg-cba-yellow px-4 py-3 text-[13px] font-bold text-ink">
            Your LVR is above 80%, so Lenders&rsquo; Mortgage Insurance is likely to apply.
          </p>
        ) : null}

        <p className="mt-6 text-[12px] leading-relaxed text-surface/50">
          Calculations are estimates provided as a guide only. They assume interest rates do not
          change over the life of the loan and exclude fees, charges and other amounts that may be
          charged to your loan.
        </p>
      </div>
    </div>
  );
}
