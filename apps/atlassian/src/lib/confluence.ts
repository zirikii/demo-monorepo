import { CONFLUENCE_PAGES, type ConfluencePage } from "@/data/confluence";
import { readCollection, writeCollection } from "./store";

const KEY = "atlassian-demo-pages";

function normalize(page: ConfluencePage): ConfluencePage {
  return {
    ...page,
    comments: page.comments ? page.comments.map((comment) => ({ ...comment })) : [],
  };
}

export function readPages(): ConfluencePage[] {
  return readCollection(KEY, CONFLUENCE_PAGES).map(normalize);
}

export function writePages(pages: ConfluencePage[]): void {
  writeCollection(KEY, pages.map(normalize));
}

export function getStoredPage(id: string): ConfluencePage | undefined {
  return readPages().find((page) => page.id === id);
}

export function addPageComment(input: {
  id: string;
  author: string;
  body: string;
}): ConfluencePage[] {
  const comment = {
    id: `pc-${Date.now()}`,
    author: input.author,
    body: input.body.trim(),
    created: new Date().toISOString().slice(0, 10),
  };
  const next = readPages().map((page) =>
    page.id === input.id ? { ...page, comments: [...page.comments, comment] } : page,
  );
  writePages(next);
  return next;
}

export function updatePage(
  id: string,
  patch: { title?: string; body?: string },
): ConfluencePage[] {
  const next = readPages().map((page) =>
    page.id === id
      ? {
          ...page,
          title: patch.title?.trim() || page.title,
          body: patch.body ?? page.body,
          updated: new Date().toISOString().slice(0, 10),
        }
      : page,
  );
  writePages(next);
  return next;
}

export function createPage(input: { title: string; body: string; author: string }): ConfluencePage {
  const pages = readPages();
  const id = `page-${Date.now()}`;
  const page: ConfluencePage = {
    id,
    title: input.title.trim(),
    space: "Northline",
    author: input.author,
    updated: new Date().toISOString().slice(0, 10),
    body: input.body.trim(),
    comments: [],
  };
  writePages([...pages, page]);
  return page;
}
