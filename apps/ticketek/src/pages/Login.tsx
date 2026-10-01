import { Eye, EyeOff } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { DEMO_USER, safeNext } from "@/lib/auth";
import { asset } from "@/lib/asset";

type SiteConfig = { name: string; tagline: string };

const siteConfig = {
  Premier: { name: "Ticketek Premier", tagline: "Tickets, orders and Events I've Been To" },
  Marketplace: { name: "Ticketek Marketplace", tagline: "Buy and sell tickets fan to fan" },
} satisfies Record<string, SiteConfig>;

function AuthShell({ title, tagline, children }: { title: string; tagline?: string; children: ReactNode }) {
  return (
    <div className="container-tk flex justify-center py-12">
      <div className="main-content-box w-full max-w-md p-6 md:p-8">
        <img src={asset("brand/ticketek-logo-midnight.svg")} alt="Ticketek" className="mx-auto h-8 w-auto" />
        <h1 className="mt-6 text-center text-2xl font-extrabold">{title}</h1>
        {tagline && <p className="mt-1 text-center text-sm text-ink-faint">{tagline}</p>}
        {children}
      </div>
    </div>
  );
}

export function LoginPage() {
  useDocumentTitle("Sign in");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const siteKey = (params.get("site") ?? "premier") as keyof typeof siteConfig;
  const site = siteConfig[siteKey];
  const [email, setEmail] = useState(DEMO_USER.email);
  const [password, setPassword] = useState("tickets2026");
  const [show, setShow] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate(safeNext(params.get("next")), { replace: true });
  };

  return (
    <AuthShell title={`Sign in to ${site.name}`} tagline={site.tagline}>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">
            Email
          </label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field pr-10"
            />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink-faint">
              {show ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
            </button>
          </div>
        </div>
        <button type="submit" className="btn-primary w-full">
          Sign in
        </button>
        <p className="text-center text-xs text-ink-faint">Demo: any email and password work. The pre-filled account has order history.</p>
      </form>
      <p className="mt-6 text-center text-sm">
        New to Ticketek?{" "}
        <Link to={`/signup${params.get("next") ? `?next=${encodeURIComponent(params.get("next")!)}` : ""}`} className="link">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}

export function SignUpPage() {
  useDocumentTitle("Create an account");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const set = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    register({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email });
    navigate(safeNext(params.get("next")), { replace: true });
  };

  return (
    <AuthShell title="Create your Ticketek account">
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-semibold">
              First name
            </label>
            <input id="firstName" required autoComplete="given-name" value={form.firstName} onChange={set("firstName")} className="field" />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-semibold">
              Last name
            </label>
            <input id="lastName" required autoComplete="family-name" value={form.lastName} onChange={set("lastName")} className="field" />
          </div>
        </div>
        <div>
          <label htmlFor="su-email" className="mb-1 block text-sm font-semibold">
            Email
          </label>
          <input id="su-email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} className="field" />
        </div>
        <div>
          <label htmlFor="su-password" className="mb-1 block text-sm font-semibold">
            Password
          </label>
          <input id="su-password" type="password" required minLength={8} autoComplete="new-password" value={form.password} onChange={set("password")} className="field" />
          <p className="mt-1 text-xs text-ink-faint">At least 8 characters.</p>
        </div>
        <button type="submit" className="btn-primary w-full">
          Create account
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
