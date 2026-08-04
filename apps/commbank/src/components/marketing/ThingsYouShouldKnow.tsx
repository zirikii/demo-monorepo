import type { ReactNode } from "react";

export function ThingsYouShouldKnow({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-line bg-surface py-12">
      <div className="container-page">
        <h2 className="mb-4 text-lg font-bold text-black">Things you should know</h2>
        <div className="space-y-3 text-xs leading-relaxed text-ink-muted">
          {children}
          <p>
            This is an unofficial demo application. Every rate, fee, product detail and customer
            record shown here is fabricated. Nothing on this site constitutes financial advice, an
            offer of credit, or a real banking product.
          </p>
        </div>
      </div>
    </section>
  );
}
