import Link from "next/link";
import { Check } from "lucide-react";
import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";

export function PlanCard({ plan }: { plan: MobilePlan }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-white p-6 shadow-sm",
        plan.highlight ? "border-optus-teal ring-2 ring-optus-teal" : "border-line",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-optus-ink">{plan.name}</h3>
        {plan.tag ? (
          <Badge className={plan.highlight ? "bg-optus-yellow text-optus-ink" : undefined}>
            {plan.tag}
          </Badge>
        ) : null}
      </div>

      <p className="mt-4 text-4xl font-extrabold text-optus-ink">
        {formatAud(plan.price)}
        <span className="text-base font-semibold text-optus-ink/60">/mth</span>
      </p>

      <div className="mt-4 rounded-md bg-optus-teal-light p-3">
        <p className="text-2xl font-extrabold text-optus-teal-darker">{plan.data}</p>
        {plan.dataNote ? (
          <p className="text-xs font-medium text-optus-teal-darker/80">{plan.dataNote}</p>
        ) : null}
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-optus-ink/50">
        {plan.network} · {plan.contract}
      </p>

      <ul className="mt-4 flex-1 space-y-2 text-sm text-optus-ink/80">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-optus-teal" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/login"
        className={cn(
          "focus-ring mt-6 inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold",
          plan.highlight
            ? "bg-optus-teal text-white hover:bg-optus-teal-dark"
            : "border border-optus-teal text-optus-teal hover:bg-optus-teal-light",
        )}
      >
        Choose {plan.name}
      </Link>
    </div>
  );
}
