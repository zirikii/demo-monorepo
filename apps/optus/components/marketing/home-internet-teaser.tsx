import Link from "next/link";

export function HomeInternetTeaser() {
  return (
    <section className="bg-optus-teal-light">
      <div className="container grid items-center gap-8 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold text-optus-ink">Home Internet on nbn® or 5G</h2>
          <p className="mt-3 text-optus-ink/75">
            Stream, work, and game with plans that fit your household. Check your address in this
            demo — results are simulated.
          </p>
          <Link
            href="/home-internet"
            className="mt-6 inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-semibold text-white hover:bg-optus-teal-dark"
          >
            Explore Home Internet
          </Link>
        </div>
        <div className="rounded-xl border border-optus-teal/20 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-optus-teal">Popular pick</p>
          <p className="mt-1 text-2xl font-bold text-optus-ink">nbn Home Superfast</p>
          <p className="mt-2 text-sm text-optus-ink/70">
            Typical evening speeds around 90 Mbps — ideal for busy households (demo).
          </p>
          <p className="mt-4 text-3xl font-extrabold text-optus-teal">
            $95<span className="text-sm font-semibold text-optus-ink/60">/mth</span>
          </p>
        </div>
      </div>
    </section>
  );
}
