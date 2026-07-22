import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { PlanCard } from "@/components/plans/plan-card";

export default async function PlansPage() {
  const plans = await readJson<MobilePlan[]>("mobile-plans.json");
  const current = plans.find((p) => p.id === "choice") ?? plans[0];
  if (!current) {
    return <p className="text-sm text-optus-ink/70">No plans available.</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Plans</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Your current service and alternatives.</p>
      </div>

      <div className="rounded-lg border border-optus-teal bg-white p-6 ring-2 ring-optus-teal/20">
        <p className="text-xs font-semibold uppercase text-optus-teal">Current plan</p>
        <h3 className="mt-1 text-2xl font-bold">{current.name}</h3>
        <p className="mt-2 text-optus-ink/70">
          {formatAud(current.price)}/mth · {current.data} · Service 04xx xxx 128 (demo)
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-optus-ink/80 sm:grid-cols-2">
          {current.features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-optus-ink/50">
          Critical Information Summary (CIS) is simulated for this demo.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-optus-ink">Change plan</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
