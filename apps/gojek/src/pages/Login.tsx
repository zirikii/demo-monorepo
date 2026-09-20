import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { DEMO_ACCOUNTS } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(4, "Enter your demo password"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  useDocumentTitle("Sign in");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);

  const redirect = searchParams.get("redirect") ?? "/hub";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "candidate@gojek.io", password: "gotroops2026" },
  });

  if (user) return <Navigate to={redirect} replace />;

  async function onSubmit(values: LoginValues) {
    setFormError(null);
    await new Promise((resolve) => setTimeout(resolve, 350));
    const session = login(values.email, values.password);
    if (!session) {
      setFormError(
        "Those credentials do not match a demo account. Try one of the two listed below.",
      );
      return;
    }
    navigate(redirect, { replace: true });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="hidden flex-col justify-between bg-night p-12 text-white lg:flex">
        <Link to="/" className="focus-go w-fit" aria-label="Gojek Tech home">
          <BrandLogo className="h-8" />
        </Link>
        <div className="flex flex-col gap-5">
          <h1 className="display-go text-5xl">
            Candidate hub
            <br />
            <span className="text-go-green-soft">for GoTroops in the making.</span>
          </h1>
          <p className="max-w-md text-lg text-white/65">
            Track your applications, review upcoming interviews, and keep your saved roles in one
            place.
          </p>
        </div>
        <p className="text-xs text-white/40">
          Unofficial demo build. Not affiliated with Gojek or GoTo Group.
        </p>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="focus-go mb-8 inline-block text-ink lg:hidden"
            aria-label="Gojek Tech home"
          >
            <BrandLogo className="h-7" />
          </Link>

          <h2 className="display-go text-3xl text-ink-strong">Sign in</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Demo mode: the form is pre-filled with a working account. Sessions live in this browser
            only.
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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

            {formError ? (
              <p
                role="alert"
                className="rounded-go-sm bg-critical-tint px-4 py-3 text-sm font-semibold text-critical"
              >
                {formError}
              </p>
            ) : null}

            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-8 rounded-go-lg bg-surface-tint p-5">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-ghost uppercase">
              Demo accounts
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {DEMO_ACCOUNTS.map((account) => (
                <li key={account.email} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-ink-soft">
                    <span className="font-bold text-ink-strong">{account.email}</span>
                    <span className="block text-xs">{account.headline}</span>
                  </span>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setValue("email", account.email);
                      setValue(
                        "password",
                        account.email === "candidate@gojek.io" ? "gotroops2026" : "asphalt2026",
                      );
                    }}
                  >
                    Use
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-sm text-ink-faint">
            <Link to="/" className="focus-go font-bold text-go-green hover:underline">
              Back to gojek.io
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
