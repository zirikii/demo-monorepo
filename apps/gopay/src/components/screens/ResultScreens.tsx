import { useNavigate } from "react-router-dom";
import { NIK_MISMATCH_COPY } from "@/data/identity";
import { Phone, PrimaryButton, SecondaryButton, StatusBar } from "@/components/chrome/Chrome";

export function MismatchScreen() {
  const navigate = useNavigate();
  return (
    <Result
      title="e-KTP doesn’t match"
      body={NIK_MISMATCH_COPY}
      primary="Resubmit e-KTP"
      onPrimary={() => navigate("/capture")}
      secondary="Back to Account Center"
      onSecondary={() => navigate("/account")}
    />
  );
}

export function PendingScreen() {
  const navigate = useNavigate();
  return (
    <Result
      title="We’re reviewing your e-KTP"
      body="The photo wasn’t clear enough for an automatic check, so it is in the manual review queue. Your current data stays active."
      primary="Back to Account Center"
      onPrimary={() => navigate("/account")}
    />
  );
}

export function RejectedScreen() {
  const navigate = useNavigate();
  return (
    <Result
      title="We couldn’t verify this update"
      body="Dukcapil didn’t confirm the new e-KTP. GoPay Plus is not downgraded, and the data in use is unchanged."
      primary="Back to Account Center"
      onPrimary={() => navigate("/account")}
    />
  );
}

function Result({
  title,
  body,
  primary,
  onPrimary,
  secondary,
  onSecondary,
}: {
  title: string;
  body: string;
  primary: string;
  onPrimary: () => void;
  secondary?: string;
  onSecondary?: () => void;
}) {
  return (
    <Phone>
      <StatusBar />
      <div className="flex flex-1 flex-col justify-end px-4 pb-6">
        <h2 className="font-serif text-[24px] font-semibold leading-9">{title}</h2>
        <p className="mt-2 text-[14px] leading-5 text-body">{body}</p>
        <PrimaryButton className="mt-6" onClick={onPrimary}>
          {primary}
        </PrimaryButton>
        {secondary && onSecondary ? (
          <SecondaryButton className="mt-3" onClick={onSecondary}>
            {secondary}
          </SecondaryButton>
        ) : null}
      </div>
    </Phone>
  );
}
