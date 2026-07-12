import type { Metadata } from "next";
import Link from "next/link";
import { readJson } from "@/lib/data/json-store";
import type { BroadbandPlan } from "@/lib/types";
import { formatNzd } from "@/lib/utils/format";
import { AddressCheckForm } from "@/components/marketing/address-check-form";

export const metadata: Metadata = { title: "Broadband plans" };

export default async function BroadbandPage() {
  const plans = await readJson<BroadbandPlan[]>("broadband.json");

  return (
    <div>
      <section className="bg-spark-purple text-white">
        <div className="container py-14 md:py-16">
          <h1 className="text-4xl font-bold tracking-tight">Fibre or Wireless Broadband</h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Fibre is connected through fibre optic cables, while Wireless Broadband is connected
            through our 4G and 5G mobile network. Enter your address to see what&apos;s available
            (demo lookup).
          </p>
          <div className="mt-8 max-w-xl">
            <AddressCheckForm />
          </div>
        </div>
      </section>
      <section className="container py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.id} className="rounded-lg border border-line bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-spark-purple">
                {plan.type}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-spark-ink">{plan.name}</h2>
              <p className="mt-3 text-3xl font-bold">
                {formatNzd(plan.price)}
                <span className="text-sm font-normal text-spark-ink/60"> /mth</span>
              </p>
              <p className="mt-2 text-sm text-spark-ink/70">{plan.speed}</p>
              <ul className="mt-4 space-y-2 text-sm text-spark-ink/80">
                {plan.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-6 inline-flex h-11 items-center rounded-md bg-spark-purple px-5 text-sm font-semibold text-white hover:bg-spark-purple-dark"
              >
                Join online
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
