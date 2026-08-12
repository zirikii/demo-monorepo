import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { portalConfig } from "@/data/portal";

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const portalKey = (searchParams.get("portal") ?? "employmenthero") as keyof typeof portalConfig;
  const portal = portalConfig[portalKey];
  const [email, setEmail] = useState("avery.chen@acmedigital.com.au");
  const [password, setPassword] = useState("demo1234");

  return (
    <main className="grid min-h-screen bg-violet-soft lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link to="/" aria-label="Employment Hero home" className="focus-hero inline-flex rounded">
            <img src="/brand/logo.svg" alt="Employment Hero" className="h-9 w-auto" />
          </Link>
          <div className="mt-12 rounded-hero-xl bg-white p-7 shadow-product sm:p-9">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-soft">
                <Lock aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-2xl font-semibold tracking-[-0.03em]">
                  Log in to {portal.name}
                </h1>
                <p className="mt-1 text-xs text-ink-faint">{portal.tagline}</p>
              </div>
            </div>
            <form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>
              <label className="block text-sm font-bold">
                Email address
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  autoComplete="username"
                  className="focus-hero mt-2 min-h-12 w-full rounded-xl border border-line px-4 font-normal"
                />
              </label>
              <label className="block text-sm font-bold">
                Password
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  autoComplete="current-password"
                  className="focus-hero mt-2 min-h-12 w-full rounded-xl border border-line px-4 font-normal"
                />
              </label>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>
          </div>
        </div>
      </section>
      <section className="hidden items-center bg-ink p-16 text-white lg:flex">
        <div className="max-w-xl">
          <ShieldCheck aria-hidden="true" className="h-12 w-12 text-green" />
          <h2 className="mt-8 text-5xl font-semibold leading-tight tracking-[-0.05em]">
            Your work life, securely in one place.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">
            Access employee records, pay runs, leave, hiring and the tools your team uses every day.
          </p>
        </div>
      </section>
    </main>
  );
}
