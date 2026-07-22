import type { Metadata } from "next";
import Link from "next/link";
import { PlanCard } from "@/components/plans/plan-card";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";

export const metadata: Metadata = { title: "Prepaid & recharge" };

export default async function PrepaidPage() {
  const plans = (await readJson<MobilePlan[]>("plans.json")).filter(
    (plan) => plan.tag === "Prepaid" || plan.id.startsWith("prepaid"),
  );
  const prepaidPlans =
    plans.length > 0
      ? plans
      : [
          {
            id: "prepaid-35",
            name: "Optus Prepaid Flex",
            price: 35,
            data: "50GB / 28 days",
            network: "Optus 4G and 5G network",
            features: [
              "Recharge in My Optus",
              "Unlimited standard national talk and text",
              "No lock-in",
            ],
            tag: "Prepaid",
          },
        ];

  return (
    <div className="container py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Prepaid</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-optus-ink">Recharge and stay flexible</h1>
      <p className="mt-4 max-w-3xl text-optus-ink/80">
        Demo prepaid recharges with AUD amounts, activate-SIM guidance and My Optus top-ups — no real carrier billing.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/signup"
          className="inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-bold text-white hover:bg-optus-teal-dark"
        >
          Activate a SIM
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center rounded-md border border-optus-teal px-5 text-sm font-bold text-optus-teal-dark"
        >
          Recharge in My Optus
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {prepaidPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
