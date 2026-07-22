"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatAud } from "@/lib/utils/format";

const DEVICES = [
  { id: "iphone-16-pro", label: "iPhone 16 Pro", base: 680 },
  { id: "iphone-15", label: "iPhone 15", base: 420 },
  { id: "galaxy-s25", label: "Samsung Galaxy S25", base: 510 },
  { id: "pixel-9", label: "Google Pixel 9", base: 360 },
  { id: "other", label: "Another device", base: 120 },
] as const;

const CONDITIONS = [
  { id: "excellent", label: "Excellent", multiplier: 1 },
  { id: "good", label: "Good", multiplier: 0.82 },
  { id: "fair", label: "Fair", multiplier: 0.58 },
] as const;

export default function TradeInPage() {
  const [deviceId, setDeviceId] = useState<(typeof DEVICES)[number]["id"]>("iphone-16-pro");
  const [conditionId, setConditionId] = useState<(typeof CONDITIONS)[number]["id"]>("good");

  const estimate = useMemo(() => {
    const device = DEVICES.find((item) => item.id === deviceId) ?? DEVICES[0];
    const condition = CONDITIONS.find((item) => item.id === conditionId) ?? CONDITIONS[1];
    return Math.round(device.base * condition.multiplier);
  }, [deviceId, conditionId]);

  return (
    <div className="container py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Trade-in</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-optus-ink">Trade in your device</h1>
      <p className="mt-4 max-w-3xl text-optus-ink/80">
        Get a mock trade-in estimate toward your next phone. Values are demo-only and never leave this browser session.
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-6 rounded-xl border border-line bg-white p-6" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label htmlFor="device" className="text-sm font-bold text-optus-ink">
              Device
            </label>
            <select
              id="device"
              className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm"
              value={deviceId}
              onChange={(event) => setDeviceId(event.target.value as typeof deviceId)}
            >
              {DEVICES.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="text-sm font-bold text-optus-ink">Condition</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {CONDITIONS.map((condition) => (
                <label
                  key={condition.id}
                  className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-bold ${
                    conditionId === condition.id
                      ? "border-optus-teal bg-optus-teal-light text-optus-teal-dark"
                      : "border-line text-optus-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="condition"
                    className="sr-only"
                    checked={conditionId === condition.id}
                    onChange={() => setConditionId(condition.id)}
                  />
                  {condition.label}
                </label>
              ))}
            </div>
          </fieldset>
        </form>
        <aside className="rounded-xl bg-optus-ink p-6 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-optus-yellow">Estimated credit</p>
          <p className="mt-4 text-5xl font-black">{formatAud(estimate)}</p>
          <p className="mt-3 text-sm text-white/70">
            Demo valuation only. Use it to explore the phones catalogue and My Optus checkout flow.
          </p>
          <Link
            href="/phones"
            className="mt-8 inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-bold text-white hover:bg-optus-teal-dark"
          >
            Browse phones
          </Link>
        </aside>
      </div>
    </div>
  );
}
