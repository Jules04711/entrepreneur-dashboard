import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { RoadmapView } from "@/components/dashboard/roadmap-view"

export default function RoadmapPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <RoadmapView />
      </DashboardLayout>
    </AuthGuard>
  )
}
