import type { Metadata } from "next";
import { RechargePanel } from "@/components/myoptus/recharge-panel";

export const metadata: Metadata = {
  title: "Recharge",
};

export default function RechargePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Recharge</h2>
        <p className="mt-1 text-sm text-optus-ink-soft">
          Top up your prepaid service in seconds. This is a demo — no payment is taken.
        </p>
      </div>
      <RechargePanel />
    </div>
  );
}
