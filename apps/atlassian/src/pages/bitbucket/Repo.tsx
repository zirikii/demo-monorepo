import { Link, useParams } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { ButtonLink } from "@/components/ui/Button";
import { getProductApp } from "@/data/apps";
import { getRepo } from "@/data/bitbucket";
import { readPullRequests } from "@/lib/bitbucket";

const APP = getProductApp("bitbucket");
const NAV = [{ label: "Repositories", to: "/bitbucket", end: true }];

export default function BitbucketRepoPage() {
  const { repo = "" } = useParams();
  const record = getRepo(repo);
  const pullRequests = readPullRequests().filter((item) => item.repo === repo);

  if (!record) {
    return (
      <ProductLayout app={APP} title="Repository not found" nav={NAV}>
        <div className="mx-auto max-w-lg rounded-atl-sm border border-line bg-white p-8 text-center">
          <h1 className="text-xl font-extrabold text-ink-strong">Repository not found</h1>
          <ButtonLink to="/bitbucket" shape="box" className="mt-6">
            Back to repositories
          </ButtonLink>
        </div>
      </ProductLayout>
    );
  }

  return (
    <ProductLayout app={APP} title={`${record.name} · Bitbucket`} nav={NAV}>
      <h1 className="text-2xl font-extrabold text-ink-strong">{record.name}</h1>
      <p className="mt-1 text-sm text-ink-soft">{record.description}</p>
      <h2 className="mt-6 text-base font-extrabold text-ink-strong">Pull requests</h2>
      <ul className="mt-3 divide-y divide-line rounded-atl-sm border border-line bg-white">
        {pullRequests.map((item) => (
          <li key={item.id}>
            <Link
              to={`/bitbucket/${repo}/pull-requests/${item.id}`}
              className="focus-atl flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-surface-tint"
            >
              <span className="font-semibold text-atl-blue">#{item.id}</span>
              <span className="min-w-0 flex-1 font-semibold text-ink-strong">{item.title}</span>
              <span className="text-xs font-semibold text-ink-soft">{item.status}</span>
            </Link>
          </li>
        ))}
      </ul>
    </ProductLayout>
  );
}
