import { ShieldCheck, Zap, Repeat, Headphones } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Reliable coverage",
    blurb: "Optus 5G reaches millions of Australians, with 4G backup on eligible internet plans.",
  },
  {
    icon: Zap,
    title: "5G at no extra cost",
    blurb: "Every eligible postpaid Choice plan includes access to fast 5G speeds.",
  },
  {
    icon: Repeat,
    title: "No lock-in contracts",
    blurb: "Change or cancel your plan any time from the My Optus app — the choice is yours.",
  },
  {
    icon: Headphones,
    title: "Help when you need it",
    blurb: "Message us in the app, chat online, or drop into a store near you.",
  },
] as const;

export function WhyOptus() {
  return (
    <section className="bg-surface-subtle">
      <div className="container py-14">
        <h2 className="text-2xl font-bold text-optus-ink md:text-3xl">Why choose Optus</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div key={reason.title} className="rounded-lg border border-line bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-optus-yellow-light">
                <reason.icon className="h-6 w-6 text-optus-ink" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-optus-ink">{reason.title}</h3>
              <p className="mt-2 text-sm text-optus-ink-soft">{reason.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
