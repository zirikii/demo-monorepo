import { ArrowRight, CheckCircle2, ChevronDown, Headset, Info, ListChecks, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useFan } from "@/features/fan/FanProvider";
import { recommend } from "@/features/fan/recommendations";
import { useStudio } from "@/features/studio/StudioProvider";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { useAssistant } from "../../AssistantProvider";
import type { FlowCard, TemplateValues } from "../../flows";
import { CardShell, Row } from "./CardShell";

type CardOf<K extends FlowCard["kind"]> = Extract<FlowCard, { kind: K }>;

export function StepsCard({ card }: { card: CardOf<"steps"> }) {
  return (
    <CardShell title={card.title} icon={<ListChecks className="size-4 text-tk-blue" aria-hidden />}>
      <ol className="space-y-2">
        {card.steps.map((step, i) => (
          <li key={step} className="flex gap-2.5">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-midnight text-[11px] font-bold text-white">{i + 1}</span>
            <span className="text-ink">{step}</span>
          </li>
        ))}
      </ol>
    </CardShell>
  );
}

export function ContactCard({ card }: { card: CardOf<"contact"> }) {
  return (
    <CardShell title={card.title} icon={<Phone className="size-4 text-tk-blue" aria-hidden />}>
      <ul className="divide-y divide-line-soft">
        {card.entries.map((e) => (
          <li key={e.label} className="flex items-center justify-between gap-3 py-2">
            <span>
              <span className="block font-semibold">{e.label}</span>
              {e.note && <span className="block text-xs text-ink-faint">{e.note}</span>}
            </span>
            <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="shrink-0 font-bold text-tk-blue">
              {e.phone}
            </a>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

export function InfoCard({ card }: { card: CardOf<"info"> }) {
  return (
    <CardShell title={card.title} icon={<Info className="size-4 text-tk-blue" aria-hidden />}>
      <p className="text-ink-soft">{card.body}</p>
      {card.link && (
        <Link to={card.link.to} className="link mt-2 inline-flex items-center gap-1 text-xs font-semibold">
          {card.link.label} <ArrowRight className="size-3" aria-hidden />
        </Link>
      )}
    </CardShell>
  );
}

export function SuccessCard({ card }: { card: CardOf<"success"> }) {
  return (
    <CardShell tone="success" title={card.title} icon={<CheckCircle2 className="size-4 text-positive" aria-hidden />}>
      <p className="text-ink">{card.detail}</p>
    </CardShell>
  );
}

export function RecommendationsCard() {
  const { profile, orders, signedIn } = useFan();
  const picks = recommend(profile, signedIn ? orders : [], { limit: 3 });
  return (
    <CardShell tone="brand" title="Picked for you" icon={<Sparkles className="size-4 text-tk-jacaranda" aria-hidden />}>
      <ul className="space-y-2">
        {picks.map((r) => (
          <li key={r.event.slug}>
            <Link to={`/shows/${r.event.slug}`} className="flex items-center gap-3 rounded-tk p-1 hover:bg-page">
              <img src={asset(r.event.image)} alt="" className="h-11 w-18 shrink-0 rounded-tk object-cover" />
              <span className="min-w-0">
                <span className="block truncate font-semibold">{r.event.name}</span>
                <span className="block truncate text-xs text-tk-jacaranda">{r.reason}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

export function HandoffCard({ values, live }: { values: TemplateValues; live: boolean }) {
  const { handoff } = useAssistant();
  const { config } = useStudio();
  const open = values.handoffOpen !== "no";
  return (
    <CardShell tone="brand" title={open ? "Connecting you with a person" : "We'll call you back"} icon={<Headset className="size-4 text-tk-jacaranda" aria-hidden />}>
      <div className="mb-3 flex items-center gap-3 rounded-tk bg-midnight p-3 text-white">
        <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-white/10">
          {open && live && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-tk-pink/40" aria-hidden />}
          <Headset className="relative size-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block leading-tight font-bold">{values.handoffTeam}</span>
          <span className="block text-xs text-white/70">{open ? `Estimated wait ${values.handoffWait}` : "Outside live chat hours"}</span>
        </span>
        <span className="rounded-full bg-tk-pink px-2 py-0.5 text-[11px] font-bold text-midnight">{values.handoffPriority}</span>
      </div>
      <Row label="Reference" value={values.handoffRef} />
      <Row label="Routed by" value={values.handoffRule} />
      <p className="mt-1 text-xs text-ink-soft">{values.handoffReason}</p>
      {live && handoff && config.assistant.showRoutingNotes && (
        <details className="group mt-3 rounded-tk bg-page p-2.5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold text-ink">
            Why this team? <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <ol className="mt-2 space-y-1">
            {handoff.trace.map((t) => (
              <li key={t.ruleId} className={cn("flex items-start gap-2 text-[11px]", !t.enabled && "opacity-50")}>
                <span className={cn("mt-1 size-1.5 shrink-0 rounded-full", t.matched ? "bg-tk-green" : "bg-line")} aria-hidden />
                <span>
                  <span className={cn("font-semibold", t.matched && "text-tk-green")}>{t.name}</span> — {t.reason}
                </span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </CardShell>
  );
}
