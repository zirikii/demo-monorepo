import Link from "next/link";
import { travelMoveHero } from "@/lib/constants/travel-move";

export function HeroBanner() {
  return (
    <section className="relative isolate min-h-[420px] overflow-hidden bg-spark-black text-white md:min-h-[520px]">
      <img
        src={travelMoveHero.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
      <div className="container relative flex min-h-[420px] flex-col justify-end pb-14 pt-24 md:min-h-[520px] md:pb-20">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
          Travel &amp; Move
        </p>
        <h1 className="animate-fade-up mt-3 max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl">
          {travelMoveHero.title}
        </h1>
        <p className="animate-fade-up mt-4 max-w-2xl text-base text-white/90 md:text-lg">
          {travelMoveHero.description}
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-3">
          <Link
            href="/travel-packs"
            className="inline-flex h-12 items-center rounded-md bg-spark-purple px-6 text-sm font-semibold text-white hover:bg-spark-purple-dark"
          >
            View Travel Packs
          </Link>
          <Link
            href="/broadband"
            className="inline-flex h-12 items-center rounded-md border border-white/70 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            Explore broadband
          </Link>
        </div>
      </div>
    </section>
  );
}
