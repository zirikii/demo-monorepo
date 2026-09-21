import { useState } from "react";
import { Screen } from "@/components/system/PhoneFrame";
import { StatusBar } from "@/components/system/StatusBar";
import { Button } from "@/components/ui/Button";
import { PlainDivider } from "@/components/ui/Card";
import { useRekyc } from "@/hooks/useRekyc";
import { cn } from "@/lib/cn";

const A = "/figma";

export const INCOME_OPTIONS = [
  "Business",
  "Salary",
  "Pension Fund",
  "Spouse",
  "Inheritance",
] as const;

export const PURPOSE_OPTIONS = [
  "Purchase of merchandise and services",
  "Bill payment",
  "Top up",
  "Fund transfer",
  "Donation",
] as const;

function EddNavbar({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-fill-quaternary sticky top-0 z-10 flex w-full flex-col gap-[8px] pb-[8px]">
      <StatusBar variant="light" />
      <div className="flex w-full items-center gap-[24px] px-[16px]">
        <div className="flex min-w-px flex-1 items-center gap-[8px]">
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="size-[24px] shrink-0 cursor-pointer"
          >
            <img alt="" className="block size-full" src={`${A}/ic-back.svg`} />
          </button>
          <img alt="GoPay Plus" className="block h-[24px] w-[79px]" src={`${A}/logo-gopay-plus.svg`} />
        </div>
      </div>
    </div>
  );
}

function StepNode({ index, active }: { index: number; active: boolean }) {
  return (
    <div className="relative size-[20px]">
      <img alt="" className="absolute inset-0 block size-full" src={`${A}/edd-stepper-node-ring.svg`} />
      <span
        className={cn(
          "light-sheen shadow-float absolute top-[2px] left-[2px] flex size-[16px] items-center justify-center rounded-[8px] text-center text-[12px] leading-[16px] font-semibold",
          active ? "bg-fill-active text-type-static-white" : "bg-fill-mute text-type-inactive",
        )}
      >
        {index}
      </span>
    </div>
  );
}

/** The two-step header the EDD questions share (PRD 4.2 — EDD for high-risk profiles). */
function EddHeader({ step }: { step: 1 | 2 }) {
  return (
    <div className="bg-fill-primary shadow-bevel-top relative flex w-[343px] flex-col items-start gap-[20px] rounded-[20px] p-[16px]">
      <div className="flex w-full flex-col items-start gap-[8px]">
        <p className="type-title-large text-type-title w-full">
          Answer these questions to continue your upgrade
        </p>
        <p className="text-type-body w-full text-[16px] leading-[20px]">
          Per BI regulation, please answer the questions to continue verification
        </p>
      </div>

      <div className="border-border-mute bg-fill-secondary flex w-full flex-col items-center justify-center gap-[2px] rounded-[16px] border py-[16px] drop-shadow-[0_2px_0.5px_rgba(255,255,255,0.7)]">
        <div className="flex w-full flex-col items-start px-[32px] py-[12px]">
          <div className="bg-fill-quaternary relative flex h-[8px] w-full items-center rounded-[38px] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.04)]">
            <div className="absolute top-1/2 left-1/2 flex w-[247px] -translate-x-1/2 -translate-y-1/2 items-center justify-between">
              <StepNode index={1} active />
              <StepNode index={2} active={step === 2} />
            </div>
          </div>
        </div>

        <div className="flex w-full items-start justify-center">
          <div className="flex flex-col items-center justify-center gap-[4px]">
            <img alt="" className="block size-[40px]" src={`${A}/minispot-price.svg`} />
            <p className="text-type-title w-[84px] text-center text-[12px] leading-[16px] font-semibold">
              Source of income
            </p>
          </div>
          <div className="min-w-px flex-1" />
          <div className="flex flex-col items-center justify-center gap-[4px]">
            <img alt="" className="block size-[40px]" src={`${A}/minispot-document.svg`} />
            <p className="text-type-title w-[84px] text-center text-[12px] leading-[16px] font-semibold">
              Upgrade Purpose
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioList({
  question,
  options,
  value,
  onChange,
}: {
  question: string;
  options: readonly string[];
  value: string | null;
  onChange: (option: string) => void;
}) {
  return (
    <div className="bg-fill-primary shadow-bevel-top relative flex w-[343px] flex-col items-center rounded-[20px] pb-[8px]">
      <div className="flex w-full items-center px-[16px] pt-[16px] pb-[8px]">
        <p className="text-type-title text-[16px] leading-[20px] font-semibold">{question}</p>
      </div>
      {options.map((option, index) => (
        <div key={option} className="w-full">
          {index > 0 ? <PlainDivider /> : null}
          <button
            type="button"
            onClick={() => onChange(option)}
            className="flex w-full cursor-pointer items-center gap-[12px] px-[16px] py-[16px] text-left"
          >
            <span className="flex shrink-0 items-center justify-center p-[2px]">
              <img
                alt=""
                className="block size-[20px]"
                src={value === option ? `${A}/radio-selected.svg` : `${A}/radio-unselected.svg`}
              />
            </span>
            <span className="text-type-title min-w-px flex-1 text-[16px] leading-[20px]">
              {option}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

export function EddIncome() {
  const { go, eddAnswers, answerEdd } = useRekyc();
  const [selected, setSelected] = useState<string | null>(eddAnswers.sourceOfIncome ?? null);

  return (
    <Screen>
      <EddNavbar onBack={() => go("vac")} />
      <div className="flex w-full flex-col items-center gap-[16px] pb-[112px]">
        <EddHeader step={1} />
        <RadioList
          question="What is your source of income?"
          options={INCOME_OPTIONS}
          value={selected}
          onChange={setSelected}
        />
      </div>

      <div className="bg-fill-primary shadow-bevel-top sticky bottom-0 w-full rounded-t-[16px] p-[16px]">
        <Button
          disabled={selected === null}
          onClick={() => {
            if (selected === null) return;
            answerEdd({ sourceOfIncome: selected });
            go("edd-purpose");
          }}
        >
          Continue
        </Button>
      </div>
    </Screen>
  );
}

export function EddPurpose() {
  const { go, eddAnswers, answerEdd, submitCapture } = useRekyc();
  const [selected, setSelected] = useState<string | null>(eddAnswers.upgradePurpose ?? null);

  return (
    <Screen>
      <EddNavbar onBack={() => go("edd-income")} />
      <div className="flex w-full flex-col items-center gap-[16px] pb-[112px]">
        <EddHeader step={2} />
        <RadioList
          question="What is purpose of upgrading?"
          options={PURPOSE_OPTIONS}
          value={selected}
          onChange={setSelected}
        />
      </div>

      <div className="bg-fill-primary shadow-bevel-top sticky bottom-0 w-full rounded-t-[16px] p-[16px]">
        <Button
          disabled={selected === null || !eddAnswers.sourceOfIncome}
          onClick={() => {
            if (selected === null || !eddAnswers.sourceOfIncome) return;
            answerEdd({ upgradePurpose: selected });
            submitCapture({
              sourceOfIncome: eddAnswers.sourceOfIncome,
              upgradePurpose: selected,
            });
            go("result-uploading");
          }}
        >
          Continue
        </Button>
      </div>
    </Screen>
  );
}
