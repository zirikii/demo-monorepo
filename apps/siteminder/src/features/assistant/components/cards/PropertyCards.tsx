import { BedDouble, Check, CircleCheck, Plug, Scale, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useProperty } from "@/features/property/PropertyProvider";
import type { BookingStatus, ChannelStatus, PlanId } from "@/features/property/types";
import { channelById, parityRows, PLANS } from "@/features/property/views";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";
import type { TemplateValues } from "../../flows";
import { CardShell, Row, StatusPill } from "./CardShell";

const CHANNEL_TONE: Record<ChannelStatus, "positive" | "critical" | "caution"> = { connected: "positive", "mapping-error": "critical", "auth-failed": "critical", paused: "caution" };
const BOOKING_TONE: Record<BookingStatus, "positive" | "critical" | "caution" | "neutral"> = {
  confirmed: "positive",
  modified: "neutral",
  cancelled: "neutral",
  "missing-in-pms": "caution",
  "card-declined": "caution",
  overbooked: "critical",
};

function asChannelStatus(value: string | undefined): ChannelStatus {
  return value === "mapping-error" || value === "auth-failed" || value === "paused" ? value : "connected";
}

function asBookingStatus(value: string | undefined): BookingStatus {
  const all: BookingStatus[] = ["confirmed", "modified", "cancelled", "missing-in-pms", "card-declined", "overbooked"];
  return all.find((s) => s === value) ?? "confirmed";
}

export function ChannelCard({ values }: { values: TemplateValues }) {
  const store = useProperty();
  const channel = values.channelId ? channelById(store, values.channelId) : undefined;
  const status = asChannelStatus(values.channelStatus);
  return (
    <CardShell title={values.channelName} icon={<Plug className="size-4 text-royal" aria-hidden />} aside={<StatusPill tone={CHANNEL_TONE[status]}>{values.channelStatusLabel}</StatusPill>}>
      <Row label="Last successful sync" value={values.channelLastSync} />
      {status === "mapping-error" && <Row label="Unmapped room" value={values.channelIssueRoom} />}
      {channel && (
        <>
          <Row label="Bookings · 30 days" value={channel.bookings30d} />
          <Row label="Revenue · 30 days" value={formatCurrency(channel.revenue30d)} />
          <Row label="Commission" value={`${channel.commissionPct}%`} />
        </>
      )}
      {status !== "connected" && (
        <p className="mt-2 rounded-xl bg-critical-bg px-3 py-2 text-xs text-critical">
          {status === "paused" ? "Not receiving availability or sending bookings." : "Rates and availability aren't reaching this channel."}
        </p>
      )}
    </CardShell>
  );
}

const SYNC_ITEMS = ["Availability", "Rates", "Restrictions", "Booking delivery"];

export function SyncTestCard({ values, live }: { values: TemplateValues; live: boolean }) {
  const [done, setDone] = useState(live ? 0 : SYNC_ITEMS.length);
  useEffect(() => {
    if (done >= SYNC_ITEMS.length) return;
    const t = setTimeout(() => setDone((d) => d + 1), 450);
    return () => clearTimeout(t);
  }, [done]);
  return (
    <CardShell title={`Live sync test · ${values.channelName}`} icon={<Plug className="size-4 text-royal" aria-hidden />}>
      <ul className="space-y-2">
        {SYNC_ITEMS.map((item, i) => (
          <li key={item} className="flex items-center justify-between text-xs">
            <span className="text-heading">{item}</span>
            {i < done ? (
              <span className="inline-flex items-center gap-1 font-semibold text-positive">
                <CircleCheck className="size-3.5" aria-hidden /> Delivered in {(0.6 + i * 0.4).toFixed(1)}s
              </span>
            ) : (
              <span className="text-ink-faint">Testing…</span>
            )}
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

export function BookingCard({ values }: { values: TemplateValues }) {
  const status = asBookingStatus(values.bookingStatus);
  return (
    <CardShell title={values.bookingGuest} icon={<BedDouble className="size-4 text-royal" aria-hidden />} aside={<StatusPill tone={BOOKING_TONE[status]}>{values.bookingStatusLabel}</StatusPill>}>
      <p className="-mt-2 mb-2 font-mono text-[11px] text-ink-faint">{values.bookingId}</p>
      <Row label="Room" value={values.bookingRoom} />
      <Row label="Arrival" value={`${values.bookingCheckIn} · ${values.bookingNights}`} />
      <Row label="Channel" value={values.bookingChannel} />
      <Row label="Total" value={values.bookingTotal} strong />
      {status === "modified" && <p className="mt-2 rounded-xl bg-royal-tint px-3 py-2 text-xs text-royal">{values.bookingChange}</p>}
    </CardShell>
  );
}

export function ParityCard() {
  const store = useProperty();
  const { room, rows } = parityRows(store);
  const direct = rows.find((r) => r.channelId === "direct");
  return (
    <CardShell title={`Tonight · ${room}`} icon={<Scale className="size-4 text-royal" aria-hidden />}>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.channelId} className="flex items-center gap-3 text-xs">
            <span className="w-32 truncate font-medium text-heading">{r.name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas">
              <span className={cn("block h-full rounded-full", r.diffPct < 0 ? "bg-caution" : "bg-royal")} style={{ width: `${(r.rate / Math.max(1, direct?.rate ?? r.rate)) * 100}%` }} />
            </span>
            <span className={cn("w-14 text-right font-semibold tabular-nums", r.diffPct < 0 ? "text-caution" : "text-heading")}>{formatCurrency(r.rate)}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-3 space-y-0.5 text-[11px] text-ink-faint">
        {rows
          .filter((r) => r.diffPct < 0)
          .map((r) => (
            <li key={r.channelId}>
              {r.name}: {r.note} ({r.diffPct}%)
            </li>
          ))}
      </ul>
    </CardShell>
  );
}

const PLAN_POINTS: Record<PlanId, string[]> = {
  siteminder: ["Channel manager", "PMS integration", "SiteMinder Pay", "Insights"],
  plus: ["Everything in SiteMinder", "Booking engine & website", "Competitor rates", "Demand Plus"],
  groups: ["Multi-property control", "Enterprise reporting", "Dedicated account team", "Custom onboarding"],
};

export function PlanCompareCard() {
  const { property } = useProperty();
  return (
    <CardShell title="Compare plans" icon={<Sparkles className="size-4 text-royal" aria-hidden />}>
      <div className="grid gap-2">
        {(Object.keys(PLANS) as PlanId[]).map((id) => {
          const plan = PLANS[id];
          const current = id === property.plan;
          return (
            <div key={id} className={cn("rounded-xl border p-3", current ? "border-royal bg-royal-tint/50" : "border-line-soft")}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-heading">{plan.name}</span>
                <span className="text-xs font-semibold text-ink-soft">{plan.price ? `${formatCurrency(plan.price)}/mo` : "Custom"}</span>
              </div>
              <ul className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-0.5">
                {PLAN_POINTS[id].map((p) => (
                  <li key={p} className="flex items-center gap-1 text-[11px] text-ink-soft">
                    <Check className="size-3 text-royal" aria-hidden /> {p}
                  </li>
                ))}
              </ul>
              {current && <span className="mt-2 inline-block text-[11px] font-semibold text-royal">Your plan</span>}
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}
