import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, Leaf } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { energyPlans, estimateAnnualCost, STATES, type StateCode } from "@/data/plans";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";

const HOUSEHOLDS = [
  { label: "1–2 people", kwh: 3000 },
  { label: "3–4 people", kwh: 4600 },
  { label: "5+ people", kwh: 6500 },
] as const;

function isStateCode(value: string | null): value is StateCode {
  return STATES.some((s) => s.code === value);
}

export function EnergyPlansPage() {
  useDocumentTitle("Compare electricity and gas plans");
  const [params, setParams] = useSearchParams();
  const initialState = params.get("state");
  const state: StateCode = isStateCode(initialState) ? initialState : "NSW";
  const [kwh, setKwh] = useState<number>(HOUSEHOLDS[1].kwh);
  const address = params.get("address");
  const plans = energyPlans.filter((p) => p.states.includes(state));
  const distributor = STATES.find((s) => s.code === state)?.distributor;

  return (
    <PageLayout>
      <PageHero
        crumbs={[{ label: "Energy" }]}
        eyebrow="Electricity & gas"
        title="Compare our energy plans"
        intro="No lock-in contracts, flexible ways to pay and bill credits when you join online."
      />

      <Section>
        <div className="flex flex-col gap-6 rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl md:flex-row md:items-end">
          <label className="block md:w-56">
            <span className="text-sm font-bold text-ink-soft">State</span>
            <select
              value={state}
              onChange={(e) => {
                const next = new URLSearchParams(params);
                next.set("state", e.target.value);
                setParams(next, { replace: true });
              }}
              className="mt-1 h-11 w-full rounded-agl border border-line bg-white px-3 focus:border-agl-blue focus:outline-none"
            >
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="flex-1">
            <legend className="text-sm font-bold text-ink-soft">Household size</legend>
            <div className="mt-1 flex flex-wrap gap-2">
              {HOUSEHOLDS.map((h) => (
                <button
                  key={h.kwh}
                  type="button"
                  aria-pressed={kwh === h.kwh}
                  onClick={() => setKwh(h.kwh)}
                  className={cn(
                    "h-11 rounded-full border-2 px-4 text-sm font-bold",
                    kwh === h.kwh ? "border-agl-blue bg-agl-sky text-agl-blue" : "border-line-soft text-ink-soft hover:border-agl-blue",
                  )}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="text-sm text-ink-soft md:max-w-xs">
            {address ? <>Prices for <strong className="text-ink">{address}</strong>. </> : null}
            Distributor: <strong className="text-ink">{distributor}</strong>
          </p>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Energy plans">
          {plans.map((plan) => (
            <li key={plan.slug} id={plan.slug} className="flex flex-col rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl font-extrabold text-agl-blue-dark">{plan.name}</h2>
                {plan.badge && <Badge tone="blue">{plan.badge}</Badge>}
              </div>
              <p className="mt-1 text-ink-soft">{plan.tagline}</p>
              {plan.highlight && <p className="mt-3 rounded-agl bg-agl-sky px-3 py-2 text-sm font-bold text-agl-blue-dark">{plan.highlight}</p>}
              <p className="mt-5 text-sm text-ink-soft">Estimated cost</p>
              <p className="text-3xl font-extrabold text-ink">
                {formatCurrency(estimateAnnualCost(plan, kwh, state), { whole: true })}
                <span className="text-base font-semibold text-ink-faint">/yr</span>
              </p>
              <p className="text-xs text-ink-faint">
                {plan.usageCents}c/kWh · {plan.supplyCentsPerDay}c/day supply · {plan.feedInCents}c/kWh solar feed-in
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-faint">Best for: {plan.bestFor}</p>
              <ButtonLink to="/login" className="mt-5">
                Join {plan.name}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sky" id="green">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Leaf className="h-10 w-10 text-positive" aria-hidden="true" />
            <h2 className="mt-3 text-3xl font-extrabold text-ink">Green Energy and Carbon Neutral</h2>
            <p className="mt-2 text-ink-soft">
              Match some or all of your electricity with GreenPower-accredited renewable energy, or offset your gas and electricity
              emissions with our Climate Active certified Carbon Neutral add-on.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {["10% GreenPower from 1.1c/day", "100% GreenPower from 10.4c/day", "Carbon Neutral electricity from 1c/day", "Carbon Neutral gas from 1c/day"].map(
              (item) => (
                <li key={item} className="rounded-agl bg-white p-4 font-bold text-ink shadow-agl">
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </Section>

      <Section title="Energy plan FAQs" id="fact-sheets">
        <Accordion
          items={[
            { id: "lock-in", title: "Are there lock-in contracts or exit fees?", content: "No. All of our residential energy plans are no lock-in contract with no exit fees." },
            { id: "variable", title: "Can my rates change?", content: "Our plans have variable rates. We'll give you notice before any price change, usually at 1 July." },
            { id: "bpid", title: "Where can I find the Basic Plan Information Document?", content: "Every plan has an Energy Fact Sheet (Basic Plan Information Document) you can view before you join." },
            { id: "dmo", title: "How do your prices compare to the reference price?", content: "Each plan shows how its price compares to the Default Market Offer or Victorian Default Offer for a typical customer." },
          ]}
        />
      </Section>
    </PageLayout>
  );
}
