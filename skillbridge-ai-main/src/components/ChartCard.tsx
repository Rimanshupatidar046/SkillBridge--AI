import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  legend?: { label: string; colorClass: string }[];
}

export function ChartCard({
  title,
  description,
  action,
  children,
  className,
  legend,
}: ChartCardProps) {
  return (
    <section className={cn("surface-card p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md", className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          {legend && (
            <ul className="hidden items-center gap-3 text-xs text-muted-foreground sm:flex">
              {legend.map((l) => (
                <li key={l.label} className="flex items-center gap-1.5">
                  <span className={cn("h-2.5 w-2.5 rounded-sm", l.colorClass)} />
                  {l.label}
                </li>
              ))}
            </ul>
          )}
          {action}
        </div>
      </div>
      {children}
    </section>
  );
}
