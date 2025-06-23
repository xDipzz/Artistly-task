"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mic, Music, Users, Headphones, ArrowRight, Star, MapPin, Sparkles, Crown, Zap } from "lucide-react"

const categories = [
  {
    title: "Singers",
    description: "Exceptional vocalists across all genres",
    icon: Mic,
    count: "150+ Artists",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "Dancers",
    description: "Mesmerizing performers in every style",
    icon: Music,
    count: "120+ Artists",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Speakers",
    description: "Inspiring voices that captivate audiences",
    icon: Users,
    count: "80+ Artists",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "DJs",
    description: "Masters of rhythm and atmosphere",
    icon: Headphones,
    count: "90+ Artists",
    gradient: "from-pink-500 to-rose-600",
  },
]

const featuredArtists = [
  {
    name: "Priya Sharma",
    category: "Classical Singer",
    location: "Mumbai",
    rating: 4.9,
    price: "₹15,000 - ₹25,000",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
  {
    name: "James Anderson",
    category: "International Comedian",
    location: "Bangalore",
    rating: 4.8,
    price: "₹35,000 - ₹60,000",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
  {
    name: "Isabella Rodriguez",
    category: "Salsa Dancer",
    location: "Mumbai",
    rating: 4.5,
    price: "₹25,000 - ₹45,000",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

          {/* Floating orbs */}
          <div className="absolute inset-0">
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
            <div className="floating-orb orb-3"></div>
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="grid-pattern"></div>
          </div>
        </div>

        <div className="relative z-10 py-24 px-4 w-full">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 glass-effect text-slate-200 border-slate-600/30 animate-fade-in-up">
              <Sparkles className="w-4 h-4 mr-2" />
              India's Premier Artist Booking Platform
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-playfair animate-fade-in-up animation-delay-200">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Artistly
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-4 text-slate-300 font-medium animate-fade-in-up animation-delay-400">
              Where Art Meets Opportunity
            </p>

            <p className="text-lg mb-10 text-slate-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
              Discover extraordinary performing artists for your events. From soul-stirring singers to captivating
              dancers, find the perfect artist to create unforgettable moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
              <Button asChild size="lg" className="btn-primary shadow-lg hover:shadow-indigo-500/25">
                <Link href="/artists">
                  <Crown className="mr-2 h-5 w-5" />
                  Explore Artists
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-secondary">
                <Link href="/onboard">
                  <Zap className="mr-2 h-5 w-5" />
                  Join as Artist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-slate-400">Verified Artists</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                1000+
              </div>
              <div className="text-sm text-slate-400">Events Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-sm text-slate-400">Cities Covered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                4.8★
              </div>
              <div className="text-sm text-slate-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              Discover by{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Find the perfect performer for your event from our curated collection of exceptional artists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Card key={category.title} className="modern-card enhanced-hover overflow-hidden group">
                <div className={`h-1 bg-gradient-to-r ${category.gradient}`}></div>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="h-8 w-8 text-indigo-400" />
                  </div>
                  <CardTitle className="text-xl font-playfair text-white">{category.title}</CardTitle>
                  <CardDescription className="text-slate-400">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <Badge className={`bg-gradient-to-r ${category.gradient} text-white border-0`}>
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              Featured{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Artists
              </span>
            </h2>
            <p className="text-lg text-slate-400">Meet some of our most celebrated and verified performers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <Card key={artist.name} className="modern-card enhanced-hover overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-600 relative">
                  <img
                    src={artist.image || "/placeholder.svg"}
                    alt={`${artist.name} - ${artist.category} from ${artist.location}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                    loading="lazy"
                  />
                  {artist.verified && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white mb-1 font-playfair">{artist.name}</h3>
                    <p className="text-indigo-400 font-medium mb-2">{artist.category}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="h-4 w-4" />
                      <span>{artist.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-white">{artist.rating}</span>
                      <span>(50+ reviews)</span>
                    </div>
                  </div>

                  <Separator className="my-4 bg-slate-700" />

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        {artist.price}
                      </p>
                      <p className="text-xs text-slate-500">per event</p>
                    </div>
                  </div>

                  <Button className="w-full btn-primary">Ask for Quote</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="relative z-10 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">Ready to Create Magic?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Browse our exceptional collection of verified performers and book the perfect artist for your event
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/artists">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Browsing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/onboard">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
