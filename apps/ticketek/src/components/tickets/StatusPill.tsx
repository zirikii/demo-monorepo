import { STATUS_LABELS } from "@/features/fan/orders";
import type { OrderStatus } from "@/features/fan/types";
import { cn } from "@/lib/cn";

const STATUS_TONE: Record<OrderStatus, string> = {
  upcoming: "bg-positive-bg text-positive",
  "event-soon": "bg-tk-yellow text-midnight",
  cancelled: "bg-critical-bg text-critical",
  rescheduled: "bg-tk-blue-tint text-tk-blue",
  refunded: "bg-line-soft text-ink-soft",
  past: "bg-line-soft text-ink-soft",
};

export function StatusPill({ status }: { status: OrderStatus }) {
  return <span className={cn("inline-block rounded-full px-2 py-0.5 text-xs font-semibold", STATUS_TONE[status])}>{STATUS_LABELS[status]}</span>;
}
