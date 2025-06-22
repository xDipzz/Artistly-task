"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, Sparkles, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Browse Artists", href: "/artists" },
  { name: "Join as Artist", href: "/onboard" },
  { name: "Dashboard", href: "/dashboard" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="fixed top-0 w-full z-50 transition-all duration-300">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-playfair bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Artistly
              </span>
            </div>
          </div>
        </nav>
      </header>
    )
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "header-blur shadow-2xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-playfair bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Artistly
                </span>
                <span className="text-xs text-slate-500 -mt-1">Premium Platform</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-indigo-500/10 relative",
                  pathname === item.href ? "text-indigo-400 bg-indigo-500/10" : "text-slate-300 hover:text-white",
                )}
              >
                {item.name}
                {item.name === "Dashboard" && (
                  <Badge className="ml-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 text-xs">
                    Pro
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative text-slate-400 hover:text-white hover:bg-indigo-500/10"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-indigo-500/10">
              <User className="h-5 w-5" />
            </Button>

            <Button asChild size="sm" className="btn-primary shadow-lg hover:shadow-indigo-500/25">
              <Link href="/onboard">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-slate-400 hover:text-white hover:bg-indigo-500/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-slate-800/95 backdrop-blur-md border-slate-700">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold font-playfair bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Artistly
                    </span>
                    <span className="text-xs text-slate-500 -mt-1">Premium Platform</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-all",
                        pathname === item.href
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "text-slate-300 hover:bg-indigo-500/5 hover:text-white",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      {item.name === "Dashboard" && (
                        <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 text-xs">
                          Pro
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700">
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:text-white hover:bg-indigo-500/10"
                    >
                      <Bell className="h-5 w-5 mr-3" />
                      Notifications
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:text-white hover:bg-indigo-500/10"
                    >
                      <User className="h-5 w-5 mr-3" />
                      Profile
                    </Button>
                    <Button asChild className="w-full btn-primary">
                      <Link href="/onboard">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
