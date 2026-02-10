import { createFileRoute } from "@tanstack/react-router"
import SkincareGuidePage from "@/pages/skincare-guide"

export const Route = createFileRoute("/$countryCode/skincare-guide")({
  component: SkincareGuidePage,
})
