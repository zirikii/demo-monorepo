import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { RovoPanel } from "@/components/jira/RovoPanel";
import { Field, TextInput } from "@/components/ui/Field";
import { getProductApp } from "@/data/apps";
import { searchGraph } from "@/data/rovo";
import { readAgents, setAgentEnabled } from "@/lib/rovo";

const APP = getProductApp("rovo");
const NAV = [
  { label: "Studio", to: "/rovo", end: true },
];

export default function RovoStudioPage() {
  const [query, setQuery] = useState("");
  const [agents, setAgents] = useState(readAgents);
  const hits = useMemo(() => searchGraph(query), [query]);

  return (
    <ProductLayout app={APP} title="Studio · Rovo" nav={NAV}>
      <h1 className="text-2xl font-extrabold text-ink-strong">Rovo Studio</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Search the Teamwork Graph, chat, and switch agents for Northline.
      </p>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-atl-sm border border-line bg-white p-5">
          <h2 className="text-base font-extrabold text-ink-strong">Search</h2>
          <Field label="Search the graph" htmlFor="rovo-search" className="mt-3">
            <TextInput
              id="rovo-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Safari, PORTAL-161, VPN…"
            />
          </Field>
          <ul className="mt-4 flex flex-col gap-2">
            {hits.map((hit) => (
              <li key={hit.id}>
                <Link
                  to={hit.href}
                  className="focus-atl block rounded-atl px-3 py-2 hover:bg-surface-tint"
                >
                  <span className="text-[0.65rem] font-bold tracking-wide text-ink-faint uppercase">
                    {hit.kind}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-atl-blue">{hit.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="h-[28rem]">
          <RovoPanel />
        </section>
      </div>

      <section className="mt-6 rounded-atl-sm border border-line bg-white p-5">
        <h2 className="text-base font-extrabold text-ink-strong">Agents</h2>
        <ul className="mt-4 flex flex-col gap-4">
          {agents.map((agent) => (
            <li key={agent.id} className="flex items-start justify-between gap-4">
              <span>
                <span className="block font-bold text-ink-strong">{agent.name}</span>
                <span className="text-sm text-ink-faint">{agent.description}</span>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={agent.enabled}
                aria-label={agent.name}
                onClick={() => setAgents(setAgentEnabled(agent.id, !agent.enabled))}
                className={
                  agent.enabled
                    ? "focus-atl relative h-6 w-11 shrink-0 rounded-full bg-atl-blue"
                    : "focus-atl relative h-6 w-11 shrink-0 rounded-full bg-surface-deep"
                }
              >
                <span
                  className={
                    agent.enabled
                      ? "absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white"
                      : "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white"
                  }
                />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </ProductLayout>
  );
}
