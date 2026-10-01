import { CreditCard, Trash2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { REGIONS } from "@/data/nav";
import type { RegionId } from "@/data/types";
import { useFan } from "@/features/fan/FanProvider";
import type { FanProfile, PaymentCard } from "@/features/fan/types";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { Panel } from "./AccountLayout";

function Saved({ show, children = "Changes saved." }: { show: boolean; children?: ReactNode }) {
  if (!show) return null;
  return (
    <p role="status" className="rounded-tk bg-positive-bg px-4 py-3 text-sm text-positive">
      {children}
    </p>
  );
}

function Field({ id, label, children, hint }: { id: string; label: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

export function DetailsPage() {
  useDocumentTitle("Personal Details");
  const { profile, updateProfile } = useFan();
  const [form, setForm] = useState(() => ({
    firstName: profile.firstName,
    lastName: profile.lastName,
    mobile: profile.mobile,
    postcode: profile.postcode,
    homeRegion: profile.homeRegion,
    accessibility: profile.accessibility,
  }));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setSaved(false);
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) return setError("Enter your first and last name.");
    if (!/^\d{4}$/.test(form.postcode)) return setError("Postcode must be 4 digits.");
    setError(null);
    updateProfile(form);
    setSaved(true);
  };

  return (
    <Panel title="Personal Details">
      <form onSubmit={submit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="d-first" label="First name">
            <input id="d-first" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="field" autoComplete="given-name" />
          </Field>
          <Field id="d-last" label="Last name">
            <input id="d-last" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="field" autoComplete="family-name" />
          </Field>
          <Field id="d-email" label="Email" hint="Your email is your Ticketek login. Contact support to change it.">
            <input id="d-email" value={profile.email} readOnly className="field bg-page text-ink-soft" />
          </Field>
          <Field id="d-mobile" label="Mobile">
            <input id="d-mobile" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} className="field" autoComplete="tel" inputMode="tel" />
          </Field>
          <Field id="d-postcode" label="Postcode">
            <input id="d-postcode" value={form.postcode} onChange={(e) => set("postcode", e.target.value)} className="field" inputMode="numeric" maxLength={4} />
          </Field>
          <Field id="d-region" label="Home state" hint="Used for what's on near you and support hours.">
            <select id="d-region" value={form.homeRegion} onChange={(e) => set("homeRegion", e.target.value as RegionId)} className="field">
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <fieldset className="rounded-tk border border-line-soft p-4">
          <legend className="px-1 text-sm font-bold">Accessibility needs</legend>
          <p className="mb-3 text-xs text-ink-soft">Shared with Ticketek Support so we can offer the right seats and entry. Never shared with promoters without your consent.</p>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.accessibility.companionCard} onChange={(e) => set("accessibility", { ...form.accessibility, companionCard: e.target.checked })} className="size-4 accent-tk-blue" />
              I hold a Companion Card
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.accessibility.wheelchair} onChange={(e) => set("accessibility", { ...form.accessibility, wheelchair: e.target.checked })} className="size-4 accent-tk-blue" />
              I need wheelchair-accessible seating
            </label>
          </div>
          <div className="mt-3">
            <Field id="d-access-notes" label="Anything else we should know?">
              <textarea
                id="d-access-notes"
                rows={2}
                value={form.accessibility.notes}
                onChange={(e) => set("accessibility", { ...form.accessibility, notes: e.target.value })}
                className="field"
              />
            </Field>
          </div>
        </fieldset>
        {error && <p className="text-sm text-critical">{error}</p>}
        <Saved show={saved} />
        <button type="submit" className="btn-primary">
          Save details
        </button>
      </form>
    </Panel>
  );
}

const CHANNELS: { key: keyof FanProfile["marketing"]; label: string; description: string }[] = [
  { key: "email", label: "Email newsletters", description: "Presales, on-sale alerts and what's on near you." },
  { key: "sms", label: "SMS", description: "Presale codes and last-minute tickets by text." },
  { key: "push", label: "App notifications", description: "Alerts on the Ticketek app for your favourites." },
  { key: "partners", label: "Partner offers", description: "Offers from promoters, venues and Ticketek partners." },
];

export function NotificationsPage() {
  useDocumentTitle("Communication Preferences");
  const { profile, updateProfile } = useFan();
  const [saved, setSaved] = useState(false);
  const toggle = (key: keyof FanProfile["marketing"]) => {
    updateProfile({ marketing: { ...profile.marketing, [key]: !profile.marketing[key] } });
    setSaved(true);
  };
  return (
    <Panel title="Communication Preferences">
      <p className="-mt-2 mb-4 text-sm text-ink-soft">We&apos;ll always send you emails about your orders, like tickets, event changes and refunds.</p>
      <ul className="divide-y divide-line-soft">
        {CHANNELS.map((c) => {
          const on = profile.marketing[c.key];
          return (
            <li key={c.key} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="font-semibold">{c.label}</p>
                <p className="text-sm text-ink-soft">{c.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={c.label}
                onClick={() => toggle(c.key)}
                className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", on ? "bg-tk-green" : "bg-line")}
              >
                <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", on ? "left-[22px]" : "left-0.5")} />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-4">
        <Saved show={saved}>Preferences updated.</Saved>
      </div>
    </Panel>
  );
}

export function PaymentPage() {
  useDocumentTitle("Payment Methods");
  const { profile, updateProfile } = useFan();
  const [form, setForm] = useState({ number: "", expiry: "" });
  const [error, setError] = useState<string | null>(null);
  const cards = profile.cards;
  const save = (next: PaymentCard[]) => updateProfile({ cards: next });

  const add = (e: FormEvent) => {
    e.preventDefault();
    const digits = form.number.replace(/\D/g, "");
    if (digits.length < 15 || digits.length > 16) return setError("Enter a valid card number.");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) return setError("Expiry must be MM/YY.");
    const brand: PaymentCard["brand"] = digits.startsWith("4") ? "Visa" : digits.startsWith("3") ? "Amex" : "Mastercard";
    save([...cards, { id: `card-${Date.now()}`, brand, last4: digits.slice(-4), expiry: form.expiry, isDefault: cards.length === 0 }]);
    setForm({ number: "", expiry: "" });
    setError(null);
  };

  const remove = (id: string) => {
    const rest = cards.filter((c) => c.id !== id);
    if (rest.length && !rest.some((c) => c.isDefault)) rest[0] = { ...rest[0]!, isDefault: true };
    save(rest);
  };

  return (
    <Panel title="Payment Methods">
      {cards.length === 0 ? (
        <p className="mb-4 text-ink-soft">No saved cards.</p>
      ) : (
        <ul className="mb-6 divide-y divide-line-soft">
          {cards.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center gap-3 py-3">
              <CreditCard className="size-5 text-tk-blue" aria-hidden />
              <p className="min-w-0 flex-1">
                <span className="font-semibold">
                  {c.brand} ending {c.last4}
                </span>{" "}
                <span className="text-sm text-ink-soft">· expires {c.expiry}</span>
                {c.isDefault && <span className="ml-2 rounded-full bg-tk-blue-tint px-2 py-0.5 text-xs font-semibold text-tk-blue">Default</span>}
              </p>
              {!c.isDefault && (
                <button type="button" onClick={() => save(cards.map((x) => ({ ...x, isDefault: x.id === c.id })))} className="link text-sm">
                  Make default
                </button>
              )}
              <button type="button" onClick={() => remove(c.id)} className="grid size-8 place-items-center rounded-full text-ink-faint hover:bg-page hover:text-critical" aria-label={`Remove ${c.brand} ending ${c.last4}`}>
                <Trash2 className="size-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={add} className="grid gap-3 rounded-tk bg-page p-4 sm:grid-cols-[1fr_120px_auto] sm:items-end" aria-label="Add a card">
        <Field id="pm-number" label="Card number">
          <input id="pm-number" value={form.number} onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))} className="field" inputMode="numeric" autoComplete="cc-number" />
        </Field>
        <Field id="pm-expiry" label="Expiry">
          <input id="pm-expiry" placeholder="MM/YY" value={form.expiry} onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))} className="field" autoComplete="cc-exp" />
        </Field>
        <button type="submit" className="btn-primary">
          Add card
        </button>
        {error && <p className="text-sm text-critical sm:col-span-3">{error}</p>}
      </form>
      <p className="mt-3 text-xs text-ink-faint">Demo only — card numbers stay in this browser and nothing is charged.</p>
    </Panel>
  );
}

export function PasswordPage() {
  useDocumentTitle("Change Password");
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(false);
    if (!form.current) return setError("Enter your current password.");
    if (form.next.length < 8 || !/\d/.test(form.next) || !/[a-z]/i.test(form.next)) return setError("New password needs at least 8 characters, including a letter and a number.");
    if (form.next !== form.confirm) return setError("New passwords don't match.");
    setError(null);
    setForm({ current: "", next: "", confirm: "" });
    setSaved(true);
  };
  return (
    <Panel title="Change Password">
      <form onSubmit={submit} className="max-w-md space-y-4">
        {(
          [
            ["current", "Current password", "current-password"],
            ["next", "New password", "new-password"],
            ["confirm", "Confirm new password", "new-password"],
          ] as const
        ).map(([key, label, auto]) => (
          <Field key={key} id={`pw-${key}`} label={label}>
            <input id={`pw-${key}`} type="password" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="field" autoComplete={auto} />
          </Field>
        ))}
        {error && <p className="text-sm text-critical">{error}</p>}
        <Saved show={saved}>Password updated.</Saved>
        <button type="submit" className="btn-primary">
          Update password
        </button>
      </form>
    </Panel>
  );
}

export function CloseAccountPage() {
  useDocumentTitle("Close Account");
  const { views, resetFan } = useFan();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState("");
  const upcoming = views.filter((v) => v.status === "upcoming" || v.status === "event-soon" || v.status === "rescheduled").length;
  const close = (e: FormEvent) => {
    e.preventDefault();
    resetFan();
    logout();
    navigate("/");
  };
  return (
    <Panel title="Close Account">
      <div className="space-y-3 text-sm text-ink-soft">
        <p>Closing your account removes your saved details, favourites and event history.</p>
        {upcoming > 0 && (
          <p className="rounded-tk bg-caution-bg px-4 py-3 text-caution">
            You have {upcoming} upcoming {upcoming === 1 ? "order" : "orders"}. Mobile tickets live in your account, so keep your emailed confirmations.
          </p>
        )}
      </div>
      <form onSubmit={close} className="mt-5 max-w-md space-y-3">
        <Field id="close-confirm" label='Type "CLOSE" to confirm' hint="In this demo, closing resets the sample account to its starting data.">
          <input id="close-confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="field" />
        </Field>
        <button type="submit" disabled={confirm.trim().toUpperCase() !== "CLOSE"} className="btn-primary bg-critical hover:bg-critical disabled:opacity-50">
          Close my account
        </button>
      </form>
    </Panel>
  );
}
