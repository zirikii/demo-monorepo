import {
  BedDouble,
  CalendarDays,
  ChevronRight,
  Headset,
  History,
  House,
  Plug,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import type { RecordKind } from "@/features/assistant/flows/types";
import { useProperty, type PropertyContextValue } from "@/features/property/PropertyProvider";
import {
  BOOKING_STATUS_LABELS,
  bookingNeedsAction,
  CHANNEL_STATUS_LABELS,
  channelById,
  channelIssue,
  EVENT_CATEGORY_LABELS,
  INVOICE_STATUS_LABELS,
  invoiceTotal,
} from "@/features/property/views";
import { cn } from "@/lib/cn";
import { formatCurrency, formatMonthYear, formatShortDate } from "@/lib/format";
import type { RenderedOption } from "../engine/conversation";

function optionIcon(option: RenderedOption) {
  if (option.next === "handoff") return <Headset className="size-3.5" aria-hidden />;
  if (option.next === "menu" || option.next === "root")
    return <House className="size-3.5" aria-hidden />;
  return null;
}

type TileInfo = { icon: LucideIcon; title: string; detail: string; status: string; alert: boolean };

const KIND_ICON: Record<RecordKind, LucideIcon> = {
  channel: Plug,
  booking: BedDouble,
  invoice: Receipt,
  event: CalendarDays,
  history: History,
};

function tileInfo(kind: RecordKind, id: string, store: PropertyContextValue): TileInfo | null {
  const icon = KIND_ICON[kind];
  switch (kind) {
    case "channel": {
      const c = channelById(store, id);
      return c
        ? {
            icon,
            title: c.name,
            detail: c.issueRoom
              ? `${c.issueRoom} not mapped`
              : `${c.bookings30d} bookings in 30 days`,
            status: CHANNEL_STATUS_LABELS[c.status],
            alert: channelIssue(c),
          }
        : null;
    }
    case "booking": {
      const b = store.bookings.find((x) => x.id === id);
      return b
        ? {
            icon,
            title: b.guest,
            detail: `${b.id} · ${channelById(store, b.channelId)?.name ?? ""} · ${formatShortDate(b.checkIn)}`,
            status: BOOKING_STATUS_LABELS[b.status],
            alert: bookingNeedsAction(b),
          }
        : null;
    }
    case "invoice": {
      const i = store.invoices.find((x) => x.id === id);
      return i
        ? {
            icon,
            title: i.period,
            detail: `${i.id} · ${formatCurrency(invoiceTotal(i))}`,
            status: INVOICE_STATUS_LABELS[i.status],
            alert: i.status === "overdue",
          }
        : null;
    }
    case "event":
    case "history": {
      const e = store.events.find((x) => x.id === id);
      if (!e) return null;
      return kind === "event"
        ? {
            icon,
            title: e.name,
            detail: `${formatShortDate(e.start)} · ${e.onBooksPct ?? 0}% booked`,
            status: e.plan ? "Priced" : EVENT_CATEGORY_LABELS[e.category],
            alert: false,
          }
        : {
            icon,
            title: e.name,
            detail: `${formatMonthYear(e.start)} · ${e.outcome?.occupancyPct ?? 0}% occ · +${e.outcome?.adrUpliftPct ?? 0}% ADR`,
            status: EVENT_CATEGORY_LABELS[e.category],
            alert: false,
          };
    }
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

/** A record-picker choice, shown as the hotelier would recognise it in the platform. */
function RecordTile({
  option,
  onChoose,
  dark,
  delay,
}: {
  option: RenderedOption;
  onChoose: () => void;
  dark: boolean;
  delay: number;
}) {
  const store = useProperty();
  const info =
    option.recordKind && option.recordId
      ? tileInfo(option.recordKind, option.recordId, store)
      : null;
  if (!info) return null;
  const Icon = info.icon;
  return (
    <button
      type="button"
      onClick={onChoose}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "group flex w-full animate-fade-up items-center gap-3 rounded-2xl border p-2.5 text-left transition-all",
        dark
          ? "border-white/15 bg-white/10 text-white hover:bg-white/20"
          : "border-line-soft bg-white hover:-translate-y-px hover:border-royal/40 hover:shadow-card",
      )}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl",
          info.alert
            ? "bg-critical-bg text-critical"
            : dark
              ? "bg-white/10 text-lime"
              : "bg-royal-tint text-royal",
        )}
      >
        <Icon className="size-[18px]" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{info.title}</span>
        <span className={cn("block truncate text-xs", dark ? "text-white/65" : "text-ink-faint")}>
          {info.detail}
        </span>
      </span>
      <span
        className={cn(
          "pill shrink-0 text-[11px]",
          info.alert
            ? "bg-critical-bg text-critical"
            : dark
              ? "bg-white/10 text-white/80"
              : "bg-canvas text-ink-soft",
        )}
      >
        {info.status}
      </span>
      <ChevronRight
        className="size-4 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </button>
  );
}

export function QuickReplies({
  options,
  onChoose,
  tone = "light",
  className,
}: {
  options: RenderedOption[];
  onChoose: (option: RenderedOption) => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (options.length === 0) return null;
  const dark = tone === "dark";
  const records = options.filter((o) => o.recordId);
  const chips = options.filter((o) => !o.recordId);
  return (
    <div role="group" aria-label="Suggested replies" className={cn("space-y-2", className)}>
      {records.length > 0 && (
        <ul className="space-y-2" aria-label="Your records">
          {records.map((o, i) => (
            <li key={o.recordId}>
              <RecordTile option={o} onChoose={() => onChoose(o)} dark={dark} delay={i * 40} />
            </li>
          ))}
        </ul>
      )}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((option, i) => (
            <button
              key={`${option.next}-${option.label}`}
              type="button"
              onClick={() => onChoose(option)}
              style={{ animationDelay: `${(records.length + i) * 40}ms` }}
              className={cn(
                "group inline-flex animate-fade-up items-center gap-1.5 rounded-full border px-3.5 py-2 text-left text-sm font-semibold transition-colors",
                dark
                  ? "border-white/25 bg-white/10 text-white hover:border-white/60 hover:bg-white/20"
                  : "border-royal/25 bg-white text-royal hover:border-royal hover:bg-royal-tint",
              )}
            >
              {optionIcon(option)}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
