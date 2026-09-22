import { ChevronRight, IdCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "@/data/identity";
import { NavBar, Phone, StatusBar, Toast } from "@/components/chrome/Chrome";
import { useSession } from "@/hooks/useSession";
import { activeIdentity } from "@/lib/kyc";
import { maskedIdentity } from "@/lib/mask";

export function AccountCenterScreen() {
  const navigate = useNavigate();
  const { account, toast, clearToast } = useSession();
  const identity = activeIdentity(account);
  const masked = identity ? maskedIdentity(identity) : null;

  return (
    <Phone>
      <div className="h-28 bg-gradient-to-b from-[#d9f5dc] to-page" />
      <div className="absolute inset-x-0 top-0">
        <StatusBar />
        <NavBar title="Account Center" onBack={() => navigate("/")} />
      </div>
      {toast ? <Toast message={toast} onClose={clearToast} /> : null}
      <div className="-mt-2 flex-1 overflow-y-auto px-4 pb-8">
        <h2 className="text-[22px] font-semibold leading-7">Account Center</h2>
        <p className="mt-1 text-[14px] leading-5 text-body">
          You can manage accounts under the same KTP number.
        </p>
        <button
          type="button"
          onClick={() => navigate("/review")}
          className="mt-4 w-full rounded-[20px] bg-card p-3 text-left shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"
        >
          <span className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#e7f6e8] text-gopay">
              <IdCard className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] text-body">Verified Identity</span>
              <span className="block truncate text-[16px] font-semibold">
                {masked?.fullName ?? "—"}
              </span>
              <span className="block text-[13px] text-body">{masked?.nik ?? PROFILE.email}</span>
            </span>
            <ChevronRight className="size-5 text-inactive" aria-hidden="true" />
          </span>
          <span className="mt-3 flex items-start gap-2 rounded-xl bg-mute px-3 py-2 text-[12px] leading-4 text-body">
            Control all the data and app permissions that are shared with GoPay.
          </span>
        </button>
        <section className="mt-6">
          <h3 className="text-[16px] font-semibold">Connected Accounts</h3>
          <p className="mt-1 text-[13px] leading-5 text-body">
            You can switch account or unlink accounts that does not belong to you
          </p>
          <div className="mt-3 rounded-[20px] bg-card p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
            <p className="text-[14px] font-semibold">{PROFILE.fullName}</p>
            <p className="text-[13px] text-body">{PROFILE.phone}</p>
          </div>
        </section>
      </div>
    </Phone>
  );
}
