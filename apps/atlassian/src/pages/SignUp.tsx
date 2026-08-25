import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { DISCLAIMER } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const TRIAL_PERKS = [
  "Jira boards, backlog, and work items",
  "Confluence as the shared knowledge workspace",
  "Rovo agents, search, and chat",
  "A 14-day Cloud trial — no credit card",
] as const;

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  company: z.string().min(2, "Enter your business name"),
  email: z.string().min(1, "Enter your work email").email("Enter a valid work email"),
  password: z.string().min(6, "Use at least 6 characters"),
});

type SignUpValues = z.infer<typeof schema>;

export default function SignUpPage() {
  useDocumentTitle("Create an account");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp } = useAuth();
  const email = searchParams.get("email") || "alex.nguyen@northline.demo";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Alex Nguyen",
      company: "Northline Payments",
      email,
      password: "teamwork2026",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const session = signUp(values);
    navigate(session.landing, { replace: true });
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-tint px-4 py-12">
      <div className="w-full max-w-[400px] rounded-atl bg-white px-8 py-10 shadow-atl-lift">
        <Link to="/" className="focus-atl mx-auto mb-6 flex w-fit">
          <BrandLogo showWordmark={false} markClassName="h-10 w-10" />
        </Link>

        <h1 className="text-center text-[1.375rem] font-semibold tracking-tight text-ink-strong">
          Start your 14-day trial
        </h1>
        <p className="mt-1 text-center text-sm text-ink-soft">
          No credit card required. Stand up Jira for your team in an afternoon.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
          <Field label="Full name" htmlFor="name" error={errors.name?.message}>
            <TextInput id="name" autoComplete="name" {...register("name")} />
          </Field>
          <Field label="Business name" htmlFor="company" error={errors.company?.message}>
            <TextInput id="company" autoComplete="organization" {...register("company")} />
          </Field>
          <Field label="Work email" htmlFor="signup-email" error={errors.email?.message}>
            <TextInput id="signup-email" type="email" autoComplete="email" {...register("email")} />
          </Field>
          <Field
            label="Password"
            htmlFor="signup-password"
            error={errors.password?.message}
            hint="At least 6 characters."
          >
            <TextInput
              id="signup-password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />
          </Field>

          <Button
            type="submit"
            size="lg"
            shape="box"
            disabled={isSubmitting}
            className="mt-1 w-full"
          >
            {isSubmitting ? "Creating your account…" : "Create account"}
          </Button>
        </form>

        <ul className="mt-6 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-ink-faint">
          {TRIAL_PERKS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link to="/login" className="focus-atl font-semibold text-atl-blue-deep hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <p className="mt-6 max-w-[400px] text-center text-[11px] leading-relaxed text-ink-faint">
        {DISCLAIMER}
      </p>
    </div>
  );
}
