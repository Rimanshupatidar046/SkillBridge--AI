import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Construction, type LucideIcon } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import type { ModuleStatus } from "@/services/stubs";

interface ComingSoonProps {
  title: string;
  description: string;
  eyebrow: string;
  status: ModuleStatus;
  icon?: LucideIcon;
}

export function ComingSoon({ title, description, eyebrow, status, icon }: ComingSoonProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <EmptyState
        icon={icon ?? Construction}
        title={`Coming in the next module (${status.plannedFor})`}
        description={`${status.module} is scaffolded and wired to this route. The interactive experience ships in ${status.plannedFor}.`}
        action={
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
        }
      >
        <ul className="mt-6 grid w-full max-w-lg gap-2 text-left">
          {status.capabilities.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              {c}
            </li>
          ))}
        </ul>
      </EmptyState>
    </>
  );
}
