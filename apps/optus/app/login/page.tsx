import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return <div className="container flex justify-center py-16"><div className="w-full max-w-md rounded-lg border border-line bg-white p-8 shadow-sm"><img src="/brand/logo.svg" alt="Optus" className="h-10 w-auto" /><h1 className="mt-6 text-2xl font-black text-optus-ink">Sign in to My Optus</h1><p className="mt-2 text-sm text-optus-ink/70">Manage usage, bills, add-ons and plans.</p><div className="mt-8"><Suspense fallback={<p className="text-sm">Loading...</p>}><LoginForm /></Suspense></div></div></div>;
}
