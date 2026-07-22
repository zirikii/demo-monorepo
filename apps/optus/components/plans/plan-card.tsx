import type { Plan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      data-testid="plan-card"
      className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card"
    >
      {plan.popular ? (
        <span className="absolute right-4 top-4 rounded-full bg-optus-yellow px-3 py-1 text-xs font-bold text-optus-navy">
          Popular
        </span>
      ) : null}
      <p className="text-xs font-bold uppercase tracking-wide text-optus-teal">{plan.category}</p>
      <h3 className="mt-2 text-2xl font-black text-optus-ink">{plan.name}</h3>
      <p className="mt-1 text-sm text-optus-ink/65">{plan.tag ?? plan.data}</p>
      <div className="mt-5 flex items-end gap-1">
        <span className="text-4xl font-black text-optus-navy">{formatAud(plan.price)}</span>
        <span className="pb-1 text-sm text-optus-ink/60">/{plan.billing}</span>
      </div>
      <p className="mt-3 rounded-xl bg-optus-teal-light px-3 py-2 text-sm font-bold text-optus-navy">
        {plan.data}
        {plan.speed ? ` - ${plan.speed}` : ""}
      </p>
      <ul className="mt-5 flex-1 space-y-2 text-sm text-optus-ink/75">
        {plan.features.map((feature) => (
          <li key={feature}>- {feature}</li>
        ))}
      </ul>
      <button
        type="button"
        disabled={plan.unavailable}
        className="mt-6 h-11 rounded-full bg-optus-teal px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-line-strong"
      >
        {plan.unavailable ? "Unavailable" : "Choose plan"}
      </button>
    </article>
  );
}
