import { ArrowDown, ArrowUp, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { topics, type TopicId } from "@/features/assistant/flows";
import type { BookingStatus, ChannelStatus, PlanId } from "@/features/property/types";
import { BOOKING_STATUS_LABELS, CHANNEL_STATUS_LABELS, PLANS } from "@/features/property/views";
import { CONDITION_LABELS, defaultCondition, PRIORITIES, QUEUE_IDS, queueName } from "@/features/studio/config";
import { describeCondition } from "@/features/studio/routing";
import { useStudio } from "@/features/studio/StudioProvider";
import type { Priority, QueueId, RoutingRule, RuleAction, RuleCondition, RuleCondKind } from "@/features/studio/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { AdminPage, Card, Toggle } from "./AdminLayout";

const CHANNEL_STATUSES = Object.keys(CHANNEL_STATUS_LABELS) as ChannelStatus[];
const BOOKING_STATUSES = Object.keys(BOOKING_STATUS_LABELS) as BookingStatus[];
const PLAN_IDS = Object.keys(PLANS) as PlanId[];

function CheckboxGroup<T extends string>({ legend, items, labels, selected, onChange }: { legend: string; items: T[]; labels: Record<T, string>; selected: T[]; onChange: (next: T[]) => void }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-1 text-xs font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-3 text-sm">
        {items.map((s) => (
          <label key={s} className="flex items-center gap-1.5">
            <input type="checkbox" checked={selected.includes(s)} onChange={() => onChange(toggleIn(selected, s))} className="accent-royal" />
            {labels[s]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
const CONDITION_KINDS = Object.keys(CONDITION_LABELS) as RuleCondKind[];

function NumberField({ id, label, value, onChange, step = 1 }: { id: string; label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold">
        {label}
      </label>
      <input id={id} type="number" step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="field w-32" />
    </div>
  );
}

function toggleIn<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function ConditionFields({ condition, onChange }: { condition: RuleCondition; onChange: (c: RuleCondition) => void }) {
  switch (condition.kind) {
    case "keywords":
      return (
        <div className="sm:col-span-2">
          <label htmlFor="rule-terms" className="mb-1 block text-xs font-semibold">
            Words or phrases (comma separated)
          </label>
          <input
            id="rule-terms"
            value={condition.terms.join(", ")}
            onChange={(e) => onChange({ ...condition, terms: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
            className="field"
          />
        </div>
      );
    case "sentiment":
      return (
        <div className="flex gap-3">
          <NumberField id="rule-below" label="Score below (−1 to 1)" step={0.05} value={condition.below} onChange={(below) => onChange({ ...condition, below })} />
          <NumberField id="rule-consecutive" label="Messages in a row" value={condition.consecutive} onChange={(consecutive) => onChange({ ...condition, consecutive })} />
        </div>
      );
    case "event_within":
      return <NumberField id="rule-days" label="Days before the event" value={condition.days} onChange={(days) => onChange({ ...condition, days })} />;
    case "event_at_risk":
      return <NumberField id="rule-risk-days" label="Next event within (days)" value={condition.days} onChange={(days) => onChange({ ...condition, days })} />;
    case "channel_issue":
      return (
        <CheckboxGroup legend="Channel status" items={CHANNEL_STATUSES} labels={CHANNEL_STATUS_LABELS} selected={condition.statuses} onChange={(statuses) => onChange({ ...condition, statuses })} />
      );
    case "booking_status":
      return (
        <CheckboxGroup legend="Booking status" items={BOOKING_STATUSES} labels={BOOKING_STATUS_LABELS} selected={condition.statuses} onChange={(statuses) => onChange({ ...condition, statuses })} />
      );
    case "topic":
      return (
        <fieldset className="sm:col-span-2">
          <legend className="mb-1 text-xs font-semibold">Topics</legend>
          <div className="flex flex-wrap gap-3 text-sm">
            {topics.map((t) => (
              <label key={t.id} className="flex items-center gap-1.5">
                <input type="checkbox" checked={condition.topics.includes(t.id)} onChange={() => onChange({ ...condition, topics: toggleIn<TopicId>(condition.topics, t.id) })} className="accent-royal" />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
      );
    case "plan":
      return (
        <CheckboxGroup
          legend="Plan"
          items={PLAN_IDS}
          labels={Object.fromEntries(PLAN_IDS.map((p) => [p, PLANS[p].name])) as Record<PlanId, string>}
          selected={condition.plans}
          onChange={(plans) => onChange({ ...condition, plans })}
        />
      );
    case "property_size":
      return <NumberField id="rule-rooms" label="Rooms at least" value={condition.minRooms} onChange={(minRooms) => onChange({ ...condition, minRooms })} />;
    case "invoice_overdue":
      return <NumberField id="rule-overdue" label="Days overdue at least" value={condition.minDays} onChange={(minDays) => onChange({ ...condition, minDays })} />;
    case "misunderstood":
      return <NumberField id="rule-count" label="Fallbacks" value={condition.count} onChange={(count) => onChange({ ...condition, count })} />;
    case "repeat_contact":
      return (
        <div className="flex gap-3">
          <NumberField id="rule-contacts" label="Previous contacts" value={condition.count} onChange={(count) => onChange({ ...condition, count })} />
          <NumberField id="rule-days" label="Within days" value={condition.withinDays} onChange={(withinDays) => onChange({ ...condition, withinDays })} />
        </div>
      );
    default: {
      const exhaustive: never = condition;
      return exhaustive;
    }
  }
}

function RuleForm({ initial, onSave, onCancel }: { initial: RoutingRule; onSave: (rule: RoutingRule) => void; onCancel: () => void }) {
  const { config } = useStudio();
  const [rule, setRule] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!rule.name.trim()) return setError("Give the rule a name.");
    if (rule.condition.kind === "keywords" && rule.condition.terms.length === 0) return setError("Add at least one word or phrase.");
    onSave({ ...rule, name: rule.name.trim() });
  };
  return (
    <form onSubmit={submit} className="grid gap-3 rounded-xl bg-canvas p-4 sm:grid-cols-2" aria-label="Edit rule">
      <div>
        <label htmlFor="rule-name" className="mb-1 block text-xs font-semibold">
          Name
        </label>
        <input id="rule-name" value={rule.name} onChange={(e) => setRule({ ...rule, name: e.target.value })} className="field" />
      </div>
      <div>
        <label htmlFor="rule-description" className="mb-1 block text-xs font-semibold">
          Description
        </label>
        <input id="rule-description" value={rule.description} onChange={(e) => setRule({ ...rule, description: e.target.value })} className="field" />
      </div>
      <div>
        <label htmlFor="rule-kind" className="mb-1 block text-xs font-semibold">
          When
        </label>
        <select id="rule-kind" value={rule.condition.kind} onChange={(e) => setRule({ ...rule, condition: defaultCondition(e.target.value as RuleCondKind) })} className="field">
          {CONDITION_KINDS.map((k) => (
            <option key={k} value={k}>
              {CONDITION_LABELS[k]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="rule-action" className="mb-1 block text-xs font-semibold">
          Then
        </label>
        <select id="rule-action" value={rule.action} onChange={(e) => setRule({ ...rule, action: e.target.value as RuleAction })} className="field">
          <option value="handoff">Hand off to a person straight away</option>
          <option value="route">Only choose the queue if a handoff happens</option>
        </select>
      </div>
      <ConditionFields condition={rule.condition} onChange={(condition) => setRule({ ...rule, condition })} />
      <div className="flex gap-3 sm:col-span-2">
        <div className="flex-1">
          <label htmlFor="rule-queue" className="mb-1 block text-xs font-semibold">
            Queue
          </label>
          <select id="rule-queue" value={rule.queue} onChange={(e) => setRule({ ...rule, queue: e.target.value as QueueId })} className="field">
            {QUEUE_IDS.map((q) => (
              <option key={q} value={q}>
                {queueName(config, q)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rule-priority" className="mb-1 block text-xs font-semibold">
            Priority
          </label>
          <select id="rule-priority" value={rule.priority} onChange={(e) => setRule({ ...rule, priority: e.target.value as Priority })} className="field w-24">
            {PRIORITIES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-sm text-critical sm:col-span-2">{error}</p>}
      <div className="flex gap-2 sm:col-span-2">
        <button type="submit" className="btn-primary">
          Save rule
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}

function newRule(): RoutingRule {
  return {
    id: `rule-${Date.now()}`,
    name: "",
    description: "",
    enabled: true,
    condition: defaultCondition("keywords"),
    action: "handoff",
    queue: "general",
    priority: "P3",
  };
}

export function RoutingPage() {
  useDocumentTitle("Routing rules · Support Studio");
  const { config, updateConfig, updateRule, moveRule, addRule, removeRule, resetConfig } = useStudio();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<RoutingRule | null>(null);
  const rules = config.routing.rules;

  return (
    <AdminPage
      title="Routing rules"
      description="Rules run top to bottom after every hotelier message. Handoff rules move the hotelier to a person the moment they match. Route rules only pick the queue and priority when a handoff happens — the first match wins the queue, the most urgent match sets the priority."
      action={
        <div className="flex gap-2">
          <button type="button" onClick={resetConfig} className="btn-outline">
            <RotateCcw className="size-4" aria-hidden /> Reset to defaults
          </button>
          <button type="button" onClick={() => setDraft(newRule())} className="btn-primary">
            <Plus className="size-4" aria-hidden /> Add rule
          </button>
        </div>
      }
    >
      <Card>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold">Routing is {config.routing.enabled ? "on" : "off"}</p>
            <p className="text-sm text-ink-soft">When off, the assistant never hands off on its own and every handoff goes to Customer Support.</p>
          </div>
          <Toggle label="Routing enabled" checked={config.routing.enabled} onChange={(enabled) => updateConfig((c) => ({ ...c, routing: { ...c.routing, enabled } }))} />
        </div>
      </Card>

      {draft && (
        <Card title="New rule">
          <RuleForm
            initial={draft}
            onSave={(rule) => {
              addRule(rule);
              setDraft(null);
            }}
            onCancel={() => setDraft(null)}
          />
        </Card>
      )}

      <Card>
        <ol className="divide-y divide-line-soft">
          {rules.map((rule, i) => (
            <li key={rule.id} className="py-3">
              <div className={cn("flex flex-wrap items-center gap-3", !rule.enabled && "opacity-60")}>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-canvas text-xs font-bold">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">
                    {rule.name}{" "}
                    <span className={cn("ml-1 rounded-full px-2 py-0.5 text-[11px] font-semibold", rule.action === "handoff" ? "bg-lime text-stratos" : "bg-royal-tint text-royal")}>
                      {rule.action === "handoff" ? "Hands off" : "Routes"}
                    </span>
                  </p>
                  <p className="text-sm text-ink-soft">
                    {CONDITION_LABELS[rule.condition.kind]} <strong className="text-heading">{describeCondition(rule.condition)}</strong> → {queueName(config, rule.queue)} · {rule.priority}
                  </p>
                  {rule.description && <p className="text-xs text-ink-faint">{rule.description}</p>}
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveRule(rule.id, -1)} disabled={i === 0} className="grid size-8 place-items-center rounded-full hover:bg-canvas disabled:opacity-30" aria-label={`Move ${rule.name} up`}>
                    <ArrowUp className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveRule(rule.id, 1)}
                    disabled={i === rules.length - 1}
                    className="grid size-8 place-items-center rounded-full hover:bg-canvas disabled:opacity-30"
                    aria-label={`Move ${rule.name} down`}
                  >
                    <ArrowDown className="size-4" aria-hidden />
                  </button>
                  <button type="button" onClick={() => setEditing(editing === rule.id ? null : rule.id)} className="grid size-8 place-items-center rounded-full hover:bg-canvas" aria-label={`Edit ${rule.name}`}>
                    <Pencil className="size-4" aria-hidden />
                  </button>
                  <button type="button" onClick={() => removeRule(rule.id)} className="grid size-8 place-items-center rounded-full hover:bg-canvas hover:text-critical" aria-label={`Delete ${rule.name}`}>
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                  <Toggle label={`${rule.name} enabled`} checked={rule.enabled} onChange={(enabled) => updateRule(rule.id, { enabled })} />
                </div>
              </div>
              {editing === rule.id && (
                <div className="mt-3">
                  <RuleForm
                    initial={rule}
                    onSave={(next) => {
                      updateRule(rule.id, next);
                      setEditing(null);
                    }}
                    onCancel={() => setEditing(null)}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </Card>

      <Card title="Queues">
        <p className="-mt-1 mb-3 text-sm text-ink-soft">Names and wait times show in the handoff card and the assistant&apos;s reply.</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {QUEUE_IDS.map((id) => {
            const q = config.queues[id];
            return (
              <li key={id} className="flex items-end gap-2 rounded-xl border border-line-soft p-3">
                <div className="flex-1">
                  <label htmlFor={`q-${id}`} className="mb-1 block text-xs font-semibold text-ink-faint">
                    {id}
                  </label>
                  <input
                    id={`q-${id}`}
                    value={q.name}
                    onChange={(e) => updateConfig((c) => ({ ...c, queues: { ...c.queues, [id]: { ...c.queues[id], name: e.target.value } } }))}
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor={`qw-${id}`} className="mb-1 block text-xs font-semibold text-ink-faint">
                    Wait (min)
                  </label>
                  <input
                    id={`qw-${id}`}
                    type="number"
                    min={0}
                    value={q.waitMins}
                    onChange={(e) => updateConfig((c) => ({ ...c, queues: { ...c.queues, [id]: { ...c.queues[id], waitMins: Number(e.target.value) } } }))}
                    className="field w-20"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </AdminPage>
  );
}
