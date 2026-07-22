import type { Metadata } from "next";
import Link from "next/link";
import { AddressCheckForm } from "@/components/marketing/address-check-form";
import { Badge } from "@/components/ui/badge";
import { readJson } from "@/lib/data/json-store";
import type { HomeInternetPlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Home internet" };

export default async function HomeInternetPage() {
  const plans = await readJson<HomeInternetPlan[]>("home-internet.json");
  return (
    <div>
      <section className="bg-optus-teal-dark text-white">
        <div className="container py-14 md:py-16">
          <p className="text-sm font-bold uppercase tracking-wide text-optus-yellow">Home internet</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">NBN and 5G Home Internet</h1>
          <p className="mt-4 max-w-2xl text-white/90">Compare Australian home internet options and run a mock address check. Availability is demo-only.</p>
          <div className="mt-8 max-w-xl rounded-xl bg-white/10 p-5"><AddressCheckForm /></div>
        </div>
      </section>
      <section className="container py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.id} className="rounded-xl border border-line bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold uppercase tracking-wide text-optus-teal-dark">{plan.type}</p>{plan.tag ? <Badge>{plan.tag}</Badge> : null}</div>
              <h2 className="mt-2 text-2xl font-black text-optus-ink">{plan.name}</h2>
              <p className="mt-3 text-4xl font-black text-optus-teal-dark">{formatAud(plan.price)}<span className="text-sm font-normal text-optus-ink/60"> /mth</span></p>
              <p className="mt-2 text-sm font-semibold text-optus-ink">{plan.speed}</p>
              <p className="mt-1 text-sm text-optus-ink/70">{plan.data}</p>
              <ul className="mt-4 space-y-2 text-sm text-optus-ink/80">{plan.features.map((feature) => <li key={feature}>- {feature}</li>)}</ul>
              <Link href="/signup" className="mt-6 inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-bold text-white hover:bg-optus-teal-dark">Join online</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
