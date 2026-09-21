import { Screen } from "@/components/system/PhoneFrame";
import { CircularButton } from "@/components/system/Navbar";
import { StatusBar } from "@/components/system/StatusBar";
import { useRekyc } from "@/hooks/useRekyc";
import { approvedSubmission } from "@/lib/rekyc/engine";
import { maskName } from "@/lib/rekyc/masking";
import { cn } from "@/lib/cn";

const A = "/figma";

/** Figma writes "5 Sep 2026"; `en-GB` would give the four-letter "Sept". */
function formatDueDate(date: Date) {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${date.getDate()} ${month} ${date.getFullYear()}`;
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-[4px]">
      <p className="text-type-title text-[14px] leading-[20px] font-semibold">{title}</p>
      {subtitle ? (
        <p className="text-type-body w-full text-[13px] leading-[16px]">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="relative size-[40px] shrink-0">
      <img alt="" className="absolute inset-0 block size-full" src={`${A}/avatar-base.svg`} />
      <p className="text-type-static-white absolute inset-0 flex items-center justify-center text-[18px] leading-[24px] font-bold">
        {initials}
      </p>
    </div>
  );
}

function ListCell({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-fill-primary shadow-bevel-top flex w-full items-center gap-[8px] rounded-[20px] px-[12px] py-[16px] text-left"
    >
      <span className="size-[40px] shrink-0 overflow-hidden">
        <img alt="" className="block size-full" src={icon} />
      </span>
      <span className="flex min-w-px flex-1 flex-col gap-[4px]">
        <span className="text-type-title text-[16px] leading-[20px] font-semibold">{title}</span>
        <span className="text-type-body text-[13px] leading-[16px]">{subtitle}</span>
      </span>
      <span className="size-[24px] shrink-0">
        <img alt="" className="block size-full" src={`${A}/ic-next-ios.svg`} />
      </span>
    </button>
  );
}

function PartnerCard({
  badge,
  badgeClass,
  logo,
  logoBackground,
  linkedTo,
}: {
  badge: string;
  badgeClass: string;
  logo: string;
  logoBackground: string;
  linkedTo: string;
}) {
  return (
    <div className="flex w-full flex-col items-start">
      <div
        className={cn(
          "shadow-bevel-top-low relative -mb-[16px] flex w-full items-center rounded-t-[20px] px-[16px] pt-[8px] pb-[20px]",
          badgeClass,
        )}
      >
        <p className="text-[13px] leading-[16px] font-semibold">{badge}</p>
      </div>
      <div className="bg-fill-primary shadow-bevel-top relative flex w-full items-center gap-[16px] rounded-[20px] px-[12px] py-[16px]">
        <div className="relative size-[40px] shrink-0">
          <Avatar initials="BK" />
          <span className="absolute -bottom-[2px] left-[calc(50%+14px)] size-[24px] -translate-x-1/2">
            <img alt="" className="absolute inset-0 block size-full" src={logoBackground} />
            <span className="absolute top-1/2 left-1/2 flex size-[16px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <img alt="" className="block size-full" src={logo} />
            </span>
          </span>
        </div>
        <div className="flex min-w-px flex-1 flex-col gap-[4px]">
          <p className="text-type-title text-[16px] leading-[20px] font-semibold">B*** K***</p>
          <p className="text-type-body text-[13px] leading-[16px]">***0222</p>
          <p className="text-type-inactive text-[13px] leading-[16px] whitespace-pre-wrap">
            {`Linked to B*** \n(${linkedTo})`}
          </p>
        </div>
        <button
          type="button"
          className="light-sheen-strong border-fill-active text-fill-active shrink-0 cursor-pointer rounded-[18px] border px-[16px] py-[8px] text-[14px] leading-[20px] font-bold"
        >
          Go to App
        </button>
      </div>
    </div>
  );
}

/**
 * Pusat Akun Terverifikasi — the self-initiated re-KYC entry point. The "Verified
 * Identity" row opens the e-KTP review screen; the red banner appears once the ODD
 * review date is close.
 */
export function AccountsCenter() {
  const { state, startRekyc, toast, go } = useRekyc();
  const approved = approvedSubmission(state);
  const dueDate = new Date(state.account.oddDueAt);
  const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / 86_400_000);
  const showReminder = approved !== null && daysUntilDue <= 45;
  const formattedDue = formatDueDate(dueDate);

  return (
    <Screen>
      <div className="absolute top-0 left-0 h-[389px] w-[375px] rounded-b-[16px]">
        <img
          alt=""
          className="absolute inset-0 size-full rounded-b-[16px] object-cover"
          src={`${A}/vac-header-background.png`}
        />
      </div>

      <div className="relative flex w-full flex-col items-start gap-[8px] pb-[8px]">
        <StatusBar variant="island" />
        <div className="flex w-full items-center gap-[24px] px-[16px]">
          <CircularButton icon="back" label="Back" onClick={() => go("home")} />
          {toast ? (
            <div className="flex items-center gap-[8px] rounded-[24px] bg-[#1e2125] px-[12px] py-[8px] [animation:toast-in_.25s_ease-out]">
              <span className="flex size-[20px] items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 20 20" className="size-[20px]" aria-hidden>
                  <circle cx="10" cy="10" r="10" fill="#fff" />
                  <path
                    d="M5.8 10.4l2.6 2.6 5.8-5.8"
                    fill="none"
                    stroke="#1e2125"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-[14px] leading-[20px] font-bold text-white">{toast}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative mt-[16px] flex w-[343px] translate-x-[16px] flex-col items-start gap-[24px]">
        <div className="flex h-[78px] w-full flex-col items-start gap-[8px] text-center text-white">
          <p className="type-title-large w-full">Accounts Center</p>
          <p className="w-full text-[16px] leading-[20px]">
            You can manage accounts under the same KTP number.
          </p>
        </div>

        <div className="bg-fill-primary flex w-full flex-col items-start overflow-hidden rounded-[20px]">
          <button
            type="button"
            onClick={startRekyc}
            className="light-sheen shadow-bevel-top-low relative flex w-full items-center gap-[8px] py-[12px] pr-[16px] pl-[12px] text-left"
          >
            <span className="size-[40px] shrink-0 overflow-hidden">
              <img alt="" className="block size-full" src={`${A}/minispot-ektp.svg`} />
            </span>
            <span className="flex min-w-px flex-1 flex-col justify-center gap-[8px] overflow-hidden">
              <span className="text-type-body text-[13px] leading-[16px] font-semibold">
                Verified Identity
              </span>
              <span className="flex flex-col justify-center">
                <span className="text-[16px] leading-[20px] font-semibold text-[#494a4a]">
                  {maskName(approved?.data.fullName ?? "")}
                </span>
                <span className="text-type-body text-[14px] leading-[20px]">
                  {`***${state.account.id.slice(-4)}`}
                </span>
              </span>
            </span>
            <span className="bg-fill-secondary shadow-bevel-top-low light-sheen-strong border-border-mute flex shrink-0 items-center justify-center rounded-[12px] border p-[8px]">
              <span className="size-[24px]">
                <img alt="" className="block size-full" src={`${A}/ic-next-ios.svg`} />
              </span>
            </span>
          </button>

          {showReminder ? (
            <button
              type="button"
              onClick={startRekyc}
              className="bg-fill-error flex w-full items-center justify-center gap-[12px] bg-gradient-to-b from-white/30 to-transparent px-[16px] py-[8px]"
            >
              <img
                alt=""
                className="block size-[16px] shrink-0"
                src={`${A}/ic-maintenance-16-white.svg`}
              />
              <span className="flex min-w-px flex-1 flex-col items-center">
                <span className="fit-figma-line text-[13px] leading-[16px] font-semibold text-white">
                  {`Confirm your  e-KTP data before ${formattedDue}`}
                </span>
                <span className="fit-figma-line text-[12px] leading-[16px] text-white">
                  Otherwise your GoPay account will be blocked
                </span>
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="relative mt-[24px] flex w-[343px] translate-x-[16px] flex-col items-start gap-[24px] pb-[32px]">
        <div className="flex w-full flex-col items-start gap-[8px]">
          <SectionHeading
            title="Connected Accounts"
            subtitle="You can switch account or unlink accounts that does not belong to you"
          />
          <div className="bg-fill-primary shadow-bevel-top flex w-full flex-col items-start justify-center overflow-hidden rounded-[20px]">
            <div className="flex w-full items-center gap-[16px] px-[12px] py-[16px]">
              <Avatar initials="BK" />
              <div className="flex min-w-px flex-1 flex-col gap-[4px]">
                <p className="text-type-title text-[16px] leading-[20px] font-semibold">
                  Budi Keren
                </p>
                <p className="text-type-body text-[13px] leading-[16px]">+62810 0000 0111</p>
              </div>
              <span className="text-type-body border-border-mute bg-fill-primary shrink-0 rounded-[24px] border px-[12px] py-[8px] text-[14px] leading-[20px]">
                Logged in
              </span>
            </div>
            <div className="bg-border-mute h-px w-full" />
            <div className="flex w-full items-center gap-[16px] px-[12px] py-[16px]">
              <Avatar initials="BK" />
              <div className="flex min-w-px flex-1 flex-col gap-[4px]">
                <p className="text-type-title text-[16px] leading-[20px] font-semibold">
                  B*** K*** 2
                </p>
                <p className="text-type-body text-[13px] leading-[16px]">***0333</p>
                <p className="text-type-body text-[13px] leading-[16px]">***@***.com</p>
              </div>
              <span className="bg-fill-active light-sheen text-type-static-white flex w-[78px] shrink-0 items-center justify-center rounded-[18px] px-[16px] py-[8px] text-[14px] leading-[20px] font-bold">
                Switch
              </span>
            </div>
          </div>

          <ListCell
            icon={`${A}/minispot-child.svg`}
            title="Child accounts"
            subtitle="Manage all accounts under your KK"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-[8px]">
          <SectionHeading title="Connected Experience" />
          <ListCell
            icon={`${A}/minispot-ewallet.svg`}
            title="Wallet & Tabungan"
            subtitle="View all wallets and balances"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-[8px]">
          <SectionHeading title="Partner Accounts" />
          <PartnerCard
            badge="GoPay Merchant"
            badgeClass="bg-brand-blue-secondary text-product-payments"
            logo={`${A}/logo-gopay.svg`}
            logoBackground={`${A}/logo-background-payments.svg`}
            linkedTo="***0333"
          />
          <PartnerCard
            badge="GoFood Merchant"
            badgeClass="bg-brand-red-secondary text-product-fmcg"
            logo={`${A}/logo-gofood.svg`}
            logoBackground={`${A}/logo-background-fmcg.svg`}
            linkedTo="***0333"
          />
          <PartnerCard
            badge="Driver"
            badgeClass="bg-brand-green-secondary text-product-transport"
            logo={`${A}/logo-gojek.svg`}
            logoBackground={`${A}/logo-background-transport.svg`}
            linkedTo="***0111"
          />
        </div>
      </div>
    </Screen>
  );
}
