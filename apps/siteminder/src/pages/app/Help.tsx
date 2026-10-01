import { CheckCircle2, Copy, MessageSquare, Mic, Phone } from "lucide-react";
import { useState } from "react";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { TopicIcon } from "@/features/assistant/components/TopicIcon";
import { popularQuestions, topics } from "@/features/assistant/flows/topics";
import { useProperty } from "@/features/property/PropertyProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageTitle, Panel } from "./ui";

const PHONES = [
  ["Australia", "1800 975 234"],
  ["New Zealand", "0800 446 080"],
  ["United Kingdom", "+44 20 3966 5800"],
  ["United States", "+1 866 609 7024"],
];

const SERVICES = ["Channel manager", "Booking engine", "SiteMinder Pay", "Insights", "Demand Plus"];

export function HelpPage() {
  useDocumentTitle("Help & support");
  const { open } = useAssistant();
  const { property } = useProperty();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard?.writeText(property.supportCode).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle title="Help & support" body="Answers, fixes and a real person whenever you need one — 24/7, in 9 languages." />

      <section className="sm-night relative overflow-hidden rounded-panel p-8 text-white md:p-10">
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime">SiteMinder Support</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Fix it in the chat, or just say it.</h2>
          <p className="mt-2 text-white/75">Support already knows your property, channels, bookings and the events you&apos;ve traded, so you can skip the account questions.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-lime px-6 py-3" onClick={() => open()}>
              <MessageSquare className="size-4" aria-hidden /> Start a chat
            </button>
            <button type="button" className="btn-ghost-white px-6 py-3" onClick={() => open({ mode: "voice" })}>
              <Mic className="size-4" aria-hidden /> Talk to Support
            </button>
          </div>
        </div>
        <span className="pointer-events-none absolute -right-16 -top-16 hidden size-80 rounded-full border-[36px] border-royal-bright/25 md:block" aria-hidden />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="What do you need help with?">
          <div className="grid gap-2 sm:grid-cols-2">
            {topics.map((t) => (
              <button key={t.id} type="button" onClick={() => open({ step: t.entry, label: t.label })} className="flex items-start gap-3 rounded-xl border border-line-soft p-3 text-left hover:border-royal/30 hover:bg-royal-tint/40">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-royal-tint text-royal">
                  <TopicIcon icon={t.icon} className="size-[18px]" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-heading">{t.label}</span>
                  <span className="block text-xs text-ink-faint">{t.description}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-faint">Popular right now</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {popularQuestions.map((q) => (
              <li key={q.step}>
                <button type="button" onClick={() => open({ step: q.step, label: q.label })} className="pill border border-line bg-white py-1.5 text-ink-soft hover:border-royal hover:text-royal">
                  {q.label}
                </button>
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-6">
          <Panel title="Your support code">
            <p className="text-sm text-ink-soft">Share this so our team can find your property without your password. Valid for 24 hours.</p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 rounded-xl bg-canvas px-4 py-3 font-mono text-lg font-semibold tracking-wider text-heading">{property.supportCode}</code>
              <button type="button" onClick={copy} className="btn-outline" aria-label="Copy support code">
                {copied ? <CheckCircle2 className="size-4 text-positive" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </Panel>
          <Panel title="Platform status">
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-center justify-between">
                  <span className="text-heading">{s}</span>
                  <span className="inline-flex items-center gap-1.5 text-positive">
                    <span className="size-2 rounded-full bg-positive" aria-hidden /> Operational
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Call us">
            <ul className="space-y-2 text-sm">
              {PHONES.map(([region, phone]) => (
                <li key={region} className="flex items-center justify-between">
                  <span className="text-ink-soft">{region}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-heading">
                    <Phone className="size-3.5" aria-hidden /> {phone}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
