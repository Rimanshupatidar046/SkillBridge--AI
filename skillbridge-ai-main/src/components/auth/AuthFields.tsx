import { Loader2 } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { useAuth } from "@/context/AuthContext";
import { roleMeta, roleOrder } from "@/data/demoUsers";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | undefined;
  hint?: ReactNode;
}

export function Field({ label, error, hint, id, className, ...props }: FieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {hint}
      </div>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40",
          error ? "border-destructive" : "border-input focus:border-primary",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      {message}
    </p>
  );
}

export function RoleSelector({ value, onChange }: { value: Role; onChange: (r: Role) => void }) {
  return (
    <div role="radiogroup" aria-label="Account type" className="grid grid-cols-2 gap-2">
      {roleOrder.map((role) => {
        const active = value === role;
        return (
          <button
            key={role}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(role)}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
              active
                ? "border-primary bg-primary-soft text-primary"
                : "border-input bg-card text-foreground hover:bg-muted",
            )}
          >
            <span className="block font-semibold">{roleMeta[role].label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function DemoAccounts({ onDone }: { onDone: () => void }) {
  const { loginAsDemo } = useAuth();
  const [busy, setBusy] = useStateSafe<Role | null>(null);

  const handle = async (role: Role) => {
    setBusy(role);
    try {
      await loginAsDemo(role);
      onDone();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Try demo account
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {roleOrder.map((role) => (
          <button
            key={role}
            type="button"
            disabled={busy !== null}
            onClick={() => handle(role)}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary-soft/40 disabled:opacity-60"
          >
            {roleMeta[role].label}
            {busy === role && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Demo password for all accounts:{" "}
        <code className="rounded bg-muted px-1 py-0.5">demo1234</code>
      </p>
    </div>
  );
}

import { useState } from "react";
function useStateSafe<T>(initial: T) {
  return useState<T>(initial);
}
