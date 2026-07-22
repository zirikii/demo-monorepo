import { LifeBuoy, Signal, Trophy, Unlock, type LucideIcon } from "lucide-react";
import { whyOptus } from "@/lib/constants/marketing";

const ICONS: Record<string, LucideIcon> = {
  signal: Signal,
  unlock: Unlock,
  trophy: Trophy,
  "life-buoy": LifeBuoy,
};

export function WhyOptus() {
  return (
    <section className="bg-surface-subtle py-16">
      <div className="container">
        <h2 className="text-center text-3xl font-extrabold text-optus-ink">Why choose Optus</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-optus-ink/70">
          More reasons to say Yes — network, flexibility, entertainment and support.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyOptus.map((item) => {
            const Icon = ICONS[item.icon] ?? Signal;
            return (
              <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-optus-yellow-light text-optus-yellow-dark">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-optus-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-optus-ink/70">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
