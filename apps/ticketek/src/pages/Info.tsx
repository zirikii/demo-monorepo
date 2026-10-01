import { Accessibility, Building2, Check, Gift, Headset, Mail, Phone, Search, ShoppingCart, Smartphone, Ticket, Users } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { REGIONS } from "@/data/nav";
import type { RegionId } from "@/data/types";
import { venues } from "@/data/venues";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { validateForm } from "@/features/assistant/engine/forms";
import { useFan } from "@/features/fan/FanProvider";
import { DELIVERY, STATUS_LABELS, describeOrder } from "@/features/fan/orders";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";

export function InfoHero({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-midnight text-white">
      <div className="tk-gradient absolute -right-24 -top-24 size-80 rounded-full opacity-30 blur-3xl" aria-hidden />
      <div className="container-tk relative py-10 md:py-14">
        <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-white/80">{intro}</p>
        {children}
      </div>
    </section>
  );
}

function HelpCta({ step, label }: { step: string; label: string }) {
  const { open } = useAssistant();
  return (
    <button type="button" onClick={() => open({ step, label })} className="btn-primary">
      <Headset className="size-4" aria-hidden /> {label}
    </button>
  );
}

export function WheresMyTicketPage() {
  useDocumentTitle("Where's My Ticket");
  const fan = useFan();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState(fan.signedIn ? fan.profile.email : "");
  const [result, setResult] = useState<string | null>(null);

  const lookup = (e: FormEvent) => {
    e.preventDefault();
    const id = orderId.trim().toUpperCase();
    const view = fan.views.find((v) => v.order.id === id);
    if (!view || email.trim().toLowerCase() !== fan.profile.email.toLowerCase()) {
      setResult("We couldn't find an order with those details. Check the order number in your confirmation email.");
      return;
    }
    setResult(`${describeOrder(view)}. Status: ${STATUS_LABELS[view.status]}. ${DELIVERY[view.order.delivery].description}`);
  };

  return (
    <>
      <InfoHero title="Where's My Ticket?" intro="How and when your tickets arrive depends on the delivery method you chose when you bought them." />
      <div className="container-tk -mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {(Object.keys(DELIVERY) as (keyof typeof DELIVERY)[]).map((d) => (
            <div key={d} className="main-content-box p-5">
              {d === "mobile" ? <Smartphone className="size-6 text-tk-jacaranda" aria-hidden /> : d === "ezyticket" ? <Mail className="size-6 text-tk-jacaranda" aria-hidden /> : <Ticket className="size-6 text-tk-jacaranda" aria-hidden />}
              <h2 className="mt-3 font-bold">{DELIVERY[d].label}</h2>
              <p className="mt-1 text-sm text-ink-soft">{DELIVERY[d].description}</p>
            </div>
          ))}
        </div>
        <div className="main-content-box h-fit p-5">
          <h2 className="font-bold">Find an order</h2>
          <form onSubmit={lookup} className="mt-3 space-y-3">
            <div>
              <label htmlFor="wmt-order" className="mb-1 block text-sm font-semibold">
                Order number
              </label>
              <input id="wmt-order" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. TK41882950" required className="field" />
            </div>
            <div>
              <label htmlFor="wmt-email" className="mb-1 block text-sm font-semibold">
                Email used to buy
              </label>
              <input id="wmt-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="field" />
            </div>
            <button type="submit" className="btn-primary w-full">
              <Search className="size-4" aria-hidden /> Find my tickets
            </button>
          </form>
          {result && (
            <p role="status" className="mt-4 rounded-tk bg-page p-3 text-sm">
              {result}
            </p>
          )}
          <div className="mt-5 border-t border-line-soft pt-4">
            <p className="mb-2 text-sm text-ink-soft">Still stuck? Support can resend tickets or check delivery for you.</p>
            <HelpCta step="tickets" label="Ask Ticketek Support" />
          </div>
        </div>
      </div>
    </>
  );
}

const VOUCHER_AMOUNTS = [50, 100, 150, 250];

export function GiftVouchersPage() {
  useDocumentTitle("Gift Vouchers");
  const fan = useFan();
  const [amount, setAmount] = useState(100);
  const [recipient, setRecipient] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [balance, setBalance] = useState<string | null>(null);

  const check = (e: FormEvent) => {
    e.preventDefault();
    const result = validateForm("voucher-balance", { code }, { facts: {}, vouchers: fan.profile.giftVouchers });
    setBalance(result.ok ? `${result.facts.voucherCode} has ${result.facts.voucherBalance} to spend.` : (Object.values(result.errors)[0] ?? "Check the code"));
  };

  return (
    <>
      <InfoHero title="Ticketek Gift Vouchers" intro="The gift of live entertainment. Use it on any event at Ticketek, online or at the box office, for three years." />
      <div className="container-tk -mt-6 grid gap-6 lg:grid-cols-2">
        <div className="main-content-box p-6">
          <Gift className="size-6 text-tk-pink" aria-hidden />
          <h2 className="mt-2 text-xl font-bold">Buy a gift voucher</h2>
          {sent ? (
            <p role="status" className="mt-4 flex items-center gap-2 rounded-tk bg-positive-bg p-3 text-sm text-positive">
              <Check className="size-4" aria-hidden /> A {formatCurrency(amount)} voucher is on its way to {recipient}.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-4 space-y-4"
            >
              <fieldset>
                <legend className="mb-2 text-sm font-semibold">Amount</legend>
                <div className="flex flex-wrap gap-2">
                  {VOUCHER_AMOUNTS.map((a) => (
                    <button key={a} type="button" aria-pressed={amount === a} onClick={() => setAmount(a)} className={cn("rounded-tk border px-4 py-2 text-sm font-semibold", amount === a ? "border-midnight bg-midnight text-white" : "border-line")}>
                      {formatCurrency(a)}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="gv-to" className="mb-1 block text-sm font-semibold">
                  Recipient&apos;s email
                </label>
                <input id="gv-to" type="email" required value={recipient} onChange={(e) => setRecipient(e.target.value)} className="field" />
              </div>
              <button type="submit" className="btn-tickets">
                Buy {formatCurrency(amount)} voucher
              </button>
            </form>
          )}
        </div>
        <div className="main-content-box p-6">
          <h2 className="text-xl font-bold">Check your balance</h2>
          <form onSubmit={check} className="mt-4 flex gap-2">
            <label htmlFor="gv-code" className="sr-only">
              Voucher code
            </label>
            <input id="gv-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="GV-XXXX-XXXX" className="field" />
            <button type="submit" className="btn-primary shrink-0">
              Check
            </button>
          </form>
          {balance && (
            <p role="status" className="mt-3 text-sm">
              {balance}
            </p>
          )}
          {fan.signedIn && fan.profile.giftVouchers.length > 0 && (
            <p className="mt-4 text-sm text-ink-soft">
              Your saved voucher: {fan.profile.giftVouchers[0]!.code} ({formatCurrency(fan.profile.giftVouchers[0]!.balance)})
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export function AgenciesPage() {
  useDocumentTitle("Agencies");
  const [region, setRegion] = useState<RegionId>("national");
  const list = venues.filter((v) => region === "national" || v.state === region);
  return (
    <>
      <InfoHero title="Ticketek Agencies & Box Offices" intro="Prefer to buy in person? Venue box offices sell Ticketek tickets for their own events, and most open 90 minutes before showtime." />
      <div className="container-tk -mt-6">
        <div className="main-content-box p-5">
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold">State</span>
            <select value={region} onChange={(e) => setRegion(e.target.value as RegionId)} className="field w-auto py-1.5">
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <ul className="mt-4 divide-y divide-line-soft">
            {list.map((v) => (
              <li key={v.id} className="flex items-start gap-3 py-3">
                <Building2 className="mt-0.5 size-5 shrink-0 text-ink-faint" aria-hidden />
                <div>
                  <Link to={`/venues/${v.id}`} className="font-semibold text-tk-blue hover:underline">
                    {v.name} box office
                  </Link>
                  <p className="text-sm text-ink-soft">{v.address}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export function GroupsPage() {
  useDocumentTitle("Group Bookings");
  const [values, setValues] = useState({ event: "", size: "", date: "" });
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateForm("group-enquiry", values, { facts: {}, vouchers: [] });
    setStatus(result.ok ? { ok: true, text: `Thanks! Your enquiry ${result.facts.requestRef} is with the Groups team. They reply within two business days.` } : { ok: false, text: Object.values(result.errors).join(" ") });
  };
  return (
    <>
      <InfoHero title="Group Bookings" intro="Bringing 10 or more? Get group pricing, seats together and a dedicated coordinator for selected shows, schools and corporate events." />
      <div className="container-tk -mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="main-content-box space-y-3 p-6 text-ink-soft">
          <Users className="size-6 text-tk-jacaranda" aria-hidden />
          <h2 className="text-xl font-bold text-ink">Why book as a group?</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>Discounted group pricing on selected theatre, family and sport events</li>
            <li>Seats together, held while you collect payments</li>
            <li>Teacher tickets and invoicing for school groups</li>
            <li>Hospitality packages for corporate groups</li>
          </ul>
        </div>
        <form onSubmit={submit} className="main-content-box space-y-3 p-6">
          <h2 className="font-bold">Make an enquiry</h2>
          {(["event", "size", "date"] as const).map((k) => (
            <div key={k}>
              <label htmlFor={`grp-${k}`} className="mb-1 block text-sm font-semibold">
                {k === "event" ? "Event" : k === "size" ? "Group size" : "Preferred date"}
              </label>
              <input id={`grp-${k}`} value={values[k]} onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))} inputMode={k === "size" ? "numeric" : undefined} className="field" />
            </div>
          ))}
          <button type="submit" className="btn-primary w-full">
            Send enquiry
          </button>
          {status && (
            <p role="status" className={cn("rounded-tk p-3 text-sm", status.ok ? "bg-positive-bg text-positive" : "bg-critical-bg text-critical")}>
              {status.text}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export function AccessiblePage() {
  useDocumentTitle("Accessible Ticketing");
  return (
    <>
      <InfoHero title="Accessible Ticketing" intro="Everyone deserves a great night out. We can help with wheelchair and easy-access seating, Companion Card bookings and venue access information." />
      <div className="container-tk -mt-6 grid gap-6 md:grid-cols-3">
        <div className="main-content-box p-5">
          <Accessibility className="size-6 text-tk-jacaranda" aria-hidden />
          <h2 className="mt-2 font-bold">Wheelchair & easy-access seats</h2>
          <p className="mt-1 text-sm text-ink-soft">Many events let you choose accessible seating online. For others, our Accessible Bookings team will hold the right seats for you.</p>
        </div>
        <div className="main-content-box p-5">
          <Ticket className="size-6 text-tk-jacaranda" aria-hidden />
          <h2 className="mt-2 font-bold">Companion Card</h2>
          <p className="mt-1 text-sm text-ink-soft">If you hold a Companion Card, your companion&apos;s ticket is free at participating events. Choose the Companion Card price type when you buy.</p>
        </div>
        <div className="main-content-box p-5">
          <Phone className="size-6 text-tk-jacaranda" aria-hidden />
          <h2 className="mt-2 font-bold">Accessible Bookings line</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Call <span className="font-semibold text-ink">1300 665 915</span>, Monday to Friday 9am–5pm AEST. National Relay Service: 133 677, then ask for 1300 665 915.
          </p>
        </div>
      </div>
      <div className="container-tk mt-6">
        <HelpCta step="accessible" label="Request accessible seating" />
      </div>
    </>
  );
}

export function CartPage() {
  useDocumentTitle("Cart");
  return (
    <div className="container-tk py-16 text-center">
      <ShoppingCart className="mx-auto size-10 text-ink-faint" aria-hidden />
      <h1 className="mt-4 text-2xl font-extrabold">Your cart is empty</h1>
      <p className="mt-2 text-ink-soft">Tickets are held for 10 minutes once you choose them, so pick an event and check out when you&apos;re ready.</p>
      <Link to="/whats-on" className="btn-primary mt-6">
        Find events
      </Link>
    </div>
  );
}
