import { SITE } from "@/data/site";
import { TECH_FACTS } from "@/data/stats";

export function StatStack() {
  return (
    <section className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">{SITE.techPowers}</p>
        <div className="mt-10 space-y-16">
          {TECH_FACTS.map((fact) => (
            <article key={fact.title} className="max-w-4xl">
              <h3 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{fact.title}</h3>
              <p className="mt-4 text-go-muted">{fact.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
