import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ClipboardCheck,
  Clock,
  Lightbulb,
  Target,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

import { ActionCard } from "@/components/ActionCard";
import { ChartCard } from "@/components/ChartCard";
import { PageHeader } from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillBadge } from "@/components/SkillBadge";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import {
  learningProgress,
  readinessStats,
  recentActivity,
  recommendedActions,
} from "@/data/dashboardData";
import { levelScore, skillGap } from "@/data/skills";
import { relativeTime } from "@/lib/format";
import type { Skill } from "@/lib/types";
import { skillService } from "@/services/skillService";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SkillBridge AI" },
      {
        name: "description",
        content: "Your readiness overview, top skill gaps and recommended actions.",
      },
      { property: "og:title", content: "Dashboard — SkillBridge AI" },
      { property: "og:description", content: "Readiness overview and skill gap intelligence." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const statIcons = {
  readiness: Target,
  assessed: ClipboardCheck,
  gaps: AlertTriangle,
  hours: Clock,
} as const;
const activityIcons = {
  assessment: ClipboardCheck,
  course: BookOpen,
  recommendation: Lightbulb,
  profile: UserRound,
} as const;

function gapStatus(gap: number) {
  return gap >= 2 ? "critical" : gap === 1 ? "high" : "success";
}

function DashboardPage() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setSkills(skillService.getSkills());
  }, []);

  const readiness = skillService.readinessScore(skills);
  const topGaps = skillService.topGaps(skills);
  const chartData = skills.map((s) => ({
    name: s.name
      .replace(" (AWS)", "")
      .replace("Machine Learning", "ML")
      .replace("Business Communication", "Comms")
      .replace("Data Visualization", "Data Viz")
      .replace("Git & Version Control", "Git"),
    Current: levelScore[s.current],
    Required: levelScore[s.target],
  }));

  const firstName = user?.name.split(" ")[0] ?? "there";

  return (
    <>
      <PageHeader
        eyebrow="Student overview"
        title={`Good to see you, ${firstName}`}
        description="Here's where you stand against the Data Analyst benchmark for Madhya Pradesh — and what to do next."
        actions={
          <Link
            to="/my-skills"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Update my skills
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {readinessStats.map((s) => (
          <StatCard
            key={s.id}
            label={s.label}
            value={s.id === "readiness" && skills.length ? `${readiness}%` : s.value}
            delta={s.delta}
            trend={s.trend}
            hint={s.hint}
            icon={statIcons[s.id as keyof typeof statIcons]}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-5">
        <ChartCard
          className="xl:col-span-3"
          title="Skill readiness"
          description="Current proficiency vs. required level for your target role"
          legend={[
            { label: "Current", colorClass: "bg-chart-1" },
            { label: "Required", colorClass: "bg-chart-2" },
          ]}
        >
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                barGap={4}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                  tickFormatter={(v: number) =>
                    ({ 25: "Beg", 50: "Int", 75: "Adv", 100: "Exp" })[v] ?? ""
                  }
                />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid var(--color-border)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="Required" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Current" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <section className="surface-card p-5 xl:col-span-2">
          <SectionHeader
            title="Top skill gaps"
            description="Ranked by distance from required level"
            action={
              <Link to="/skill-gap" className="text-xs font-semibold text-primary hover:underline">
                View all
              </Link>
            }
          />
          <ul className="space-y-3">
            {topGaps.map((s) => {
              const gap = skillGap(s);
              return (
                <li key={s.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">{s.name}</span>
                    <StatusBadge
                      status={gapStatus(gap)}
                      label={`${gap} level${gap > 1 ? "s" : ""} gap`}
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <SkillBadge level={s.current} />
                    <span>→</span>
                    <SkillBadge level={s.target} />
                  </div>
                  <ProgressBar
                    className="mt-3"
                    value={levelScore[s.current]}
                    marker={levelScore[s.target]}
                    showValue={false}
                    size="sm"
                    tone={gap >= 2 ? "destructive" : "warning"}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section className="mt-6">
        <SectionHeader
          title="Recommended actions"
          description="Highest-impact next steps, weighted by regional demand"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommendedActions.map((a) => (
            <ActionCard
              key={a.id}
              title={a.title}
              description={a.description}
              priority={a.priority}
              effort={a.effort}
              tag={skills.find((s) => s.id === a.skillId)?.name}
              onAction={() => toast.info("Learning paths open in Part 2", { description: a.title })}
            />
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-5">
          <SectionHeader
            title="Learning progress"
            description="Active courses linked to your gaps"
            action={
              <Link
                to="/learning-path"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Full path
              </Link>
            }
          />
          <ul className="space-y-4">
            {learningProgress.map((l) => (
              <li key={l.id}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{l.title}</p>
                    <p className="text-xs text-muted-foreground">{l.provider}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {l.progress}%
                  </span>
                </div>
                <ProgressBar
                  value={l.progress}
                  showValue={false}
                  size="sm"
                  tone={l.progress >= 70 ? "success" : "primary"}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card p-5">
          <SectionHeader
            title="Recent activity"
            description="Your latest assessments, courses and updates"
          />
          <ol className="relative space-y-4 border-l border-border pl-5">
            {recentActivity.map((a) => {
              const Icon = activityIcons[a.type] ?? Activity;
              return (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-primary">
                    <Icon className="h-3 w-3" />
                  </span>
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/80">
                    {relativeTime(a.timestamp)}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </>
  );
}
