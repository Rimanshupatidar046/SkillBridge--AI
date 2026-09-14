import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

import { ComingSoon } from "@/components/ComingSoon";
import { industryDemandService } from "@/services/stubs";

export const Route = createFileRoute("/_authenticated/industry-demand/")({
  head: () => ({
    meta: [
      { title: "Industry Demand — SkillBridge AI" },
      {
        name: "description",
        content:
          "Skill demand extracted from job postings and employer signals, by region and role.",
      },
      { property: "og:title", content: "Industry Demand — SkillBridge AI" },
      {
        property: "og:description",
        content:
          "Skill demand extracted from job postings and employer signals, by region and role.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Industry intelligence"
      title="Industry Demand"
      description="Skill demand extracted from job postings and employer signals, by region and role."
      status={industryDemandService.status()}
      icon={TrendingUp}
    />
  ),
});
