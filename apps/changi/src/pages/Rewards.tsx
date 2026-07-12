import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Card } from "@/components/ui/Card";
import { rewardBenefits, rewardSections } from "@/data/rewards";

export function RewardsPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Changi Rewards" title="Changi Rewards: Earn Points, Enjoy Privileges & Deals" description="Open the door to a realm of personalised deals, exclusive privileges, and beyond with Changi Rewards.">
        <Card><h2 className="text-2xl font-bold">Sign up or Login</h2><p className="mt-3 text-sm leading-6 text-[#665448]">Demo account entry mirrors the public site call to action.</p></Card>
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Member's Benefits & Privileges</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rewardBenefits.map((benefit) => <Card key={benefit.title}><h3 className="text-xl font-bold">{benefit.title}</h3><p className="mt-3 text-sm leading-6 text-[#665448]">{benefit.description}</p><Link to={benefit.href} className="mt-5 inline-flex font-bold text-[#806d5d]">Read more</Link></Card>)}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-4">
          {rewardSections.map((section) => <Card key={section.title} className="bg-[#2f271f] text-white"><h3 className="text-xl font-bold">{section.title}</h3><p className="mt-3 text-sm leading-6 text-white/70">{section.description}</p><span className="mt-5 inline-flex text-sm font-bold text-[#f5a400]">View All</span></Card>)}
        </div>
      </section>
    </PageLayout>
  );
}
