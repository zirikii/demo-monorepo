import { MessageCircle, Phone, RadioTower } from "lucide-react";
import type { TravelPack } from "@/data/travelPacks";
import { formatAllowance, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";

type PlanCardProps = {
  pack: TravelPack;
  onCollect: (pack: TravelPack) => void;
};

export function PlanCard({ pack, onCollect }: PlanCardProps) {
  return (
    <article className="relative flex min-h-full flex-col rounded-[2rem] border border-line bg-white p-6 shadow-card">
      {pack.highlight && (
        <p className="absolute right-5 top-5 rounded-full bg-spark-yellow px-3 py-1 text-xs font-black uppercase tracking-wide text-ink">
          {pack.highlight}
        </p>
      )}
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-spark-purple">{pack.name}</p>
        <div className="mt-4 flex items-end gap-1">
          <span className="text-5xl font-black tracking-[-0.06em] text-ink">{formatPrice(pack.price)}</span>
          <span className="pb-2 text-sm font-bold text-ink-soft">total</span>
        </div>
        <p className="mt-3 rounded-2xl bg-spark-lilac px-4 py-3 text-sm font-extrabold text-spark-purple">
          Plan lasts for three months.
        </p>
      </div>

      <dl className="mt-6 space-y-4">
        <div className="rounded-2xl border border-line p-4">
          <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
            <RadioTower className="size-4 text-spark-purple" />
            Data
          </dt>
          <dd className="mt-2 text-2xl font-black text-ink">{pack.data}</dd>
          {pack.dataNote && <dd className="mt-1 text-xs font-semibold text-ink-soft">{pack.dataNote}</dd>}
        </div>
        <div className="rounded-2xl border border-line p-4">
          <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
            <Phone className="size-4 text-spark-purple" />
            Talk
          </dt>
          <dd className="mt-2 text-sm font-bold text-ink">
            {formatAllowance(pack.talkNz, pack.talkInternational)}
          </dd>
        </div>
        <div className="rounded-2xl border border-line p-4">
          <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
            <MessageCircle className="size-4 text-spark-purple" />
            Text
          </dt>
          <dd className="mt-2 text-sm font-bold text-ink">
            {formatAllowance(pack.textNz, pack.textInternational)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-3 text-sm font-bold text-ink-soft">
        <span className="flex items-center gap-3">
          <img src="/brand/sim-icon.svg" alt="" className="size-8" />
          Physical Trio SIM or eSIM available
        </span>
        <span className="flex items-center gap-3">
          <img src="/brand/wifi-icon.png" alt="" className="size-8" />
          Free Hotspot
        </span>
      </div>

      <Button className="mt-auto w-full translate-y-3" onClick={() => onCollect(pack)}>
        Click & collect
      </Button>
    </article>
  );
}
