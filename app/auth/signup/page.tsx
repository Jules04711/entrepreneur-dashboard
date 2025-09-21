import { SignUpForm } from "@/components/auth/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">Entrepreneur Dashboard</span>
          </Link>
        </div>

        <Card className="border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Start organizing your startup today</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
