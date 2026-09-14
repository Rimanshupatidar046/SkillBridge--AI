import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";

import { Field, FormError, SubmitButton } from "@/components/auth/AuthFields";
import { authService } from "@/services/authService";

export const Route = createFileRoute("/_auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — SkillBridge AI" },
      {
        name: "description",
        content: "Request a password reset link for your SkillBridge AI account.",
      },
      { property: "og:title", content: "Reset password — SkillBridge AI" },
      { property: "og:description", content: "Recover access to your account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const parsed = z.string().email("Enter a valid email address").safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message);
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      await authService.requestPasswordReset(parsed.data);
      setSent(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success">
          <MailCheck className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-foreground">Check your inbox</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          If an account exists for <span className="font-medium text-foreground">{email}</span>, a
          reset link is on its way. (Demo mode: no email is actually sent.)
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Forgot your password?</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your email and we'll send you a reset link.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        <FormError message={formError} />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@college.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <SubmitButton loading={loading}>Send reset link</SubmitButton>
      </form>
      <Link
        to="/login"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </div>
  );
}
