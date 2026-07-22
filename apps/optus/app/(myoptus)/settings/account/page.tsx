import { getCurrentUser } from "@/lib/auth/current-user";

export default async function AccountSettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-lg border border-line bg-white p-6">
        <h3 className="font-bold text-optus-ink">Billing account</h3>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase text-optus-ink/50">Account name</dt>
            <dd className="mt-1 font-semibold text-optus-ink">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-optus-ink/50">Email</dt>
            <dd className="mt-1 font-semibold text-optus-ink">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-optus-ink/50">Account number</dt>
            <dd className="mt-1 font-semibold text-optus-ink">OPT-4471-2290</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-optus-ink/50">Billing cycle</dt>
            <dd className="mt-1 font-semibold text-optus-ink">5th of each month</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-lg border border-line bg-white p-6">
        <h3 className="font-bold text-optus-ink">Payment methods</h3>
        <ul className="mt-4 space-y-3">
          <li className="flex items-center justify-between rounded-md border border-line px-4 py-3">
            <span className="font-semibold text-optus-ink">Visa ···· 4021</span>
            <span className="text-xs font-semibold text-optus-teal">Default</span>
          </li>
          <li className="flex items-center justify-between rounded-md border border-line px-4 py-3">
            <span className="font-semibold text-optus-ink">Apple Pay</span>
            <span className="text-xs text-optus-ink/60">Backup</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
