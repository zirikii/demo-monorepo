"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
});
type SignupValues = z.infer<typeof schema>;
export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignupValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Ari Santos",
      email: "ari@example.com",
      company: "Harbour Retail Group",
    },
  });
  async function onSubmit(values: SignupValues) {
    setError(null);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      setError("Unable to create the demo user.");
      return;
    }
    router.push("/overview");
    router.refresh();
  }
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register("name")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" type="email" {...form.register("email")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" {...form.register("company")} />
      </div>
      {error ? <p className="text-sm text-optus-danger">{error}</p> : null}
      <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Creating demo..." : "Create demo workspace"}
      </Button>
    </form>
  );
}
