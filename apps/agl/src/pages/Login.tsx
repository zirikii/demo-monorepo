import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Info } from "lucide-react";
import { AglRays } from "@/components/brand/AglRays";
import { Logo } from "@/components/brand/Logo";
import { DEMO_USER } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});
type Values = z.infer<typeof schema>;

export function LoginPage() {
  useDocumentTitle("Log in to My Account");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect");
  const target = redirect?.startsWith("/") && !redirect.startsWith("//") ? redirect : "/account";
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: DEMO_USER.email, password: "demo1234" } });

  if (user) return <Navigate to={target} replace />;

  const onSubmit = handleSubmit((values) => {
    login(values.email, values.password);
    navigate(target, { replace: true });
  });

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Link to="/" aria-label="AGL home">
          <Logo className="h-12 w-auto" />
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="text-3xl font-extrabold text-agl-blue-dark">Log in to My Account</h1>
          <p className="mt-2 text-ink-soft">Manage your bills, usage and services.</p>

          <p className="mt-6 flex gap-2 rounded-agl bg-agl-sky p-3 text-sm text-agl-blue-dark">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Demo mode: any email and password will log you in as {DEMO_USER.firstName} {DEMO_USER.lastName}.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-bold text-ink-soft">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                className="mt-1 h-12 w-full rounded-agl border border-line px-4 focus:border-agl-blue focus:ring-2 focus:ring-agl-blue/20 focus:outline-none"
                {...register("email")}
              />
              {errors.email && <p className="mt-1 text-sm text-critical">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold text-ink-soft">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  className="h-12 w-full rounded-agl border border-line pr-12 pl-4 focus:border-agl-blue focus:ring-2 focus:ring-agl-blue/20 focus:outline-none"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 text-ink-faint hover:bg-surface-tint"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-critical">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-full bg-agl-blue font-extrabold text-white hover:bg-agl-blue-hover">
              Log in
            </button>
          </form>
          <div className="mt-4 flex justify-between text-sm">
            <Link to="/help/online-security/two-factor-authentication" className="font-bold text-agl-blue hover:underline">
              Forgot password?
            </Link>
            <Link to="/energy" className="font-bold text-agl-blue hover:underline">
              New to AGL? Join now
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-agl-blue-dark via-agl-blue to-[#0078d4] lg:block">
        <AglRays className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-90" animated />
        <p className="absolute right-12 bottom-12 left-12 text-2xl font-extrabold text-white">
          Your energy, internet and mobile — all in one account.
        </p>
      </div>
    </div>
  );
}
