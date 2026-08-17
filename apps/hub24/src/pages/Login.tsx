import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
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
  adviser: {
    title: "AdviserHUB",
    blurb: "Practice and licensee access to clients, orders, managed portfolios and reports.",
  },
  investor: {
    title: "InvestorHUB",
    blurb: "View balances, asset allocation, statements and your adviser’s details.",
  },
  manager: {
    title: "ManagerHUB",
    blurb: "Model control, flows and reporting for professional managers.",
  },
};

function resolvePortal(value: string | null): DemoPortal {
  if (value === "investor" || value === "manager") return value;
  return "adviser";
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
  const prefill =
    portal === "investor"
      ? DEMO_CREDENTIALS.investorEmail
      : portal === "manager"
        ? DEMO_CREDENTIALS.managerEmail
        : DEMO_CREDENTIALS.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: prefill,
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
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <div className="hidden flex-col justify-between bg-hub-navy-deep p-12 text-white lg:flex">
        <Link to="/" className="focus-hub w-fit">
          <BrandLogo tone="light" />
        </Link>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-hub-teal-soft uppercase">{details.title}</p>
          <h1 className="mt-4 font-serif text-4xl font-bold">Welcome back</h1>
          <p className="mt-4 max-w-md text-white/70">{details.blurb}</p>
        </div>
        <p className="text-sm text-white/50">Unofficial demo. Not affiliated with HUB24 Limited.</p>
      </div>
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
        <Link to="/" className="focus-hub mb-10 w-fit lg:hidden">
          <BrandLogo />
        </Link>
        <h2 className="text-2xl font-bold text-ink-strong">Log in to {details.title}</h2>
        <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
          <Lock aria-hidden="true" className="mt-0.5 h-4 w-4" />
          Demo mode — any email and password work. Prefill is {prefill} / {DEMO_CREDENTIALS.password}.
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex max-w-md flex-col gap-4">
          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <TextInput id="email" type="email" autoComplete="username" {...register("email")} />
          </Field>
          <Field label="Password" htmlFor="password" error={errors.password?.message}>
            <TextInput id="password" type="password" autoComplete="current-password" {...register("password")} />
          </Field>
          {failed ? (
            <p role="alert" className="text-xs font-semibold text-critical">
              Enter an email and password to continue.
            </p>
          ) : null}
          <Button type="submit" disabled={isSubmitting}>
            Log in
          </Button>
        </form>
        <p className="mt-6 text-sm text-ink-soft">
          New to the demo?{" "}
          <Link to="/signup" className="font-semibold text-hub-teal hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
