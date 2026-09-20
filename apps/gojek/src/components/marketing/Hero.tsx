import { SITE } from "@/data/site";
import { IMPACT_STATS } from "@/data/stats";

export function Hero() {
  return (
    <section className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-24">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">Gojek Tech</p>
        <h1 className="mt-5 text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl lg:text-8xl">
          {SITE.heroLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-go-muted sm:text-xl">{SITE.heroSub}</p>
        <dl className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="border-t border-white/12 pt-4">
              <dt className="text-sm text-go-faint">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
