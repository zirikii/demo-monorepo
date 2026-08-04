import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link } from "react-router-dom";

export function TravelPage() {
  useDocumentTitle("Travel products & services");
  return (
    <PageLayout>
      <PageHero eyebrow="Travel" title="Travel products & services" summary="Travel insurance, Travel Money Card, and FX calculator pathways (demo)." />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6">{[{t:'Travel insurance',to:'/insurance/travel'},{t:'Foreign exchange rates',to:'/rates'},{t:'CommBank app travel tools',to:'/digital-banking/app'}].map((x)=>(<Link key={x.to} to={x.to} className="rounded-xl border border-line bg-card p-5 font-bold hover:border-cba-yellow">{x.t}</Link>))}</div>
    </PageLayout>
  );
}
