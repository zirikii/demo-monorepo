import { Modal } from "../ui/Modal";
import { AppStoreBadges } from "./AppStoreBadges";

interface DownloadAppModalProps {
  open: boolean;
  onClose: () => void;
}

/** QR-style download prompt; the QR is a decorative placeholder grid. */
export function DownloadAppModal({ open, onClose }: DownloadAppModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Get the Paytm app">
      <div className="space-y-5">
        <div className="flex items-center gap-5">
          <PlaceholderQr />
          <p className="text-sm leading-relaxed text-ink-soft">
            Scan with your phone camera to download the app for UPI payments, recharges, and
            ticket bookings on the go. (Demo placeholder — links are disabled.)
          </p>
        </div>
        <AppStoreBadges />
      </div>
    </Modal>
  );
}

function PlaceholderQr() {
  // 9x9 deterministic pattern — purely decorative, not a real QR code.
  const cells = Array.from({ length: 81 }, (_, i) => (i * 7 + 3) % 5 < 2);
  return (
    <div
      aria-hidden="true"
      className="grid shrink-0 grid-cols-9 gap-0.5 rounded-xl border border-hairline bg-white p-2"
    >
      {cells.map((filled, i) => (
        <span key={i} className={`h-2.5 w-2.5 rounded-[2px] ${filled ? "bg-paytm-navy" : "bg-white"}`} />
      ))}
    </div>
  );
}
