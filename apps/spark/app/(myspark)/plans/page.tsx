import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";
import { formatNzd } from "@/lib/utils/format";

export default async function PlansPage() {
  const plans = await readJson<MobilePlan[]>("plans.json");
  const current = plans[1] ?? plans[0];

  return (
    <div>
      <h2 className="text-2xl font-bold text-spark-ink">Your plans</h2>
      {current ? (
        <div className="mt-6 rounded-lg border border-spark-purple bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-spark-purple">Current mobile plan</p>
          <h3 className="mt-2 text-xl font-bold">{current.name}</h3>
          <p className="mt-2 text-2xl font-bold text-spark-ink">
            {formatNzd(current.price)}
            <span className="text-sm font-normal text-spark-ink/60"> /mth</span>
          </p>
          <ul className="mt-4 space-y-1 text-sm text-spark-ink/80">
            {current.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <h3 className="mt-10 text-lg font-bold text-spark-ink">Other options</h3>
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <li key={plan.id} className="rounded-lg border border-line bg-white p-4">
            <p className="font-semibold">{plan.name}</p>
            <p className="text-sm text-spark-ink/70">{formatNzd(plan.price)} /mth</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
