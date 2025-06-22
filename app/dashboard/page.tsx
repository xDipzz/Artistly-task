"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import ReusableTable from "@/components/ReusableTable"
import { Users, Clock, CheckCircle, XCircle, Search, Filter, Sparkles, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SubmittedArtist {
  id: string
  name: string
  email: string
  phone: string
  location: string
  categories: string[]
  languages: string[]
  priceRange: string
  experience: string
  status: string
  submittedAt: string
  bio: string
}

export default function DashboardPage() {
  const [submittedArtists, setSubmittedArtists] = useState<SubmittedArtist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    try {
      const stored = localStorage.getItem("submittedArtists")
      if (stored) {
        const parsedData = JSON.parse(stored)
        setSubmittedArtists(parsedData)
      }
    } catch (error) {
      console.error("Error loading submitted artists:", error)
      toast({
        title: "Error",
        description: "Failed to load artist data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const updateStatus = (id: string, newStatus: string) => {
    const updated = submittedArtists.map((artist) => (artist.id === id ? { ...artist, status: newStatus } : artist))
    setSubmittedArtists(updated)
    localStorage.setItem("submittedArtists", JSON.stringify(updated))

    toast({
      title: "Status Updated",
      description: `Artist status changed to ${newStatus}`,
    })
  }

  const deleteArtist = (id: string) => {
    const updated = submittedArtists.filter((artist) => artist.id !== id)
    setSubmittedArtists(updated)
    localStorage.setItem("submittedArtists", JSON.stringify(updated))

    toast({
      title: "Artist Deleted",
      description: "Artist has been removed from the system",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="status-approved">Approved</Badge>
      case "Rejected":
        return <Badge className="status-rejected">Rejected</Badge>
      case "Under Review":
        return <Badge className="status-pending">Under Review</Badge>
      default:
        return <Badge className="bg-slate-600 text-slate-200">Pending Review</Badge>
    }
  }

  const stats = {
    total: submittedArtists.length,
    pending: submittedArtists.filter((a) => a.status === "Pending Review").length,
    approved: submittedArtists.filter((a) => a.status === "Approved").length,
    rejected: submittedArtists.filter((a) => a.status === "Rejected").length,
  }

  const tableColumns = [
    {
      key: "name" as keyof SubmittedArtist,
      label: "Artist Details",
      sortable: true,
      render: (value: string, row: SubmittedArtist) => (
        <div className="space-y-1">
          <p className="font-semibold text-white">{value}</p>
          <p className="text-sm text-slate-400">{row.email}</p>
          <p className="text-xs text-slate-500">{row.phone}</p>
        </div>
      ),
    },
    {
      key: "categories" as keyof SubmittedArtist,
      label: "Categories",
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((category, index) => (
            <Badge
              key={category}
              className={`text-xs ${
                index === 0
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                  : index === 1
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    : "bg-purple-500/20 text-purple-300 border-purple-500/30"
              }`}
            >
              {category}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge className="bg-slate-600/20 text-slate-400 border-slate-600/30 text-xs">+{value.length - 2}</Badge>
          )}
        </div>
      ),
    },
    {
      key: "location" as keyof SubmittedArtist,
      label: "Location",
      sortable: true,
      render: (value: string) => <span className="text-slate-300">{value}</span>,
    },
    {
      key: "priceRange" as keyof SubmittedArtist,
      label: "Fee Range",
      sortable: true,
      render: (value: string) => <span className="text-emerald-400 font-medium">{value}</span>,
    },
    {
      key: "experience" as keyof SubmittedArtist,
      label: "Experience",
      sortable: true,
      render: (value: string) => <span className="text-slate-300">{value}</span>,
    },
    {
      key: "status" as keyof SubmittedArtist,
      label: "Status",
      sortable: true,
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: "submittedAt" as keyof SubmittedArtist,
      label: "Submitted",
      sortable: true,
      render: (value: string) => <span className="text-slate-400 text-sm">{new Date(value).toLocaleDateString()}</span>,
    },
  ]

  const tableActions = [
    {
      label: "Approve",
      onClick: (artist: SubmittedArtist) => updateStatus(artist.id, "Approved"),
    },
    {
      label: "Reject",
      onClick: (artist: SubmittedArtist) => updateStatus(artist.id, "Rejected"),
      variant: "destructive" as const,
    },
    {
      label: "Delete",
      onClick: (artist: SubmittedArtist) => deleteArtist(artist.id),
      variant: "destructive" as const,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="absolute inset-0">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <Badge className="glass-effect text-slate-200 border-slate-600/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Management Portal
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            Manager{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-slate-400">Manage artist applications and submissions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="modern-card enhanced-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-slate-500 mt-1">All time submissions</p>
            </CardContent>
          </Card>

          <Card className="modern-card enhanced-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
              <p className="text-xs text-slate-500 mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="modern-card enhanced-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">{stats.approved}</div>
              <p className="text-xs text-slate-500 mt-1">Active artists</p>
            </CardContent>
          </Card>

          <Card className="modern-card enhanced-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">{stats.rejected}</div>
              <p className="text-xs text-slate-500 mt-1">Not approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="modern-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search artists by name, email, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
              <Button className="btn-secondary">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Artists Table */}
        <div className="modern-card">
          <ReusableTable
            data={submittedArtists}
            columns={tableColumns}
            actions={tableActions}
            searchable={false}
            title="Artist Applications"
            description="Review and manage artist registration submissions"
          />
        </div>

        {/* Empty State */}
        {submittedArtists.length === 0 && (
          <Card className="modern-card mt-8">
            <CardContent className="text-center py-16">
              <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-playfair">No Applications Yet</h3>
              <p className="text-slate-400 mb-6">
                Applications will appear here once artists submit their registration forms
              </p>
              <Button asChild className="btn-secondary">
                <a href="/onboard">View Registration Form</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
