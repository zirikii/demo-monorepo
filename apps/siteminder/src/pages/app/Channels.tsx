import { Plus, RefreshCw } from "lucide-react";
import { useProperty } from "@/features/property/PropertyProvider";
import { CHANNEL_KIND_LABELS, channelIssue } from "@/features/property/views";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { AskSupport, ChannelBadge, PageTitle, Panel, Stat } from "./ui";

export function ChannelsPage() {
  useDocumentTitle("Channels");
  const { channels } = useProperty();
  const issues = channels.filter(channelIssue);
  const connected = channels.length - issues.length;

  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle
        title="Channels"
        body="Every channel you sell on, synced in real time with your PMS."
        actions={
          <AskSupport
            step="channels.add"
            label="Connect a new channel"
            className="btn-primary text-white hover:no-underline"
          >
            <Plus className="size-4" aria-hidden /> Connect a channel
          </AskSupport>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Connected" value={`${connected} of ${channels.length}`} />
        <Stat
          label="Need attention"
          value={String(issues.length)}
          tone={issues.length ? "critical" : "positive"}
          hint={issues.length ? issues.map((c) => c.name).join(", ") : "All healthy"}
        />
        <Stat label="Average sync time" value="1.8s" hint="Two-way, real time" tone="positive" />
      </div>
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="pb-3 font-semibold">Channel</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Last sync</th>
                <th className="pb-3 text-right font-semibold">Bookings (30d)</th>
                <th className="pb-3 text-right font-semibold">Revenue (30d)</th>
                <th className="pb-3 text-right font-semibold">Commission</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {channels.map((c) => (
                <tr key={c.id} className={channelIssue(c) ? "bg-critical-bg/30" : undefined}>
                  <td className="py-3 pr-4">
                    <span className="block font-semibold text-heading">{c.name}</span>
                    <span className="text-xs text-ink-faint">{CHANNEL_KIND_LABELS[c.kind]}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <ChannelBadge status={c.status} />
                    {c.issueRoom && (
                      <span className="mt-1 block text-xs text-critical">
                        {c.issueRoom} not mapped
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-ink-soft">{formatDateTime(c.lastSync)}</td>
                  <td className="py-3 pr-4 text-right tabular-nums">{c.bookings30d}</td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    {formatCurrency(c.revenue30d)}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">{c.commissionPct}%</td>
                  <td className="py-3 text-right">
                    {channelIssue(c) ? (
                      <AskSupport step="channels" recordId={c.id} label={`Fix ${c.name}`}>
                        Fix with Support
                      </AskSupport>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-positive">
                        <RefreshCw className="size-3.5" aria-hidden /> Live
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
