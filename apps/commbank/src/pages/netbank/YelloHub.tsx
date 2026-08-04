import { useState } from "react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Badge } from "@/components/ui/Badge";
import { yelloOffers, yelloTiers } from "@/data/yello";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";

export function NetBankYelloPage() {
  useDocumentTitle("CommBank Yello — NetBank");
  const { user } = useAuth();
  const [activated, setActivated] = useState<string[]>([]);

  const currentTier = yelloTiers.find((tier) => tier.name === user?.yelloTier) ?? yelloTiers[2];
  const tierIndex = yelloTiers.findIndex((tier) => tier.name === currentTier?.name);
  const nextTier = yelloTiers[tierIndex + 1];

  const toggle = (id: string) =>
    setActivated((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <NetBankLayout
      title="CommBank Yello"
      intro="Your tier, your benefits, and the offers you can activate right now."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:items-start">
        <div className="rounded-cba-lg bg-cba-yellow p-6">
          <p className="text-[13px] font-bold uppercase tracking-wider text-ink/70">Your tier</p>
          <p className="mt-1 text-4xl font-extrabold text-ink">{currentTier?.name}</p>
          <p className="mt-2 text-[15px] text-ink/80">{currentTier?.annualValue}</p>

          <div className="mt-6 border-t border-ink/20 pt-4">
            <p className="text-[13px] font-bold uppercase tracking-wider text-ink/70">
              Your benefits
            </p>
            <ul className="mt-2 space-y-1.5">
              {currentTier?.benefits.map((benefit) => (
                <li key={benefit} className="text-sm leading-relaxed text-ink/85">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {nextTier ? (
            <p className="mt-6 border-t border-ink/20 pt-4 text-[13px] leading-relaxed text-ink/70">
              Next tier: <span className="font-bold text-ink">{nextTier.name}</span> —{" "}
              {nextTier.requirement}
            </p>
          ) : null}
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-ink">Offers for you</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {yelloOffers.map((offer) => {
              const isActive = activated.includes(offer.id);
              return (
                <li key={offer.id} className="rounded-cba-lg bg-surface p-5 shadow-cba">
                  <div className="flex items-start justify-between gap-3">
                    <Badge tone="muted">{offer.category}</Badge>
                    {isActive ? <Badge tone="positive">Activated</Badge> : null}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-ink">{offer.brand}</h3>
                  <p className="mt-0.5 text-[15px] font-bold text-ink">{offer.headline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{offer.detail}</p>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => toggle(offer.id)}
                    className={cn(
                      "focus-cba mt-4 rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
                      isActive
                        ? "border-2 border-ink bg-surface text-ink hover:bg-surface-tint"
                        : "bg-cba-yellow text-ink hover:bg-cba-yellow-dark",
                    )}
                  >
                    {isActive ? "Remove offer" : "Activate offer"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </NetBankLayout>
  );
}
