import { ChevronRight, Phone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";

const REASONS = [
  "I need to update my e-KTP data",
  "Issues with Bank transfer or e-wallet",
  "Issues with GoPay Later transaction",
];

const TOPICS = [
  "Top up",
  "Withdraw money",
  "Scam/Phising",
  "Account",
  "Transaction Issue",
  "Fraud & security",
  "Product & services",
  "Other",
];

export function DiraPage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <div className="bg-gradient-to-b from-[#1493d6] to-[#0b78c4] pb-8 text-static-white">
        <StatusBar tone="light" />
        <div className="flex items-center justify-between px-4">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-text-title">
            ‹
          </button>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">My Inquires</span>
        </div>
        <h1 className="mt-4 text-center text-[26px] font-extrabold">Any relevant issues?</h1>
        <div className="mx-4 mt-4 overflow-hidden rounded-2xl bg-card text-text-title">
          {REASONS.map((reason) => (
            <button
              key={reason}
              type="button"
              onClick={() => reason.startsWith("I need") && navigate("/rekyc/review")}
              className="flex w-full items-center gap-3 border-b border-border-mute px-3 py-3 text-left text-body-small font-semibold"
            >
              <span className="text-gopay-active" aria-hidden="true">✦</span>
              <span className="flex-1">{reason}</span>
              <ChevronRight className="h-4 w-4 text-icon-default" aria-hidden="true" />
            </button>
          ))}
          <button type="button" className="flex w-full items-center gap-3 px-3 py-3 text-left">
            <span aria-hidden="true">🎧</span>
            <span className="flex-1">
              <span className="block text-body-small font-semibold">My issue is not listed here</span>
              <span className="block text-xs text-text-body">Ask here if you need assistance</span>
            </span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-title-small font-bold">All topics</h2>
          <span className="flex items-center gap-1 text-xs text-text-body">
            <Search className="h-3.5 w-3.5" aria-hidden="true" /> Search
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map((topic) => (
            <div key={topic} className="rounded-2xl bg-card px-3 py-4 text-title-tiny font-semibold shadow-sm">
              {topic}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-card px-3 py-3">
          <span>
            <span className="block text-title-tiny font-bold">Need more help?</span>
            <span className="block text-xs text-text-body">We will try help as much as we can</span>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f6ea] text-gopay-active">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}
