"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Calendar, FileText, Users, Target, Plus } from "lucide-react"
import Link from "next/link"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome back!</h2>
          <p className="text-muted-foreground mt-1">Here's what's happening with your startup today.</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Quick Add
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Burn Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,500</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline w-3 h-3 mr-1 text-green-500" />
              -5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Runway</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 months</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +2 months from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-blue-500" />
              +2 new hires this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestones</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7/12</div>
            <p className="text-xs text-muted-foreground">Q1 goals completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to keep your startup organized</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <Link href="/dashboard/cap-table">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  <span className="text-sm">Update Cap Table</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <Link href="/dashboard/burn-rate">
                  <DollarSign className="w-6 h-6 mb-2" />
                  <span className="text-sm">Log Expenses</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <Link href="/dashboard/roadmap">
                  <Target className="w-6 h-6 mb-2" />
                  <span className="text-sm">Update Roadmap</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <Link href="/dashboard/legal-docs">
                  <FileText className="w-6 h-6 mb-2" />
                  <span className="text-sm">Upload Docs</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Updated burn rate calculation",
                  time: "2 hours ago",
                  type: "finance",
                },
                {
                  action: "Added new milestone to Q1 roadmap",
                  time: "1 day ago",
                  type: "roadmap",
                },
                {
                  action: "Uploaded Series A term sheet",
                  time: "3 days ago",
                  type: "legal",
                },
                {
                  action: "Updated cap table with new equity grants",
                  time: "1 week ago",
                  type: "equity",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Q1 2024 Progress</CardTitle>
          <CardDescription>Track your quarterly goals and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Product Development</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Fundraising</span>
                <span className="text-sm text-muted-foreground">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Team Building</span>
                <span className="text-sm text-muted-foreground">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Legal & Compliance</span>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
