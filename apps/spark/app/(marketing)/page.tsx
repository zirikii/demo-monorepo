import Link from "next/link";
import { ArrowRight, Plane, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { getPromotions } from "@/lib/data/promotions";
import { getPlansByKind } from "@/lib/data/plans";
import { ProductTiles } from "@/components/marketing/ProductTiles";
import { PromoCard } from "@/components/promotions/PromoCard";
import { PlanCard } from "@/components/plans/PlanCard";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const [promos, mobilePlans] = await Promise.all([
    getPromotions(),
    getPlansByKind("mobile"),
  ]);
  const travelPromo = promos.find((p) => p.slug === "daily-roaming");
  const featuredPlans = mobilePlans.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-spark-purple text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Endless data, sorted
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Mobile, broadband &amp; travel — all on Spark.
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/85">
              Get endless data plans, reliable home broadband and roaming that switches on before
              you fly. Manage it all in My Spark.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="navy">
                <Link href="/mobile">Shop mobile plans</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-spark-purple hover:bg-white/90"
              >
                <Link href="/shop/promotions/travel-and-move">Travelling or moving?</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm rounded-3xl bg-white/10 p-6 backdrop-blur">
              {travelPromo ? (
                <div className="rounded-2xl bg-white p-5 text-spark-ink shadow-panel">
                  <p className="text-xs font-semibold uppercase tracking-wide text-spark-purple">
                    {travelPromo.eyebrow}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{travelPromo.title}</h3>
                  <p className="mt-2 text-sm text-ink-secondary">{travelPromo.description}</p>
                  <Button asChild className="mt-4 w-full">
                    <Link href={travelPromo.cta.href}>{travelPromo.cta.label}</Link>
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Product tiles */}
      <section className="container-page py-14">
        <h2 className="text-2xl font-bold text-spark-ink">What can we sort for you?</h2>
        <p className="mt-1 text-ink-secondary">Pick a product to get started.</p>
        <div className="mt-6">
          <ProductTiles />
        </div>
      </section>

      {/* Featured plans */}
      <section className="bg-surface-subtle py-14">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-spark-ink">Popular mobile plans</h2>
              <p className="mt-1 text-ink-secondary">Open term. Change or cancel anytime.</p>
            </div>
            <Link
              href="/mobile"
              className="hidden items-center gap-1.5 text-sm font-semibold text-spark-purple sm:inline-flex"
            >
              See all plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {featuredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} href="/register" />
            ))}
          </div>
        </div>
      </section>

      {/* Travel & move promo strip */}
      <section className="container-page py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-spark-ink">Travelling or moving?</h2>
            <p className="mt-1 text-ink-secondary">Sort your connection before you go.</p>
          </div>
          <Link
            href="/shop/promotions/travel-and-move"
            className="hidden items-center gap-1.5 text-sm font-semibold text-spark-purple sm:inline-flex"
          >
            All promotions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {promos.slice(0, 3).map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-line bg-white py-12">
        <div className="container-page grid gap-8 sm:grid-cols-3">
          {[
            { icon: Zap, title: "5G in more places", desc: "Fast, reliable coverage across Aotearoa." },
            { icon: Plane, title: "Roam in 60+ places", desc: "Turn on roaming before you fly." },
            { icon: ShieldCheck, title: "Help when you need it", desc: "Support in-app, online and in store." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-spark-purple-light text-spark-purple">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-spark-ink">{f.title}</p>
                <p className="text-sm text-ink-secondary">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
