import { ArrowRight } from "lucide-react";
import { LinkCard } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { FeatureIcon as FeatureIconName } from "@/data/types";

export interface Pillar {
  title: string;
  body: string;
  to: string;
  icon: FeatureIconName;
}

export function PillarGrid({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {pillars.map((pillar) => (
        <LinkCard key={pillar.to} to={pillar.to} className="flex flex-col gap-4">
          <FeatureIcon name={pillar.icon} />
          <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">{pillar.title}</h3>
          <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{pillar.body}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-eh-purple">
            Learn more
            <ArrowRight aria-hidden className="h-4 w-4" />
          </span>
        </LinkCard>
      ))}
    </div>
  );
}
