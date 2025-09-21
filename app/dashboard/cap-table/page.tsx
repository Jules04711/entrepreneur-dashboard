import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CapTableView } from "@/components/dashboard/cap-table-view"

export default function CapTablePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <CapTableView />
      </DashboardLayout>
    </AuthGuard>
  )
}
