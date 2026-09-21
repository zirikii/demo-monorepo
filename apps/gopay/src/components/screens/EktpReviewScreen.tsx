import { useState } from "react";
import { ChevronDown, ChevronUp, IdCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavBar, Phone, PrimaryButton, StatusBar, TextButton } from "@/components/chrome/Chrome";
import { useSession } from "@/hooks/useSession";
import { activeIdentity } from "@/lib/kyc";
import { maskedIdentity } from "@/lib/mask";

const PRIMARY_ROWS = [
  ["nik", "NIK"],
  ["dateOfBirth", "Tgl. Lahir"],
  ["occupation", "Occupation"],
  ["address", "Address"],
  ["maritalStatus", "Marital Status"],
] as const;

const EXTRA_ROWS = [
  ["rtRw", "RT/RW"],
  ["kelurahan", "Kelurahan"],
  ["kecamatan", "Kecamatan"],
  ["religion", "Religion"],
  ["gender", "Jenis Kelamin"],
] as const;

export function EktpReviewScreen() {
  const navigate = useNavigate();
  const { account } = useSession();
  const [expanded, setExpanded] = useState(false);
  const identity = activeIdentity(account);
  const masked = identity ? maskedIdentity(identity) : null;

  return (
    <Phone>
      <StatusBar />
      <NavBar title="Your e-KTP data" onBack={() => navigate("/account")} />
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {masked ? (
          <div className="overflow-hidden rounded-[20px] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
            <div className="flex items-start gap-3 px-4 pb-4 pt-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#e7f6e8] text-gopay">
                <IdCard className="size-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[14px] leading-5 text-body">Full name</span>
                <span className="block text-[14px] font-semibold leading-5">{masked.fullName}</span>
              </span>
            </div>
            <div className="h-2 bg-gradient-to-b from-black/5 to-transparent" />
            <div className="space-y-3 bg-gradient-to-b from-white/40 to-transparent p-4">
              {PRIMARY_ROWS.map(([key, label]) => (
                <Row key={key} label={label} value={masked[key]} />
              ))}
              {expanded
                ? EXTRA_ROWS.map(([key, label]) => (
                    <Row key={key} label={label} value={masked[key]} />
                  ))
                : null}
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 pb-3 text-[14px] font-semibold text-body"
              aria-expanded={expanded}
              onClick={() => setExpanded((open) => !open)}
            >
              {expanded ? "See less data" : "See more data"}
              {expanded ? (
                <ChevronUp className="size-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        ) : (
          <p className="text-[14px] text-body">No approved e-KTP is on file.</p>
        )}
      </div>
      <div className="rounded-t-2xl bg-card p-4 shadow-[inset_0_2px_1px_rgba(255,255,255,0.7)]">
        <PrimaryButton
          onClick={() => navigate("/fr?intent=confirm")}
          disabled={!identity}
        >
          My data is still the same
        </PrimaryButton>
        <TextButton onClick={() => navigate("/fr?intent=update")} disabled={!identity}>
          I need to update my e-KTP data
        </TextButton>
      </div>
    </Phone>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line pb-3 last:border-b-0">
      <div className="flex items-start justify-between gap-3 text-[14px] leading-5">
        <span className="text-body">{label}</span>
        <span className="text-right font-semibold">{value}</span>
      </div>
    </div>
  );
}
