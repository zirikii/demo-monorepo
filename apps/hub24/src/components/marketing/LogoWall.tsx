import { TRUST_LOGOS } from "@/data/site";

export function LogoWall() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {TRUST_LOGOS.map((name) => (
        <div
          key={name}
          className="flex h-16 items-center justify-center rounded-hub border border-line bg-white px-4 text-center text-sm font-bold text-ink-faint"
        >
          {name}
        </div>
      ))}
    </div>
  );
}
