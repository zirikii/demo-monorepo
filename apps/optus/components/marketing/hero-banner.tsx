import Link from "next/link";

export function HeroBanner({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-optus-yellow">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/30 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-40 h-80 w-80 rounded-full bg-optus-yellow-dark/40 blur-2xl"
      />
      <div className="container relative grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.18em] text-optus-ink/70">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-xl animate-fade-up text-balance text-4xl font-bold tracking-tight text-optus-ink md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-lg animate-fade-up text-base text-optus-ink/80 md:text-lg">
            {description}
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3">
            <Link
              href="/mobile-plans"
              className="inline-flex h-12 items-center rounded-md bg-optus-ink px-6 text-sm font-semibold text-white hover:bg-optus-ink/90"
            >
              Shop mobile plans
            </Link>
            <Link
              href="/internet"
              className="inline-flex h-12 items-center rounded-md border border-optus-ink bg-white/60 px-6 text-sm font-semibold text-optus-ink backdrop-blur hover:bg-white"
            >
              Explore internet
            </Link>
          </div>
        </div>

        <div className="relative hidden animate-fade-up md:block">
          <div className="ml-auto flex max-w-sm flex-col gap-4 rounded-2xl bg-optus-ink p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-optus-yellow">
              Optus Choice Plus
            </p>
            <p className="text-5xl font-bold">
              $69<span className="text-xl font-semibold text-white/70">/mth</span>
            </p>
            <p className="text-4xl font-bold text-optus-yellow">180GB</p>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Optus Sport included</li>
              <li>5G at no extra cost</li>
              <li>No lock-in contract</li>
            </ul>
            <Link
              href="/mobile-plans"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-optus-yellow px-5 text-sm font-semibold text-optus-ink hover:bg-optus-yellow-dark"
            >
              Get this plan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
