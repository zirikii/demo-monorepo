import { Bell, Gamepad2, Home, PawPrint, Plus, QrCode, Receipt, Smartphone, Split, UserRound, Wallet, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { useDemo } from "../context/useDemo";

const SERVICES = [
  { label: "Free Transfer", color: "#2f80ed", icon: Wallet },
  { label: "Pulsa", color: "#eb5757", icon: Smartphone },
  { label: "Data package", color: "#f2994a", icon: Zap },
  { label: "PLN", color: "#f2c94c", icon: Receipt },
  { label: "GoPay Pet", color: "#9b51e0", icon: PawPrint },
  { label: "Split Bill", color: "#27ae60", icon: Split },
  { label: "Games top up", color: "#2d9cdb", icon: Gamepad2 },
  { label: "View all", color: "#828282", icon: Wallet },
];

export function HomePage() {
  const navigate = useNavigate();
  const { account } = useDemo();
  const due = account?.account.oddDueAt;
  const dueLabel = due ? daysUntil(due) : "Due in 3 days";

  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <div className="bg-gradient-to-b from-home-header to-home-header-end text-static-white">
        <StatusBar tone="light" />
        <div className="flex items-center justify-between px-4">
          <span className="text-lg font-extrabold tracking-tight">gopay</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Fully protected</span>
          <button type="button" aria-label="Help" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
            ?
          </button>
        </div>
        <div className="flex items-end justify-between px-4 pb-3 pt-3">
          <div>
            <p className="text-2xl font-extrabold">
              Rp 50.000 <span aria-hidden="true">›</span>
            </p>
            <p className="text-xs text-white/80">5300 coins</p>
            <p className="mt-2 text-xs">Rp50.000 spent in Nov</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2 text-xs font-semibold">
              <Plus className="h-4 w-4" aria-hidden="true" /> Top up
            </span>
            <span className="flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2 text-xs font-semibold">
              <Wallet className="h-4 w-4" aria-hidden="true" /> Withdraw
            </span>
          </div>
        </div>
        <div className="flex gap-2 overflow-hidden px-4 pb-8">
          <button
            type="button"
            onClick={() => navigate("/rekyc/review")}
            className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold"
          >
            Update your e-KTP data
          </button>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">Pinjam up to 25mio</span>
        </div>
      </div>
      <div className="-mt-4 flex-1 overflow-y-auto rounded-t-3xl bg-bg-primary px-4 pb-24 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-title-small font-bold">Reminder</h2>
          <span className="rounded-full border border-gopay-active px-3 py-1 text-xs font-semibold text-gopay-active">View all</span>
        </div>
        <button
          type="button"
          onClick={() => navigate("/rekyc/review")}
          className="flex w-full items-center gap-3 rounded-2xl bg-[#fff8ee] px-3 py-3 text-left"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe1e1] text-danger" aria-hidden="true">
            !
          </span>
          <span className="flex-1">
            <span className="block text-title-tiny font-bold">Update your e-KTP data</span>
            <span className="block text-xs text-text-body">Make sure it&apos;s the most updated</span>
            <span className="block text-xs font-semibold text-danger">{dueLabel}</span>
          </span>
          <span className="rounded-full bg-gopay-active px-4 py-2 text-xs font-bold text-static-white">Update</span>
        </button>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-card px-3 py-3 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ece8ff] text-xs font-bold">Y</span>
          <span className="flex-1 text-xs">
            <span className="block font-bold">Task Y</span>
            <span className="block text-text-body">+621133020245</span>
            <span className="font-semibold text-danger">Rp1.088.292 · Due today</span>
          </span>
          <span className="rounded-full bg-gopay-active px-4 py-2 text-xs font-bold text-static-white">Pay</span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
            <div key={service.label} className="flex flex-col items-center gap-1 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-sm" style={{ color: service.color }}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[10px] leading-3 text-text-body">{service.label}</span>
            </div>
            );
          })}
        </div>
      </div>
      <nav aria-label="GoPay" className="absolute inset-x-0 bottom-0 flex items-end justify-around bg-card/95 px-2 pb-6 pt-2">
        <Tab icon={<Home className="h-5 w-5" />} label="Home" current />
        <Tab icon={<Wallet className="h-5 w-5" />} label="Finance" />
        <span className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-home-header text-static-white shadow-lg">
          <QrCode className="h-6 w-6" aria-hidden="true" />
        </span>
        <Tab icon={<Bell className="h-5 w-5" />} label="History" />
        <button type="button" onClick={() => navigate("/account-safety")} className="flex flex-col items-center text-[10px] text-gopay-active">
          <UserRound className="h-5 w-5" aria-hidden="true" />
          Profile
        </button>
      </nav>
      <HomeIndicator />
    </div>
  );
}

function Tab({ icon, label, current = false }: { icon: ReactNode; label: string; current?: boolean }) {
  return (
    <span className={current ? "flex flex-col items-center text-[10px] font-semibold text-gopay-active" : "flex flex-col items-center text-[10px] text-text-body"}>
      {icon}
      {label}
    </span>
  );
}

function daysUntil(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now();
  const days = Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
  if (days === 0) return "Due today";
  if (days === 1) return "Due in 1 day";
  return `Due in ${days} days`;
}
