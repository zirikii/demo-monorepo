import { useState, type FormEvent } from "react";
import { Check, Crown } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { rewardTiers, rewardBenefits, catalogue } from "@/data/rewards";

export function RewardsPage() {
  const [joined, setJoined] = useState(false);

  function handleJoin(event: FormEvent) {
    event.preventDefault();
    setJoined(true);
  }

  return (
    <PageLayout>
      <PageHero
        eyebrow="Changi Rewards"
        title="Rewards that go the distance"
        copy="Earn points on dining, shopping and iShopChangi purchases, then redeem for treats, travel essentials and experiences."
        crumbs={[{ label: "Home", to: "/" }, { label: "Changi Rewards" }]}
      >
        {joined ? (
          <p
            role="status"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-magenta"
          >
            <Check className="size-4" aria-hidden />
            Welcome to Changi Rewards! Check your inbox for your member number.
          </p>
        ) : (
          <form onSubmit={handleJoin} className="flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="join-email" className="sr-only">
              Email address
            </label>
            <input
              id="join-email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/60 outline-none focus:border-white focus:ring-2 focus:ring-white/40"
            />
            <Button type="submit" variant="primary-dark">
              Join for free
            </Button>
          </form>
        )}
      </PageHero>

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Membership" title="Choose your tier" align="center" className="mb-12" />
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {rewardTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col rounded-card border p-8 shadow-card",
                  tier.featured
                    ? "changi-gradient border-transparent text-white"
                    : "border-sand-deep bg-card",
                )}
              >
                {tier.featured && (
                  <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    <Crown className="size-4" aria-hidden />
                    Premium
                  </span>
                )}
                <h3 className={cn("text-2xl font-bold", tier.featured ? "text-white" : "text-ink")}>
                  {tier.name}
                </h3>
                <p className={cn("mt-1 text-sm font-medium", tier.featured ? "text-white/80" : "text-magenta")}>
                  {tier.requirement}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn("mt-0.5 size-4 shrink-0", tier.featured ? "text-white" : "text-magenta")}
                        aria-hidden
                      />
                      <span className={tier.featured ? "text-white/90" : "text-ink-soft"}>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-alt py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Why join" title="Member benefits" className="mb-12" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rewardBenefits.map((benefit) => (
              <div key={benefit.title} className="rounded-card border border-sand-deep bg-card p-6 shadow-card">
                <span className="flex size-10 items-center justify-center rounded-full bg-badge-purple text-magenta">
                  <Check className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{benefit.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Rewards catalogue"
            title="Redeem your points"
            copy="A taste of what your points can unlock across the airport and Jewel."
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalogue.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-card border border-sand-deep bg-card shadow-card"
              >
                <div className={cn("changi-aurora flex h-28 items-end bg-gradient-to-br p-4", item.tint)}>
                  <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-plum">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between p-5">
                  <span className="font-semibold text-ink">{item.name}</span>
                  <span className="text-sm font-bold text-magenta">{item.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
