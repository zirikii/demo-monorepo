import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, children, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-spark-purple">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      {children && <div className="mt-4 text-base leading-7 text-ink-soft">{children}</div>}
    </div>
  );
}
