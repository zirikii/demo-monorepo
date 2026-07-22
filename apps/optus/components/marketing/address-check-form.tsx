"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AddressCheckForm() {
  const [address, setAddress] = useState("200 George Street, Sydney NSW");
  const [result, setResult] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = address.trim();
    setResult(
      trimmed
        ? `Demo result: NBN and 5G Home Internet options may be available near "${trimmed}".`
        : "Enter an Australian street address to run the demo check.",
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="address" className="text-sm font-bold">Check your address</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="h-11 flex-1 rounded-md border-0 px-3 text-optus-ink" />
        <Button type="submit" variant="dark" className="bg-white text-optus-teal-dark hover:bg-white/90">Check</Button>
      </div>
      {result ? <p className="text-sm text-white/85">{result}</p> : null}
    </form>
  );
}
