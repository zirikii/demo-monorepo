import { useCallback, useEffect, useState } from "react";
import { defaultScenario } from "../../domain/seed";
import type { Scenario } from "../../domain/types";
import { getCallbacks, getScenario, resetDemo, saveScenario } from "../../lib/api";
import { useDemo } from "../../context/useDemo";
import { Button } from "../ui/Button";

type CallbackRow = { partner: string; event: string; payload: { accountId: string; event: string; timestamp: string } };

export function DevPanel() {
  const { refresh, notify } = useDemo();
  const [scenario, setLocal] = useState<Scenario>({ ...defaultScenario });
  const [callbacks, setCallbacks] = useState<CallbackRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [scenarioResponse, callbackResponse] = await Promise.all([getScenario(), getCallbacks()]);
    setLocal(scenarioResponse.scenario);
    setCallbacks(callbackResponse.callbacks);
  }, []);

  useEffect(() => {
    let cancelled = false;
    load().catch((reason: unknown) => {
      if (!cancelled) setError(reason instanceof Error ? reason.message : "Dev panel unavailable");
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  async function apply(next: Scenario) {
    setLocal(next);
    await saveScenario(next);
  }

  async function onReset() {
    await resetDemo();
    await load();
    await refresh();
    notify("Demo data reset");
  }

  return (
    <aside className="w-[340px] max-w-full rounded-2xl bg-card p-4 text-sm shadow-lg">
      <h2 className="text-title-small font-bold">Demo controls</h2>
      <p className="mt-1 text-xs text-text-body">Force a branch, then walk the flow again. The phone uses the saved scenario.</p>
      {error ? <p className="mt-2 text-xs text-danger">{error}</p> : null}
      <label className="mt-3 block text-xs font-semibold">
        Face verification
        <select
          className="mt-1 w-full rounded-lg border border-border-mute bg-bg-primary px-2 py-2"
          value={scenario.face}
          onChange={(event) => void apply({ ...scenario, face: event.target.value as Scenario["face"] })}
        >
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
          <option value="lockout">Too many attempts</option>
        </select>
      </label>
      <label className="mt-3 block text-xs font-semibold">
        OCR confidence
        <select
          className="mt-1 w-full rounded-lg border border-border-mute bg-bg-primary px-2 py-2"
          value={scenario.ocrConfidence}
          onChange={(event) => void apply({ ...scenario, ocrConfidence: event.target.value as Scenario["ocrConfidence"] })}
        >
          <option value="high">High — continue</option>
          <option value="low">Low — manual review</option>
        </select>
      </label>
      <label className="mt-3 block text-xs font-semibold">
        Dukcapil
        <select
          className="mt-1 w-full rounded-lg border border-border-mute bg-bg-primary px-2 py-2"
          value={scenario.dukcapil}
          onChange={(event) => void apply({ ...scenario, dukcapil: event.target.value as Scenario["dukcapil"] })}
        >
          <option value="cache_hit">Above threshold — reuse cache</option>
          <option value="verified">Below threshold — re-run verified</option>
          <option value="not_verified">Below threshold — not verified</option>
        </select>
      </label>
      <label className="mt-3 block text-xs font-semibold">
        Session age
        <select
          className="mt-1 w-full rounded-lg border border-border-mute bg-bg-primary px-2 py-2"
          value={scenario.sessionExpiry}
          onChange={(event) => void apply({ ...scenario, sessionExpiry: event.target.value as Scenario["sessionExpiry"] })}
        >
          <option value="none">Fresh</option>
          <option value="five_min">More than 5 minutes</option>
          <option value="twenty_four_h">More than 24 hours</option>
        </select>
      </label>
      <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
        <Flag label="NIK matches on-file e-KTP" checked={scenario.nikMatches} onChange={(nikMatches) => void apply({ ...scenario, nikMatches })} />
        <Flag label="High risk — collect EDD" checked={scenario.highRisk} onChange={(highRisk) => void apply({ ...scenario, highRisk })} />
        <Flag label="Upload successful" checked={scenario.uploadSuccessful} onChange={(uploadSuccessful) => void apply({ ...scenario, uploadSuccessful })} />
        <Flag label="Photo clear" checked={scenario.photoClear} onChange={(photoClear) => void apply({ ...scenario, photoClear })} />
        <Flag label="e-KTP aligned" checked={scenario.ktpAligned} onChange={(ktpAligned) => void apply({ ...scenario, ktpAligned })} />
        <Flag label="KTP data readable" checked={scenario.ktpReadable} onChange={(ktpReadable) => void apply({ ...scenario, ktpReadable })} />
        <Flag label="Detected within 15 seconds" checked={scenario.detectedWithin15s} onChange={(detectedWithin15s) => void apply({ ...scenario, detectedWithin15s })} />
        <Flag label="e-KTP expiring" checked={scenario.ektpExpiring} onChange={(ektpExpiring) => void apply({ ...scenario, ektpExpiring })} />
      </div>
      <div className="mt-4">
        <Button variant="outline" onClick={() => void onReset()}>
          Reset demo data
        </Button>
      </div>
      <h3 className="mt-4 text-xs font-bold uppercase tracking-wide text-text-body">Partner callbacks</h3>
      {callbacks.length === 0 ? <p className="mt-1 text-xs text-text-body">None yet. An approval writes one per partner.</p> : null}
      <ul className="mt-2 max-h-40 space-y-2 overflow-auto">
        {callbacks.map((callback) => (
          <li key={`${callback.partner}-${callback.payload.timestamp}-${callback.event}`} className="rounded-lg bg-bg-primary px-2 py-1.5 text-xs">
            <span className="font-semibold">{callback.partner}</span> {callback.payload.event}
            <span className="block text-text-body">{callback.payload.accountId}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Flag({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}
