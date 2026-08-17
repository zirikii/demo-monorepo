import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { FEATURE_ICONS } from "./icons";
import type { FeatureIconName } from "@/data/types";
import { cn } from "@/lib/cn";

export interface Pillar {
  title: string;
  body: string;
  icon: FeatureIconName;
}

interface PillarGridProps {
  pillars: Pillar[];
  className?: string;
}

export function PillarGrid({ pillars, className }: PillarGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {pillars.map((pillar) => (
        <Card key={pillar.title} className="flex flex-col gap-4">
          <FeatureIcon icon={FEATURE_ICONS[pillar.icon]} />
          <div className="flex flex-col gap-2">
            <CardHeading>{pillar.title}</CardHeading>
            <CardBody>{pillar.body}</CardBody>
          </div>
        </Card>
      ))}
    </div>
  );
}
