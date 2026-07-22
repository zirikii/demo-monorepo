"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CoverageCheck() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    setResult(
      `Good news — Optus 5G Home Internet and nbn are available at "${address.trim()}". (Demo result.)`,
    );
  }

  return (
    <section className="bg-white">
      <div className="container py-14">
        <div className="rounded-2xl border border-line bg-surface-subtle p-8 md:p-10">
          <div className="flex items-center gap-2 text-optus-ink">
            <MapPin className="h-5 w-5 text-optus-teal" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Check your coverage</h2>
          </div>
          <p className="mt-2 max-w-2xl text-optus-ink-soft">
            Enter your address to see the nbn and 5G Home Internet plans available where you live.
          </p>
          <form onSubmit={check} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="coverage-address" className="sr-only">
              Your address
            </label>
            <input
              id="coverage-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 George St, Sydney NSW 2000"
              className="h-12 flex-1 rounded-md border border-line px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optus-ink"
            />
            <Button type="submit" size="lg" variant="brand">
              Check address
            </Button>
          </form>
          {result ? (
            <p
              role="status"
              className="mt-4 rounded-md border border-optus-green/30 bg-optus-green/10 px-4 py-3 text-sm font-semibold text-optus-ink"
            >
              {result}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
