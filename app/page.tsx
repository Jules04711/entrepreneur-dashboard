import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, FileText, Calculator, PieChart, Target, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Entrepreneur Dashboard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            Built for Entrepreneurs
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Treat your startup like your best client
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Stop juggling scattered tools. Centralize your cap table, burn rate, business plans, and roadmaps in one
            professional dashboard designed for focused execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/auth/signup">
                Start Building <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-balance">The Problem</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Entrepreneurs juggle too many moving parts: legal docs, cap tables, burn rate, business plans, pitches,
                leads, and automation scripts. These end up scattered across tools, making it hard to stay focused on
                execution.
              </p>
              <div className="space-y-3">
                {[
                  "Documents scattered across multiple platforms",
                  "No clear view of financial runway",
                  "Difficulty tracking progress and milestones",
                  "Time wasted switching between tools",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-balance">The Solution</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A centralized Entrepreneur Dashboard that organizes everything into one place. AI and automation make it
                possible to unify tools faster than ever.
              </p>
              <div className="space-y-3">
                {[
                  "All business data in one professional dashboard",
                  "Real-time burn rate and runway calculations",
                  "Integrated milestone tracking and planning",
                  "Seamless workflow automation",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Core Features</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Everything you need to manage your startup professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: PieChart,
                title: "Cap Table & Equity Tracker",
                description: "Visualize ownership and contributions with interactive charts and detailed breakdowns.",
              },
              {
                icon: FileText,
                title: "Legal Docs Hub",
                description: "Upload and reference Articles of Organization, DBAs, and other critical documents.",
              },
              {
                icon: Calculator,
                title: "Burn Rate Monitor",
                description: "Runway calculator with scenario planning to keep your finances on track.",
              },
              {
                icon: Target,
                title: "90-Day Roadmap Tracker",
                description: "Milestone board with sprints for MVP development, pitches, and playbooks.",
              },
              {
                icon: BarChart3,
                title: "Accounting Snapshot",
                description: "Income and expenses overview with QuickBooks integration and spreadsheet imports.",
              },
              {
                icon: Users,
                title: "Business Plan Library",
                description: "Editable documents with version control and professional export options.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to organize your startup?</h2>
          <p className="text-xl mb-8 opacity-90 text-balance leading-relaxed">
            Join entrepreneurs who treat their startups like their best clients. Start building your professional
            dashboard today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/auth/signup">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Entrepreneur Dashboard</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © 2024 Entrepreneur Dashboard. Built for founders, by founders.
          </div>
        </div>
      </footer>
    </div>
  )
}
