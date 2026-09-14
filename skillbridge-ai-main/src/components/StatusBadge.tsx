import { cn } from "@/lib/utils";

type Status = "critical" | "high" | "medium" | "low" | "success" | "info" | "neutral" | "warning";

const styles: Record<Status, string> = {
  critical: "bg-destructive/10 text-destructive",
  high: "bg-warning/15 text-warning-foreground",
  medium: "bg-info/10 text-info",
  low: "bg-muted text-muted-foreground",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  warning: "bg-warning/15 text-warning-foreground",
  neutral: "bg-muted text-muted-foreground",
};

const dots: Record<Status, string> = {
  critical: "bg-destructive",
  high: "bg-warning",
  medium: "bg-info",
  low: "bg-muted-foreground",
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  neutral: "bg-muted-foreground",
};

interface StatusBadgeProps {
  status: Status;
  label?: string;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ status, label, dot = true, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[status],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dots[status])} />}
      {label ?? status}
    </span>
  );
}
