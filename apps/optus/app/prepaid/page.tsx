import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Badge } from "@/components/ui/badge";
import { readJson } from "@/lib/data/json-store";
import type { PrepaidPlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Prepaid",
  description: "Optus Prepaid Epic Data and Epic Value recharges with big data and no bills.",
};

export default async function PrepaidPage() {
  const plans = await readJson<PrepaidPlan[]>("prepaid.json");

  return (
    <>
      <PageHero
        eyebrow="Prepaid"
        title="Epic value, no bills"
        description="Recharge online in seconds and get big data on the Optus network. No lock-in, no surprises."
      />
      <section className="container py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div key={plan.id} className="flex flex-col rounded-lg border border-line bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-optus-ink">{plan.name}</h3>
                {plan.tag ? <Badge className="bg-optus-yellow text-optus-ink">{plan.tag}</Badge> : null}
              </div>
              <p className="mt-4 text-4xl font-extrabold text-optus-ink">{formatAud(plan.price)}</p>
              <p className="mt-3 rounded-md bg-optus-teal-light px-3 py-2 text-lg font-extrabold text-optus-teal-darker">
                {plan.data}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-optus-ink/50">
                Expires in {plan.expiry}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-optus-ink/80">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-optus-teal" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/top-up"
                className="focus-ring mt-6 inline-flex h-11 items-center justify-center rounded-md bg-optus-teal px-5 text-sm font-semibold text-white hover:bg-optus-teal-dark"
              >
                Recharge now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
