import { Link } from "react-router-dom";
import { FileSpreadsheet } from "lucide-react";
import { homeCategoryTiles } from "../../data/home";
import { Button } from "../ui/Button";

/**
 * Hero row: white "Recharges & Bill Payments" icon-grid card + cyan
 * "UPI Statement" side panel, matching paytm.com's above-the-fold layout.
 */
export function RechargesCard() {
  return (
    <section aria-label="Recharges and bill payments" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold text-ink">Recharges &amp; Bill Payments</h2>
          <ul className="mt-6 grid grid-cols-3 gap-x-2 gap-y-7 sm:grid-cols-6">
            {homeCategoryTiles.map((tile) => (
              <li key={tile.id}>
                <Link to={tile.to} className="group flex flex-col items-center gap-2.5 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface transition-transform group-hover:scale-105">
                    <img src={tile.icon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
                  </span>
                  <span className="text-xs font-medium leading-tight text-ink group-hover:text-paytm-cyan">
                    {tile.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-br from-paytm-sky to-[#d3f1fc] p-6 shadow-card">
          <div>
            <h2 className="text-lg font-extrabold leading-snug text-ink">
              Get UPI Statement <br /> in Excel / PDF
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Track all your expenses with a monthly, categorised statement — export any time.
            </p>
          </div>
          <div className="flex items-end justify-between gap-3">
            <Link to="/upi">
              <Button variant="navy" size="sm">
                <FileSpreadsheet aria-hidden="true" className="h-4 w-4" />
                Learn More
              </Button>
            </Link>
            <MiniStatement />
          </div>
        </aside>
      </div>
    </section>
  );
}

/** Decorative mini statement mock (pure CSS, no external images). */
function MiniStatement() {
  const rows = [
    { label: "Groceries", amount: "-₹1,240" },
    { label: "Fuel", amount: "-₹800" },
    { label: "Received", amount: "+₹5,000" },
  ];
  return (
    <div aria-hidden="true" className="w-36 rounded-xl bg-card p-3 shadow-card">
      <div className="mb-2 h-1.5 w-16 rounded-full bg-paytm-cyan/60" />
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between py-1 text-[10px]">
          <span className="text-ink-soft">{r.label}</span>
          <span className={r.amount.startsWith("+") ? "font-semibold text-success" : "font-semibold text-ink"}>
            {r.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
