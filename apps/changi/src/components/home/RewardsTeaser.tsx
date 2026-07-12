import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { rewardBenefits } from "@/data/rewards";

export function RewardsTeaser() {
  return (
    <section className="bg-sand-alt py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-magenta">
            Changi Rewards
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Earn as you go, redeem for treats
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Join Changi Rewards for free and start collecting points on dining, shopping and
            iShopChangi purchases across the airport — then turn them into vouchers and gifts.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/rewards" withArrow>
              Join for free
            </Button>
            <Button to="/rewards" variant="secondary">
              View benefits
            </Button>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {rewardBenefits.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-card border border-sand-deep bg-card p-5 shadow-card"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-badge-purple text-magenta">
                <Check className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{benefit.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{benefit.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
