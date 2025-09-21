import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Upload, Eye } from "lucide-react"

export function LegalDocsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Legal Documents Hub</h2>
          <p className="text-muted-foreground mt-1">Organize and manage your legal documents</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incorporation</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Formation documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active agreements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IP & Patents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Intellectual property</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Latest uploaded and modified documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Articles of Incorporation",
                type: "Incorporation",
                date: "2024-01-15",
                status: "Active",
              },
              {
                name: "Employee Handbook v2.1",
                type: "HR Policy",
                date: "2024-01-10",
                status: "Active",
              },
              {
                name: "Series A Term Sheet",
                type: "Fundraising",
                date: "2024-01-08",
                status: "Under Review",
              },
              {
                name: "Software License Agreement",
                type: "Contract",
                date: "2024-01-05",
                status: "Active",
              },
              {
                name: "Trademark Application",
                type: "IP",
                date: "2024-01-03",
                status: "Pending",
              },
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • {doc.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={doc.status === "Active" ? "default" : doc.status === "Pending" ? "secondary" : "outline"}
                  >
                    {doc.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
