import { useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, TextArea, TextInput } from "@/components/ui/Field";
import { getProductApp } from "@/data/apps";
import type { ConfluencePage as ConfluencePageRecord } from "@/data/confluence";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/format";
import { addPageComment, getStoredPage, updatePage } from "@/lib/confluence";

const APP = getProductApp("confluence");
const NAV = [{ label: "Space", to: "/confluence", end: true }];

export default function ConfluencePage() {
  const { id = "" } = useParams();
  const stored = getStoredPage(id);

  if (!stored) {
    return (
      <ProductLayout app={APP} title="Page not found" nav={NAV}>
        <div className="mx-auto max-w-lg rounded-atl-sm border border-line bg-white p-8 text-center">
          <h1 className="text-xl font-extrabold text-ink-strong">Page not found</h1>
          <p className="mt-2 text-sm text-ink-soft">{id} is not in this space.</p>
          <ButtonLink to="/confluence" shape="box" className="mt-6">
            Back to space
          </ButtonLink>
        </div>
      </ProductLayout>
    );
  }

  return <PageDetail page={stored} />;
}

function PageDetail({ page: initial }: { page: ConfluencePageRecord }) {
  const { user } = useAuth();
  const [page, setPage] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(initial.title);
  const [body, setBody] = useState(initial.body);
  const [comment, setComment] = useState("");

  function refresh(id: string) {
    const next = getStoredPage(id);
    if (next) setPage(next);
  }

  function onSave(event: FormEvent) {
    event.preventDefault();
    updatePage(page.id, { title, body });
    refresh(page.id);
    setEditing(false);
  }

  function onComment(event: FormEvent) {
    event.preventDefault();
    if (!comment.trim()) return;
    addPageComment({ id: page.id, author: user?.name ?? "You", body: comment });
    refresh(page.id);
    setComment("");
  }

  return (
    <ProductLayout app={APP} title={`${page.title} · Confluence`} nav={NAV}>
      {editing ? (
        <form className="mx-auto max-w-3xl rounded-atl-sm border border-line bg-white p-6" onSubmit={onSave}>
          <Field label="Title" htmlFor="edit-title">
            <TextInput id="edit-title" value={title} onChange={(event) => setTitle(event.target.value)} />
          </Field>
          <Field label="Body" htmlFor="edit-body" className="mt-3">
            <TextArea id="edit-body" value={body} onChange={(event) => setBody(event.target.value)} />
          </Field>
          <div className="mt-4 flex gap-2">
            <Button type="submit" shape="box">
              Save
            </Button>
            <Button type="button" variant="secondary" shape="box" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <article className="mx-auto max-w-3xl rounded-atl-sm border border-line bg-white p-6">
          <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
            {page.space} · {page.author} · {formatDate(page.updated)}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink-strong">{page.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{page.body}</p>
          <Button
            type="button"
            variant="secondary"
            shape="box"
            className="mt-6"
            onClick={() => {
              setTitle(page.title);
              setBody(page.body);
              setEditing(true);
            }}
          >
            Edit
          </Button>
        </article>
      )}

      <section className="mx-auto mt-6 max-w-3xl rounded-atl-sm border border-line bg-white p-6">
        <h2 className="text-sm font-extrabold text-ink-strong">Comments</h2>
        {page.comments.length === 0 ? (
          <p className="mt-3 text-sm text-ink-faint">No comments yet.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {page.comments.map((entry) => (
              <li key={entry.id} className="rounded-atl bg-surface-tint px-3 py-2">
                <p className="text-xs font-semibold text-ink-faint">
                  {entry.author} · {formatDate(entry.created)}
                </p>
                <p className="mt-1 text-sm text-ink-strong">{entry.body}</p>
              </li>
            ))}
          </ul>
        )}
        <form className="mt-4 flex flex-col gap-2" onSubmit={onComment}>
          <Field label="Add a comment" htmlFor="page-comment">
            <TextArea
              id="page-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Write a comment"
            />
          </Field>
          <Button type="submit" shape="box" className="self-end" disabled={!comment.trim()}>
            Comment
          </Button>
        </form>
      </section>
    </ProductLayout>
  );
}
