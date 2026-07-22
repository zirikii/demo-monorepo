import { readJson } from "@/lib/data/json-store";
import type { Plan } from "@/lib/types";
import { PlanCard } from "@/components/plans/plan-card";

export const metadata = { title: "Prepaid recharges and SIMs" };

export default async function Page() {
  const plans = (await readJson<Plan[]>("plans.json")).filter(
    (plan) => plan.category === "Prepaid",
  );
  return (
    <div className="bg-surface-subtle">
      <section className="container py-12">
        <p className="text-sm font-black uppercase tracking-wide text-optus-teal">Optus Prepaid</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-black text-optus-ink">
          Prepaid recharges and SIMs
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-optus-ink/70">
          Pick a prepaid recharge, activate a SIM or set up AutoRecharge.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    </div>
  );
}
