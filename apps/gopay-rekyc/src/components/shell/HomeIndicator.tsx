export function HomeIndicator({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-1.5 flex justify-center" aria-hidden="true">
      <span className={tone === "light" ? "h-1 w-32 rounded-full bg-white/80" : "h-1 w-32 rounded-full bg-text-title"} />
    </div>
  );
}
