import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { Button } from "@/components/ui/Button";
import { Field, TextArea, TextInput } from "@/components/ui/Field";
import { getProductApp } from "@/data/apps";
import { CONFLUENCE_SPACE } from "@/data/confluence";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/format";
import { createPage, readPages } from "@/lib/confluence";

const APP = getProductApp("confluence");
const NAV = [
  { label: "Space", to: "/confluence", end: true },
];

export default function ConfluenceHomePage() {
  const { user } = useAuth();
  const [pages, setPages] = useState(readPages);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return pages;
    return pages.filter(
      (page) =>
        page.title.toLowerCase().includes(needle) || page.body.toLowerCase().includes(needle),
    );
  }, [pages, query]);

  function onCreate(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;
    createPage({ title, body, author: user?.name ?? "You" });
    setPages(readPages());
    setTitle("");
    setBody("");
  }

  return (
    <ProductLayout app={APP} title={`${CONFLUENCE_SPACE.name} · Confluence`} nav={NAV}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
            Space · {CONFLUENCE_SPACE.key}
          </p>
          <h1 className="text-2xl font-extrabold text-ink-strong">{CONFLUENCE_SPACE.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">{filtered.length} pages</p>
        </div>
        <Field label="Search pages" htmlFor="confluence-search" className="w-full max-w-xs">
          <TextInput
            id="confluence-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title or body"
          />
        </Field>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-ink-faint">No pages match that search.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line rounded-atl-sm border border-line bg-white">
          {filtered.map((page) => (
            <li key={page.id}>
              <Link
                to={`/confluence/pages/${page.id}`}
                className="focus-atl flex flex-col gap-1 px-4 py-3 hover:bg-surface-tint"
              >
                <span className="font-semibold text-atl-blue">{page.title}</span>
                <span className="text-sm text-ink-soft">
                  {page.author} · {formatDate(page.updated)} · {page.comments.length} comments
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <form
        className="mt-8 max-w-xl rounded-atl-sm border border-line bg-white p-5"
        onSubmit={onCreate}
      >
        <h2 className="text-base font-extrabold text-ink-strong">Create a page</h2>
        <div className="mt-4 flex flex-col gap-3">
          <Field label="Title" htmlFor="page-title">
            <TextInput
              id="page-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Page title"
            />
          </Field>
          <Field label="Body" htmlFor="page-body">
            <TextArea
              id="page-body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Write the first paragraph"
            />
          </Field>
          <Button type="submit" shape="box" disabled={!title.trim() || !body.trim()}>
            Publish
          </Button>
        </div>
      </form>
    </ProductLayout>
  );
}
