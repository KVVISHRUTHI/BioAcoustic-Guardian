import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/auth/AuthPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — BioAcoustic Guardian" },
      { name: "description", content: "Authenticate to enter the BioAcoustic Guardian forest intelligence command center." },
    ],
  }),
  component: AuthPage,
});
