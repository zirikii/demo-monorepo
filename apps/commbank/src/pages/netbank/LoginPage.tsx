import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  clientNumber: z.string().trim().min(1, "Enter your client number"),
  password: z.string().min(1, "Enter your password"),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { profile, signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirect = params.get("redirect");
  const destination = redirect?.startsWith("/netbank") ? redirect : "/netbank";
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { clientNumber: "12345678", password: "demo" },
  });

  if (profile) return <Navigate replace to={destination} />;

  return (
    <main className="grid min-h-screen bg-cba-neutral lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex items-center justify-center bg-cba-ink p-8 text-white">
        <div className="max-w-md">
          <img className="h-14 rounded-xl bg-white px-2" src="/brand/commbank-logo.svg" alt="CommBank" />
          <p className="mt-10 font-semibold text-cba-yellow">NetBank demo</p>
          <h1 className="mt-3 text-4xl font-bold">A safe way to explore online banking</h1>
          <p className="mt-5 leading-7 text-white/75">
            Use fictional accounts and payments. Nothing leaves this browser and no real money can move.
          </p>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/20 p-4 text-sm">
            <ShieldCheck aria-hidden="true" className="h-6 w-6 shrink-0 text-cba-yellow" />
            <p>Never enter real CommBank credentials into this demonstration.</p>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-card sm:p-10">
          <LockKeyhole aria-hidden="true" className="h-8 w-8 text-cba-positive" />
          <h2 className="mt-4 text-3xl font-bold">Log on to NetBank</h2>
          <p className="mt-2 text-sm text-cba-ink-soft">Demo credentials are pre-filled. Any non-empty values work.</p>
          <div className="mt-5 rounded-xl bg-cba-info-soft p-4 text-sm text-cba-info">
            <strong>Demo mode:</strong> Client number 12345678 · Password demo
          </div>
          <form
            className="mt-7 space-y-5"
            onSubmit={handleSubmit(({ clientNumber, password }) => {
              signIn(clientNumber, password);
              navigate(destination, { replace: true });
            })}
          >
            <label className="block text-sm font-semibold">Client number
              <input className="field mt-2" autoComplete="username" inputMode="numeric" {...register("clientNumber")} />
              {errors.clientNumber ? <span className="mt-1 block text-xs text-cba-critical">{errors.clientNumber.message}</span> : null}
            </label>
            <label className="block text-sm font-semibold">Password
              <span className="relative mt-2 block">
                <input className="field pr-12" type={showPassword ? "text" : "password"} autoComplete="current-password" {...register("password")} />
                <button
                  className="absolute right-2 top-1.5 rounded-lg p-2"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff aria-hidden="true" className="h-5 w-5" /> : <Eye aria-hidden="true" className="h-5 w-5" />}
                </button>
              </span>
              {errors.password ? <span className="mt-1 block text-xs text-cba-critical">{errors.password.message}</span> : null}
            </label>
            <Button className="w-full" type="submit">Log on securely</Button>
          </form>
          <div className="mt-6 flex justify-between text-sm">
            <Link className="underline" to="/support/security">Security help</Link>
            <Link className="underline" to="/">Return to public site</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
