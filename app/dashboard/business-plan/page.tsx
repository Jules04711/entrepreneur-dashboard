import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BusinessPlanView } from "@/components/dashboard/business-plan-view"

export default function BusinessPlanPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <BusinessPlanView />
      </DashboardLayout>
    </AuthGuard>
  )
}
