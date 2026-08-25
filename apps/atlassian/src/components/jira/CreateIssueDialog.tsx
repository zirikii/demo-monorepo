import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextInput } from "@/components/ui/Field";
import type { IssueStatus, IssueType } from "@/data/types";

const TYPES: IssueType[] = ["Story", "Task", "Bug", "Epic"];

export function CreateIssueDialog({
  status,
  assignee,
  open,
  onClose,
  onCreate,
}: {
  status: IssueStatus;
  assignee: string;
  open: boolean;
  onClose: () => void;
  onCreate: (input: { summary: string; type: IssueType; status: IssueStatus }) => void;
}) {
  const [summary, setSummary] = useState("");
  const [type, setType] = useState<IssueType>("Story");

  function resetAndClose() {
    setSummary("");
    setType("Story");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-atl-navy-deep/40 p-4">
      <form
        aria-labelledby="create-issue-title"
        className="w-full max-w-md rounded-atl-lg border border-line bg-white p-6 shadow-atl-lift"
        onSubmit={(event) => {
          event.preventDefault();
          const trimmed = summary.trim();
          if (!trimmed) return;
          onCreate({ summary: trimmed, type, status });
          resetAndClose();
        }}
      >
        <h2 id="create-issue-title" className="text-lg font-extrabold text-ink-strong">
          Create work item
        </h2>
        <p className="mt-1 text-sm text-ink-faint">
          Lands in <strong className="text-ink-soft">{status}</strong> as {assignee}.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <Field label="Summary" htmlFor="create-summary">
            <TextInput
              id="create-summary"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="What needs to be done?"
              autoFocus
            />
          </Field>
          <Field label="Type" htmlFor="create-type">
            <Select
              id="create-type"
              value={type}
              onChange={(event) => setType(event.target.value as IssueType)}
            >
              {TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="secondary" shape="box" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button type="submit" shape="box" disabled={!summary.trim()}>
            Create work item
          </Button>
        </div>
      </form>
    </div>
  );
}
