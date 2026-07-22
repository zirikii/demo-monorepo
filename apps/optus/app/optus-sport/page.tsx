import type { Metadata } from "next";
import Link from "next/link";
import { PlayCircle, Trophy } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { readJson } from "@/lib/data/json-store";
import type { SportFixture } from "@/lib/types";
import { formatKickoff } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Optus Sport",
  description: "Stream Premier League, LaLiga and the Matildas live on Optus Sport.",
};

export default async function OptusSportPage() {
  const fixtures = await readJson<SportFixture[]>("sport.json");

  return (
    <>
      <PageHero
        eyebrow="Optus Sport"
        title="Live football, all season long"
        description="Premier League, LaLiga and the Matildas — included on selected Optus plans, or add any time."
      />

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-extrabold text-optus-ink">
              <Trophy className="h-6 w-6 text-optus-teal" aria-hidden="true" />
              Upcoming fixtures
            </h2>
            <ul className="mt-6 space-y-3">
              {fixtures.map((fx) => (
                <li
                  key={fx.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-5"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-optus-teal">
                      {fx.competition}
                    </p>
                    <p className="mt-1 text-lg font-bold text-optus-ink">
                      {fx.home} <span className="text-optus-ink/50">v</span> {fx.away}
                    </p>
                    <p className="text-sm text-optus-ink/60">{fx.venue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-optus-ink">{formatKickoff(fx.kickoff)}</p>
                    <button
                      type="button"
                      className="focus-ring mt-2 inline-flex items-center gap-1 rounded-md bg-optus-teal-light px-3 py-1.5 text-xs font-semibold text-optus-teal-darker"
                    >
                      <PlayCircle className="h-4 w-4" aria-hidden="true" />
                      Set reminder
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg bg-optus-ink p-6 text-white">
              <h3 className="text-lg font-bold">Add Optus Sport</h3>
              <p className="mt-2 text-sm text-white/80">
                Included on selected mobile and internet plans, or add as a standalone subscription.
              </p>
              <p className="mt-4 text-3xl font-extrabold">
                $24.99<span className="text-base font-semibold text-white/70">/mth</span>
              </p>
              <Link
                href="/mobile-plans"
                className="focus-ring mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-optus-yellow px-5 text-sm font-bold text-optus-ink hover:bg-optus-yellow-dark"
              >
                See plans with Sport
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
