"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Download, Users, PieChart, Edit, Trash2 } from "lucide-react"

interface Stakeholder {
  id: string
  name: string
  shares: number
  percentage: number
  type: "Common" | "Preferred" | "Options"
  email?: string
}

export function CapTableView() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    { id: "1", name: "Founders", shares: 6000000, percentage: 80, type: "Common" },
    { id: "2", name: "Employee Pool", shares: 750000, percentage: 10, type: "Options" },
    { id: "3", name: "Seed Investors", shares: 750000, percentage: 10, type: "Preferred" },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStakeholder, setNewStakeholder] = useState({
    name: "",
    shares: "",
    type: "Common" as const,
    email: "",
  })

  const totalShares = stakeholders.reduce((sum, s) => sum + s.shares, 0)
  const authorizedShares = 10000000

  const handleAddStakeholder = () => {
    if (!newStakeholder.name || !newStakeholder.shares) return

    const shares = Number.parseInt(newStakeholder.shares)
    const percentage = (shares / totalShares) * 100

    const stakeholder: Stakeholder = {
      id: Date.now().toString(),
      name: newStakeholder.name,
      shares,
      percentage: Math.round(percentage * 100) / 100,
      type: newStakeholder.type,
      email: newStakeholder.email || undefined,
    }

    setStakeholders([...stakeholders, stakeholder])
    setNewStakeholder({ name: "", shares: "", type: "Common", email: "" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteStakeholder = (id: string) => {
    setStakeholders(stakeholders.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Cap Table & Equity Tracker</h2>
          <p className="text-muted-foreground mt-1">Visualize ownership and track equity distribution</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Stakeholder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Stakeholder</DialogTitle>
                <DialogDescription>Add a new stakeholder to your cap table</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newStakeholder.name}
                    onChange={(e) => setNewStakeholder({ ...newStakeholder, name: e.target.value })}
                    placeholder="Stakeholder name"
                  />
                </div>
                <div>
                  <Label htmlFor="shares">Number of Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    value={newStakeholder.shares}
                    onChange={(e) => setNewStakeholder({ ...newStakeholder, shares: e.target.value })}
                    placeholder="1000000"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Share Type</Label>
                  <Select
                    value={newStakeholder.type}
                    onValueChange={(value: "Common" | "Preferred" | "Options") =>
                      setNewStakeholder({ ...newStakeholder, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Common">Common Stock</SelectItem>
                      <SelectItem value="Preferred">Preferred Stock</SelectItem>
                      <SelectItem value="Options">Stock Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStakeholder.email}
                    onChange={(e) => setNewStakeholder({ ...newStakeholder, email: e.target.value })}
                    placeholder="stakeholder@example.com"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddStakeholder}>Add Stakeholder</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorizedShares.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Authorized shares</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issued Shares</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShares.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalShares / authorizedShares) * 100)}% of authorized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stakeholders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakeholders.length}</div>
            <p className="text-xs text-muted-foreground">Active stakeholders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equity Distribution</CardTitle>
          <CardDescription>Current ownership breakdown by stakeholder</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{stakeholder.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {stakeholder.shares.toLocaleString()} shares
                      {stakeholder.email && ` • ${stakeholder.email}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold">{stakeholder.percentage}%</div>
                    <Badge variant="secondary">{stakeholder.type}</Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStakeholder(stakeholder.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ownership Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Ownership Visualization</CardTitle>
          <CardDescription>Visual representation of equity distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stakeholders.map((stakeholder, index) => (
              <div key={stakeholder.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{stakeholder.name}</span>
                  <span className="text-muted-foreground">{stakeholder.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${stakeholder.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
