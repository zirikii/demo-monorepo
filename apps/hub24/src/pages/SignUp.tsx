import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextInput } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { DemoPortal } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Use at least 4 characters"),
  practice: z.string().min(2, "Enter a practice name"),
  portal: z.enum(["adviser", "investor", "manager"]),
});

type Values = z.infer<typeof schema>;

export default function SignUpPage() {
  useDocumentTitle("Sign up");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { portal: "adviser", name: "", email: "", password: "demo", practice: "" },
  });

  const onSubmit = handleSubmit((values) => {
    const user = signUp({
      name: values.name,
      email: values.email,
      password: values.password,
      practice: values.practice,
      portal: values.portal as DemoPortal,
    });
    navigate(user.landing, { replace: true });
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
      <Link to="/" className="focus-hub w-fit">
        <BrandLogo />
      </Link>
      <h1 className="mt-8 text-2xl font-bold">Create a demo account</h1>
      <p className="mt-2 text-sm text-ink-soft">Any details work. Nothing is sent to HUB24.</p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <TextInput id="name" {...register("name")} />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <TextInput id="email" type="email" {...register("email")} />
        </Field>
        <Field label="Password" htmlFor="password" error={errors.password?.message}>
          <TextInput id="password" type="password" {...register("password")} />
        </Field>
        <Field label="Practice / household" htmlFor="practice" error={errors.practice?.message}>
          <TextInput id="practice" {...register("practice")} />
        </Field>
        <Field label="Portal" htmlFor="portal">
          <Select id="portal" {...register("portal")}>
            <option value="adviser">AdviserHUB</option>
            <option value="investor">InvestorHUB</option>
            <option value="manager">ManagerHUB</option>
          </Select>
        </Field>
        <Button type="submit" disabled={isSubmitting}>
          Create account
        </Button>
      </form>
      <p className="mt-6 text-sm text-ink-soft">
        Already have a session?{" "}
        <Link to="/login" className="font-semibold text-hub-teal hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
