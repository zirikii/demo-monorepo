import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in to Spark ID",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const redirectTo = redirect && redirect.startsWith("/") ? redirect : "/dashboard";

  return (
    <div className="rounded-2xl border border-line bg-white p-8 shadow-card">
      <h1 className="text-2xl font-bold text-spark-ink">Sign in to My Spark</h1>
      <p className="mt-1 text-sm text-ink-secondary">
        Use your Spark ID to manage your plan, roaming and bills.
      </p>
      <div className="mt-4 rounded-lg bg-spark-purple-light px-3 py-2 text-xs text-spark-purple-dark">
        Demo mode: any email and password works. Pre-filled with demo credentials.
      </div>
      <div className="mt-6">
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
