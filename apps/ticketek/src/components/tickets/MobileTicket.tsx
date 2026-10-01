import { Lock } from "lucide-react";
import type { OrderView } from "@/features/fan/orders";
import type { TicketLine } from "@/features/fan/types";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { formatDateTime } from "@/lib/format";

/** Decorative barcode drawn from the ticket's barcode digits — not scannable, by design. */
export function Barcode({ value, locked, className }: { value: string; locked?: boolean; className?: string }) {
  const bars = [...value].flatMap((ch, i) => {
    const n = ch.charCodeAt(0);
    return [(n % 3) + 1, ((n >> 2) % 2) + 1, ((n + i) % 4) + 1];
  });
  return (
    <div className={cn("relative", className)}>
      <div className={cn("flex h-14 items-stretch justify-center gap-px", locked && "opacity-15 blur-[2px]")} aria-hidden>
        {bars.map((w, i) => (
          <span key={i} className={i % 2 === 0 ? "bg-ink" : "bg-transparent"} style={{ width: `${w * 1.5}px` }} />
        ))}
      </div>
      {locked && (
        <p className="absolute inset-0 flex items-center justify-center gap-1.5 text-xs font-semibold text-ink">
          <Lock className="size-3.5" aria-hidden /> Barcode unlocks 48 hours before
        </p>
      )}
      {!locked && <p className="mt-1 text-center font-mono text-[11px] tracking-[0.25em] text-ink-soft">{value}</p>}
    </div>
  );
}

export function MobileTicket({ view, ticket, compact }: { view: OrderView; ticket: TicketLine; compact?: boolean }) {
  const locked = !view.barcodeLive;
  const transferred = view.order.transfers.find((t) => t.seat === ticket.seat);
  const listed = view.order.resale.find((r) => r.seat === ticket.seat && r.status === "listed");
  return (
    <div className="overflow-hidden rounded-tk-lg bg-white text-ink shadow-tk-lift ring-1 ring-line-soft">
      <div className="relative bg-midnight px-4 py-3 text-white">
        <div className="tk-gradient absolute inset-x-0 bottom-0 h-1" aria-hidden />
        <div className="flex items-center justify-between">
          <img src={asset("brand/ticketek-logo-white.svg")} alt="Ticketek" className="h-4 w-auto" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">{ticket.priceType}</span>
        </div>
        <p className={cn("mt-2 font-bold leading-tight", compact ? "text-sm" : "text-base")}>{view.event.name}</p>
        <p className="text-xs text-white/75">
          {formatDateTime(view.performance.startsAt)} · {view.venue.name}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 border-b border-dashed border-line px-4 py-3 text-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Section</p>
          <p className="text-sm font-bold leading-tight">{ticket.section}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Row</p>
          <p className="text-sm font-bold">{ticket.row}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Seat</p>
          <p className="text-sm font-bold">{ticket.seat}</p>
        </div>
      </div>
      <div className="px-4 py-3">
        {transferred ? (
          <p className="py-4 text-center text-sm text-ink-soft">
            Sent to {transferred.toName} · {transferred.status === "pending" ? "waiting for them to accept" : "accepted"}
          </p>
        ) : listed ? (
          <p className="py-4 text-center text-sm text-ink-soft">Listed on Marketplace</p>
        ) : (
          <Barcode value={ticket.barcode} locked={locked} />
        )}
      </div>
    </div>
  );
}
