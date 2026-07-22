"use client";

import { useState } from "react";
import type { HomeInternetPlan } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

const FALLBACK: HomeInternetPlan[] = [];

export function HomeInternetClient({ plans }: { plans: HomeInternetPlan[] }) {
  const [address, setAddress] = useState("100 George St, Sydney NSW");
  const [result, setResult] = useState<string | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    setResult(
      `Demo result: nbn® FTTP available at “${address}”. Estimated install window 5–10 business days.`,
    );
  }

  const list = plans.length ? plans : FALLBACK;

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold text-optus-ink">Home Internet</h1>
      <p className="mt-3 max-w-2xl text-optus-ink/70">
        nbn® and 5G Home Internet plans for Australian households. Address check is simulated.
      </p>

      <form
        onSubmit={check}
        className="mt-8 flex flex-col gap-3 rounded-xl border border-line bg-white p-5 sm:flex-row"
      >
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="h-11 flex-1 rounded-md border border-line px-3"
          aria-label="Service address"
        />
        <button
          type="submit"
          className="h-11 rounded-md bg-optus-teal px-5 text-sm font-semibold text-white"
        >
          Check address
        </button>
      </form>
      {result ? <p className="mt-3 text-sm font-semibold text-optus-teal">{result}</p> : null}

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {list.map((plan) => (
          <article key={plan.id} className="rounded-xl border border-line bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase text-optus-teal">{plan.type}</p>
            <h2 className="mt-1 text-xl font-bold">{plan.name}</h2>
            <p className="mt-2 text-3xl font-extrabold text-optus-teal">
              {formatAud(plan.price)}
              <span className="text-sm font-semibold text-optus-ink/60">/mth</span>
            </p>
            <p className="mt-1 text-sm text-optus-ink/70">{plan.speed}</p>
            <ul className="mt-4 space-y-1 text-sm text-optus-ink/75">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
