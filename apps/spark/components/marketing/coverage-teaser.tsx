import { coverageTeaser } from "@/lib/constants/travel-move";

export function CoverageTeaser() {
  const s = coverageTeaser;
  return (
    <section className="bg-surface-subtle py-12 md:py-16">
      <div className="container grid items-center gap-8 md:grid-cols-2">
        <img
          src={s.image}
          alt="Spark network coverage"
          className="w-full rounded-lg object-cover shadow-sm"
        />
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-spark-ink md:text-4xl">{s.title}</h2>
          <p className="mt-4 text-sm text-spark-ink/70">{s.description}</p>
        </div>
      </div>
    </section>
  );
}
