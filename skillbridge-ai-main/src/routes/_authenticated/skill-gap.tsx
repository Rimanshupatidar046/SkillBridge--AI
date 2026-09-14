import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowRight, AlertTriangle, Target, CheckCircle2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";

import { PageHeader } from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { StatusBadge } from "@/components/StatusBadge";
import { SkillBadge } from "@/components/SkillBadge";
import { SectionHeader } from "@/components/SectionHeader";
import { demoTargetRoles } from "@/data/studentCoreData";
import { skillService } from "@/services/skillService";
import { levelScore } from "@/data/skills";

export const Route = createFileRoute("/_authenticated/skill-gap")({
  head: () => ({
    meta: [
      { title: "Skill Gap Analysis — SkillBridge AI" },
      { name: "description", content: "Compare your skills against role benchmarks and prioritise what to close first." },
      { property: "og:title", content: "Skill Gap Analysis — SkillBridge AI" },
      { property: "og:description", content: "Compare your skills against role benchmarks." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SkillGapPage,
});

function SkillGapPage() {
  const [roleId, setRoleId] = useState(demoTargetRoles[0]!.id);
  const mySkills = skillService.getSkills();

  const role = useMemo(() => demoTargetRoles.find((r) => r.id === roleId)!, [roleId]);

  const gapAnalysis = useMemo(() => {
    return role.skills.map((reqSkill) => {
      const mySkill = mySkills.find((s) => s.name.toLowerCase() === reqSkill.name.toLowerCase());
      const currentLevel = mySkill?.current || "Beginner";
      const currentScore = levelScore[currentLevel] || 25;
      const targetScore = levelScore[reqSkill.target] || 75;
      
      const gapValue = Math.max(0, targetScore - currentScore);
      let gapStatus: "success" | "warning" | "destructive" = "success";
      if (gapValue > 0) gapStatus = gapValue > 25 ? "destructive" : "warning";

      return {
        name: reqSkill.name,
        current: currentLevel,
        target: reqSkill.target,
        gapValue,
        gapStatus,
        priority: reqSkill.priority,
        currentScore,
        targetScore,
      };
    });
  }, [role, mySkills]);

  const readinessScore = useMemo(() => {
    const total = gapAnalysis.reduce((acc, g) => acc + Math.min(1, g.currentScore / g.targetScore), 0);
    return Math.round((total / gapAnalysis.length) * 100);
  }, [gapAnalysis]);

  const chartData = gapAnalysis.map((g) => ({
    name: g.name.length > 12 ? g.name.substring(0, 10) + "..." : g.name,
    Current: g.currentScore,
    Required: g.targetScore,
  }));

  const openGaps = gapAnalysis.filter((g) => g.gapValue > 0);
  openGaps.sort((a, b) => b.gapValue - a.gapValue);

  return (
    <>
      <PageHeader
        eyebrow="Student Intelligence"
        title="Skill Gap Analysis"
        description="Compare your current proficiency against industry requirements for your target role."
        actions={
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="h-10 rounded-lg border border-input bg-card px-3 text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
          >
            {demoTargetRoles.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <Target className="w-8 h-8 text-primary mb-3" />
          <h3 className="text-4xl font-bold text-foreground">{readinessScore}%</h3>
          <p className="text-sm font-medium text-foreground mt-1">Role Readiness</p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on {role.skills.length} required skills for {role.name}
          </p>
        </div>
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <SectionHeader title="Proficiency Comparison" />
          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} tickFormatter={(v: number) => ({ 25: "Beg", 50: "Int", 75: "Adv", 100: "Exp" })[v] ?? ""} />
                <RechartsTooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Bar dataKey="Required" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Current" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border p-6 flex justify-between items-center bg-muted/20">
          <div>
            <h2 className="text-lg font-bold text-foreground">Priority Gaps to Close</h2>
            <p className="text-sm text-muted-foreground mt-1">Focus on high priority skills with large gaps first.</p>
          </div>
          <Link
            to="/learning-path"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Generate Learning Path <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="divide-y divide-border">
          {openGaps.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
              <p>You have no skill gaps for this role! You are industry-ready.</p>
            </div>
          ) : (
            openGaps.map((gap, i) => (
              <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-foreground">{gap.name}</h4>
                    {gap.priority === "High" && <StatusBadge status="critical" label="High Priority" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <span>Current:</span>
                    <SkillBadge level={gap.current} />
                    <span className="mx-2">→</span>
                    <span>Target:</span>
                    <SkillBadge level={gap.target} />
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Gap magnitude</span>
                    {gap.gapStatus === "destructive" ? (
                      <span className="text-destructive font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Large Gap</span>
                    ) : (
                      <span className="text-warning font-medium">Moderate Gap</span>
                    )}
                  </div>
                  <ProgressBar 
                    value={gap.currentScore} 
                    marker={gap.targetScore} 
                    showValue={false} 
                    tone={gap.gapStatus} 
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
