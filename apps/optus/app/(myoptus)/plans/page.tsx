import Link from "next/link";
import { Check } from "lucide-react";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

export default async function PlansPage() {
  const plans = await readJson<MobilePlan[]>("mobile-plans.json");
  const current = plans.find((p) => p.id === "plan-medium") ?? plans[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-optus-ink">My plans</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Manage your services and add-ons.</p>
      </div>

      {current ? (
        <div className="rounded-lg border-2 border-optus-teal bg-optus-teal-light p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-optus-teal-darker/70">
                Current mobile plan
              </p>
              <h3 className="mt-1 text-xl font-extrabold text-optus-ink">{current.name}</h3>
            </div>
            <Badge className="bg-optus-yellow text-optus-ink">Active</Badge>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-optus-ink">
            {formatAud(current.price)}
            <span className="text-base font-semibold text-optus-ink/60">/mth</span>
          </p>
          <p className="text-sm text-optus-ink/70">
            {current.data} · {current.network} · {current.contract}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-optus-ink/80">
            {current.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-optus-teal" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h3 className="text-lg font-bold text-optus-ink">Change your plan</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {plans
            .filter((p) => p.id !== current?.id)
            .map((plan) => (
              <div key={plan.id} className="rounded-lg border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-optus-ink">{plan.name}</h4>
                  <p className="font-extrabold text-optus-ink">{formatAud(plan.price)}/mth</p>
                </div>
                <p className="mt-1 text-sm text-optus-ink/70">
                  {plan.data} · {plan.network}
                </p>
                <Link
                  href="/plans"
                  className="focus-ring mt-4 inline-flex h-10 items-center rounded-md border border-optus-teal px-4 text-sm font-semibold text-optus-teal hover:bg-optus-teal-light"
                >
                  Switch to {plan.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
