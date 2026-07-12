import type { Metadata } from "next";
import { TravelPackGrid } from "@/components/plans/travel-pack-grid";
import { Accordion } from "@/components/ui/accordion";
import { readJson } from "@/lib/data/json-store";
import type { TravelPack } from "@/lib/types";

export const metadata: Metadata = {
  title: "NZ Travel Packs",
};

const faqs = [
  {
    id: "how",
    title: "How do Travel Packs work?",
    content: (
      <div className="space-y-3">
        <p>
          These Travel Packs are designed for people visiting New Zealand for a short-term visit of
          up to three months.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Your Travel Pack expires three months following the date you activate it by starting to
            use it in New Zealand. Once it has expired you can purchase other value packs or extras,
            but you can&apos;t purchase another Travel Pack for your SIM.
          </li>
          <li>
            The text, calling minutes, and data inclusions in the plan are available for three
            months, and do not refresh with new data, calling or text allocations during this time.
          </li>
          <li>The price you pay is the total cost for all three months. It&apos;s not a monthly fee.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "runout",
    title: "What do I do if I run out of data, minutes or texts?",
    content:
      "If you run out of data, calling minutes or texts during your three month term, you can buy other value packs or extras to get more allowances. Otherwise standard rate charges will apply.",
  },
  {
    id: "expire",
    title: "What do I do when my three-month Travel Pack expires?",
    content:
      "If you still need to use your mobile in New Zealand after three months when your Travel Pack expires, and you want to keep using the same SIM and number, you'll need to purchase a new Prepaid or Pay Monthly plan. You won't be able to purchase another Travel Pack for your SIM.",
  },
  {
    id: "rates",
    title: "What are the standard rates for calls, texts and data?",
    content: (
      <ul className="space-y-1">
        <li>Additional NZ minutes — $0.49 per minute</li>
        <li>Additional standard NZ texts — $0.20 per message</li>
        <li>MMS — $0.50 per message</li>
        <li>Casual data — $1.00 per day for 10MB</li>
        <li>Additional casual data — $0.30 per MB</li>
      </ul>
    ),
  },
  {
    id: "endless",
    title: "Questions about Endless data",
    content: (
      <div className="space-y-3">
        <p>
          With the Endless Travel Pack, data is used in this order: 100GB full speed, then any other
          packs you&apos;ve added, then speed-reduced data at a maximum of 1.2Mbps.
        </p>
        <p>Yes, tethering / hotspot is included on the $129 Endless Travel Pack.</p>
      </div>
    ),
  },
];

export default async function TravelPacksPage() {
  const packs = await readJson<TravelPack[]>("travel-packs.json");

  return (
    <div>
      <section className="relative overflow-hidden bg-spark-black text-white">
        <img
          src="/brand/photos/hero-friends-grass.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
        <div className="container relative py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            NZ Travel Packs
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Experience New Zealand on a local mobile network
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            Stay connected while you explore New Zealand. Our plans have plenty of data, texts and
            minutes.
          </p>
        </div>
      </section>

      <section className="container py-14 md:py-16">
        <h2 className="text-3xl font-bold text-spark-ink">Get connected with a Spark Travel Pack.</h2>
        <p className="mt-4 max-w-3xl text-spark-ink/80">
          If you&apos;re planning to visit New Zealand for up to three months, make your trip that
          little bit easier with a Spark Travel Pack. Travel Packs are only available in store.
        </p>
        <div className="mt-10">
          <TravelPackGrid packs={packs} />
        </div>
        <p className="mt-8 text-xs text-spark-ink/60">
          *International calling minutes and texts can be used to call or text USA, Canada, China,
          Hong Kong, India, South Africa, UK, Ireland, Australia, France, Germany, Italy, Portugal,
          Spain, Philippines, Japan, Thailand, Singapore, Malaysia and South Korea.
          <br />
          **100GB at maximum speeds, then speeds reduce to a maximum of 1.2Mbps.
        </p>
      </section>

      <section className="bg-surface-subtle py-14">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-spark-ink">Where to buy your NZ Travel Pack</h2>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-spark-ink/80">
            <li>First, check that your phone is compatible with the Spark network in New Zealand.</li>
            <li>
              Purchase a Travel Pack from Spark when you arrive in New Zealand — Spark has stores at
              Auckland and Christchurch Airports, as well as around New Zealand.
            </li>
          </ol>
          <p className="mt-4 text-sm text-spark-ink/60">Note: We don&apos;t ship Travel Packs overseas.</p>
        </div>
      </section>

      <section className="container py-14">
        <h2 className="text-2xl font-bold text-spark-ink">Frequently asked questions</h2>
        <Accordion className="mt-6" items={faqs} />
      </section>
    </div>
  );
}
