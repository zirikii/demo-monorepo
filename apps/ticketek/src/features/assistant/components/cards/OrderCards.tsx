import { ArrowRight, Backpack, CalendarClock, Clock, DoorOpen, MapPin, RotateCcw, ShieldCheck, TrainFront } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileTicket } from "@/components/tickets/MobileTicket";
import { StatusPill } from "@/components/tickets/StatusPill";
import { useFan } from "@/features/fan/FanProvider";
import { DELIVERY, type OrderView } from "@/features/fan/orders";
import { asset } from "@/lib/asset";
import { formatCurrency, formatDateTime, formatShortDate } from "@/lib/format";
import type { TemplateValues } from "../../flows";
import { CardShell, Row } from "./CardShell";

function useOrderView(values: TemplateValues): OrderView | undefined {
  const { views } = useFan();
  return views.find((v) => v.order.id === values.orderId);
}

function OrderHeader({ view }: { view: OrderView }) {
  return (
    <div className="-mx-4 -mt-4 mb-3 overflow-hidden rounded-t-tk-xl">
      <div className="relative">
        <img src={asset(view.event.image)} alt="" className="h-24 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/30 to-transparent" />
        <div className="absolute inset-x-3 bottom-2 text-white">
          <p className="truncate font-bold leading-tight">{view.event.name}</p>
          <p className="truncate text-xs text-white/80">
            {formatDateTime(view.performance.startsAt)} · {view.venue.name}
          </p>
        </div>
      </div>
      <div className="tk-gradient h-1" aria-hidden />
    </div>
  );
}

export function OrderCard({ values }: { values: TemplateValues }) {
  const view = useOrderView(values);
  if (!view) return null;
  return (
    <CardShell>
      <OrderHeader view={view} />
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-ink-faint">Order {view.order.id}</span>
        <StatusPill status={view.status} />
      </div>
      <Row label="Seats" value={view.seatsLabel} />
      <Row label="Delivery" value={DELIVERY[view.order.delivery].short} />
      <Row label="Total" value={formatCurrency(view.order.total)} />
      <Link to={`/account/orders/${view.order.id}`} className="link mt-2 inline-flex items-center gap-1 text-xs font-semibold">
        Open in My Account <ArrowRight className="size-3" aria-hidden />
      </Link>
    </CardShell>
  );
}

export function MobileTicketCard({ values }: { values: TemplateValues }) {
  const view = useOrderView(values);
  const first = view?.order.tickets[0];
  if (!view || !first) return null;
  return (
    <div className="animate-fade-up space-y-2">
      <MobileTicket view={view} ticket={first} compact />
      {view.order.tickets.length > 1 && (
        <p className="text-center text-xs text-ink-faint">
          + {view.order.tickets.length - 1} more in the Ticketek app · <Link to={`/account/orders/${view.order.id}`} className="link">View all</Link>
        </p>
      )}
    </div>
  );
}

export function RefundCard({ values, mode }: { values: TemplateValues; mode: "auto" | "requested" }) {
  const view = useOrderView(values);
  const refund = view?.order.refund;
  const amount = refund ? formatCurrency(refund.amount) : (values.orderTotal ?? "");
  return (
    <CardShell tone="success" title={mode === "auto" ? "Automatic refund" : "Refund requested"} icon={<RotateCcw className="size-4 text-positive" aria-hidden />}>
      {view && <p className="mb-2 font-semibold">{view.event.name}</p>}
      <Row label="Amount" value={amount} strong />
      <Row label="Back to" value={values.cardLabel} />
      <Row label="Status" value={refund?.status === "refunded" ? "Refunded" : "Processing"} />
      <p className="mt-2 text-xs text-ink-soft">
        {mode === "auto" ? "Ticketek refunds cancelled events automatically, including booking fees." : "Refunds usually reach your account within 5–10 business days."}
        {view?.order.ticketProtect && (
          <span className="mt-1 flex items-center gap-1 text-tk-jacaranda">
            <ShieldCheck className="size-3.5" aria-hidden /> Covered by Ticket Protect
          </span>
        )}
      </p>
    </CardShell>
  );
}

export function RescheduleCard({ values }: { values: TemplateValues }) {
  const view = useOrderView(values);
  if (!view) return null;
  return (
    <CardShell title="New date" icon={<CalendarClock className="size-4 text-tk-blue" aria-hidden />}>
      <p className="mb-2 font-semibold">{view.event.name}</p>
      <div className="flex items-center gap-2 rounded-tk bg-page p-2.5 text-xs">
        <span className="text-ink-faint line-through">{view.performance.originalStartsAt ? formatDateTime(view.performance.originalStartsAt) : "Original date"}</span>
        <ArrowRight className="size-3.5 shrink-0 text-tk-blue" aria-hidden />
        <span className="font-bold text-ink">{formatDateTime(view.performance.startsAt)}</span>
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        Your seats carry over automatically.{" "}
        {view.refundDeadline ? `Refunds are available until ${formatShortDate(view.refundDeadline)}.` : ""}
      </p>
    </CardShell>
  );
}

export function EventDayCard({ values }: { values: TemplateValues }) {
  const view = useOrderView(values);
  if (!view) return null;
  const items = [
    { Icon: DoorOpen, label: "Gates open", value: values.gatesOpen },
    { Icon: Clock, label: "Starts", value: formatDateTime(view.performance.startsAt) },
    { Icon: TrainFront, label: "Getting there", value: view.venue.transport },
    { Icon: Backpack, label: "Bags", value: view.venue.bagPolicy },
  ];
  return (
    <CardShell>
      <OrderHeader view={view} />
      <ul className="space-y-2">
        {items.map(({ Icon, label, value }) => (
          <li key={label} className="flex gap-2.5">
            <Icon className="mt-0.5 size-4 shrink-0 text-tk-jacaranda" aria-hidden />
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{label}</span>
              <span className="text-ink">{value}</span>
            </span>
          </li>
        ))}
      </ul>
      <Link to={`/venues/${view.venue.id}`} className="link mt-3 inline-flex items-center gap-1 text-xs font-semibold">
        <MapPin className="size-3" aria-hidden /> {view.venue.name} venue guide
      </Link>
    </CardShell>
  );
}
