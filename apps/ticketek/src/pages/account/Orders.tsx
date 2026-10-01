import { AlertTriangle, ArrowRightLeft, ChevronRight, Headset, RotateCcw, ShieldCheck, Tag } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { MobileTicket } from "@/components/tickets/MobileTicket";
import { StatusPill } from "@/components/tickets/StatusPill";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { orderFacts } from "@/features/assistant/engine/context";
import { TRANSFER_AMOUNTS, validateForm } from "@/features/assistant/engine/forms";
import { useFan } from "@/features/fan/FanProvider";
import { DELIVERY, type OrderView } from "@/features/fan/orders";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { formatCurrency, formatDateTime, formatShortDate } from "@/lib/format";
import { NotFoundPage } from "../NotFound";
import { Panel } from "./AccountLayout";

function OrderRow({ view }: { view: OrderView }) {
  return (
    <li>
      <Link to={`/account/orders/${view.order.id}`} className="flex items-center gap-4 p-3 hover:bg-page">
        <img src={asset(view.event.image)} alt="" className="hidden h-14 w-28 rounded-tk object-cover sm:block" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{view.event.name}</p>
          <p className="text-sm text-ink-soft">
            {formatDateTime(view.performance.startsAt)} · {view.venue.name}
          </p>
          <p className="text-xs text-ink-faint">
            Order {view.order.id} · {view.order.tickets.length} tickets · {DELIVERY[view.order.delivery].short}
          </p>
        </div>
        <StatusPill status={view.status} />
        <ChevronRight className="size-4 text-ink-faint" aria-hidden />
      </Link>
    </li>
  );
}

export function OrdersPage() {
  useDocumentTitle("Order History");
  const { views } = useFan();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = views.filter((v) => (tab === "past" ? v.status === "past" : v.status !== "past"));
  return (
    <Panel title="Order History">
      <div role="tablist" className="mb-3 flex gap-2">
        {(["upcoming", "past"] as const).map((t) => (
          <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize", tab === t ? "border-midnight bg-midnight text-white" : "border-line")}>
            {t}
          </button>
        ))}
      </div>
      {list.length === 0 ? <p className="py-6 text-center text-ink-soft">No {tab} orders.</p> : <ul className="divide-y divide-line-soft">{list.map((v) => <OrderRow key={v.order.id} view={v} />)}</ul>}
    </Panel>
  );
}

function TransferForm({ view, onDone }: { view: OrderView; onDone: (msg: string) => void }) {
  const fan = useFan();
  const [values, setValues] = useState({ friendName: "", friendEmail: "", amount: TRANSFER_AMOUNTS[0] as string });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateForm("transfer-tickets", values, { facts: { ...orderFacts(view, fan.profile), email: fan.profile.email }, vouchers: [] });
    if (!result.ok) return setErrors(result.errors);
    const count = Number(result.facts.transferQuantity);
    fan.transferTickets(view.order.id, view.order.tickets.slice(0, count).map((t) => t.seat), values.friendName, values.friendEmail);
    onDone(`Sent ${result.facts.transferCount} to ${values.friendName}. They'll get an email to accept.`);
  };
  return (
    <form onSubmit={submit} className="mt-3 grid gap-3 rounded-tk bg-page p-4 sm:grid-cols-3">
      {(["friendName", "friendEmail"] as const).map((k) => (
        <div key={k}>
          <label htmlFor={`tf-${k}`} className="mb-1 block text-xs font-semibold">
            {k === "friendName" ? "Friend's name" : "Their Ticketek email"}
          </label>
          <input id={`tf-${k}`} value={values[k]} onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))} className="field" aria-invalid={Boolean(errors[k])} />
          {errors[k] && <p className="mt-1 text-xs text-critical">{errors[k]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="tf-amount" className="mb-1 block text-xs font-semibold">
          How many
        </label>
        <select id="tf-amount" value={values.amount} onChange={(e) => setValues((v) => ({ ...v, amount: e.target.value }))} className="field">
          {TRANSFER_AMOUNTS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-primary sm:col-span-3 sm:w-fit">
        Send tickets
      </button>
    </form>
  );
}

function ResaleForm({ view, onDone }: { view: OrderView; onDone: (msg: string) => void }) {
  const fan = useFan();
  const facts = orderFacts(view, fan.profile);
  const [price, setPrice] = useState(facts.orderFaceValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateForm("resale-price", { price }, { facts, vouchers: [] });
    if (!result.ok) return setError(result.errors.price ?? "Check the price");
    fan.listForResale(view.order.id, view.order.tickets.map((t) => t.seat), Number(result.facts.resaleAmount));
    onDone(`Listed ${view.order.tickets.length} tickets on Marketplace at ${result.facts.resalePrice} each.`);
  };
  return (
    <form onSubmit={submit} className="mt-3 flex flex-wrap items-end gap-3 rounded-tk bg-page p-4">
      <div>
        <label htmlFor="rs-price" className="mb-1 block text-xs font-semibold">
          Price per ticket (max {facts.orderFacePrice})
        </label>
        <input id="rs-price" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} className="field w-40" aria-invalid={Boolean(error)} />
      </div>
      <button type="submit" className="btn-primary">
        List on Marketplace
      </button>
      {error && <p className="w-full text-xs text-critical">{error}</p>}
    </form>
  );
}

export function OrderDetailPage() {
  const { id = "" } = useParams();
  const fan = useFan();
  const { open } = useAssistant();
  const view = fan.views.find((v) => v.order.id === id);
  useDocumentTitle(view ? `Order ${view.order.id}` : "Order");
  const [action, setAction] = useState<"transfer" | "resale" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  if (!view) return <NotFoundPage />;
  const { order } = view;
  const listed = order.resale.some((r) => r.status === "listed");
  const done = (msg: string) => {
    setNotice(msg);
    setAction(null);
  };
  const helpStep = view.status === "cancelled" || view.status === "rescheduled" ? "refunds" : view.status === "event-soon" ? "eventday" : "tickets";

  return (
    <div className="space-y-6">
      <Link to="/account/orders" className="link text-sm">
        ← Order History
      </Link>
      <section className="main-content-box overflow-hidden">
        <div className="grid md:grid-cols-[280px_1fr]">
          <img src={asset(view.event.image)} alt="" className="h-full min-h-40 w-full object-cover" />
          <div className="p-5 md:p-6">
            <StatusPill status={view.status} />
            <h2 className="mt-2 text-2xl font-extrabold">{view.event.name}</h2>
            <p className="text-ink-soft">
              {formatDateTime(view.performance.startsAt)} · {view.venue.name}, {view.venue.city}
            </p>
            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-ink-faint">Order number</dt>
                <dd className="font-semibold">{order.id}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Seats</dt>
                <dd className="font-semibold">{view.seatsLabel}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Delivery</dt>
                <dd className="font-semibold">{DELIVERY[order.delivery].label}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Total paid</dt>
                <dd className="font-semibold">
                  {formatCurrency(order.total)}
                  {order.ticketProtect && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-tk-jacaranda">
                      <ShieldCheck className="size-3.5" aria-hidden /> Ticket Protect
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {view.status === "cancelled" && (
          <p className="flex items-start gap-2 border-t border-line-soft bg-critical-bg px-5 py-3 text-sm text-critical">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
            This event was cancelled. {order.refund ? `Your refund of ${formatCurrency(order.refund.amount)} is ${order.refund.status}.` : "You'll be refunded automatically, including fees."}
          </p>
        )}
        {view.status === "rescheduled" && view.performance.originalStartsAt && (
          <p className="flex items-start gap-2 border-t border-line-soft bg-tk-blue-tint px-5 py-3 text-sm text-tk-blue">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
            Moved from {formatDateTime(view.performance.originalStartsAt)}. Your tickets are valid for the new date
            {view.refundDeadline ? `, or request a refund by ${formatShortDate(view.refundDeadline)}` : ""}.
          </p>
        )}
        {view.status === "refunded" && order.refund && (
          <p className="border-t border-line-soft bg-page px-5 py-3 text-sm text-ink-soft">
            Refund of {formatCurrency(order.refund.amount)} {order.refund.status === "processing" ? "is processing" : "completed"} (requested {formatShortDate(order.refund.requestedAt)}).
          </p>
        )}
      </section>

      {notice && (
        <p role="status" className="rounded-tk bg-positive-bg px-4 py-3 text-sm text-positive">
          {notice}
        </p>
      )}

      <Panel title="Manage tickets">
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={!view.canTransfer} onClick={() => setAction(action === "transfer" ? null : "transfer")} className="btn-outline">
            <ArrowRightLeft className="size-4" aria-hidden /> Transfer
          </button>
          {listed ? (
            <button type="button" onClick={() => fan.removeListing(order.id)} className="btn-outline">
              <Tag className="size-4" aria-hidden /> Remove Marketplace listing
            </button>
          ) : (
            <button type="button" disabled={!view.canResell} onClick={() => setAction(action === "resale" ? null : "resale")} className="btn-outline">
              <Tag className="size-4" aria-hidden /> Sell on Marketplace
            </button>
          )}
          {view.status === "rescheduled" && !order.refund && (
            <button type="button" onClick={() => fan.requestRefund(order.id, "rescheduled") && done(`Refund of ${formatCurrency(order.total)} requested.`)} className="btn-outline">
              <RotateCcw className="size-4" aria-hidden /> Request refund
            </button>
          )}
          <button type="button" onClick={() => open({ step: helpStep, orderId: order.id, label: `Help with ${view.event.name}` })} className="btn-primary">
            <Headset className="size-4" aria-hidden /> Get help with this order
          </button>
        </div>
        {!view.canTransfer && view.status !== "past" && <p className="mt-2 text-xs text-ink-faint">{view.transferNote}</p>}
        {action === "transfer" && <TransferForm view={view} onDone={done} />}
        {action === "resale" && <ResaleForm view={view} onDone={done} />}
      </Panel>

      {order.delivery === "mobile" && view.status !== "cancelled" && view.status !== "refunded" && (
        <Panel title="Your tickets">
          <p className="-mt-2 mb-4 text-sm text-ink-soft">{orderFacts(view, fan.profile).barcodeLine}</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {order.tickets.map((t, i) => (
              <MobileTicket key={`${t.seat}-${i}`} view={view} ticket={t} />
            ))}
          </div>
        </Panel>
      )}
      {order.delivery !== "mobile" && (
        <Panel title="Ticket delivery">
          <p className="text-sm text-ink-soft">{DELIVERY[order.delivery].description}</p>
        </Panel>
      )}
    </div>
  );
}
