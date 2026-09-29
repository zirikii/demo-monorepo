import { Link } from "react-router-dom";
import { AudioLines, MessageCircle } from "lucide-react";
import { AglRays } from "@/components/brand/AglRays";
import { popularQuestions } from "@/features/assistant/flows";
import { useAssistant } from "@/features/assistant/AssistantProvider";

export function HelpTeaser() {
  const { open } = useAssistant();
  return (
    <div className="grid gap-8 rounded-agl-xl bg-agl-sky p-8 lg:grid-cols-[1fr_1.1fr] lg:p-12">
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-agl">
          <AglRays className="h-9 w-9" animated />
        </div>
        <h2 className="mt-5 text-3xl font-extrabold text-agl-blue-dark">Need a hand? Ask the AGL Assistant</h2>
        <p className="mt-2 text-ink-soft">
          Chat or talk to our assistant any time — it can pay a bill, troubleshoot your nbn®, book your move and hand you to our team when
          you need a person.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => open()}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-agl-blue px-6 font-bold text-white hover:bg-agl-blue-hover"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat with us
          </button>
          <button
            type="button"
            onClick={() => open({ mode: "voice" })}
            className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-agl-blue px-6 font-bold text-agl-blue hover:bg-white"
          >
            <AudioLines className="h-4 w-4" aria-hidden="true" /> Talk to us
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm font-extrabold tracking-wider text-agl-teal-ink uppercase">Popular questions</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {popularQuestions.map((q) => (
            <li key={q.step}>
              <button
                type="button"
                onClick={() => open({ step: q.step, label: q.label })}
                className="flex w-full items-center justify-between gap-2 rounded-agl bg-white px-4 py-3 text-left font-bold text-ink shadow-agl hover:text-agl-blue"
              >
                {q.label} <span aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>
        <Link to="/help" className="mt-4 inline-flex font-bold text-agl-blue hover:underline">
          Browse Help & Support →
        </Link>
      </div>
    </div>
  );
}
