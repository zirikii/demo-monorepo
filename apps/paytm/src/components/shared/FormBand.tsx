import type { ReactNode } from "react";

interface FormBandProps {
  /** The floating white form card. */
  children: ReactNode;
  /** Optional headline shown beside the card on wide screens. */
  aside?: ReactNode;
}

/**
 * Full-width blue gradient band with a left-floating white form card —
 * the signature layout of paytm.com product pages.
 */
export function FormBand({ children, aside }: FormBandProps) {
  return (
    <section className="bg-gradient-to-r from-[#0080c4] via-paytm-cyan to-[#31c7f5] pb-10 pt-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center">
        <div className="shrink-0">{children}</div>
        {aside ? <div className="hidden max-w-xl text-white lg:block">{aside}</div> : null}
      </div>
    </section>
  );
}
