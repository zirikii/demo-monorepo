import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { Toast } from "@/components/ui/Toast";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { useAuth } from "@/hooks/useAuth";
import { readIntegrations, readProfile, toggleIntegration, writeProfile } from "@/lib/settings";

export default function PortalSettingsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(() =>
    readProfile({
      name: user?.name ?? "",
      role: user?.role ?? "",
      hub: user?.hub ?? "Jakarta",
      team: user?.team ?? "Gojek Tech",
      bio: "Candidate in the unofficial Gojek Tech demo portal.",
    }),
  );
  const [integrations, setIntegrations] = useState(readIntegrations);
  const [toast, setToast] = useState<string | null>(null);

  return (
    <PortalLayout title="Settings">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <section className="mt-8 max-w-xl space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <Field htmlFor="name" label="Name">
          <TextInput
            id="name"
            value={profile.name}
            onChange={(event) => setProfile({ ...profile, name: event.target.value })}
          />
        </Field>
        <Field htmlFor="role" label="Role">
          <TextInput
            id="role"
            value={profile.role}
            onChange={(event) => setProfile({ ...profile, role: event.target.value })}
          />
        </Field>
        <Field htmlFor="hub" label="Hub">
          <Select
            id="hub"
            value={profile.hub}
            onChange={(event) => setProfile({ ...profile, hub: event.target.value })}
          >
            <option>Jakarta</option>
            <option>Singapore</option>
            <option>Bangalore</option>
          </Select>
        </Field>
        <Field htmlFor="team" label="Team">
          <TextInput
            id="team"
            value={profile.team}
            onChange={(event) => setProfile({ ...profile, team: event.target.value })}
          />
        </Field>
        <Field htmlFor="bio" label="Bio">
          <TextArea
            id="bio"
            value={profile.bio}
            onChange={(event) => setProfile({ ...profile, bio: event.target.value })}
          />
        </Field>
        <Button
          onClick={() => {
            writeProfile(profile);
            setToast("Profile saved locally");
          }}
        >
          Save profile
        </Button>
      </section>
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Hiring squad</h2>
        <p className="mt-2 text-sm text-go-muted">
          Dummy team — Aisha (candidate), Dimas (coordinator). No real calendar invites.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Integrations</h2>
        <ul className="mt-4 divide-y divide-white/8">
          {integrations.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-go-faint">{item.description}</p>
              </div>
              <Button
                variant={item.enabled ? "primary" : "secondary"}
                size="sm"
                onClick={() => {
                  setIntegrations(toggleIntegration(item.id));
                  setToast(`${item.name} ${item.enabled ? "disabled" : "enabled"}`);
                }}
              >
                {item.enabled ? "On" : "Off"}
              </Button>
            </li>
          ))}
        </ul>
      </section>
      <Toast message={toast} onDismiss={() => setToast(null)} />
    </PortalLayout>
  );
}
