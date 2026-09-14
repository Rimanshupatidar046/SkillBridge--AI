import { ArrowRight, Clock3 } from "lucide-react";

import { StatusBadge } from "@/components/StatusBadge";
import type { Priority } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  description: string;
  priority: Priority;
  effort: string;
  tag?: string | undefined;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function ActionCard({
  title,
  description,
  priority,
  effort,
  tag,
  onAction,
  actionLabel = "Start",
  className,
}: ActionCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/40 hover:bg-primary-soft/30",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <StatusBadge status={priority} />
        {tag && (
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {tag}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5" />
          {effort}
        </span>
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          {actionLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
