import { useNavigate } from "react-router-dom";
import { Phone, PrimaryButton, StatusBar } from "@/components/chrome/Chrome";

export function BlockedScreen() {
  const navigate = useNavigate();
  return (
    <Phone>
      <StatusBar />
      <div className="flex flex-1 flex-col justify-end px-5 pb-8">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-gopay-ink">GoPay</p>
        <h2 className="mt-2 font-serif text-[28px] font-semibold leading-9">
          Complete your data update
        </h2>
        <p className="mt-3 text-[14px] leading-5 text-body">
          Your periodic review is overdue. You can still pay with GoPay in other apps. Inside
          GoPay, update your e-KTP to continue.
        </p>
        <PrimaryButton className="mt-6" onClick={() => navigate("/review")}>
          Update e-KTP data
        </PrimaryButton>
      </div>
    </Phone>
  );
}
