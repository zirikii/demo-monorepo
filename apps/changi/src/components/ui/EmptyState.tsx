import { Link } from "react-router-dom";
import { Button } from "./Button";

type Props = {
  title: string;
  description?: string;
  actionTo?: string;
  actionLabel?: string;
};

export function EmptyState({ title, description, actionTo, actionLabel }: Props) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {description ? <p className="mt-2 text-sm text-ink-soft">{description}</p> : null}
      {actionTo && actionLabel ? (
        <Link to={actionTo} className="mt-5 inline-block">
          <Button variant="purple">{actionLabel}</Button>
        </Link>
      ) : null}
    </div>
  );
}
