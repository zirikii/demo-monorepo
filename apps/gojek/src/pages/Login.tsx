import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "partner@gojek.io", password: "demo1234" },
  });

  const onSubmit = handleSubmit((values) => {
    login(values.email, values.password);
    navigate("/account");
  });

  return (
    <PageLayout title="Sign in — Gojek (Demo)">
      <Container className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-line bg-card p-8 shadow-card">
          <img src="/brand/logo-green.svg" alt="Gojek" className="mb-6 h-7 w-auto" />
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-ink-soft">Sign in to your Partner Hub.</p>

          <div className="mt-5 rounded-xl bg-gojek-tint px-4 py-3 text-sm text-gojek-deep">
            Demo mode — any email and password will sign you in.
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            New to Gojek?{" "}
            <Link to="/signup" className="font-bold text-gojek hover:text-gojek-deep">
              Create an account
            </Link>
          </p>
        </div>
      </Container>
    </PageLayout>
  );
}
