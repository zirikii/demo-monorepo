import { Screen } from "@/components/system/PhoneFrame";
import { TransparentNavbar } from "@/components/system/Navbar";
import { Button } from "@/components/ui/Button";
import { useRekyc } from "@/hooks/useRekyc";
import { ONBOARDING_COPY, type OnboardingContext } from "@/lib/rekyc/copy";

const A = "/figma";

const STEP_SPOTS = [`${A}/spot-ektp.svg`, `${A}/spot-take-selfie.svg`];

/**
 * The shared OneKYC capture onboarding screen. Every string comes from the copy config
 * keyed by entry context, so the re-KYC context says "Update" rather than "Register".
 */
export function CaptureOnboarding({ context = "rekyc" }: { context?: OnboardingContext }) {
  const { go } = useRekyc();
  const copy = ONBOARDING_COPY[context];

  return (
    <Screen>
      <div className="flex w-full flex-col items-start">
        <div className="-mb-[64px] h-[250px] w-[375px] overflow-hidden">
          <img alt="" className="block size-full" src={`${A}/onboarding-hero.svg`} />
        </div>

        <div className="flex w-[375px] flex-col items-center justify-center gap-[20px] px-[16px]">
          <div className="border-border-mute bg-fill-secondary light-sheen-strong shadow-bevel-top relative flex w-[343px] flex-col items-start justify-center rounded-[20px] border">
            <div className="flex w-full flex-col items-start gap-[16px] p-[24px]">
              <div className="flex w-full flex-col items-start gap-[4px] text-center">
                <p className="type-title-large text-type-title w-full">{copy.title}</p>
                <p className="text-type-body w-full text-[13px] leading-[16px]">{copy.subtitle}</p>
              </div>

              <div className="flex w-[295px] flex-col items-start gap-[8px]">
                <div className="bg-fill-primary flex w-full flex-col items-center justify-center gap-[8px] rounded-[12px] drop-shadow-[0_2px_0.5px_rgba(255,255,255,0.7)]">
                  <div className="flex w-full items-start gap-[12px] pl-[8px]">
                    <div className="flex flex-col items-center justify-center self-stretch py-[12px]">
                      {copy.steps.map((step, index) => (
                        <div key={step} className="flex flex-col items-center">
                          {index > 0 ? <span className="bg-border-mute h-[32px] w-[2px]" /> : null}
                          <span className="bg-fill-primary border-border-mute text-type-body flex size-[20px] items-center justify-center rounded-[100px] border-2 text-center text-[12px] leading-[16px] font-semibold">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex min-w-px flex-1 flex-col items-start gap-[16px]">
                      {copy.steps.map((step, index) => (
                        <div key={step} className="flex w-full items-center gap-[12px]">
                          <p className="text-type-body min-w-px flex-1 text-[12px] leading-[16px] font-semibold">
                            {step}
                          </p>
                          <span className="size-[40px] shrink-0 overflow-hidden">
                            <img alt="" className="block size-full" src={STEP_SPOTS[index]} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-fill-mute flex w-full items-center gap-[8px] rounded-[8px] p-[8px]">
                    <span className="size-[16px] shrink-0">
                      <img alt="" className="block size-full" src={`${A}/ic-info.svg`} />
                    </span>
                    <p className="text-type-body min-w-px flex-1 text-[12px] leading-[16px]">
                      {copy.footnote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-fill-mute flex w-full flex-col items-center justify-center rounded-[120px] px-[16px] py-[8px]">
            <div className="flex items-center justify-center gap-[10px]">
              <span className="size-[16px] shrink-0">
                <img alt="" className="block size-full" src={`${A}/ic-secured.svg`} />
              </span>
              <p className="text-type-green-active text-[12px] leading-[16px] font-semibold">
                GoPay is supervised by Bank Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-fill-primary shadow-bevel-top absolute bottom-0 left-0 flex w-full flex-col items-start gap-[8px] py-[16px]">
        <div className="flex h-[40px] w-[375px] items-center justify-center">
          <p className="w-[328px] text-center text-[12px] leading-[16px]">
            <span className="text-[#757575]">By continuing, you agree to the </span>
            <span className="text-fill-active font-semibold">Terms &amp; Conditions</span>
            <span className="text-[#757575]"> and </span>
            <span className="text-fill-active font-bold">Privacy Policy</span>
          </p>
        </div>
        <div className="flex w-full items-start px-[16px]">
          <Button onClick={() => go("fr-ready")}>{copy.primaryCta}</Button>
        </div>
      </div>

      <TransparentNavbar className="absolute top-0 left-0" onBack={() => go("ektp-review")} />
    </Screen>
  );
}
