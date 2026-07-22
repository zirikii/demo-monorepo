"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { NetworkToolsState } from "@/lib/types";
import { formatShortDate } from "@/lib/utils/format";

export default function NetworkToolsPage() {
  const [state, setState] = useState<NetworkToolsState | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [scamText, setScamText] = useState("");
  const [donateGb, setDonateGb] = useState(2);

  async function load() {
    const res = await fetch("/api/network-tools");
    setState((await res.json()) as NetworkToolsState);
  }

  useEffect(() => {
    void load();
  }, []);

  async function run(payload: Record<string, unknown>, success: string) {
    setPending(true);
    setMessage(null);
    const res = await fetch("/api/network-tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setPending(false);
    if (!res.ok) {
      setMessage("Network tools update failed");
      return;
    }
    setState((await res.json()) as NetworkToolsState);
    setMessage(success);
  }

  if (!state) {
    return <p className="text-sm text-optus-ink/70">Loading network tools…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-optus-ink">Network tools</h2>
        <p className="mt-1 text-sm text-optus-ink/70">
          Living Network features simulated locally — Unlimited Data Day, Donate Data, Scamwise and Network Pulse.
        </p>
      </div>

      <section className="rounded-lg border border-line bg-white p-5">
        <h3 className="text-lg font-black text-optus-ink">Unlimited Data Day</h3>
        <p className="mt-2 text-sm text-optus-ink/70">
          {state.unlimitedDataDay.active
            ? `Active until ${state.unlimitedDataDay.expiresAt ? formatShortDate(state.unlimitedDataDay.expiresAt) : "tomorrow"}.`
            : "Activate 24 hours of unlimited data on this demo mobile service."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={pending || state.unlimitedDataDay.active}
            onClick={() => run({ action: "activate-udd" }, "Unlimited Data Day activated (demo).")}
          >
            Activate
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={pending || !state.unlimitedDataDay.active}
            onClick={() => run({ action: "deactivate-udd" }, "Unlimited Data Day ended (demo).")}
          >
            End early
          </Button>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h3 className="text-lg font-black text-optus-ink">Donate Your Data</h3>
        <p className="mt-2 text-sm text-optus-ink/70">
          Total donated in this demo: <strong>{state.donateData.totalDonatedGb} GB</strong>
          {state.donateData.lastDonationGb > 0
            ? ` (last gift ${state.donateData.lastDonationGb} GB)`
            : ""}
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="text-sm font-bold text-optus-ink">
            GB to donate
            <input
              type="number"
              min={1}
              max={20}
              value={donateGb}
              onChange={(event) => setDonateGb(Number(event.target.value))}
              className="mt-2 block h-10 w-24 rounded-md border border-line px-3"
            />
          </label>
          <Button
            type="button"
            disabled={pending}
            onClick={() => run({ action: "donate", gb: donateGb }, `Donated ${donateGb} GB (demo).`)}
          >
            Donate data
          </Button>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <h3 className="text-lg font-black text-optus-ink">Scamwise</h3>
        <p className="mt-2 text-sm text-optus-ink/70">Report a suspicious SMS. Stored only in local demo JSON.</p>
        <textarea
          value={scamText}
          onChange={(event) => setScamText(event.target.value)}
          rows={3}
          className="mt-4 w-full rounded-md border border-line p-3 text-sm"
          placeholder="Paste the SMS wording you want to report…"
        />
        <Button
          type="button"
          className="mt-3"
          disabled={pending || scamText.trim().length < 3}
          onClick={async () => {
            await run({ action: "scam-report", message: scamText.trim() }, "Scam report saved (demo).");
            setScamText("");
          }}
        >
          Submit report
        </Button>
        {state.scamwise.reports.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {state.scamwise.reports.slice(0, 5).map((report) => (
              <li key={report.id} className="rounded-md bg-surface-muted px-3 py-2 text-xs text-optus-ink/80">
                <span className="font-bold">{formatShortDate(report.createdAt)}</span> — {report.message}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="rounded-lg border border-line bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-black text-optus-ink">Network Pulse</h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={pending}
            onClick={() => run({ action: "refresh-pulse" }, "Network Pulse refreshed (demo).")}
          >
            Refresh
          </Button>
        </div>
        <p className="mt-2 text-xs text-optus-ink/60">
          Updated {formatShortDate(state.networkPulse.updatedAt)}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {(
            [
              ["Mobile", state.networkPulse.mobile],
              ["Home", state.networkPulse.home],
              ["Public WiFi", state.networkPulse.publicWifi],
            ] as const
          ).map(([label, pulse]) => (
            <div key={label} className="rounded-md bg-optus-teal-light p-4">
              <p className="text-xs font-bold uppercase text-optus-ink/60">{label}</p>
              <p className="mt-2 text-xl font-black text-optus-teal-dark">{pulse.status}</p>
              <p className="mt-1 text-xs text-optus-ink/70">
                {pulse.signal} · {pulse.latencyMs} ms
              </p>
            </div>
          ))}
        </div>
      </section>

      {message ? <p className="text-sm font-semibold text-optus-teal-dark">{message}</p> : null}
    </div>
  );
}
