import { TopUpForm } from "@/components/myoptus/top-up-form";

export default function TopUpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-optus-ink">Recharge</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Top up your prepaid service in seconds.</p>
      </div>
      <TopUpForm />
    </div>
  );
}
