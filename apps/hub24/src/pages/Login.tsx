import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { DEMO_ACCOUNTS } from "@/lib/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(4, "Enter your password"),
});

type FormValues = z.infer<typeof schema>;

const PORTAL_LABELS: Record<string, string> = {
  adviser: "AdviserHUB",
  investor: "InvestorHUB",
  licensee: "Licensee portal",
};

/** Demo credentials are surfaced in the UI on purpose — this login accepts nothing else. */
const DEMO_CREDENTIALS: Record<string, { email: string; password: string }> = {
  adviser: { email: "adviser@hub24.com.au", password: "platform2026" },
  investor: { email: "investor@hub24.com.au", password: "invest2026" },
  licensee: { email: "licensee@hub24.com.au", password: "licensee2026" },
};

export default function LoginPage() {
  const [params] = useSearchParams();
  const portal = params.get("portal") ?? "adviser";
  const credentials = DEMO_CREDENTIALS[portal] ?? DEMO_CREDENTIALS.adviser!;
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(`Log in to ${PORTAL_LABELS[portal] ?? "AdviserHUB"}`);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: credentials,
  });

  function onSubmit(values: FormValues) {
    const user = login(values.email, values.password);
    if (!user) {
      setError("Those credentials don't match a demo account. Use the pre-filled details below.");
      return;
    }
    navigate(user.landing, { replace: true });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col justify-between bg-hub-navy p-10 text-white">
        <Link to="/" className="focus-hub" aria-label="HUB24 home">
          <BrandLogo tone="light" descriptor="Platform · Technology · Data" />
        </Link>
        <div className="flex max-w-md flex-col gap-4 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Log in to {PORTAL_LABELS[portal] ?? "AdviserHUB"}
          </h1>
          <p className="text-lg text-white/80">
            AdviserHUB gives you portfolio reporting, trading, applications and Engage presentations
            for every client account you administer.
          </p>
          <ul className="flex flex-col gap-2 text-white/70">
            {Object.entries(PORTAL_LABELS).map(([key, label]) => (
              <li key={key}>
                <Link
                  to={`/login?portal=${key}`}
                  className="focus-hub font-semibold text-hub-teal-soft underline underline-offset-4"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-white/50">
          Unofficial demo. Sessions are stored in your browser and any data shown is fictional.
        </p>
      </div>

      <div className="flex items-center justify-center bg-surface-tint p-6">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md flex-col gap-5 rounded-hub-lg border border-line bg-white p-8 shadow-hub"
        >
          <div className="flex items-center gap-2 text-hub-blue">
            <Lock aria-hidden className="h-5 w-5" />
            <span className="text-sm font-extrabold tracking-[0.14em] uppercase">
              Secure sign in
            </span>
          </div>

          <TextField
            label="Email"
            type="email"
            autoComplete="username"
            error={errors.email?.message}
            {...register("email")}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          {error ? (
            <p
              role="alert"
              className="rounded-hub bg-critical-tint px-4 py-3 text-sm font-semibold text-critical"
            >
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" disabled={isSubmitting}>
            Log in
          </Button>

          <div className="rounded-hub border border-dashed border-line bg-surface-tint p-4 text-sm">
            <p className="font-bold text-ink-strong">Demo credentials</p>
            <ul className="mt-2 flex flex-col gap-1 text-ink-soft">
              {DEMO_ACCOUNTS.map((account) => (
                <li key={account.email} className="flex justify-between gap-3">
                  <span>{account.email}</span>
                  <span className="font-semibold text-ink-faint">{account.portal}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-ink-faint">
              Passwords: platform2026 / invest2026 / licensee2026. The form is pre-filled for the
              portal you selected.
            </p>
          </div>

          <Link to="/" className="focus-hub text-sm font-bold text-hub-blue">
            Back to hub24.com.au
          </Link>
        </form>
      </div>
    </div>
  );
}
