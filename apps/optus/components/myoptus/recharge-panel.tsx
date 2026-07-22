"use client";

import { useEffect, useState } from "react";
import type { Recharge } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";

const AMOUNTS = [30, 40, 60, 150] as const;
const METHODS = ["Visa •••• 4021", "PayPal", "Mastercard •••• 8890"] as const;

export function RechargePanel() {
  const [history, setHistory] = useState<Recharge[]>([]);
  const [amount, setAmount] = useState<number>(40);
  const [method, setMethod] = useState<string>(METHODS[0]);
  const [service, setService] = useState("0412 908 771");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function load() {
    const res = await fetch("/api/recharge");
    if (res.ok) {
      setHistory((await res.json()) as Recharge[]);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    const res = await fetch("/api/recharge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, method, service }),
    });
    setPending(false);
    if (!res.ok) {
      setMessage("Recharge failed. Please try again.");
      return;
    }
    setMessage(`Recharged ${formatAud(amount)} to ${service}. (Demo — no payment taken.)`);
    await load();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={submit} className="rounded-lg border border-line bg-white p-6">
        <h3 className="font-semibold text-optus-ink">New recharge</h3>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-optus-ink">Amount</legend>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAmount(a)}
                aria-pressed={amount === a}
                className={
                  "h-11 rounded-md border text-sm font-semibold transition-colors " +
                  (amount === a
                    ? "border-optus-ink bg-optus-yellow text-optus-ink"
                    : "border-line bg-white text-optus-ink hover:bg-surface-muted")
                }
              >
                ${a}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-4">
          <label htmlFor="rc-service" className="text-sm font-semibold text-optus-ink">
            Service number
          </label>
          <input
            id="rc-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-1 h-11 w-full rounded-md border border-line px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-ink"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="rc-method" className="text-sm font-semibold text-optus-ink">
            Payment method
          </label>
          <select
            id="rc-method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="mt-1 h-11 w-full rounded-md border border-line bg-white px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-ink"
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="brand" className="mt-6 w-full" disabled={pending}>
          {pending ? "Processing…" : `Recharge ${formatAud(amount)}`}
        </Button>
        {message ? (
          <p role="status" className="mt-3 text-sm font-semibold text-optus-ink">
            {message}
          </p>
        ) : null}
      </form>

      <div className="rounded-lg border border-line bg-white p-6">
        <h3 className="font-semibold text-optus-ink">Recent recharges</h3>
        <ul className="mt-4 divide-y divide-line">
          {history.map((rc) => (
            <li key={rc.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-optus-ink">{formatAud(rc.amount)}</p>
                <p className="text-xs text-optus-ink-soft">
                  {rc.service} · {rc.method}
                </p>
              </div>
              <p className="text-xs text-optus-ink-soft">{formatShortDate(rc.createdAt)}</p>
            </li>
          ))}
          {history.length === 0 ? (
            <li className="py-3 text-sm text-optus-ink-soft">No recharges yet.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
