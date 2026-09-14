import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  as?: "h2" | "h3";
}

export function SectionHeader({ title, description, action, as = "h2" }: SectionHeaderProps) {
  const Tag = as;
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <Tag className="text-base font-semibold text-foreground">{title}</Tag>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
