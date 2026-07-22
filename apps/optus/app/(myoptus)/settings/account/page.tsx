import type { Metadata } from "next";
import { SettingsTabs } from "@/components/myoptus/settings-tabs";

export const metadata: Metadata = {
  title: "Account settings",
};

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-optus-ink">Settings</h2>
      <SettingsTabs />
      <div className="max-w-xl space-y-4 rounded-lg border border-line bg-white p-6">
        <h3 className="text-lg font-bold text-optus-ink">Account & security</h3>
        <div>
          <p className="text-sm font-semibold text-optus-ink">Password</p>
          <p className="text-sm text-optus-ink-soft">Last changed 3 months ago.</p>
          <button
            type="button"
            className="mt-2 inline-flex h-10 items-center rounded-md border border-optus-ink px-4 text-sm font-semibold text-optus-ink hover:bg-surface-muted"
          >
            Change password
          </button>
        </div>
        <div className="border-t border-line pt-4">
          <p className="text-sm font-semibold text-optus-ink">Two-step verification</p>
          <p className="text-sm text-optus-ink-soft">
            Add an extra layer of security to your My Optus account.
          </p>
          <button
            type="button"
            className="mt-2 inline-flex h-10 items-center rounded-md bg-optus-yellow px-4 text-sm font-semibold text-optus-ink hover:bg-optus-yellow-dark"
          >
            Turn on 2SV
          </button>
        </div>
      </div>
    </div>
  );
}
