import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { PRODUCT_APPS, getProductApp, isDemoPortal, type DemoPortal } from "@/data/apps";
import { DISCLAIMER, PORTAL_CREDENTIALS } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function resolvePortal(value: string | null): DemoPortal {
  if (isDemoPortal(value)) return value;
  return "jira";
}

function portalLoginTo(next: DemoPortal, redirect: string | null): string {
  const qs = new URLSearchParams();
  qs.set("portal", next);
  if (redirect) qs.set("redirect", redirect);
  return `/login?${qs}`;
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
  const details = getProductApp(portal);
  const credentials = PORTAL_CREDENTIALS[portal];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  useEffect(() => {
    reset({
      email: PORTAL_CREDENTIALS[portal].email,
      password: PORTAL_CREDENTIALS[portal].password,
    });
    setFailed(false);
  }, [portal, reset]);

  const onSubmit = handleSubmit((values) => {
    const session = login(values.email, values.password, portal);
    if (!session) {
      setFailed(true);
      return;
    }
    setFailed(false);
    navigate(redirect || details.path, { replace: true });
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-tint px-4 py-12">
      <div className="w-full max-w-[400px] rounded-atl bg-white px-8 py-10 shadow-atl-lift">
        <Link to="/" className="focus-atl mx-auto mb-6 flex w-fit">
          <BrandLogo showWordmark={false} markClassName="h-10 w-10" />
        </Link>

        <h1 className="text-center text-[1.375rem] font-semibold tracking-tight text-ink-strong">
          Log in to {details.name}
        </h1>
        <p className="mt-1 text-center text-sm text-ink-soft">{details.blurb}</p>
        <p className="mt-3 text-center text-xs leading-relaxed text-ink-faint">
          Pre-filled with <strong className="text-ink-soft">{credentials.email}</strong> /{" "}
          <strong className="text-ink-soft">{credentials.password}</strong>.
        </p>

        {failed ? (
          <div
            role="alert"
            className="mt-5 flex items-start gap-3 rounded-atl border border-critical/30 bg-critical-tint px-3.5 py-3"
          >
            <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-critical" />
            <p className="text-sm leading-relaxed text-critical">
              We couldn&apos;t verify those details. Check your email address and password and try
              again.
            </p>
          </div>
        ) : null}

        <form
          key={portal}
          onSubmit={onSubmit}
          noValidate
          className="mt-6 flex flex-col gap-4"
        >
          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <TextInput
              id="email"
              type="email"
              autoComplete="username"
              placeholder="Enter your email"
              {...register("email")}
            />
          </Field>

          <Field label="Password" htmlFor="password" error={errors.password?.message}>
            <TextInput
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password"
              {...register("password")}
            />
          </Field>

          <Button
            type="submit"
            size="lg"
            shape="box"
            disabled={isSubmitting}
            className="mt-1 w-full"
          >
            {isSubmitting ? "Continuing…" : "Continue"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm">
          <Link to="/support" className="focus-atl font-semibold text-atl-blue-deep hover:underline">
            Can&apos;t log in?
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-ink-soft">
          New to Atlassian?{" "}
          <Link to="/signup" className="focus-atl font-semibold text-atl-blue-deep hover:underline">
            Create an account
          </Link>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-line-soft pt-5 text-xs">
          {PRODUCT_APPS.map((app) => (
            <Link
              key={app.portal}
              to={portalLoginTo(app.portal, redirect)}
              className="focus-atl text-ink-faint hover:text-atl-blue-deep"
            >
              {app.name} login
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-6 max-w-[400px] text-center text-[11px] leading-relaxed text-ink-faint">
        {DISCLAIMER}
      </p>
    </div>
  );
}
