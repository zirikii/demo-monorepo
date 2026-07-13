import { readJson } from "@/lib/data/json-store";

export default async function ProfileSettingsPage() {
  const settings = await readJson<{
    profile: { phone: string; address: string; preferredContact: string };
  }>("settings.json");

  return (
    <div className="max-w-lg rounded-lg border border-line bg-white p-6">
      <h2 className="text-xl font-bold">Profile</h2>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="font-semibold text-spark-ink/60">Phone</dt>
          <dd className="mt-1">{settings.profile.phone}</dd>
        </div>
        <div>
          <dt className="font-semibold text-spark-ink/60">Address</dt>
          <dd className="mt-1">{settings.profile.address}</dd>
        </div>
        <div>
          <dt className="font-semibold text-spark-ink/60">Preferred contact</dt>
          <dd className="mt-1">{settings.profile.preferredContact}</dd>
        </div>
      </dl>
    </div>
  );
}
