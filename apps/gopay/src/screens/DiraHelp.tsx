import { Screen } from "@/components/system/PhoneFrame";
import { StatusBar } from "@/components/system/StatusBar";
import { PlainDivider } from "@/components/ui/Card";
import { useRekyc } from "@/hooks/useRekyc";

const A = "/figma";

const TOPICS = [
  { spot: "spot-topup.svg", label: "Top up" },
  { spot: "spot-withdraw.svg", label: "Withdraw money" },
  { spot: "spot-scam.svg", label: "Scam/Phising" },
  { spot: "spot-account.svg", label: "Account" },
  { spot: "spot-transaction.svg", label: "Transaction Issue" },
  { spot: "spot-fraud.svg", label: "Fraud & security" },
  { spot: "spot-product.svg", label: "Product & services" },
  { spot: "spot-other.svg", label: "Other" },
];

function IssueRow({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-[12px] px-[16px] py-[14px] text-left"
    >
      <img alt="" className="block size-[24px] shrink-0" src={icon} />
        <span className="flex min-w-px flex-1 flex-col items-start">
          <span className="fit-figma-line text-type-title text-[14px] leading-[20px] font-semibold [--fit-figma-line:0.84]">
            {title}
          </span>
        {subtitle ? (
          <span className="text-type-body text-[12px] leading-[16px]">{subtitle}</span>
        ) : null}
      </span>
      <img alt="" className="block size-[24px] shrink-0" src={`${A}/ic-next-ios.svg`} />
    </button>
  );
}

/**
 * Dira, the GoPay help centre. "I need to update my e-KTP data" is the third re-KYC
 * entry point in the PRD and drops the customer straight into the review screen.
 */
export function DiraHelp() {
  const { go, startRekyc } = useRekyc();

  return (
    <Screen>
      <div className="absolute top-0 left-0 h-[435px] w-[375px] overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 block size-full"
          src={`${A}/dira-header-background.svg`}
        />
        <img
          alt=""
          className="absolute top-[-80px] left-[277px] block size-[223px]"
          src={`${A}/dira-blob-large.svg`}
        />
        <img
          alt=""
          className="absolute top-[-52px] left-[305px] block size-[167px]"
          src={`${A}/dira-blob-small.svg`}
        />
        <img
          alt=""
          className="absolute top-[130px] left-[-83px] block size-[223px]"
          src={`${A}/dira-blob-large.svg`}
        />
        <img
          alt=""
          className="absolute top-[158px] left-[-55px] block size-[167px]"
          src={`${A}/dira-blob-small.svg`}
        />
      </div>

      <div className="relative flex w-full flex-col gap-[8px] pb-[8px]">
        <StatusBar variant="island" />
        <div className="flex w-full items-center justify-between px-[16px]">
          <button
            type="button"
            aria-label="Back"
            onClick={() => go("home")}
            className="bg-fill-primary shadow-float flex size-[40px] cursor-pointer items-center justify-center rounded-[48px]"
          >
            <img alt="" className="block size-[24px]" src={`${A}/dira-ic-back.svg`} />
          </button>
          <span className="bg-fill-primary border-border-mute flex items-center gap-[4px] rounded-[24px] border px-[12px] py-[8px]">
            <img alt="" className="block size-[24px]" src={`${A}/ic-help-history-24.svg`} />
            <span className="text-[14px] leading-[20px] font-semibold text-[#1e2225]">
              My Inquires
            </span>
          </span>
        </div>
      </div>

      <p className="type-title-large relative mt-[20px] w-full text-center text-white">
        Any relevant issues?
      </p>

      <div className="bg-fill-primary relative mx-[16px] mt-[16px] flex w-[343px] flex-col overflow-hidden rounded-[16px]">
        <IssueRow
          icon={`${A}/dira-issue-icon.svg`}
          title="I need to update my e-KTP data"
          onClick={startRekyc}
        />
        <PlainDivider className="w-[327px] self-center" />
        <IssueRow
          icon={`${A}/dira-issue-icon.svg`}
          title="Issues with Bank transfer or e-wallet"
        />
        <PlainDivider className="w-[327px] self-center" />
        <IssueRow
          icon={`${A}/dira-paylater-icon.svg`}
          title="Issues with GoPay Later transaction"
        />
        <PlainDivider className="w-[327px] self-center" />
        <IssueRow
          icon={`${A}/minispot-help.svg`}
          title="My issue is not listed here"
          subtitle="Ask here if you need assistance"
        />
      </div>

      <div className="relative mt-[56px] flex items-center justify-between px-[16px] py-[12px]">
        <p className="text-type-title text-[16px] leading-[20px] font-bold">All topics</p>
        <span className="bg-fill-static-white border-border-mute flex items-center gap-[4px] rounded-[24px] border px-[12px] py-[8px]">
          <img alt="" className="block size-[24px]" src={`${A}/ic-search-24.svg`} />
          <span className="text-[14px] leading-[20px] font-semibold text-[#1e2225]">Search</span>
        </span>
      </div>

      <div className="relative mx-[16px] grid w-[343px] grid-cols-2 gap-[8px]">
        {TOPICS.map((topic) => (
          <div
            key={topic.label}
            className="bg-fill-primary shadow-bevel-top flex items-center gap-[12px] rounded-[16px] p-[16px]"
          >
            <img alt="" className="block size-[40px] shrink-0" src={`${A}/${topic.spot}`} />
            <p className="text-type-title min-w-px flex-1 text-[13px] leading-[16px] font-semibold">
              {topic.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-fill-primary relative mx-[16px] mt-[24px] mb-[32px] flex w-[343px] items-center gap-[8px] rounded-[20px] p-[16px]">
        <div className="flex min-w-px flex-1 flex-col gap-[4px]">
          <p className="text-type-title text-[16px] leading-[20px] font-bold">Need more help?</p>
          <p className="text-type-body text-[13px] leading-[16px]">
            We will try help as much as we can
          </p>
        </div>
        <div className="relative size-[41px] shrink-0">
          <img
            alt=""
            className="absolute inset-0 block size-full"
            src={`${A}/dira-call-cta-background.svg`}
          />
          <img
            alt="Call us"
            className="absolute top-[8px] left-[8px] block size-[24px]"
            src={`${A}/ic-call-24.svg`}
          />
        </div>
      </div>
    </Screen>
  );
}
