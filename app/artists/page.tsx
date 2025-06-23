"use client"

import { useState, useMemo } from "react"
import ArtistCard from "@/components/ArtistCard"
import FilterSection from "@/components/FilterSection"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, SlidersHorizontal, Sparkles } from "lucide-react"
import { artists } from "@/lib/data"
import type { FilterState } from "@/lib/types"

/**
 * Artists listing page with advanced filtering
 * Demonstrates conditional rendering, data mapping, and state management
 */
export default function ArtistsPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    locations: [],
    priceRanges: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)

  /**
   * Filter and sort artists based on current state
   * Demonstrates data mapping and conditional rendering logic
   */
  const filteredArtists = useMemo(() => {
    const result = artists.filter((artist) => {
      // Search functionality
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          artist.name.toLowerCase().includes(query) ||
          artist.category.some((cat) => cat.toLowerCase().includes(query)) ||
          artist.location.toLowerCase().includes(query) ||
          artist.bio.toLowerCase().includes(query)

        if (!matchesSearch) return false
      }

      // Category filtering
      if (filters.categories.length > 0) {
        const hasMatchingCategory = artist.category.some((cat) => filters.categories.includes(cat))
        if (!hasMatchingCategory) return false
      }

      // Location filtering
      if (filters.locations.length > 0) {
        if (!filters.locations.includes(artist.location)) return false
      }

      // Price range filtering
      if (filters.priceRanges.length > 0) {
        if (!filters.priceRanges.includes(artist.priceRange)) return false
      }

      return true
    })

    // Sorting logic
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        case "price":
          const priceA = Number.parseInt(a.priceRange.replace(/[^\d]/g, ""))
          const priceB = Number.parseInt(b.priceRange.replace(/[^\d]/g, ""))
          return priceA - priceB
        case "location":
          return a.location.localeCompare(b.location)
        default:
          return 0
      }
    })

    return result
  }, [filters, searchQuery, sortBy])

  /**
   * Handle filter changes from FilterSection component
   */
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  /**
   * Clear all active filters
   */
  const clearAllFilters = () => {
    setFilters({
      categories: [],
      locations: [],
      priceRanges: [],
    })
    setSearchQuery("")
    setSortBy("name")
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.locations.length > 0 ||
    filters.priceRanges.length > 0 ||
    searchQuery.trim() !== ""

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Page Header - Dark Theme */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-b border-slate-700">
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Discover Exceptional Talent
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
              Browse{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Artists
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Find the perfect performer for your next event from our curated collection of verified artists
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-900">
        {/* Search and Sort Controls - Dark Theme */}
        <Card className="mb-8 border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search artists by name, category, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden border-slate-600 text-white hover:bg-purple-500/10"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-slate-400 mr-2">Active filters:</span>

                  {searchQuery.trim() && (
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      Search: "{searchQuery}"
                    </Badge>
                  )}

                  {filters.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    >
                      {category}
                    </Badge>
                  ))}

                  {filters.locations.map((location) => (
                    <Badge
                      key={location}
                      variant="secondary"
                      className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    >
                      {location}
                    </Badge>
                  ))}

                  {filters.priceRanges.map((range) => (
                    <Badge
                      key={range}
                      variant="secondary"
                      className="bg-orange-500/20 text-orange-300 border-orange-500/30"
                    >
                      {range}
                    </Badge>
                  ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Section */}
          <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
            <FilterSection onFilterChange={handleFilterChange} currentFilters={filters} />
          </div>

          {/* Artists Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-slate-400">
                Showing <span className="font-semibold text-white">{filteredArtists.length}</span> of{" "}
                <span className="font-semibold text-white">{artists.length}</span> artists
              </p>
            </div>

            {/* Conditional Rendering - No Results */}
            {filteredArtists.length === 0 ? (
              <Card className="border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <Filter className="h-16 w-16 text-slate-500 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-white mb-2 font-playfair">No artists found</h3>
                  <p className="text-slate-400 mb-6">No artists match your current search criteria</p>
                  <Button
                    onClick={clearAllFilters}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                  >
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              /* Artists Grid - Data Mapping */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
