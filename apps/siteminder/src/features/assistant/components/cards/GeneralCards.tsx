import { Activity, ArrowRight, CheckCircle2, ChevronDown, Headset, Info, ListChecks, Phone, Siren } from "lucide-react";
import { Link } from "react-router-dom";
import { useStudio } from "@/features/studio/StudioProvider";
import { cn } from "@/lib/cn";
import { useAssistant } from "../../AssistantProvider";
import type { FlowCard, TemplateValues } from "../../flows";
import { CardShell, Row } from "./CardShell";

type CardOf<K extends FlowCard["kind"]> = Extract<FlowCard, { kind: K }>;

function NumberedSteps({ steps, tone = "royal" }: { steps: string[]; tone?: "royal" | "critical" }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-2.5">
          <span className={cn("grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white", tone === "critical" ? "bg-critical" : "bg-royal")}>{i + 1}</span>
          <span className="text-ink">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function StepsCard({ card }: { card: CardOf<"steps"> }) {
  return (
    <CardShell title={card.title} icon={<ListChecks className="size-4 text-royal" aria-hidden />}>
      <NumberedSteps steps={card.steps} />
    </CardShell>
  );
}

export function UrgentCard({ card }: { card: CardOf<"urgent"> }) {
  return (
    <CardShell tone="danger" title={card.title} icon={<Siren className="size-4 text-critical" aria-hidden />}>
      <NumberedSteps steps={card.steps} tone="critical" />
    </CardShell>
  );
}

export function ContactCard({ card }: { card: CardOf<"contact"> }) {
  return (
    <CardShell title={card.title} icon={<Phone className="size-4 text-royal" aria-hidden />}>
      <ul className="divide-y divide-line-soft">
        {card.entries.map((e) => (
          <li key={e.label} className="flex items-center justify-between gap-3 py-2">
            <span>
              <span className="block font-semibold text-heading">{e.label}</span>
              {e.note && <span className="block text-xs text-ink-faint">{e.note}</span>}
            </span>
            <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="shrink-0 font-bold text-royal">
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
    <CardShell title={card.title} icon={<Info className="size-4 text-royal" aria-hidden />}>
      <p className="text-ink-soft">{card.body}</p>
      {card.link && (
        <Link to={card.link.to} className="link mt-2 inline-flex items-center gap-1 text-xs">
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

const SERVICES = ["Channel manager", "Booking engine", "SiteMinder Pay", "Insights", "Demand Plus"];

export function PlatformStatusCard({ values }: { values: TemplateValues }) {
  return (
    <CardShell title="SiteMinder status" icon={<Activity className="size-4 text-positive" aria-hidden />} aside={<span className="pill bg-positive-bg text-[11px] text-positive">All operational</span>}>
      <ul className="space-y-1.5">
        {SERVICES.map((s) => (
          <li key={s} className="flex items-center justify-between text-xs">
            <span className="text-heading">{s}</span>
            <span className="inline-flex items-center gap-1.5 text-positive">
              <span className="size-1.5 rounded-full bg-positive" aria-hidden /> Operational
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-faint">{values.statusLine}</p>
    </CardShell>
  );
}

export function HandoffCard({ values, live }: { values: TemplateValues; live: boolean }) {
  const { handoff } = useAssistant();
  const { config } = useStudio();
  const open = values.handoffOpen !== "no";
  return (
    <CardShell tone="brand" title={open ? "Connecting you with a specialist" : "We'll call you back"} icon={<Headset className="size-4 text-royal" aria-hidden />}>
      <div className="sm-night mb-3 flex items-center gap-3 rounded-2xl p-3 text-white">
        <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-white/10">
          {open && live && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime/40" aria-hidden />}
          <Headset className="relative size-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block leading-tight font-semibold">{values.handoffTeam}</span>
          <span className="block text-xs text-white/70">{open ? `Estimated wait ${values.handoffWait}` : "Outside live chat hours"}</span>
        </span>
        <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold text-stratos">{values.handoffPriority}</span>
      </div>
      <Row label="Reference" value={values.handoffRef} />
      <Row label="Routed by" value={values.handoffRule} />
      <p className="mt-1 text-xs text-ink-soft">{values.handoffReason}</p>
      {live && handoff && config.assistant.showRoutingNotes && (
        <details className="group mt-3 rounded-xl bg-canvas p-2.5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold text-heading">
            Why this team? <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <ol className="mt-2 space-y-1">
            {handoff.trace.map((t) => (
              <li key={t.ruleId} className={cn("flex items-start gap-2 text-[11px]", !t.enabled && "opacity-50")}>
                <span className={cn("mt-1 size-1.5 shrink-0 rounded-full", t.matched ? "bg-positive" : "bg-line")} aria-hidden />
                <span>
                  <span className={cn("font-semibold", t.matched && "text-positive")}>{t.name}</span> — {t.reason}
                </span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </CardShell>
  );
}
