import { createFileRoute } from "@tanstack/react-router"
import Experiences from "@/pages/experiences"

export const Route = createFileRoute("/$countryCode/experiences")({
  component: Experiences,
})
