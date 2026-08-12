import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

export function PricingCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {pricingTiers.map((tier) => (
        <article
          key={tier.id}
          data-testid={`tier-${tier.id}`}
          className={cn(
            "flex flex-col rounded-eh-lg border bg-white p-6 shadow-eh",
            tier.highlighted ? "border-eh-purple ring-2 ring-eh-purple/20" : "border-line",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold">{tier.name}</h3>
            {tier.highlighted ? <Badge>Popular</Badge> : null}
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-eh-purple">{tier.price}</p>
          <p className="mt-2 text-sm text-ink-soft">{tier.blurb}</p>
          <ul className="mt-5 flex-1 space-y-2">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-ink">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-eh-purple" />
                {f}
              </li>
            ))}
          </ul>
          <ButtonLink
            to={tier.id === "unlimited" ? "/request-demo" : "/signup"}
            variant={tier.highlighted ? "primary" : "secondary"}
            className="mt-6 w-full"
          >
            {tier.cta}
          </ButtonLink>
        </article>
      ))}
    </div>
  );
}
