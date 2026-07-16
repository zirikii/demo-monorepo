import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { NineLogo } from "@/components/brand/NineLogo";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SignupPage() {
  useDocumentTitle("Sign up");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("Alex Reader");
  const [email, setEmail] = useState("reader@example.com");
  const [password, setPassword] = useState("demo");

  if (user) return <Navigate to="/account" replace />;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password, name);
    navigate("/account");
  };

  return (
    <PageLayout hideTicker>
      <div className="mx-auto max-w-md rounded-xl border border-nine-line bg-white p-8 shadow-sm">
        <NineLogo className="h-6 text-nine-ink" />
        <h1 className="mt-4 font-display text-3xl font-bold">Create account</h1>
        <p className="mt-2 text-sm text-nine-muted">Demo signup stores a mock session in localStorage.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-nine-line px-3 py-2 text-sm outline-none focus:border-nine-cyan"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-nine-line px-3 py-2 text-sm outline-none focus:border-nine-cyan"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-nine-line px-3 py-2 text-sm outline-none focus:border-nine-cyan"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-nine-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-nine-blue">
            Sign in
          </Link>
        </p>
      </div>
    </PageLayout>
  );
}
