export interface MarkdownDoc {
  title: string;
  body: string;
}

export function parseFrontmatter(raw: string): MarkdownDoc {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { title: "", body: raw.trim() };
  }
  const titleLine = match[1]?.split("\n").find((line) => line.startsWith("title:"));
  const title = titleLine ? titleLine.slice("title:".length).trim() : "";
  return { title, body: match[2]?.trim() ?? "" };
}
