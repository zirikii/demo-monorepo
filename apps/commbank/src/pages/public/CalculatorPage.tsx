import { Calculator } from "lucide-react";
import { useMemo, useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { calculateMonthlyRepayment } from "@/lib/calculator";
import { formatAud } from "@/lib/format";

export function CalculatorPage() {
  const [amount, setAmount] = useState(650000);
  const [rate, setRate] = useState(6.19);
  const [years, setYears] = useState(30);
  const repayment = useMemo(() => calculateMonthlyRepayment(amount, rate, years), [amount, rate, years]);
  const total = repayment * years * 12;

  return (
    <PublicLayout>
      <section className="bg-cba-ink py-14 text-white">
        <div className="container-page">
          <Calculator aria-hidden="true" className="h-9 w-9 text-cba-yellow" />
          <h1 className="mt-4 text-4xl font-bold">Home loan repayment calculator</h1>
          <p className="mt-3 max-w-2xl text-white/75">Estimate principal-and-interest repayments using illustrative inputs.</p>
        </div>
      </section>
      <section className="container-page grid gap-8 py-12 lg:grid-cols-2">
        <form className="surface-card space-y-6 p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
          <label className="block font-semibold">Loan amount
            <span className="mt-2 flex items-center rounded-lg border border-cba-muted bg-white px-3">
              <span aria-hidden="true">$</span>
              <input className="w-full border-0 p-3 outline-none" type="number" min="10000" step="1000" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
            </span>
          </label>
          <label className="block font-semibold">Illustrative interest rate
            <span className="mt-2 flex items-center rounded-lg border border-cba-muted bg-white px-3">
              <input className="w-full border-0 p-3 outline-none" type="number" min="0" max="20" step="0.01" value={rate} onChange={(event) => setRate(Number(event.target.value))} />
              <span aria-hidden="true">% p.a.</span>
            </span>
          </label>
          <label className="block font-semibold" htmlFor="loan-term">Loan term
            <select id="loan-term" className="field mt-2" value={years} onChange={(event) => setYears(Number(event.target.value))}>
              {[10, 15, 20, 25, 30].map((value) => <option key={value} value={value}>{value} years</option>)}
            </select>
          </label>
        </form>
        <div className="rounded-[2rem] bg-cba-yellow p-7 sm:p-10" aria-live="polite">
          <p className="font-semibold">Estimated monthly repayment</p>
          <p className="mt-2 text-4xl font-bold sm:text-5xl">{formatAud(repayment)}</p>
          <div className="mt-8 border-t border-cba-ink/20 pt-6">
            <div className="flex justify-between"><span>Total repayments</span><strong>{formatAud(total)}</strong></div>
            <div className="mt-3 flex justify-between"><span>Total interest</span><strong>{formatAud(total - amount)}</strong></div>
          </div>
          <p className="mt-8 text-xs leading-5">Estimate only. It excludes fees, rate changes and repayment timing differences and is not a quote.</p>
        </div>
      </section>
    </PublicLayout>
  );
}
