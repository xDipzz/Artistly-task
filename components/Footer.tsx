import Link from "next/link"
import { Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

/**
 * Enhanced Footer component with artistic dark theme
 * Demonstrates data mapping and conditional rendering
 */
export default function Footer() {
  // Footer links configuration - demonstrates data mapping
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Browse Artists", href: "/artists" },
        { name: "Join as Artist", href: "/onboard" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "How it Works", href: "#" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Singers", href: "/artists?category=singers" },
        { name: "Dancers", href: "/artists?category=dancers" },
        { name: "Speakers", href: "/artists?category=speakers" },
        { name: "DJs", href: "/artists?category=djs" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-cyan-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-purple-400" },
  ]

  return (
    <footer className="bg-gradient-to-b from-background to-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-playfair bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Artistly
                </span>
                <Badge
                  variant="secondary"
                  className="w-fit bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs"
                >
                  Premium Platform
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              India's premier artist booking platform connecting event planners with exceptional performing artists.
              Trusted by 1000+ event organizers across 50+ cities.
            </p>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/10 p-2 rounded-lg">
                  <Mail className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-sm text-muted-foreground">hello@artistly.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-500/10 p-2 rounded-lg">
                  <Phone className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-500/10 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                </div>
                <span className="text-sm text-muted-foreground">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links - Data Mapping */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-foreground font-playfair">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-purple-400 transition-colors text-sm hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-border/50" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Artistly.com. Made with</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>in India. All rights reserved.</span>
          </div>

          {/* Social Links - Data Mapping */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className={`text-muted-foreground transition-colors p-2 rounded-lg hover:bg-purple-500/10 ${social.color}`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Footer Info */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            This is a demo application built for educational purposes. Built with Next.js 13+, TypeScript, Tailwind CSS,
            and shadcn/ui.
          </p>
        </div>
      </div>
    </footer>
  )
}
