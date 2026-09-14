import type { ProficiencyLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<ProficiencyLevel, string> = {
  Beginner: "bg-muted text-muted-foreground ring-border",
  Intermediate: "bg-info/10 text-info ring-info/20",
  Advanced: "bg-primary-soft text-primary ring-primary/20",
  Expert: "bg-success/10 text-success ring-success/20",
};

interface SkillBadgeProps {
  level: ProficiencyLevel;
  size?: "sm" | "md";
  className?: string;
}

export function SkillBadge({ level, size = "sm", className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium ring-1 ring-inset",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        styles[level],
        className,
      )}
    >
      {level}
    </span>
  );
}
