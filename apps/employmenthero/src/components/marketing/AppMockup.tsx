import { CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { formatCurrency } from "@/lib/format";

/**
 * A styled representation of the Employment OS dashboard used in marketing heroes. It is
 * intentionally static — the real thing lives behind /platform.
 */
export function AppMockup() {
  return (
    <div className="rounded-eh-xl border border-white/15 bg-white p-3 shadow-eh-menu">
      <div className="rounded-eh-lg bg-surface-tint p-5">
        <div className="flex items-center justify-between">
          <BrandLogo markClassName="h-6 w-6" className="text-sm" />
          <span className="rounded-full bg-eh-tint px-2.5 py-1 text-[0.65rem] font-extrabold tracking-wide text-eh-purple uppercase">
            Hero AI
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: "Headcount", value: "16" },
            { label: "Open roles", value: "3" },
            { label: "Pending leave", value: "4" },
          ].map((tile) => (
            <div key={tile.label} className="rounded-eh border border-line bg-white px-3 py-3">
              <p className="text-xl font-extrabold text-ink-strong">{tile.value}</p>
              <p className="text-[0.7rem] text-ink-faint">{tile.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-eh border border-line bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-ink-strong">Draft pay run</p>
            <span className="rounded-full bg-caution-tint px-2 py-0.5 text-[0.65rem] font-bold text-caution">
              4 exceptions
            </span>
          </div>
          <p className="mt-1 text-2xl font-extrabold text-ink-strong">{formatCurrency(148920.4)}</p>
          <p className="text-xs text-ink-faint">16 employees · pay date 19 Aug 2026</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-deep">
            <div className="h-full w-3/4 rounded-full bg-eh-purple" />
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {[
            { icon: Sparkles, text: "Recruitment Agent shortlisted 6 of 41 applicants" },
            { icon: CheckCircle2, text: "3 new starters completed RSA training" },
            { icon: TrendingUp, text: "Turnover down 4.2% against last quarter" },
          ].map((row) => (
            <div
              key={row.text}
              className="flex items-center gap-2.5 rounded-eh border border-line bg-white px-3 py-2.5"
            >
              <row.icon aria-hidden className="h-4 w-4 shrink-0 text-eh-purple" />
              <span className="text-xs text-ink-soft">{row.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
