import { useEffect, useState } from "react";
import { Activity, CircleCheck, LoaderCircle, Router, Signal, Zap } from "lucide-react";
import { household } from "@/data/account";
import { CardShell, Row } from "./CardShell";
import { Badge } from "@/components/ui/Badge";

export function OutageCard({ service }: { service: "nbn" | "power" | "mobile" }) {
  if (service === "power") {
    return (
      <CardShell title="Ausgrid outage near you" icon={<Zap className="h-4 w-4 text-caution" aria-hidden="true" />}>
        <div className="mb-2">
          <Badge tone="caution">Unplanned outage</Badge>
        </div>
        <Row label="Area" value="Newtown, Enmore (312 homes)" />
        <Row label="Cause" value="Equipment fault — crew on site" />
        <Row label="Estimated restore" value="4:30pm today" strong />
      </CardShell>
    );
  }
  const Icon = service === "nbn" ? Router : Signal;
  return (
    <CardShell title={service === "nbn" ? "nbn® network status" : "Optus mobile network"} icon={<Icon className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <div className="flex items-center gap-2 rounded-xl bg-positive-bg px-3 py-2 font-bold text-positive">
        <CircleCheck className="h-4 w-4" aria-hidden="true" /> No outages at {household.shortAddress}
      </div>
      <div className="mt-2">
        <Row label="Planned maintenance" value="2 Oct, 12am–6am" />
        <Row label="Connection" value={service === "nbn" ? "FTTP · Online" : "4G/5G · Normal"} />
      </div>
    </CardShell>
  );
}

/** Simulated modem-side speed test. Deterministic result so demos and tests are repeatable. */
export function SpeedTestCard() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress >= 100) return;
    const t = setTimeout(() => setProgress((p) => Math.min(100, p + 20)), 280);
    return () => clearTimeout(t);
  }, [progress]);
  const done = progress >= 100;
  const down = done ? 42.8 : Math.round((42.8 * progress) / 100);
  return (
    <CardShell title="Speed test from your modem" icon={<Activity className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-surface-tint p-3">
          <p className="text-xs font-semibold text-ink-soft">Download</p>
          <p className="text-2xl font-extrabold text-ink">
            {down}
            <span className="text-xs font-semibold text-ink-faint"> Mbps</span>
          </p>
        </div>
        <div className="rounded-xl bg-surface-tint p-3">
          <p className="text-xs font-semibold text-ink-soft">Upload</p>
          <p className="text-2xl font-extrabold text-ink">
            {done ? 17.2 : "–"}
            <span className="text-xs font-semibold text-ink-faint"> Mbps</span>
          </p>
        </div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-deep" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Speed test progress">
        <div className="h-full rounded-full bg-agl-gradient transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
        {done ? (
          <>Wi-Fi result is below your plan’s 94 Mbps typical evening speed — likely Wi-Fi interference.</>
        ) : (
          <>
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Testing…
          </>
        )}
      </p>
    </CardShell>
  );
}
