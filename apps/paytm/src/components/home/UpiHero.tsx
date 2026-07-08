import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { AppStoreBadges } from "../shared/AppStoreBadges";

const avatarPalette = [
  "#f5c6d0",
  "#ffe3a3",
  "#c9e7d2",
  "#cfd8f7",
  "#f7d7c4",
  "#d8f0f7",
  "#e6d4f2",
  "#d2ead9",
];

/**
 * Large white UPI section: two-tone headline, copy, store badges, and a
 * collage of avatar bubbles around a floating "Paid Successfully" card.
 */
export function UpiHero() {
  return (
    <section aria-label="Pay with UPI" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="grid items-center gap-10 rounded-3xl bg-card p-8 shadow-card sm:p-12 lg:grid-cols-2">
        <div>
          <img src="/brand/paytm-upi-logo.svg" alt="Paytm UPI" className="h-6" />
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Pay anyone directly from your{" "}
            <span className="text-paytm-cyan">bank account</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
            Pay anyone, everywhere. Make contactless and secure payments in stores or online using
            UPI — money moves straight from your bank account, and you can send or receive from any
            UPI app.
          </p>
          <div className="mt-6">
            <AppStoreBadges />
          </div>
          <Link
            to="/upi"
            className="mt-5 inline-block text-sm font-bold text-paytm-cyan hover:underline"
          >
            Explore UPI features →
          </Link>
        </div>

        <div aria-hidden="true" className="relative mx-auto h-72 w-full max-w-sm">
          {avatarPalette.map((color, i) => {
            const angle = (i / avatarPalette.length) * Math.PI * 2;
            const x = 50 + 42 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            return (
              <span
                key={i}
                style={{ left: `${x}%`, top: `${y}%`, backgroundColor: color }}
                className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xl shadow-card"
              >
                {["🙂", "😄", "🧕", "👩", "👨‍🦱", "🧔", "👩‍🦰", "👴"][i]}
              </span>
            );
          })}
          <div className="absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-4 text-center shadow-float">
            <p className="text-lg font-extrabold text-ink">₹250</p>
            <p className="mt-0.5 flex items-center justify-center gap-1 text-xs font-semibold text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> Paid Successfully
            </p>
            <p className="mt-2 text-[10px] text-ink-faint">To Ajay • UPI Ref 6202…8873</p>
          </div>
        </div>
      </div>
    </section>
  );
}
