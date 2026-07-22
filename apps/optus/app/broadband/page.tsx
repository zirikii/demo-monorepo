import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { AddressCheckForm } from "@/components/marketing/address-check-form";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { readJson } from "@/lib/data/json-store";
import type { BroadbandPlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Home internet",
  description: "nbn® and 5G Home Internet plans from Optus with no lock-in contract.",
};

export default async function BroadbandPage() {
  const plans = await readJson<BroadbandPlan[]>("broadband.json");

  return (
    <>
      <PageHero
        eyebrow="Home internet"
        title="nbn® and 5G Home Internet"
        description="Get connected at home with no lock-in contract, a WiFi modem included, and 4G backup on selected plans."
      />

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col rounded-lg border bg-white p-6 shadow-sm",
                  plan.highlight ? "border-optus-teal ring-2 ring-optus-teal" : "border-line",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-optus-ink">{plan.name}</h3>
                  <Badge>{plan.type === "5G Home" ? "5G Home" : "nbn®"}</Badge>
                </div>
                <p className="mt-1 text-sm text-optus-ink/60">{plan.speed}</p>
                <p className="mt-4 text-4xl font-extrabold text-optus-ink">
                  {formatAud(plan.price)}
                  <span className="text-base font-semibold text-optus-ink/60">/mth</span>
                </p>
                <p className="mt-2 text-sm text-optus-ink/70">{plan.typicalEvening}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-optus-ink/80">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-optus-teal" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className="focus-ring mt-6 inline-flex h-11 items-center justify-center rounded-md bg-optus-teal px-5 text-sm font-semibold text-white hover:bg-optus-teal-dark"
                >
                  Get {plan.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-lg font-bold text-optus-ink">Available at your place?</h2>
            <p className="mt-1 text-sm text-optus-ink/70">
              Check which plans are available at your address.
            </p>
            <div className="mt-4">
              <AddressCheckForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
