import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Info, Lock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

type ServiceConfig = { name: string; tagline: string };

const serviceConfig = {
  netbank: { name: "NetBank", tagline: "Everyday personal banking" },
  commbiz: { name: "CommBiz", tagline: "Business banking" },
  commsec: { name: "CommSec", tagline: "Investing and share trading" },
} satisfies Record<string, ServiceConfig>;

export function LoginPage() {
  useDocumentTitle("Log on to NetBank");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const serviceKey = searchParams.get("service")?.toLowerCase();
  const service =
    serviceKey && serviceKey in serviceConfig
      ? serviceConfig[serviceKey as keyof typeof serviceConfig]
      : serviceConfig.netbank;
  const redirect = searchParams.get("redirect") ?? "/netbank";

  const [clientNumber, setClientNumber] = useState("12345678");
  const [password, setPassword] = useState("demo1234");

  return (
    <PageLayout>
      <section className="bg-surface-tint py-12 sm:py-16">
        <div className="container-cba grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="rounded-cba-lg bg-surface p-8 shadow-cba">
            <div className="flex items-center gap-2">
              <Lock aria-hidden="true" className="h-5 w-5 text-ink" />
              <h1 className="text-2xl font-extrabold text-ink">Log on to {service.name}</h1>
            </div>
            <p className="mt-1 text-[14px] text-ink-faint">{service.tagline}</p>

            <div className="mt-5 flex gap-3 rounded-cba-md bg-cba-yellow-tint p-4">
              <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
              <p className="text-[14px] leading-relaxed text-ink-soft">
                <span className="font-bold text-ink">Demo mode.</span> Any client number and
                password will work — the fields are pre-filled for you. No real account is accessed.
              </p>
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                login(clientNumber, password);
                navigate(redirect, { replace: true });
              }}
            >
              <TextField
                label="Client number"
                autoComplete="username"
                inputMode="numeric"
                value={clientNumber}
                onChange={(event) => setClientNumber(event.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button type="submit" size="lg" className="w-full">
                Log on
              </Button>
            </form>

            <p className="mt-6 text-[14px] text-ink-soft">
              Don&rsquo;t have {service.name} yet?{" "}
              <Link to="/register" className="font-bold text-ink underline underline-offset-4">
                Register now
              </Link>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-ink">
              Stay safe when you log on
              <span aria-hidden="true" className="mt-2 block h-1 w-16 bg-cba-yellow" />
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Only access NetBank from the CommBank app or by typing our address directly — never via a link in a message.",
                "We will never ask you to move money to a 'safe account'.",
                "Ask any caller claiming to be from us to send a CallerCheck code to your CommBank app.",
                "Keep your client number and password private, and never share a NetCode.",
              ].map((tip) => (
                <li
                  key={tip}
                  className="rounded-cba-lg bg-surface p-5 text-[15px] leading-relaxed text-ink-soft shadow-cba"
                >
                  {tip}
                </li>
              ))}
            </ul>
            <Link
              to="/support/security"
              className="focus-cba mt-6 inline-block text-[15px] font-bold text-ink underline underline-offset-4"
            >
              Visit CommBank Safe
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
