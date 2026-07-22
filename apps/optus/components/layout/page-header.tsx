export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-wide text-optus-teal">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-black tracking-tight text-optus-ink md:text-4xl">{title}</h1>
      <p className="max-w-3xl text-optus-muted">{description}</p>
    </div>
  );
}
