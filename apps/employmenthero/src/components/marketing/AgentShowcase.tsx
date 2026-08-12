import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";

const AGENTS = ["Recruitment Agent", "HR Agent", "Payroll Agent"] as const;
type Agent = (typeof AGENTS)[number];

const DETAIL: Record<Agent, { headline: string; body: string; steps: string[] }> = {
  "Recruitment Agent": {
    headline: "Screens and interviews so your shortlist is waiting",
    body: "Scores every application against your criteria, runs a structured first-round interview, and hands back a ranked shortlist with the reasoning attached.",
    steps: [
      "Reads the role and builds a scoring rubric you can edit",
      "Scores 600 applications an hour against that rubric",
      "Runs asynchronous first-round interviews",
      "Returns a ranked shortlist for your approval",
    ],
  },
  "HR Agent": {
    headline: "Drafts the paperwork and chases the follow-ups",
    body: "Turns a decision into the documents, tasks and reminders it implies — contract variations, casual conversion offers, policy rollouts and training assignments.",
    steps: [
      "Detects the trigger — an anniversary, a role change, a new policy",
      "Drafts the letter or offer against your templates",
      "Assigns the training and compliance tasks that follow",
      "Waits for a person to approve before anything sends",
    ],
  },
  "Payroll Agent": {
    headline: "Validates the run before you approve it",
    body: "Checks the draft pay run against twenty-two rules every cycle and reports what it found in plain language, with the dollar impact attached.",
    steps: [
      "Flags employees with hours but no superannuation fund",
      "Compares overtime against the published roster",
      "Checks base rates against current award minimums",
      "Links every finding to the line that produced it",
    ],
  },
};

export function AgentShowcase() {
  const [active, setActive] = useState<Agent>("Recruitment Agent");
  const detail = DETAIL[active];

  return (
    <div className="flex flex-col gap-8">
      <Tabs tabs={AGENTS} active={active} onChange={setActive} label="Hero AI agents" />
      <div className="grid gap-8 rounded-eh-xl border border-line bg-white p-8 md:grid-cols-2 md:p-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-extrabold tracking-tight text-ink-strong md:text-3xl">
            {detail.headline}
          </h3>
          <p className="text-[1.02rem] leading-relaxed text-ink-soft">{detail.body}</p>
          <p className="mt-2 rounded-eh bg-eh-tint px-4 py-3 text-sm font-semibold text-eh-purple-dark">
            Human in the loop — every action needs a person to approve it.
          </p>
        </div>
        <ol className="flex flex-col gap-3">
          {detail.steps.map((step, index) => (
            <li
              key={step}
              className={cn(
                "flex items-start gap-3 rounded-eh border border-line bg-surface-tint px-4 py-3.5",
                index === detail.steps.length - 1 && "border-eh-violet-soft bg-eh-tint",
              )}
            >
              <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-eh-purple" />
              <span className="text-[0.95rem] text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
