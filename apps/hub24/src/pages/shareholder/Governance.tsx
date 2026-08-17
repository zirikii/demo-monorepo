import { FileText } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ShareholderNav } from "@/components/marketing/ShareholderNav";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GOVERNANCE_DOCUMENTS } from "@/data/shareholder";
import { SITE } from "@/data/site";
import { formatDate } from "@/lib/format";

const COMMITTEES = [
  {
    name: "Audit, Risk and Compliance Committee",
    body: "Oversees financial reporting, the external audit relationship, the risk management framework and regulatory compliance across the Group's AFSL and RSE licensed entities.",
  },
  {
    name: "People, Remuneration and Nominations Committee",
    body: "Oversees remuneration policy, executive performance, board composition and succession, and the Group's people strategy.",
  },
  {
    name: "Technology and Innovation Committee",
    body: "Oversees the technology strategy, cyber security posture, platform resilience and the investment program behind the Group's product roadmap.",
  },
];

export default function GovernancePage() {
  return (
    <PageLayout title="Corporate governance">
      <PageHero
        eyebrow="Shareholder Centre"
        title="Corporate governance"
        body="Board charters, policies and committee structure for HUB24 Limited."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Shareholder Centre", to: "/shareholder-centre/overview/" },
          { label: "Corporate governance" },
        ]}
      />

      <ShareholderNav />

      <Section>
        <SectionHeading
          eyebrow="Board"
          title="Committees of the board"
          body="The board delegates specific responsibilities to three standing committees, each operating under its own charter."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {COMMITTEES.map((committee) => (
            <Card key={committee.name} className="flex flex-col gap-3">
              <CardHeading className="text-base">{committee.name}</CardHeading>
              <CardBody className="text-sm">{committee.body}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Documents" title="Charters and policies" />
        <ul className="mt-8 divide-y divide-line rounded-h24-lg border border-line bg-white">
          {GOVERNANCE_DOCUMENTS.map((document) => (
            <li key={document.name} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <FileText aria-hidden className="h-4 w-4 shrink-0 text-h24-teal" />
              <span className="flex-1 text-[0.95rem] font-medium text-ink-strong">{document.name}</span>
              <span className="text-xs text-ink-faint">Updated {formatDate(document.updated)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink-faint">
          These entries are placeholders for a demonstration build — nothing downloads.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Regulated entities" title="Who does what" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col gap-2">
            <CardHeading className="text-base">HUB24 Custodial Services Ltd</CardHeading>
            <CardBody className="text-sm">
              Operator and custodian of HUB24 Invest, promoter of the HUB24 Super Fund, and provider
              of administration and reporting services to other participants in the industry.
            </CardBody>
          </Card>
          <Card className="flex flex-col gap-2">
            <CardHeading className="text-base">HTFS Nominees Pty Limited</CardHeading>
            <CardBody className="text-sm">
              Trustee and issuer of interests in HUB24 Super, a regulated superannuation fund.
            </CardBody>
          </Card>
        </div>
        <p className="mt-8 text-sm text-ink-faint">
          {SITE.legalName} (ABN {SITE.abn}, {SITE.ticker}) is referenced here for demonstration
          purposes only. This page is not a source of corporate governance information.
        </p>
      </Section>
    </PageLayout>
  );
}
