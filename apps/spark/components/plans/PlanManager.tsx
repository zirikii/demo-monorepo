"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import type { Plan } from "@/lib/types";
import { formatNzd } from "@/lib/utils/format";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PlanManager({
  plans,
  initialPlanId,
}: {
  plans: Plan[];
  initialPlanId: string;
}) {
  const [planId, setPlanId] = React.useState(initialPlanId);
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function choose(next: Plan) {
    if (next.id === planId) return;
    setPendingId(next.id);
    const previous = planId;
    setPlanId(next.id);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: next.id }),
      });
      if (!res.ok) throw new Error("failed");
      toast({ title: "Plan changed", description: next.name, variant: "success" });
      router.refresh();
    } catch {
      setPlanId(previous);
      toast({ title: "Couldn't change plan", variant: "destructive" });
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {plans.map((plan) => {
        const current = plan.id === planId;
        return (
          <article
            key={plan.id}
            className={cn(
              "flex flex-col rounded-2xl border bg-white p-6 shadow-card",
              current ? "border-spark-purple ring-1 ring-spark-purple" : "border-line",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-spark-ink">{plan.name}</h3>
              {current ? <Badge tone="brand">Current</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-ink-secondary">{plan.tagline}</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-spark-ink">
                {formatNzd(plan.monthlyPrice)}
              </span>
              <span className="text-sm text-ink-muted">/mth</span>
            </div>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-secondary">
              {plan.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-spark-green" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Button
                variant={current ? "secondary" : "primary"}
                className="w-full"
                disabled={current || pendingId !== null}
                onClick={() => choose(plan)}
              >
                {pendingId === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {current ? "Your plan" : "Switch to this plan"}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
