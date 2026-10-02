import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useProperty } from "@/features/property/PropertyProvider";
import { bookingNeedsAction, channelById, daysUntil } from "@/features/property/views";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { formatCurrency, formatShortDate } from "@/lib/format";
import { AskSupport, BookingBadge, PageTitle, Panel } from "./ui";

type Tab = "all" | "attention" | "arrivals" | "cancelled";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "attention", label: "Needs attention" },
  { id: "arrivals", label: "Arriving this week" },
  { id: "cancelled", label: "Cancelled" },
];

export function ReservationsPage() {
  useDocumentTitle("Reservations");
  const store = useProperty();
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const now = new Date();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return store.bookings
      .filter((b) => {
        switch (tab) {
          case "all":
            return true;
          case "attention":
            return bookingNeedsAction(b);
          case "arrivals": {
            const d = daysUntil(b.checkIn, now);
            return d >= 0 && d <= 7 && b.status !== "cancelled";
          }
          case "cancelled":
            return b.status === "cancelled";
          default: {
            const exhaustive: never = tab;
            return exhaustive;
          }
        }
      })
      .filter((b) => !q || `${b.id} ${b.guest} ${b.room}`.toLowerCase().includes(q))
      .sort(
        (a, b) =>
          Number(bookingNeedsAction(b)) - Number(bookingNeedsAction(a)) ||
          a.checkIn.localeCompare(b.checkIn),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `now` only moves the arrivals window by the day
  }, [store.bookings, tab, query]);

  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle
        title="Reservations"
        body="Bookings from every channel, delivered straight to your PMS."
      />
      <Panel>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div
            role="tablist"
            aria-label="Filter bookings"
            className="flex flex-wrap gap-1 rounded-full bg-canvas p-1"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-semibold",
                  tab === t.id
                    ? "bg-white text-heading shadow-card"
                    : "text-ink-soft hover:text-heading",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <label className="relative ml-auto w-full max-w-xs">
            <span className="sr-only">Search bookings</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
              aria-hidden
            />
            <input
              className="field pl-9"
              placeholder="Guest, reference or room"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="pb-3 font-semibold">Reference</th>
                <th className="pb-3 font-semibold">Guest</th>
                <th className="pb-3 font-semibold">Stay</th>
                <th className="pb-3 font-semibold">Channel</th>
                <th className="pb-3 text-right font-semibold">Total</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {rows.map((b) => (
                <tr key={b.id}>
                  <td className="py-3 pr-4 font-mono text-xs text-ink-soft">{b.id}</td>
                  <td className="py-3 pr-4">
                    <span className="block font-semibold text-heading">{b.guest}</span>
                    <span className="text-xs text-ink-faint">
                      {b.room} · {b.guests} guest{b.guests > 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-ink-soft">
                    {formatShortDate(b.checkIn)} · {b.nights} night{b.nights > 1 ? "s" : ""}
                  </td>
                  <td className="py-3 pr-4 text-ink-soft">
                    {channelById(store, b.channelId)?.name ?? b.channelId}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">{formatCurrency(b.total)}</td>
                  <td className="py-3 pr-4">
                    <BookingBadge status={b.status} />
                    {b.change && (
                      <span className="mt-1 block max-w-48 text-xs text-ink-faint">{b.change}</span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <AskSupport
                      step={
                        bookingNeedsAction(b) || b.status === "cancelled"
                          ? "reservations"
                          : "reservations.lookup"
                      }
                      recordId={b.id}
                      label={`Help with booking ${b.id}`}
                    >
                      {bookingNeedsAction(b) ? "Resolve" : "Ask"}
                    </AskSupport>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-ink-faint">
                    No bookings match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
