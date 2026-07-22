import Link from "next/link";
import { whyOptus } from "@/lib/constants/optus-landing";

export function WhyOptus() {
  return (
    <section className="bg-surface-subtle py-14">
      <div className="container">
        <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Why Optus</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-optus-ink md:text-4xl">{whyOptus.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {whyOptus.items.map((item) => (
            <article key={item.title} className="rounded-xl border border-line bg-white p-6">
              <h3 className="text-xl font-black text-optus-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-optus-ink/75">{item.body}</p>
              <Link href={item.cta.href} className="mt-5 inline-flex text-sm font-bold text-optus-teal-dark hover:underline">
                {item.cta.label}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
