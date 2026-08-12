import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Info, Lock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { site } from "@/data/site";

type PortalConfig = { name: string; tagline: string };

const portalConfig = {
  Employer: { name: "Employer", tagline: "HR, payroll and people admins" },
  Employee: { name: "Employee", tagline: "Work app and self-service" },
  Payroll: { name: "Payroll", tagline: "Payroll specialists and partners" },
} satisfies Record<string, PortalConfig>;

export function LoginPage() {
  useDocumentTitle("Log in");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const portalKey = (searchParams.get("portal") ?? "employer") as keyof typeof portalConfig;
  const portal = portalConfig[portalKey];
  const redirect = searchParams.get("redirect") ?? "/portal";

  const [email, setEmail] = useState<string>(site.demoEmail);
  const [password, setPassword] = useState<string>(site.demoPassword);

  return (
    <PageLayout>
      <section className="hero-atmosphere py-12 sm:py-16">
        <div className="container-eh grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="rounded-eh-lg border border-line bg-white p-8 shadow-eh">
            <div className="flex items-center gap-2">
              <Lock aria-hidden="true" className="h-5 w-5 text-eh-purple" />
              <h1 className="text-2xl font-bold text-ink">Log in to {portal.name}</h1>
            </div>
            <p className="mt-1 text-sm text-ink-faint">{portal.tagline}</p>

            <div className="mt-5 flex gap-3 rounded-eh-md bg-eh-purple-tint p-4">
              <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-eh-purple" />
              <p className="text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">Demo mode.</span> Any email and password will work — the fields are pre-filled for you.
              </p>
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                login(email, password, portal.name as "Employer" | "Employee" | "Payroll");
                navigate(redirect, { replace: true });
              }}
            >
              <TextField label="Work email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" size="lg" className="w-full">Log in</Button>
            </form>

            <p className="mt-6 text-sm text-ink-soft">
              New to Employment Hero?{" "}
              <Link to="/signup" className="font-semibold text-eh-purple underline underline-offset-4">Create an account</Link>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Stay secure when you log in</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Only open Employment Hero from a bookmark or by typing the address yourself.",
                "We will never ask you to share a one-time code over the phone.",
                "Use a unique password and turn on SSO when your company supports it.",
                "Employees should prefer the Work app for payslips and leave.",
              ].map((tip) => (
                <li key={tip} className="rounded-eh-lg border border-line bg-white p-5 text-[15px] leading-relaxed text-ink-soft shadow-eh">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
