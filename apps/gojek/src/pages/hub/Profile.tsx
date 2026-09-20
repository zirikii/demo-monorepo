import { useState } from "react";
import { HubLayout } from "@/components/hub/HubLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { SelectField, TextField } from "@/components/ui/Field";
import { JOB_LOCATIONS, JOB_TEAMS } from "@/data/jobs";
import { useAuth } from "@/hooks/useAuth";
import { readJson, writeJson } from "@/lib/storage";
import { cn } from "@/lib/cn";

interface Preferences {
  preferredTeam: string;
  preferredLocation: string;
  openToRelocation: boolean;
  emailUpdates: boolean;
}

const KEY = "gojek-demo-preferences";

const DEFAULTS: Preferences = {
  preferredTeam: "Marketplace",
  preferredLocation: "Jakarta",
  openToRelocation: true,
  emailUpdates: true,
};

function Toggle({
  label,
  description,
  pressed,
  onToggle,
}: {
  label: string;
  description: string;
  pressed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-go-sm border border-line p-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold text-ink-strong">{label}</span>
        <span className="text-xs text-ink-soft">{description}</span>
      </div>
      <button
        type="button"
        aria-pressed={pressed}
        aria-label={label}
        onClick={onToggle}
        className={cn(
          "focus-go relative h-6 w-11 shrink-0 rounded-full transition",
          pressed ? "bg-go-green" : "bg-surface-deep",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
            pressed ? "left-[1.375rem]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}

export default function HubProfilePage() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Preferences>(() => readJson<Preferences>(KEY, DEFAULTS));
  const [saved, setSaved] = useState(false);

  function update(patch: Partial<Preferences>) {
    setPrefs((current) => ({ ...current, ...patch }));
    setSaved(false);
  }

  return (
    <HubLayout title="Profile" description="Your candidate details and job preferences.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardBody className="flex flex-col gap-4">
            <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">Your details</h2>
            <TextField label="Name" defaultValue={user?.name ?? ""} readOnly />
            <TextField label="Email" defaultValue={user?.email ?? ""} readOnly />
            <TextField label="Headline" defaultValue={user?.headline ?? ""} readOnly />
            <TextField label="Based in" defaultValue={user?.location ?? ""} readOnly />
            <p className="text-xs text-ink-faint">
              Demo accounts are read-only. Preferences on the right are editable and persist in this
              browser.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col gap-4">
            <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">Preferences</h2>

            <SelectField
              label="Preferred team"
              value={prefs.preferredTeam}
              onChange={(event) => update({ preferredTeam: event.target.value })}
            >
              {JOB_TEAMS.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Preferred location"
              value={prefs.preferredLocation}
              onChange={(event) => update({ preferredLocation: event.target.value })}
            >
              {JOB_LOCATIONS.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </SelectField>

            <Toggle
              label="Open to relocation"
              description="Show roles outside your preferred location."
              pressed={prefs.openToRelocation}
              onToggle={() => update({ openToRelocation: !prefs.openToRelocation })}
            />

            <Toggle
              label="Email me about new roles"
              description="Nothing is actually sent in this demo."
              pressed={prefs.emailUpdates}
              onToggle={() => update({ emailUpdates: !prefs.emailUpdates })}
            />

            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  writeJson(KEY, prefs);
                  setSaved(true);
                }}
              >
                Save preferences
              </Button>
              {saved ? (
                <span role="status" className="text-sm font-bold text-go-green">
                  Saved to this browser
                </span>
              ) : null}
            </div>
          </CardBody>
        </Card>
      </div>
    </HubLayout>
  );
}
