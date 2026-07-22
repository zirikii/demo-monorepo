import type { Metadata } from "next";
import { PlanCard } from "@/components/plans/plan-card";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";

export const metadata: Metadata = { title: "Mobile plans" };

export default async function MobilePlansPage() {
  const plans = await readJson<MobilePlan[]>("mobile-plans.json");

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold text-optus-ink">Mobile plans</h1>
      <p className="mt-3 max-w-2xl text-optus-ink/70">
        Choice plans with Endless Data and unlimited standard calls & texts. Demo pricing in AUD —
        not live Optus offers.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
