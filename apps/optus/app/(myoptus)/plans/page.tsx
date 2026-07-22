import type { Metadata } from "next";
import Link from "next/link";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Plans",
};

export default async function PlansPage() {
  const plans = await readJson<MobilePlan[]>("plans.json");
  const current = plans.find((p) => p.id === "plan-medium") ?? plans[0];
  const others = plans.filter((p) => p.id !== current?.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Your plan</h2>
        <p className="mt-1 text-sm text-optus-ink-soft">Manage your current plan and add-ons.</p>
      </div>

      {current ? (
        <div className="rounded-lg border border-optus-yellow bg-white p-6 shadow-sm ring-2 ring-optus-yellow/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge>Current plan</Badge>
              <h3 className="mt-2 text-xl font-bold text-optus-ink">{current.name}</h3>
            </div>
            <p className="text-3xl font-bold text-optus-ink">
              {formatAud(current.price)}
              <span className="text-base font-semibold text-optus-ink-soft">/mth</span>
            </p>
          </div>
          <ul className="mt-4 grid gap-2 text-sm text-optus-ink-soft sm:grid-cols-2">
            {current.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-optus-yellow"
                />
                {f}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h3 className="text-lg font-bold text-optus-ink">Change plan</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {others.map((plan) => (
            <div key={plan.id} className="rounded-lg border border-line bg-white p-5">
              <h4 className="font-semibold text-optus-ink">{plan.name}</h4>
              <p className="mt-1 text-2xl font-bold text-optus-ink">
                {formatAud(plan.price)}
                <span className="text-sm font-semibold text-optus-ink-soft">/mth</span>
              </p>
              <p className="mt-1 text-sm text-optus-ink-soft">{plan.data}</p>
              <Link
                href="/mobile-plans"
                className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md border border-optus-ink text-sm font-semibold text-optus-ink hover:bg-surface-muted"
              >
                Switch to this
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
