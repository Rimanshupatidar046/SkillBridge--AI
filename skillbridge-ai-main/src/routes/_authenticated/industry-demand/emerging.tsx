import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";

import { ComingSoon } from "@/components/ComingSoon";
import { industryDemandService } from "@/services/stubs";

export const Route = createFileRoute("/_authenticated/industry-demand/emerging")({
  head: () => ({
    meta: [
      { title: "Emerging Skills — SkillBridge AI" },
      {
        name: "description",
        content: "Early radar for skills gaining momentum before they hit mainstream postings.",
      },
      { property: "og:title", content: "Emerging Skills — SkillBridge AI" },
      {
        property: "og:description",
        content: "Early radar for skills gaining momentum before they hit mainstream postings.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Industry intelligence"
      title="Emerging Skills"
      description="Early radar for skills gaining momentum before they hit mainstream postings."
      status={industryDemandService.status()}
      icon={Radar}
    />
  ),
});
