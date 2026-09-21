import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "@/data/identity";
import { NavBar, Phone, StatusBar } from "@/components/chrome/Chrome";

export function SafetyScreen() {
  const navigate = useNavigate();
  return (
    <Phone>
      <StatusBar />
      <NavBar title="Account & safety" onBack={() => navigate("/")} />
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="rounded-[20px] bg-card p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          <p className="text-[16px] font-semibold">{PROFILE.fullName}</p>
          <p className="text-[13px] text-body">{PROFILE.phone}</p>
          <p className="text-[13px] text-body">{PROFILE.email}</p>
        </div>
        <div className="mt-3 rounded-[20px] bg-card p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold">Account protection</p>
            <p className="text-[14px] font-bold text-gopay">60%</p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-mute">
            <div className="h-full w-[60%] rounded-full bg-gopay" />
          </div>
          <p className="mt-3 text-[13px] font-semibold text-ink">Nanggung, tambah lagi!</p>
          <p className="mt-1 text-[12px] leading-4 text-body">
            You need to update your e-KTP, PIN, and trusted device to make your account protection
            even stronger.
          </p>
        </div>
        <ul className="mt-3 overflow-hidden rounded-[20px] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          {[
            { label: "Verified Account Center", to: "/account" },
            { label: "Help Centre", to: "/help" },
            { label: "Chat with Dira", to: "/dira" },
          ].map((row) => (
            <li key={row.label} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => navigate(row.to)}
                className="flex w-full items-center px-4 py-3.5 text-left"
              >
                <span className="flex-1 text-[15px]">{row.label}</span>
                <ChevronRight className="size-4 text-inactive" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Phone>
  );
}
