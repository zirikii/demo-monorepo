import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { PRICING_PLANS } from "@/data/pricing";
import type { PricingPlan } from "@/data/types";
import { cn } from "@/lib/cn";

type BillingInterval = "monthly" | "annually";

function billedRate(list: number, interval: BillingInterval): number {
  if (interval === "annually") return list;
  return Math.round(list * 1.2 * 100) / 100;
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function planPriceLabel(plan: PricingPlan, users: number, interval: BillingInterval): string {
  if (plan.monthlyUsd === undefined) return plan.price;
  if (plan.monthlyUsd === 0) return "$0";
  const rate = billedRate(plan.monthlyUsd, interval);
  return `${formatUsd(rate * users)} / month`;
}

export default function PricingPage() {
  const [users, setUsers] = useState(100);
  const [interval, setInterval] = useState<BillingInterval>("annually");

  return (
    <PageLayout title="Jira pricing">
      <PageHero
        eyebrow="Jira Cloud"
        title="Plans for every team"
        body="Transparent pricing for every team. Start free. Upgrade when you need advanced roadmaps, Rovo agents, or enterprise controls."
        crumbs={[{ label: "Jira", to: "/software/jira" }, { label: "Pricing" }]}
      />

      <Section>
        <div className="mb-8 flex flex-wrap items-end gap-6">
          <Field label="Users" htmlFor="pricing-users" className="w-40">
            <TextInput
              id="pricing-users"
              type="number"
              min={1}
              value={users}
              onChange={(event) => {
                const next = Number(event.target.value);
                setUsers(Number.isFinite(next) && next > 0 ? Math.floor(next) : 1);
              }}
            />
          </Field>
          <div
            className="inline-flex rounded-full border border-line bg-white p-1"
            role="group"
            aria-label="Billing period"
          >
            {(["monthly", "annually"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={interval === value}
                onClick={() => setInterval(value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold",
                  interval === value ? "bg-atl-navy text-white" : "text-ink-soft hover:bg-atl-tint",
                )}
              >
                {value === "monthly" ? "Monthly" : "Annually"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "flex flex-col gap-4 rounded-atl-lg border p-6",
                plan.highlight
                  ? "border-atl-blue bg-atl-tint shadow-atl-lift"
                  : "border-line bg-white",
              )}
            >
              {plan.highlight ? (
                <p className="text-xs font-bold tracking-[0.12em] text-atl-blue uppercase">
                  Recommended
                </p>
              ) : null}
              <h2 className="text-2xl font-extrabold">{plan.name}</h2>
              <p>
                <span className="text-3xl font-extrabold">
                  {planPriceLabel(plan, users, interval)}
                </span>
                <span className="ml-1 text-sm text-ink-faint">{plan.priceNote}</span>
              </p>
              <p className="text-sm text-ink-soft">{plan.positioning}</p>
              <ul className="flex flex-1 flex-col gap-2 text-sm text-ink-soft">
                {plan.inclusions.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
              <ButtonLink to={plan.ctaTo} variant={plan.highlight ? "primary" : "secondary"}>
                {plan.ctaLabel}
              </ButtonLink>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Not sure which plan?"
        body="Start a trial on Premium. Downgrade anytime in this demo."
      />
    </PageLayout>
  );
}
