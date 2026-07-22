import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type MarkdownDoc = {
  data: Record<string, unknown>;
  content: string;
};

export async function readMarkdown(relativePath: string): Promise<MarkdownDoc> {
  const filePath = path.join(process.cwd(), "content", relativePath);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}
