import type { FeedEvent } from "@/data/scenarios";
import { cn } from "@/lib/cn";

type Props = {
  events: FeedEvent[];
};

const levelClass = {
  info: "border-sev-info/30 text-sev-info",
  ok: "border-ok/30 text-ok",
  warn: "border-sev-warning/30 text-sev-warning",
  critical: "border-sev-critical/30 text-sev-critical",
} as const;

export function EventFeed({ events }: Props) {
  return (
    <section className="flex h-full min-h-[280px] flex-col rounded-2xl border border-noc-line bg-noc-panel/90 p-4 sm:p-5">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-optus">Live feed</p>
        <h2 className="mt-1 text-lg font-semibold">Pipeline telemetry</h2>
      </div>

      <div className="flex-1 space-y-2 overflow-auto pr-1">
        {events.length === 0 ? (
          <p className="rounded-xl border border-dashed border-noc-line bg-noc-elevated/30 px-3 py-6 text-center text-sm text-noc-muted">
            Run a scenario to watch SNMP → filter → RabbitMQ → remediation unfold.
          </p>
        ) : (
          events.map((event) => (
            <article
              key={event.id}
              className="animate-rise rounded-xl border border-noc-line bg-noc-elevated/40 px-3 py-2.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide",
                    levelClass[event.level],
                  )}
                >
                  {event.stage}
                </span>
                <time className="font-mono text-[10px] text-noc-muted">
                  {new Date(event.at).toLocaleTimeString()}
                </time>
              </div>
              <p className="mt-1.5 text-sm text-noc-fg">{event.message}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
