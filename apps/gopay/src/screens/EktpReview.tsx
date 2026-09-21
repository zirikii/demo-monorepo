import { useState } from "react";
import { Screen } from "@/components/system/PhoneFrame";
import { TitleNavbar } from "@/components/system/Navbar";
import { BigDivider, DataRow, PlainDivider } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRekyc } from "@/hooks/useRekyc";
import { approvedSubmission } from "@/lib/rekyc/engine";
import { maskKtpData } from "@/lib/rekyc/masking";
import { ON_FILE_KTP } from "@/data/account";
import { cn } from "@/lib/cn";

const A = "/figma";

/**
 * The e-KTP data review screen. It opens collapsed on the six fields the PRD lists and
 * reveals RT/RW, kelurahan, kecamatan, religion and gender behind "See more data".
 */
export function EktpReview() {
  const { state, go, showToast } = useRekyc();
  const [expanded, setExpanded] = useState(false);
  const masked = maskKtpData(approvedSubmission(state)?.data ?? ON_FILE_KTP);

  return (
    <Screen className="flex flex-col">
      <div className="bg-fill-quaternary sticky top-0 z-10">
        <TitleNavbar
          title={expanded ? "Review e-KTP data" : "Your e-KTP data"}
          onBack={() => go("vac")}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-[16px] px-[16px] py-[12px] pb-[180px]">
        <div className="bg-fill-primary shadow-bevel-top-low relative flex w-full flex-col items-start rounded-[20px]">
          <div className="flex w-full flex-col items-start gap-[12px] px-[16px] pt-[16px] pb-[15px]">
            <div className="flex w-full items-start gap-[12px]">
              <span className="size-[40px] shrink-0 overflow-hidden">
                <img alt="" className="block size-full" src={`${A}/minispot-ektp.svg`} />
              </span>
              <div className="flex min-w-px flex-1 flex-col justify-center text-[14px] leading-[20px]">
                <p className="text-type-body w-full">Full name</p>
                <p className="text-type-title w-full font-semibold">{masked.fullName}</p>
              </div>
            </div>
          </div>

          <BigDivider />

          <div className="light-sheen flex w-full flex-col items-start rounded-[20px]">
            <div className="flex w-full flex-col items-start gap-[12px] p-[16px]">
              <DataRow label="NIK" value={masked.nik} />
              <PlainDivider />
              <DataRow label="Tgl. Lahir" value={masked.dateOfBirth} />
              <PlainDivider />
              <DataRow label="Occupation" value={masked.occupation} />
              <PlainDivider />
              <DataRow label="Address" value={masked.address} />
              <PlainDivider />
              <DataRow label="Marital Status" value={masked.maritalStatus} />
            </div>

            {expanded ? (
              <div className="flex w-full flex-col items-start gap-[12px] px-[16px] pb-[16px]">
                <PlainDivider />
                <DataRow label="RT/RW" value={masked.rtRw} />
                <PlainDivider />
                <DataRow label="Kelurahan" value={masked.kelurahan} />
                <PlainDivider />
                <DataRow label="Kecamatan" value={masked.kecamatan} />
                <PlainDivider />
                <DataRow label="Religion" value={masked.religion} />
                <PlainDivider />
                <DataRow label="Jenis Kelamin" value={masked.gender} />
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className="flex w-full cursor-pointer items-center justify-center gap-[12px] px-[16px] pb-[12px]"
            >
              <span className="text-type-body text-center text-[14px] leading-[20px] font-semibold">
                {expanded ? "See less data" : "See more data"}
              </span>
              <span className={cn("flex size-[16px] items-center justify-center", !expanded && "rotate-180")}>
                <img alt="" className="block size-full" src={`${A}/ic-expand.svg`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-fill-primary shadow-bevel-top sticky bottom-0 mt-auto flex w-full flex-col items-start gap-[12px] rounded-t-[16px] px-[16px] pt-[16px] pb-[30px]">
        <Button
          onClick={() => {
            go("vac");
            showToast("Thanks for confirming");
          }}
        >
          My data is still the same
        </Button>
        <Button variant="tertiary" onClick={() => go("capture-onboarding")}>
          I need to update my e-KTP data
        </Button>
      </div>
    </Screen>
  );
}
