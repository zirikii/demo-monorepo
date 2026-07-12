import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPlansByKind } from "@/lib/data/plans";
import { PlanCard } from "@/components/plans/PlanCard";

export const metadata: Metadata = {
  title: "Home broadband plans",
  description: "Fibre, wireless and rural broadband with a Smart Mesh router and no contract.",
};

export default async function BroadbandPage() {
  const plans = await getPlansByKind("broadband");

  return (
    <div className="container-page py-14">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold text-spark-ink sm:text-4xl">Home broadband</h1>
        <p className="mt-3 text-lg text-ink-secondary">
          Reliable fibre and wireless plans with unlimited data and a Smart Mesh router included.
          No fixed-term contract.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} href="/register" ctaLabel="Get this plan" />
        ))}
      </div>

      <div
        id="move"
        className="mt-12 scroll-mt-20 rounded-2xl border border-line bg-spark-purple-light p-6"
      >
        <h2 className="text-xl font-bold text-spark-ink">Moving house?</h2>
        <p className="mt-2 max-w-2xl text-ink-secondary">
          Take your broadband with you. Tell us your new address and we&apos;ll check what&apos;s
          available and move your plan across — in many homes you&apos;ll be back online the same
          day, at the same price.
        </p>
        <Link
          href="/shop/promotions/travel-and-move"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-spark-purple"
        >
          See moving options <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
