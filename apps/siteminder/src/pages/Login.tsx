import { Eye, EyeOff, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { DEMO_USER, safeNext } from "@/lib/auth";
import { asset } from "@/lib/asset";

export function LoginPage() {
  useDocumentTitle("Login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState(DEMO_USER.email);
  const [password, setPassword] = useState("demo-password");
  const [show, setShow] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate(safeNext(params.get("next")), { replace: true });
  };

  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-16">
        <form
          onSubmit={submit}
          className="w-full max-w-sm animate-fade-up"
          aria-labelledby="login-title"
        >
          <Logo className="h-6" />
          <h1 id="login-title" className="mt-8 text-3xl font-bold">
            Log in to SiteMinder
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Demo mode: any email and password will sign you in.
          </p>
          <label className="mt-8 block text-sm font-semibold text-heading" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            className="field mt-1.5"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="mt-4 block text-sm font-semibold text-heading" htmlFor="login-password">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="login-password"
              className="field pr-11"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center text-ink-faint hover:text-heading"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? (
                <EyeOff className="size-4" aria-hidden />
              ) : (
                <Eye className="size-4" aria-hidden />
              )}
            </button>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <label className="flex items-center gap-2 text-ink-soft">
              <input type="checkbox" defaultChecked className="size-4 accent-royal" /> Remember me
            </label>
            <span className="text-ink-faint">Forgot password?</span>
          </div>
          <button type="submit" className="btn-primary mt-6 w-full py-3">
            <Lock className="size-4" aria-hidden /> Log in
          </button>
          <p className="mt-6 text-center text-sm text-ink-soft">
            New to SiteMinder?{" "}
            <Link to="/get-started" className="link">
              Start a free trial
            </Link>
          </p>
        </form>
      </div>
      <div className="sm-night relative hidden overflow-hidden lg:block">
        <img
          src={asset("brand/media/hero-booked.webp")}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="relative flex h-full flex-col justify-end p-14 text-white">
          <span className="pill w-fit bg-lime text-stratos">BOOKED</span>
          <p className="mt-4 max-w-md text-3xl font-bold leading-tight text-white">
            Every channel, every rate and every booking — in one place.
          </p>
          <p className="mt-3 max-w-md text-white/70">
            Stuck? SiteMinder Support is in the corner of every page, by chat or voice, 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}
