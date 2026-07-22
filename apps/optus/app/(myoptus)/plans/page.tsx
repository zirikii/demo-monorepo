import { PlanCard } from "@/components/plans/plan-card";
import { readJson } from "@/lib/data/json-store";
import type { Plan } from "@/lib/types";

export default async function PlansPage() {
  const plans = await readJson<Plan[]>("plans.json");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-3xl font-black text-optus-ink">Plans</h2>
        <p className="text-optus-ink/65">Current and recommended Optus plans.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
