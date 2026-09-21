export function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border-mute px-4 py-3 last:border-b-0">
      <dt className="text-body-small text-text-body">{label}</dt>
      <dd className="max-w-[148px] text-right text-title-tiny font-semibold leading-5 text-text-title">{value}</dd>
    </div>
  );
}
