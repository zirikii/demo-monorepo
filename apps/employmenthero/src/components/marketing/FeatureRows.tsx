import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { Product } from "@/data/types";

export function FeatureRows({ features }: { features: Product["features"] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {features.map((feature) => (
        <div key={feature.title} className="flex gap-5">
          <FeatureIcon name={feature.icon} className="mt-1" />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">{feature.title}</h3>
            <p className="text-[0.98rem] leading-relaxed text-ink-soft">{feature.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
