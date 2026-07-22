import Link from "next/link";
import { hero } from "@/lib/constants/optus-landing";

export function HeroBanner() {
  return (
    <section className="optus-pattern relative isolate min-h-[78vh] overflow-hidden text-white md:min-h-[88vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,209,0,0.22),transparent_42%),linear-gradient(105deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.12)_48%,transparent_78%)]" />
      <div className="absolute -right-16 top-24 h-72 w-72 animate-float-slow rounded-full bg-optus-yellow/20 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 left-[12%] h-40 w-40 animate-float-slow rounded-full bg-white/10 blur-2xl [animation-delay:1.2s]" aria-hidden="true" />
      <div className="container relative flex min-h-[78vh] flex-col justify-end pb-16 pt-28 md:min-h-[88vh] md:pb-24">
        <div className="max-w-3xl animate-fade-up">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-white.svg"
            alt="Optus"
            className="h-12 w-auto drop-shadow-sm md:h-14"
          />
          <h1 className="mt-8 text-4xl font-black tracking-tight text-balance md:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center rounded-md bg-optus-yellow px-6 text-sm font-bold text-optus-ink hover:bg-white"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center rounded-md border border-white/70 px-6 text-sm font-bold text-white hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
