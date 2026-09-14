import { Link } from "@tanstack/react-router";
import { Waypoints } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label="SkillBridge AI home"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-card">
        <Waypoints className="h-4.5 w-4.5" />
      </span>
      {!compact && (
        <span className="font-display text-base font-bold tracking-tight text-foreground">
          SkillBridge <span className="text-primary">AI</span>
        </span>
      )}
    </Link>
  );
}
