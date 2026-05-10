import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BioAcoustic Guardian — AI Forest Surveillance" },
      { name: "description", content: "Cinematic AI command center for real-time forest surveillance. Detect chainsaws, gunshots, poachers and biodiversity changes — before they're seen." },
      { property: "og:title", content: "BioAcoustic Guardian" },
      { property: "og:description", content: "AI-powered acoustic intelligence for forests, rangers and biodiversity." },
    ],
  }),
  component: LandingPage,
});
