"use client";

import { Plane, Database, Music, Loader2 } from "lucide-react";
import * as React from "react";
import type { AddOn } from "@/lib/types";
import { formatNzd } from "@/lib/utils/format";
import { useAppData } from "@/components/providers/AppDataProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const CATEGORY_ICON = {
  roaming: Plane,
  data: Database,
  entertainment: Music,
} as const;

export function AddOnCard({ addon }: { addon: AddOn }) {
  const { isActive, toggleAddOn } = useAppData();
  const [pending, setPending] = React.useState(false);
  const active = isActive(addon.id);
  const Icon = CATEGORY_ICON[addon.category];

  const priceLabel =
    addon.price === 0
      ? "Included"
      : addon.unit === "one-off"
        ? formatNzd(addon.price)
        : `${formatNzd(addon.price)} ${addon.unit}`;

  async function onToggle() {
    setPending(true);
    try {
      await toggleAddOn(addon.id, addon.name);
    } finally {
      setPending(false);
    }
  }

  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl border bg-white p-5 shadow-card transition-colors",
        active ? "border-spark-purple" : "border-line",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-spark-purple-light text-spark-purple">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-spark-ink">{addon.name}</h3>
            <p className="text-xs text-ink-muted">{priceLabel}</p>
          </div>
        </div>
        {addon.popular ? <Badge tone="brand">Popular</Badge> : null}
      </div>

      <p className="mt-3 flex-1 text-sm text-ink-secondary">{addon.description}</p>

      {addon.zones?.length ? (
        <p className="mt-3 text-xs text-ink-muted">Covers: {addon.zones.join(", ")}</p>
      ) : null}

      <div className="mt-4">
        <Button
          variant={active ? "secondary" : "primary"}
          className="w-full"
          onClick={onToggle}
          disabled={pending}
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {active ? "Remove" : "Connect"}
        </Button>
      </div>
    </article>
  );
}
