import { ChevronRight, Headset, House } from "lucide-react";
import { useFan } from "@/features/fan/FanProvider";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/format";
import type { RenderedOption } from "../engine/conversation";

function optionIcon(option: RenderedOption) {
  if (option.next === "handoff") return <Headset className="size-3.5" aria-hidden />;
  if (option.next === "menu" || option.next === "root") return <House className="size-3.5" aria-hidden />;
  return null;
}

/** An order-picker choice, shown as the fan would recognise it in My Account. */
function OrderTile({ option, onChoose, dark, delay }: { option: RenderedOption; onChoose: () => void; dark: boolean; delay: number }) {
  const { views } = useFan();
  const view = views.find((v) => v.order.id === option.orderId);
  if (!view) return null;
  return (
    <button
      type="button"
      onClick={onChoose}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "group flex w-full animate-fade-up items-center gap-3 rounded-tk-lg border p-2 text-left transition-colors",
        dark ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : "border-line-soft bg-white hover:border-tk-blue hover:shadow-tk",
      )}
    >
      <img src={asset(view.event.image)} alt="" className="h-12 w-20 shrink-0 rounded-tk object-cover" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{view.event.name}</span>
        <span className={cn("block truncate text-xs", dark ? "text-white/70" : "text-ink-soft")}>
          {formatShortDate(view.performance.startsAt)} · {view.venue.name}
        </span>
        <span className={cn("block text-[11px]", dark ? "text-white/60" : "text-ink-faint")}>
          {view.order.id} · {view.order.tickets.length} tickets
        </span>
      </span>
      <ChevronRight className="size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </button>
  );
}

export function QuickReplies({
  options,
  onChoose,
  tone = "light",
  className,
}: {
  options: RenderedOption[];
  onChoose: (option: RenderedOption) => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (options.length === 0) return null;
  const dark = tone === "dark";
  const orders = options.filter((o) => o.orderId);
  const chips = options.filter((o) => !o.orderId);
  return (
    <div role="group" aria-label="Suggested replies" className={cn("space-y-2", className)}>
      {orders.length > 0 && (
        <ul className="space-y-2" aria-label="Your orders">
          {orders.map((o, i) => (
            <li key={o.orderId}>
              <OrderTile option={o} onChoose={() => onChoose(o)} dark={dark} delay={i * 40} />
            </li>
          ))}
        </ul>
      )}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((option, i) => (
            <button
              key={`${option.next}-${option.label}`}
              type="button"
              onClick={() => onChoose(option)}
              style={{ animationDelay: `${(orders.length + i) * 40}ms` }}
              className={cn(
                "group inline-flex animate-fade-up items-center gap-1.5 rounded-full border px-3.5 py-2 text-left text-sm font-semibold transition-colors",
                dark ? "border-white/25 bg-white/10 text-white hover:border-white/60 hover:bg-white/20" : "border-tk-blue/30 bg-white text-tk-blue hover:border-tk-blue hover:bg-tk-blue-tint",
              )}
            >
              {optionIcon(option)}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
