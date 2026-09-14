import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";

import { ComingSoon } from "@/components/ComingSoon";
import { employerService } from "@/services/stubs";

export const Route = createFileRoute("/_authenticated/employer-validation")({
  head: () => ({
    meta: [
      { title: "Employer Validation — SkillBridge AI" },
      {
        name: "description",
        content: "Verify candidate skills and feed hiring outcomes back into the loop.",
      },
      { property: "og:title", content: "Employer Validation — SkillBridge AI" },
      {
        property: "og:description",
        content: "Verify candidate skills and feed hiring outcomes back into the loop.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Employer intelligence"
      title="Employer Validation"
      description="Verify candidate skills and feed hiring outcomes back into the loop."
      status={employerService.status()}
      icon={BadgeCheck}
    />
  ),
});
