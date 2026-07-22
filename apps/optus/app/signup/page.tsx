import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { OptusLogo } from "@/components/layout/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-optus-page px-4 py-10">
      <Card className="w-full max-w-md shadow-optus">
        <CardHeader className="items-center text-center">
          <Link href="/" aria-label="Home">
            <OptusLogo />
          </Link>
          <CardTitle className="mt-4 text-2xl">Create an Optus demo workspace</CardTitle>
          <p className="text-sm text-optus-muted">
            Signup writes to local JSON and starts a mock session.
          </p>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="mt-5 text-center text-sm text-optus-muted">
            Already have one?{" "}
            <Link href="/login" className="font-bold text-optus-teal">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
