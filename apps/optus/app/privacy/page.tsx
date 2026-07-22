import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { readMarkdown } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Optus demo.",
};

export default async function PrivacyPage() {
  const { content } = await readMarkdown("legal/privacy.md");

  return (
    <section className="container py-14">
      <article className="prose-optus mx-auto max-w-3xl space-y-4 text-optus-ink-soft [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-optus-ink [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-optus-ink [&_strong]:text-optus-ink [&_ul]:list-disc [&_ul]:pl-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </section>
  );
}
