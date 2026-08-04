import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter a password"),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  useDocumentTitle("Log on to NetBank");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/netbank";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "admin@example.com", password: "demo" },
  });

  return (
    <PageLayout>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ink-faint">NetBank</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink">Log on</h1>
          <p className="mt-3 text-ink-soft">
            Demo mode: any email and password work. Pre-filled credentials are ready to use.
          </p>
          <div className="mt-4 rounded-lg border border-cba-yellow bg-cba-yellow-soft px-4 py-3 text-sm text-ink">
            Unofficial demo — no real authentication. Session stays in this browser’s localStorage.
          </div>
        </div>
        <form
          onSubmit={handleSubmit((values) => {
            login(values.email, values.password);
            navigate(redirect);
          })}
          className="space-y-4 rounded-xl border border-line bg-card p-6 shadow-card"
        >
          <TextField label="Email / client number" error={errors.email?.message} {...register("email")} />
          <TextField
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button type="submit" variant="yellow" className="w-full" disabled={isSubmitting}>
            Log on
          </Button>
          <p className="text-center text-sm text-ink-soft">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-cba-blue hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
}
