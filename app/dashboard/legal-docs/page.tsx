import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { LegalDocsView } from "@/components/dashboard/legal-docs-view"

export default function LegalDocsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <LegalDocsView />
      </DashboardLayout>
    </AuthGuard>
  )
}
