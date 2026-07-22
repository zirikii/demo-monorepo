import type { Metadata } from "next";
import Link from "next/link";
import { readJson } from "@/lib/data/json-store";
import type { HomeInternetPlan, MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Pricing" };

export default async function PricingPage() {
  const [mobile, internet] = await Promise.all([readJson<MobilePlan[]>("plans.json"), readJson<HomeInternetPlan[]>("home-internet.json")]);
  const sections = [
    { title: "Mobile", rows: mobile.map((plan) => ({ name: plan.name, price: `${formatAud(plan.price)} /mth` })) },
    { title: "Home internet", rows: internet.map((plan) => ({ name: plan.name, price: `${formatAud(plan.price)} /mth` })) },
  ];
  return (
    <div className="container py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Pricing</p>
      <h1 className="mt-2 text-4xl font-black text-optus-ink">Optus demo pricing</h1>
      <p className="mt-4 max-w-3xl text-optus-ink/75">AUD prices for demo mobile and home internet products. No real services are sold or activated.</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="rounded-xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-optus-ink">{section.title}</h2>
            <dl className="mt-5 divide-y divide-line">{section.rows.map((row) => (<div key={row.name} className="flex items-center justify-between gap-4 py-3 text-sm"><dt className="font-semibold text-optus-ink">{row.name}</dt><dd className="font-bold text-optus-teal-dark">{row.price}</dd></div>))}</dl>
          </section>
        ))}
      </div>
      <Link href="/signup" className="mt-8 inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-bold text-white hover:bg-optus-teal-dark">Create demo account</Link>
    </div>
  );
}
