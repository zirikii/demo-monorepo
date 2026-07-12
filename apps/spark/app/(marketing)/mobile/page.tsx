import type { Metadata } from "next";
import { getPlansByKind } from "@/lib/data/plans";
import { PlanCard } from "@/components/plans/PlanCard";

export const metadata: Metadata = {
  title: "Pay Monthly mobile plans",
  description: "Endless data mobile plans with minutes and texts included, on an open term.",
};

export default async function MobilePage() {
  const plans = await getPlansByKind("mobile");

  return (
    <div className="container-page py-14">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold text-spark-ink sm:text-4xl">Pay Monthly mobile</h1>
        <p className="mt-3 text-lg text-ink-secondary">
          Endless data, endless minutes and texts, all on an open term. Bring your number and
          change plans whenever you like.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} href="/register" />
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-muted">
        Prices shown are for demo purposes only. Endless data plans manage speeds after a set
        threshold — see plan details for specifics.
      </p>
    </div>
  );
}
