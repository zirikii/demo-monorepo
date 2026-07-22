import Link from "next/link";
import { promoStrip } from "@/lib/constants/optus-landing";

export function PromoStrip() {
  return (
    <section className="animate-slide-in border-b border-optus-ink/10 bg-optus-yellow">
      <div className="container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-optus-ink/70">{promoStrip.label}</p>
          <p className="mt-1 text-sm font-bold text-optus-ink md:text-base">{promoStrip.title}</p>
        </div>
        <Link
          href={promoStrip.cta.href}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-optus-ink px-4 text-sm font-bold text-white hover:bg-optus-teal-dark"
        >
          {promoStrip.cta.label}
        </Link>
      </div>
    </section>
  );
}
