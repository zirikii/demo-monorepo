import { Activity, RadioTower } from "lucide-react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";

export function Header() {
  return (
    <header className="relative overflow-hidden border-b border-noc-line/80 bg-noc-panel/80 backdrop-blur-md">
      <div className="noc-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src="/brand/logo.png"
            alt="Optus"
            className="h-8 w-auto sm:h-10"
            width={180}
            height={40}
          />
          <div className="hidden h-8 w-px bg-noc-line sm:block" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-base font-semibold tracking-tight text-noc-fg sm:text-lg">
                Network Operations
              </h1>
              <DemoRibbon
                label="Unofficial demo"
                className="border-optus/30 bg-noc-elevated text-optus"
              />
            </div>
            <p className="mt-0.5 hidden text-xs text-noc-muted sm:block">
              SNMP automation → RabbitMQ workers → Cursor Cloud Agents at the decision edge
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-noc-muted">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/30 bg-ok/10 px-2.5 py-1 font-medium text-ok">
            <Activity className="h-3.5 w-3.5" aria-hidden />
            NOC live
          </span>
          <span className="hidden items-center gap-1.5 md:inline-flex">
            <RadioTower className="h-3.5 w-3.5 text-optus" aria-hidden />
            AU national fabric
          </span>
        </div>
      </div>
    </header>
  );
}
