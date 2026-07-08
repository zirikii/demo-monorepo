import { Link } from "react-router-dom";
import { ArrowRight, Store } from "lucide-react";
import { businessProducts } from "../../data/finance";

/** "Accept payments online & offline" merchant band. */
export function BusinessSection() {
  return (
    <section aria-label="Paytm for Business" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="grid items-center gap-8 rounded-3xl bg-gradient-to-br from-paytm-navy-deep via-paytm-navy to-paytm-navy-mid p-8 text-white shadow-card sm:p-10 lg:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/70">
            <Store aria-hidden="true" className="h-4 w-4" /> Paytm for Business
          </p>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
            Accept payments <br />
            <span className="text-paytm-cyan">online &amp; offline</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
            Millions of small and big businesses accept payments with QR, Soundbox, card machines,
            and gateway APIs — with settlements that keep cash flow moving.
          </p>
          <Link
            to="/business"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-paytm-cyan px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-paytm-cyan-deep"
          >
            Learn More <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {businessProducts.map((p) => (
            <li key={p.id} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <h3 className="text-sm font-bold">{p.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/75">{p.tagline}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
