import { getCurrentUser } from "@/lib/auth/current-user";
import { DEMO_CREDENTIALS } from "@/lib/constants";

export default async function AccountSettingsPage() {
  const user = await getCurrentUser();
  return (
    <div className="max-w-lg rounded-lg border border-line bg-white p-6">
      <h2 className="text-xl font-bold">Account</h2>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="font-semibold text-optus-ink/60">Name</dt>
          <dd className="mt-1">{user?.name}</dd>
        </div>
        <div>
          <dt className="font-semibold text-optus-ink/60">Email</dt>
          <dd className="mt-1">{user?.email}</dd>
        </div>
        <div>
          <dt className="font-semibold text-optus-ink/60">Demo hint</dt>
          <dd className="mt-1">
            Default credentials: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
          </dd>
        </div>
      </dl>
    </div>
  );
}
