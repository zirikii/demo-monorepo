import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Use at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export function SignupPage() {
  useDocumentTitle("Create account");
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "Alex Reader", email: "reader@example.com", password: "demo123" },
  });

  return (
    <PageLayout ticker={false}>
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
        <div className="rounded-2xl border border-line bg-card p-7 shadow-card">
          <img src="/brand/logo.svg" alt="nine.com.au" className="h-6 w-auto" />
          <h1 className="mt-5 text-2xl font-black text-ink">Create your free Nine account</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Demo mode: your details are stored locally in this browser only.
          </p>
          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit((values) => {
              login(values.email, values.password, values.name);
              navigate("/account");
            })}
          >
            <div>
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wide text-ink-faint">
                Name
              </label>
              <input
                id="name"
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none ring-nine-deep focus:ring-2"
                {...register("name")}
              />
              {errors.name ? <p className="mt-1 text-xs text-live">{errors.name.message}</p> : null}
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-ink-faint">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none ring-nine-deep focus:ring-2"
                {...register("email")}
              />
              {errors.email ? <p className="mt-1 text-xs text-live">{errors.email.message}</p> : null}
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-ink-faint">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none ring-nine-deep focus:ring-2"
                {...register("password")}
              />
              {errors.password ? (
                <p className="mt-1 text-xs text-live">{errors.password.message}</p>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-ink-soft">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-nine-deep hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
