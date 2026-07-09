import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";

/** Paytm Money band: MTF pitch + mini chart mock. */
export function MoneySection() {
  return (
    <section aria-label="Paytm Money" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="grid items-center gap-8 rounded-3xl bg-card p-8 shadow-card sm:p-10 lg:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-soft">
            <TrendingUp aria-hidden="true" className="h-4 w-4 text-paytm-navy" /> Paytm Money
          </p>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Switch to Paytm Money. <br /> Pay less, trade more.
          </h2>
          <p className="mt-2 text-xl font-bold text-paytm-cyan">
            Margin Trading Facility at 7.99%* p.a.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Get up to 4x buying power on 1,200+ stocks at low interest rates. Flat-fee broking with
            instant fund transfers from your linked bank account.
          </p>
          <Link
            to="/paytm-money"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-paytm-navy px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-paytm-navy-mid"
          >
            Invest With MTF <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-[10px] leading-relaxed text-ink-faint">
            *Illustrative demo rate. Investments in securities are subject to market risk — this
            demo does not place real orders or offer advice.
          </p>
        </div>
        <ChartMock />
      </div>
    </section>
  );
}

function ChartMock() {
  const bars = [34, 48, 40, 62, 55, 74, 66, 88, 79, 95];
  return (
    <div aria-hidden="true" className="rounded-2xl border border-hairline bg-surface-soft p-5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-ink">NIFTY 50 · demo</span>
        <span className="font-semibold text-success">+1.24%</span>
      </div>
      <div className="mt-4 flex h-36 items-end gap-2">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={`flex-1 rounded-t ${i % 3 === 2 ? "bg-paytm-cyan" : "bg-paytm-navy/70"}`}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-ink-soft">
        <div className="rounded-lg bg-card p-2 shadow-sm">
          <p className="font-bold text-ink">₹20</p>
          <p>per order</p>
        </div>
        <div className="rounded-lg bg-card p-2 shadow-sm">
          <p className="font-bold text-ink">4x</p>
          <p>buying power</p>
        </div>
        <div className="rounded-lg bg-card p-2 shadow-sm">
          <p className="font-bold text-ink">1,200+</p>
          <p>MTF stocks</p>
        </div>
      </div>
    </div>
  );
}
