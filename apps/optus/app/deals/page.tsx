import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Percent, Smartphone, Tv } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Deals",
  description: "The latest Optus deals — bonus data, device offers, and entertainment bundles.",
};

const DEALS = [
  {
    icon: Percent,
    title: "$10/mth off for 12 months",
    body: "Save on the Medium and Large SIM only plans when you bring your number across.",
    href: "/mobile-plans",
    cta: "Shop mobile",
    accent: true,
  },
  {
    icon: Tv,
    title: "3 months of Optus Sport free",
    body: "New customers on selected plans get Optus Sport included for three months.",
    href: "/optus-sport",
    cta: "See Sport",
  },
  {
    icon: Smartphone,
    title: "Bonus trade-in credit",
    body: "Trade in an eligible device and get bonus credit towards your new phone.",
    href: "/phones",
    cta: "Shop phones",
  },
  {
    icon: Gift,
    title: "First month free on 5G Home",
    body: "Sign up to 5G Home Internet and get your first month of access on us.",
    href: "/broadband",
    cta: "Get connected",
  },
];

export default function DealsPage() {
  return (
    <>
      <PageHero
        eyebrow="Deals"
        title="Deals worth saying Yes to"
        description="Limited-time offers across mobile, internet, phones and entertainment."
      />
      <section className="container py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {DEALS.map((deal) => {
            const Icon = deal.icon;
            return (
              <div
                key={deal.title}
                className={
                  "flex flex-col rounded-lg border p-6 shadow-sm " +
                  (deal.accent
                    ? "border-optus-yellow bg-optus-yellow-light"
                    : "border-line bg-white")
                }
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-optus-teal text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-optus-ink">{deal.title}</h3>
                <p className="mt-2 flex-1 text-sm text-optus-ink/70">{deal.body}</p>
                <Link
                  href={deal.href}
                  className="focus-ring mt-5 inline-flex h-11 w-fit items-center rounded-md bg-optus-teal px-5 text-sm font-semibold text-white hover:bg-optus-teal-dark"
                >
                  {deal.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
