import { ChevronDown, ChevronUp } from "lucide-react";
import { FIELD_LABELS } from "../../data/copy";
import { COLLAPSED_FIELDS, EXPANDED_FIELDS, type MaskedEktp } from "../../lib/mask";
import { BottomCtaBar } from "../ui/BottomCtaBar";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { DataRow } from "../ui/DataRow";

export function EktpReview({
  masked,
  expanded,
  onToggle,
  onConfirm,
  onUpdate,
  busy,
}: {
  masked: MaskedEktp;
  expanded: boolean;
  onToggle: () => void;
  onConfirm: () => void;
  onUpdate: () => void;
  busy?: boolean;
}) {
  const fields = expanded ? [...COLLAPSED_FIELDS, ...EXPANDED_FIELDS] : [...COLLAPSED_FIELDS];
  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <Card className="mb-3 flex items-center gap-3 px-3 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e7f8ff] text-lg" aria-hidden="true">
            <span className="block h-6 w-8 rounded-sm bg-[#3ec0ea]" />
          </span>
          <span>
            <span className="block text-xs text-text-body">Full name</span>
            <span className="block text-title-small font-bold">{masked.fullName}</span>
          </span>
        </Card>
        <Card>
          <dl>
            {fields.map((field) => (
              <DataRow key={field} label={FIELD_LABELS[field]} value={masked[field]} />
            ))}
          </dl>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1 py-3 text-body-small font-semibold text-text-body"
            aria-expanded={expanded}
            onClick={onToggle}
          >
            {expanded ? "See less data" : "See more data"}
            {expanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
          </button>
        </Card>
      </div>
      <BottomCtaBar>
        <Button onClick={onConfirm} disabled={busy}>
          My data is still the same
        </Button>
        <Button variant="ghost" onClick={onUpdate} disabled={busy}>
          I need to update my e-KTP data
        </Button>
      </BottomCtaBar>
    </>
  );
}
