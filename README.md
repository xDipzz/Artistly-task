# Artistly.com - Premium Artist Booking Platform

## 🎭 Project Overview

Artistly.com is a sophisticated artist booking platform built with Next.js 13+ App Router, designed to connect event planners with exceptional performing artists across India. The platform features a modern dark artistic theme with advanced filtering, responsive design, and premium user experience.

## 🚀 Technical Stack

### Core Technologies
- **Framework**: Next.js 13+ (App Router)
- **Runtime**: React 18+ (Functional Components)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter (body), Playfair Display (headings)

### Development Tools
- **Package Manager**: npm/yarn
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Deployment**: Vercel Platform

## 📁 Project Structure

\`\`\`
artistly-platform/
├── app/                          # Next.js 13+ App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage with animated background
│   ├── globals.css              # Global styles and animations
│   ├── artists/                 # Artist listing page
│   │   └── page.tsx            # Artist grid with filtering
│   ├── onboard/                 # Artist onboarding
│   │   └── page.tsx            # Multi-step form
│   └── dashboard/               # Manager dashboard
│       └── page.tsx            # Admin interface
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   ├── Header.tsx               # Enhanced navigation
│   ├── Footer.tsx               # Site footer
│   ├── ArtistCard.tsx           # Artist display card
│   ├── FilterSection.tsx       # Advanced filtering
│   ├── ReusableTable.tsx       # Generic table component
│   └── theme-provider.tsx      # Dark theme provider
├── lib/                         # Utility functions
│   ├── data.ts                  # Mock data source
│   ├── types.ts                 # TypeScript interfaces
│   └── utils.ts                 # Helper functions
└── hooks/                       # Custom React hooks
    └── use-toast.ts            # Toast notification hook
\`\`\`

## 🎨 Design System

### Color Palette
\`\`\`css
/* Primary Gradients */
--gradient-purple-gold: linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%);
--gradient-emerald-purple: linear-gradient(135deg, #10b981 0%, #8b5cf6 100%);
--gradient-dark-artistic: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #581c87 100%);

/* Theme Colors */
--purple-primary: #8b5cf6;
--emerald-accent: #10b981;
--pink-secondary: #ec4899;
--cyan-highlight: #06b6d4;
\`\`\`

### Typography
- **Headings**: Playfair Display (serif, artistic)
- **Body**: Inter (sans-serif, readable)
- **Code**: JetBrains Mono (monospace)

### Spacing System
- **Base unit**: 4px (0.25rem)
- **Component padding**: 16px-24px
- **Section spacing**: 64px-80px
- **Container max-width**: 1280px (7xl)

## 🏗️ Architecture Patterns

### Component Architecture
\`\`\`typescript
// Functional Component Pattern
interface ComponentProps {
  data: DataType[]
  onAction: (item: DataType) => void
}

export default function Component({ data, onAction }: ComponentProps) {
  const [state, setState] = useState<StateType>(initialState)
  
  useEffect(() => {
    // Side effects
  }, [dependencies])
  
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  )
}
\`\`\`

### State Management
- **Local State**: `useState` for component-specific data
- **Side Effects**: `useEffect` for data fetching and subscriptions
- **Context**: `useContext` for theme and global state
- **Form State**: React Hook Form for complex forms

### Data Flow
\`\`\`
Mock Data (lib/data.ts) → Components → State → UI Rendering
                      ↓
                 Filter Logic → Conditional Rendering
\`\`\`

## 🎯 Core Features Implementation

### 1. Homepage with Animated Background
\`\`\`typescript
// Floating orbs animation
.floating-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}
\`\`\`

### 2. Advanced Filtering System
\`\`\`typescript
// Filter state management
const [filters, setFilters] = useState<FilterState>({
  categories: [],
  locations: [],
  priceRanges: [],
})

// Filtering logic with useMemo for performance
const filteredArtists = useMemo(() => {
  return artists.filter((artist) => {
    // Category filtering
    if (filters.categories.length > 0) {
      const hasMatchingCategory = artist.category.some(cat => 
        filters.categories.includes(cat)
      )
      if (!hasMatchingCategory) return false
    }
    // Additional filters...
    return true
  })
}, [filters, searchQuery])
\`\`\`

### 3. Reusable Table Component
\`\`\`typescript
interface ReusableTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  searchable?: boolean
}

// Generic table with sorting and filtering
export default function ReusableTable<T extends Record<string, any>>({
  data, columns, actions, searchable
}: ReusableTableProps<T>) {
  // Implementation with TypeScript generics
}
\`\`\`

### 4. Form Validation
\`\`\`typescript
// React Hook Form with Zod validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
})

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(formSchema)
})
\`\`\`

## 📱 Responsive Design

### Breakpoint System
\`\`\`css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
\`\`\`

### Mobile-First Approach
\`\`\`typescript
// Responsive grid example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Content adapts to screen size */}
</div>

// Mobile navigation
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
\`\`\`

## 🔧 Performance Optimizations

### Code Splitting
- **Route-based**: Automatic with Next.js App Router
- **Component-based**: Dynamic imports for heavy components
- **Image optimization**: Next.js Image component with lazy loading

### Memoization
\`\`\`typescript
// Expensive calculations cached
const filteredData = useMemo(() => {
  return data.filter(/* complex filtering logic */)
}, [data, filters])

// Callback memoization
const handleAction = useCallback((id: string) => {
  // Action handler
}, [dependencies])
\`\`\`

### Bundle Optimization
- **Tree shaking**: Automatic with Next.js
- **CSS purging**: Tailwind CSS removes unused styles
- **Font optimization**: Next.js font optimization

## 🎨 Animation System

### CSS Animations
\`\`\`css
/* Fade in up animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.artistic-hover {
  transition: all 0.3s ease;
}

.artistic-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
\`\`\`

### Staggered Animations
\`\`\`typescript
// Sequential animation delays
<div className="animate-fade-in-up animation-delay-200">
<div className="animate-fade-in-up animation-delay-400">
<div className="animate-fade-in-up animation-delay-600">
\`\`\`

## 🔒 Type Safety

### TypeScript Interfaces
\`\`\`typescript
interface Artist {
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

interface FilterState {
  categories: string[]
  locations: string[]
  priceRanges: string[]
}
\`\`\`

### Generic Components
\`\`\`typescript
// Type-safe generic table
function ReusableTable<T extends Record<string, any>>(
  props: ReusableTableProps<T>
): JSX.Element

// Type-safe event handlers
const handleFilterChange = (newFilters: FilterState) => void
\`\`\`

## 🚀 Deployment Configuration

### Vercel Deployment
\`\`\`json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
\`\`\`

### Environment Variables
\`\`\`bash
# .env.local
NEXT_PUBLIC_APP_URL=https://artistly.vercel.app
NEXT_PUBLIC_API_URL=https://api.artistly.com
\`\`\`

### Build Optimization
\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['placeholder.svg'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
\`\`\`

## 📊 Performance Metrics

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Bundle Size Analysis
\`\`\`bash
# Analyze bundle size
npm run build
npm run analyze
\`\`\`

## 🧪 Testing Strategy

### Component Testing
\`\`\`typescript
// Example test structure
describe('ArtistCard Component', () => {
  it('renders artist information correctly', () => {
    // Test implementation
  })
  
  it('handles click events properly', () => {
    // Event testing
  })
})
\`\`\`

### Integration Testing
- **API integration**: Mock API responses
- **Form validation**: Test error states
- **Navigation**: Route testing

## 🔄 State Management Patterns

### Local State Pattern
\`\`\`typescript
// Component-level state
const [loading, setLoading] = useState(false)
const [data, setData] = useState<DataType[]>([])
const [error, setError] = useState<string | null>(null)
\`\`\`

### Context Pattern
\`\`\`typescript
// Global state with Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
\`\`\`

## 📈 SEO Implementation

### Meta Tags
\`\`\`typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: "Artistly.com - Premium Artist Booking Platform",
  description: "Connect with exceptional performing artists for your events",
  keywords: "artist booking, event planning, performers, India",
  openGraph: {
    title: "Artistly.com - Premium Artist Booking Platform",
    description: "Connect with exceptional performing artists",
    images: ["/og-image.jpg"],
  },
}
\`\`\`

### Structured Data
\`\`\`typescript
// JSON-LD for rich snippets
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Artistly",
  "description": "Premium artist booking platform",
}
\`\`\`

## 🛠️ Development Workflow

### Setup Commands
\`\`\`bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
\`\`\`

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Husky**: Git hooks for quality gates

## 📚 Documentation Standards

### Component Documentation
\`\`\`typescript
/**
 * ArtistCard Component
 * 
 * Displays artist information in a card format with hover effects
 * 
 * @param artist - Artist data object
 * @returns JSX.Element
 */
export default function ArtistCard({ artist }: ArtistCardProps) {
  // Implementation
}
\`\`\`

### Function Documentation
\`\`\`typescript
/**
 * Filter artists based on search criteria
 * 
 * @param artists - Array of artist objects
 * @param filters - Filter criteria object
 * @param searchQuery - Search string
 * @returns Filtered array of artists
 */
const filterArtists = (
  artists: Artist[], 
  filters: FilterState, 
  searchQuery: string
): Artist[] => {
  // Implementation
}
\`\`\`

This technical documentation provides comprehensive coverage of the Artistly.com platform's architecture, implementation details, and development practices. The platform demonstrates modern React/Next.js development with TypeScript, advanced styling, and production-ready code quality.
