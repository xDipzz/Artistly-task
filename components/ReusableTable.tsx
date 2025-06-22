"use client"

import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Search, ArrowUpDown } from "lucide-react"

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

interface Action<T> {
  label: string
  onClick: (row: T) => void
  variant?: "default" | "destructive"
}

interface ReusableTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  title?: string
  description?: string
}

export default function ReusableTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  searchable = false,
  searchPlaceholder = "Search...",
  title,
  description,
}: ReusableTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null
    direction: "asc" | "desc"
  }>({ key: null, direction: "asc" })

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const processedData = data
    .filter((item) => {
      if (!searchable || !searchQuery.trim()) return true
      return Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase()))
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })

  return (
    <Card className="modern-card">
      {(title || searchable) && (
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              {title && <CardTitle className="text-xl text-white font-playfair">{title}</CardTitle>}
              {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
            </div>

            {searchable && (
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            )}
          </div>
        </CardHeader>
      )}

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                {columns.map((column) => (
                  <TableHead key={String(column.key)} className="font-semibold text-slate-300">
                    {column.sortable ? (
                      <Button
                        variant="ghost"
                        onClick={() => handleSort(column.key)}
                        className="h-auto p-0 font-semibold hover:bg-transparent text-slate-300 hover:text-white"
                      >
                        {column.label}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      column.label
                    )}
                  </TableHead>
                ))}

                {actions && actions.length > 0 && <TableHead className="w-12 text-slate-300">Actions</TableHead>}
              </TableRow>
            </TableHeader>

            <TableBody>
              {processedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8 text-slate-500">
                    {searchQuery ? "No results found for your search" : "No data available"}
                  </TableCell>
                </TableRow>
              ) : (
                processedData.map((row, index) => (
                  <TableRow key={index} className="border-slate-700 hover:bg-slate-800/30">
                    {columns.map((column) => (
                      <TableCell key={String(column.key)} className="text-slate-300">
                        {column.render ? column.render(row[column.key], row) : String(row[column.key] || "-")}
                      </TableCell>
                    ))}

                    {actions && actions.length > 0 && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white hover:bg-slate-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                            {actions.map((action, actionIndex) => (
                              <DropdownMenuItem
                                key={actionIndex}
                                onClick={() => action.onClick(row)}
                                className={`text-slate-300 hover:bg-slate-700 focus:bg-slate-700 ${
                                  action.variant === "destructive" ? "text-red-400 hover:text-red-300" : ""
                                }`}
                              >
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
