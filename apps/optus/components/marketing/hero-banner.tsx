import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="hero-mesh relative overflow-hidden text-white">
      <div className="container grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fade-up space-y-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/yes-mark.svg" alt="" className="h-12 w-auto" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-optus-yellow">
            Optus
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-tight md:text-5xl">
            Stay connected across Australia — mobile, home, and entertainment.
          </h1>
          <p className="max-w-xl text-base text-white/90 md:text-lg">
            Shop Choice mobile plans, nbn® Home Internet, and the latest phones. Manage everything
            in My Optus with dummy data in this unofficial demo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mobile"
              className="inline-flex h-12 items-center rounded-full bg-optus-yellow px-7 text-base font-bold text-optus-ink hover:bg-optus-yellow-dark"
            >
              Shop mobile plans
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center rounded-full border border-white px-7 text-base font-semibold text-white hover:bg-white/10"
            >
              Go to My Optus
            </Link>
          </div>
        </div>
        <div className="animate-fade-up relative mx-auto w-full max-w-md [animation-delay:120ms]">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-optus-yellow">
              This month
            </p>
            <p className="mt-2 text-2xl font-bold">Choice from $55/mth</p>
            <p className="mt-2 text-sm text-white/85">
              50GB + Endless Data, unlimited standard calls & texts, and 5G access on the Optus
              network (demo pricing).
            </p>
            <Link
              href="/mobile"
              className="mt-5 inline-flex h-11 items-center rounded-full bg-optus-yellow px-5 text-sm font-bold text-optus-ink"
            >
              View plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
