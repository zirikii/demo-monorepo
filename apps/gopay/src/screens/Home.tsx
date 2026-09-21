import { Screen } from "@/components/system/PhoneFrame";
import { StatusBar } from "@/components/system/StatusBar";
import { useRekyc } from "@/hooks/useRekyc";
import { approvedSubmission } from "@/lib/rekyc/engine";
import { cn } from "@/lib/cn";

const A = "/figma";

function WalletPill({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center gap-[4px] rounded-[24px] border border-[rgba(30,33,37,0.5)] bg-gradient-to-b from-[rgba(20,112,166,0.7)] to-[rgba(11,99,151,0.7)] p-[8px]"
    >
      <img alt="" className="block size-[16px]" src={icon} />
      <span className="text-[12px] leading-[16px] whitespace-nowrap text-white">{label}</span>
      <img alt="" className="block size-[16px]" src={`${A}/ic-next-ios-16-white.svg`} />
    </button>
  );
}

function WalletAction({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex h-[52px] w-[80px] flex-col items-center justify-center gap-[2px] rounded-[16px] border border-[rgba(30,33,37,0.5)] bg-gradient-to-b from-[rgba(20,112,166,0.7)] to-[rgba(11,99,151,0.7)]">
      <img alt="" className="block size-[16px]" src={icon} />
      <span className="text-[12px] leading-[16px] text-white">{label}</span>
    </div>
  );
}

function TaskRow({
  divider,
  logo,
  title,
  subtitle,
  meta,
  metaTone,
  cta,
  onCta,
}: {
  divider: string;
  logo: string;
  title: string;
  subtitle: string;
  meta: string;
  metaTone: "critical" | "body";
  cta: string;
  onCta?: () => void;
}) {
  return (
    <div className="w-full">
      <img alt="" className="block h-px w-full" src={divider} />
      <div className="flex w-full items-center gap-[12px] bg-[rgba(255,246,153,0.1)] p-[12px]">
        <img alt="" className="block size-[32px] shrink-0 rounded-[8px]" src={logo} />
        <div className="flex min-w-px flex-1 flex-col">
          <p className="text-type-title text-[13px] leading-[16px] font-semibold">{title}</p>
          <p className="text-type-body text-[12px] leading-[16px]">{subtitle}</p>
          <p
            className={cn(
              "text-[12px] leading-[16px] font-semibold",
              metaTone === "critical" ? "text-[#ea001f]" : "text-type-body",
            )}
          >
            {meta}
          </p>
        </div>
        <button
          type="button"
          onClick={onCta}
          className="bg-fill-active light-sheen text-type-static-white flex shrink-0 cursor-pointer items-center gap-[4px] rounded-[40px] px-[16px] py-[8px] text-[13px] leading-[16px] font-semibold"
        >
          {cta}
          <img alt="" className="block size-[16px]" src={`${A}/genie-ic-arrow-right-16.svg`} />
        </button>
      </div>
    </div>
  );
}

function FeatureTile({ icon, label, rounded }: { icon: string; label: string; rounded?: boolean }) {
  return (
    <div className="flex min-w-px flex-1 flex-col items-center gap-[4px]">
      <div className="border-border-mute light-sheen-strong shadow-bevel-top flex h-[56px] w-full items-center justify-center rounded-[16px] border">
        <img
          alt=""
          className={cn("block", rounded ? "size-[34px] rounded-[8px]" : "size-[40px]")}
          src={icon}
        />
      </div>
      <p className="text-type-title text-center text-[12px] leading-[16px] whitespace-pre-line">
        {label}
      </p>
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  return (
    <div className="flex min-w-px flex-1 flex-col items-center gap-[2px] py-[6px]">
      <div
        className={cn(
          "flex h-[24px] w-[48px] items-center justify-center rounded-[40px]",
          active && "bg-[rgba(0,174,214,0.1)]",
        )}
      >
        <img alt="" className="block size-[24px]" src={icon} />
      </div>
      <p
        className={cn(
          "text-[12px] leading-[16px]",
          active ? "text-[#00aed6] font-semibold" : "text-type-body",
        )}
      >
        {label}
      </p>
    </div>
  );
}

/**
 * The GoPay home screen. Two of the PRD's re-KYC entry points live here: the wallet
 * cross-sell pill and the Reminder task card, both of which open the e-KTP review.
 */
export function Home() {
  const { go, startRekyc, state } = useRekyc();
  const approved = approvedSubmission(state);
  const dueDate = new Date(state.account.oddDueAt);
  const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / 86_400_000);
  const dueLabel = daysUntilDue <= 0 ? "Due today" : `Due in ${daysUntilDue} days`;

  return (
    <Screen background="bg-fill-quaternary">
      <div className="relative h-[314px] w-full overflow-hidden">
        <img
          alt=""
          className="absolute top-0 left-0 block h-[318px] w-[375px]"
          src={`${A}/home-wallet-background-fill.svg`}
        />
        <img
          alt=""
          className="absolute top-[-178px] left-[55px] block h-[103px] w-[523px] -rotate-50"
          src={`${A}/home-wallet-mesh-gradient.svg`}
        />
        <img
          alt=""
          className="absolute inset-0 block size-full mix-blend-soft-light"
          src={`${A}/home-wallet-background-texture.svg`}
        />

        <div className="relative">
          <StatusBar variant="island" />

          <div className="flex items-center justify-between px-[16px] py-[4px]">
            <img
              alt="GoPay"
              className="block h-[12px] w-[57px]"
              src={`${A}/home-logo-gopay-white.svg`}
            />
            <div className="rounded-[16px] bg-[rgba(30,33,37,0.15)] px-[12px] py-[4px]">
              <p className="text-[12px] leading-[16px] text-white">Fully protected</p>
            </div>
            <div className="flex size-[40px] items-center justify-center rounded-[16px] border border-[rgba(30,33,37,0.5)] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-[2px]">
              <img alt="Help" className="block size-[16px]" src={`${A}/ic-help-white-16.svg`} />
            </div>
          </div>

          <div className="mt-[8px] flex items-start justify-between px-[16px]">
            <div className="flex flex-col">
              <div className="flex items-center gap-[4px]">
                <img alt="Rp" className="block size-[16px]" src={`${A}/ic-rp-16.svg`} />
                <p className="type-hero text-white">50.000</p>
                <img alt="" className="block size-[16px]" src={`${A}/ic-read-message-16.svg`} />
              </div>
              <p className="pl-[20px] text-[12px] leading-[16px] text-white">
                <span className="text-[13px] font-semibold">5300</span> coins
              </p>
              <div className="mt-[16px] flex items-center gap-[4px]">
                <img
                  alt=""
                  className="block size-[16px]"
                  src={`${A}/ic-timeline-bar-chart-16.svg`}
                />
                <p className="text-[12px] leading-[16px] text-white">
                  <span className="text-[13px] font-semibold">Rp50.000</span> spent in Nov
                </p>
                <img alt="" className="block size-[16px]" src={`${A}/ic-next-ios-16-white.svg`} />
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <WalletAction icon={`${A}/ic-add-16.svg`} label="Top up" />
              <WalletAction icon={`${A}/ic-arrow-down-16.svg`} label="Withdraw" />
            </div>
          </div>

          <div className="mt-[16px] flex gap-[8px] overflow-x-auto pl-[16px] [scrollbar-width:none]">
            <WalletPill
              icon={`${A}/ic-ektp-face-16.svg`}
              label="Update your e-KTP data"
              onClick={startRekyc}
            />
            <WalletPill icon={`${A}/ic-pinjam-16.svg`} label="Pinjam up to 25mio" />
            <WalletPill icon={`${A}/ic-gopaylater-16.svg`} label="Activate Paylater" />
          </div>
        </div>
      </div>

      <div className="relative -mt-[16px] flex flex-col items-center gap-[12px] pb-[100px]">
        <div className="bg-fill-primary w-[343px] overflow-hidden rounded-[20px] pt-[12px]">
          <div className="flex items-center gap-[8px] pr-[12px] pl-[16px] pb-[12px]">
            <span className="border-border-mute flex size-[24px] items-center justify-center rounded-[40px] border">
              <img alt="" className="block size-[16px]" src={`${A}/ic-expand.svg`} />
            </span>
            <p className="text-type-title min-w-px flex-1 text-[16px] leading-[20px] font-semibold">
              Reminder
            </p>
            <span className="flex items-center gap-[4px] rounded-[40px] border border-[rgba(0,136,13,0.4)] bg-[#eaffea] py-[8px] pr-[8px] pl-[16px] text-[13px] leading-[16px] font-semibold text-[#1e2225]">
              View all
              <img alt="" className="block size-[16px]" src={`${A}/genie-ic-arrow-right-16.svg`} />
            </span>
          </div>

          <TaskRow
            divider={`${A}/genie-task-divider.svg`}
            logo={`${A}/genie-task-logo-pln.png`}
            title="Update your e-KTP data"
            subtitle={`Make sure it${"\u2019"}s the most updated`}
            meta={dueLabel}
            metaTone="critical"
            cta="Update"
            onCta={startRekyc}
          />
          <TaskRow
            divider={`${A}/genie-task-divider-gold.svg`}
            logo={`${A}/genie-task-logo-bpjs.png`}
            title="Task Y"
            subtitle="+621133020245"
            meta="Rp1.088.292 • Due today"
            metaTone="body"
            cta="Pay"
          />
        </div>

        <div className="bg-fill-primary flex w-[343px] flex-col gap-[12px] rounded-[24px] p-[12px]">
          <div className="flex gap-[12px]">
            <FeatureTile icon={`${A}/tile-transfer-asset.svg`} label="Free Transfer" />
            <FeatureTile icon={`${A}/minispot-pulsa.svg`} label="Pulsa" />
            <FeatureTile icon={`${A}/minispot-data-package.svg`} label="Data package" />
            <FeatureTile icon={`${A}/tile-pln-logo.png`} label="PLN" rounded />
          </div>
          <div className="flex gap-[12px]">
            <FeatureTile icon={`${A}/tile-gopay-pet.png`} label="GoPay Pet" />
            <FeatureTile icon={`${A}/tile-split-bill.png`} label="Split Bill" />
            <FeatureTile icon={`${A}/minispot-games.svg`} label={"Games\ntop up"} />
            <FeatureTile icon={`${A}/ic-menu-16-drawer.svg`} label="View all" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => go("vac")}
          className="bg-fill-primary flex w-[343px] cursor-pointer items-center gap-[12px] rounded-[20px] p-[16px] text-left"
        >
          <img alt="" className="block size-[40px] shrink-0" src={`${A}/minispot-ektp.svg`} />
          <span className="flex min-w-px flex-1 flex-col">
            <span className="text-type-title text-[16px] leading-[20px] font-semibold">
              Accounts Center
            </span>
            <span className="text-type-body text-[13px] leading-[16px]">
              {approved ? "Verified Identity · 1 e-KTP on file" : "Verify your identity"}
            </span>
          </span>
          <img alt="" className="block size-[24px] shrink-0" src={`${A}/ic-next-ios.svg`} />
        </button>

        <button
          type="button"
          onClick={() => go("dira")}
          className="bg-fill-primary flex w-[343px] cursor-pointer items-center gap-[12px] rounded-[20px] p-[16px] text-left"
        >
          <img alt="" className="block size-[40px] shrink-0" src={`${A}/minispot-help.svg`} />
          <span className="flex min-w-px flex-1 flex-col">
            <span className="text-type-title text-[16px] leading-[20px] font-semibold">
              Help Centre
            </span>
            <span className="text-type-body text-[13px] leading-[16px]">
              Ask Dira if you need assistance
            </span>
          </span>
          <img alt="" className="block size-[24px] shrink-0" src={`${A}/ic-next-ios.svg`} />
        </button>
      </div>

      <div className="sticky bottom-0 w-full bg-white/90 backdrop-blur-[10px]">
        <img alt="" className="block h-px w-full" src={`${A}/bottomnav-divider.svg`} />
        <div className="relative flex items-start">
          <NavItem icon={`${A}/bottomnav-ic-home-active.svg`} label="Home" active />
          <NavItem icon={`${A}/bottomnav-ic-finance.svg`} label="Finance" />
          <div className="flex min-w-px flex-1 flex-col items-center gap-[2px] py-[6px]">
            <div className="h-[24px]" />
            <p className="text-type-body text-[12px] leading-[16px]">QRIS</p>
          </div>
          <NavItem icon={`${A}/bottomnav-ic-history.svg`} label="History" />
          <NavItem icon={`${A}/bottomnav-avatar.png`} label="Profile" />
          <div className="absolute top-[-18px] left-1/2 flex h-[56px] w-[75px] -translate-x-1/2 items-center justify-center rounded-[40px] bg-gradient-to-b from-[#fafafa] to-[#dfdfe0] p-[4px]">
            <div className="flex size-full items-center justify-center rounded-[36px] border border-[#1982bf] bg-gradient-to-b from-[rgb(26,135,198)] to-[rgb(91,185,231)]">
              <img alt="QRIS" className="block size-[24px]" src={`${A}/bottomnav-qris-glyph.svg`} />
            </div>
          </div>
        </div>
        <div className="flex justify-center py-[8px]">
          <div className="h-[5px] w-[134px] rounded-[100px] bg-black/25" />
        </div>
      </div>
    </Screen>
  );
}
