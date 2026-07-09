import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AtSign, Check, Globe, MessageCircle, Rss } from "lucide-react";
import { footerColumns, footerLegalLinks } from "@/data/nav";
import { SquizLogo } from "@/components/brand/SquizLogo";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  };

  return (
    <footer className="bg-navy text-white squiz-lines-dark">
      {/* Pre-footer CTA */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Ready to turn ideas into live experiences, faster?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              See how we help teams launch, optimize, and scale their digital experiences.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button to="/book-a-call" variant="primary-dark" size="lg" withArrow>
              Get started
            </Button>
            <Button to="/demos" variant="secondary-dark" size="lg">
              Watch DXP demo videos
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            <Link to="/" aria-label="Squiz home" className="inline-block text-white">
              <SquizLogo width={96} height={23} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              The digital experience platform for service-led organizations. Unofficial demo build
              — not affiliated with Squiz.
            </p>
            <div className="mt-8">
              <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/80">
                Stay in touch
              </p>
              {subscribed ? (
                <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-mint-tint/10 px-4 py-3 text-sm text-mint">
                  <Check className="size-4" aria-hidden /> Thanks — you&rsquo;re on the list.
                </p>
              ) : (
                <form onSubmit={onSubscribe} className="mt-3 flex max-w-sm gap-2">
                  <label htmlFor="footer-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-mint focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-mint text-navy transition-colors hover:bg-cream"
                  >
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                </form>
              )}
            </div>
            <div className="mt-8 flex gap-3">
              {[
                { icon: AtSign, label: "Social" },
                { icon: MessageCircle, label: "Community" },
                { icon: Rss, label: "RSS feed" },
                { icon: Globe, label: "Website" },
              ].map(({ icon: SocialIcon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-mint hover:text-mint"
                >
                  <SocialIcon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/80">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={col.heading + link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/60 transition-colors hover:text-mint"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Squiz demo — unofficial build, all trademarks belong to their owners.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-mint">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
