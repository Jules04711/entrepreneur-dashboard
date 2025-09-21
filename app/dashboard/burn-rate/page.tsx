import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BurnRateView } from "@/components/dashboard/burn-rate-view"

export default function BurnRatePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <BurnRateView />
      </DashboardLayout>
    </AuthGuard>
  )
}
