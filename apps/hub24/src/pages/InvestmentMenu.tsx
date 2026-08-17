import { Check, X } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INVESTMENT_MENUS } from "@/data/products";
import { MODELS } from "@/data/platform";
import { PRODUCT_DOCUMENTS } from "@/data/documents";
import { formatDate, formatPercent } from "@/lib/format";

const OPTION_ROWS = [
  "Managed portfolios",
  "Cash account",
  "Managed funds",
  "ASX listed securities",
  "International listed securities",
  "Term deposits",
];

export default function InvestmentMenuPage() {
  const booklets = PRODUCT_DOCUMENTS.filter((doc) => doc.type === "Investment Booklet");

  return (
    <PageLayout title="HUB24 Investment Menu">
      <PageHero
        eyebrow="Platform"
        title="HUB24 Investment Menu"
        body="Flexibility for your clients with the Discover, Core and Choice menus. We understand every client is different, so we've created three menus to choose from."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Features & benefits", to: "/features-benefits/" },
          { label: "Investment menu" },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="Compare"
          title="What sits on each menu"
          body="Clients can transition between menus while retaining the same account and underlying investments, without incurring significant costs or CGT."
        />

        <div className="mt-10 overflow-x-auto rounded-h24-lg border border-line bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">Investment options available on each HUB24 menu</caption>
            <thead>
              <tr className="border-b border-line bg-surface-tint">
                <th scope="col" className="px-5 py-4 text-xs font-bold tracking-[0.08em] text-ink-faint uppercase">
                  Investment option
                </th>
                {INVESTMENT_MENUS.map((menu) => (
                  <th
                    key={menu.id}
                    scope="col"
                    className="px-5 py-4 text-center text-xs font-bold tracking-[0.08em] text-ink-faint uppercase"
                  >
                    {menu.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {OPTION_ROWS.map((row) => (
                <tr key={row}>
                  <th scope="row" className="px-5 py-3.5 text-left font-medium text-ink">
                    {row}
                  </th>
                  {INVESTMENT_MENUS.map((menu) => {
                    const option = menu.options.find((candidate) => candidate.label === row);
                    return (
                      <td key={menu.id} className="px-5 py-3.5 text-center">
                        {option?.included ? (
                          <span className="inline-flex flex-col items-center gap-1">
                            <Check aria-label="Available" className="h-5 w-5 text-positive" />
                            {option.note ? (
                              <span className="text-xs text-ink-faint">{option.note}</span>
                            ) : null}
                          </span>
                        ) : (
                          <X aria-label="Not available" className="mx-auto h-5 w-5 text-ink-ghost" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-surface-tint">
                <th scope="row" className="px-5 py-3.5 text-left font-medium text-ink">
                  Administration fee
                </th>
                {INVESTMENT_MENUS.map((menu) => (
                  <td key={menu.id} className="px-5 py-3.5 text-center text-xs text-ink-soft">
                    {menu.adminFee}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="px-5 py-3.5 text-left font-medium text-ink">
                  Minimum balance
                </th>
                {INVESTMENT_MENUS.map((menu) => (
                  <td key={menu.id} className="px-5 py-3.5 text-center text-xs text-ink-soft">
                    {menu.minimum}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Managed portfolios"
          title="A sample of the model range"
          body="Over 800 managed portfolios are available across the menus. Performance shown is illustrative demo data."
        />
        <DataTable
          className="mt-10"
          caption="Sample managed portfolio models"
          rowKey={(model) => model.code}
          rows={MODELS}
          columns={[
            {
              key: "name",
              header: "Model",
              render: (model) => (
                <div className="flex flex-col">
                  <span className="font-semibold text-ink-strong">{model.name}</span>
                  <span className="text-xs text-ink-faint">{model.manager}</span>
                </div>
              ),
            },
            {
              key: "risk",
              header: "Risk profile",
              render: (model) => <Badge tone="neutral">{model.riskProfile}</Badge>,
            },
            {
              key: "menu",
              header: "Menus",
              render: (model) => <span className="text-ink-soft">{model.menu.join(", ")}</span>,
            },
            {
              key: "fee",
              header: "Mgmt fee",
              align: "right",
              render: (model) => formatPercent(model.managementFee),
            },
            {
              key: "one",
              header: "1yr",
              align: "right",
              render: (model) => (
                <span className="font-semibold text-positive">{formatPercent(model.oneYearReturn)}</span>
              ),
            },
            {
              key: "five",
              header: "5yr p.a.",
              align: "right",
              render: (model) => formatPercent(model.fiveYearReturn),
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading eyebrow="Documents" title="Full list of investment options" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {booklets.map((booklet) => (
            <Card key={booklet.id} className="flex flex-col gap-2">
              <CardHeading className="text-base">{booklet.name}</CardHeading>
              <CardBody className="text-sm">
                {booklet.product} · updated {formatDate(booklet.updated)}
              </CardBody>
            </Card>
          ))}
        </div>
        <ButtonLink to="/product-documents/" variant="secondary" className="mt-8">
          All product documents
        </ButtonLink>
      </Section>

      <CtaBand
        title="Not sure which menu suits your client?"
        body="Your Business Development Manager can model the fee outcome across Discover, Core and Choice for a specific balance."
      />
    </PageLayout>
  );
}
