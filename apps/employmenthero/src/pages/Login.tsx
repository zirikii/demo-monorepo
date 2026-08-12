import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { DEMO_CREDENTIALS } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { DemoPortal } from "@/lib/auth";

const PORTALS: Record<DemoPortal, { title: string; blurb: string }> = {
  employer: {
    title: "Employment OS",
    blurb: "HR, payroll, hiring and reporting for your business.",
  },
  employee: {
    title: "Employment Hero Work",
    blurb: "Shifts, payslips, benefits and Earned Wage Access.",
  },
  partner: {
    title: "Partner Network",
    blurb: "Manage your client book and practice reporting.",
  },
};

function resolvePortal(value: string | null): DemoPortal {
  if (value === "employee" || value === "partner") return value;
  return "employer";
}

const schema = z.object({
  email: z.string().min(1, "Enter your email address").email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

type LoginValues = z.infer<typeof schema>;

export default function LoginPage() {
  useDocumentTitle("Log in");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [failed, setFailed] = useState(false);

  const portal = resolvePortal(searchParams.get("portal"));
  const redirect = searchParams.get("redirect");
  const details = PORTALS[portal];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: DEMO_CREDENTIALS.email,
      password: DEMO_CREDENTIALS.password,
    },
  });

  const onSubmit = handleSubmit((values) => {
    const session = login(values.email, values.password);
    if (!session) {
      setFailed(true);
      return;
    }
    setFailed(false);
    navigate(redirect ? decodeURIComponent(redirect) : session.landing, { replace: true });
  });

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <div className="hidden flex-col justify-between bg-eh-purple-deep p-12 text-white lg:flex">
        <Link to="/" className="focus-eh w-fit">
          <BrandLogo tone="light" />
        </Link>
        <div className="flex flex-col gap-5">
          <h2 className="text-balance-eh text-4xl font-extrabold tracking-tight">
            Every part of employment, intelligently run.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-eh-violet-soft">
            350,000+ Australian businesses run hiring, HR, payroll and benefits on Employment Hero.
          </p>
        </div>
        <p className="text-sm text-eh-violet-soft">
          Unofficial demo build. Not affiliated with Employment Hero Pty Ltd.
        </p>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-14">
        <div className="w-full max-w-md">
          <Link to="/" className="focus-eh mb-10 inline-flex lg:hidden">
            <BrandLogo />
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight text-ink-strong">
            Log in to {details.title}
          </h1>
          <p className="mt-2 text-[0.98rem] text-ink-soft">{details.blurb}</p>

          <div className="mt-6 flex items-start gap-3 rounded-eh bg-eh-tint px-4 py-3.5">
            <Lock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-eh-purple" />
            <p className="text-sm leading-relaxed text-eh-purple-dark">
              Demo credentials are pre-filled for you — <strong>{DEMO_CREDENTIALS.email}</strong> with
              the password <strong>{DEMO_CREDENTIALS.password}</strong>.
            </p>
          </div>

          {failed ? (
            <div
              role="alert"
              className="mt-4 flex items-start gap-3 rounded-eh border border-critical/30 bg-critical-tint px-4 py-3.5"
            >
              <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-critical" />
              <p className="text-sm leading-relaxed text-critical">
                We couldn&apos;t verify those details. Check your email address and password and try
                again.
              </p>
            </div>
          ) : null}

          <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-5">
            <Field label="Email address" htmlFor="email" error={errors.email?.message}>
              <TextInput
                id="email"
                type="email"
                autoComplete="username"
                placeholder="you@business.com.au"
                {...register("email")}
              />
            </Field>

            <Field label="Password" htmlFor="password" error={errors.password?.message}>
              <TextInput
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                {...register("password")}
              />
            </Field>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-soft">
                <input type="checkbox" className="h-4 w-4 rounded border-line accent-[#7622d7]" />
                Keep me logged in
              </label>
              <Link to="/support" className="focus-eh font-semibold text-eh-purple hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Logging in…" : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-ink-soft">
            New to Employment Hero?{" "}
            <Link to="/signup" className="focus-eh font-semibold text-eh-purple hover:underline">
              Create an account
            </Link>
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm">
            <Link to="/login" className="focus-eh text-ink-faint hover:text-eh-purple">
              Employer login
            </Link>
            <Link to="/login?portal=employee" className="focus-eh text-ink-faint hover:text-eh-purple">
              Employee login
            </Link>
            <Link to="/login?portal=partner" className="focus-eh text-ink-faint hover:text-eh-purple">
              Partner login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
