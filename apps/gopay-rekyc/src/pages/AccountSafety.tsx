import { ChevronRight, HelpCircle, LogOut, Settings, Shield } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { Navbar } from "../components/ui/Navbar";
import { useDemo } from "../context/useDemo";

export function AccountSafetyPage() {
  const navigate = useNavigate();
  const { account } = useDemo();
  const name = account?.account.displayName ?? "Nuansa";
  const phone = account?.account.phone ?? "+628187888188";
  const email = account?.account.email ?? "hanz@gmail.com";

  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <StatusBar />
      <Navbar title="Account & Safety" onBack={() => navigate("/")} />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d9efe0] text-lg font-bold text-gopay-active">
            {name.slice(0, 1)}
          </span>
          <span>
            <span className="block text-title-small font-bold">{name}</span>
            <span className="block text-xs text-text-body">{phone}</span>
            <span className="block text-xs text-text-body">{email}</span>
          </span>
        </div>
        <section className="mb-4 rounded-2xl bg-card p-3">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-title-tiny font-bold">Account protection</h2>
            <Shield className="h-5 w-5 text-[#f2c94c]" aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold text-[#e2a100]">60% → Nanggung, tambah lagi!</p>
          <p className="mt-1 text-xs text-text-body">You need update your xxx, yyy, zzz and xyz to make your account protection even stronger.</p>
          <button type="button" onClick={() => navigate("/security")} className="mt-3 w-full rounded-full bg-[#e7f6ea] py-2 text-xs font-bold text-gopay-active">
            Tap to strengthen your protection
          </button>
        </section>
        <Row icon={<Settings className="h-5 w-5" />} title="Settings" detail="Control your app preferences, data, linked apps and more" onClick={() => navigate("/settings")} />
        <Row icon={<HelpCircle className="h-5 w-5" />} title="Help Centre" detail="Report a problem and track your tickets here" onClick={() => navigate("/dira")} />
        <section className="mt-4 rounded-2xl bg-card p-3">
          <h2 className="text-title-tiny font-bold">Reminder</h2>
          <p className="text-xs text-text-body">Stay on top of things you haven&apos;t finished yet.</p>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f4f1ff] px-3 py-2">
            <span className="text-xs font-bold text-[#5b4bdb]">gopay amaze</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">Discover</span>
          </div>
        </section>
        <section className="mt-4">
          <h2 className="mb-2 text-title-tiny font-bold">Simplified Policy</h2>
          <p className="text-xs text-text-body">We will never ever share your private data with anyone. Data privacy, that&apos;s us!</p>
        </section>
        <section className="mt-4">
          <h2 className="text-title-tiny font-bold">About Us</h2>
          <p className="mt-1 text-xs text-text-body">
            We aim to provide the fastest and the safest payment experience to our customers. You can always count on us for anything related to payments!
          </p>
        </section>
        <p className="mt-6 text-center text-[10px] text-text-body">App version Alpha 01</p>
        <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-bold text-danger">
          <LogOut className="h-4 w-4" aria-hidden="true" /> Logout
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

function Row({
  icon,
  title,
  detail,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-card px-3 py-3 text-left">
      <span className="text-icon-default">{icon}</span>
      <span className="flex-1">
        <span className="block text-title-tiny font-semibold">{title}</span>
        <span className="block text-xs text-text-body">{detail}</span>
      </span>
      <ChevronRight className="h-4 w-4 text-icon-default" aria-hidden="true" />
    </button>
  );
}
