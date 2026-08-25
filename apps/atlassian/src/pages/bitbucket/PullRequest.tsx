import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getProductApp } from "@/data/apps";
import { getRepo, type PullRequest, type PullRequestStatus } from "@/data/bitbucket";
import { getStoredPullRequest, updatePullRequestStatus } from "@/lib/bitbucket";

const APP = getProductApp("bitbucket");
const NAV = [{ label: "Repositories", to: "/bitbucket", end: true }];

export default function BitbucketPullRequestPage() {
  const { repo = "", id = "" } = useParams();
  const numericId = Number(id);
  const record = getRepo(repo);
  const stored = Number.isFinite(numericId) ? getStoredPullRequest(repo, numericId) : undefined;

  if (!record || !stored) {
    return (
      <ProductLayout app={APP} title="Pull request not found" nav={NAV}>
        <div className="mx-auto max-w-lg rounded-atl-sm border border-line bg-white p-8 text-center">
          <h1 className="text-xl font-extrabold text-ink-strong">Pull request not found</h1>
          <ButtonLink to="/bitbucket" shape="box" className="mt-6">
            Back to repositories
          </ButtonLink>
        </div>
      </ProductLayout>
    );
  }

  return <PullRequestDetail pullRequest={stored} />;
}

function PullRequestDetail({ pullRequest: initial }: { pullRequest: PullRequest }) {
  const [pullRequest, setPullRequest] = useState(initial);

  function setStatus(status: PullRequestStatus) {
    updatePullRequestStatus(pullRequest.repo, pullRequest.id, status);
    setPullRequest((current) => ({ ...current, status }));
  }

  return (
    <ProductLayout
      app={APP}
      title={`#${pullRequest.id} · ${pullRequest.repo} · Bitbucket`}
      nav={NAV}
    >
      <article className="mx-auto max-w-3xl rounded-atl-sm border border-line bg-white p-6">
        <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          {pullRequest.repo} · #{pullRequest.id} · {pullRequest.status}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink-strong">{pullRequest.title}</h1>
        <p className="mt-2 text-sm text-ink-soft">
          {pullRequest.source} → {pullRequest.destination} · {pullRequest.author}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{pullRequest.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            type="button"
            shape="box"
            disabled={pullRequest.status !== "Open"}
            onClick={() => setStatus("Approved")}
          >
            Approve
          </Button>
          <Button
            type="button"
            shape="box"
            variant="secondary"
            disabled={pullRequest.status === "Merged" || pullRequest.status === "Declined"}
            onClick={() => setStatus("Merged")}
          >
            Merge
          </Button>
        </div>
      </article>
    </ProductLayout>
  );
}
