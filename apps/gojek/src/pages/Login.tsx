import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { DEMO_CREDENTIALS, DISCLAIMER } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const schema = z.object({
  email: z.string().min(1, "Enter your email").email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

type Values = z.infer<typeof schema>;

export default function LoginPage() {
  useDocumentTitle("Log in");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/portal";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: DEMO_CREDENTIALS,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-go-bg px-4 py-12">
      <div className="w-full max-w-md rounded-go-lg border border-go-line bg-go-surface p-8">
        <BrandLogo tone="white" />
        <h1 className="mt-8 text-3xl font-semibold">Log in to Gojek Tech</h1>
        <p className="mt-2 text-sm text-go-muted">
          Demo mode: any email and password works. Prefills{" "}
          <code className="text-go-green">{DEMO_CREDENTIALS.email}</code>.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={handleSubmit((values) => {
            login(values.email, values.password);
            navigate(redirect, { replace: true });
          })}
        >
          <Field htmlFor="email" label="Email" error={errors.email?.message}>
            <TextInput id="email" type="email" autoComplete="username" {...register("email")} />
          </Field>
          <Field htmlFor="password" label="Password" error={errors.password?.message}>
            <TextInput id="password" type="password" autoComplete="current-password" {...register("password")} />
          </Field>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Continue
          </Button>
        </form>
        <p className="mt-6 text-sm text-go-muted">
          New here?{" "}
          <Link to="/signup" className="text-go-green hover:underline">
            Create a dummy profile
          </Link>
        </p>
        <p className="mt-6 text-xs text-go-faint">{DISCLAIMER}</p>
      </div>
    </div>
  );
}
