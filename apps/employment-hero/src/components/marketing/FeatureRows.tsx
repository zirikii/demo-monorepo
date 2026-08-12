import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export type FeatureRow = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};

export function FeatureRows({ rows }: { rows: FeatureRow[] }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {rows.map((row, index) => (
        <div
          key={row.title}
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2",
            index % 2 === 1 && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-eh-purple uppercase">
              {row.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-3xl leading-tight font-bold text-eh-ink">
              {row.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-eh-ink-soft">{row.body}</p>
            <ul className="mt-6 space-y-3">
              {row.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-eh-ink-soft">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-eh-purple-tint text-eh-purple">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="relative overflow-hidden rounded-eh-xl bg-eh-purple-wash p-8"
          >
            <div className="absolute -top-10 -right-10 size-40 rounded-full bg-eh-purple/10" />
            <div className="relative rounded-eh-lg bg-white p-6 shadow-eh">
              <p className="text-xs font-bold tracking-[0.14em] text-eh-ink-faint uppercase">
                {row.eyebrow}
              </p>
              <div className="mt-4 space-y-3">
                {row.points.map((point, pointIndex) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-eh bg-eh-surface-tint px-3 py-2.5"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-eh-purple text-[11px] font-bold text-white">
                      {pointIndex + 1}
                    </span>
                    <span className="truncate text-sm text-eh-ink-soft">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
