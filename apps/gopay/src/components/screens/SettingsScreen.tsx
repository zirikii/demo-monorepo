import { ChevronRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "@/data/identity";
import { GENIE_BANNER } from "@/data/identity";
import { NavBar, Phone, StatusBar } from "@/components/chrome/Chrome";
import { useSession } from "@/hooks/useSession";
import { isOddDue, isOverdue } from "@/lib/kyc";

const ROWS = [
  { label: "Security", to: "/safety" },
  { label: "Login options", to: "/safety" },
  { label: "Verified Account Center", to: "/account" },
  { label: "Privacy", to: "/privacy" },
  { label: "Linked Apps", to: "/help" },
  { label: "Shared wallets", to: "/help" },
  { label: "Accessibility", to: "/help" },
  { label: "Notification", to: "/help" },
  { label: "Change language", to: "/help" },
  { label: "Help Centre", to: "/help" },
  { label: "Chat with Dira", to: "/dira" },
] as const;

export function SettingsScreen() {
  const navigate = useNavigate();
  const { account, genie, setGenie } = useSession();
  const now = new Date();
  const showBanner = isOddDue(account.oddDueAt, now, 30) && !isOverdue(account.oddDueAt, now);
  const overdue = isOverdue(account.oddDueAt, now);

  return (
    <Phone>
      <StatusBar />
      <NavBar title="Settings" />
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {genie ? (
          <button
            type="button"
            onClick={() => setGenie(null)}
            className="mb-3 w-full rounded-2xl bg-card px-4 py-3 text-left text-[13px] font-semibold text-ink shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"
          >
            {GENIE_BANNER}
            <span className="mt-1 block text-[12px] font-normal text-body">Tap to dismiss</span>
          </button>
        ) : null}
        {(showBanner || overdue) && (
          <button
            type="button"
            onClick={() => navigate("/review")}
            className="mb-3 w-full rounded-2xl bg-[#e7f6e8] px-4 py-3 text-left"
          >
            <p className="text-[14px] font-bold text-gopay-ink">Update your e-KTP data</p>
            <p className="mt-1 text-[12px] leading-4 text-body">
              Bank Indonesia requires a periodic check. Confirm or update your e-KTP before your
              review date.
            </p>
          </button>
        )}
        <div className="mb-4 flex items-center gap-3 rounded-[20px] bg-card p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          <div className="flex size-12 items-center justify-center rounded-full bg-gopay text-[18px] font-bold text-white">
            {PROFILE.fullName.slice(0, 1)}
          </div>
          <div>
            <p className="text-[16px] font-semibold">{PROFILE.fullName}</p>
            <p className="text-[13px] text-body">{PROFILE.phone}</p>
            <p className="text-[13px] text-body">{PROFILE.email}</p>
          </div>
        </div>
        <ul className="overflow-hidden rounded-[20px] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          {ROWS.map((row) => (
            <li key={row.label} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => navigate(row.to)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              >
                <Shield className="size-5 text-gopay" aria-hidden="true" />
                <span className="flex-1 text-[15px]">{row.label}</span>
                <ChevronRight className="size-4 text-inactive" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-[12px] text-faint">App version 1.0</p>
      </div>
    </Phone>
  );
}
