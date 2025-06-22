import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, Crown, Languages, Sparkles } from "lucide-react"
import type { Artist } from "@/lib/types"

interface ArtistCardProps {
  artist: Artist
}

/**
 * ArtistCard Component with artistic dark theme
 * Demonstrates component reusability and data mapping
 */
export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="artistic-hover border-0 bg-card/80 backdrop-blur-sm overflow-hidden group">
      {/* Artist Image Section */}
      <div className="aspect-square bg-gradient-to-br from-purple-500/10 to-pink-500/10 relative overflow-hidden">
        <img
          src={artist.image || "/placeholder.svg"}
          alt={`${artist.name} - ${artist.category.join(", ")} from ${artist.location}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Primary Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">{artist.category[0]}</Badge>
        </div>

        {/* Verified Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <CardContent className="p-6">
        {/* Artist Basic Info */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-foreground mb-2 font-playfair">{artist.name}</h3>

          {/* Category Badges - Data Mapping */}
          <div className="flex flex-wrap gap-1 mb-3">
            {artist.category.map((cat, index) => (
              <Badge
                key={cat}
                variant="secondary"
                className={`text-xs ${
                  index === 0
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    : index === 1
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                }`}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Artist Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0 text-purple-400" />
            <span>{artist.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-400 fill-current flex-shrink-0" />
            <span className="font-medium text-foreground">{artist.rating}</span>
            <span>({Math.floor(Math.random() * 50) + 10} reviews)</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 flex-shrink-0 text-emerald-400" />
            <span>{artist.experience}</span>
          </div>

          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Languages className="h-4 w-4 flex-shrink-0 mt-0.5 text-cyan-400" />
            <div>
              <span className="block">
                {artist.languages.slice(0, 3).join(", ")}
                {artist.languages.length > 3 && (
                  <span className="text-muted-foreground/70"> +{artist.languages.length - 3} more</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Artist Bio */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{artist.bio}</p>
        </div>

        <Separator className="my-4 bg-border/50" />

        {/* Pricing and CTA */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {artist.priceRange}
            </p>
            <p className="text-xs text-muted-foreground">per event</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-yellow-400" />
              <p className="text-sm font-medium text-foreground">Premium</p>
            </div>
            <p className="text-xs text-muted-foreground">Verified artist</p>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 font-medium">
          Ask for Quote
        </Button>
      </CardContent>
    </Card>
  )
}
