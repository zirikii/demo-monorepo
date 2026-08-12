import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { CheckList } from "@/components/marketing/CheckList";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

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
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Alex Nguyen",
      company: "Harbourline Hospitality Group",
      email: "alex.nguyen@harbourline.demo",
      password: "heroes2026",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const session = signUp(values);
    navigate(session.landing, { replace: true });
  });

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="flex items-center justify-center bg-white px-6 py-14">
        <div className="w-full max-w-md">
          <Link to="/" className="focus-eh mb-10 inline-flex">
            <BrandLogo />
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight text-ink-strong">
            Start your 14-day trial
          </h1>
          <p className="mt-2 text-[0.98rem] text-ink-soft">
            No credit card required. Set up your business in an afternoon.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
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

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating your account…" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-ink-soft">
            Already have an account?{" "}
            <Link to="/login" className="focus-eh font-semibold text-eh-purple hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-col justify-center gap-8 bg-eh-purple-deep p-12 text-white lg:flex">
        <h2 className="text-balance-eh text-4xl font-extrabold tracking-tight">
          What you get on day one
        </h2>
        <CheckList
          tone="dark"
          items={[
            "Compliant employment contracts and paperless onboarding",
            "Leave, records and policy acknowledgement in one place",
            "The Employment Hero Work app for your whole team",
            "SmartMatch access to 2.3 million candidates",
            "Guided setup from an implementation specialist",
          ]}
        />
        <p className="text-sm text-eh-violet-soft">
          Unofficial demo build. No real account is created and nothing leaves your browser.
        </p>
      </div>
    </div>
  );
}
