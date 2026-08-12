import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

type PortalConfig = { name: string; tagline: string; helper: string };

const portalConfig = {
  Employer: {
    name: "Employer",
    tagline: "HR and people management",
    helper: "Manage your team, approve leave and run performance cycles.",
  },
  Employee: {
    name: "Employee",
    tagline: "Payslips, leave and benefits",
    helper: "Check your payslips, request leave and reach your earned wages.",
  },
  Payroll: {
    name: "Payroll",
    tagline: "Pay runs and STP reporting",
    helper: "Prepare pay runs, clear superannuation and lodge to the ATO.",
  },
} satisfies Record<string, PortalConfig>;

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);

  const portalKey = (searchParams.get("portal") ?? "employer") as keyof typeof portalConfig;
  const portal = portalConfig[portalKey];

  useDocumentTitle(`${portal.name} log in`);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    login(email, password);
    navigate(searchParams.get("redirect") ?? "/platform");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <div className="hidden flex-col justify-between bg-eh-purple p-12 text-white lg:flex">
        <Logo tone="light" />
        <div>
          <h1 className="font-display text-4xl leading-tight font-bold">
            Employment.
            <br />
            Intelligently Run.
          </h1>
          <p className="mt-4 max-w-sm text-white/75">{portal.helper}</p>
        </div>
        <p className="text-xs text-white/50">
          Unofficial demo. Not affiliated with Employment Hero Pty Ltd.
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>

          <p className="mt-8 text-xs font-bold tracking-[0.16em] text-eh-purple uppercase lg:mt-0">
            {portal.name} log in
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-eh-ink">Welcome back</h2>
          <p className="mt-2 text-sm text-eh-ink-soft">{portal.tagline}</p>

          <div className="mt-6 flex items-start gap-3 rounded-eh-md bg-eh-purple-tint px-4 py-3.5 text-sm text-eh-purple-deep">
            <Lock size={16} className="mt-0.5 shrink-0" />
            <p>
              Demo mode — any email and password will sign you in. The fields are pre-filled with
              the demo account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field
              label="Email address"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Field
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-eh-ink-soft">
                <input type="checkbox" defaultChecked className="size-4 accent-[#7622d7]" />
                Remember this device for 45 days
              </label>
              <Link to="/support" className="focus-eh font-semibold text-eh-purple hover:underline">
                Forgot password
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>

          <button
            type="button"
            className="focus-eh mt-3 h-11 w-full rounded-full border border-eh-line text-sm font-semibold text-eh-ink transition hover:border-eh-purple hover:text-eh-purple"
          >
            Sign in with single sign-on
          </button>

          <p className="mt-8 text-sm text-eh-ink-soft">
            Do not have an account?{" "}
            <Link
              to="/start-free"
              className="focus-eh font-semibold text-eh-purple hover:underline"
            >
              Start free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
