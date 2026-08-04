import { useState } from "react";
import { readJson, writeJson } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type CardState = { locked: boolean; contactless: boolean; online: boolean };

const KEY = "commbank-demo-card";

export function CardsPanel() {
  const [card, setCard] = useState<CardState>(() =>
    readJson<CardState>(KEY, { locked: false, contactless: true, online: true }),
  );

  const update = (next: CardState) => {
    setCard(next);
    writeJson(KEY, next);
  };

  return (
    <section className="max-w-xl space-y-4">
      <h1 className="text-2xl font-extrabold text-ink">Cards</h1>
      <div className="rounded-2xl bg-gradient-to-br from-cba-black to-[#3a3532] p-6 text-white shadow-float">
        <div className="flex items-start justify-between">
          <img src="/brand/commbank-logo-mark.svg" alt="" className="h-10 w-10" aria-hidden="true" />
          <Badge tone="yellow">Debit Mastercard</Badge>
        </div>
        <p className="mt-10 font-mono text-lg tracking-widest">•••• •••• •••• 9010</p>
        <p className="mt-2 text-sm text-white/70">Demo Customer</p>
      </div>

      <div className="rounded-xl border border-line bg-card p-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-bold text-ink">Lock card</p>
            <p className="text-sm text-ink-soft">Temporarily stop new purchases</p>
          </div>
          <Button
            variant={card.locked ? "primary" : "secondary"}
            aria-pressed={card.locked}
            onClick={() => update({ ...card, locked: !card.locked })}
          >
            {card.locked ? "Locked" : "Unlocked"}
          </Button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-bold text-ink">Contactless</p>
            <p className="text-sm text-ink-soft">Tap & Pay in-store</p>
          </div>
          <Button
            variant="secondary"
            aria-pressed={card.contactless}
            onClick={() => update({ ...card, contactless: !card.contactless })}
          >
            {card.contactless ? "On" : "Off"}
          </Button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-bold text-ink">Online payments</p>
            <p className="text-sm text-ink-soft">E-commerce transactions</p>
          </div>
          <Button
            variant="secondary"
            aria-pressed={card.online}
            onClick={() => update({ ...card, online: !card.online })}
          >
            {card.online ? "On" : "Off"}
          </Button>
        </div>
      </div>
    </section>
  );
}
