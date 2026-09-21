import { ChevronDown, ChevronRight, Fingerprint, Lock, Shield, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";

const ROWS = [
  { icon: Lock, title: "Manage GoPay PIN", detail: "Personalise the GoPay app the way you want. Make the app work for you." },
  { icon: Fingerprint, title: "Biometric Authentication", detail: "Learn about your opinions, and close your account if you wish." },
  { icon: Smartphone, title: "Trusted device", detail: "Login shortcuts for device you own" },
  { icon: Shield, title: "Security activity", detail: "Keep an eye on security alerts and suspicious activity." },
];

export function SecurityPage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <div className="bg-gradient-to-b from-security to-[#067a88] pb-16 text-static-white">
        <StatusBar tone="light" />
        <button type="button" onClick={() => navigate("/settings")} aria-label="Back" className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          ‹
        </button>
        <div className="mt-2 flex flex-col items-center">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15">
            <Shield className="h-14 w-14" aria-hidden="true" />
          </span>
          <p className="mt-3 rounded-full bg-white/20 px-4 py-1 text-sm font-bold">100% Stronger than ever</p>
        </div>
      </div>
      <div className="-mt-8 min-h-0 flex-1 overflow-y-auto px-4 pb-8">
        <button type="button" className="flex w-full items-center gap-3 rounded-2xl bg-[#1c6dff] px-3 py-3 text-left text-static-white">
          <Shield className="h-6 w-6" aria-hidden="true" />
          <span className="flex-1">
            <span className="block text-title-tiny font-bold">Digital fraud insurance</span>
            <span className="block text-xs text-white/80">Protect your online transaction from fraud or phishing.</span>
          </span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-[#7ad0ff] to-gopay-active" />
        <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-danger">
          6/6 actions completed <ChevronDown className="h-3 w-3" aria-hidden="true" />
        </p>
        <p className="text-xs text-text-body">You may need to update your security measure to ensure you are fully protected!</p>
        <h2 className="mb-2 mt-5 text-title-tiny font-bold">Other security settings</h2>
        <div className="overflow-hidden rounded-2xl bg-card">
          {ROWS.map((row) => {
            const Icon = row.icon;
            return (
            <div key={row.title} className="flex items-center gap-3 border-b border-border-mute px-3 py-3 last:border-b-0">
              <Icon className="h-5 w-5 text-icon-default" aria-hidden="true" />
              <span className="flex-1">
                <span className="block text-title-tiny font-semibold">{row.title}</span>
                <span className="block text-xs text-text-body">{row.detail}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-icon-default" aria-hidden="true" />
            </div>
            );
          })}
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}
