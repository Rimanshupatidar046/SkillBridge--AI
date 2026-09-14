import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingStateProps {
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingState({ label = "Loading…", fullScreen, className }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-muted-foreground",
        fullScreen ? "min-h-screen" : "py-16",
        className,
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
