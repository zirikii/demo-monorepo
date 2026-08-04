import { useMemo, useState } from "react";
import { monthlyRepayment, totalInterest } from "@/lib/loanMath";
import { formatAud, formatAudCompact } from "@/lib/format";

export function LoanCalculator({
  title = "Home loan calculator",
  defaultPrincipal = 650000,
  defaultRate = 5.99,
  defaultYears = 30,
}: {
  title?: string;
  defaultPrincipal?: number;
  defaultRate?: number;
  defaultYears?: number;
}) {
  const [principal, setPrincipal] = useState(defaultPrincipal);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);

  const monthly = useMemo(() => monthlyRepayment(principal, rate, years), [principal, rate, years]);
  const interest = useMemo(() => totalInterest(principal, rate, years), [principal, rate, years]);

  return (
    <div className="rounded-xl border border-line bg-card p-6 shadow-card">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-ink-soft">Illustrative only — not a quote or offer.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          <span className="font-semibold">Loan amount</span>
          <input
            type="range"
            min={100000}
            max={2000000}
            step={10000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="mt-2 w-full accent-cba-yellow"
          />
          <span className="mt-1 block text-ink">{formatAudCompact(principal)}</span>
        </label>
        <label className="text-sm">
          <span className="font-semibold">Interest rate</span>
          <input
            type="range"
            min={2}
            max={12}
            step={0.01}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full accent-cba-yellow"
          />
          <span className="mt-1 block text-ink">{rate.toFixed(2)}% p.a.</span>
        </label>
        <label className="text-sm">
          <span className="font-semibold">Term (years)</span>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2 w-full accent-cba-yellow"
          />
          <span className="mt-1 block text-ink">{years} years</span>
        </label>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-cba-yellow-soft px-4 py-3">
          <p className="text-xs font-bold uppercase text-ink-faint">Est. monthly repayment</p>
          <p className="text-2xl font-extrabold text-cba-black" data-testid="monthly-repayment">
            {formatAud(monthly)}
          </p>
        </div>
        <div className="rounded-lg bg-surface px-4 py-3">
          <p className="text-xs font-bold uppercase text-ink-faint">Total interest (demo)</p>
          <p className="text-2xl font-extrabold text-ink">{formatAud(interest)}</p>
        </div>
      </div>
    </div>
  );
}
