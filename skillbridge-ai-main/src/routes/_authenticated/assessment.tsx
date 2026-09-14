import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { demoAssessmentQuestions, demoTargetRoles, type AssessmentQuestion } from "@/data/studentCoreData";

export const Route = createFileRoute("/_authenticated/assessment")({
  head: () => ({
    meta: [
      { title: "Assessment — SkillBridge AI" },
      {
        name: "description",
        content: "Verify your proficiency with adaptive, evidence-backed skill assessments.",
      },
      { property: "og:title", content: "Assessment — SkillBridge AI" },
      { property: "og:description", content: "Verify your proficiency with adaptive, evidence-backed skill assessments." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const [role, setRole] = useState(demoTargetRoles[0]!.id);
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  const questions = demoAssessmentQuestions;

  const currentQ = questions[currentIdx]!;

  const handleSelect = (qId: string, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <>
        <PageHeader
          eyebrow="AI Assessment"
          title="Skill Assessment"
          description="Validate your skills against industry standards. AI will adapt questions based on your responses."
        />
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-6 shadow-sm mt-8 text-center">
          <h2 className="text-xl font-bold text-foreground">Ready to test your knowledge?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Select a target role to tailor the assessment questions.
          </p>
          <div className="my-6">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              {demoTargetRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Start Assessment
          </button>
        </div>
      </>
    );
  }

  if (finished) {
    const score = Object.keys(answers).reduce((acc, qId) => {
      const q = questions.find((x) => x.id === qId);
      if (q && answers[qId] === q.correctAnswer) return acc + 1;
      return acc;
    }, 0);
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <>
        <PageHeader
          eyebrow="Assessment Result"
          title="Your AI Assessment is Complete"
          description="Based on your responses, here is your updated proficiency profile."
        />
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-2xl font-bold text-primary">
                {percentage}%
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Overall Score</h3>
                <p className="text-sm text-muted-foreground">You answered {score} out of {questions.length} correctly.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Strengths</h4>
              <p className="text-sm text-success flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Python, Data Analysis
              </p>
              <h4 className="text-sm font-semibold text-foreground mt-4">Areas to Improve</h4>
              <p className="text-sm text-warning flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Machine Learning Validation, SQL Aggregations
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-bold text-foreground">Next Step</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              Compare your updated skills against your target role to identify specific gaps.
            </p>
            <Link
              to="/skill-gap"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              View Skill Gaps
            </Link>
          </div>
        </div>
      </>
    );
  }

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <ProgressBar value={progress} showValue={false} />
      </div>

      <div className="mx-auto max-w-2xl">
        <h2 className="text-xl font-bold text-foreground mb-6">
          {currentQ.question}
        </h2>
        <div className="space-y-3">
          {currentQ.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(currentQ.id, i)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                answers[currentQ.id] === i
                  ? "border-primary bg-primary-soft text-primary font-medium"
                  : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={answers[currentQ.id] === undefined}
            className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {currentIdx < questions.length - 1 ? "Next Question" : "Submit Assessment"}
          </button>
        </div>
      </div>
    </>
  );
}
