import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Field";
import { getProductApp } from "@/data/apps";
import { IDEA_STATUSES, type DiscoveryIdea, type IdeaStatus } from "@/data/jpd";
import { getStoredIdea, updateIdeaStatus, voteIdea } from "@/lib/jpd";

const APP = getProductApp("jpd");
const NAV = [{ label: "Ideas", to: "/jpd", end: true }];

export default function JpdIdeaPage() {
  const { key = "" } = useParams();
  const stored = getStoredIdea(key);

  if (!stored) {
    return (
      <ProductLayout app={APP} title="Idea not found" nav={NAV}>
        <div className="mx-auto max-w-lg rounded-atl-sm border border-line bg-white p-8 text-center">
          <h1 className="text-xl font-extrabold text-ink-strong">Idea not found</h1>
          <ButtonLink to="/jpd" shape="box" className="mt-6">
            Back to ideas
          </ButtonLink>
        </div>
      </ProductLayout>
    );
  }

  return <IdeaDetail idea={stored} />;
}

function IdeaDetail({ idea: initial }: { idea: DiscoveryIdea }) {
  const [idea, setIdea] = useState(initial);

  return (
    <ProductLayout app={APP} title={`${idea.key} · Jira Product Discovery`} nav={NAV}>
      <article className="mx-auto max-w-3xl rounded-atl-sm border border-line bg-white p-6">
        <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{idea.key}</p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink-strong">{idea.summary}</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{idea.description}</p>
        <p className="mt-4 text-sm text-ink-soft">
          Owner {idea.owner} · Impact {idea.impact} · Effort {idea.effort}
        </p>
        <Field label="Status" htmlFor="idea-status" className="mt-6 max-w-xs">
          <Select
            id="idea-status"
            value={idea.status}
            onChange={(event) => {
              const status = event.target.value as IdeaStatus;
              updateIdeaStatus(idea.key, status);
              setIdea((current) => ({ ...current, status }));
            }}
          >
            {IDEA_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </Field>
        <Button
          type="button"
          shape="box"
          className="mt-4"
          aria-label={`Vote for ${idea.key}`}
          onClick={() => {
            const next = voteIdea(idea.key).find((item) => item.key === idea.key);
            if (next) setIdea(next);
          }}
        >
          {idea.votes} votes
        </Button>
      </article>
    </ProductLayout>
  );
}
