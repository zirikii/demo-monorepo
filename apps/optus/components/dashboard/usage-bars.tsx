import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FleetDevice } from "@/lib/types";
export function UsageBars({ fleet }: { fleet: FleetDevice[] }) {
  const topUsage = [...fleet].sort((a, b) => b.usageGb - a.usageGb).slice(0, 6);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Highest mobile data usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topUsage.map((device) => (
          <div key={device.id}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-optus-ink">{device.user}</span>
              <span className="text-optus-muted">
                {device.usageGb}GB / {device.includedGb}GB
              </span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-optus-teal-soft">
              <div
                className="h-3 rounded-full bg-optus-yellow"
                style={{ width: `${Math.min(100, (device.usageGb / device.includedGb) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
