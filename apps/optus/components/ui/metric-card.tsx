import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
export function MetricCard({
  title,
  value,
  detail,
  icon: Icon,
  tone = "teal",
}: {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: "teal" | "yellow";
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-optus-muted">{title}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-optus-ink">{value}</p>
          <p className="mt-1 text-sm text-optus-muted">{detail}</p>
        </div>
        <div
          className={
            tone === "yellow"
              ? "rounded-md bg-optus-yellow p-3"
              : "rounded-md bg-optus-teal-soft p-3"
          }
        >
          <Icon className="h-5 w-5 text-optus-teal-dark" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}
