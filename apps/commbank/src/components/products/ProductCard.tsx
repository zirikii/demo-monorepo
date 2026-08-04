import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ProductCard({
  id,
  name,
  tagline,
  headline,
  headlineLabel,
  features,
  badge,
  ctaLabel = "Learn more",
  ctaTo = "/support",
  footnote,
}: {
  id?: string;
  name: string;
  tagline: string;
  headline?: string;
  headlineLabel?: string;
  features: string[];
  badge?: string;
  ctaLabel?: string;
  ctaTo?: string;
  footnote?: string;
}) {
  return (
    <Card id={id} as="article" className="flex h-full flex-col scroll-mt-28">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-black">{name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{tagline}</p>
        </div>
        {badge ? <Badge tone="yellow">{badge}</Badge> : null}
      </div>

      {headline ? (
        <div className="mb-4 rounded-xl bg-surface-tint px-4 py-3">
          <p className="text-2xl font-bold text-black">{headline}</p>
          {headlineLabel ? <p className="mt-1 text-xs text-ink-muted">{headlineLabel}</p> : null}
        </div>
      ) : null}

      <ul className="mb-6 flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-ink-soft">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-3">
        <ButtonLink to={ctaTo}>{ctaLabel}</ButtonLink>
        <ButtonLink to="/support" variant="link">
          Compare
        </ButtonLink>
      </div>
      {footnote ? <p className="mt-3 text-xs text-ink-muted">{footnote}</p> : null}
    </Card>
  );
}
