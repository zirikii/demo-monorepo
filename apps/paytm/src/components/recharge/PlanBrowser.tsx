import { useState } from "react";
import { rechargePlans, planCategories, type PlanCategory } from "../../data/rechargePlans";
import { mobileOperators } from "../../data/operators";
import { formatInr } from "../../lib/format";
import { Tabs } from "../ui/Tabs";
import { Badge } from "../ui/Badge";

interface PlanBrowserProps {
  onPickPlan: (price: number) => void;
}

/** Tabbed browse-plans list; tapping a card pushes its price into the form. */
export function PlanBrowser({ onPickPlan }: PlanBrowserProps) {
  const [category, setCategory] = useState<PlanCategory>("unlimited");
  const plans = rechargePlans.filter((p) => p.category === category);

  return (
    <section aria-label="Browse plans" className="rounded-2xl bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-ink">Browse Plans</h2>
        <p className="text-xs text-ink-faint">Tap a plan to auto-fill the amount</p>
      </div>
      <Tabs
        className="mt-4"
        aria-label="Plan categories"
        items={planCategories.map((c) => ({ id: c.id, label: c.label }))}
        active={category}
        onChange={(id) => setCategory(id as PlanCategory)}
      />
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {plans.map((plan) => {
          const op = mobileOperators.find((o) => o.id === plan.operatorId);
          return (
            <li key={plan.id}>
              <button
                type="button"
                onClick={() => onPickPlan(plan.price)}
                className="w-full rounded-xl border border-hairline p-4 text-left transition-all hover:-translate-y-0.5 hover:border-paytm-cyan hover:shadow-card"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-extrabold text-paytm-navy">{formatInr(plan.price)}</span>
                  <Badge tone="cyan">{op?.name ?? plan.operatorId}</Badge>
                </div>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <dt className="text-ink-faint">Validity</dt>
                    <dd className="font-semibold text-ink">{plan.validity}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Data</dt>
                    <dd className="font-semibold text-ink">{plan.data}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Calls</dt>
                    <dd className="font-semibold text-ink">{plan.calls}</dd>
                  </div>
                </dl>
                {plan.extras ? <p className="mt-2 text-[11px] text-success">{plan.extras}</p> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
