import type { ReactNode } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";

function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <PageLayout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h1>
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink-soft">{children}</div>
      </article>
    </PageLayout>
  );
}

export function PrivacyPage() {
  useDocumentTitle("Privacy policy");
  return (
    <LegalShell title="Privacy policy">
      <p className="rounded-lg border border-line bg-card p-4 text-sm text-ink">
        This is an unofficial demo. It is not affiliated with Nine Entertainment Co. No real
        personal data is collected, transmitted, or stored on any server.
      </p>
      <p>
        This demo stores a small amount of information in your browser&apos;s local storage — a
        mock sign-in session and your notification preferences — purely to make the experience feel
        real. Nothing leaves your device.
      </p>
      <h2 className="pt-2 text-lg font-black text-ink">What we store locally</h2>
      <p>
        A base64-encoded session object (your demo name and email) and a settings object. You can
        clear both at any time by signing out and resetting settings, or by clearing site data in
        your browser.
      </p>
      <h2 className="pt-2 text-lg font-black text-ink">Analytics and advertising</h2>
      <p>
        The real nine.com.au uses analytics and advertising partners. This demo includes none of
        those integrations — there are no trackers, pixels, or third-party scripts.
      </p>
    </LegalShell>
  );
}

export function TermsPage() {
  useDocumentTitle("Terms of use");
  return (
    <LegalShell title="Terms of use">
      <p className="rounded-lg border border-line bg-card p-4 text-sm text-ink">
        Unofficial demo — provided as-is for demonstration purposes only, with no warranties.
      </p>
      <p>
        All headlines, articles, scores, and other content in this demo are fictional and were
        written or generated for demonstration purposes. Any resemblance to real events is
        coincidental.
      </p>
      <h2 className="pt-2 text-lg font-black text-ink">Acceptable use</h2>
      <p>
        You may explore, fork, and modify this demo for learning and internal demonstrations.
        Please do not present it as an official Nine product.
      </p>
      <h2 className="pt-2 text-lg font-black text-ink">Trade marks</h2>
      <p>
        Nine, nine.com.au, 9News, Wide World of Sports, 9Honey and 9Now are trade marks of their
        respective owners. They are referenced here only to approximate the look and feel of the
        public site.
      </p>
    </LegalShell>
  );
}
