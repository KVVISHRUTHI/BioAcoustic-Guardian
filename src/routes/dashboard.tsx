import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Command Center — BioAcoustic Guardian" },
      { name: "description", content: "Tactical AI command center for forest surveillance and biodiversity intelligence." },
    ],
  }),
  component: DashboardLayout,
});
