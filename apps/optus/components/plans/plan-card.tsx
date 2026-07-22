import Link from "next/link";
import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export function PlanCard({ plan }: { plan: MobilePlan }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm",
        plan.highlight ? "border-optus-teal ring-2 ring-optus-teal/30" : "border-line",
      )}
      data-testid={`plan-card-${plan.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold text-optus-ink">{plan.name}</h3>
        {plan.tag ? (
          <span className="rounded-full bg-optus-yellow px-2 py-0.5 text-[11px] font-bold text-optus-ink">
            {plan.tag}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-3xl font-extrabold text-optus-teal">
        {formatAud(plan.price)}
        <span className="text-sm font-semibold text-optus-ink/60">/mth</span>
      </p>
      <p className="mt-1 text-sm font-semibold text-optus-ink">{plan.data} data</p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-optus-ink/75">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-optus-teal" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={cn(
          "mt-5 inline-flex h-10 items-center justify-center rounded-md text-sm font-semibold",
          plan.highlight
            ? "bg-optus-teal text-white hover:bg-optus-teal-dark"
            : "border border-optus-teal text-optus-teal hover:bg-optus-teal-light",
        )}
      >
        Choose plan
      </Link>
    </article>
  );
}
