import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { Card, SectionHeading } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { demoCredentials } from "@/lib/auth";

const requirements = [
  "Your CommBank card, or your existing NetBank client number",
  "A valid email address and Australian mobile number",
  "Photo identification if you're opening your first account",
];

export function RegisterPage() {
  useDocumentTitle("Register for NetBank");
  const navigate = useNavigate();
  const { logon } = useAuth();
  const [form, setForm] = useState({
    firstName: "Alex",
    lastName: "Mitchell",
    email: demoCredentials.email,
    mobile: "0412 884 902",
    cardNumber: "5163 2200 1188 4021",
  });
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.firstName.trim() || !form.email.trim()) {
      setError("Enter your first name and email address.");
      return;
    }
    setError(null);
    logon(demoCredentials.clientNumber, demoCredentials.password);
    navigate("/netbank", { replace: true });
  };

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Register for NetBank" }]} />
      <PageHero
        eyebrow="Register"
        title="Register for NetBank"
        description="Register online using your CommBank card, or open an Everyday account in under 5 minutes and get registered automatically."
        tone="light"
      />

      <section className="py-12">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,540px)_1fr] lg:items-start">
          <Card className="p-8">
            <h2 className="text-xl font-bold text-black">Your details</h2>

            <div className="mt-5 flex gap-3 rounded-xl border border-line bg-cba-yellow-tint p-4">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-black" />
              <p className="text-sm text-ink-soft">
                <strong className="text-black">Demo mode.</strong> The form is pre-filled and
                nothing is validated or sent anywhere. Submitting logs you straight in to the mock
                NetBank.
              </p>
            </div>

            <form className="mt-6 space-y-5" onSubmit={submit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="First name"
                  value={form.firstName}
                  onChange={update("firstName")}
                  error={error ?? undefined}
                />
                <TextField label="Last name" value={form.lastName} onChange={update("lastName")} />
              </div>
              <TextField
                label="Email address"
                type="email"
                value={form.email}
                onChange={update("email")}
              />
              <TextField
                label="Mobile number"
                inputMode="tel"
                value={form.mobile}
                onChange={update("mobile")}
                hint="We'd send a NetCode here to confirm it's you"
              />
              <TextField
                label="CommBank card number"
                inputMode="numeric"
                value={form.cardNumber}
                onChange={update("cardNumber")}
              />
              <Button type="submit" size="lg" className="w-full">
                Register and continue
              </Button>
            </form>
          </Card>

          <div>
            <SectionHeading title="What you'll need" />
            <ul className="mt-6 space-y-3">
              {requirements.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-line bg-surface-tint p-5 text-sm text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-muted">
              No identity check happens in this demo. Nothing you type here leaves your browser.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
