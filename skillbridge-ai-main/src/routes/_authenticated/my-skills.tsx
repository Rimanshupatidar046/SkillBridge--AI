import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Minus, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { DataTable, type Column } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { SkillBadge } from "@/components/SkillBadge";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { PROFICIENCY_LEVELS, levelScore, skillGap } from "@/data/skills";
import { formatDate } from "@/lib/format";
import type { ProficiencyLevel, Skill } from "@/lib/types";
import { skillService } from "@/services/skillService";

export const Route = createFileRoute("/_authenticated/my-skills")({
  head: () => ({
    meta: [
      { title: "My Skills — SkillBridge AI" },
      {
        name: "description",
        content: "Track current vs target proficiency, evidence and skill gaps.",
      },
      { property: "og:title", content: "My Skills — SkillBridge AI" },
      { property: "og:description", content: "Your skill inventory and gaps." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MySkillsPage,
});

const trendIcon = { rising: ArrowUpRight, stable: Minus, declining: ArrowDownRight } as const;

function MySkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setSkills(skillService.getSkills());
  }, []);

  const update = (id: string, level: ProficiencyLevel) => {
    setSkills(skillService.updateProficiency(id, level));
    toast.success("Proficiency updated", {
      description: "Saved locally. Verify it with an assessment in Part 2.",
    });
  };

  const reset = () => {
    setSkills(skillService.resetSkills());
    toast.info("Skills reset to assessed values");
  };

  const gaps = skills.filter((s) => skillGap(s) > 0);
  const readiness = skillService.readinessScore(skills);

  const columns: Column<Skill>[] = [
    {
      key: "skill",
      header: "Skill",
      render: (s) => (
        <div>
          <p className="font-semibold text-foreground">{s.name}</p>
          <p className="text-xs text-muted-foreground">{s.category}</p>
        </div>
      ),
    },
    {
      key: "current",
      header: "Current",
      render: (s) => (
        <select
          aria-label={`Current proficiency for ${s.name}`}
          value={s.current}
          onChange={(e) => update(s.id, e.target.value as ProficiencyLevel)}
          className="h-9 rounded-lg border border-input bg-card px-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
        >
          {PROFICIENCY_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      ),
    },
    { key: "target", header: "Target", render: (s) => <SkillBadge level={s.target} /> },
    {
      key: "progress",
      header: "Progress to target",
      className: "min-w-[180px]",
      render: (s) => {
        const gap = skillGap(s);
        return (
          <ProgressBar
            value={levelScore[s.current]}
            marker={levelScore[s.target]}
            size="sm"
            showValue={false}
            tone={gap === 0 ? "success" : gap === 1 ? "warning" : "destructive"}
          />
        );
      },
    },
    {
      key: "gap",
      header: "Gap",
      render: (s) => {
        const gap = skillGap(s);
        return gap === 0 ? (
          <StatusBadge status="success" label="On target" />
        ) : (
          <StatusBadge
            status={gap >= 2 ? "critical" : "high"}
            label={`${gap} level${gap > 1 ? "s" : ""}`}
          />
        );
      },
    },
    {
      key: "demand",
      header: "Demand",
      render: (s) => {
        const Icon = trendIcon[s.demandTrend];
        return (
          <span className="inline-flex items-center gap-1 text-xs capitalize text-muted-foreground">
            <Icon
              className={s.demandTrend === "rising" ? "h-3.5 w-3.5 text-success" : "h-3.5 w-3.5"}
            />
            {s.demandTrend}
          </span>
        );
      },
    },
    {
      key: "evidence",
      header: "Evidence",
      className: "max-w-xs",
      render: (s) => (
        <ul className="space-y-0.5 text-xs text-muted-foreground">
          {s.evidence.map((e) => (
            <li key={e} className="truncate">
              • {e}
            </li>
          ))}
          <li className="text-[11px] text-muted-foreground/70">
            Assessed {formatDate(s.lastAssessed)}
          </li>
        </ul>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (s) => (
        <button
          type="button"
          onClick={() => {
            if (confirm(`Remove ${s.name}?`)) {
              setSkills(skillService.removeSkill(s.id));
              toast.success("Skill removed");
            }
          }}
          className="text-xs text-destructive hover:underline"
        >
          Remove
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Student intelligence"
        title="My Skills"
        description="Your verified and self-reported proficiency against the Data Analyst role benchmark. Update a level to see your readiness change."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              type="button"
              onClick={() => {
                const name = prompt("Enter skill name:");
                if (!name) return;
                const newSkill: Skill = {
                  id: `custom-${Date.now()}`,
                  name,
                  category: "Custom",
                  current: "Beginner",
                  target: "Intermediate",
                  demandTrend: "stable",
                  evidence: ["Self-reported"],
                  lastAssessed: new Date().toISOString(),
                };
                setSkills(skillService.addSkill(newSkill));
                toast.success("Skill added");
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Add Skill
            </button>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Assess Skills
            </Link>
          </div>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Overall readiness"
          value={`${readiness}%`}
          hint="Average progress to target across skills"
        />
        <StatCard
          label="Skills tracked"
          value={String(skills.length)}
          hint={`${skills.length - gaps.length} on target`}
        />
        <StatCard
          label="Open gaps"
          value={String(gaps.length)}
          trend={gaps.length > 2 ? "down" : "up"}
          delta={gaps.filter((s) => skillGap(s) >= 2).length + " critical"}
        />
      </div>

      <DataTable
        columns={columns}
        rows={skills}
        rowKey={(s) => s.id}
        emptyMessage="No skills yet"
      />
    </>
  );
}
