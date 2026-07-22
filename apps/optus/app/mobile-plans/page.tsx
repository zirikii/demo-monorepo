import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";
import { PageHero } from "@/components/marketing/page-hero";
import { PlanGrid } from "@/components/plans/plan-grid";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Mobile plans",
  description: "SIM-only Optus Choice mobile plans with 5G access and Optus Sport included.",
};

const FAQ = [
  {
    id: "faq-5g",
    title: "Is 5G included?",
    content:
      "Yes — 5G access is included at no extra cost on all eligible Optus Choice postpaid plans, subject to coverage and a compatible device.",
  },
  {
    id: "faq-contract",
    title: "Am I locked into a contract?",
    content:
      "No. All Choice SIM-only plans are month-to-month with no lock-in contract. You can change or cancel any time in the My Optus app.",
  },
  {
    id: "faq-keep",
    title: "Can I keep my number?",
    content:
      "Absolutely. You can bring your existing number to Optus during sign-up — most transfers complete within a couple of hours.",
  },
];

export default async function MobilePlansPage() {
  const plans = await readJson<MobilePlan[]>("plans.json");

  return (
    <>
      <PageHero
        eyebrow="Mobile"
        title="SIM-only plans with more of what you love"
        description="Choose the data you need, keep your number, and enjoy Optus Sport included — all with no lock-in contract."
      />
      <section className="container py-14">
        <PlanGrid plans={plans} />
      </section>
      <section className="bg-surface-subtle">
        <div className="container py-14">
          <h2 className="text-2xl font-bold text-optus-ink">Mobile plan FAQs</h2>
          <div className="mt-6 max-w-3xl">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>
    </>
  );
}
