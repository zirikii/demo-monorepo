import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { readJson, writeJson } from "@/lib/storage";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Use at least 4 characters"),
});

type FormValues = z.infer<typeof schema>;

export function SignupPage() {
  useDocumentTitle("Sign up");
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "Alex Demo", email: "alex@example.com", password: "demo" },
  });

  return (
    <PageLayout>
      <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-extrabold text-ink">Create a demo profile</h1>
        <p className="mt-2 text-sm text-ink-soft">Saved to localStorage users list — not a real bank account.</p>
        <form
          className="mt-6 space-y-4 rounded-xl border border-line bg-card p-6"
          onSubmit={handleSubmit((values) => {
            const users = readJson<{ email: string; name: string }[]>("commbank-demo-users", []);
            writeJson("commbank-demo-users", [...users.filter((u) => u.email !== values.email), { email: values.email, name: values.name }]);
            login(values.email, values.password, values.name);
            navigate("/netbank");
          })}
        >
          <TextField label="Full name" error={errors.name?.message} {...register("name")} />
          <TextField label="Email" error={errors.email?.message} {...register("email")} />
          <TextField label="Password" type="password" error={errors.password?.message} {...register("password")} />
          <Button type="submit" variant="yellow" className="w-full" disabled={isSubmitting}>
            Sign up & continue
          </Button>
          <p className="text-center text-sm text-ink-soft">
            Already have a session?{" "}
            <Link to="/login" className="font-semibold text-cba-blue hover:underline">
              Log on
            </Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
}
