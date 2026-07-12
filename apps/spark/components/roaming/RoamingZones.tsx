import { Globe } from "lucide-react";
import { ROAMING_ZONES } from "@/lib/constants";
import { formatNzd } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

/** Table of Spark-style roaming zones with indicative daily rates. */
export function RoamingZones() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ROAMING_ZONES.map((zone) => (
        <div
          key={zone.id}
          className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-spark-purple-light text-spark-purple">
                <Globe className="h-5 w-5" />
              </span>
              <h3 className="text-sm font-semibold text-spark-ink">{zone.name}</h3>
            </div>
            <Badge tone="brand">{formatNzd(zone.dailyRate)}/day</Badge>
          </div>
          <p className="mt-3 text-sm text-ink-secondary">{zone.countries.join(" · ")}</p>
        </div>
      ))}
    </div>
  );
}
