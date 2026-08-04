import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Info, Lock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { Tabs } from "@/components/ui/Tabs";
import { CommBankLogo } from "@/components/brand/CommBankLogo";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { demoCredentials } from "@/lib/auth";

const services = [
  { id: "netbank" as const, label: "NetBank" },
  { id: "commbiz" as const, label: "CommBiz" },
  { id: "commsec" as const, label: "CommSec" },
];

type Service = (typeof services)[number]["id"];

const serviceCopy: Record<Service, string> = {
  netbank: "Personal banking — accounts, payments, cards and statements.",
  commbiz: "Business banking — payments, approvals and file transfers.",
  commsec: "Share trading — buy and sell ASX-listed shares.",
};

export function LogonPage() {
  useDocumentTitle("Log on to NetBank");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { logon } = useAuth();

  const requested = params.get("service");
  const [service, setService] = useState<Service>(
    services.some((option) => option.id === requested) ? (requested as Service) : "netbank",
  );
  const [clientNumber, setClientNumber] = useState(demoCredentials.clientNumber);
  const [password, setPassword] = useState(demoCredentials.password);
  const [error, setError] = useState<string | null>(null);

  const redirect = params.get("redirect") ?? "/netbank";

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!clientNumber.trim()) {
      setError("Enter your client number.");
      return;
    }
    setError(null);
    logon(clientNumber, password);
    navigate(redirect, { replace: true });
  };

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Log on" }]} />

      <section className="py-12">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-start">
          <div className="rounded-2xl border border-line bg-surface p-8 shadow-card">
            <CommBankLogo />
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-black">Log on</h1>
            <p className="mt-1 text-sm text-ink-soft">{serviceCopy[service]}</p>

            <Tabs
              className="mt-5"
              options={services}
              value={service}
              onChange={setService}
              ariaLabel="Choose a service to log on to"
            />

            <div className="mt-6 flex gap-3 rounded-xl border border-line bg-cba-yellow-tint p-4">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-black" />
              <p className="text-sm text-ink-soft">
                <strong className="text-black">Demo mode.</strong> Any client number and password
                are accepted. The fields are pre-filled with{" "}
                <code className="font-semibold">{demoCredentials.clientNumber}</code> /{" "}
                <code className="font-semibold">{demoCredentials.password}</code>.
              </p>
            </div>

            <form className="mt-6 space-y-5" onSubmit={submit}>
              <TextField
                label="Client number"
                inputMode="numeric"
                autoComplete="username"
                value={clientNumber}
                onChange={(event) => setClientNumber(event.target.value)}
                error={error ?? undefined}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button type="submit" size="lg" className="w-full">
                <Lock aria-hidden="true" className="h-4 w-4" />
                Log on
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
              <Link to="/support" className="focus-ring rounded font-semibold text-black underline">
                Forgotten your password?
              </Link>
              <Link
                to="/register"
                className="focus-ring rounded font-semibold text-black underline"
              >
                Register for NetBank
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-black">Staying safe online</h2>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="rounded-xl border border-line bg-surface-tint p-5">
                We will never ask for your password, NetCode or full card number by phone, email or
                text.
              </li>
              <li className="rounded-xl border border-line bg-surface-tint p-5">
                Use CallerCheck in the CommBank app to confirm a call from us is genuine.
              </li>
              <li className="rounded-xl border border-line bg-surface-tint p-5">
                Forward suspicious messages to hoax@cba.com.au, then lock your cards in the app.
              </li>
            </ul>
            <p className="text-xs text-ink-muted">
              This is a demo application. No real credentials are ever accepted, transmitted or
              stored — your session lives only in this browser.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
