import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export function PlanCard({
  plan,
  onSelect,
}: {
  plan: MobilePlan;
  onSelect?: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm",
        plan.highlight ? "border-optus-yellow ring-2 ring-optus-yellow/40" : "border-line",
      )}
      data-testid="plan-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-optus-ink">{plan.name}</h3>
          <p className="mt-1 text-xs text-optus-ink-soft">SIM only · no lock-in contract</p>
        </div>
        {plan.tag ? (
          <Badge className={plan.highlight ? "bg-optus-yellow text-optus-ink" : undefined}>
            {plan.tag}
          </Badge>
        ) : null}
      </div>

      <p className="mt-5 text-4xl font-bold text-optus-ink">
        <span className="align-top text-lg">$</span>
        {plan.price}
        <span className="text-base font-semibold text-optus-ink-soft">/mth</span>
      </p>

      <div className="mt-4 rounded-md bg-surface-subtle p-4">
        <p className="text-3xl font-bold text-optus-ink">{plan.data}</p>
        {plan.dataNote ? <p className="mt-1 text-xs text-optus-ink-soft">{plan.dataNote}</p> : null}
      </div>

      <ul className="mt-5 flex-1 space-y-2 text-sm text-optus-ink-soft">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-optus-yellow"
            />
            {f}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-6 inline-flex h-11 w-full shrink-0 items-center justify-center rounded-md bg-optus-ink px-4 text-sm font-semibold text-white hover:bg-optus-ink/90"
        onClick={() => onSelect?.(plan.id)}
        aria-label={`Choose ${plan.name} for ${formatAud(plan.price)} per month`}
      >
        Choose plan
      </button>
    </article>
  );
}
