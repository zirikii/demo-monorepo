import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { InternetPlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { PageHero } from "@/components/marketing/page-hero";
import { CoverageCheck } from "@/components/marketing/coverage-check";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "nbn & 5G Home Internet",
  description: "Optus nbn and 5G Home Internet plans with the Optus Ultra WiFi modem included.",
};

function InternetGroup({ title, plans }: { title: string; plans: InternetPlan[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-optus-ink">{title}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={cn(
              "flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm",
              plan.highlight ? "border-optus-yellow ring-2 ring-optus-yellow/40" : "border-line",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-optus-ink-soft">
                {plan.speed}
              </span>
              {plan.highlight ? <Badge>Popular</Badge> : null}
            </div>
            <h3 className="mt-2 text-lg font-bold text-optus-ink">{plan.name}</h3>
            <p className="mt-3 text-4xl font-bold text-optus-ink">
              <span className="align-top text-lg">$</span>
              {plan.price}
              <span className="text-base font-semibold text-optus-ink-soft">/mth</span>
            </p>
            <p className="mt-1 text-sm text-optus-ink-soft">{plan.typicalEvening}</p>
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
              className="mt-6 inline-flex h-11 w-full shrink-0 items-center justify-center rounded-md bg-optus-ink px-4 text-sm font-semibold text-white hover:bg-optus-ink/90"
              aria-label={`Get ${plan.name} for ${formatAud(plan.price)} per month`}
            >
              Get connected
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default async function InternetPage() {
  const plans = await readJson<InternetPlan[]>("internet.json");
  const nbn = plans.filter((p) => p.type === "nbn");
  const fiveG = plans.filter((p) => p.type === "5G Home");

  return (
    <>
      <PageHero
        eyebrow="Internet"
        title="Home internet that keeps up"
        description="Choose nbn or 5G Home Internet — both come with the Optus Ultra WiFi modem and no lock-in contract."
      />
      <CoverageCheck />
      <section className="container space-y-14 py-4 pb-16">
        <InternetGroup title="nbn plans" plans={nbn} />
        <InternetGroup title="5G Home Internet" plans={fiveG} />
      </section>
    </>
  );
}
