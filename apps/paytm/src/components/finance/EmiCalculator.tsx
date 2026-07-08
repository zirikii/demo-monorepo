import { useMemo, useState } from "react";
import { calculateEmi } from "../../lib/emi";
import { formatInr } from "../../lib/format";

/** Interactive EMI calculator with amount/rate/tenure sliders. */
export function EmiCalculator() {
  const [principal, setPrincipal] = useState(300_000);
  const [rate, setRate] = useState(11.5);
  const [months, setMonths] = useState(36);

  const { monthlyEmi, totalInterest, totalPayable } = useMemo(
    () => calculateEmi(principal, rate, months),
    [principal, rate, months],
  );

  return (
    <div id="emi-calculator" className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
      <h2 className="text-lg font-bold text-paytm-navy">EMI Calculator</h2>
      <p className="mt-1 text-xs text-ink-soft">
        Reducing-balance math, updated live as you move the sliders.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-7">
          <Slider
            label="Loan Amount"
            value={principal}
            display={formatInr(principal)}
            min={50_000}
            max={1_000_000}
            step={10_000}
            onChange={setPrincipal}
          />
          <Slider
            label="Interest Rate (p.a.)"
            value={rate}
            display={`${rate.toFixed(2)}%`}
            min={8}
            max={24}
            step={0.25}
            onChange={setRate}
          />
          <Slider
            label="Tenure"
            value={months}
            display={`${months} months`}
            min={6}
            max={60}
            step={6}
            onChange={setMonths}
          />
        </div>

        <dl className="space-y-3 rounded-2xl bg-surface-soft p-6">
          <div>
            <dt className="text-xs text-ink-soft">Monthly EMI</dt>
            <dd data-testid="emi-monthly" className="text-2xl font-extrabold text-paytm-navy">
              {formatInr(Math.round(monthlyEmi))}
            </dd>
          </div>
          <div className="border-t border-hairline pt-3">
            <dt className="text-xs text-ink-soft">Total Interest</dt>
            <dd className="text-sm font-bold text-ink">{formatInr(Math.round(totalInterest))}</dd>
          </div>
          <div className="border-t border-hairline pt-3">
            <dt className="text-xs text-ink-soft">Total Payable</dt>
            <dd className="text-sm font-bold text-ink">{formatInr(Math.round(totalPayable))}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function Slider({ label, value, display, min, max, step, onChange }: SliderProps) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink-soft">{label}</span>
        <span className="font-extrabold text-paytm-navy">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-paytm-cyan"
      />
    </label>
  );
}
