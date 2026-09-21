const A = "/figma";

interface BenefitRow {
  label: string;
  basic: string | "yes" | "no";
  verified: string | "yes" | "no";
}

/** `Benefits` comparison table shown under the pending and failed results. */
const ROWS: BenefitRow[] = [
  { label: "Transfer to bank & e-wallets", basic: "no", verified: "yes" },
  { label: "Send GoPay to friends & family", basic: "no", verified: "yes" },
  { label: "Balance limit", basic: "Rp2 Mil", verified: "Rp20 Mil" },
  { label: "Withdrawal GoPay balance", basic: "3 steps", verified: "1 step" },
  { label: "Pay GoRide & GoFood", basic: "3 steps", verified: "1 step" },
  { label: "Online payment", basic: "yes", verified: "yes" },
  { label: "Buy pulsa & paket data", basic: "yes", verified: "yes" },
  { label: "Pay at resto/supermarket", basic: "yes", verified: "yes" },
];

function Mark({ value }: { value: string }) {
  if (value === "yes" || value === "no") {
    return (
      <img
        alt={value === "yes" ? "Included" : "Not included"}
        className="block size-[16px]"
        src={value === "yes" ? `${A}/ic-correct-16.svg` : `${A}/ic-cross-16.svg`}
      />
    );
  }
  return <span className="text-type-title text-center text-[14px] leading-[20px]">{value}</span>;
}

export function BenefitsTable() {
  return (
    <div className="bg-fill-primary shadow-bevel-top relative w-[343px] overflow-hidden rounded-[20px] px-[16px] py-[8px]">
      {/* The Verified column is highlighted end to end, so it is painted behind the rows. */}
      <div className="pointer-events-none absolute top-[8px] bottom-[8px] right-[8px] w-[82px] rounded-[12px] border border-[#a8dced] bg-[#e8f7fd]" />

      <div className="relative flex items-center py-[12px]">
        <p className="text-type-title min-w-px flex-1 text-[14px] leading-[20px] font-semibold">
          Benefits
        </p>
        <p className="text-type-title w-[64px] text-center text-[14px] leading-[20px] font-semibold">
          Basic
        </p>
        <p className="text-type-title w-[82px] text-center text-[14px] leading-[20px] font-semibold">
          Verified
        </p>
      </div>

      {ROWS.map((row, index) => (
        <div key={row.label} className="relative">
          {index > 0 ? <div className="bg-border-mute h-px w-full" /> : null}
          <div className="flex items-center py-[12px]">
            <p className="text-type-body min-w-px flex-1 pr-[8px] text-[14px] leading-[20px]">
              {row.label}
            </p>
            <div className="flex w-[64px] justify-center">
              <Mark value={row.basic} />
            </div>
            <div className="flex w-[82px] justify-center">
              <Mark value={row.verified} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** The `Supervised by Bank Indonesia` bar pinned under the benefits table. */
export function SupervisedFooter() {
  return (
    <div className="bg-fill-primary shadow-float sticky bottom-0 left-0 flex w-full items-center gap-[8px] px-[16px] py-[12px]">
      <img alt="" className="block size-[16px]" src={`${A}/ic-double-shield-16.svg`} />
      <p className="text-type-green-active min-w-px flex-1 text-[14px] leading-[20px] font-semibold">
        Supervised by Bank Indonesia
      </p>
      <img alt="" className="block size-[16px]" src={`${A}/ic-next-ios-16.svg`} />
    </div>
  );
}
