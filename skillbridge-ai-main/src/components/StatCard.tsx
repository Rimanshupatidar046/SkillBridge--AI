import { ArrowDownRight, ArrowUpRight, Minus, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  hint?: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  label,
  value,
  delta,
  trend = "neutral",
  hint,
  icon: Icon,
  className,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  return (
    <div className={cn("surface-card p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <Icon className="h-4.5 w-4.5" />
          </span>
        )}
      </div>
      <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
              trend === "up" && "bg-success/10 text-success",
              trend === "down" && "bg-destructive/10 text-destructive",
              trend === "neutral" && "bg-muted text-muted-foreground",
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {delta}
          </span>
        )}
        {hint && <span className="truncate text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}
