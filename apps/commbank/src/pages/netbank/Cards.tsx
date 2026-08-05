import { Lock, LockOpen } from "lucide-react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Badge } from "@/components/ui/Badge";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatNumber, maskCardNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

export function NetBankCardsPage() {
  useDocumentTitle("Cards — NetBank");
  const { cards, accounts, toggleCardLock } = useBanking();

  return (
    <NetBankLayout
      title="Manage your cards"
      intro="Lock a card instantly if you have misplaced it, and unlock it again when it turns up."
    >
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const linked = accounts.find((account) => account.id === card.linkedAccountId);
          const locked = card.status === "locked";
          return (
            <li key={card.id} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <div
                className={cn("rounded-cba-md p-5 text-surface", locked ? "bg-ink-soft" : "bg-ink")}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px] uppercase tracking-wider text-surface/60">
                    {card.network}
                  </p>
                  <span aria-hidden="true" className="h-5 w-8 rounded-sm bg-cba-yellow" />
                </div>
                <p className="mt-6 text-lg font-bold tabular-nums tracking-wider">
                  {maskCardNumber(card.pan)}
                </p>
                <p className="mt-2 text-[13px] text-surface/70">Expires {card.expiry}</p>
              </div>

              <h2 className="mt-4 text-[15px] font-bold text-ink">{card.name}</h2>
              <p className="mt-1 text-[13px] text-ink-faint">
                Linked to {linked?.name ?? "your account"}
              </p>
              {card.awardsPoints ? (
                <p className="mt-2 text-[13px] text-ink-soft">
                  {formatNumber(card.awardsPoints)} Awards points available
                </p>
              ) : null}

              <div className="mt-4 flex items-center justify-between gap-3">
                <Badge tone={locked ? "critical" : "positive"}>
                  {locked ? "Locked" : "Active"}
                </Badge>
                <button
                  type="button"
                  aria-pressed={locked}
                  onClick={() => toggleCardLock(card.id)}
                  className="focus-cba inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-sm font-bold text-ink hover:bg-surface-tint"
                >
                  {locked ? (
                    <LockOpen aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Lock aria-hidden="true" className="h-4 w-4" />
                  )}
                  {locked ? "Unlock card" : "Lock card"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-[13px] leading-relaxed text-ink-faint">
        In the real CommBank app, Lock, Block, Limit also lets you block ATM cash, overseas and
        online transactions, and set your own daily spend limits.
      </p>
    </NetBankLayout>
  );
}
