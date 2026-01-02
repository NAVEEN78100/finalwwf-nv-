"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Search, Calendar, User, Clock, ChevronLeft, Filter, TrendingUp, BookOpen } from "lucide-react"

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Posts", emoji: "📝" },
    { id: "recipes", name: "Recipes", emoji: "👨‍🍳" },
    { id: "reviews", name: "Reviews", emoji: "⭐" },
    { id: "trends", name: "Food Trends", emoji: "📈" },
    { id: "culture", name: "Food Culture", emoji: "🌍" },
    { id: "health", name: "Healthy Eating", emoji: "🥗" },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Plant-Based Cuisine in Urban Areas",
      excerpt:
        "Exploring how plant-based restaurants are revolutionizing city dining scenes with innovative dishes and sustainable practices.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "trends",
      image: "/plant-based-restaurant.png",
      featured: true,
      tags: ["Plant-Based", "Sustainability", "Urban Dining"],
      emoji: "🌱",
    },
    {
      id: 2,
      title: "Hidden Gems: 10 Local Restaurants You Must Try",
      excerpt:
        "Discover amazing local eateries that serve authentic flavors and create unforgettable dining experiences in your neighborhood.",
      author: "Mike Chen",
      date: "2024-01-12",
      readTime: "8 min read",
      category: "reviews",
      image: "/cozy-restaurant-interior.png",
      featured: false,
      tags: ["Local", "Hidden Gems", "Reviews"],
      emoji: "💎",
    },
    {
      id: 3,
      title: "Mastering the Art of Homemade Pizza",
      excerpt:
        "Learn professional techniques for creating restaurant-quality pizza at home, from dough preparation to perfect toppings.",
      author: "Chef Antonio",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "recipes",
      image: "/homemade-pizza-making.png",
      featured: true,
      tags: ["Pizza", "Homemade", "Italian"],
      emoji: "🍕",
    },
    {
      id: 4,
      title: "Street Food Culture Around the World",
      excerpt:
        "A culinary journey through different countries exploring the rich traditions and flavors of street food culture.",
      author: "Emily Davis",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "culture",
      image: "/placeholder-28t9s.png",
      featured: false,
      tags: ["Street Food", "Culture", "Travel"],
      emoji: "🌮",
    },
    {
      id: 5,
      title: "Healthy Meal Prep: Week-Long Planning Guide",
      excerpt:
        "Comprehensive guide to planning and preparing nutritious meals for the entire week, saving time and maintaining health goals.",
      author: "Dr. Lisa Park",
      date: "2024-01-05",
      readTime: "15 min read",
      category: "health",
      image: "/healthy-meal-prep.png",
      featured: false,
      tags: ["Meal Prep", "Healthy", "Planning"],
      emoji: "🥗",
    },
    {
      id: 6,
      title: "Coffee Culture: From Bean to Cup",
      excerpt:
        "Understanding the journey of coffee from farm to your cup, exploring different brewing methods and flavor profiles.",
      author: "James Wilson",
      date: "2024-01-03",
      readTime: "7 min read",
      category: "culture",
      image: "/coffee-brewing.png",
      featured: true,
      tags: ["Coffee", "Brewing", "Culture"],
      emoji: "☕",
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">WWF Blog</h1>
            </div>
            <div className="text-2xl font-bold text-orange-500">WWF</div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-orange-400 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            >
              {["📝", "🍕", "☕", "🥗", "🌮", "🍰", "📚", "✨"][i]}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Food Stories & Insights</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover culinary adventures, recipes, restaurant reviews, and food culture from around the world.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search articles, recipes, reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button variant="outline" className="h-12 px-6 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="h-10 px-4"
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-800">Featured Articles</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/blogs/${post.id}`}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-500 text-white">Featured</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 text-4xl">{post.emoji}</div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-800">All Articles</h2>
            </div>
            <p className="text-gray-600">{filteredPosts.length} articles found</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/blogs/${post.id}`}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      {post.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-orange-500 text-white">Featured</Badge>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 text-3xl">{post.emoji}</div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or category filters</p>
            </div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-12 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest food stories, recipes, and restaurant reviews.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <Input placeholder="Enter your email" className="flex-1 h-12 bg-white text-gray-800" />
            <Button className="bg-white text-orange-500 hover:bg-gray-100 h-12 px-8 font-semibold">Subscribe</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
