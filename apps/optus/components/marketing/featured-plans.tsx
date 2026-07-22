import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export async function FeaturedPlans() {
  const plans = (await readJson<MobilePlan[]>("plans.json")).slice(0, 3);
  return (
    <section className="container py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Featured plans</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-optus-ink md:text-4xl">Mobile plans for everyday Australia</h2>
        </div>
        <Link href="/mobile-plans" className="text-sm font-bold text-optus-teal-dark hover:underline">Compare all plans</Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.id} className="rounded-xl border border-line bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-black text-optus-ink">{plan.name}</h3>{plan.tag ? <Badge>{plan.tag}</Badge> : null}</div>
            <p className="mt-4 text-4xl font-black text-optus-teal-dark">{formatAud(plan.price)}<span className="text-sm font-normal text-optus-ink/60"> /mth</span></p>
            <p className="mt-3 text-sm font-semibold text-optus-ink">{plan.data}</p>
            <ul className="mt-5 space-y-2 text-sm text-optus-ink/75">{plan.features.slice(0, 3).map((feature) => <li key={feature}>- {feature}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
