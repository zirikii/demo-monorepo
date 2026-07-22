import Link from "next/link";
import { homeHero } from "@/lib/constants/marketing";

export function HeroBanner() {
  return (
    <section className="relative isolate min-h-[440px] overflow-hidden bg-optus-teal-darker text-white md:min-h-[540px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={homeHero.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="container relative flex min-h-[440px] flex-col justify-end pb-14 pt-24 md:min-h-[540px] md:pb-20">
        <p className="animate-fade-up inline-flex w-fit rounded-full bg-optus-yellow px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-optus-ink">
          {homeHero.eyebrow}
        </p>
        <h1 className="animate-fade-up mt-4 max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
          {homeHero.title}
        </h1>
        <p className="animate-fade-up mt-4 max-w-2xl text-base text-white/90 md:text-lg">
          {homeHero.description}
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-3">
          <Link
            href="/mobile-plans"
            className="focus-ring inline-flex h-12 items-center rounded-md bg-optus-yellow px-6 text-sm font-bold text-optus-ink hover:bg-optus-yellow-dark"
          >
            Shop mobile plans
          </Link>
          <Link
            href="/broadband"
            className="focus-ring inline-flex h-12 items-center rounded-md border border-white/70 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            Explore home internet
          </Link>
        </div>
      </div>
    </section>
  );
}
