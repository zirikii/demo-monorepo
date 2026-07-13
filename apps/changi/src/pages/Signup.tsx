import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "Alex Traveller", email: "traveller@example.com", password: "demo" },
  });

  return (
    <PageLayout>
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
        <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
          <img src="/brand/logo.svg" alt="" className="h-8 w-auto" />
          <h1 className="mt-4 text-2xl font-black text-ink-deep">Create a Changi Account</h1>
          <p className="mt-1 text-sm text-ink-soft">Demo mode — details stay in your browser only.</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit((values) => {
              login(values.email, values.password, values.name);
              navigate("/account");
            })}
          >
            <div>
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wide text-ink-faint">
                Full name
              </label>
              <input
                id="name"
                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2"
                {...register("name")}
              />
              {errors.name ? <p className="mt-1 text-xs text-danger">{errors.name.message}</p> : null}
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-ink-faint">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2"
                {...register("email")}
              />
              {errors.email ? <p className="mt-1 text-xs text-danger">{errors.email.message}</p> : null}
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-ink-faint">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2"
                {...register("password")}
              />
              {errors.password ? <p className="mt-1 text-xs text-danger">{errors.password.message}</p> : null}
            </div>
            <Button type="submit" variant="purple" className="w-full">
              Sign up
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-ink-soft">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-purple hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
