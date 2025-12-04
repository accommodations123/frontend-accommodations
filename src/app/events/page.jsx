"use client"

import React from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { EventCard } from "@/components/events/EventCard"
import { EVENT_CATEGORIES, MOCK_EVENTS } from "@/lib/mock-events"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#00152d] pt-28 pb-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold text-[#f7eed7] mb-4">
                                Discover Amazing <span className="text-accent">Events</span>
                            </h1>
                            <p className="text-gray-400 text-lg max-w-xl mb-8">
                                Explore concerts, workshops, meetups, and more happening around you. Or create your own and bring people together.
                            </p>
                            <Link to="/events/host">
                                <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium shadow-lg shadow-accent/20 flex items-center gap-2">
                                    <Plus className="h-5 w-5" />
                                    Host an Event
                                </Button>
                            </Link>
                        </div>

                        {/* Hero Image/Illustration could go here */}
                        <div className="hidden md:block w-96 h-64 bg-white/5 rounded-2xl border border-white/10 p-4 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                                <Calendar className="h-16 w-16 text-white/80 mb-4" />
                                <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                                <p className="text-gray-300 text-sm mt-2">Join thousands of others in unique experiences.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Sections */}
            <div className="container mx-auto max-w-7xl px-4 py-12 space-y-16">
                {EVENT_CATEGORIES.map((category) => {
                    const events = MOCK_EVENTS[category.id] || []
                    if (events.length === 0) return null

                    return (
                        <section key={category.id} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    {category.title}
                                    <span className="text-sm font-normal text-gray-500 ml-2">({events.length})</span>
                                </h2>
                                <button className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
                                    View All <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Horizontal Scroll Container */}
                            <div className="relative group">
                                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                    {events.map((event) => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                    {/* Add more mock cards to fill scroll if needed */}
                                    {events.map((event) => (
                                        <EventCard key={`dup-${event.id}`} event={event} />
                                    ))}
                                </div>
                                {/* Fade gradients for scroll indication */}
                                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none md:hidden" />
                            </div>
                        </section>
                    )
                })}
            </div>

            <Footer />
        </main>
    )
}
