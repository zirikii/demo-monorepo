"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const schema = z.object({ email: z.string().email(), password: z.string().min(1) });
type LoginValues = z.infer<typeof schema>;
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "admin@example.com", password: "demo" },
  });
  async function onSubmit(values: LoginValues) {
    setError(null);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      setError("Unable to start the demo session.");
      return;
    }
    router.push(searchParams.get("redirect") ?? "/overview");
    router.refresh();
  }
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
        {form.formState.errors.email ? (
          <p className="text-xs text-optus-danger">Enter a valid email.</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...form.register("password")}
        />
      </div>
      <p className="rounded-md bg-optus-yellow-soft px-3 py-2 text-xs font-semibold text-optus-ink">
        Demo mode: any email and password signs you in.
      </p>
      {error ? <p className="text-sm text-optus-danger">{error}</p> : null}
      <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Signing in..." : "Log in to Business Hub"}
      </Button>
    </form>
  );
}
