import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle, Clock, PlayCircle, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { demoLearningRoadmap } from "@/data/studentCoreData";

export const Route = createFileRoute("/_authenticated/learning-path")({
  head: () => ({
    meta: [
      { title: "Learning Path — SkillBridge AI" },
      { name: "description", content: "Your personalized, sequenced plan to close skill gaps." },
      { property: "og:title", content: "Learning Path — SkillBridge AI" },
      { property: "og:description", content: "Personalized learning roadmap." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LearningPathPage,
});

function LearningPathPage() {
  const roadmap = demoLearningRoadmap;
  
  // Calculate stats
  const totalItems = roadmap.reduce((acc, phase) => acc + phase.items.length, 0);
  const completedItems = roadmap.reduce((acc, phase) => acc + phase.items.filter(i => i.status === "Completed").length, 0);
  const progressPercent = Math.round((completedItems / totalItems) * 100) || 0;

  return (
    <>
      <PageHeader
        eyebrow="Student Intelligence"
        title="Personalized Learning Path"
        description="A sequenced roadmap tailored to your specific skill gaps for the AI/ML Engineer role."
        actions={
          <Link
            to="/my-skills"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Update My Skills
          </Link>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        
        {/* Sidebar Progress Tracker */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-4">Path Progress</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-foreground">{progressPercent}%</span>
              <span className="text-xs font-medium text-muted-foreground">{completedItems} of {totalItems} completed</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
          
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-4">Phase Overview</h3>
            <ul className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-muted">
              {roadmap.map((phase, idx) => {
                const phaseCompleted = phase.items.every(i => i.status === "Completed");
                const isActive = idx === 0 || roadmap[idx - 1]!.items.every(i => i.status === "Completed");
                
                return (
                  <li key={phase.id} className="relative pl-8">
                    <span className={`absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-card ${phaseCompleted ? "border-success text-success" : isActive ? "border-primary text-primary" : "border-muted text-muted-foreground"}`}>
                      {phaseCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </span>
                    <p className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>Phase {idx + 1}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Main Roadmap */}
        <div className="lg:col-span-3 space-y-6">
          {roadmap.map((phase) => (
            <section key={phase.id} className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="bg-muted/30 border-b border-border p-5">
                <h2 className="text-lg font-bold text-foreground">{phase.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
              </div>
              <div className="p-5 space-y-4">
                {phase.items.map((item) => (
                  <div key={item.id} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border hover:border-primary/40 transition-colors bg-card">
                    
                    <div className="flex gap-4">
                      <div className="mt-1 flex-shrink-0">
                        {item.status === "Completed" ? (
                          <CheckCircle2 className="w-6 h-6 text-success" />
                        ) : item.status === "In Progress" ? (
                          <PlayCircle className="w-6 h-6 text-primary" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status={item.priority === "High" ? "critical" : "warning"} label={item.type} />
                          <span className="text-xs font-semibold text-primary">{item.skillName}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground">{item.topic}</h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span className="font-medium bg-muted px-2 py-0.5 rounded">{item.currentLevel} → {item.targetLevel}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {item.effort}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:text-right">
                      <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors w-full justify-center sm:w-auto">
                        {item.status === "Completed" ? "Review" : item.status === "In Progress" ? "Continue" : "Start"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
