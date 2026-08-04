export function Disclosures({ items }: { items: string[] }) {
  return (
    <section className="border-t border-line-soft bg-surface py-10">
      <div className="container-cba">
        <h2 className="text-base font-bold text-ink">Things you should know</h2>
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item} className="text-[13px] leading-relaxed text-ink-faint">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
