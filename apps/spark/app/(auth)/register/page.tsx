import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create a Spark ID",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const redirectTo = redirect && redirect.startsWith("/") ? redirect : "/dashboard";

  return (
    <div className="rounded-2xl border border-line bg-white p-8 shadow-card">
      <h1 className="text-2xl font-bold text-spark-ink">Create your Spark ID</h1>
      <p className="mt-1 text-sm text-ink-secondary">
        One login for mobile, broadband and My Spark.
      </p>
      <div className="mt-6">
        <RegisterForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
