import { CalendarDays, PiggyBank, ShieldCheck, TrendingUp } from "lucide-react";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { INVESTOR_NAV } from "@/components/portal/nav";
import { StatTile } from "@/components/portal/StatTile";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PRACTICE } from "@/data/platform";
import { usePortfolio } from "@/hooks/usePortfolio";
import { formatCurrency, formatCurrencyWhole, formatDate } from "@/lib/format";
import { accountValue, sortTransactions } from "@/lib/portfolio";

const CONCESSIONAL_CAP = 32_500;
const NON_CONCESSIONAL_CAP = 130_000;

export default function InvestorSuperPage() {
  const { accounts, holdings, transactions } = usePortfolio();

  const superAccount = accounts.find((account) => account.type === "HUB24 Super");
  const pensionAccount = accounts.find((account) => account.type === "HUB24 Pension");

  const contributions = transactions.filter(
    (transaction) => transaction.accountId === superAccount?.id && transaction.type === "Contribution",
  );
  const concessional = contributions
    .filter((transaction) => transaction.description.includes("Employer"))
    .reduce((total, transaction) => total + transaction.amount, 0);
  const nonConcessional = contributions
    .filter((transaction) => transaction.description.includes("Personal"))
    .reduce((total, transaction) => total + transaction.amount, 0);

  const pensionPayments = sortTransactions(
    transactions.filter(
      (transaction) =>
        transaction.accountId === pensionAccount?.id && transaction.type === "Pension payment",
    ),
  );

  if (!superAccount && !pensionAccount) {
    return (
      <PortalLayout
        portal="InvestorHUB"
        nav={INVESTOR_NAV}
        contextLabel="Adviser"
        contextValue={PRACTICE.name}
        contextNote={PRACTICE.afsl}
        title="Super & pension"
      >
        <EmptyState title="No superannuation accounts" body="You currently hold investment accounts only." />
      </PortalLayout>
    );
  }

  return (
    <PortalLayout
      portal="InvestorHUB"
      nav={INVESTOR_NAV}
      contextLabel="Adviser"
      contextValue={PRACTICE.name}
      contextNote={PRACTICE.afsl}
      title="Super & pension"
      description="Contributions, caps, insurance and pension payments"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Super balance"
          value={superAccount ? formatCurrencyWhole(accountValue(superAccount, holdings)) : "—"}
          note={superAccount ? `${superAccount.menu} menu` : undefined}
          icon={PiggyBank}
        />
        <StatTile
          label="Pension balance"
          value={pensionAccount ? formatCurrencyWhole(accountValue(pensionAccount, holdings)) : "—"}
          note={pensionAccount ? "Account-based pension" : undefined}
          icon={TrendingUp}
        />
        <StatTile
          label="Next pension payment"
          value={formatCurrency(4_800)}
          note="15th of each month"
          icon={CalendarDays}
        />
        <StatTile label="Insurance" value="Income protection" note="Premium funded from cash" icon={ShieldCheck} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard title="Contribution caps" description="Financial year to date">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold text-ink-strong">Concessional</span>
                <span className="text-sm tabular-nums text-ink-faint">
                  {formatCurrencyWhole(concessional)} of {formatCurrencyWhole(CONCESSIONAL_CAP)}
                </span>
              </div>
              <ProgressBar
                value={(concessional / CONCESSIONAL_CAP) * 100}
                label="Concessional contributions used"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold text-ink-strong">Non-concessional</span>
                <span className="text-sm tabular-nums text-ink-faint">
                  {formatCurrencyWhole(nonConcessional)} of {formatCurrencyWhole(NON_CONCESSIONAL_CAP)}
                </span>
              </div>
              <ProgressBar
                tone="navy"
                value={(nonConcessional / NON_CONCESSIONAL_CAP) * 100}
                label="Non-concessional contributions used"
              />
            </div>
            <p className="text-xs text-ink-faint">
              Cap amounts shown are illustrative for this demo and are not current legislated caps.
              Speak to your adviser before making a contribution.
            </p>
          </div>
        </PanelCard>

        <PanelCard title="Recent contributions" action={{ label: "All transactions", to: "/investorhub/transactions" }}>
          {contributions.length === 0 ? (
            <EmptyState title="No contributions this year" />
          ) : (
            <ul className="flex flex-col divide-y divide-line-soft">
              {sortTransactions(contributions).map((contribution) => (
                <li
                  key={contribution.id}
                  className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{contribution.description}</p>
                    <p className="text-xs text-ink-faint">{formatDate(contribution.date)}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-positive">
                    {formatCurrency(contribution.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </PanelCard>
      </div>

      {pensionPayments.length > 0 ? (
        <PanelCard className="mt-6" title="Pension payments" description="Account-based pension drawdown">
          <ul className="flex flex-col divide-y divide-line-soft">
            {pensionPayments.map((payment) => (
              <li key={payment.id} className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <Badge tone="neutral">Paid</Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{payment.description}</p>
                  <p className="text-xs text-ink-faint">{formatDate(payment.date)}</p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-ink-strong">
                  {formatCurrency(Math.abs(payment.amount))}
                </span>
              </li>
            ))}
          </ul>
        </PanelCard>
      ) : null}
    </PortalLayout>
  );
}
