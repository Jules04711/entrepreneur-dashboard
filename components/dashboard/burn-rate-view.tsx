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
import { Progress } from "@/components/ui/progress"
import { Plus, Download, DollarSign, TrendingDown, Calendar, Edit, Trash2 } from "lucide-react"

interface Expense {
  id: string
  category: string
  amount: number
  description: string
  date: string
  recurring: boolean
}

export function BurnRateView() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      category: "Salaries & Benefits",
      amount: 8500,
      description: "Monthly payroll",
      date: "2024-01-01",
      recurring: true,
    },
    {
      id: "2",
      category: "Software & Tools",
      amount: 1200,
      description: "SaaS subscriptions",
      date: "2024-01-01",
      recurring: true,
    },
    {
      id: "3",
      category: "Marketing",
      amount: 1500,
      description: "Digital advertising",
      date: "2024-01-01",
      recurring: true,
    },
    {
      id: "4",
      category: "Office & Operations",
      amount: 800,
      description: "Rent and utilities",
      date: "2024-01-01",
      recurring: true,
    },
    {
      id: "5",
      category: "Legal & Professional",
      amount: 500,
      description: "Legal services",
      date: "2024-01-01",
      recurring: true,
    },
  ])

  const [cashRemaining, setCashRemaining] = useState(225000)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    description: "",
    recurring: false,
  })

  const monthlyBurn = expenses.filter((e) => e.recurring).reduce((sum, e) => sum + e.amount, 0)
  const runway = Math.floor(cashRemaining / monthlyBurn)

  const expenseCategories = [
    "Salaries & Benefits",
    "Software & Tools",
    "Marketing",
    "Office & Operations",
    "Legal & Professional",
    "Research & Development",
    "Travel & Entertainment",
    "Other",
  ]

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.amount || !newExpense.description) return

    const expense: Expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: Number.parseFloat(newExpense.amount),
      description: newExpense.description,
      date: new Date().toISOString().split("T")[0],
      recurring: newExpense.recurring,
    }

    setExpenses([...expenses, expense])
    setNewExpense({ category: "", amount: "", description: "", recurring: false })
    setIsAddDialogOpen(false)
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const getCategoryTotal = (category: string) => {
    return expenses.filter((e) => e.category === category && e.recurring).reduce((sum, e) => sum + e.amount, 0)
  }

  const getCategoryPercentage = (category: string) => {
    const total = getCategoryTotal(category)
    return monthlyBurn > 0 ? Math.round((total / monthlyBurn) * 100) : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Burn Rate Monitor</h2>
          <p className="text-muted-foreground mt-1">Track expenses and calculate runway</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Add a new expense to track your burn rate</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    placeholder="Brief description of the expense"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={newExpense.recurring}
                    onChange={(e) => setNewExpense({ ...newExpense, recurring: e.target.checked })}
                    className="rounded border-border"
                  />
                  <Label htmlFor="recurring">Recurring monthly expense</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddExpense}>Add Expense</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Burn</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyBurn.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline w-3 h-3 mr-1 text-green-500" />
              Recurring expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cashRemaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Runway</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runway} months</div>
            <p className="text-xs text-muted-foreground">At current burn rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Runway Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Runway Projection</CardTitle>
          <CardDescription>Cash runway based on current burn rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Cash Remaining</span>
              <span>${cashRemaining.toLocaleString()}</span>
            </div>
            <Progress value={(cashRemaining / 500000) * 100} className="h-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>Target: $500K</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
          <CardDescription>Monthly spending breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenseCategories.map((category) => {
              const total = getCategoryTotal(category)
              const percentage = getCategoryPercentage(category)

              if (total === 0) return null

              return (
                <div key={category} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-medium">{category}</h3>
                    <p className="text-sm text-muted-foreground">{percentage}% of total burn</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">${total.toLocaleString()}</div>
                    <Badge variant="secondary">Monthly</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>All tracked expenses and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium">{expense.description}</h3>
                  <p className="text-sm text-muted-foreground">
                    {expense.category} • {expense.date}
                    {expense.recurring && " • Recurring"}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold">${expense.amount.toLocaleString()}</div>
                    <Badge variant={expense.recurring ? "default" : "secondary"}>
                      {expense.recurring ? "Monthly" : "One-time"}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteExpense(expense.id)}
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
    </div>
  )
}
