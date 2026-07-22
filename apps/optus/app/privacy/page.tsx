import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = { title: "Privacy (demo)" };

export default async function PrivacyPage() {
  const raw = await fs.readFile(
    path.join(process.cwd(), "content/legal/privacy.md"),
    "utf8",
  );
  const { content } = matter(raw);

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy" />
      <section className="container py-12">
        <div className="prose max-w-3xl text-optus-ink/80">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </section>
    </>
  );
}
