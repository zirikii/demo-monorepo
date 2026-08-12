import { logoBar } from "@/data/testimonials";

export function LogoBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {logoBar.map((name) => (
        <span key={name} className="text-sm font-semibold tracking-wide text-ink-faint">
          {name}
        </span>
      ))}
    </div>
  );
}
