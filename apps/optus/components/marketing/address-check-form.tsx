"use client";

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AddressCheckForm() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    setStatus("checking");
    // Demo only: simulate a coverage lookup with a short delay.
    setTimeout(() => setStatus("done"), 900);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-surface-subtle p-6" role="search">
      <label htmlFor="coverage-address" className="text-sm font-semibold text-optus-ink">
        Your address
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-md border border-line bg-white px-3">
        <MapPin className="h-5 w-5 text-optus-teal" aria-hidden="true" />
        <input
          id="coverage-address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setStatus("idle");
          }}
          placeholder="e.g. 100 Market St, Sydney NSW"
          className="h-11 flex-1 bg-transparent outline-none"
        />
      </div>
      <Button type="submit" className="mt-4 w-full" disabled={status === "checking"}>
        {status === "checking" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Checking…
          </>
        ) : (
          "Check coverage"
        )}
      </Button>
      {status === "done" ? (
        <p className="mt-3 rounded-md bg-optus-teal-light p-3 text-sm font-medium text-optus-teal-darker">
          Great news — Optus 5G and nbn® plans are available at this address (demo result).
        </p>
      ) : null}
    </form>
  );
}
