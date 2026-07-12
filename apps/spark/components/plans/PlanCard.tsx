import Link from "next/link";
import { Check, Wifi, Smartphone } from "lucide-react";
import type { Plan } from "@/lib/types";
import { formatNzd } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PlanCard({
  plan,
  href = "/register",
  ctaLabel = "Choose plan",
  current = false,
}: {
  plan: Plan;
  href?: string;
  ctaLabel?: string;
  current?: boolean;
}) {
  const Icon = plan.kind === "broadband" ? Wifi : Smartphone;

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover",
        plan.popular ? "border-spark-purple ring-1 ring-spark-purple" : "border-line",
      )}
    >
      {plan.popular ? (
        <span className="absolute -top-3 left-6 rounded-full bg-spark-purple px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      ) : null}

      <div className="flex items-center gap-2 text-spark-purple">
        <Icon className="h-5 w-5" />
        <h3 className="text-lg font-bold text-spark-ink">{plan.name}</h3>
      </div>
      <p className="mt-1 text-sm text-ink-secondary">{plan.tagline}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-spark-ink">{formatNzd(plan.monthlyPrice)}</span>
        <span className="text-sm text-ink-muted">/mth</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="brand">{plan.data}</Badge>
        {plan.speed ? <Badge tone="neutral">{plan.speed}</Badge> : null}
        {plan.roamingReady ? <Badge tone="neutral">Roaming ready</Badge> : null}
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-secondary">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-spark-green" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {current ? (
          <Button variant="secondary" className="w-full" disabled>
            Your current plan
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href={href}>{ctaLabel}</Link>
          </Button>
        )}
      </div>
    </article>
  );
}
