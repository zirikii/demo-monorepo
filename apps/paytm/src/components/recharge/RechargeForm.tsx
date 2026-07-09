import { useState } from "react";
import { useDisclosure } from "../../hooks/useDisclosure";
import { mobileOperators, telecomCircles } from "../../data/operators";
import { isValidMobile, isValidAmount } from "../../lib/validators";
import { formatInr, formatMobile } from "../../lib/format";
import { TextField } from "../ui/TextField";
import { SelectField } from "../ui/SelectField";
import { RadioPillGroup } from "../ui/RadioPillGroup";
import { Button } from "../ui/Button";
import { SuccessModal } from "../shared/SuccessModal";

interface RechargeFormProps {
  /** Amount pushed in from the plan browser ("" clears). */
  prefillAmount?: string;
}

interface FormErrors {
  mobile?: string;
  operator?: string;
  amount?: string;
}

/** White floating recharge card: Prepaid/Postpaid, number, operator, circle, amount. */
export function RechargeForm({ prefillAmount = "" }: RechargeFormProps) {
  const [mode, setMode] = useState("prepaid");
  const [mobile, setMobile] = useState("");
  const [operator, setOperator] = useState("");
  const [circle, setCircle] = useState(telecomCircles[4]);
  const [amount, setAmount] = useState(prefillAmount);
  const [errors, setErrors] = useState<FormErrors>({});
  const success = useDisclosure();

  // Keep in sync when a plan card is tapped after first render.
  const [lastPrefill, setLastPrefill] = useState(prefillAmount);
  if (prefillAmount !== lastPrefill) {
    setLastPrefill(prefillAmount);
    if (prefillAmount) setAmount(prefillAmount);
  }

  const submit = () => {
    const next: FormErrors = {};
    if (!isValidMobile(mobile)) next.mobile = "Enter a valid 10-digit mobile number";
    if (!operator) next.operator = "Select an operator";
    if (mode === "prepaid" && !isValidAmount(amount))
      next.amount = "Enter an amount between ₹10 and ₹10,000";
    setErrors(next);
    if (Object.keys(next).length === 0) success.open();
  };

  const operatorName = mobileOperators.find((o) => o.id === operator)?.name ?? "";

  return (
    <>
      <form
        aria-label="Recharge or pay mobile bill"
        className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-float"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <h2 className="text-base font-bold text-ink">Recharge or Pay Mobile Bill</h2>
        <RadioPillGroup
          className="mt-4"
          name="recharge-mode"
          legend="Recharge type"
          value={mode}
          onChange={setMode}
          options={[
            { value: "prepaid", label: "Prepaid" },
            { value: "postpaid", label: "Postpaid" },
          ]}
        />
        <div className="mt-5 space-y-5">
          <TextField
            label="Mobile Number"
            placeholder="Enter mobile number"
            inputMode="numeric"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            error={errors.mobile}
          />
          <SelectField
            label="Operator"
            placeholder="Select operator"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            error={errors.operator}
            options={mobileOperators.map((o) => ({ value: o.id, label: o.name }))}
          />
          <SelectField
            label="Circle"
            value={circle}
            onChange={(e) => setCircle(e.target.value)}
            options={telecomCircles.map((c) => ({ value: c, label: c }))}
          />
          {mode === "prepaid" ? (
            <TextField
              label="Amount"
              placeholder="Enter amount or pick a plan"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              error={errors.amount}
              hint="Browse plans on the right to auto-fill"
            />
          ) : (
            <p className="rounded-xl bg-surface px-4 py-3 text-xs text-ink-soft">
              Your latest postpaid bill is fetched from the operator after you proceed. Demo shows
              a sample bill of ₹599.
            </p>
          )}
        </div>
        <Button type="submit" className="mt-6 w-full">
          {mode === "prepaid" ? "Proceed to Recharge" : "Proceed to Pay Bill"}
        </Button>
      </form>

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title={mode === "prepaid" ? "Recharge Successful" : "Bill Payment Successful"}
        lines={[
          { label: "Mobile Number", value: formatMobile(mobile) },
          { label: "Operator", value: `${operatorName} · ${circle}` },
          {
            label: "Amount",
            value: mode === "prepaid" ? formatInr(Number(amount || 0)) : formatInr(599),
          },
        ]}
      />
    </>
  );
}
