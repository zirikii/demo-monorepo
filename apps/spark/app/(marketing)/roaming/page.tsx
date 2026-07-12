import type { Metadata } from "next";
import { Plane } from "lucide-react";
import { getAddOns } from "@/lib/data/addons";
import { RoamingZones } from "@/components/roaming/RoamingZones";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNzd } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Travel & roaming",
  description: "Roam in 60+ destinations. Daily roaming, travel packs and eSIMs from Spark.",
};

export default async function RoamingPage() {
  const addons = await getAddOns();
  const roaming = addons.filter((a) => a.category === "roaming");
  const daily = roaming.filter((a) => a.unit === "per day");
  const packs = roaming.filter((a) => a.unit === "one-off");

  return (
    <div className="container-page py-14">
      <header className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-spark-purple-light px-3 py-1 text-xs font-semibold text-spark-purple">
          <Plane className="h-3.5 w-3.5" /> Travel &amp; roaming
        </span>
        <h1 className="mt-4 text-3xl font-bold text-spark-ink sm:text-4xl">
          Stay connected in 60+ destinations
        </h1>
        <p className="mt-3 text-lg text-ink-secondary">
          Keep your number and your plan when you travel. Choose daily roaming for short trips or a
          travel pack for longer adventures.
        </p>
      </header>

      {/* Daily roaming */}
      <section id="daily" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-spark-ink">Daily roaming</h2>
        <p className="mt-1 text-ink-secondary">Pay only for the days you use your phone overseas.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {daily.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{a.name}</CardTitle>
                  <Badge tone="brand">
                    {formatNzd(a.price)} {a.unit}
                  </Badge>
                </div>
                <CardDescription>{a.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Zones */}
      <section id="zones" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-spark-ink">Where you can roam</h2>
        <p className="mt-1 text-ink-secondary">Indicative daily rates by destination zone.</p>
        <div className="mt-5">
          <RoamingZones />
        </div>
      </section>

      {/* Travel packs */}
      <section id="packs" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-spark-ink">Travel packs</h2>
        <p className="mt-1 text-ink-secondary">Bundles of data, minutes and texts, valid 30 days.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{a.name}</CardTitle>
                  <Badge tone="neutral">{formatNzd(a.price)}</Badge>
                </div>
                <CardDescription>{a.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {a.data ? <Badge tone="brand">{a.data}</Badge> : null}
                  {a.durationDays ? <Badge tone="neutral">{a.durationDays} days</Badge> : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* eSIM */}
      <section id="esim" className="mt-12 scroll-mt-20 rounded-2xl bg-spark-purple-light p-6">
        <h2 className="text-xl font-bold text-spark-ink">Travel and visitor eSIMs</h2>
        <p className="mt-2 max-w-2xl text-ink-secondary">
          Got a compatible phone? Skip the SIM swap. Add a travel eSIM before you go, or grab a
          prepaid Visitor eSIM if you&apos;re arriving in Aotearoa — scan a QR code and you&apos;re
          connected.
        </p>
      </section>

      <p className="mt-10 text-sm text-ink-muted">
        Rates and packs shown are for demo purposes only and don&apos;t reflect real Spark pricing.
      </p>
    </div>
  );
}
