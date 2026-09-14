import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";

import { ComingSoon } from "@/components/ComingSoon";
import { trainingService } from "@/services/stubs";

export const Route = createFileRoute("/_authenticated/training-capacity")({
  head: () => ({
    meta: [
      { title: "Training Capacity — SkillBridge AI" },
      {
        name: "description",
        content: "Trainer, seat and infrastructure capacity matched against district demand.",
      },
      { property: "og:title", content: "Training Capacity — SkillBridge AI" },
      {
        property: "og:description",
        content: "Trainer, seat and infrastructure capacity matched against district demand.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Training intelligence"
      title="Training Capacity"
      description="Trainer, seat and infrastructure capacity matched against district demand."
      status={trainingService.status()}
      icon={Building2}
    />
  ),
});
