import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="container flex justify-center py-16">
      <div className="w-full max-w-md rounded-lg border border-line bg-white p-8 shadow-sm">
        <img src="/brand/logo.svg" alt="Spark NZ" className="h-10 w-auto" />
        <h1 className="mt-6 text-2xl font-bold text-spark-ink">Sign in to MySpark</h1>
        <p className="mt-2 text-sm text-spark-ink/70">Manage usage, bills, top-ups and plans.</p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
