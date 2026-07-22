import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export function PlanCard({ plan }: { plan: MobilePlan }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-xl font-black text-optus-ink">{plan.name}</h2>
        {plan.tag ? <Badge>{plan.tag}</Badge> : null}
      </div>
      <p className="mt-4 text-4xl font-black text-optus-teal-dark">
        {formatAud(plan.price)}
        <span className="text-sm font-normal text-optus-ink/60"> /mth</span>
      </p>
      <p className="mt-3 text-sm font-semibold text-optus-ink">{plan.data}</p>
      <p className="mt-1 text-xs text-optus-ink/60">{plan.network}</p>
      <ul className="mt-5 flex-1 space-y-2 text-sm text-optus-ink/80">
        {plan.features.map((feature) => (
          <li key={feature}>- {feature}</li>
        ))}
      </ul>
      <Link href="/signup" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-optus-teal text-sm font-bold text-white hover:bg-optus-teal-dark">
        Choose plan
      </Link>
    </article>
  );
}
