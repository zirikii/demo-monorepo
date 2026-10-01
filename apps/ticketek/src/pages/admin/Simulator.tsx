import { CheckCircle2, CircleSlash, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { topics, type TopicId } from "@/features/assistant/flows";
import { useFan } from "@/features/fan/FanProvider";
import { lifetimeEvents } from "@/features/fan/recommendations";
import { queueName } from "@/features/studio/config";
import { evaluateRouting } from "@/features/studio/routing";
import { scoreSentiment } from "@/features/studio/sentiment";
import { useStudio } from "@/features/studio/StudioProvider";
import type { RoutingSignals } from "@/features/studio/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { AdminPage, Card } from "./AdminLayout";

type Scenario = { label: string; messages: string; topics: TopicId[]; orderId: string; fallbacks: number };

export function SimulatorPage() {
  useDocumentTitle("Routing simulator · Support Studio");
  const { config } = useStudio();
  const { views, profile } = useFan();
  const soon = views.find((v) => v.status === "event-soon");
  const cancelled = views.find((v) => v.status === "cancelled");
  const scenarios: Scenario[] = [
    { label: "Barcode missing, show tomorrow", messages: "My barcode isn't showing in the app", topics: ["tickets"], orderId: soon?.order.id ?? "", fallbacks: 0 },
    { label: "Angry about a cancellation", messages: "This is ridiculous\nWorst service ever, I want my money back now!!", topics: ["refunds"], orderId: cancelled?.order.id ?? "", fallbacks: 0 },
    { label: "Tickets stolen", messages: "Someone hacked my account and my tickets were stolen", topics: ["tickets"], orderId: "", fallbacks: 0 },
    { label: "Assistant keeps missing", messages: "blah\nno that's not it", topics: [], orderId: "", fallbacks: 2 },
    { label: "Wheelchair seating", messages: "I need a wheelchair space for my mum", topics: ["accessibility"], orderId: "", fallbacks: 0 },
  ];
  const [messages, setMessages] = useState(scenarios[0]!.messages);
  const [selectedTopics, setTopics] = useState<TopicId[]>(scenarios[0]!.topics);
  const [orderId, setOrderId] = useState(scenarios[0]!.orderId);
  const [fallbacks, setFallbacks] = useState(0);
  const [events, setEvents] = useState(lifetimeEvents(profile));
  const [priorContacts, setPriorContacts] = useState(0);

  const signals = useMemo<RoutingSignals>(() => {
    const now = new Date();
    const view = views.find((v) => v.order.id === orderId);
    return {
      customerTurns: messages.split("\n").map((m) => m.trim()).filter(Boolean),
      topics: selectedTopics,
      fallbackCount: fallbacks,
      order: view ? { label: view.event.name, hoursUntil: view.hoursUntil, status: view.status, total: view.order.total } : undefined,
      lifetimeEvents: events,
      priorContacts: Array.from({ length: priorContacts }, (_, i) => ({ endedAt: new Date(now.getTime() - (i + 1) * 86_400_000).toISOString() })),
      now,
    };
  }, [messages, selectedTopics, fallbacks, orderId, views, events, priorContacts]);

  const live = evaluateRouting(config, signals, "live");
  const handoff = evaluateRouting(config, signals, "handoff");
  const willHandOff = live.decision.action === "handoff";

  const load = (s: Scenario) => {
    setMessages(s.messages);
    setTopics(s.topics);
    setOrderId(s.orderId);
    setFallbacks(s.fallbacks);
  };

  return (
    <AdminPage title="Routing simulator" description="Test the live rules against any conversation before a fan hits them. Changes on the Routing rules page apply here immediately.">
      <div className="flex flex-wrap gap-2">
        {scenarios.map((s) => (
          <button key={s.label} type="button" onClick={() => load(s)} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm hover:border-tk-blue">
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Conversation signals">
          <div className="space-y-4">
            <div>
              <label htmlFor="sim-messages" className="mb-1 block text-xs font-semibold">
                Fan messages (one per line)
              </label>
              <textarea id="sim-messages" rows={4} value={messages} onChange={(e) => setMessages(e.target.value)} className="field font-mono text-xs" />
              <p className="mt-1 text-xs text-ink-faint">
                Sentiment: {signals.customerTurns.map((t) => scoreSentiment(t).toFixed(2)).join(", ") || "–"}
              </p>
            </div>
            <div>
              <label htmlFor="sim-order" className="mb-1 block text-xs font-semibold">
                Order in the conversation
              </label>
              <select id="sim-order" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="field">
                <option value="">None</option>
                {views.map((v) => (
                  <option key={v.order.id} value={v.order.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <fieldset>
              <legend className="mb-1 text-xs font-semibold">Topics reached</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const on = selectedTopics.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTopics((list) => (on ? list.filter((x) => x !== t.id) : [...list, t.id]))}
                      className={cn("rounded-full border px-2.5 py-1 text-xs", on ? "border-midnight bg-midnight text-white" : "border-line")}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  ["sim-fallbacks", "Fallbacks", fallbacks, setFallbacks],
                  ["sim-events", "Events attended", events, setEvents],
                  ["sim-contacts", "Contacts this week", priorContacts, setPriorContacts],
                ] as const
              ).map(([id, label, value, set]) => (
                <div key={id}>
                  <label htmlFor={id} className="mb-1 block text-xs font-semibold">
                    {label}
                  </label>
                  <input id={id} type="number" min={0} value={value} onChange={(e) => set(Number(e.target.value))} className="field" />
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <p className="text-xs font-semibold text-ink-faint uppercase">Result</p>
            <p className={cn("mt-1 text-xl font-extrabold", willHandOff ? "text-tk-blue" : "text-ink")}>
              {willHandOff ? `Hands off to ${queueName(config, handoff.decision.queue)}` : "Assistant keeps helping"}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              {willHandOff ? `Triggered by “${live.decision.ruleName}”. ` : ""}If the fan asks for a person, they land in{" "}
              <strong className="text-ink">{queueName(config, handoff.decision.queue)}</strong> at <strong className="text-ink">{handoff.decision.priority}</strong>.
            </p>
            <p className="mt-1 text-xs text-ink-faint">{handoff.decision.reason}</p>
          </Card>
          <Card title="Rule trace">
            <ol className="space-y-2">
              {handoff.trace.map((t) => {
                const Icon = !t.enabled ? CircleSlash : t.matched ? CheckCircle2 : XCircle;
                return (
                  <li key={t.ruleId} className="flex items-start gap-2 text-sm">
                    <Icon className={cn("mt-0.5 size-4 shrink-0", !t.enabled ? "text-ink-faint" : t.matched ? "text-tk-green" : "text-line")} aria-hidden />
                    <span>
                      <span className={cn("font-semibold", t.matched && "text-tk-green", !t.enabled && "text-ink-faint")}>{t.name}</span>
                      <span className="block text-xs text-ink-soft">{t.reason}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>
      </div>
    </AdminPage>
  );
}
