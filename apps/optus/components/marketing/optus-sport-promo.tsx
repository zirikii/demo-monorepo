import Link from "next/link";
import { PlayCircle } from "lucide-react";

export function OptusSportPromo() {
  return (
    <section className="relative isolate overflow-hidden bg-optus-ink text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/photos/sport.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="container relative grid gap-8 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-optus-yellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-optus-ink">
            Optus Sport
          </p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Every Premier League game. Live.
          </h2>
          <p className="mt-3 max-w-md text-white/80">
            Stream Premier League, LaLiga and the Matildas — included on selected Optus plans, or
            add it any time. Watch live, catch highlights, or replay full matches.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/optus-sport"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-md bg-optus-yellow px-5 text-sm font-bold text-optus-ink hover:bg-optus-yellow-dark"
            >
              <PlayCircle className="h-5 w-5" aria-hidden="true" />
              See what's on
            </Link>
            <Link
              href="/mobile-plans"
              className="focus-ring inline-flex h-11 items-center rounded-md border border-white/60 px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Plans with Sport
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
