import matter from "gray-matter";
import { readFile } from "node:fs/promises";
import path from "node:path";
export type MarkdownPage = { title: string; summary: string; body: string };
export async function readMarkdown(relativePath: string): Promise<MarkdownPage> {
  const raw = await readFile(path.join(process.cwd(), "content", relativePath), "utf8");
  const parsed = matter(raw);
  return {
    title: String(parsed.data.title ?? ""),
    summary: String(parsed.data.summary ?? ""),
    body: parsed.content.trim(),
  };
}
