import type { Metadata } from "next";
import { UsageMeter } from "@/components/myoptus/usage-meter";

export const metadata: Metadata = {
  title: "Usage",
};

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Usage</h2>
        <p className="mt-1 text-sm text-optus-ink-soft">
          Your current billing cycle resets on 5 Aug 2026.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <UsageMeter label="Data" used={112} total={180} unit="GB" />
        <UsageMeter label="International talk" used={45} total={200} unit="min" />
        <UsageMeter label="International text" used={12} total={200} unit="SMS" />
        <UsageMeter label="Optus Sport streaming" used={38} total={100} unit="hrs" />
      </div>

      <div className="rounded-lg border border-line bg-white p-5">
        <h3 className="font-semibold text-optus-ink">National talk & text</h3>
        <p className="mt-1 text-sm text-optus-ink-soft">
          Unlimited standard national talk & text is included on your Optus Choice Plus plan — no
          usage cap applies.
        </p>
      </div>
    </div>
  );
}
