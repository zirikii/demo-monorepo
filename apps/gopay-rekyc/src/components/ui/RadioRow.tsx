export function RadioRow({
  label,
  checked,
  onSelect,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className="flex w-full items-center gap-3 border-b border-border-mute py-3.5 text-left last:border-b-0"
    >
      <span
        className={
          checked
            ? "flex h-5 w-5 items-center justify-center rounded-full border-2 border-gopay-active"
            : "h-5 w-5 rounded-full border-2 border-[#c5c8ce]"
        }
        aria-hidden="true"
      >
        {checked ? <span className="h-2.5 w-2.5 rounded-full bg-gopay-active" /> : null}
      </span>
      <span className="text-body-small text-text-title">{label}</span>
    </button>
  );
}
