import type { Metadata } from "next";
import Link from "next/link";
import { PlanCard } from "@/components/plans/plan-card";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";

export const metadata: Metadata = { title: "Mobile plans" };

export default async function MobilePlansPage() {
  const plans = await readJson<MobilePlan[]>("plans.json");
  const postpaid = plans.filter((plan) => plan.tag !== "Prepaid");

  return (
    <div className="container py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Mobile plans</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-optus-ink">SIM-only plans with no lock-in</h1>
      <p className="mt-4 max-w-3xl text-optus-ink/80">
        Month-to-month Optus demo plans with 5G access, unlimited standard national talk and text, and AUD pricing. Bring
        your own phone or pair with a new device.
      </p>
      <div className="mt-6 rounded-lg border border-optus-yellow/40 bg-optus-yellow/20 px-4 py-3 text-sm font-semibold text-optus-ink">
        Super SIM sale — save $15 a month for 12 months on selected plans in this demo.
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {postpaid.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <p className="mt-10 text-sm text-optus-ink/70">
        Prefer prepaid?{" "}
        <Link href="/prepaid" className="font-bold text-optus-teal-dark hover:underline">
          Browse recharge plans
        </Link>
        .
      </p>
    </div>
  );
}
