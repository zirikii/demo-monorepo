import { Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-eh-purple text-white">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 size-96 rounded-full bg-eh-purple-lift/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 size-96 rounded-full bg-eh-purple-deep/60 blur-3xl"
      />

      <div className="relative container-eh grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="animate-fade-up">
          <h1 className="font-display text-5xl leading-[1.05] font-bold md:text-6xl">
            Employment.
            <br />
            Intelligently Run.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{site.heroBlurb}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to="/request-a-demo" variant="inverse" size="lg">
              Request a demo
            </ButtonLink>
            <ButtonLink
              to="/start-free"
              variant="ghost"
              size="lg"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              Start free
            </ButtonLink>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/80">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={16} className="fill-eh-lime text-eh-lime" />
              ))}
            </span>
            <span>
              Customers rate us {site.rating} from {site.ratingCount} reviews
            </span>
          </div>
        </div>

        <div className="animate-fade-up rounded-eh-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="rounded-eh-lg bg-white p-5 text-eh-ink shadow-eh-lift">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Pay run — 27 Jul to 9 Aug</p>
              <span className="rounded-full bg-eh-lime px-2.5 py-1 text-[11px] font-bold">
                Ready to approve
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Employees", value: "12" },
                { label: "Gross", value: "$58,420" },
                { label: "Super", value: "$6,718" },
              ].map((item) => (
                <div key={item.label} className="rounded-eh bg-eh-surface-tint py-3">
                  <dt className="text-[11px] tracking-wide text-eh-ink-faint uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 space-y-2.5">
              {[
                { text: "Timesheets imported and award-interpreted", tone: "done" },
                { text: "Superannuation cleared for Payday Super", tone: "done" },
                { text: "1 anomaly flagged — confirm Harry Osborne's hours", tone: "warn" },
              ].map((row) => (
                <div key={row.text} className="flex items-start gap-2.5 text-sm">
                  <span
                    aria-hidden="true"
                    className={
                      row.tone === "done"
                        ? "mt-1.5 size-2 shrink-0 rounded-full bg-eh-positive"
                        : "mt-1.5 size-2 shrink-0 rounded-full bg-eh-amber"
                    }
                  />
                  <span className="text-eh-ink-soft">{row.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
