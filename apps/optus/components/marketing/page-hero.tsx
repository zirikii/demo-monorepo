export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-optus-yellow">
      <div className="container py-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-optus-ink/70">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl text-balance text-3xl font-bold tracking-tight text-optus-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-optus-ink/80 md:text-lg">{description}</p>
      </div>
    </section>
  );
}
