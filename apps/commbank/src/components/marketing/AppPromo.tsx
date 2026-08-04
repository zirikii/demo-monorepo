import { Link } from "react-router-dom";
import { appFeatures, awards } from "@/data/site";
import { AppMockup } from "./AppMockup";

export function AppPromo() {
  return (
    <section className="bg-surface-tint py-12 sm:py-16">
      <div className="container-cba grid gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_240px_1fr]">
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Australia&rsquo;s best banking app
            <span aria-hidden="true" className="mt-2 block h-1 w-16 bg-cba-yellow" />
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            Making your day-to-day simple, quick and secure — paying someone, transferring money,
            managing your cards and bills, all on the go. At the same time keeping you aware of your
            spending patterns and helping you stay in control.
          </p>
          <ul className="mt-6 space-y-1.5">
            {awards.map((award) => (
              <li key={award.id} className="text-[13px] text-ink-faint">
                {award.label}
              </li>
            ))}
          </ul>
          <Link
            to="/digital-banking/app"
            className="focus-cba mt-6 inline-block rounded-full bg-cba-yellow px-6 py-3 text-[15px] font-bold text-ink hover:bg-cba-yellow-dark"
          >
            Explore the CommBank app
          </Link>
        </div>

        <div className="hidden xl:block">
          <AppMockup />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {appFeatures.map((feature) => (
            <li key={feature.id} className="rounded-cba-lg bg-surface p-5 shadow-cba">
              <h3 className="text-[15px] font-bold text-ink">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
