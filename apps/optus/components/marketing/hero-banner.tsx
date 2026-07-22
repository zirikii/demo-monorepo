import Link from "next/link";
import { hero } from "@/lib/constants/optus-landing";

export function HeroBanner() {
  return (
    <section className="optus-pattern relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.3),rgba(0,0,0,0.02))]" />
      <div className="container relative grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-optus-yellow">{hero.eyebrow}</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{hero.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">{hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={hero.primaryCta.href} className="inline-flex h-12 items-center rounded-md bg-optus-yellow px-6 text-sm font-bold text-optus-ink hover:bg-white">{hero.primaryCta.label}</Link>
            <Link href={hero.secondaryCta.href} className="inline-flex h-12 items-center rounded-md border border-white/70 px-6 text-sm font-bold text-white hover:bg-white/10">{hero.secondaryCta.label}</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/25 bg-white/15 p-6 shadow-2xl backdrop-blur">
          <div className="rounded-[1.5rem] bg-white p-6 text-optus-ink">
            <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">My Optus snapshot</p>
            <div className="mt-5 grid gap-4">
              {[["Mobile data", "64 GB left"], ["Home internet", "NBN 100 active"], ["Next bill", "$128.40 due 20 Jul"]].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-optus-teal-light p-4">
                  <p className="text-xs font-semibold uppercase text-optus-ink/60">{label}</p>
                  <p className="mt-1 text-2xl font-black text-optus-teal-dark">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
