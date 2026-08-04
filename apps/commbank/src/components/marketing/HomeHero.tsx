import { Link } from "react-router-dom";
import { homeHero } from "@/data/home";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#FFCC00_0%,_transparent_55%),linear-gradient(135deg,_#fff6cc_0%,_#ffffff_45%,_#f5f5f5_100%)]" />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-[120%] w-1/2 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #FFCC00 0 12px, transparent 12px 24px)",
          maskImage: "linear-gradient(90deg, transparent, black)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
        <div>
          <p className="animate-fade-up text-sm font-bold uppercase tracking-[0.2em] text-cba-black/70">
            Commonwealth Bank
          </p>
          <h1 className="mt-3 animate-fade-up text-5xl font-extrabold tracking-tight text-cba-black sm:text-6xl lg:text-7xl">
            {homeHero.title}
          </h1>
          <p className="mt-4 max-w-xl animate-fade-up text-lg font-semibold text-ink sm:text-xl">
            {homeHero.subtitle}
          </p>
          <p className="mt-3 max-w-xl animate-fade-up text-base text-ink-soft">{homeHero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
            <Link
              to={homeHero.primaryCta.to}
              className="inline-flex rounded-md bg-cba-yellow px-6 py-3 text-sm font-bold text-cba-black shadow-card hover:bg-cba-yellow-deep"
            >
              {homeHero.primaryCta.label}
            </Link>
            <Link
              to={homeHero.secondaryCta.to}
              className="inline-flex rounded-md border border-cba-black/15 bg-card/80 px-6 py-3 text-sm font-semibold text-ink backdrop-blur hover:bg-card"
            >
              {homeHero.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="animate-fade-up rounded-2xl border border-line bg-card/90 p-6 shadow-float backdrop-blur">
          <img src="/brand/commbank-logo-mark.svg" alt="" className="h-14 w-14" aria-hidden="true" />
          <p className="mt-4 text-2xl font-extrabold text-cba-black">Can we help you with?</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: "Everyday banking", to: "/banking/everyday-accounts" },
              { label: "Home loans", to: "/home-loans" },
              { label: "Credit cards", to: "/banking/credit-cards" },
              { label: "CommBank Yello", to: "/commbank-yello" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5 font-semibold hover:border-cba-yellow hover:bg-cba-yellow-soft"
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
