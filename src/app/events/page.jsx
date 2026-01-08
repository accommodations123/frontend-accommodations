"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { EVENT_CATEGORIES } from "@/lib/mock-events"
import { TrendingUp, Sparkles, ChevronRight } from "lucide-react"
import { useGetApprovedEventsQuery } from "@/store/api/hostApi"

// Components
import { EventsHero } from "./components/EventsHero"
import { EventsFilters } from "./components/EventsFilters"
import { EventsSection } from "./components/EventsSection"
import { EventCard } from "./components/EventCard"

// Constants for better maintainability
const SCROLL_THRESHOLD = 50
const VISIBILITY_THRESHOLD = 0.8
const DEBOUNCE_DELAY = 100

const EventsPage = () => {
  const navigate = useNavigate()
  const { data: apiEvents = [], isLoading, isError } = useGetApprovedEventsQuery()

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

  // Process events from API
  const eventsByCategory = useMemo(() => {
    if (!apiEvents || apiEvents.length === 0) return {};

    const grouped = {};
    EVENT_CATEGORIES.forEach(cat => {
      grouped[cat.id] = [];
    });

    apiEvents.forEach(event => {
      const categoryId = event.category?.toLowerCase() || 'other';

      const uiEvent = {
        id: event._id || event.id,
        title: event.title || event.eventName || "Untitled Event",
        description: event.description || "No description available",
        date: event.date || event.start_date,
        time: event.time || event.start_time,
        location: event.location || event.venue || "Location TBA",
        city: event.city,
        country: event.country,
        image: event.image || event.banner_image || (event.gallery_images && event.gallery_images.length > 0 ? event.gallery_images[0] : null),
        price: event.price || event.ticketPrice,
        organizer: event.organizer || event.hostName,
        type: event.type || "Event",
        category: categoryId,
        attendees_count: event.attendees_count || 0,
        reviews_count: event.reviews_count || 0,
        comments_count: event.comments_count || 0,
        host: event.Host || event.host || null,
        gallery_images: Array.isArray(event.gallery_images) ? event.gallery_images : [],
        included_items: Array.isArray(event.included_items) ? event.included_items : [],
        schedule: Array.isArray(event.schedule) ? event.schedule : []
      };

      if (grouped[categoryId]) {
        grouped[categoryId].push(uiEvent);
      } else {
        if (!grouped['other']) grouped['other'] = [];
        grouped['other'].push(uiEvent);
      }
    });

    return grouped;
  }, [apiEvents]);

  const allEventsList = useMemo(() => {
    return Object.values(eventsByCategory).flat();
  }, [eventsByCategory]);

  const totalEvents = useMemo(() => allEventsList.length, [allEventsList])
  const featuredEvents = useMemo(() => allEventsList.slice(0, 5), [allEventsList])

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD)

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
    // Initial check
    handleScroll()
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [handleScroll])

  const handleFilterChange = useCallback((filterType, value) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedFilters({ date: "", price: "", location: "", category: "" })
    setActiveFilter("all")
  }, [])

  const hasActiveFilters = useMemo(() =>
    Object.values(selectedFilters).some(value => value !== ""),
    [selectedFilters]
  )

  const handleViewDetails = useCallback((eventId) => {
    navigate(`/events/${eventId}`)
  }, [navigate])

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      <EventsHero
        totalEvents={totalEvents}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        featuredEvents={featuredEvents}
        isLoading={isLoading}
      />

      <EventsFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        eventCategories={EVENT_CATEGORIES}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        selectedFilters={selectedFilters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        isScrolled={isScrolled}
      />

      {/* Trending Events Section */}
      <div id="trending" className={`container mx-auto max-w-7xl px-4 py-8 sm:py-12 animate-section transition-all duration-700 ${visibleSections.has('trending') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#ff0000] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium tracking-wide">Fetching amazing events...</p>
          </div>
        ) : (
          <div className={`grid gap-4 sm:gap-6 mb-12 sm:mb-16 ${viewMode === "grid"
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
        )}
      </div>

      {/* Event Sections */}
      <div className="container mx-auto max-w-7xl px-4 pb-8 sm:pb-12">
        {EVENT_CATEGORIES.map((category, categoryIndex) => {
          const events = eventsByCategory[category.id] || []
          return (
            <EventsSection
              key={category.id}
              category={category}
              events={events}
              visibleSections={visibleSections}
              onViewDetails={handleViewDetails}
              categoryIndex={categoryIndex}
            />
          )
        })}
      </div>

      <Footer />
    </main>
  )
}

export default EventsPage