interface StatProps {
  value: string;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="text-center">
      <div className="text-2xl font-extrabold text-paytm-navy sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-ink-soft sm:text-sm">{label}</div>
    </div>
  );
}
