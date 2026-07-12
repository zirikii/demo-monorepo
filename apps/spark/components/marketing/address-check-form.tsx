"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AddressCheckForm() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) {
      setResult("Enter an address to check availability.");
      return;
    }
    const fibre = /auckland|wellington|christchurch|hamilton/i.test(address);
    setResult(
      fibre
        ? `Demo result: Fibre and Wireless look available near “${address.trim()}”.`
        : `Demo result: Wireless Broadband may be available near “${address.trim()}”. Fibre availability varies by street.`,
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block text-sm font-semibold text-white" htmlFor="address">
        Check my address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 1 Queen Street, Auckland"
          className="h-11 flex-1 rounded-md border-0 px-3 text-spark-ink"
        />
        <Button type="submit" variant="dark" className="bg-white text-spark-purple hover:bg-white/90">
          Check
        </Button>
      </div>
      {result ? <p className="text-sm text-white/90">{result}</p> : null}
    </form>
  );
}
