"use client";

import { useEffect, useState } from "react";
import type { TopUp } from "@/lib/types";
import { formatNzd, formatShortDate } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";

export default function TopUpPage() {
  const [amount, setAmount] = useState(20);
  const [history, setHistory] = useState<TopUp[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function load() {
    const res = await fetch("/api/top-up");
    const data = (await res.json()) as TopUp[];
    setHistory(data);
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    const res = await fetch("/api/top-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, method: "Demo card ••4242", note: "MySpark top-up" }),
    });
    setPending(false);
    if (!res.ok) {
      setMessage("Top-up failed");
      return;
    }
    setMessage(`Topped up ${formatNzd(amount)} (demo).`);
    await load();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-spark-ink">Top up</h2>
      <p className="mt-1 text-sm text-spark-ink/70">Add credit to prepaid / Travel Pack balances.</p>

      <form onSubmit={submit} className="mt-8 max-w-md space-y-4 rounded-lg border border-line bg-white p-6">
        <label className="block text-sm font-semibold" htmlFor="amount">
          Amount (NZD)
        </label>
        <select
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="h-11 w-full rounded-md border border-line px-3"
        >
          {[10, 20, 40, 50, 100].map((v) => (
            <option key={v} value={v}>
              {formatNzd(v)}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Processing…" : "Top up now"}
        </Button>
        {message ? <p className="text-sm text-spark-purple">{message}</p> : null}
      </form>

      <h3 className="mt-10 text-lg font-bold">History</h3>
      <ul className="mt-4 space-y-3">
        {history.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3 text-sm">
            <div>
              <p className="font-semibold">{formatNzd(item.amount)}</p>
              <p className="text-spark-ink/60">{item.method}</p>
            </div>
            <p className="text-spark-ink/60">{formatShortDate(item.createdAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
