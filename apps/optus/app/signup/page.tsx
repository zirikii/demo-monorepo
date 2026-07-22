import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a My Optus account.",
};

export default function SignupPage() {
  return (
    <div className="bg-surface-subtle">
      <div className="container flex min-h-[70vh] items-center justify-center py-14">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-sm">
          <Link href="/" className="mb-6 inline-flex" aria-label="Optus home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.svg" alt="Optus" className="h-6 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-optus-ink">Create your My Optus account</h1>
          <p className="mt-1 text-sm text-optus-ink-soft">
            Join Optus in a couple of steps. It starts with yes.
          </p>
          <div className="mt-6">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
