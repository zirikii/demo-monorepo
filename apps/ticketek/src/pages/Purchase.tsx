import { Check, CreditCard, Gift, Lock, Minus, Plus, ShieldCheck, Smartphone, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { findPerformance } from "@/data/events";
import type { DeliveryId, PriceCategory, PriceType } from "@/data/types";
import { requireVenue } from "@/data/venues";
import { useFan } from "@/features/fan/FanProvider";
import { DELIVERY } from "@/features/fan/orders";
import type { Order, TicketLine } from "@/features/fan/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { formatCurrency, formatDateTime } from "@/lib/format";
import {
  allocateSeats,
  buildOrder,
  HOLD_MINUTES,
  MAX_TICKETS,
  priceBreakdown,
  ticketCount,
  unitPrice,
  type Selection,
} from "@/lib/purchase";
import { NotFoundPage } from "./NotFound";

const STEPS = ["Tickets", "Delivery", "Payment", "Confirmation"] as const;
type Step = 0 | 1 | 2 | 3;

function Stepper({ step }: { step: Step }) {
  return (
    <ol className="flex items-center gap-2 text-sm" aria-label="Purchase progress">
      {STEPS.map((label, i) => (
        <li key={label} className="flex items-center gap-2" aria-current={i === step ? "step" : undefined}>
          <span
            className={cn(
              "grid size-7 place-items-center rounded-full text-xs font-bold",
              i < step ? "bg-tk-green text-white" : i === step ? "bg-midnight text-white" : "bg-line-soft text-ink-faint",
            )}
          >
            {i < step ? <Check className="size-3.5" aria-hidden /> : i + 1}
          </span>
          <span className={cn("hidden sm:inline", i === step ? "font-semibold" : "text-ink-soft")}>{label}</span>
          {i < STEPS.length - 1 && <span className="h-px w-6 bg-line md:w-10" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

function HoldTimer({ expiresAt, onExpire }: { expiresAt: number; onExpire: () => void }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, expiresAt - now);
  useEffect(() => {
    if (left === 0) onExpire();
  }, [left, onExpire]);
  const mins = Math.floor(left / 60000);
  const secs = Math.floor((left % 60000) / 1000);
  return (
    <div role="timer" aria-live="off" className="bg-tk-yellow text-midnight">
      <div className="container-tk flex items-center gap-2 py-2 text-sm font-semibold">
        <Timer className="size-4" aria-hidden />
        Your tickets are held for {mins}:{String(secs).padStart(2, "0")}
      </div>
    </div>
  );
}

function Qty({ label, price, value, onChange, max }: { label: string; price: number; value: number; onChange: (n: number) => void; max: number }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-ink-soft">{price === 0 ? "Free with a Companion Card" : formatCurrency(price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" aria-label={`Fewer ${label} tickets`} onClick={() => onChange(Math.max(0, value - 1))} disabled={value === 0} className="grid size-8 place-items-center rounded-full border border-line disabled:opacity-40">
          <Minus className="size-4" aria-hidden />
        </button>
        <span className="w-6 text-center font-semibold" aria-live="polite" aria-label={`${value} ${label}`}>
          {value}
        </span>
        <button type="button" aria-label={`More ${label} tickets`} onClick={() => onChange(value + 1)} disabled={value >= max} className="grid size-8 place-items-center rounded-full border border-line disabled:opacity-40">
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function PurchasePage() {
  const { slug = "", perfId = "" } = useParams();
  const found = findPerformance(perfId);
  const event = found?.event;
  const performance = found?.performance;
  useDocumentTitle(event ? `Buy ${event.name} tickets` : "Tickets");
  const navigate = useNavigate();
  const location = useLocation();
  const fan = useFan();

  const available = useMemo(() => event?.priceCategories.filter((c) => c.status !== "exhausted") ?? [], [event]);
  const [step, setStep] = useState<Step>(0);
  const [category, setCategory] = useState<PriceCategory | undefined>(available[0]);
  const [quantities, setQuantities] = useState<Partial<Record<PriceType, number>>>({ Admit: 2 });
  const [held, setHeld] = useState<{ tickets: TicketLine[]; expiresAt: number } | null>(null);
  const [delivery, setDelivery] = useState<DeliveryId>(event?.delivery[0] ?? "mobile");
  const [protect, setProtect] = useState(false);
  const [payment, setPayment] = useState<string>(() => fan.profile.cards.find((c) => c.isDefault)?.id ?? "new");
  const [agree, setAgree] = useState(false);
  const [expired, setExpired] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  if (!event || !performance || event.slug !== slug || !category) return <NotFoundPage />;
  const venue = requireVenue(performance.venueId);
  const selection: Selection = { category, quantities };
  const count = ticketCount(selection);
  const breakdown = priceBreakdown(selection, delivery, protect);
  const signedIn = fan.signedIn;

  const hold = () => {
    setHeld({ tickets: allocateSeats(event, performance.id, selection), expiresAt: Date.now() + HOLD_MINUTES * 60_000 });
    setExpired(false);
    setStep(1);
  };

  const pay = () => {
    if (!held) return;
    const next = buildOrder({ event, perfId: performance.id, tickets: held.tickets, delivery, breakdown, ticketProtect: protect });
    fan.placeOrder(next);
    setOrder(next);
    setHeld(null);
    setStep(3);
  };

  return (
    <>
      {held && step > 0 && step < 3 && <HoldTimer expiresAt={held.expiresAt} onExpire={() => { setHeld(null); setExpired(true); setStep(0); }} />}
      <div className="container-tk py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link to={`/shows/${event.slug}`} className="link text-sm">
            ← Back to {event.name}
          </Link>
          <Stepper step={step} />
        </div>
        {expired && (
          <p role="alert" className="mb-4 rounded-tk bg-critical-bg px-4 py-3 text-sm text-critical">
            Your 10 minutes ran out, so we released those tickets. Choose again to find the best seats left.
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="main-content-box p-5 md:p-6">
            {step === 0 && (
              <section aria-labelledby="choose-tickets">
                <h1 id="choose-tickets" className="text-2xl font-extrabold">
                  Select tickets
                </h1>
                <fieldset className="mt-5">
                  <legend className="mb-2 text-sm font-semibold">Price category</legend>
                  <div className="grid gap-2">
                    {event.priceCategories.map((c) => (
                      <label
                        key={c.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-3 rounded-tk border p-3",
                          c.status === "exhausted" && "cursor-not-allowed opacity-50",
                          category.id === c.id ? "border-midnight ring-1 ring-midnight" : "border-line hover:border-ink-faint",
                        )}
                      >
                        <span className="flex items-start gap-3">
                          <input type="radio" name="category" checked={category.id === c.id} disabled={c.status === "exhausted"} onChange={() => setCategory(c)} className="mt-1 accent-midnight" />
                          <span>
                            <span className="block font-medium">{c.name}</span>
                            {c.description && <span className="block text-sm text-ink-soft">{c.description}</span>}
                            {c.status === "limited" && <span className="text-xs font-semibold text-caution">Limited availability</span>}
                          </span>
                        </span>
                        <span className="font-semibold">{c.status === "exhausted" ? "Sold out" : formatCurrency(c.price)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="mt-6">
                  <legend className="text-sm font-semibold">How many?</legend>
                  <div className="divide-y divide-line-soft">
                    {event.priceTypes.map((t) => (
                      <Qty
                        key={t}
                        label={t}
                        price={unitPrice(category, t)}
                        value={quantities[t] ?? 0}
                        max={MAX_TICKETS - count + (quantities[t] ?? 0)}
                        onChange={(n) => setQuantities((q) => ({ ...q, [t]: n }))}
                      />
                    ))}
                  </div>
                  {(quantities["Companion Card"] ?? 0) > 0 && (
                    <p className="mt-2 text-sm text-ink-soft">Bring your Companion Card to the venue. Each Companion Card ticket needs one paid ticket.</p>
                  )}
                </fieldset>
                <button type="button" disabled={count === 0} onClick={hold} className="btn-tickets mt-6 w-full md:w-auto">
                  Find tickets
                </button>
              </section>
            )}

            {step === 1 && held && (
              <section aria-labelledby="delivery">
                <h1 id="delivery" className="text-2xl font-extrabold">
                  Your seats & delivery
                </h1>
                <div className="mt-4 rounded-tk bg-page p-4">
                  <p className="text-sm font-semibold">We found you {held.tickets.length === 1 ? "this seat" : "these seats"}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {held.tickets.map((t, i) => (
                      <li key={`${t.seat}-${i}`}>
                        {t.section}
                        {t.row !== "GA" ? `, Row ${t.row}, Seat ${t.seat}` : ""} · {t.priceType} · {formatCurrency(t.price)}
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => setStep(0)} className="link mt-2 text-sm">
                    Change tickets
                  </button>
                </div>
                <fieldset className="mt-6">
                  <legend className="mb-2 text-sm font-semibold">Delivery method</legend>
                  <div className="grid gap-2">
                    {event.delivery.map((d) => (
                      <label key={d} className={cn("flex cursor-pointer items-start gap-3 rounded-tk border p-3", delivery === d ? "border-midnight ring-1 ring-midnight" : "border-line")}>
                        <input type="radio" name="delivery" checked={delivery === d} onChange={() => setDelivery(d)} className="mt-1 accent-midnight" />
                        <span className="flex-1">
                          <span className="flex items-center justify-between font-medium">
                            {DELIVERY[d].label}
                            <span className="text-sm">{d === "souvenir" ? formatCurrency(8.5) : "Free"}</span>
                          </span>
                          <span className="block text-sm text-ink-soft">{DELIVERY[d].description}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-tk border border-tk-jacaranda/40 bg-tk-jacaranda/5 p-4">
                  <input type="checkbox" checked={protect} onChange={(e) => setProtect(e.target.checked)} className="mt-1 accent-midnight" />
                  <span>
                    <span className="flex items-center gap-2 font-semibold">
                      <ShieldCheck className="size-4 text-tk-jacaranda" aria-hidden /> Add Ticket Protect for {formatCurrency(priceBreakdown(selection, delivery, true).protect)}
                    </span>
                    <span className="block text-sm text-ink-soft">Get your ticket price back if you can&apos;t attend because of illness, injury, transport breakdown and other covered reasons.</span>
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => (signedIn ? setStep(2) : navigate(`/login?next=${encodeURIComponent(location.pathname)}`))}
                  className="btn-tickets mt-6 w-full md:w-auto"
                >
                  {signedIn ? "Continue to payment" : "Sign in to continue"}
                </button>
              </section>
            )}

            {step === 2 && held && (
              <section aria-labelledby="payment">
                <h1 id="payment" className="text-2xl font-extrabold">
                  Payment
                </h1>
                <fieldset className="mt-5">
                  <legend className="mb-2 text-sm font-semibold">Pay with</legend>
                  <div className="grid gap-2">
                    {fan.profile.cards.map((c) => (
                      <label key={c.id} className={cn("flex cursor-pointer items-center gap-3 rounded-tk border p-3", payment === c.id ? "border-midnight ring-1 ring-midnight" : "border-line")}>
                        <input type="radio" name="payment" checked={payment === c.id} onChange={() => setPayment(c.id)} className="accent-midnight" />
                        <CreditCard className="size-5 text-ink-soft" aria-hidden />
                        <span className="flex-1 font-medium">
                          {c.brand} •••• {c.last4}
                        </span>
                        <span className="text-sm text-ink-soft">Exp {c.expiry}</span>
                      </label>
                    ))}
                    <label className={cn("flex cursor-pointer items-center gap-3 rounded-tk border p-3", payment === "afterpay" ? "border-midnight ring-1 ring-midnight" : "border-line")}>
                      <input type="radio" name="payment" checked={payment === "afterpay"} onChange={() => setPayment("afterpay")} className="accent-midnight" />
                      <Smartphone className="size-5 text-ink-soft" aria-hidden />
                      <span className="flex-1 font-medium">Afterpay — 4 payments of {formatCurrency(breakdown.total / 4)}</span>
                    </label>
                    {fan.profile.giftVouchers.map((v) => (
                      <label key={v.code} className={cn("flex cursor-pointer items-center gap-3 rounded-tk border p-3", payment === v.code ? "border-midnight ring-1 ring-midnight" : "border-line")}>
                        <input type="radio" name="payment" checked={payment === v.code} onChange={() => setPayment(v.code)} className="accent-midnight" />
                        <Gift className="size-5 text-ink-soft" aria-hidden />
                        <span className="flex-1 font-medium">Gift voucher {v.code}</span>
                        <span className="text-sm text-ink-soft">{formatCurrency(v.balance)} + card</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="mt-5 flex items-start gap-3 text-sm">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-midnight" />
                  <span>
                    I agree to the{" "}
                    <Link to="/help/article/purchase-policy" className="link">
                      Ticketek Purchase Policy
                    </Link>{" "}
                    and understand tickets can&apos;t be refunded for a change of mind.
                  </span>
                </label>
                <button type="button" disabled={!agree} onClick={pay} className="btn-tickets mt-6 w-full md:w-auto">
                  <Lock className="size-4" aria-hidden /> Pay {formatCurrency(breakdown.total)}
                </button>
                <p className="mt-2 text-xs text-ink-faint">Demo checkout — no payment is taken.</p>
              </section>
            )}

            {step === 3 && order && (
              <section aria-labelledby="done" className="text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-positive-bg text-positive">
                  <Check className="size-7" aria-hidden />
                </div>
                <h1 id="done" className="mt-4 text-2xl font-extrabold">
                  You&apos;re going to {event.name}!
                </h1>
                <p className="mt-2 text-ink-soft">
                  Order <span className="font-semibold text-ink">{order.id}</span> is confirmed. We&apos;ve emailed your receipt to {fan.profile.email}.
                </p>
                <p className="mt-1 text-sm text-ink-soft">{DELIVERY[order.delivery].description}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Link to={`/account/orders/${order.id}`} className="btn-primary">
                    View my tickets
                  </Link>
                  <Link to="/" className="btn-outline">
                    Keep browsing
                  </Link>
                </div>
              </section>
            )}
          </div>

          <aside aria-label="Order summary" className="main-content-box h-fit overflow-hidden">
            <img src={asset(event.image)} alt="" className="aspect-[105/52] w-full object-cover" />
            <div className="p-5">
              <h2 className="font-bold">{event.name}</h2>
              <p className="text-sm text-ink-soft">{formatDateTime(performance.startsAt)}</p>
              <p className="text-sm text-ink-soft">
                {venue.name}, {venue.city}
              </p>
              {count > 0 && step < 3 && (
                <dl className="mt-4 space-y-1.5 border-t border-line-soft pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt>
                      {count} × {category.name.replace(/ \(.*\)/, "")}
                    </dt>
                    <dd>{formatCurrency(breakdown.tickets)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <dt>Service fees</dt>
                    <dd>{formatCurrency(breakdown.service)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <dt>Handling fee</dt>
                    <dd>{formatCurrency(breakdown.handling)}</dd>
                  </div>
                  {breakdown.delivery > 0 && (
                    <div className="flex justify-between text-ink-soft">
                      <dt>Delivery</dt>
                      <dd>{formatCurrency(breakdown.delivery)}</dd>
                    </div>
                  )}
                  {breakdown.protect > 0 && (
                    <div className="flex justify-between text-ink-soft">
                      <dt>Ticket Protect</dt>
                      <dd>{formatCurrency(breakdown.protect)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-line-soft pt-2 text-base font-bold">
                    <dt>Total</dt>
                    <dd>{formatCurrency(breakdown.total)}</dd>
                  </div>
                </dl>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
