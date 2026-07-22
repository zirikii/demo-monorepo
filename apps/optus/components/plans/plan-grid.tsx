"use client";

import { useState } from "react";
import type { MobilePlan } from "@/lib/types";
import { PlanCard } from "@/components/plans/plan-card";

export function PlanGrid({ plans }: { plans: MobilePlan[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={setSelected} />
        ))}
      </div>
      {selected ? (
        <p
          role="status"
          className="mt-6 rounded-md bg-optus-yellow-light px-4 py-3 text-sm font-semibold text-optus-ink"
        >
          Nice pick! You selected the {plans.find((p) => p.id === selected)?.name}. This is a demo,
          so no order is placed.
        </p>
      ) : null}
    </div>
  );
}
