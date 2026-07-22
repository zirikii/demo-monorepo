"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DEMO_CREDENTIALS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const redirect = search.get("redirect") || "/dashboard";
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Login failed");
        return;
      }
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 h-11 w-full rounded-md border border-line px-3"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 h-11 w-full rounded-md border border-line px-3"
        />
      </div>
      <p className="text-xs text-optus-ink/60">
        Demo mode: any email/password works. Pre-filled with {DEMO_CREDENTIALS.email} /{" "}
        {DEMO_CREDENTIALS.password}.
      </p>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in to My Optus"}
      </Button>
      <p className="text-center text-sm text-optus-ink/70">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-optus-teal hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
