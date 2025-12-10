"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroEventSlider } from "@/components/events/HeroEventSlider"
import { EVENT_CATEGORIES, MOCK_EVENTS } from "@/lib/mock-events"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, ChevronRight, Globe, MapPin, Users, Search, Filter, TrendingUp, Star, ArrowRight, Sparkles, Clock, Award, Shield, Zap, Grid, List, Heart, Share2, User, MessageCircle, Bookmark } from "lucide-react"
import { Link } from "react-router-dom"

// Constants for better maintainability
const ANIMATION_DURATION = 300
const SCROLL_THRESHOLD = 50
const VISIBILITY_THRESHOLD = 0.8
const DEBOUNCE_DELAY = 100

// Memoized components for performance
const EventCard = React.memo(({ event, viewMode, onViewDetails, index }) => {
  return (
    <div 
      className={`${
        viewMode === "list" ? "flex flex-col sm:flex-row gap-4" : ""
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm ${
        viewMode === "list" ? "flex-1 flex" : ""
      } bg-white transition-all duration-300`}>
        {/* Card Image */}
        <div className={`relative ${viewMode === "list" ? "w-full sm:w-1/3 h-48 sm:h-auto" : "w-full h-48 sm:h-56"} overflow-hidden`}>
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2 sm:px-3 py-1 bg-[#ff0000] text-white text-xs font-bold rounded-full shadow-lg">
              {event.type}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
              <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
          {event.price && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 font-bold rounded-lg shadow-lg text-sm">
                ${event.price}
              </span>
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className={`p-4 sm:p-5 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">{event.location}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{event.description}</p>
            
            {/* Event Stats */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-600">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-600">{Math.floor(Math.random() * 500) + 100} attending</span>
              </div>
            </div>
            
            {/* Organizer */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Organized by</p>
                <p className="text-sm font-medium text-gray-900">{event.organizer || "Event Organizer"}</p>
              </div>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs sm:text-sm text-gray-600 ml-1">({Math.floor(Math.random() * 100) + 50})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{Math.floor(Math.random() * 50) + 10}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={() => onViewDetails(event.id)}
              className="flex-1 bg-[#ff0000] hover:bg-[#cc0000] text-white rounded-lg py-2 text-xs sm:text-sm font-medium transition-all duration-200"
            >
              View Details
            </Button>
            <Button variant="outline" className="px-3 sm:px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

const HorizontalEventCard = React.memo(({ event, onViewDetails, index }) => {
  return (
    <div 
      className="flex-shrink-0 w-72 sm:w-80"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm bg-white h-full transition-all duration-300">
        {/* Event Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2 sm:px-3 py-1 bg-[#ff0000] text-white text-xs font-bold rounded-full shadow-lg">
              {event.type}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
              <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
          {event.price && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 font-bold rounded-lg shadow-lg text-sm">
                ${event.price}
              </span>
            </div>
          )}
        </div>
        
        {/* Event Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            <span className="text-xs sm:text-sm text-gray-600">{event.location}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{event.description}</p>
          
          {/* Event Stats */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">{Math.floor(Math.random() * 500) + 100} attending</span>
            </div>
          </div>
          
          {/* Organizer */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Organized by</p>
              <p className="text-sm font-medium text-gray-900">{event.organizer || "Event Organizer"}</p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs sm:text-sm text-gray-600 ml-1">({Math.floor(Math.random() * 100) + 50})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{Math.floor(Math.random() * 50) + 10}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={() => onViewDetails(event.id)}
              className="flex-1 bg-[#ff0000] hover:bg-[#cc0000] text-white rounded-lg py-2 text-xs sm:text-sm font-medium transition-all duration-200"
            >
              View Details
            </Button>
            <Button variant="outline" className="px-3 sm:px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

const FeatureCard = React.memo(({ icon, title, description }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ff0000]/10 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  )
})

const TrustBadge = React.memo(({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#ff0000]/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
})

const StatItem = React.memo(({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs sm:text-sm text-gray-300">{label}</div>
    </div>
  )
})

export default function EventsPage() {
    const navigate = useNavigate()
    const [activeFilter, setActiveFilter] = useState("all")
    const [isScrolled, setIsScrolled] = useState(false)
    const [visibleSections, setVisibleSections] = useState(new Set())
    const [searchQuery, setSearchQuery] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [viewMode, setViewMode] = useState("grid")
    const [selectedFilters, setSelectedFilters] = useState({
        date: "",
        price: "",
        location: "",
        category: ""
    })
    
    // Memoized calculations for performance
    const totalEvents = useMemo(() => Object.values(MOCK_EVENTS).flat().length, [])
    const featuredEvents = useMemo(() => Object.values(MOCK_EVENTS).flat().slice(0, 5), [])
    
    // Debounced scroll handler for performance
    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
        
        // Check which sections are visible for animation
        const sections = document.querySelectorAll('.animate-section')
        const newVisibleSections = new Set()
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect()
            if (rect.top < window.innerHeight * VISIBILITY_THRESHOLD) {
                newVisibleSections.add(section.id)
            }
        })
        
        setVisibleSections(newVisibleSections)
    }, [])
    
    useEffect(() => {
        let timeoutId
        const debouncedHandleScroll = () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(handleScroll, DEBOUNCE_DELAY)
        }
        
        window.addEventListener('scroll', debouncedHandleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll)
            clearTimeout(timeoutId)
        }
    }, [handleScroll])

    const handleFilterChange = useCallback((filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }, [])

    const clearFilters = useCallback(() => {
        setSelectedFilters({
            date: "",
            price: "",
            location: "",
            category: ""
        })
        setActiveFilter("all")
    }, [])

    const hasActiveFilters = useMemo(() => 
        Object.values(selectedFilters).some(value => value !== ""), 
        [selectedFilters]
    )

    // Function to navigate to event details
    const handleViewDetails = useCallback((eventId) => {
        navigate(`/events/${eventId}`)
    }, [navigate])

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-[#00152d] pt-28 pb-20 px-4 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i} 
                                className="absolute rounded-full bg-[#ff0000] animate-pulse"
                                style={{
                                    width: Math.random() * 100 + 50 + 'px',
                                    height: Math.random() * 100 + 50 + 'px',
                                    left: Math.random() * 100 + '%',
                                    top: Math.random() * 100 + '%',
                                    animationDelay: Math.random() * 5 + 's',
                                    animationDuration: Math.random() * 10 + 10 + 's'
                                }}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left max-w-2xl animate-fade-in">
                            <div className="inline-flex items-center gap-2 bg-[#ff0000]/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-[#ff0000]/20 hover:bg-[#ff0000]/20 transition-all duration-300 transform hover:scale-105">
                                <Globe className="h-4 w-4 text-[#ff0000]" />
                                <span className="text-white text-sm font-medium">Connecting {totalEvents.toLocaleString()}+ Events Worldwide</span>
                            </div>
                            
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Discover Amazing <span className="text-[#ff0000]">Events</span>
                            </h1>
                            
                            <p className="text-gray-300 text-base md:text-lg max-w-xl mb-8">
                                Explore concerts, workshops, meetups, and more happening around the world. Join millions of people creating memorable experiences.
                            </p>
                            
                            {/* Search Bar */}
                            <div className="relative mb-8 max-w-lg mx-auto lg:mx-0 group">
                                <input
                                    type="text"
                                    placeholder="Search events by name, location, or category..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-5 py-3 pl-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-[#ff0000] transition-all duration-300 group-hover:bg-white/15"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                                <Link to="/events/host">
                                    <Button className="h-12 px-6 sm:px-8 bg-[#ff0000] hover:bg-[#cc0000] text-white rounded-xl font-medium shadow-lg shadow-[#ff0000]/25 flex items-center gap-2 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                                        <Plus className="h-5 w-5" />
                                        Host an Event
                                    </Button>
                                </Link>
                                
                                <Button variant="outline" className="h-12 px-6 sm:px-8 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    Browse Calendar
                                </Button>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-white">
                                <div className="flex items-center gap-2 hover:text-[#ff0000] transition-colors duration-300 cursor-pointer group">
                                    <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-sm">2M+ Members</span>
                                </div>
                                <div className="flex items-center gap-2 hover:text-[#ff0000] transition-colors duration-300 cursor-pointer group">
                                    <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-sm">120+ Countries</span>
                                </div>
                                <div className="flex items-center gap-2 hover:text-[#ff0000] transition-colors duration-300 cursor-pointer group">
                                    <Star className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-sm">4.8 Rating</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Slider */}
                        <div className="w-full lg:w-1/2 animate-slide-in-right">
                            <HeroEventSlider events={featuredEvents} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Filter Section */}
            <div className={`bg-white py-4 sm:py-6 px-4 sticky top-16 z-20 shadow-md transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Category Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                            <button 
                                onClick={() => setActiveFilter("all")}
                                className={`px-3 sm:px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm ${
                                    activeFilter === "all" 
                                    ? "bg-[#00152d] text-white shadow-md" 
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                <Grid className="h-4 w-4" />
                                All Events
                            </button>
                            
                            {EVENT_CATEGORIES.map((category) => (
                                <button 
                                    key={category.id}
                                    onClick={() => setActiveFilter(category.id)}
                                    className={`px-3 sm:px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm ${
                                        activeFilter === category.id 
                                        ? "bg-[#ff0000] text-white shadow-md" 
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {category.icon && <span className="text-lg">{category.icon}</span>}
                                    {category.title}
                                </button>
                            ))}
                        </div>
                        
                        {/* Filter Controls */}
                        <div className="flex items-center gap-2">
                            {/* View Mode Toggle */}
                            <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-md transition-all duration-300 ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                                >
                                    <Grid className="h-4 w-4 text-gray-700" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md transition-all duration-300 ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                                >
                                    <List className="h-4 w-4 text-gray-700" />
                                </button>
                            </div>
                            
                            {/* More Filters Button */}
                            <Button 
                                variant="outline" 
                                className={`h-10 sm:h-12 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 relative ${
                                    hasActiveFilters 
                                    ? "bg-[#ff0000]/10 border-[#ff0000]/30 text-[#ff0000] hover:bg-[#ff0000]/20" 
                                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">Filters</span>
                                {hasActiveFilters && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff0000] text-white text-xs rounded-full flex items-center justify-center">
                                        {Object.values(selectedFilters).filter(v => v !== "").length}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                    
                    {/* Advanced Filters Panel */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in">
                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                {/* Date Filter */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <select 
                                        value={selectedFilters.date}
                                        onChange={(e) => handleFilterChange("date", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                                    >
                                        <option value="">Any Date</option>
                                        <option value="today">Today</option>
                                        <option value="tomorrow">Tomorrow</option>
                                        <option value="this-week">This Week</option>
                                        <option value="this-weekend">This Weekend</option>
                                        <option value="next-week">Next Week</option>
                                        <option value="this-month">This Month</option>
                                    </select>
                                </div>
                                
                                {/* Price Filter */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                    <select 
                                        value={selectedFilters.price}
                                        onChange={(e) => handleFilterChange("price", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                                    >
                                        <option value="">Any Price</option>
                                        <option value="free">Free</option>
                                        <option value="0-25">$0 - $25</option>
                                        <option value="25-50">$25 - $50</option>
                                        <option value="50-100">$50 - $100</option>
                                        <option value="100+">$100+</option>
                                    </select>
                                </div>
                                
                                {/* Location Filter */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <select 
                                        value={selectedFilters.location}
                                        onChange={(e) => handleFilterChange("location", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                                    >
                                        <option value="">Any Location</option>
                                        <option value="online">Online</option>
                                        <option value="nearby">Near Me</option>
                                        <option value="new-york">New York</option>
                                        <option value="london">London</option>
                                        <option value="tokyo">Tokyo</option>
                                        <option value="paris">Paris</option>
                                    </select>
                                </div>
                                
                                {/* Filter Actions */}
                                <div className="flex items-end gap-2">
                                    <Button 
                                        onClick={clearFilters}
                                        variant="outline" 
                                        className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300"
                                    >
                                        Clear
                                    </Button>
                                    <Button 
                                        className="px-4 py-2 bg-[#ff0000] hover:bg-[#cc0000] text-white rounded-lg transition-all duration-300"
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Trending Events Section */}
            <div id="trending" className={`container mx-auto max-w-7xl px-4 py-8 sm:py-12 animate-section transition-all duration-700 ${
                visibleSections.has('trending') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#00152d] flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-[#ff0000]" />
                        Trending Events
                        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff0000] animate-pulse" />
                    </h2>
                    <button className="text-sm font-medium text-[#ff0000] hover:text-[#cc0000] flex items-center gap-1 group transition-colors duration-300">
                        View All 
                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
                
                {/* Enhanced Event Cards - Grid Layout */}
                <div className={`grid gap-4 sm:gap-6 mb-12 sm:mb-16 ${
                    viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                    {featuredEvents.map((event, index) => (
                        <EventCard 
                            key={event.id} 
                            event={event}
                            viewMode={viewMode}
                            onViewDetails={handleViewDetails}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Event Sections */}
            <div className="container mx-auto max-w-7xl px-4 pb-8 sm:pb-12">
                {EVENT_CATEGORIES.map((category, categoryIndex) => {
                    const events = MOCK_EVENTS[category.id] || []
                    if (events.length === 0) return null

                    return (
                        <section 
                            key={category.id} 
                            id={category.id}
                            className={`space-y-4 sm:space-y-6 mb-8 sm:mb-16 animate-section transition-all duration-700 ${
                                visibleSections.has(category.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ animationDelay: `${categoryIndex * 100}ms` }}
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#00152d] flex items-center gap-2">
                                    {category.title}
                                    <span className="text-sm font-normal text-gray-500 ml-2">({events.length} events)</span>
                                </h2>
                                <button className="text-sm font-medium text-[#ff0000] hover:text-[#cc0000] flex items-center gap-1 group transition-colors duration-300">
                                    View All 
                                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Horizontal Scroll Container */}
                            <div className="relative">
                                <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 sm:pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                                    {events.map((event, index) => (
                                        <HorizontalEventCard 
                                            key={event.id} 
                                            event={event}
                                            onViewDetails={handleViewDetails}
                                            index={index}
                                        />
                                    ))}
                                </div>
                                {/* Fade gradients for scroll indication */}
                                <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                            </div>
                        </section>
                    )
                })}
            </div>

            <Footer />
        </main>
    )
}