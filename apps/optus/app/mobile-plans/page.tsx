import type { Metadata } from "next";
import { PlanCard } from "@/components/plans/plan-card";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";

export const metadata: Metadata = { title: "Mobile plans" };

export default async function MobilePlansPage() {
  const plans = await readJson<MobilePlan[]>("plans.json");
  return (
    <div className="container py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Mobile plans</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-optus-ink">Optus mobile plans</h1>
      <p className="mt-4 max-w-3xl text-optus-ink/80">Compare SIM-only and prepaid-style demo plans with AUD pricing, Australian calls and texts, 5G network language and no real carrier services.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>
    </div>
  );
}
