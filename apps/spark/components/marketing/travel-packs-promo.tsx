import Link from "next/link";
import { travelPacksSection } from "@/lib/constants/travel-move";

export function TravelPacksPromo() {
  const s = travelPacksSection;
  return (
    <section className="bg-surface-subtle py-16 md:py-20">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-spark-ink md:text-4xl">{s.title}</h2>
        <p className="mt-5 text-base leading-relaxed text-spark-ink/80 md:text-lg">{s.body}</p>
        <Link
          href={s.cta.href}
          className="mt-8 inline-flex h-12 items-center rounded-md bg-spark-purple px-6 text-sm font-semibold text-white hover:bg-spark-purple-dark"
        >
          {s.cta.label}
        </Link>
        <p className="mt-6 text-xs leading-relaxed text-spark-ink/60">{s.footnote}</p>
      </div>
    </section>
  );
}
