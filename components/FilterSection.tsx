"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Filter, Sparkles } from "lucide-react"
import type { FilterState } from "@/lib/types"

/**
 * Filter options configuration
 */
const filterOptions = {
  categories: ["Singers", "Dancers", "Speakers", "DJs", "Musicians", "Comedians", "Magicians", "Actors"],
  locations: [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kochi",
    "Indore",
  ],
  priceRanges: ["₹5,000 - ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000+"],
}

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void
  currentFilters: FilterState
}

/**
 * FilterSection Component with artistic dark theme
 * Demonstrates useState, useEffect, conditional rendering, and data mapping
 */
export default function FilterSection({ onFilterChange, currentFilters }: FilterSectionProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters)
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    locations: false,
    priceRanges: false,
  })

  /**
   * Sync local filters with parent component
   */
  useEffect(() => {
    setLocalFilters(currentFilters)
  }, [currentFilters])

  /**
   * Handle category filter changes
   */
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...localFilters.categories, category]
      : localFilters.categories.filter((c) => c !== category)

    const newFilters = { ...localFilters, categories: newCategories }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  /**
   * Handle location filter changes
   */
  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked
      ? [...localFilters.locations, location]
      : localFilters.locations.filter((l) => l !== location)

    const newFilters = { ...localFilters, locations: newLocations }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  /**
   * Handle price range filter changes
   */
  const handlePriceRangeChange = (priceRange: string, checked: boolean) => {
    const newPriceRanges = checked
      ? [...localFilters.priceRanges, priceRange]
      : localFilters.priceRanges.filter((p) => p !== priceRange)

    const newFilters = { ...localFilters, priceRanges: newPriceRanges }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  /**
   * Clear all filters
   */
  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      categories: [],
      locations: [],
      priceRanges: [],
    }
    setLocalFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  /**
   * Toggle collapsible sections
   */
  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const activeFilterCount =
    localFilters.categories.length + localFilters.locations.length + localFilters.priceRanges.length

  const hasActiveFilters = activeFilterCount > 0

  return (
    <Card className="sticky top-4 border border-border bg-card backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-lg text-foreground font-playfair">Filters</CardTitle>
            {hasActiveFilters && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                {activeFilterCount}
              </Badge>
            )}
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Categories Filter */}
        <Collapsible open={!collapsedSections.categories} onOpenChange={() => toggleSection("categories")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <Label className="text-base font-medium cursor-pointer font-playfair">
                Categories
                {localFilters.categories.length > 0 && (
                  <Badge className="ml-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {localFilters.categories.length}
                  </Badge>
                )}
              </Label>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-3 mt-4">
            {filterOptions.categories.map((category) => (
              <div key={category} className="flex items-center space-x-3">
                <Checkbox
                  id={`category-${category}`}
                  checked={localFilters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  className="border-border data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer flex-1 text-muted-foreground hover:text-foreground"
                >
                  {category}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator className="bg-border" />

        {/* Locations Filter */}
        <Collapsible open={!collapsedSections.locations} onOpenChange={() => toggleSection("locations")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <Label className="text-base font-medium cursor-pointer font-playfair">
                Location
                {localFilters.locations.length > 0 && (
                  <Badge className="ml-2 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    {localFilters.locations.length}
                  </Badge>
                )}
              </Label>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-3 mt-4 max-h-48 overflow-y-auto">
            {filterOptions.locations.map((location) => (
              <div key={location} className="flex items-center space-x-3">
                <Checkbox
                  id={`location-${location}`}
                  checked={localFilters.locations.includes(location)}
                  onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                  className="border-border data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
                <Label
                  htmlFor={`location-${location}`}
                  className="text-sm font-normal cursor-pointer flex-1 text-muted-foreground hover:text-foreground"
                >
                  {location}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator className="bg-border" />

        {/* Price Range Filter */}
        <Collapsible open={!collapsedSections.priceRanges} onOpenChange={() => toggleSection("priceRanges")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <Label className="text-base font-medium cursor-pointer font-playfair">
                Price Range
                {localFilters.priceRanges.length > 0 && (
                  <Badge className="ml-2 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    {localFilters.priceRanges.length}
                  </Badge>
                )}
              </Label>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-3 mt-4">
            {filterOptions.priceRanges.map((priceRange) => (
              <div key={priceRange} className="flex items-center space-x-3">
                <Checkbox
                  id={`price-${priceRange}`}
                  checked={localFilters.priceRanges.includes(priceRange)}
                  onCheckedChange={(checked) => handlePriceRangeChange(priceRange, checked as boolean)}
                  className="border-border data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                />
                <Label
                  htmlFor={`price-${priceRange}`}
                  className="text-sm font-normal cursor-pointer flex-1 text-muted-foreground hover:text-foreground"
                >
                  {priceRange}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
