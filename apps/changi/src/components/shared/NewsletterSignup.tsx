import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Footer-adjacent "Sign up for a Changi Account" band (mock, client-side only). */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email) return;
    setDone(true);
  }

  return (
    <section className="bg-sand-alt py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold text-ink">Sign up for a Changi Account</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Receive the latest updates on deals, events and travel tips — and start earning Changi
          Rewards points on every visit.
        </p>

        {done ? (
          <p
            role="status"
            className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-badge-green px-5 py-3 text-sm font-semibold text-emerald-800"
          >
            <Check className="size-4" aria-hidden />
            Thanks! Check your inbox to confirm your Changi Account.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-sand-deep bg-card px-5 py-3 text-sm text-ink outline-none focus:border-magenta focus:ring-2 focus:ring-magenta/30"
            />
            <Button type="submit">Sign Up</Button>
          </form>
        )}
      </div>
    </section>
  );
}
