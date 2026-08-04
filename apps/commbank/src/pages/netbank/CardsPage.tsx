import { CreditCard, Eye, Lock, Snowflake, Unlock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { readStored, writeStored } from "@/lib/storage";

const CARD_KEY = "commbank-demo-card-controls";

type CardControls = {
  locked: boolean;
  online: boolean;
  international: boolean;
};

export function CardsPage() {
  const [controls, setControls] = useState<CardControls>(() =>
    readStored(CARD_KEY, { locked: false, online: true, international: false }),
  );
  const update = (next: CardControls) => {
    setControls(next);
    writeStored(CARD_KEY, next);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Cards</h1>
      <p className="mt-2 text-cba-ink-soft">Manage local demo controls for your fictional card.</p>
      <div className="mt-7 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="aspect-[1.58] rounded-[1.6rem] bg-cba-ink p-6 text-white shadow-float">
            <div className="flex justify-between"><img className="h-8 rounded bg-white px-1" src="/brand/commbank-logo.svg" alt="" /><CreditCard aria-hidden="true" /></div>
            <p className="mt-12 text-xl tracking-[0.2em]">•••• •••• •••• 8842</p>
            <div className="mt-5 flex justify-between text-xs"><span>ALEX MORGAN</span><span>09/29</span></div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold">
            {controls.locked ? <><Lock aria-hidden="true" className="h-4 w-4 text-cba-critical" /> Card is locked</> : <><Unlock aria-hidden="true" className="h-4 w-4 text-cba-positive" /> Card is active</>}
          </p>
        </div>
        <div className="surface-card p-6">
          <h2 className="text-xl font-bold">Card controls</h2>
          <div className="mt-5 divide-y divide-cba-line">
            <Control
              icon={Snowflake}
              label="Lock card"
              description="Temporarily block new transactions"
              value={controls.locked}
              onChange={(value) => update({ ...controls, locked: value })}
            />
            <Control
              icon={Eye}
              label="Online purchases"
              description="Allow purchases on websites and apps"
              value={controls.online}
              onChange={(value) => update({ ...controls, online: value })}
            />
            <Control
              icon={CreditCard}
              label="International purchases"
              description="Allow this card to be used overseas"
              value={controls.international}
              onChange={(value) => update({ ...controls, international: value })}
            />
          </div>
          <div className="mt-6 rounded-xl bg-cba-info-soft p-4 text-sm text-cba-info">
            Controls persist in this browser only. They do not affect a real card.
          </div>
        </div>
      </div>
    </div>
  );
}

function Control({
  icon: Icon,
  label,
  description,
  value,
  onChange,
}: {
  icon: typeof CreditCard;
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 py-5">
      <span className="rounded-xl bg-cba-neutral p-3"><Icon aria-hidden="true" className="h-5 w-5" /></span>
      <div className="flex-1"><h3 className="font-semibold">{label}</h3><p className="mt-1 text-xs text-cba-muted">{description}</p></div>
      <Button
        variant={value ? "secondary" : "outline"}
        aria-pressed={value}
        aria-label={`${label}: ${value ? "on" : "off"}`}
        onClick={() => onChange(!value)}
      >
        {value ? "On" : "Off"}
      </Button>
    </div>
  );
}
