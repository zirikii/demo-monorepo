import { Link } from "react-router-dom";
import { homeHighlights, homeStats } from "@/data/home";

export function HighlightsRow() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {homeStats.map((s) => (
            <div key={s.label} className="rounded-xl bg-card px-5 py-4 shadow-card">
              <p className="text-2xl font-extrabold text-cba-black">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {homeHighlights.map((h) => (
            <Link
              key={h.to}
              to={h.to}
              className="rounded-xl border border-line bg-card p-6 hover:border-cba-yellow"
            >
              <h3 className="text-lg font-bold text-ink">{h.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{h.body}</p>
              <span className="mt-4 inline-block text-sm font-bold text-cba-blue">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
