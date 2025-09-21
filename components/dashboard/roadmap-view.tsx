"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Calendar, Target, CheckCircle, Clock, Edit, Trash2, Play } from "lucide-react"

interface Milestone {
  id: string
  title: string
  description: string
  progress: number
  status: "Not Started" | "In Progress" | "Completed" | "On Hold"
  dueDate: string
  priority: "Low" | "Medium" | "High"
  assignee?: string
}

export function RoadmapView() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "MVP Development",
      description: "Core product features and user interface",
      progress: 85,
      status: "In Progress",
      dueDate: "2024-02-15",
      priority: "High",
      assignee: "Development Team",
    },
    {
      id: "2",
      title: "Beta User Onboarding",
      description: "Recruit and onboard 50 beta users",
      progress: 60,
      status: "In Progress",
      dueDate: "2024-02-20",
      priority: "High",
      assignee: "Marketing Team",
    },
    {
      id: "3",
      title: "Pitch Deck Preparation",
      description: "Finalize Series A pitch materials",
      progress: 40,
      status: "In Progress",
      dueDate: "2024-02-28",
      priority: "Medium",
      assignee: "Founders",
    },
    {
      id: "4",
      title: "Legal Documentation",
      description: "Complete incorporation and IP filings",
      progress: 100,
      status: "Completed",
      dueDate: "2024-01-31",
      priority: "High",
      assignee: "Legal Team",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium" as const,
    assignee: "",
  })

  const totalMilestones = milestones.length
  const completedMilestones = milestones.filter((m) => m.status === "Completed").length
  const inProgressMilestones = milestones.filter((m) => m.status === "In Progress").length

  const handleAddMilestone = () => {
    if (!newMilestone.title || !newMilestone.description || !newMilestone.dueDate) return

    const milestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestone.title,
      description: newMilestone.description,
      progress: 0,
      status: "Not Started",
      dueDate: newMilestone.dueDate,
      priority: newMilestone.priority,
      assignee: newMilestone.assignee || undefined,
    }

    setMilestones([...milestones, milestone])
    setNewMilestone({ title: "", description: "", dueDate: "", priority: "Medium", assignee: "" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  const handleUpdateProgress = (id: string, progress: number) => {
    setMilestones(
      milestones.map((m) =>
        m.id === id
          ? {
              ...m,
              progress,
              status: progress === 100 ? "Completed" : progress > 0 ? "In Progress" : "Not Started",
            }
          : m,
      ),
    )
  }

  const handleStartMilestone = (id: string) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, status: "In Progress", progress: Math.max(m.progress, 10) } : m)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "In Progress":
        return "secondary"
      case "On Hold":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">90-Day Roadmap Tracker</h2>
          <p className="text-muted-foreground mt-1">Track milestones and sprint progress</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Milestone</DialogTitle>
                <DialogDescription>Create a new milestone for your roadmap</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                    placeholder="Milestone title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                    placeholder="Detailed description of the milestone"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newMilestone.dueDate}
                    onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newMilestone.priority}
                    onValueChange={(value: "Low" | "Medium" | "High") =>
                      setNewMilestone({ ...newMilestone, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignee">Assignee (Optional)</Label>
                  <Input
                    id="assignee"
                    value={newMilestone.assignee}
                    onChange={(e) => setNewMilestone({ ...newMilestone, assignee: e.target.value })}
                    placeholder="Team or person responsible"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMilestone}>Add Milestone</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMilestones}</div>
            <p className="text-xs text-muted-foreground">Q1 2024 goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMilestones}</div>
            <p className="text-xs text-muted-foreground">
              {totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressMilestones}</div>
            <p className="text-xs text-muted-foreground">Active sprints</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Until Q1 end</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Milestone Progress</CardTitle>
          <CardDescription>Track progress on all your roadmap milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium">{milestone.title}</h3>
                      <Badge variant={getPriorityColor(milestone.priority)}>{milestone.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                    {milestone.assignee && (
                      <p className="text-xs text-muted-foreground">Assigned to: {milestone.assignee}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                    <p className="text-xs text-muted-foreground">Due: {milestone.dueDate}</p>
                    <div className="flex space-x-1">
                      {milestone.status === "Not Started" && (
                        <Button variant="ghost" size="sm" onClick={() => handleStartMilestone(milestone.id)}>
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMilestone(milestone.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{milestone.progress}%</span>
                      <div className="flex space-x-1">
                        {[0, 25, 50, 75, 100].map((value) => (
                          <Button
                            key={value}
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => handleUpdateProgress(milestone.id, value)}
                          >
                            {value}%
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
