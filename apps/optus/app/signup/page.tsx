import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return <div className="container flex justify-center py-16"><div className="w-full max-w-md rounded-lg border border-line bg-white p-8 shadow-sm"><img src="/brand/logo.svg" alt="Optus" className="h-10 w-auto" /><h1 className="mt-6 text-2xl font-black text-optus-ink">Create a demo account</h1><p className="mt-2 text-sm text-optus-ink/70">Stored locally in data/users.json.</p><div className="mt-8"><SignupForm /></div></div></div>;
}
