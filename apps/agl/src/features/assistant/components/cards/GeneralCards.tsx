import { CircleCheck, Headset, Info, Phone, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { telHref } from "@/lib/format";
import type { ContactEntry } from "../../flows/types";
import { CardShell } from "./CardShell";

export function StepsCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <CardShell title={title}>
      <ol className="space-y-2.5">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-agl-sky text-xs font-extrabold text-agl-blue-dark">
              {i + 1}
            </span>
            <span className="pt-0.5 text-ink">{step}</span>
          </li>
        ))}
      </ol>
    </CardShell>
  );
}

export function ContactCard({ title, entries }: { title: string; entries: ContactEntry[] }) {
  return (
    <CardShell title={title} icon={<Phone className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <ul className="space-y-2">
        {entries.map((e) => (
          <li key={e.label}>
            <a
              href={telHref(e.phone)}
              className="flex items-center justify-between gap-3 rounded-xl border border-line-soft px-3 py-2.5 hover:border-agl-blue hover:bg-agl-sky"
            >
              <span>
                <span className="block font-bold text-ink">{e.label}</span>
                {e.note && <span className="block text-xs text-ink-faint">{e.note}</span>}
              </span>
              <span className="shrink-0 font-extrabold text-agl-blue">{e.phone}</span>
            </a>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

export function EmergencyCard() {
  return (
    <CardShell tone="danger">
      <div className="flex items-start gap-3">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-critical" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-extrabold text-critical">In danger? Call 000 now.</p>
          <p className="mt-0.5 text-ink-soft">For life-threatening emergencies, gas leaks or fire, call emergency services first.</p>
        </div>
        <a href="tel:000" className="rounded-full bg-critical px-4 py-2 text-sm font-extrabold text-white hover:bg-[#a30f27]">
          Call 000
        </a>
      </div>
    </CardShell>
  );
}

export function InfoCard({ title, body, link }: { title: string; body: string; link?: { label: string; to: string } }) {
  return (
    <CardShell tone="sky" title={title} icon={<Info className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <p className="text-ink">{body}</p>
      {link && (
        <Link to={link.to} className="mt-3 inline-flex font-bold text-agl-blue underline-offset-2 hover:underline">
          {link.label} →
        </Link>
      )}
    </CardShell>
  );
}

export function SuccessCard({ title, detail }: { title: string; detail: string }) {
  return (
    <CardShell tone="success">
      <div className="flex items-start gap-3">
        <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
        <div>
          <p className="font-extrabold text-positive">{title}</p>
          <p className="mt-0.5 text-ink">{detail}</p>
        </div>
      </div>
    </CardShell>
  );
}

export function HandoffCard({ summary }: { summary: string[] }) {
  return (
    <CardShell>
      <div className="flex items-center gap-3">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-agl-sky">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ray-cyan/40" aria-hidden="true" />
          <Headset className="relative h-5 w-5 text-agl-blue" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <p className="font-extrabold text-ink">Connecting you to the team</p>
          <p className="text-xs text-ink-faint">Estimated wait: about 2 minutes · You’re 3rd in line</p>
        </div>
      </div>
      {summary.length > 0 && (
        <div className="mt-3 rounded-xl bg-surface-tint p-3">
          <p className="mb-1 text-xs font-bold tracking-wide text-ink-faint uppercase">Shared with the team</p>
          <p className="text-ink">{summary.join(" › ")}</p>
        </div>
      )}
    </CardShell>
  );
}
