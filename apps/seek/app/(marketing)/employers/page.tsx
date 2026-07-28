import type { Metadata } from "next";
import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Advertise a job",
  description: "Employer job ad products and pricing for the unofficial SEEK demo.",
};

const tiers = [
  {
    id: "classic",
    name: "Classic",
    price: "From $299",
    period: "per ad",
    description: "Get your role in front of relevant candidates across SEEK search.",
    features: [
      "30-day job ad",
      "Appears in search results",
      "Basic company branding",
      "Application email notifications",
    ],
    cta: "Choose Classic",
    highlighted: false,
  },
  {
    id: "standout",
    name: "StandOut",
    price: "From $449",
    period: "per ad",
    description: "Stand out with richer branding and preferential search placement.",
    features: [
      "Everything in Classic",
      "Logo and brand colour in results",
      "Priority ranking boost",
      "Featured company snippet",
    ],
    cta: "Choose StandOut",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "From $699",
    period: "per ad",
    description: "Maximise reach with premium placement and candidate targeting.",
    features: [
      "Everything in StandOut",
      "Homepage & category highlights",
      "Candidate matching insights",
      "Dedicated performance summary",
    ],
    cta: "Choose Premium",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Is this real billing?",
    a: "No. This is an unofficial demo — prices are illustrative and no payments are processed.",
  },
  {
    q: "How long do ads stay live?",
    a: "In the demo, Classic ads are shown as 30-day listings. Real SEEK products may differ.",
  },
  {
    q: "Can I edit an ad after posting?",
    a: "In a full product you could update copy and targeting. Here, posting is simulated via register.",
  },
];

export default function EmployersPage() {
  return (
    <div>
      <section className="border-b border-line bg-seek-navy text-white">
        <div className="container-page py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-seek-pink">
            For employers
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">
            Advertise a job on Australia&apos;s no. 1 jobs site
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Reach qualified candidates with Classic, StandOut or Premium job ads. All prices in this
            demo are fictional — nothing is charged.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/oauth/register">Get started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="#pricing">Compare products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="pricing" className="container-page scroll-mt-24 py-14">
        <h2 className="text-2xl font-bold text-seek-navy">Products &amp; prices</h2>
        <p className="mt-1 text-ink-secondary">
          Pick the ad type that fits your hiring goal. (Demo pricing only.)
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={
                tier.highlighted
                  ? "relative flex flex-col rounded-xl border-2 border-seek-pink bg-white p-6 shadow-card-hover"
                  : "flex flex-col rounded-xl border border-line bg-white p-6 shadow-card"
              }
            >
              {tier.highlighted ? (
                <span className="absolute -top-3 left-6 rounded-full bg-seek-pink px-3 py-0.5 text-xs font-semibold text-white">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-xl font-bold text-seek-navy">{tier.name}</h3>
              <p className="mt-1 text-sm text-ink-secondary">{tier.description}</p>
              <p className="mt-4">
                <span className="text-3xl font-bold text-seek-navy">{tier.price}</span>
                <span className="ml-1 text-sm text-ink-muted">{tier.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-secondary">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-tone-positive"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full rounded-full" variant={tier.highlighted ? "primary" : "secondary"}>
                <Link href="/oauth/register">{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-subtle py-14">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-seek-navy">Frequently asked questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-lg border border-line bg-white p-5 shadow-card">
                <div className="flex items-start gap-2">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-seek-pink" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-seek-navy">{item.q}</h3>
                    <p className="mt-1.5 text-sm text-ink-secondary">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
