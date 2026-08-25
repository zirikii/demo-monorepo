import { Link } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { BITBUCKET_REPOS } from "@/data/bitbucket";
import { getProductApp } from "@/data/apps";
import { formatDate } from "@/lib/format";
import { readPullRequests } from "@/lib/bitbucket";

const APP = getProductApp("bitbucket");
const NAV = [{ label: "Repositories", to: "/bitbucket", end: true }];

export default function BitbucketReposPage() {
  const pullRequests = readPullRequests();

  return (
    <ProductLayout app={APP} title="Repositories · Bitbucket" nav={NAV}>
      <h1 className="text-2xl font-extrabold text-ink-strong">Repositories</h1>
      <p className="mt-1 text-sm text-ink-soft">Northline Payments workspace</p>
      <ul className="mt-5 divide-y divide-line rounded-atl-sm border border-line bg-white">
        {BITBUCKET_REPOS.map((repo) => {
          const openCount = pullRequests.filter(
            (item) => item.repo === repo.slug && item.status === "Open",
          ).length;
          return (
            <li key={repo.slug}>
              <Link
                to={`/bitbucket/${repo.slug}`}
                className="focus-atl flex flex-col gap-1 px-4 py-3 hover:bg-surface-tint"
              >
                <span className="font-semibold text-atl-blue">{repo.name}</span>
                <span className="text-sm text-ink-soft">{repo.description}</span>
                <span className="text-xs text-ink-faint">
                  Updated {formatDate(repo.updated)} · {openCount} open pull requests
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </ProductLayout>
  );
}
