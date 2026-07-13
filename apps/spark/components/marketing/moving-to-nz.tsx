import Link from "next/link";
import { movingSection } from "@/lib/constants/travel-move";

export function MovingToNz() {
  const s = movingSection;
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-spark-ink md:text-4xl">{s.title}</h2>
        <p className="mt-4 max-w-3xl text-base text-spark-ink/80 md:text-lg">{s.intro}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {[s.mobile, s.broadband].map((col) => (
            <article key={col.title} className="rounded-lg border border-line bg-surface-subtle p-8">
              <h3 className="text-2xl font-bold text-spark-ink">{col.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-spark-ink/80 md:text-base">{col.body}</p>
              <Link
                href={col.cta.href}
                className="mt-6 inline-flex h-11 items-center rounded-md bg-spark-purple px-5 text-sm font-semibold text-white hover:bg-spark-purple-dark"
              >
                {col.cta.label}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
