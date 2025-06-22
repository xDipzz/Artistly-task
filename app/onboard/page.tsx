"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Sparkles, User, Mail, Phone, MapPin, FileText, Music, Globe, DollarSign, Award } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  bio: z.string().min(50, "Bio must be at least 50 characters").max(500, "Bio must not exceed 500 characters"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  priceRange: z.string().min(1, "Please select a price range"),
  experience: z.string().min(1, "Please select your experience level"),
})

type FormData = z.infer<typeof formSchema>

const categories = ["Singers", "Dancers", "Speakers", "DJs", "Musicians", "Comedians", "Magicians", "Actors"]
const languages = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
]
const priceRanges = ["₹5,000 - ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000+"]
const experienceLevels = [
  "Beginner (0-2 years)",
  "Intermediate (2-5 years)",
  "Experienced (5-10 years)",
  "Expert (10+ years)",
]

export default function OnboardPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      languages: [],
    },
  })

  const watchedCategories = watch("categories") || []
  const watchedLanguages = watch("languages") || []

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = watchedCategories
    if (checked) {
      setValue("categories", [...currentCategories, category])
    } else {
      setValue(
        "categories",
        currentCategories.filter((c) => c !== category),
      )
    }
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = watchedLanguages
    if (checked) {
      setValue("languages", [...currentLanguages, language])
    } else {
      setValue(
        "languages",
        currentLanguages.filter((l) => l !== language),
      )
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const existingArtists = JSON.parse(localStorage.getItem("submittedArtists") || "[]")
    const newArtist = {
      id: Date.now().toString(),
      ...data,
      status: "Pending Review",
      submittedAt: new Date().toISOString(),
    }
    localStorage.setItem("submittedArtists", JSON.stringify([...existingArtists, newArtist]))

    toast({
      title: "Application Submitted Successfully!",
      description: "We'll review your application and get back to you within 2-3 business days.",
    })

    reset()
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="absolute inset-0">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 glass-effect text-slate-200 border-slate-600/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Artist Registration
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            Join Artistly as a{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Performer
            </span>
          </h1>
          <p className="text-lg text-slate-400">Share your talent with event planners across India</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="modern-card">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-white font-playfair">Artist Registration Form</CardTitle>
            <CardDescription className="text-slate-400">
              Fill out the form below to get started. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-playfair">Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-300 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Enter your full name"
                      className="form-input mt-2"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your.email@example.com"
                      className="form-input mt-2"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-slate-300 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input id="phone" {...register("phone")} placeholder="+91 9876543210" className="form-input mt-2" />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-slate-300 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location *
                    </Label>
                    <Input
                      id="location"
                      {...register("location")}
                      placeholder="City, State"
                      className="form-input mt-2"
                    />
                    {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-slate-300 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Bio *
                  </Label>
                  <Textarea
                    id="bio"
                    {...register("bio")}
                    placeholder="Tell us about yourself, your experience, and what makes you unique... (50-500 characters)"
                    rows={4}
                    className="form-input mt-2 resize-none"
                  />
                  {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>}
                </div>
              </div>

              {/* Categories Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Music className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-playfair">Performance Categories *</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700"
                    >
                      <Checkbox
                        id={category}
                        checked={watchedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        className="border-slate-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                      <Label htmlFor={category} className="text-sm text-slate-300 cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.categories && <p className="text-red-400 text-sm">{errors.categories.message}</p>}
              </div>

              {/* Languages Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-playfair">Languages *</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {languages.map((language) => (
                    <div
                      key={language}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700"
                    >
                      <Checkbox
                        id={language}
                        checked={watchedLanguages.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                        className="border-slate-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <Label htmlFor={language} className="text-sm text-slate-300 cursor-pointer">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.languages && <p className="text-red-400 text-sm">{errors.languages.message}</p>}
              </div>

              {/* Price Range & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <Label htmlFor="priceRange" className="text-slate-300">
                      Fee Range *
                    </Label>
                  </div>
                  <Select onValueChange={(value) => setValue("priceRange", value)}>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Select your fee range" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range} className="text-slate-300 focus:bg-slate-700">
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.priceRange && <p className="text-red-400 text-sm mt-1">{errors.priceRange.message}</p>}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <Label htmlFor="experience" className="text-slate-300">
                      Experience Level *
                    </Label>
                  </div>
                  <Select onValueChange={(value) => setValue("experience", value)}>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level} className="text-slate-300 focus:bg-slate-700">
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full btn-primary text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Submit Application
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
