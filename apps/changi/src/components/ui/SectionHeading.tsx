import { Badge } from "./Badge";

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#2f271f] md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-[#665448] md:text-lg">{description}</p> : null}
    </div>
  );
}
