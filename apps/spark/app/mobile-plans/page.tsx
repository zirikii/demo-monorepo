import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";
import { formatNzd } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Mobile plans" };

export default async function MobilePlansPage() {
  const plans = await readJson<MobilePlan[]>("plans.json");

  return (
    <div className="container py-14">
      <h1 className="text-4xl font-bold tracking-tight text-spark-ink">Endless mobile plans</h1>
      <p className="mt-4 max-w-3xl text-spark-ink/80">
        Endless plans starting from $45. When you reach your data allowance your download speed slows
        down — keeping you connected. Save up to 35% with Team Up.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <article key={plan.id} className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-bold text-spark-ink">{plan.name}</h2>
              {plan.tag ? <Badge>{plan.tag}</Badge> : null}
            </div>
            <p className="mt-4 text-3xl font-bold text-spark-purple">
              {formatNzd(plan.price)}
              <span className="text-sm font-normal text-spark-ink/60"> /mth</span>
            </p>
            <p className="mt-3 text-sm text-spark-ink/80">{plan.data}</p>
            <ul className="mt-5 space-y-2 text-sm text-spark-ink/80">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-spark-purple text-sm font-semibold text-white hover:bg-spark-purple-dark"
            >
              Choose plan
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
