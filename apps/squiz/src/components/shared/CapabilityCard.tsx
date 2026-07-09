import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { tintBg } from "@/lib/tints";
import type { Capability } from "@/data/capabilities";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <Link
      to={`/products/capabilities/${capability.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-cream-deep bg-card p-6 shadow-card transition-shadow hover:shadow-float"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl text-navy",
            tintBg[capability.tint],
          )}
        >
          <Icon name={capability.icon} className="size-5" />
        </span>
        {capability.badge && <Badge tint="mint">{capability.badge}</Badge>}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-navy group-hover:underline">
        {capability.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-ink-faint">{capability.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{capability.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
