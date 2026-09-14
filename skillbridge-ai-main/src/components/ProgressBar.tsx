import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md";
  tone?: "primary" | "success" | "warning" | "destructive" | "info";
  /** Optional marker (0-100) e.g. required level. */
  marker?: number;
  className?: string;
}

const tones = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-info",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = "md",
  tone = "primary",
  marker,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showValue && (
            <span className="tabular-nums text-muted-foreground">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted",
          size === "sm" ? "h-1.5" : "h-2.5",
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", tones[tone])}
          style={{ width: `${pct}%` }}
        />
        {typeof marker === "number" && (
          <span
            className="absolute top-0 h-full w-0.5 bg-foreground/50"
            style={{ left: `calc(${Math.min(100, marker)}% - 1px)` }}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
