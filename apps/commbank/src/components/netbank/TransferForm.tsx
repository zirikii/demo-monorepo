import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoAccounts } from "@/data/accounts";
import { formatAud } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

const schema = z.object({
  fromId: z.string().min(1),
  toPayId: z.string().min(3, "Enter a PayID or account name"),
  amount: z.coerce.number().positive("Enter an amount greater than zero"),
  reference: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function TransferForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromId: demoAccounts[0]?.id ?? "",
      toPayId: "",
      amount: 50,
      reference: "Rent",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 500));
    const from = demoAccounts.find((a) => a.id === values.fromId);
    setSuccess(
      `Demo transfer of ${formatAud(values.amount)} from ${from?.name ?? "account"} to ${values.toPayId} queued.`,
    );
    reset({ ...values, toPayId: "", amount: 50 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4 rounded-xl border border-line bg-card p-5">
      <h1 className="text-2xl font-extrabold text-ink">Transfer</h1>
      <p className="text-sm text-ink-soft">Simulated PayID / account transfer — nothing leaves this browser.</p>

      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold text-ink">From</span>
        <select
          className="w-full rounded-md border border-line bg-card px-3 py-2.5"
          {...register("fromId")}
        >
          {demoAccounts
            .filter((a) => a.type === "everyday" || a.type === "saver")
            .map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({formatAud(a.available)})
              </option>
            ))}
        </select>
      </label>

      <TextField label="PayID or account name" error={errors.toPayId?.message} {...register("toPayId")} />
      <TextField
        label="Amount (AUD)"
        type="number"
        step="0.01"
        error={errors.amount?.message}
        {...register("amount")}
      />
      <TextField label="Reference (optional)" {...register("reference")} />

      {success ? (
        <p role="status" className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-success">
          {success}
        </p>
      ) : null}

      <Button type="submit" variant="yellow" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Transfer"}
      </Button>
    </form>
  );
}
