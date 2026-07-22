import Link from "next/link";
import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";
import { PlanCard } from "@/components/plans/plan-card";

export function FeaturedPlans({ plans }: { plans: MobilePlan[] }) {
  return (
    <section className="container py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-optus-ink">Mobile plans made simple</h2>
          <p className="mt-2 max-w-2xl text-optus-ink/70">
            Choice plans with Endless Data, unlimited standard calls & texts, and 5G access —
            demo pricing in AUD.
          </p>
        </div>
        <Link href="/mobile" className="text-sm font-semibold text-optus-teal hover:underline">
          Compare all plans
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <p className="mt-4 text-xs text-optus-ink/50">
        From {formatAud(plans[0]?.price ?? 45)}/mth. Critical Information Summaries are simulated
        in this demo.
      </p>
    </section>
  );
}
