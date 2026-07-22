import { readJson } from "@/lib/data/json-store";
import type { HomeInternetPlan, MobilePlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export default async function PlansPage() {
  const [mobilePlans, internetPlans] = await Promise.all([readJson<MobilePlan[]>("plans.json"), readJson<HomeInternetPlan[]>("home-internet.json")]);
  const currentMobile = mobilePlans[1] ?? mobilePlans[0];
  const currentInternet = internetPlans[1] ?? internetPlans[0];
  return <div><h2 className="text-2xl font-black text-optus-ink">Your plans</h2><div className="mt-6 grid gap-6 md:grid-cols-2">{currentMobile ? <CurrentPlan title="Current mobile plan" name={currentMobile.name} price={currentMobile.price} features={currentMobile.features} /> : null}{currentInternet ? <CurrentPlan title="Current home internet" name={currentInternet.name} price={currentInternet.price} features={currentInternet.features} /> : null}</div><h3 className="mt-10 text-lg font-black text-optus-ink">Other mobile options</h3><ul className="mt-4 grid gap-4 md:grid-cols-2">{mobilePlans.map((plan) => <li key={plan.id} className="rounded-lg border border-line bg-white p-4"><p className="font-bold">{plan.name}</p><p className="text-sm text-optus-ink/70">{formatAud(plan.price)} /mth</p></li>)}</ul></div>;
}

function CurrentPlan({ title, name, price, features }: { title: string; name: string; price: number; features: string[] }) {
  return <div className="rounded-lg border border-optus-teal bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase text-optus-teal-dark">{title}</p><h3 className="mt-2 text-xl font-black">{name}</h3><p className="mt-2 text-2xl font-black text-optus-ink">{formatAud(price)}<span className="text-sm font-normal text-optus-ink/60"> /mth</span></p><ul className="mt-4 space-y-1 text-sm text-optus-ink/80">{features.map((feature) => <li key={feature}>- {feature}</li>)}</ul></div>;
}
