import { cn } from "@/lib/cn";

const PARTNERS = [
  "Tallowood Asset Management",
  "Kembla Investment Partners",
  "Arrowfield Investment Management",
  "Pinemarket Capital",
  "Brightwater Advice Group",
  "Coolabah Wealth",
];

/**
 * The real site runs a logo carousel of investment managers and licensees. Fabricating
 * third-party logos would be worse than typesetting the invented partner names, so this
 * renders them as a wordmark wall instead.
 */
export function LogoWall({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <p className="text-center text-xs font-bold tracking-[0.16em] text-ink-ghost uppercase">
        Investment managers and licensees on the platform
      </p>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 lg:grid-cols-6">
        {PARTNERS.map((partner) => (
          <li
            key={partner}
            className="text-center font-display text-sm font-semibold text-ink-ghost"
          >
            {partner}
          </li>
        ))}
      </ul>
    </div>
  );
}
