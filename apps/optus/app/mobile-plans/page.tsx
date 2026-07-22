import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { PlanCard } from "@/components/marketing/plan-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";

export const metadata: Metadata = {
  title: "Mobile plans",
  description: "SIM only mobile plans on the Optus 5G network with no lock-in contract.",
};

const FAQ = [
  {
    q: "Do I need a contract?",
    a: "No. All Optus SIM only plans are month to month, so you can change or cancel any time.",
  },
  {
    q: "What is data rollover?",
    a: "Unused data rolls over to the next month, up to your plan's rollover cap.",
  },
  {
    q: "Is Optus Sport included?",
    a: "Selected plans include Optus Sport at no extra cost. Look for it in the plan features.",
  },
  {
    q: "Can I keep my number?",
    a: "Yes — you can bring your existing number across to Optus during sign up.",
  },
];

export default async function MobilePlansPage() {
  const plans = await readJson<MobilePlan[]>("mobile-plans.json");

  return (
    <>
      <PageHero
        eyebrow="Mobile"
        title="SIM only plans that flex with you"
        description="Big data, 5G at no extra cost, and no lock-in contract. Choose the plan that fits."
      />
      <section className="container py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <h2 className="text-2xl font-extrabold text-optus-ink">Mobile plan FAQs</h2>
        <div className="mt-4 max-w-3xl">
          <Accordion type="single" collapsible>
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
