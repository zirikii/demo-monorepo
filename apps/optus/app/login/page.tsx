import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to My Optus.",
};

export default function LoginPage() {
  return (
    <div className="bg-surface-subtle">
      <div className="container flex min-h-[70vh] items-center justify-center py-14">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-sm">
          <Link href="/" className="mb-6 inline-flex" aria-label="Optus home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.svg" alt="Optus" className="h-6 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-optus-ink">Sign in to My Optus</h1>
          <p className="mt-1 text-sm text-optus-ink-soft">
            Manage your services, usage and bills in one place.
          </p>
          <div className="mt-6">
            <Suspense fallback={<div className="h-64" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
