import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { Button } from "@/components/ui/Button";
import { getProductApp } from "@/data/apps";
import { readIdeas, voteIdea } from "@/lib/jpd";

const APP = getProductApp("jpd");
const NAV = [{ label: "Ideas", to: "/jpd", end: true }];

export default function JpdIdeasPage() {
  const [ideas, setIdeas] = useState(readIdeas);

  return (
    <ProductLayout app={APP} title="Ideas · Jira Product Discovery" nav={NAV}>
      <h1 className="text-2xl font-extrabold text-ink-strong">Ideas</h1>
      <p className="mt-1 text-sm text-ink-soft">Northline product discovery</p>
      <div className="mt-5 overflow-x-auto rounded-atl-sm border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-tint text-xs tracking-wide text-ink-faint uppercase">
            <tr>
              <th className="px-4 py-2 font-semibold">Key</th>
              <th className="px-4 py-2 font-semibold">Idea</th>
              <th className="px-4 py-2 font-semibold">Status</th>
              <th className="px-4 py-2 font-semibold">Impact</th>
              <th className="px-4 py-2 font-semibold">Effort</th>
              <th className="px-4 py-2 font-semibold">Votes</th>
            </tr>
          </thead>
          <tbody>
            {ideas.map((idea) => (
              <tr key={idea.key} className="border-t border-line">
                <td className="px-4 py-3">
                  <Link to={`/jpd/ideas/${idea.key}`} className="focus-atl font-semibold text-atl-blue">
                    {idea.key}
                  </Link>
                </td>
                <td className="px-4 py-3 font-semibold text-ink-strong">{idea.summary}</td>
                <td className="px-4 py-3 text-ink-soft">{idea.status}</td>
                <td className="px-4 py-3">{idea.impact}</td>
                <td className="px-4 py-3">{idea.effort}</td>
                <td className="px-4 py-3">
                  <Button
                    type="button"
                    shape="box"
                    size="sm"
                    variant="secondary"
                    aria-label={`Vote for ${idea.key}`}
                    onClick={() => setIdeas(voteIdea(idea.key))}
                  >
                    {idea.votes} votes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProductLayout>
  );
}
