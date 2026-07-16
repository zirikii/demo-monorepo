import { useState, type FormEvent } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NewsletterPage() {
  useDocumentTitle("Newsletter");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Morning briefing</h1>
        <p className="mt-3 text-nine-muted">
          The biggest stories across news, sport and entertainment — in your inbox before the commute.
        </p>
        {done ? (
          <p className="mt-8 rounded-lg bg-nine-wash px-4 py-6 font-semibold text-nine-ink" role="status">
            You&apos;re on the list for {email}. (Demo only — nothing was sent.)
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-md border border-nine-line px-3 py-2.5 text-sm outline-none focus:border-nine-cyan"
              aria-label="Email"
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </PageLayout>
  );
}
