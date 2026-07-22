import Link from "next/link";

export function EntertainmentBand() {
  return (
    <section className="bg-optus-ink text-white">
      <div className="container flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-optus-yellow">
            Entertainment
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">Optus Sport — live footy and more</h2>
          <p className="mt-2 text-white/75">
            Eligible plans include Optus Sport access in this demo. Stream matches and highlights
            without a separate subscription fee (simulated entitlement).
          </p>
        </div>
        <Link
          href="/entertainment"
          className="inline-flex h-11 shrink-0 items-center rounded-full bg-optus-yellow px-6 text-sm font-bold text-optus-ink"
        >
          Discover Optus Sport
        </Link>
      </div>
    </section>
  );
}
