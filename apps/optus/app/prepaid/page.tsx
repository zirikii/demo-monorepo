import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { PrepaidPlan } from "@/lib/types";
import { PageHero } from "@/components/marketing/page-hero";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Prepaid",
  description: "Optus Prepaid Epic Value plans with data banking and no lock-in contract.",
};

export default async function PrepaidPage() {
  const plans = await readJson<PrepaidPlan[]>("prepaid.json");

  return (
    <>
      <PageHero
        eyebrow="Prepaid"
        title="Prepaid that gives you more"
        description="Recharge on your terms with Epic Value plans — bank your unused data and stay in control."
      />
      <section className="container py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm",
                plan.highlight ? "border-optus-yellow ring-2 ring-optus-yellow/40" : "border-line",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-optus-ink">{plan.name}</h3>
                {plan.highlight ? <Badge>Best value</Badge> : null}
              </div>
              <p className="mt-4 text-4xl font-bold text-optus-ink">
                <span className="align-top text-lg">$</span>
                {plan.price}
              </p>
              <p className="mt-1 text-sm text-optus-ink-soft">
                {plan.data} · {plan.expiry} expiry
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-optus-ink-soft">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-optus-yellow"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-6 inline-flex h-11 w-full shrink-0 items-center justify-center rounded-md bg-optus-yellow px-4 text-sm font-semibold text-optus-ink hover:bg-optus-yellow-dark"
              >
                Buy prepaid SIM
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
