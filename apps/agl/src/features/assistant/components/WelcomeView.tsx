import { ArrowRight, AudioLines, Zap } from "lucide-react";
import { AglRays } from "@/components/brand/AglRays";
import { latestBill } from "@/data/account";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency, formatDate } from "@/lib/format";
import { popularQuestions, topics } from "../flows";
import { useAssistant } from "../AssistantProvider";
import { TopicIcon } from "./TopicIcon";

export function WelcomeView() {
  const { user } = useAuth();
  const { goToStep, setMode, voice } = useAssistant();
  const bill = latestBill("electricity");

  return (
    <div className="space-y-5 px-4 pt-5 pb-4">
      <div className="animate-fade-up">
        <p className="text-sm font-semibold text-ink-soft">Hi {user?.firstName ?? "there"},</p>
        <h3 className="mt-0.5 text-2xl leading-tight font-extrabold text-ink">What&apos;s your query today?</h3>
      </div>

      <button
        type="button"
        onClick={() => setMode("voice")}
        className="group relative flex w-full animate-fade-up items-center gap-4 overflow-hidden rounded-agl-lg bg-gradient-to-br from-agl-navy via-agl-blue-dark to-agl-blue p-4 text-left text-white shadow-agl-lift"
        style={{ animationDelay: "60ms" }}
      >
        <span aria-hidden="true" className="pointer-events-none absolute -right-8 -bottom-10 h-32 w-32 rounded-full bg-ray-cyan/30 blur-2xl" />
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
          <AglRays className="h-9 w-9" animated state="idle" />
        </span>
        <span className="relative flex-1">
          <span className="block font-extrabold">Talk it through instead</span>
          <span className="block text-xs text-white/75">
            Speak naturally — I&apos;ll follow the same steps and show them here.
          </span>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-bold">
            <AudioLines className="h-3 w-3" aria-hidden="true" />
            {voice.grokConfigured ? "Grok voice" : "Voice (demo mode)"}
          </span>
        </span>
        <ArrowRight className="relative h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </button>

      {user && bill && (
        <button
          type="button"
          onClick={() => goToStep("billing.pay", "Pay my electricity bill")}
          className="flex w-full animate-fade-up items-center gap-3 rounded-agl-lg border border-line-soft bg-white p-3 text-left hover:border-agl-blue"
          style={{ animationDelay: "100ms" }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-agl-sky text-agl-blue">
            <Zap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-bold text-ink">Electricity bill {formatCurrency(bill.amount)}</span>
            <span className="block text-xs text-ink-faint">Due {formatDate(bill.due, "short")}</span>
          </span>
          <span className="rounded-full bg-agl-blue px-3 py-1.5 text-xs font-extrabold text-white">Pay now</span>
        </button>
      )}

      <section aria-labelledby="assistant-topics" className="animate-fade-up" style={{ animationDelay: "140ms" }}>
        <h4 id="assistant-topics" className="mb-2 text-xs font-extrabold tracking-wide text-ink-faint uppercase">
          Choose a topic
        </h4>
        <ul className="grid grid-cols-2 gap-2">
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                onClick={() => goToStep(topic.entry, topic.label)}
                className="flex h-full w-full flex-col items-start gap-2 rounded-agl border border-line-soft bg-white p-3 text-left transition-all hover:-translate-y-0.5 hover:border-agl-blue hover:shadow-agl"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-agl-sky text-agl-blue">
                  <TopicIcon icon={topic.icon} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm leading-tight font-bold text-ink">{topic.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-ink-faint">{topic.description}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="assistant-popular" className="animate-fade-up" style={{ animationDelay: "180ms" }}>
        <h4 id="assistant-popular" className="mb-2 text-xs font-extrabold tracking-wide text-ink-faint uppercase">
          Popular right now
        </h4>
        <div className="flex flex-wrap gap-2">
          {popularQuestions.map((q) => (
            <button
              key={q.step}
              type="button"
              onClick={() => goToStep(q.step, q.label)}
              className="rounded-full border border-agl-blue/30 bg-white px-3 py-1.5 text-sm font-bold text-agl-blue hover:border-agl-blue hover:bg-agl-sky"
            >
              {q.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
