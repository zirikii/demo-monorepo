import Link from "next/link";
import { readJson } from "@/lib/data/json-store";
import type { EntertainmentTile, MobilePlan, Phone } from "@/lib/types";
import { HeroBanner } from "@/components/marketing/hero-banner";
import { QuickLinkGrid } from "@/components/marketing/quick-link-grid";
import { SectionHeading } from "@/components/marketing/section-heading";
import { WhyOptus } from "@/components/marketing/why-optus";
import { AppDownloadCta } from "@/components/marketing/app-download-cta";
import { CoverageCheck } from "@/components/marketing/coverage-check";
import { PlanGrid } from "@/components/plans/plan-grid";
import { PhoneCard } from "@/components/plans/phone-card";
import { Tv } from "lucide-react";

export default async function HomePage() {
  const plans = await readJson<MobilePlan[]>("plans.json");
  const phones = await readJson<Phone[]>("phones.json");
  const entertainment = await readJson<EntertainmentTile[]>("entertainment.json");

  return (
    <>
      <HeroBanner
        eyebrow="It starts with yes"
        title="Great value plans on our most reliable network yet"
        description="Pick a Choice plan with the data you need, add the latest phone, and enjoy Optus Sport included — all with no lock-in contract."
      />
      <QuickLinkGrid />

      <section className="container py-16">
        <SectionHeading
          title="Optus Choice mobile plans"
          description="SIM-only plans with unlimited standard national talk & text, 5G access, and Optus Sport."
          cta={{ href: "/mobile-plans", label: "See all mobile plans" }}
        />
        <div className="mt-8">
          <PlanGrid plans={plans} />
        </div>
      </section>

      <section className="bg-surface-subtle">
        <div className="container py-16">
          <SectionHeading
            title="Latest phones on Optus"
            description="Pay it off interest-free over 36 months, or bring your own device."
            cta={{ href: "/phones", label: "Browse all phones" }}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {phones.slice(0, 3).map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
      </section>

      <CoverageCheck />

      <section className="container py-16">
        <SectionHeading
          title="Entertainment, sorted"
          description="Stream live sport and bundle your favourite services with Optus SubHub."
          cta={{ href: "/entertainment", label: "Explore entertainment" }}
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {entertainment.slice(0, 3).map((tile) => (
            <article key={tile.id} className="rounded-lg border border-line bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-optus-yellow-light">
                <Tv className="h-6 w-6 text-optus-ink" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-optus-ink">{tile.name}</h3>
              <p className="mt-1 text-sm font-semibold text-optus-teal">{tile.price}</p>
              <p className="mt-2 text-sm text-optus-ink-soft">{tile.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <WhyOptus />
      <AppDownloadCta />

      <section className="container py-16 text-center">
        <h2 className="text-2xl font-bold text-optus-ink md:text-3xl">Already with Optus?</h2>
        <p className="mx-auto mt-2 max-w-xl text-optus-ink-soft">
          Sign in to My Optus to check your usage, pay bills, and manage your services.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-12 items-center rounded-md bg-optus-yellow px-6 text-sm font-semibold text-optus-ink hover:bg-optus-yellow-dark"
        >
          Sign in to My Optus
        </Link>
      </section>
    </>
  );
}
