import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { NineLogo } from "@/components/brand/NineLogo";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function LoginPage() {
  useDocumentTitle("Sign in");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("reader@example.com");
  const [password, setPassword] = useState("demo");

  if (user) return <Navigate to="/account" replace />;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/account");
  };

  return (
    <PageLayout hideTicker>
      <div className="mx-auto max-w-md rounded-xl border border-nine-line bg-white p-8 shadow-sm">
        <NineLogo className="h-6 text-nine-ink" />
        <h1 className="mt-4 font-display text-3xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-nine-muted">Demo mode — any email and password work.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
            Sign in
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-nine-muted">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-nine-blue">
            Create an account
          </Link>
        </p>
      </div>
    </PageLayout>
  );
}
