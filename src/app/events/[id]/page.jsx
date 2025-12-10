"use client"

import React, { useState, useEffect, useCallback, useMemo, memo } from "react"
import { useParams, Link } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { MOCK_EVENTS, EVENT_RULES } from "@/lib/mock-events"
import { 
    Calendar, MapPin, Clock, Users, Shield, ArrowLeft, Share2, Heart, MessageCircle, 
    Globe, Star, CheckCircle, TrendingUp, Award, Camera, Ticket, ExternalLink, 
    UserPlus, Facebook, Twitter, Linkedin, Copy, Check 
} from "lucide-react"

// Memoized sub-components to prevent unnecessary re-renders
const TabButton = memo(({ tab, activeTab, onClick }) => (
    <button
        onClick={() => onClick(tab)}
        className={`flex-1 min-w-[100px] px-4 py-3 rounded-2xl font-medium capitalize transition-all duration-300 relative ${
            activeTab === tab
            ? 'text-white bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg transform scale-105'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
    >
        {tab}
        {activeTab === tab && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></span>
        )}
    </button>
))

const ShareMenu = memo(({ showShareMenu, copiedLink, onCopyLink }) => (
    showShareMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-3 z-30 animate-fade-in">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors rounded-xl mx-2">
                <Facebook className="h-4 w-4 text-blue-600" /> Facebook
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors rounded-xl mx-2">
                <Twitter className="h-4 w-4 text-blue-400" /> Twitter
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors rounded-xl mx-2">
                <Linkedin className="h-4 w-4 text-blue-700" /> LinkedIn
            </a>
            <button 
                onClick={onCopyLink}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors w-full text-left rounded-xl mx-2"
            >
                {copiedLink ? (
                    <>
                        <Check className="h-4 w-4 text-green-500" /> 
                        <span className="text-green-600">Copied!</span>
                    </>
                ) : (
                    <>
                        <Copy className="h-4 w-4" /> Copy Link
                    </>
                )}
            </button>
        </div>
    )
))

const EventNotFound = memo(() => (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg">
                    <Calendar className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Event Not Found</h1>
                <p className="text-gray-600 mb-8 text-center">The event you are looking for does not exist or has been removed.</p>
                <Link to="/events" className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-xl transform hover:scale-105 rounded-2xl">
                        Back to Events
                    </Button>
                </Link>
            </div>
        </div>
        <Footer />
    </main>
))

const HeroSection = memo(({ event, isImageLoaded, setIsImageLoaded, isSaved, handleSaveToggle, showShareMenu, handleShareToggle }) => (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
            <img
                src={event.image}
                alt={event.title}
                className={`w-full h-full object-cover transition-all duration-1000 ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                onLoad={() => setIsImageLoaded(true)}
            />
        </div>
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
            <Link 
                to="/events" 
                className="inline-flex items-center gap-2 text-white bg-blue-900/90 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 hover:bg-blue-900 hover:scale-105 shadow-lg"
            >
                <ArrowLeft className="h-4 w-4" /> 
                <span className="hidden sm:inline">Back to Events</span>
                <span className="sm:hidden">Back</span>
            </Link>
            
            <div className="flex gap-2">
                <div className="relative">
                    <Button 
                        variant="outline" 
                        className="bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white border-white/20 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                        onClick={handleShareToggle}
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <ShareMenu showShareMenu={showShareMenu} />
                </div>
                <Button 
                    variant="outline" 
                    className={`${isSaved ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white'} border-white/20 rounded-full transition-all duration-300 hover:scale-105 shadow-lg`}
                    onClick={handleSaveToggle}
                >
                    <Heart className={`h-4 w-4 transition-all duration-300 ${isSaved ? 'fill-current scale-110' : ''}`} />
                </Button>
            </div>
        </div>

        {/* Event Title with Text Shadow for Readability */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12">
            <div className="container mx-auto max-w-7xl">
                <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full uppercase tracking-wider animate-pulse shadow-lg">
                            {event.type}
                        </span>
                        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Globe className="h-4 w-4 text-blue-900" />
                            <span className="text-sm text-blue-900 font-medium">{event.country}</span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-2xl animate-slide-up">
                        {event.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 md:gap-8 text-white drop-shadow-lg">
                        <div className="flex items-center gap-2 group bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Calendar className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm md:text-base font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 group bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Clock className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm md:text-base font-medium">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 group bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                            <MapPin className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm md:text-base font-medium">{event.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
))

const RegistrationBar = memo(({ isRegistered, handleRegister }) => (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-900 to-blue-800 shadow-2xl backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-white">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-5 w-5 text-red-400" />
                        <span className="font-bold">Limited Time Offer</span>
                    </div>
                    <p className="text-blue-200 text-sm">Early bird price: $29 (Regular price: $49)</p>
                </div>
                <Button 
                    onClick={handleRegister}
                    className={`font-bold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl ${
                        isRegistered 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                    }`}
                >
                    {isRegistered ? (
                        <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Registered
                        </>
                    ) : (
                        <>
                            <Ticket className="h-4 w-4 mr-2" />
                            Register Now
                        </>
                    )}
                </Button>
            </div>
        </div>
    </div>
))

const TabNavigation = memo(({ activeTab, handleTabClick }) => (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-2 border border-white/20">
        <div className="flex flex-wrap">
            {['overview', 'schedule', 'venue', 'reviews'].map((tab) => (
                <TabButton 
                    key={tab} 
                    tab={tab} 
                    activeTab={activeTab} 
                    onClick={handleTabClick} 
                />
            ))}
        </div>
    </div>
))

const OverviewTab = memo(({ event, visibleSections }) => (
    <div className="space-y-6 md:space-y-8">
        {/* About Section */}
        <section id="overview" className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 animate-section transition-all duration-700 ${
            visibleSections.has('overview') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">About this Event</h2>
                    <p className="text-gray-500 text-sm mt-1">Discover what makes this event special</p>
                </div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                <p className="text-gray-700 text-lg leading-relaxed">
                    {event.description}
                </p>
            </div>
        </section>

        {/* What's Included */}
        <section className={`bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 md:p-8 border border-red-200 animate-section transition-all duration-700 delay-100 ${
            visibleSections.has('included') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} id="included">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What's Included</h2>
                    <p className="text-gray-600 text-sm mt-1">Everything you need for the perfect experience</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    "Welcome drinks",
                    "Professional networking",
                    "Expert speakers",
                    "Digital certificate",
                    "Event photos",
                    "Follow-up materials"
                ].map((item, idx) => (
                    <div key={idx} className="group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-red-500/10 rounded-2xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <div className="relative flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-gray-800 font-medium">{item}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Event Gallery */}
        <section className={`animate-section transition-all duration-700 delay-200 ${
            visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} id="gallery">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Camera className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Event Gallery</h2>
                    <p className="text-gray-500 text-sm mt-1">Get a glimpse of past events</p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <Camera className="h-12 w-12 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <ExternalLink className="h-6 w-6 text-white mb-2" />
                                <p className="text-white text-sm font-medium">View Photo</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
))

const ScheduleTab = memo(({ visibleSections }) => {
    const scheduleItems = useMemo(() => [
        { time: '9:00 AM', title: 'Registration & Welcome Coffee', duration: '30 min', icon: '☕', color: 'from-amber-500 to-amber-600' },
        { time: '9:30 AM', title: 'Opening Keynote', duration: '45 min', icon: '🎤', color: 'from-blue-500 to-blue-600' },
        { time: '10:15 AM', title: 'Panel Discussion', duration: '60 min', icon: '💬', color: 'from-green-500 to-green-600' },
        { time: '11:15 AM', title: 'Networking Break', duration: '30 min', icon: '🤝', color: 'from-purple-500 to-purple-600' },
        { time: '11:45 AM', title: 'Workshop Sessions', duration: '90 min', icon: '🛠️', color: 'from-red-500 to-red-600' },
        { time: '1:00 PM', title: 'Lunch', duration: '60 min', icon: '🍽️', color: 'from-orange-500 to-orange-600' },
        { time: '2:00 PM', title: 'Guest Speaker', duration: '45 min', icon: '🎯', color: 'from-indigo-500 to-indigo-600' },
        { time: '2:45 PM', title: 'Q&A Session', duration: '30 min', icon: '❓', color: 'from-pink-500 to-pink-600' },
        { time: '3:15 PM', title: 'Closing Remarks', duration: '15 min', icon: '👋', color: 'from-teal-500 to-teal-600' },
        { time: '3:30 PM', title: 'Networking & Refreshments', duration: '60 min', icon: '🥂', color: 'from-cyan-500 to-cyan-600' }
    ], []);

    return (
        <div id="schedule" className="space-y-6 md:space-y-8">
            <section className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 animate-section transition-all duration-700 ${
                visibleSections.has('schedule') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                        <Clock className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Event Schedule</h2>
                        <p className="text-gray-500 text-sm mt-1">Plan your day with our detailed timeline</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {scheduleItems.map((item, idx) => (
                        <div key={idx} className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-100 ${
                            idx !== 0 ? 'mt-6' : ''
                        }`}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-shrink-0 text-center">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        <span className="text-xs font-bold">{item.time}</span>
                                        <span className="text-2xl mt-1">{item.icon}</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{item.duration}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
})

const VenueTab = memo(({ event, visibleSections }) => (
    <div id="venue" className="space-y-6 md:space-y-8">
        <section className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl overflow-hidden animate-section transition-all duration-700 ${
            visibleSections.has('venue') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
            <div className="relative h-64 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <MapPin className="h-20 w-20 text-gray-400" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-transparent h-32"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{event.location}</h3>
                </div>
            </div>
            <div className="p-6 md:p-8">
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Located in heart of city, this state-of-the-art venue offers modern facilities and easy accessibility via public transportation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <p className="font-semibold text-gray-900">Address</p>
                        <p className="text-gray-600 text-sm">123 Event Street</p>
                    </div>
                    <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                        <p className="font-semibold text-gray-900">Parking</p>
                        <p className="text-gray-600 text-sm">Free on-site</p>
                    </div>
                    <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <p className="font-semibold text-gray-900">Accessibility</p>
                        <p className="text-gray-600 text-sm">Wheelchair access</p>
                    </div>
                </div>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl rounded-2xl">
                    Get Directions
                </Button>
            </div>
        </section>

        {/* Venue Features */}
        <section className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 animate-section transition-all duration-700 delay-100 ${
            visibleSections.has('venue-features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} id="venue-features">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Venue Features</h2>
                    <p className="text-gray-500 text-sm mt-1">Everything you need for a successful event</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-gray-900 mb-3">Facilities</h3>
                    <ul className="space-y-2">
                        {["High-speed WiFi", "Audio-visual equipment", "Catering services", "Climate control"].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-gray-900 mb-3">Accessibility</h3>
                    <ul className="space-y-2">
                        {["Wheelchair ramps", "Accessible restrooms", "Elevator access", "Reserved parking"].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    </div>
))

const ReviewsTab = memo(({ event, visibleSections }) => {
    const reviews = useMemo(() => [
        { name: 'Alex Johnson', rating: 5, comment: 'Amazing event with great speakers and networking opportunities!', avatar: '👨‍💼', role: 'CEO' },
        { name: 'Maria Garcia', rating: 5, comment: 'Well organized and very informative. Looking forward to next one!', avatar: '👩‍💼', role: 'Designer' },
        { name: 'James Smith', rating: 4, comment: 'Great content and venue. Would have liked more interactive sessions.', avatar: '👨‍🎓', role: 'Student' },
        { name: 'Sarah Williams', rating: 5, comment: 'Exceeded my expectations! The workshops were particularly valuable.', avatar: '👩‍🔬', role: 'Researcher' },
        { name: 'Michael Brown', rating: 5, comment: 'Fantastic networking opportunities and insightful presentations.', avatar: '👨‍💻', role: 'Developer' }
    ], []);

    return (
        <div id="reviews" className="space-y-6 md:space-y-8">
            <section className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 animate-section transition-all duration-700 ${
                visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                        <Star className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Reviews</h2>
                        <p className="text-gray-500 text-sm mt-1">See what our attendees are saying</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 text-center">
                        <div className="flex justify-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-4xl font-bold text-gray-900">4.8</p>
                        <p className="text-gray-600">Based on 324 reviews</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 text-center">
                        <p className="text-4xl font-bold text-gray-900">{event.membersGoing.toLocaleString()}</p>
                        <p className="text-gray-600">Total Attendees</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white transition-all duration-300 hover:shadow-xl border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{review.name}</p>
                                        <p className="text-sm text-gray-500">{review.role}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">{idx + 1} week{idx > 0 ? 's' : ''} ago</p>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Review Form */}
            <section className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 animate-section transition-all duration-700 delay-100 ${
                visibleSections.has('review-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} id="review-form">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                        <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Leave a Review</h2>
                        <p className="text-gray-500 text-sm mt-1">Share your experience with others</p>
                    </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} className="p-1">
                                    <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Your Review</label>
                        <textarea 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            rows="4" 
                            placeholder="Share your experience with this event..."
                        ></textarea>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl rounded-2xl">
                        Submit Review
                    </Button>
                </div>
            </section>
        </div>
    )
})

const Sidebar = memo(({ event }) => (
    <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
            {/* Host Info Card */}
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                            <img src="/logo.jpeg" alt="Host" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-lg">NextKin Team</p>
                        <p className="text-sm text-gray-500">Event Organizer</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">4.9 Host Rating</span>
                </div>
                <Button className="w-full gap-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg rounded-2xl">
                    <MessageCircle className="h-4 w-4" />
                    Contact Host
                </Button>
            </div>

            {/* Attendees Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-red-500" />
                    Who's Going
                </h3>
                <div className="flex -space-x-4 mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full border-3 border-white shadow-lg hover:scale-110 transition-transform cursor-pointer"></div>
                    ))}
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white font-bold hover:scale-110 transition-transform cursor-pointer">
                        +{event.membersGoing - 5}
                    </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    {event.membersGoing.toLocaleString()} members and {event.guestsCount.toLocaleString()} guests attending
                </p>
                <Button className="w-full gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg rounded-2xl">
                    <UserPlus className="h-4 w-4" />
                    Invite Friends
                </Button>
            </div>

            {/* Map Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group cursor-pointer">
                    <MapPin className="h-16 w-16 text-gray-400 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-600 text-sm mb-4">{event.location}</p>
                    <Button variant="link" className="text-red-500 p-0 h-auto hover:text-red-600 transition-colors font-medium">
                        Get Directions →
                    </Button>
                </div>
            </div>

            {/* Community Card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <h3 className="font-bold text-xl mb-6">Join Our Community</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                        <p className="text-3xl font-bold">500K+</p>
                        <p className="text-blue-200 text-sm">Members</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold">100+</p>
                        <p className="text-blue-200 text-sm">Countries</p>
                    </div>
                </div>
                <div className="flex -space-x-2 mb-6 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="w-8 h-8 bg-white/20 rounded-full border-2 border-white hover:scale-110 transition-transform cursor-pointer"></div>
                    ))}
                </div>
                <Button className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl">
                    Follow on Social Media
                </Button>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 border border-red-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Award className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg">Trusted Platform</h4>
                        <p className="text-sm text-gray-600">Rated 4.8/5 by 100,000+ users</p>
                        <div className="flex items-center gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
))

export default function EventDetailsPage() {
    const { id } = useParams()
    const [isSaved, setIsSaved] = useState(false)
    const [showShareMenu, setShowShareMenu] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    const [visibleSections, setVisibleSections] = useState(new Set(['overview']))
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [copiedLink, setCopiedLink] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    
    // Memoize event lookup to prevent unnecessary recalculations
    const event = useMemo(() => {
        return Object.values(MOCK_EVENTS)
            .flat()
            .find(e => e.id === parseInt(id))
    }, [id])

    // Memoize rules lookup
    const rules = useMemo(() => {
        return EVENT_RULES[event?.country] || EVENT_RULES.default
    }, [event?.country])

    // Handle scroll animations with intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set([...prev, entry.target.id]))
                    }
                })
            },
            { threshold: 0.1 }
        )

        const sections = document.querySelectorAll('.animate-section')
        sections.forEach((section) => observer.observe(section))

        return () => {
            sections.forEach((section) => observer.unobserve(section))
        }
    }, [])

    // Add active tab to visible sections when it changes
    useEffect(() => {
        setVisibleSections(prev => new Set([...prev, activeTab]))
    }, [activeTab])

    // Memoize event handlers to prevent unnecessary re-renders
    const handleCopyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopiedLink(true)
            setTimeout(() => setCopiedLink(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }, [])

    const handleSaveToggle = useCallback(() => {
        setIsSaved(prev => !prev)
    }, [])

    const handleShareToggle = useCallback(() => {
        setShowShareMenu(prev => !prev)
    }, [])

    const handleRegister = useCallback(() => {
        setIsRegistered(true)
    }, [])

    const handleTabClick = useCallback((tab) => {
        setActiveTab(tab)
        // Immediately add the tab to visible sections
        setVisibleSections(prev => new Set([...prev, tab]))
    }, [])

    if (!event) {
        return <EventNotFound />
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            {/* Hero Section */}
            <HeroSection 
                event={event} 
                isImageLoaded={isImageLoaded} 
                setIsImageLoaded={setIsImageLoaded}
                isSaved={isSaved}
                handleSaveToggle={handleSaveToggle}
                showShareMenu={showShareMenu}
                handleShareToggle={handleShareToggle}
            />

            {/* Sticky Registration Bar */}
            <RegistrationBar 
                isRegistered={isRegistered} 
                handleRegister={handleRegister} 
            />

            <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        {/* Tab Navigation */}
                        <TabNavigation 
                            activeTab={activeTab} 
                            handleTabClick={handleTabClick} 
                        />

                        {/* Tab Content Container */}
                        <div className="min-h-[500px]">
                            {activeTab === 'overview' && <OverviewTab event={event} visibleSections={visibleSections} />}
                            {activeTab === 'schedule' && <ScheduleTab visibleSections={visibleSections} />}
                            {activeTab === 'venue' && <VenueTab event={event} visibleSections={visibleSections} />}
                            {activeTab === 'reviews' && <ReviewsTab event={event} visibleSections={visibleSections} />}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <Sidebar event={event} />
                </div>
            </div>
            <Footer />
        </main>
    )
}