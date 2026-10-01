import { Bot, Headset, MessageCircle, Mic, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { findTopic } from "@/features/assistant/flows";
import { queueName } from "@/features/studio/config";
import { useStudio } from "@/features/studio/StudioProvider";
import type { ConversationRecord, QueueId } from "@/features/studio/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { formatDateTime } from "@/lib/format";
import { AdminPage, Card } from "./AdminLayout";

const OUTCOME_TONE: Record<ConversationRecord["outcome"], string> = {
  resolved: "bg-positive-bg text-positive",
  handoff: "bg-royal-tint text-royal",
  open: "bg-line-soft text-ink-soft",
};

const OUTCOME_LABEL: Record<ConversationRecord["outcome"], string> = { resolved: "Resolved", handoff: "Handed off", open: "Open" };

function percent(part: number, total: number): string {
  return total ? `${Math.round((part / total) * 100)}%` : "–";
}

function OutcomePill({ outcome }: { outcome: ConversationRecord["outcome"] }) {
  return <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", OUTCOME_TONE[outcome])}>{OUTCOME_LABEL[outcome]}</span>;
}

function ConversationTable({ records }: { records: ConversationRecord[] }) {
  const { config } = useStudio();
  if (records.length === 0) return <p className="py-6 text-center text-sm text-ink-soft">No conversations yet. Open SiteMinder Support on the site to create one.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-ink-faint uppercase">
          <tr>
            <th className="py-2 pr-3 font-semibold">Ref</th>
            <th className="py-2 pr-3 font-semibold">Hotelier</th>
            <th className="py-2 pr-3 font-semibold">Channel</th>
            <th className="py-2 pr-3 font-semibold">Topics</th>
            <th className="py-2 pr-3 font-semibold">Outcome</th>
            <th className="py-2 pr-3 font-semibold">Queue</th>
            <th className="py-2 font-semibold">When</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line-soft">
          {records.map((r) => (
            <tr key={r.id} className="hover:bg-canvas">
              <td className="py-2.5 pr-3">
                <Link to={`/admin/conversations/${r.id}`} className="link font-semibold">
                  {r.ref}
                </Link>
              </td>
              <td className="py-2.5 pr-3">
                <span className="block font-medium text-heading">{r.contactName}</span>
                <span className="text-xs text-ink-faint">{r.propertyName}</span>
              </td>
              <td className="py-2.5 pr-3">
                <span className="inline-flex items-center gap-1">
                  {r.channel === "voice" ? <Mic className="size-3.5" aria-hidden /> : <MessageCircle className="size-3.5" aria-hidden />}
                  {r.channel === "voice" ? "Voice" : "Chat"}
                  <span className="text-xs text-ink-faint">· {r.engine === "grok" ? "Grok" : "Guided"}</span>
                </span>
              </td>
              <td className="py-2.5 pr-3 text-ink-soft">{r.topics.map((t) => findTopic(t)?.label ?? t).join(", ") || "–"}</td>
              <td className="py-2.5 pr-3">
                <OutcomePill outcome={r.outcome} />
              </td>
              <td className="py-2.5 pr-3 text-ink-soft">{r.queue ? `${queueName(config, r.queue)} · ${r.priority}` : "–"}</td>
              <td className="py-2.5 whitespace-nowrap text-ink-soft">{formatDateTime(r.startedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StudioOverviewPage() {
  useDocumentTitle("Support Studio");
  const { log, config } = useStudio();
  const total = log.length;
  const resolved = log.filter((r) => r.outcome === "resolved").length;
  const handoffs = log.filter((r) => r.outcome === "handoff");
  const voice = log.filter((r) => r.channel === "voice").length;
  const byQueue = new Map<QueueId, number>();
  for (const r of handoffs) if (r.queue) byQueue.set(r.queue, (byQueue.get(r.queue) ?? 0) + 1);
  const byTopic = new Map<string, number>();
  for (const r of log) for (const t of r.topics) byTopic.set(t, (byTopic.get(t) ?? 0) + 1);
  const topTopics = [...byTopic.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxTopic = topTopics[0]?.[1] ?? 1;
  const stats = [
    { label: "Conversations", value: String(total) },
    { label: "Resolved by assistant", value: percent(resolved, total) },
    { label: "Handed to a person", value: percent(handoffs.length, total) },
    { label: "Voice share", value: percent(voice, total) },
  ];

  return (
    <AdminPage title="Support Studio" description="How SiteMinder Support is performing, where handoffs land, and what hoteliers are asking about. Every conversation on the site is logged here.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-xs font-semibold text-ink-faint uppercase">{s.label}</p>
            <p className="mt-1 text-3xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Handoffs by queue" action={<Link to="/admin/routing" className="link text-sm">Edit routing</Link>}>
          <ul className="space-y-2">
            {Object.entries(config.queues).map(([id, q]) => {
              const count = byQueue.get(id as QueueId) ?? 0;
              return (
                <li key={id} className="flex items-center gap-3 text-sm">
                  <Headset className="size-4 text-royal" aria-hidden />
                  <span className="flex-1">{q.name}</span>
                  <span className="text-xs text-ink-faint">~{q.waitMins} min wait</span>
                  <span className="w-8 text-right font-bold">{count}</span>
                </li>
              );
            })}
          </ul>
        </Card>
        <Card title="Top topics">
          {topTopics.length === 0 ? (
            <p className="text-sm text-ink-soft">No topics yet.</p>
          ) : (
            <ul className="space-y-2.5">
              {topTopics.map(([t, n]) => (
                <li key={t} className="text-sm">
                  <div className="mb-1 flex justify-between">
                    <span>{findTopic(t as Parameters<typeof findTopic>[0])?.label ?? t}</span>
                    <span className="font-bold">{n}</span>
                  </div>
                  <div className="h-2 rounded-full bg-canvas">
                    <div className="sm-gradient h-2 rounded-full" style={{ width: `${(n / maxTopic) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
      <Card title="Recent conversations" action={<Link to="/admin/conversations" className="link text-sm">View all</Link>}>
        <ConversationTable records={log.slice(0, 6)} />
      </Card>
    </AdminPage>
  );
}

export function ConversationsPage() {
  useDocumentTitle("Conversations · Support Studio");
  const { log, clearLog } = useStudio();
  return (
    <AdminPage
      title="Conversations"
      description="Chat and voice sessions from the site, with the routing decision behind every handoff."
      action={
        <button type="button" onClick={clearLog} className="btn-outline" disabled={log.length === 0}>
          <Trash2 className="size-4" aria-hidden /> Clear log
        </button>
      }
    >
      <Card>
        <ConversationTable records={log} />
      </Card>
    </AdminPage>
  );
}

export function ConversationDetailPage() {
  const { id = "" } = useParams();
  const { log, config } = useStudio();
  const record = log.find((r) => r.id === id);
  useDocumentTitle(record ? `${record.ref} · Support Studio` : "Conversation");
  if (!record) {
    return (
      <AdminPage title="Conversation not found" description="It may have been cleared from the log.">
        <Link to="/admin/conversations" className="link">
          Back to conversations
        </Link>
      </AdminPage>
    );
  }
  return (
    <AdminPage title={record.ref} description={`${record.contactName} · ${record.propertyName} · ${record.channel === "voice" ? "Voice" : "Chat"} · ${formatDateTime(record.startedAt)}`} action={<OutcomePill outcome={record.outcome} />}>
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <Card title="Transcript">
          <ol className="space-y-3">
            {record.transcript.map((line, i) => (
              <li key={i} className={cn("flex", line.role === "hotelier" ? "justify-end" : line.role === "system" ? "justify-center" : "justify-start")}>
                {line.role === "system" ? (
                  <span className="rounded-full bg-canvas px-3 py-1 text-xs text-ink-soft">{line.text}</span>
                ) : (
                  <span className={cn("max-w-[80%] rounded-[20px] px-4 py-2 text-sm", line.role === "hotelier" ? "bg-royal text-white" : "bg-canvas text-ink")}>
                    {line.role === "assistant" && <Bot className="mr-1 inline size-3.5 text-royal" aria-hidden />}
                    {line.text}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Card>
        <div className="space-y-4">
          <Card title="Routing">
            {record.queue ? (
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-xs text-ink-faint">Queue</dt>
                  <dd className="font-semibold">{queueName(config, record.queue)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-faint">Priority</dt>
                  <dd className="font-semibold">{record.priority}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-faint">Rule</dt>
                  <dd className="font-semibold">{record.ruleName ?? "Standard routing"}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-ink-soft">No handoff in this conversation.</p>
            )}
          </Card>
          <Card title="Flow path">
            <ol className="flex flex-wrap gap-1.5 text-xs">
              {record.trail.map((s, i) => (
                <li key={`${s}-${i}`} className="rounded-full bg-royal-tint px-2 py-0.5 font-mono text-royal">
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-ink-faint">
              {record.turns} hotelier turns · {record.engine === "grok" ? "Grok" : "Guided flow"} · {record.signedIn ? "Signed in" : "Guest"}
            </p>
          </Card>
        </div>
      </div>
    </AdminPage>
  );
}
