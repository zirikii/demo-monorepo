import { Ban, CalendarDays, Layers, Scale } from "lucide-react";
import type { DemandEvent } from "@/features/property/types";
import { useProperty } from "@/features/property/PropertyProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { toLocalIso } from "@/lib/clock";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { AskSupport, PageTitle, Panel } from "./ui";

const DAYS = 14;

function eventOn(events: DemandEvent[], day: string): DemandEvent | undefined {
  return events.find((e) => !e.outcome && e.start.slice(0, 10) <= day && e.end.slice(0, 10) >= day);
}

export function RatesPage() {
  useDocumentTitle("Rates & availability");
  const store = useProperty();
  const { property, events, stopSell, rateLog } = store;
  const today = new Date();
  const days = Array.from({ length: DAYS }, (_, i) => toLocalIso(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)).slice(0, 10));

  const toggleStopSell = (key: string) =>
    store.update((s) => ({ ...s, stopSell: s.stopSell.includes(key) ? s.stopSell.filter((k) => k !== key) : [...s.stopSell, key] }));

  return (
    <div className="mx-auto max-w-7xl">
      <PageTitle
        title="Rates & availability"
        body="Set once here and every connected channel updates in seconds. Click a cell to close or open that room for sale."
        actions={
          <>
            <AskSupport step="rates.bulk" label="Update rates in bulk" className="btn-primary text-white hover:no-underline">
              <Layers className="size-4" aria-hidden /> Bulk update
            </AskSupport>
            <AskSupport step="rates.restrictions" label="Set a minimum stay" className="btn-outline hover:no-underline">
              <Ban className="size-4" aria-hidden /> Restrictions
            </AskSupport>
            <AskSupport step="rates.parity" label="Check rate parity" className="btn-outline hover:no-underline">
              <Scale className="size-4" aria-hidden /> Parity check
            </AskSupport>
          </>
        }
      />
      <Panel className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-sm">
            <thead>
              <tr className="bg-canvas">
                <th className="sticky left-0 z-10 w-48 bg-canvas px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">Room type</th>
                {days.map((d) => {
                  const date = new Date(`${d}T12:00:00`);
                  const weekend = date.getDay() === 5 || date.getDay() === 6;
                  return (
                    <th key={d} className={cn("px-1 py-2 text-center text-xs font-semibold", weekend ? "text-royal" : "text-ink-soft")}>
                      <span className="block">{date.toLocaleDateString("en-AU", { weekday: "short" })}</span>
                      <span className="block text-base text-heading">{date.getDate()}</span>
                    </th>
                  );
                })}
              </tr>
              <tr>
                <th className="sticky left-0 z-10 bg-white px-4 py-2 text-left text-xs font-semibold text-ink-faint">
                  <CalendarDays className="mr-1 inline size-3.5" aria-hidden /> Events
                </th>
                {days.map((d) => {
                  const e = eventOn(events, d);
                  return (
                    <td key={d} className="px-1 py-1.5 text-center">
                      {e && (
                        <span title={e.name} className={cn("block truncate rounded-md px-1 py-0.5 text-[10px] font-semibold", e.plan ? "bg-lime text-stratos" : "bg-lavender text-heading")}>
                          {e.name.split(/[—|-]/)[0]?.trim()}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {property.roomTypes.map((room) => (
                <tr key={room.id}>
                  <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-3 text-left">
                    <span className="block font-semibold text-heading">{room.name}</span>
                    <span className="text-xs font-normal text-ink-faint">
                      {room.rooms} rooms · base {formatCurrency(room.baseRate)}
                    </span>
                  </th>
                  {days.map((d) => {
                    const key = `${room.id}@${d}`;
                    const closed = stopSell.includes(key);
                    const plan = eventOn(events, d)?.plan;
                    const weekend = [5, 6].includes(new Date(`${d}T12:00:00`).getDay());
                    const rate = Math.round(room.baseRate * (1 + (plan?.upliftPct ?? 0) / 100) * (weekend && !plan ? 1.12 : 1));
                    return (
                      <td key={d} className="p-1">
                        <button
                          type="button"
                          onClick={() => toggleStopSell(key)}
                          aria-label={`${room.name} ${d}: ${closed ? "closed" : formatCurrency(rate)}. Toggle stop sell`}
                          className={cn(
                            "w-full rounded-lg px-1 py-2 text-center text-xs font-semibold tabular-nums transition-colors",
                            closed ? "bg-critical-bg text-critical" : plan ? "bg-lime/50 text-stratos hover:bg-lime" : "bg-canvas text-heading hover:bg-royal-tint",
                          )}
                        >
                          {closed ? "Closed" : `$${rate}`}
                          {plan && !closed && <span className="block text-[10px] font-medium">{plan.minStay}N min</span>}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Legend">
          <ul className="space-y-2 text-sm text-ink-soft">
            <li className="flex items-center gap-2">
              <span className="size-4 rounded bg-canvas" /> Standard rate (weekends +12%)
            </li>
            <li className="flex items-center gap-2">
              <span className="size-4 rounded bg-lime/60" /> Event pricing applied
            </li>
            <li className="flex items-center gap-2">
              <span className="size-4 rounded bg-lavender" /> Event without pricing yet
            </li>
            <li className="flex items-center gap-2">
              <span className="size-4 rounded bg-critical-bg" /> Stop sell on every channel
            </li>
          </ul>
        </Panel>
        <Panel title="Recent changes">
          <ul className="divide-y divide-line-soft text-sm">
            {rateLog.slice(0, 8).map((r) => (
              <li key={r.id} className="py-2.5">
                <p className="text-heading">{r.summary}</p>
                <p className="text-xs text-ink-faint">{formatDateTime(r.at)}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
