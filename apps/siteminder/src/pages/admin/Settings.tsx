import { RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { REGIONS } from "@/data/nav";
import type { RegionId } from "@/data/types";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { renderStep } from "@/features/assistant/engine/conversation";
import { promptOptions } from "@/features/assistant/engine/session";
import { buildChatInstructions } from "@/features/assistant/engine/voicePrompt";
import { ROOT_ID, topics } from "@/features/assistant/flows";
import { useFan } from "@/features/fan/FanProvider";
import { FAN_TIERS, fanTier, lifetimeEvents, topGenres } from "@/features/fan/recommendations";
import { hoursLabel } from "@/features/studio/config";
import { useStudio } from "@/features/studio/StudioProvider";
import type { Persona, StudioConfig, VoiceName } from "@/features/studio/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { AdminPage, Card, Toggle } from "./AdminLayout";

const PERSONAS: { id: Persona; label: string; description: string }[] = [
  { id: "warm", label: "Warm", description: "Friendly and reassuring — the default" },
  { id: "upbeat", label: "Upbeat", description: "Excited about the event, a bit of fan energy" },
  { id: "concise", label: "Concise", description: "Short, to the point" },
];

const VOICES: { id: VoiceName; label: string }[] = [
  { id: "eve", label: "Eve — bright, energetic" },
  { id: "ara", label: "Ara — warm, friendly" },
  { id: "rex", label: "Rex — calm, professional" },
  { id: "sal", label: "Sal — smooth, balanced" },
  { id: "leo", label: "Leo — confident" },
];

type AssistantFlag = { [K in keyof StudioConfig["assistant"]]: StudioConfig["assistant"][K] extends boolean ? K : never }[keyof StudioConfig["assistant"]];

const FLAGS: { key: AssistantFlag; label: string; description: string }[] = [
  { key: "personalGreeting", label: "Personal greeting", description: "Open with the fan's next event and any cancelled orders." },
  { key: "useHistory", label: "Use event history", description: "Share events the fan has been to with Grok for context." },
  { key: "recommendations", label: "Recommendations", description: "Suggest events based on what the fan has been to." },
  { key: "voiceForms", label: "Forms by voice", description: "Let Grok fill in on-screen forms from what the fan says." },
  { key: "showRoutingNotes", label: "Show routing notes", description: "Show which queue and rule a handoff used, in the chat." },
];

function hourOptions() {
  return Array.from({ length: 24 }, (_, h) => h);
}

export function AssistantSettingsPage() {
  useDocumentTitle("Assistant · Support Studio");
  const { config, updateConfig } = useStudio();
  const { conversation, voice } = useAssistant();
  const set = (patch: Partial<StudioConfig["assistant"]>) => updateConfig((c) => ({ ...c, assistant: { ...c.assistant, ...patch } }));
  const greeting = renderStep(ROOT_ID, conversation.context, conversation.customer).text;
  const prompt = buildChatInstructions(conversation.context, promptOptions(config, conversation.customer), greeting);

  return (
    <AdminPage
      title="Assistant"
      description="How Ticketek Support sounds, what it knows about the fan, and which topics it handles. Changes apply to the next message."
      action={
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", voice.grokConfigured ? "bg-positive-bg text-positive" : "bg-caution-bg text-caution")}>
          {voice.grokConfigured ? "Grok connected" : "Grok key not set · guided mode"}
        </span>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Persona">
          <div className="space-y-2">
            {PERSONAS.map((p) => (
              <label key={p.id} className={cn("flex cursor-pointer items-start gap-3 rounded-tk border p-3", config.assistant.persona === p.id ? "border-tk-blue bg-tk-blue-tint" : "border-line-soft")}>
                <input type="radio" name="persona" checked={config.assistant.persona === p.id} onChange={() => set({ persona: p.id })} className="mt-1 accent-tk-blue" />
                <span>
                  <span className="block font-semibold">{p.label}</span>
                  <span className="text-sm text-ink-soft">{p.description}</span>
                </span>
              </label>
            ))}
          </div>
          <label htmlFor="voice" className="mt-4 mb-1 block text-xs font-semibold">
            Grok voice
          </label>
          <select id="voice" value={config.assistant.voice} onChange={(e) => set({ voice: e.target.value as VoiceName })} className="field">
            {VOICES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </Card>
        <Card title="Personalisation">
          <ul className="divide-y divide-line-soft">
            {FLAGS.map((f) => (
              <li key={f.key} className="flex items-center justify-between gap-4 py-2.5">
                <span>
                  <span className="block font-semibold">{f.label}</span>
                  <span className="text-sm text-ink-soft">{f.description}</span>
                </span>
                <Toggle label={f.label} checked={config.assistant[f.key]} onChange={(v) => set({ [f.key]: v })} />
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Topics">
          <p className="-mt-1 mb-3 text-sm text-ink-soft">Switched-off topics go straight to a person instead of the guided flow.</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {topics.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 rounded-tk border border-line-soft px-3 py-2 text-sm">
                {t.label}
                <Toggle label={t.label} checked={config.topics[t.id]} onChange={(v) => updateConfig((c) => ({ ...c, topics: { ...c.topics, [t.id]: v } }))} />
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Live chat hours">
          <p className="-mt-1 mb-3 text-sm text-ink-soft">Outside these hours, handoffs become a callback. Currently {hoursLabel(config)}.</p>
          <div className="flex gap-3">
            {(["open", "close"] as const).map((k) => (
              <div key={k}>
                <label htmlFor={`hours-${k}`} className="mb-1 block text-xs font-semibold capitalize">
                  {k === "open" ? "Opens" : "Closes"}
                </label>
                <select id={`hours-${k}`} value={config.hours[k]} onChange={(e) => updateConfig((c) => ({ ...c, hours: { ...c.hours, [k]: Number(e.target.value) } }))} className="field w-28">
                  {hourOptions().map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <label htmlFor="custom" className="mt-4 mb-1 block text-xs font-semibold">
            Extra instructions for Grok
          </label>
          <textarea
            id="custom"
            rows={3}
            value={config.assistant.customInstructions}
            onChange={(e) => set({ customInstructions: e.target.value })}
            placeholder="e.g. Mention the ABBA Show presale to fans who like 70s music."
            className="field"
          />
        </Card>
      </div>
      <Card title="What Grok is told">
        <p className="-mt-1 mb-3 text-sm text-ink-soft">The system prompt for the current fan, built from the flow, their orders, event history and your routing rules.</p>
        <pre className="max-h-96 overflow-auto rounded-tk bg-midnight p-4 text-xs leading-relaxed whitespace-pre-wrap text-white/85">{prompt}</pre>
      </Card>
    </AdminPage>
  );
}

export function FanProfilePage() {
  useDocumentTitle("Fan profile · Support Studio");
  const { profile, updateProfile, resetFan, views } = useFan();
  const { resetConfig, clearLog } = useStudio();
  const tier = fanTier(profile);

  return (
    <AdminPage
      title="Fan profile"
      description="The demo fan the assistant personalises for. Change their history to see greetings, recommendations and routing respond."
      action={
        <button
          type="button"
          onClick={() => {
            resetFan();
            resetConfig();
            clearLog();
          }}
          className="btn-outline"
        >
          <RotateCcw className="size-4" aria-hidden /> Reset all demo data
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title={`${profile.firstName} ${profile.lastName}`}>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs text-ink-faint">Fan tier</dt>
              <dd className="font-semibold">{tier.label}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-faint">Lifetime events</dt>
              <dd className="font-semibold">{lifetimeEvents(profile)}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-faint">Top genres</dt>
              <dd className="font-semibold capitalize">{topGenres(profile.attended).join(", ") || "–"}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-faint">Orders</dt>
              <dd className="font-semibold">{views.length}</dd>
            </div>
          </dl>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="fan-archived" className="mb-1 block text-xs font-semibold">
                Earlier events (before history)
              </label>
              <input id="fan-archived" type="number" min={0} value={profile.archivedEvents} onChange={(e) => updateProfile({ archivedEvents: Math.max(0, Number(e.target.value)) })} className="field" />
              <p className="mt-1 text-xs text-ink-faint">Tiers: {FAN_TIERS.map((t) => `${t.label} ${t.min}+`).join(" · ")}</p>
            </div>
            <div>
              <label htmlFor="fan-region" className="mb-1 block text-xs font-semibold">
                Home state
              </label>
              <select id="fan-region" value={profile.homeRegion} onChange={(e) => updateProfile({ homeRegion: e.target.value as RegionId })} className="field">
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={profile.accessibility.wheelchair}
              onChange={(e) => updateProfile({ accessibility: { ...profile.accessibility, wheelchair: e.target.checked } })}
              className="size-4 accent-tk-blue"
            />
            Needs wheelchair-accessible seating
          </label>
        </Card>
        <Card title="Events they've been to" action={<Link to="/account/history" className="link text-sm">Edit on the site</Link>}>
          <ul className="max-h-72 divide-y divide-line-soft overflow-y-auto text-sm">
            {profile.attended.map((a) => (
              <li key={a.id} className="flex justify-between gap-3 py-2">
                <span className="truncate">{a.name}</span>
                <span className="shrink-0 text-ink-faint">{a.date.slice(0, 4)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AdminPage>
  );
}
