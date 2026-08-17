import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { Field, TextInput } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { DEMO_ACCOUNTS, type DemoPortal } from "@/lib/auth";
import { cn } from "@/lib/cn";

const PORTALS: { id: DemoPortal; label: string; blurb: string; password: string }[] = [
  {
    id: "investor",
    label: "InvestorHUB",
    blurb: "For advised clients — portfolio, reports and statements.",
    password: "invest2026",
  },
  {
    id: "adviser",
    label: "AdviserHUB",
    blurb: "For advisers and support staff — clients, trading and reporting.",
    password: "advice2026",
  },
  {
    id: "manager",
    label: "ManagerHUB",
    blurb: "For investment managers — models, flows and documents.",
    password: "manager2026",
  },
];

export default function LoginPage() {
  useDocumentTitle("Log in");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const requested = (params.get("portal") as DemoPortal | null) ?? "investor";
  const [portal, setPortal] = useState<DemoPortal>(
    PORTALS.some((option) => option.id === requested) ? requested : "investor",
  );
  const active = PORTALS.find((option) => option.id === portal)!;
  const account = DEMO_ACCOUNTS.find((candidate) => candidate.portal === portal)!;

  const [email, setEmail] = useState(account.email);
  const [password, setPassword] = useState(active.password);
  const [error, setError] = useState<string | null>(null);

  function selectPortal(next: DemoPortal) {
    const nextOption = PORTALS.find((option) => option.id === next)!;
    const nextAccount = DEMO_ACCOUNTS.find((candidate) => candidate.portal === next)!;
    setPortal(next);
    setEmail(nextAccount.email);
    setPassword(nextOption.password);
    setError(null);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const session = login(email, password);
    if (!session) {
      setError("We couldn't match those details. Use the demo credentials shown below.");
      return;
    }
    const redirect = params.get("redirect");
    navigate(redirect ? decodeURIComponent(redirect) : session.landing, { replace: true });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1fr]">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-h24-navy p-12 text-white lg:flex">
        <div
          aria-hidden
          className="absolute -bottom-32 -left-24 h-[460px] w-[460px] rounded-full bg-h24-teal/25 blur-3xl"
        />
        <Link to="/" className="focus-h24 relative w-fit" aria-label="HUB24 home">
          <BrandLogo tone="light" className="h-8" />
        </Link>
        <div className="relative flex max-w-md flex-col gap-5">
          <h1 className="font-display text-4xl leading-tight font-semibold">
            Empowering better financial futures, together.
          </h1>
          <p className="leading-relaxed text-h24-sky">
            Log in to see your portfolio, run your client book, or manage your models — all on
            Australia&apos;s best platform.
          </p>
        </div>
        <p className="relative flex items-center gap-2 text-sm text-h24-sky">
          <ShieldCheck aria-hidden className="h-4 w-4" />
          Unofficial demo. No real accounts and no data leaves your browser.
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="focus-h24 mb-10 inline-block lg:hidden" aria-label="HUB24 home">
            <BrandLogo />
          </Link>

          <h2 className="font-display text-3xl font-semibold text-ink-strong">Log in</h2>
          <p className="mt-2 text-[0.95rem] text-ink-soft">{active.blurb}</p>

          <div role="group" aria-label="Choose a portal" className="mt-6 flex flex-wrap gap-2">
            {PORTALS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={portal === option.id}
                onClick={() => selectPortal(option.id)}
                className={cn(
                  "focus-h24 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  portal === option.id
                    ? "border-h24-teal bg-h24-teal text-white"
                    : "border-line bg-white text-ink-soft hover:border-h24-teal hover:text-h24-teal-dark",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <form noValidate className="mt-8 flex flex-col gap-5" onSubmit={onSubmit}>
            <Field label="Email" htmlFor="login-email">
              <TextInput
                id="login-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>
            <Field label="Password" htmlFor="login-password" error={error ?? undefined}>
              <TextInput
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Field>
            <Button type="submit" size="lg">
              Log in to {active.label}
            </Button>
          </form>

          <Card className="mt-8 bg-surface-tint">
            <CardHeading className="flex items-center gap-2 text-base">
              <Lock aria-hidden className="h-4 w-4 text-h24-teal" />
              Demo credentials
            </CardHeading>
            <CardBody className="mt-2 text-sm">
              The form is pre-filled for the selected portal. All three accounts are listed below.
            </CardBody>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {PORTALS.map((option) => {
                const candidate = DEMO_ACCOUNTS.find((item) => item.portal === option.id)!;
                return (
                  <li key={option.id} className="flex flex-wrap justify-between gap-2">
                    <span className="font-semibold text-ink-strong">{option.label}</span>
                    <span className="font-mono text-xs text-ink-soft">
                      {candidate.email} / {option.password}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>

          <p className="mt-8 text-sm text-ink-faint">
            <Link to="/" className="focus-h24 font-semibold text-h24-teal-dark hover:underline">
              Back to hub24.com.au
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
