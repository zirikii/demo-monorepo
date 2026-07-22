export function CoverageTeaser() {
  return (
    <section className="bg-surface-subtle">
      <div className="container grid gap-8 py-14 md:grid-cols-3">
        {[["Sydney", "Strong demo 5G availability across CBD and inner suburbs."], ["Melbourne", "Mobile and home internet cards use Victoria examples."], ["Brisbane", "Queensland usage and billing examples are included."]].map(([city, copy]) => (
          <article key={city} className="rounded-xl border border-line bg-white p-6"><p className="text-xs font-bold uppercase tracking-wide text-optus-teal-dark">Coverage sample</p><h2 className="mt-2 text-2xl font-black text-optus-ink">{city}</h2><p className="mt-3 text-sm text-optus-ink/70">{copy}</p></article>
        ))}
      </div>
    </section>
  );
}
