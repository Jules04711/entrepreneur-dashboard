"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Download, FileText, Edit, Eye, Share, Trash2, Copy } from "lucide-react"

interface Document {
  id: string
  title: string
  type: "Business Plan" | "Strategy" | "Roadmap" | "Financial" | "Research" | "Playbook"
  status: "Draft" | "Published" | "Archived"
  content: string
  lastModified: string
  pages: number
  author: string
}

export function BusinessPlanView() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Series A Business Plan",
      type: "Business Plan",
      status: "Published",
      content: "Executive Summary: Our company is revolutionizing...",
      lastModified: "2024-01-15",
      pages: 24,
      author: "Founders",
    },
    {
      id: "2",
      title: "Go-to-Market Strategy",
      type: "Strategy",
      status: "Published",
      content: "Market Analysis: The total addressable market...",
      lastModified: "2024-01-12",
      pages: 18,
      author: "Marketing Team",
    },
    {
      id: "3",
      title: "Product Roadmap 2024",
      type: "Roadmap",
      status: "Draft",
      content: "Q1 Objectives: Launch MVP with core features...",
      lastModified: "2024-01-10",
      pages: 12,
      author: "Product Team",
    },
    {
      id: "4",
      title: "Financial Projections",
      type: "Financial",
      status: "Published",
      content: "Revenue Model: SaaS subscription with tiered pricing...",
      lastModified: "2024-01-08",
      pages: 15,
      author: "Finance Team",
    },
    {
      id: "5",
      title: "Competitive Analysis",
      type: "Research",
      status: "Draft",
      content: "Market Landscape: Key competitors include...",
      lastModified: "2024-01-05",
      pages: 8,
      author: "Strategy Team",
    },
    {
      id: "6",
      title: "Team Hiring Playbook",
      type: "Playbook",
      status: "Published",
      content: "Hiring Process: Our structured approach to talent acquisition...",
      lastModified: "2024-01-03",
      pages: 22,
      author: "HR Team",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [newDocument, setNewDocument] = useState({
    title: "",
    type: "Business Plan" as const,
    content: "",
  })

  const documentTypes = ["Business Plan", "Strategy", "Roadmap", "Financial", "Research", "Playbook"] as const

  const handleAddDocument = () => {
    if (!newDocument.title || !newDocument.content) return

    const document: Document = {
      id: Date.now().toString(),
      title: newDocument.title,
      type: newDocument.type,
      status: "Draft",
      content: newDocument.content,
      lastModified: new Date().toISOString().split("T")[0],
      pages: Math.ceil(newDocument.content.length / 500), // Rough estimate
      author: "Current User",
    }

    setDocuments([...documents, document])
    setNewDocument({ title: "", type: "Business Plan", content: "" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id))
  }

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsViewDialogOpen(true)
  }

  const handlePublishDocument = (id: string) => {
    setDocuments(documents.map((d) => (d.id === id ? { ...d, status: "Published" as const } : d)))
  }

  const handleDuplicateDocument = (document: Document) => {
    const duplicate: Document = {
      ...document,
      id: Date.now().toString(),
      title: `${document.title} (Copy)`,
      status: "Draft",
      lastModified: new Date().toISOString().split("T")[0],
    }
    setDocuments([...documents, duplicate])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "default"
      case "Draft":
        return "secondary"
      case "Archived":
        return "outline"
      default:
        return "outline"
    }
  }

  const totalDocuments = documents.length
  const publishedDocuments = documents.filter((d) => d.status === "Published").length
  const draftDocuments = documents.filter((d) => d.status === "Draft").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Business Plan Library</h2>
          <p className="text-muted-foreground mt-1">Create and manage your business documents</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
                <DialogDescription>Create a new business document or playbook</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                    placeholder="Document title"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Document Type</Label>
                  <Select
                    value={newDocument.type}
                    onValueChange={(value: (typeof documentTypes)[number]) =>
                      setNewDocument({ ...newDocument, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newDocument.content}
                    onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
                    placeholder="Start writing your document content..."
                    rows={10}
                    className="min-h-[200px]"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDocument}>Create Document</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Business plans & playbooks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Share className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedDocuments}</div>
            <p className="text-xs text-muted-foreground">Ready for sharing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Draft</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftDocuments}</div>
            <p className="text-xs text-muted-foreground">Work in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Available templates</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Documents</CardTitle>
          <CardDescription>Your business plans, playbooks, and strategic documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • {doc.pages} pages • Modified {doc.lastModified} • By {doc.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDuplicateDocument(doc)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  {doc.status === "Draft" && (
                    <Button variant="ghost" size="sm" onClick={() => handlePublishDocument(doc.id)}>
                      <Share className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Viewer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
            <DialogDescription>
              {selectedDocument?.type} • Last modified {selectedDocument?.lastModified}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{selectedDocument?.content}</div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
