import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { Toast } from "../components/ui/Toast";
import { useDemo } from "../context/useDemo";

export function VerifiedAccountCenterPage() {
  const navigate = useNavigate();
  const { account, toast, dismissToast } = useDemo();
  const masked = account?.masked;

  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <div className="bg-gradient-to-b from-vac-header to-vac-header-end pb-6 text-static-white">
        <StatusBar tone="light" />
        <button
          type="button"
          onClick={() => navigate("/settings")}
          aria-label="Back"
          className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-text-title"
        >
          ‹
        </button>
        <h1 className="mt-3 text-center text-[28px] font-bold">Accounts Center</h1>
        <p className="mx-auto mt-1 max-w-[260px] text-center text-body-small text-white/90">
          You can manage accounts under the same KTP number.
        </p>
        <button
          type="button"
          onClick={() => navigate("/rekyc/review")}
          className="mx-4 mt-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-card px-3 py-3 text-left text-text-title"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e7f8ff]" aria-hidden="true">
            <span className="block h-6 w-8 rounded-sm bg-[#3ec0ea]" />
          </span>
          <span className="flex-1">
            <span className="block text-xs text-text-body">Verified Identity</span>
            <span className="block text-title-tiny font-bold">{masked?.fullName ?? "B*** P***"}</span>
            <span className="block text-xs text-text-body">{masked?.nik ?? "3276********0002"}</span>
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-quaternary">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4">
        <h2 className="text-title-small font-bold">Connected Accounts</h2>
        <p className="mb-3 text-xs text-text-body">You can switch account or unlink accounts that does not belong to you</p>
        <div className="rounded-2xl bg-card px-3">
          <AccountRow initials="BK" name="Budi Keren" detail="+62810 0000 0111" action="Logged in" solid />
          <AccountRow initials="BK" name="B*** K*** 2" detail="***0333 · ***@***.com" action="Switch" />
        </div>
        <button type="button" className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-card px-3 py-3 text-left">
          <span className="text-lg" aria-hidden="true">🧒</span>
          <span className="flex-1">
            <span className="block text-title-tiny font-semibold">Child accounts</span>
            <span className="block text-xs text-text-body">Manage all accounts under your KK</span>
          </span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <h2 className="mb-2 mt-5 text-title-small font-bold">Connected Experience</h2>
        <button type="button" className="flex w-full items-center gap-3 rounded-2xl bg-card px-3 py-3 text-left">
          <span className="text-lg" aria-hidden="true">👛</span>
          <span className="flex-1">
            <span className="block text-title-tiny font-semibold">Wallet & Tabungan</span>
            <span className="block text-xs text-text-body">View all wallets and balances</span>
          </span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {toast ? <Toast message={toast} onDismiss={dismissToast} /> : null}
      <HomeIndicator />
    </div>
  );
}

function AccountRow({
  initials,
  name,
  detail,
  action,
  solid = false,
}: {
  initials: string;
  name: string;
  detail: string;
  action: string;
  solid?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border-mute py-3 last:border-b-0">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gopay-active text-xs font-bold text-static-white">{initials}</span>
      <span className="flex-1">
        <span className="block text-title-tiny font-semibold">{name}</span>
        <span className="block text-xs text-text-body">{detail}</span>
      </span>
      <span className={solid ? "text-xs text-text-body" : "rounded-full bg-gopay-active px-3 py-1.5 text-xs font-bold text-static-white"}>{action}</span>
    </div>
  );
}
