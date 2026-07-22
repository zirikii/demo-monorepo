import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <div className="container flex justify-center py-16">
      <div className="w-full max-w-md rounded-lg border border-line bg-white p-8 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo.svg" alt="Optus" className="h-9 w-auto" />
        <h1 className="mt-6 text-2xl font-extrabold text-optus-ink">Join Optus</h1>
        <p className="mt-2 text-sm text-optus-ink/70">Create a demo My Optus account in seconds.</p>
        <div className="mt-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
