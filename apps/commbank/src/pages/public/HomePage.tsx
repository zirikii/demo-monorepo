import {
  ArrowRight,
  Calculator,
  CreditCard,
  HandCoins,
  HeartHandshake,
  Home,
  PiggyBank,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ButtonLink } from "@/components/ui/Button";

const products = [
  { title: "Bank accounts", text: "Everyday accounts and savings for your goals.", to: "/banking", icon: PiggyBank },
  { title: "Credit cards", text: "Compare low fee and Awards options.", to: "/credit-cards", icon: CreditCard },
  { title: "Home loans", text: "Plan, buy or refinance your home.", to: "/home-loans", icon: Home },
  { title: "Personal loans", text: "A clear path for your next big purchase.", to: "/personal-loans", icon: HandCoins },
] as const;

const tasks = [
  { label: "Calculate repayments", to: "/home-loans/calculator", icon: Calculator },
  { label: "Find a branch", to: "/locations", icon: Home },
  { label: "Get support", to: "/support", icon: HeartHandshake },
  { label: "Stay scam safe", to: "/support/security", icon: ShieldCheck },
] as const;

export function HomePage() {
  return (
    <PublicLayout>
      <section className="hero-pattern text-white">
        <div className="container-page grid min-h-[520px] items-center py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="mb-4 font-semibold text-cba-yellow">CommBank demo</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Your money, ready for what’s next
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              Explore realistic everyday banking and try a safe, local-only NetBank experience
              using fictional Australian data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/netbank/logon">Try NetBank demo</ButtonLink>
              <ButtonLink to="/banking" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                Explore banking
              </ButtonLink>
            </div>
          </div>
          <div className="mt-12 justify-self-center lg:mt-0">
            <div className="w-full max-w-sm rotate-2 rounded-[2rem] border border-white/20 bg-white p-6 text-cba-ink shadow-float">
              <div className="flex items-center justify-between">
                <img className="h-9" src="/brand/commbank-logo.svg" alt="" />
                <Smartphone aria-hidden="true" className="h-6 w-6" />
              </div>
              <p className="mt-10 text-sm text-cba-muted">Everyday balance</p>
              <p className="mt-1 text-3xl font-bold">$6,842.18</p>
              <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                {["Pay", "Transfer", "Cards"].map((label) => (
                  <span key={label} className="rounded-xl bg-cba-neutral py-3">{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Popular tasks" className="container-page -mt-7 relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to} className="surface-card flex items-center gap-3 p-5 font-semibold hover:-translate-y-0.5">
            <Icon aria-hidden="true" className="h-6 w-6 text-cba-positive" />
            {label}
            <ArrowRight aria-hidden="true" className="ml-auto h-4 w-4" />
          </Link>
        ))}
      </section>

      <section className="container-page py-20">
        <p className="font-semibold text-cba-positive">Find what fits</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Banking for every chapter</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map(({ title, text, to, icon: Icon }) => (
            <Link key={to} to={to} className="surface-card group p-6 transition-transform hover:-translate-y-1">
              <span className="inline-flex rounded-2xl bg-cba-yellow p-3"><Icon aria-hidden="true" /></span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-cba-ink-soft">{text}</p>
              <span className="mt-5 flex items-center gap-2 text-sm font-semibold">
                Explore <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cba-neutral py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-cba-yellow p-8 sm:p-12">
            <p className="font-semibold">Financial wellbeing</p>
            <h2 className="mt-3 text-3xl font-bold">Small habits can build a stronger buffer</h2>
            <p className="mt-4 leading-7">Create a goal, automate a transfer and see your progress in the NetBank demo.</p>
            <ButtonLink className="mt-7" variant="secondary" to="/banking/savings-accounts">Explore saving</ButtonLink>
          </div>
          <div>
            <p className="font-semibold text-cba-positive">Latest insights</p>
            <h2 className="mt-2 text-3xl font-bold">Useful ideas for everyday money</h2>
            <div className="mt-6 space-y-3">
              {["Five ways to check a message is really from your bank", "Planning a first-home deposit", "A practical guide to household cash flow"].map(
                (title) => (
                  <Link key={title} to="/news" className="flex items-center justify-between rounded-xl bg-white p-5 font-semibold shadow-card">
                    {title}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
