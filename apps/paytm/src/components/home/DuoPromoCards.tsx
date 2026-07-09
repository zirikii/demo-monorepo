import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";

/** Side-by-side Credit Cards + Insurance promo cards. */
export function DuoPromoCards() {
  return (
    <section aria-label="Cards and insurance" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fdeef1] to-[#fce3e9] p-8 pb-44 shadow-card sm:pb-48">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-soft">
            <CreditCard aria-hidden="true" className="h-4 w-4 text-danger" /> Credit Cards
          </p>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            One destination for <br />
            <span className="text-paytm-cyan">Credit Cards</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm text-ink-soft">
            Compare co-branded cards with assured cashback and rewards, apply in minutes, and track
            the application right here.
          </p>
          <Link
            to="/credit-cards"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-paytm-navy px-5 py-2 text-sm font-bold text-paytm-navy transition-colors hover:bg-paytm-navy hover:text-white"
          >
            Apply Now <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <CardFan />
        </article>

        <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-paytm-sky to-[#d7f3fd] p-8 pb-44 shadow-card sm:pb-48">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-soft">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-paytm-navy" /> Insurance Broking
          </p>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Insurance ka <br />
            <span className="text-paytm-cyan">Super Market</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm text-ink-soft">
            A smart, simple, and transparent way to explore bike, car, health, and term plans from
            leading insurers.
          </p>
          <Link
            to="/insurance"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-paytm-navy px-5 py-2 text-sm font-bold text-paytm-navy transition-colors hover:bg-paytm-navy hover:text-white"
          >
            Get It Now <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <ShieldArt />
        </article>
      </div>
    </section>
  );
}

/** Decorative fanned card stack. */
function CardFan() {
  const cards = [
    { bg: "#101828", rotate: "-8deg" },
    { bg: "#27408b", rotate: "0deg" },
    { bg: "#7a1f3d", rotate: "8deg" },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-6 flex gap-0">
      {cards.map((c, i) => (
        <div
          key={i}
          style={{ backgroundColor: c.bg, transform: `rotate(${c.rotate})` }}
          className="-ml-10 h-36 w-56 rounded-2xl p-4 shadow-float"
        >
          <div className="h-2 w-10 rounded-full bg-white/30" />
          <div className="mt-14 h-2 w-20 rounded-full bg-white/40" />
          <div className="mt-2 h-2 w-14 rounded-full bg-white/25" />
        </div>
      ))}
    </div>
  );
}

function ShieldArt() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-8 right-8 flex h-36 w-36 items-center justify-center rounded-full bg-white/50 text-6xl"
    >
      🛡️
    </div>
  );
}
