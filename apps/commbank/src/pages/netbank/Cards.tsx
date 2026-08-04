import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Badge } from "@/components/ui/Badge";
import { ToggleField } from "@/components/ui/Field";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatBalance, maskCardNumber } from "@/lib/format";

export function NetBankCardsPage() {
  useDocumentTitle("Cards");
  const { cards, accounts, toggleCardFlag } = useBanking();

  return (
    <NetBankLayout title="Cards">
      <ul className="grid gap-6 lg:grid-cols-2">
        {cards.map((card) => {
          const account = accounts.find((item) => item.id === card.accountId);
          return (
            <li key={card.id} className="rounded-2xl border border-line bg-surface p-6">
              <div className="rounded-2xl bg-black p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-cba-yellow">{card.name}</p>
                  {card.locked ? <Badge tone="yellow">Locked</Badge> : null}
                </div>
                <p className="mt-8 font-mono text-lg tracking-widest">
                  {maskCardNumber(card.last4, card.bin)}
                </p>
                <div className="mt-4 flex justify-between text-xs text-white/70">
                  <span>{card.scheme}</span>
                  <span>Expires {card.expiry}</span>
                </div>
              </div>

              {account ? (
                <p className="mt-4 text-sm text-ink-soft">
                  Linked to <strong className="text-black">{account.name}</strong> ·{" "}
                  {formatBalance(account.available)} available
                </p>
              ) : null}

              <div className="mt-2 divide-y divide-line">
                <ToggleField
                  label="Lock card"
                  description="Temporarily stop all new transactions on this card."
                  checked={card.locked}
                  onChange={() => toggleCardFlag(card.id, "locked")}
                />
                <ToggleField
                  label="Block international transactions"
                  description="Decline purchases made overseas or with overseas merchants."
                  checked={card.blockInternational}
                  onChange={() => toggleCardFlag(card.id, "blockInternational")}
                />
                <ToggleField
                  label="Travel notification"
                  description="Let us know you're travelling so we don't flag your spending."
                  checked={card.travelNotice}
                  onChange={() => toggleCardFlag(card.id, "travelNotice")}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-xs text-ink-muted">
        Card controls in this demo change local state only and persist in your browser. No card
        exists and nothing is sent to a card network.
      </p>
    </NetBankLayout>
  );
}
