import { TRUSTED_BY } from "@/data/site";

export function LogoWall() {
  return (
    <div className="flex flex-col items-center gap-7">
      <p className="text-xs font-extrabold tracking-[0.14em] text-ink-ghost uppercase">
        Trusted by 350,000+ Australian businesses
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {TRUSTED_BY.map((name) => (
          <li
            key={name}
            className="text-lg font-extrabold tracking-tight text-ink-ghost transition hover:text-ink-faint"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
