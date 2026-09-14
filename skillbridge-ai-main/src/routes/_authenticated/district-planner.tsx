import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";

import { ComingSoon } from "@/components/ComingSoon";
import { districtService } from "@/services/stubs";

export const Route = createFileRoute("/_authenticated/district-planner")({
  head: () => ({
    meta: [
      { title: "District Planner — SkillBridge AI" },
      {
        name: "description",
        content: "Model interventions and allocate scheme budgets where demand is rising.",
      },
      { property: "og:title", content: "District Planner — SkillBridge AI" },
      {
        property: "og:description",
        content: "Model interventions and allocate scheme budgets where demand is rising.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Regional intelligence"
      title="District Planner"
      description="Model interventions and allocate scheme budgets where demand is rising."
      status={districtService.status()}
      icon={Map}
    />
  ),
});
