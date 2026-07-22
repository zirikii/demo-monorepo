"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { TopUp } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";

const AMOUNTS = [10, 30, 40, 70];
const METHODS = ["Visa ···· 4021", "Mastercard ···· 8830", "Apple Pay", "PayID"];

export function TopUpForm() {
  const [history, setHistory] = useState<TopUp[]>([]);
  const [amount, setAmount] = useState(30);
  const [method, setMethod] = useState(METHODS[0] ?? "Apple Pay");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/top-up");
    const data = (await res.json()) as TopUp[];
    setHistory(data);
  }

  useEffect(() => {
    void load();
  }, []);

  async function recharge(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    const res = await fetch("/api/top-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, method, note: `${formatAud(amount)} recharge` }),
    });
    setPending(false);
    if (!res.ok) {
      setMessage("Could not process recharge");
      return;
    }
    setMessage(`Recharged ${formatAud(amount)} — all done!`);
    await load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={recharge} className="rounded-lg border border-line bg-white p-6">
        <h3 className="font-bold text-optus-ink">Choose an amount</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              aria-pressed={amount === a}
              className={
                "focus-ring rounded-md border px-4 py-3 text-lg font-bold transition-colors " +
                (amount === a
                  ? "border-optus-teal bg-optus-teal-light text-optus-teal-darker"
                  : "border-line text-optus-ink hover:border-optus-teal")
              }
            >
              {formatAud(a)}
            </button>
          ))}
        </div>

        <label htmlFor="method" className="mt-6 block text-sm font-semibold text-optus-ink">
          Payment method
        </label>
        <select
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="focus-ring mt-1 h-11 w-full rounded-md border border-line bg-white px-3"
        >
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <Button type="submit" className="mt-6 w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Processing…
            </>
          ) : (
            `Recharge ${formatAud(amount)}`
          )}
        </Button>
        {message ? (
          <p className="mt-3 rounded-md bg-optus-teal-light p-3 text-sm font-medium text-optus-teal-darker">
            {message}
          </p>
        ) : null}
      </form>

      <div className="rounded-lg border border-line bg-white p-6">
        <h3 className="font-bold text-optus-ink">Recharge history</h3>
        <ul className="mt-4 divide-y divide-line">
          {history.map((tu) => (
            <li key={tu.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-optus-ink">{formatAud(tu.amount)}</p>
                <p className="text-xs text-optus-ink/60">{tu.method}</p>
              </div>
              <p className="text-sm text-optus-ink/60">{formatShortDate(tu.createdAt)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
