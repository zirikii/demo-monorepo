import { Headphones } from "lucide-react";
import type { ReactNode } from "react";
import { useAssistant, type OpenOptions } from "@/features/assistant/AssistantProvider";
import type { BookingStatus, ChannelStatus, InvoiceStatus } from "@/features/property/types";
import { BOOKING_STATUS_LABELS, CHANNEL_STATUS_LABELS, INVOICE_STATUS_LABELS } from "@/features/property/views";
import { cn } from "@/lib/cn";

export function PageTitle({ title, body, actions }: { title: string; body?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {body && <p className="mt-1 text-ink-soft">{body}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("card p-5", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, tone = "default" }: { label: string; value: string; hint?: string; tone?: "default" | "positive" | "critical" }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-ink-faint">{label}</p>
      <p className="mt-1 text-2xl font-bold text-heading">{value}</p>
      {hint && <p className={cn("mt-1 text-xs", tone === "positive" ? "text-positive" : tone === "critical" ? "text-critical" : "text-ink-faint")}>{hint}</p>}
    </div>
  );
}

type Tone = "positive" | "critical" | "caution" | "neutral" | "info";

const TONE_CLASS: Record<Tone, string> = {
  positive: "bg-positive-bg text-positive",
  critical: "bg-critical-bg text-critical",
  caution: "bg-caution-bg text-caution",
  neutral: "bg-canvas text-ink-soft",
  info: "bg-royal-tint text-royal",
};

export function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={cn("pill", TONE_CLASS[tone])}>{children}</span>;
}

const CHANNEL_TONE: Record<ChannelStatus, Tone> = { connected: "positive", "mapping-error": "critical", "auth-failed": "critical", paused: "caution" };
const BOOKING_TONE: Record<BookingStatus, Tone> = {
  confirmed: "positive",
  modified: "info",
  cancelled: "neutral",
  "missing-in-pms": "caution",
  "card-declined": "caution",
  overbooked: "critical",
};
const INVOICE_TONE: Record<InvoiceStatus, Tone> = { paid: "positive", open: "info", overdue: "critical", extended: "caution", instalments: "caution" };

export function ChannelBadge({ status }: { status: ChannelStatus }) {
  return <Badge tone={CHANNEL_TONE[status]}>{CHANNEL_STATUS_LABELS[status]}</Badge>;
}

export function BookingBadge({ status }: { status: BookingStatus }) {
  return <Badge tone={BOOKING_TONE[status]}>{BOOKING_STATUS_LABELS[status]}</Badge>;
}

export function InvoiceBadge({ status }: { status: InvoiceStatus }) {
  return <Badge tone={INVOICE_TONE[status]}>{INVOICE_STATUS_LABELS[status]}</Badge>;
}

/** Opens SiteMinder Support on a step, optionally already holding a record (channel, booking, invoice, event). */
export function AskSupport({ children = "Ask Support", className, ...opts }: OpenOptions & { children?: ReactNode; className?: string }) {
  const { open } = useAssistant();
  return (
    <button type="button" onClick={() => open(opts)} className={cn("inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:underline", className)}>
      <Headphones className="size-4" aria-hidden />
      {children}
    </button>
  );
}
