import { TRUSTED_BY } from "@/data/site";

export function LogoWall({ heading = "Trusted by 350,000+ teams" }: { heading?: string }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-center text-sm font-semibold text-ink-faint">{heading}</p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TRUSTED_BY.map((name) => (
          <li
            key={name}
            className="border border-line bg-white px-4 py-3 text-center text-sm font-semibold text-ink-soft"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
