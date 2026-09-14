import { ClientOnly, Link, createFileRoute } from "@tanstack/react-router";
import gsap from "gsap";
import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  ChevronRight,
  GraduationCap,
  Landmark,
  Map,
  Radar,
  Route as RouteIcon,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";

import { PublicLayout } from "@/layouts/PublicLayout";
import { HeroNetworkFallback } from "@/components/HeroNetworkFallback";

const HeroNetwork3D = lazy(() => import("@/components/HeroNetwork3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillBridge AI — From Industry Signals to Workforce Action" },
      {
        name: "description",
        content:
          "Workforce-intelligence platform connecting industry demand with student skills, curricula, training capacity and district planning. SIH 2026 · SIH26134.",
      },
      {
        property: "og:title",
        content: "SkillBridge AI — From Industry Signals to Workforce Action",
      },
      {
        property: "og:description",
        content:
          "Close skill gaps with evidence-backed intelligence for students, institutions, districts and employers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const flow = [
  {
    icon: TrendingUp,
    title: "Industry signals",
    text: "Job postings, employer inputs and emerging skill trends.",
  },
  {
    icon: Radar,
    title: "Skill intelligence",
    text: "Normalised skill taxonomy with regional demand weights.",
  },
  {
    icon: Sparkles,
    title: "Gap analysis",
    text: "Student, cohort and district gaps against role benchmarks.",
  },
  {
    icon: RouteIcon,
    title: "Workforce action",
    text: "Learning paths, curriculum updates and training plans.",
  },
];

const problems = [
  {
    stat: "51%",
    text: "of Indian graduates are considered employable for industry roles (India Skills Report).",
  },
  {
    stat: "18–24 mo",
    text: "typical lag between a new industry skill demand and its appearance in curricula.",
  },
  {
    stat: "Fragmented",
    text: "student, institution, district and employer data never meet in one decision loop.",
  },
];

const capabilities = [
  {
    icon: UserRound,
    title: "Student Intelligence",
    text: "Readiness scores, verified skills and personalised learning paths.",
  },
  {
    icon: BookOpenCheck,
    title: "Curriculum Intelligence",
    text: "Map syllabi to live industry demand and flag stale modules.",
  },
  {
    icon: TrendingUp,
    title: "Industry Intelligence",
    text: "Extract skill demand from postings and employer signals by region.",
  },
  {
    icon: Building2,
    title: "Training Intelligence",
    text: "Match training capacity and trainers to district-level demand.",
  },
  {
    icon: Map,
    title: "Regional Intelligence",
    text: "District planners model interventions and scheme budgets.",
  },
  {
    icon: BadgeCheck,
    title: "Employer Intelligence",
    text: "Validate candidate skills and close the hiring feedback loop.",
  },
];

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    text: "Know exactly which skills to build next, and prove them with evidence.",
  },
  {
    icon: Landmark,
    title: "Institutions & TPOs",
    text: "Keep curricula aligned and cohorts placement-ready.",
  },
  {
    icon: Map,
    title: "District & Policymakers",
    text: "Direct training budgets where demand is actually rising.",
  },
  {
    icon: Building2,
    title: "Employers",
    text: "Hire from verified talent pools and shape the skills pipeline.",
  },
];

function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!pageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(pageRef.current.querySelectorAll<HTMLElement>(".gsap-zoom"));
    const cleanups = cards.map((card) => {
      const enter = () =>
        gsap.to(card, { scale: 1.035, y: -4, duration: 0.28, ease: "power2.out" });
      const leave = () => gsap.to(card, { scale: 1, y: 0, duration: 0.34, ease: "power2.out" });
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      card.addEventListener("focusin", enter);
      card.addEventListener("focusout", leave);
      return () => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
        card.removeEventListener("focusin", enter);
        card.removeEventListener("focusout", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <PublicLayout>
      <div ref={pageRef}>
        {/* Hero */}
        <section className="relative min-h-[680px] overflow-hidden sm:min-h-[720px] lg:min-h-[660px]">
          <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
          <div className="hero-network-mask pointer-events-none absolute inset-x-0 top-24 h-[390px] opacity-25 sm:top-16 sm:h-[450px] sm:opacity-40 lg:inset-y-0 lg:left-[38%] lg:h-auto lg:opacity-100">
            <ClientOnly fallback={<HeroNetworkFallback />}>
              <Suspense fallback={<HeroNetworkFallback />}>
                <HeroNetwork3D />
              </Suspense>
            </ClientOnly>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                Smart India Hackathon 2026 · SIH26134
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                From Industry Signals to <span className="text-primary">Workforce Action</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                SkillBridge AI connects what employers need with what students learn, what
                institutions teach and what districts fund — one intelligence loop, four
                decision-makers.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elevated transition-colors hover:bg-primary/90"
                >
                  Get started free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Try a demo account <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Process flow */}
            <ol className="mx-auto mt-20 grid max-w-5xl gap-4 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
              {flow.map((step, i) => (
                <li
                  key={step.title}
                  className="gsap-zoom surface-card relative will-change-transform p-5"
                >
                  {i < flow.length - 1 && (
                    <ChevronRight
                      className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/50 lg:block"
                      aria-hidden
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-t border-border bg-card scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  The problem
                </p>
                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  The skills pipeline runs on lagging, disconnected data
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Students guess what to learn, institutions revise curricula on multi-year cycles,
                  districts plan training from outdated surveys and employers re-screen the same
                  candidates. Nobody sees the whole loop.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {problems.map((p) => (
                  <div
                    key={p.stat}
                    className="gsap-zoom rounded-xl border border-border bg-background p-5 will-change-transform"
                  >
                    <p className="font-display text-3xl font-bold text-primary">{p.stat}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" className="scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our solution
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                One shared intelligence layer for every workforce decision
              </h2>
              <p className="mt-4 text-muted-foreground">
                SkillBridge AI ingests live industry signals, normalises them into a skill taxonomy
                and pushes role-specific actions to each stakeholder — continuously, not annually.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Sense",
                  text: "Continuously extract skills and demand weights from postings, employer surveys and hiring outcomes.",
                },
                {
                  title: "Analyse",
                  text: "Benchmark students, cohorts, curricula and districts against role-level requirements.",
                },
                {
                  title: "Act",
                  text: "Generate learning paths, curriculum revisions, training capacity plans and validation requests.",
                },
              ].map((s, i) => (
                <div key={s.title} className="gsap-zoom surface-card p-6 will-change-transform">
                  <span className="text-xs font-bold text-muted-foreground">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="border-t border-border bg-card scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Core capabilities
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-bold text-foreground">
              Six intelligence modules, one platform
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c) => (
                <div
                  key={c.title}
                  className="gsap-zoom flex gap-4 rounded-xl border border-border bg-background p-5 transition-colors will-change-transform hover:border-primary/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section id="audiences" className="scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Who it helps
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-bold text-foreground">
              Built for the four decision-makers in the skills loop
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((a) => (
                <div key={a.title} className="gsap-zoom surface-card p-6 will-change-transform">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-primary/20 bg-primary-soft px-6 py-10 text-center sm:px-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                See your readiness in under a minute
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Explore the student dashboard, skills tracker and profile with a one-click demo
                account.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Try demo account <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
