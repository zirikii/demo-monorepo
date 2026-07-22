import Link from "next/link";
import { readJson } from "@/lib/data/json-store";
import type { Plan } from "@/lib/types";
import { PlanCard } from "@/components/plans/plan-card";

const quickLinks = [
  { title: "Recharge now", body: "Top up prepaid in a few clicks.", href: "/prepaid" },
  { title: "Activate a SIM", body: "Start a new mobile or prepaid service.", href: "/mobile" },
  { title: "Check outages", body: "See service health by address.", href: "/support" },
  { title: "Pay a bill", body: "Jump into My Optus billing.", href: "/bills" },
];

export default async function HomePage() {
  const plans = (await readJson<Plan[]>("plans.json")).filter((plan) => plan.popular);
  return (
    <>
      <section className="optus-gradient text-white">
        <div className="container grid min-h-[560px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-up">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-optus-yellow">
              Optus demo
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight md:text-7xl">
              Mobile and internet built around your everyday.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85">
              Shop Optus-style mobile, prepaid and home internet plans, then manage usage, bills,
              add-ons and support in a realistic My Optus dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/mobile"
                className="rounded-full bg-optus-yellow px-6 py-3 text-sm font-black text-optus-navy"
              >
                Shop mobile plans
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/70 px-6 py-3 text-sm font-black text-white"
              >
                Sign in to My Optus
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-5 text-optus-ink shadow-card">
            <div className="rounded-[1.5rem] bg-surface-subtle p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-optus-teal">
                My Optus snapshot
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Usage, bills and service health in one place.
              </h2>
              <div className="mt-6 space-y-3">
                {[
                  "Choice Plus 180GB - 112GB used",
                  "Next bill $148.50 due 5 Aug",
                  "nbn service healthy in Marrickville",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-4 font-bold shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="rounded-2xl border border-line bg-white p-5 shadow-sm hover:border-optus-teal"
          >
            <h2 className="font-black text-optus-ink">{link.title}</h2>
            <p className="mt-2 text-sm text-optus-ink/65">{link.body}</p>
          </Link>
        ))}
      </section>
      <section className="bg-surface-subtle py-14">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-optus-teal">
                Popular plans
              </p>
              <h2 className="mt-2 text-4xl font-black text-optus-ink">
                Choose a service to start.
              </h2>
            </div>
            <Link href="/internet" className="text-sm font-black text-optus-teal">
              Compare internet options
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>
      <section className="container grid gap-6 py-14 md:grid-cols-3">
        {[
          "Real support when you need it",
          "5G and nbn product storytelling",
          "Self service through My Optus",
        ].map((title) => (
          <article key={title} className="rounded-2xl bg-optus-teal-light p-6">
            <h2 className="text-xl font-black text-optus-navy">{title}</h2>
            <p className="mt-2 text-sm text-optus-ink/70">
              Dummy data and simulated interactions keep the demo safe while matching the Optus
              customer journey.
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
