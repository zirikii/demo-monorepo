import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextField, SelectField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import type { PartnerType } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Use at least 6 characters"),
  partnerType: z.enum(["driver", "merchant", "consumer"]),
  city: z.string().min(2, "Enter your city"),
});

type FormValues = z.infer<typeof schema>;

export function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Dewi Lestari",
      email: "dewi@gojek.io",
      password: "demo1234",
      partnerType: "driver",
      city: "Jakarta",
    },
  });

  const onSubmit = handleSubmit((values) => {
    login(values.email, values.password, {
      name: values.name,
      partnerType: values.partnerType as PartnerType,
      city: values.city,
    });
    navigate("/account");
  });

  return (
    <PageLayout title="Create account — Gojek (Demo)">
      <Container className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-line bg-card p-8 shadow-card">
          <img src="/brand/logo-green.svg" alt="Gojek" className="mb-6 h-7 w-auto" />
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Get started</h1>
          <p className="mt-1 text-sm text-ink-soft">Create your Gojek Partner Hub account.</p>

          <div className="mt-5 rounded-xl bg-gojek-tint px-4 py-3 text-sm text-gojek-deep">
            Demo mode — nothing is stored on a server; your session lives in this browser.
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
            <TextField label="Full name" error={errors.name?.message} {...register("name")} />
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
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="I am a" {...register("partnerType")}>
                <option value="driver">Driver</option>
                <option value="merchant">Merchant</option>
                <option value="consumer">Consumer</option>
              </SelectField>
              <TextField label="City" error={errors.city?.message} {...register("city")} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-gojek hover:text-gojek-deep">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </PageLayout>
  );
}
