export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line bg-optus-teal-light">
      <div className="container py-12 md:py-16">
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-optus-teal-dark">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-balance text-4xl font-extrabold text-optus-ink md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-optus-ink/70 md:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
