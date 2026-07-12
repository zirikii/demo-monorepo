import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Plane, Truck } from "lucide-react";
import { getPromotions } from "@/lib/data/promotions";
import { TRAVEL_QUICK_LINKS } from "@/lib/constants";
import { PromoCard } from "@/components/promotions/PromoCard";
import { RoamingZones } from "@/components/roaming/RoamingZones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Travel & Move promotions",
  description:
    "Heading overseas or moving home? Sort roaming, travel packs, eSIMs and broadband moves with Spark.",
};

export default async function TravelAndMovePage() {
  const promos = await getPromotions();
  const travel = promos.filter((p) => p.category === "travel");
  const move = promos.filter((p) => p.category === "move");
  const featured = travel[0];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-line bg-white">
        <nav
          className="container-page flex items-center gap-1.5 py-3 text-sm text-ink-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-spark-purple">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Shop</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Promotions</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-spark-ink">Travel &amp; Move</span>
        </nav>
      </div>

      {/* Hero band */}
      <section className="bg-spark-purple-light">
        <div className="container-page py-12 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-spark-purple">
            <Plane className="h-3.5 w-3.5" /> Travel &amp; Move
          </span>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold text-spark-ink sm:text-4xl">
            Off overseas, or moving home? Let&apos;s keep you connected.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-secondary">
            Whether you&apos;re heading away, arriving in Aotearoa or shifting to a new address,
            here&apos;s everything you need to stay connected — sorted before you go.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TRAVEL_QUICK_LINKS.map((link) => (
              <span
                key={link}
                className="rounded-full border border-spark-purple/30 bg-white px-3 py-1.5 text-sm font-medium text-spark-purple"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Going overseas */}
      <section className="container-page py-14">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-spark-purple" />
          <h2 className="text-2xl font-bold text-spark-ink">Going overseas</h2>
        </div>
        <p className="mt-1 max-w-2xl text-ink-secondary">
          Take your number with you and only pay for the days you use. Turn roaming on before you
          fly so you land connected.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {featured ? <PromoCard promo={featured} featured /> : null}
          {travel.slice(1).map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>

        <div id="zones" className="mt-12 scroll-mt-20">
          <h3 className="text-lg font-bold text-spark-ink">Daily roaming rates by destination</h3>
          <p className="mt-1 text-sm text-ink-secondary">
            Indicative daily rates. You&apos;re only charged on days you use your phone overseas.
          </p>
          <div className="mt-5">
            <RoamingZones />
          </div>
        </div>
      </section>

      {/* Moving home / moving to Spark */}
      <section className="bg-surface-subtle py-14">
        <div className="container-page">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-spark-orange" />
            <h2 className="text-2xl font-bold text-spark-ink">Moving home or moving to Spark</h2>
          </div>
          <p className="mt-1 max-w-2xl text-ink-secondary">
            Shifting house or switching providers? Bring your plan, your number and your broadband
            with you.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {move.map((promo) => (
              <PromoCard key={promo.id} promo={promo} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-spark-ink px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Not sure which option is right for you?
          </h2>
          <p className="max-w-xl text-white/80">
            Tell us where you&apos;re headed and we&apos;ll recommend the best-value way to stay
            connected — whether that&apos;s daily roaming, a travel pack or an eSIM.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-spark-ink hover:bg-white/90">
              <Link href="/roaming">Explore roaming</Link>
            </Button>
            <Button asChild size="lg" variant="navy" className="border border-white/30">
              <Link href="/register">Sign in to My Spark</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
