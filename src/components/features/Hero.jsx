"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  Search, MapPin, Calendar, Users, Home, Globe, Shield, Sparkles, 
  ChevronRight, ChevronLeft, X, Plus, Minus, MessageSquare, 
  Briefcase, GraduationCap, Heart, Utensils, Landmark, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // Ensure you have this or remove cn usage

// --- MOCK DATA FOR "SMART DISCOVERY" (Pillar 3) ---
const LIFESTYLE_TAGS = {
  stay: [
    { id: "temple", label: "Near Gurdwara/Temple", icon: Landmark },
    { id: "food", label: "Indian Grocery Nearby", icon: Utensils },
    { id: "veg", label: "Pure Veg Kitchen", icon: Utensils },
  ],
  travel: [
    { id: "student", label: "Student Groups", icon: GraduationCap },
    { id: "family", label: "Family Friendly", icon: Heart },
  ],
  events: [
    { id: "cultural", label: "Cultural Festival", icon: Sparkles },
    { id: "networking", label: "Professional", icon: Briefcase },
  ],
  community: [
    { id: "help", label: "New Arrival Help", icon: Heart },
  ]
}

const TRIP_TYPES = [
  { id: "leisure", label: "Vacation / Leisure", icon: Heart },
  { id: "family", label: "Visiting Family", icon: Users },
  { id: "work", label: "Work / Business", icon: Briefcase },
  { id: "student", label: "Student / Education", icon: GraduationCap },
]

export function Hero({ onSearch }) {
  /* -------------------- MODE -------------------- */
  const [mode, setMode] = useState("stay") // stay | events | travel | community

  /* -------------------- STATE -------------------- */
  const [location, setLocation] = useState("")
  // Date State
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  
  // Search Metadata
  const [indianHostsOnly, setIndianHostsOnly] = useState(true) // Pillar 2: Community Context
  const [tripType, setTripType] = useState("leisure") // Pillar 1: Trip Type
  const [selectedTags, setSelectedTags] = useState([]) // Pillar 3: Lifestyle Filters

  // Modals
  const [activeField, setActiveField] = useState(null) // 'location' | 'dates' | 'guests' | 'tripType'
  
  const [guestCount, setGuestCount] = useState({
    adults: 1,
    children: 0,
    infants: 0
  })

  /* -------------------- REFS -------------------- */
  const containerRef = useRef(null)

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveField(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  /* -------------------- HANDLERS -------------------- */
  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        mode,
        location,
        dates: { start: startDate, end: endDate },
        guests: guestCount,
        filters: {
          indianHostsOnly,
          tripType,
          tags: selectedTags
        }
      })
    }
    setActiveField(null)
  }

  const toggleTag = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    )
  }

  /* -------------------- HELPERS -------------------- */
  const formatDate = (date) => {
    if (!date) return null
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getTotalGuests = () => guestCount.adults + guestCount.children

  return (
    <div className="relative min-h-[90vh] bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex flex-col justify-center">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto mt-15 px-4">
        
        {/* Header Text */}
        <div className="text-center mb-10 space-y-4">
           {/* Pillar 2: Trust & Community Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-200 text-xs font-medium mb-4">
            <Shield className="w-3 h-3" />
            <span>Verified Community • 100% Secure</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Feels Like <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c92b26] to-[#c92b26]">Home,</span> <br />
            Wherever You Go.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Connect with verified Indian hosts, find cultural events, and meet travel buddies worldwide.
          </p>
        </div>

        {/* --- SEARCH COMPONENT START --- */}
        <div className="max-w-5xl mx-auto" ref={containerRef}>
          
          {/* 1. Mode Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-slate-800/50 backdrop-blur-md p-1 rounded-full border border-white/10 inline-flex">
              {[
                { id: "stay", label: "Stays", icon: Home },
                { id: "travel", label: "Travel Buddy", icon: Globe },
                { id: "events", label: "Events", icon: Sparkles },
                { id: "community", label: "Community", icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setMode(tab.id); setSelectedTags([]); }}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                    mode === tab.id 
                      ? "bg-white text-slate-900 shadow-lg" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Main Search Bar */}
          <div className="bg-white rounded-3xl shadow-2xl p-2 md:p-3 relative z-20">
            <div className="flex flex-col md:flex-row gap-2">
              
              {/* Field: Destination (Pillar 1) */}
              <div 
                className={cn(
                  "relative flex-1 p-3 rounded-2xl transition-all cursor-pointer border border-transparent",
                  activeField === 'location' ? "bg-slate-50 border-orange-200 shadow-sm" : "hover:bg-slate-50"
                )}
                onClick={() => setActiveField('location')}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 p-2 rounded-full text-orange-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase">Where</label>
                    <input 
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Search destinations..."
                      className="w-full bg-transparent border-none p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 font-medium"
                    />
                  </div>
                </div>

                {/* Location Suggestions */}
                {activeField === 'location' && (
                  <div className="absolute top-full left-0 mt-2 w-full md:w-[350px] bg-white rounded-2xl shadow-xl border border-slate-100 p-2 overflow-hidden z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-400">POPULAR WITH INDIANS</div>
                    {[
                      { city: "Toronto, Canada", tag: "Little India" },
                      { city: "Dubai, UAE", tag: "Large Community" },
                      { city: "London, UK", tag: "Southall Nearby" },
                      { city: "Melbourne, Australia", tag: "Student Hub" }
                    ].map((item, i) => (
                      <button key={i} onClick={(e) => { e.stopPropagation(); setLocation(item.city); setActiveField("dates"); }} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex justify-between items-center group">
                        <span className="font-medium text-slate-700">{item.city}</span>
                        <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full">{item.tag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field: Dates (Working Custom Picker) */}
              {mode !== 'community' && (
                <div 
                  className={cn(
                    "relative flex-1 p-3 rounded-2xl transition-all cursor-pointer border border-transparent",
                    activeField === 'dates' ? "bg-slate-50 border-orange-200 shadow-sm" : "hover:bg-slate-50"
                  )}
                  onClick={() => setActiveField('dates')}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase">When</label>
                      <div className="text-slate-900 font-medium text-sm">
                        {startDate ? `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : '...'}` : 'Add dates'}
                      </div>
                    </div>
                  </div>

                  {/* CUSTOM DATE PICKER MODAL */}
                  {activeField === 'dates' && (
                    <DatePicker 
                      startDate={startDate} 
                      endDate={endDate} 
                      onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                        if(start && end) setActiveField("tripType"); // Auto advance
                      }} 
                    />
                  )}
                </div>
              )}

              {/* Field: Trip Type (Pillar 1 - Context) */}
              <div 
                 className={cn(
                  "relative flex-1 p-3 rounded-2xl transition-all cursor-pointer border border-transparent hidden md:block",
                  activeField === 'tripType' ? "bg-slate-50 border-orange-200 shadow-sm" : "hover:bg-slate-50"
                )}
                onClick={() => setActiveField('tripType')}
              >
                 <div className="flex items-center gap-3">
                    <div className="bg-purple-50 p-2 rounded-full text-purple-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase">Why are you going?</label>
                      <div className="text-slate-900 font-medium text-sm capitalize">
                        {TRIP_TYPES.find(t => t.id === tripType)?.label || "Select"}
                      </div>
                    </div>
                  </div>

                  {/* Trip Type Dropdown */}
                  {activeField === 'tripType' && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                      {TRIP_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={(e) => { e.stopPropagation(); setTripType(type.id); setActiveField("guests"); }}
                          className={cn(
                            "w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors",
                            tripType === type.id ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50 text-slate-700"
                          )}
                        >
                          <type.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              {/* Field: Guests/People */}
              <div 
                className={cn(
                  "relative flex-1 p-3 rounded-2xl transition-all cursor-pointer border border-transparent",
                  activeField === 'guests' ? "bg-slate-50 border-orange-200 shadow-sm" : "hover:bg-slate-50"
                )}
                onClick={() => setActiveField('guests')}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-full text-slate-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase">Who</label>
                    <div className="text-slate-900 font-medium text-sm">
                      {getTotalGuests()} Guest{getTotalGuests() > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <Button 
                  onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                  className="absolute right-2 top-2 bottom-2 aspect-square rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg"
                >
                  <Search className="w-5 h-5" />
                </Button>

                {/* Guest Modal */}
                {activeField === 'guests' && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 cursor-default" onClick={e => e.stopPropagation()}>
                    <div className="space-y-4">
                      {['Adults', 'Children', 'Infants'].map((type) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{type}</span>
                          <div className="flex items-center gap-3">
                            <button 
                              className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50"
                              onClick={() => setGuestCount(p => ({...p, [type.toLowerCase()]: Math.max(0, p[type.toLowerCase()] - 1)}))}
                              disabled={guestCount[type.toLowerCase()] === 0}
                            ><Minus className="w-3 h-3" /></button>
                            <span className="w-4 text-center text-sm">{guestCount[type.toLowerCase()]}</span>
                            <button 
                              className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                              onClick={() => setGuestCount(p => ({...p, [type.toLowerCase()]: p[type.toLowerCase()] + 1}))}
                            ><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. The "Trust & Lifestyle" Bar (Pillars 2 & 3) */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 px-2">
            
            {/* Pillar 2: "Show Indian Hosts Only" Toggle */}
            <div 
              className="flex items-center gap-3 bg-slate-800/40 backdrop-blur-sm p-2 pr-4 rounded-full border border-white/10 cursor-pointer transition-colors hover:bg-slate-800/60"
              onClick={() => setIndianHostsOnly(!indianHostsOnly)}
            >
              <div className={cn(
                "w-10 h-6 rounded-full relative transition-colors duration-300",
                indianHostsOnly ? "bg-[#c92b26]" : "bg-slate-600"
              )}>
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                  indianHostsOnly ? "left-5" : "left-1"
                )} />
              </div>
              <span className="text-sm font-medium text-white">Show Indian Hosts Only</span>
            </div>

            {/* Pillar 3: Lifestyle Tags (Dynamic based on Mode) */}
            <div className="flex flex-wrap justify-center gap-2">
              {LIFESTYLE_TAGS[mode]?.map((tag) => {
                const isActive = selectedTags.includes(tag.id)
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                      isActive 
                        ? "bg-orange-500/20 text-orange-200 border-orange-500/50" 
                        : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                    )}
                  >
                    <tag.icon className="w-3 h-3" />
                    {tag.label}
                    {isActive && <Check className="w-3 h-3 ml-1" />}
                  </button>
                )
              })}
            </div>
          </div>

        </div>
        {/* --- SEARCH COMPONENT END --- */}

      </div>
    </div>
  )
}

/* ---------------------------------------------------------
   CUSTOM COMPONENT: Lightweight Date Picker
   (Implemented to ensure functionality without external deps)
--------------------------------------------------------- */
function DatePicker({ startDate, endDate, onChange }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Helper: Get days in month
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  
  // Helper: Generate calendar grid
  const generateDays = (year, month) => {
    const days = []
    const firstDay = new Date(year, month, 1).getDay()
    const totalDays = getDaysInMonth(year, month)
    
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i))
    return days
  }

  const handleDateClick = (date, e) => {
    e.stopPropagation()
    if (!startDate || (startDate && endDate)) {
      onChange(date, null)
    } else {
      if (date < startDate) {
        onChange(date, startDate)
      } else {
        onChange(startDate, date)
      }
    }
  }

  const nextMonth = (e) => { e.stopPropagation(); setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1))) }
  const prevMonth = (e) => { e.stopPropagation(); setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1))) }

  const renderMonth = (offset = 0) => {
    const displayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    const days = generateDays(displayDate.getFullYear(), displayDate.getMonth())

    return (
      <div className="w-64">
        <div className="text-center font-bold mb-2 text-slate-800">
          {displayDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-xs text-slate-400">{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            if (!d) return <div key={i} />
            const isSelected = (startDate && d.toDateString() === startDate.toDateString()) || (endDate && d.toDateString() === endDate.toDateString())
            const isInRange = startDate && endDate && d > startDate && d < endDate
            
            return (
              <button
                key={i}
                onClick={(e) => handleDateClick(d, e)}
                className={cn(
                  "w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors",
                  isSelected ? "bg-slate-900 text-white" : isInRange ? "bg-slate-100 text-slate-900" : "hover:bg-slate-100 text-slate-700"
                )}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div 
      className="absolute top-full left-0 md:-left-12 mt-4 bg-white rounded-3xl shadow-xl border border-slate-100 p-6 z-50 flex gap-8 animate-in fade-in zoom-in-95 cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={prevMonth} className="absolute left-4 top-6 p-1 hover:bg-slate-100 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
      <button onClick={nextMonth} className="absolute right-4 top-6 p-1 hover:bg-slate-100 rounded-full"><ChevronRight className="w-4 h-4" /></button>
      
      <div className="hidden md:block">{renderMonth(0)}</div>
      <div className="block md:hidden">{renderMonth(0)}</div> {/* Show 1 on mobile */}
      <div className="hidden md:block">{renderMonth(1)}</div> {/* Show 2 on desktop */}
    </div>
  )
}