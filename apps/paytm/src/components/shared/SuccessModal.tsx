import { CheckCircle2 } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export interface SuccessLine {
  label: string;
  value: string;
}

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  lines: SuccessLine[];
}

/** Simulated payment/booking confirmation used by every demo form. */
export function SuccessModal({ open, onClose, title, lines }: SuccessModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-2 text-center">
          <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-success" />
          <p className="text-sm font-semibold text-ink">Simulated successfully</p>
          <DemoRibbon label="Demo only — no money moved" className="border-hairline text-ink-soft" />
        </div>
        <dl className="divide-y divide-hairline rounded-xl border border-hairline">
          {lines.map((line) => (
            <div key={line.label} className="flex items-center justify-between gap-4 px-4 py-2.5">
              <dt className="text-xs text-ink-soft">{line.label}</dt>
              <dd className="text-sm font-semibold text-ink">{line.value}</dd>
            </div>
          ))}
        </dl>
        <Button className="w-full" onClick={onClose}>
          Done
        </Button>
      </div>
    </Modal>
  );
}
