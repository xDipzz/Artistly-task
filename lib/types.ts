export interface Artist {
  id: string
  name: string
  category: string[]
  priceRange: string
  location: string
  bio: string
  languages: string[]
  image: string
  rating: number
  experience: string
}

export interface FilterState {
  categories: string[]
  locations: string[]
  priceRanges: string[]
}
