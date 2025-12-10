"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Calendar, Users, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCountry } from "@/context/CountryContext"

export function Hero({ onSearch }) {
    const { activeCountry } = useCountry()

    // Search States
    const [location, setLocation] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [guests, setGuests] = useState("1")

    // Suggestions State
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

    // Handle Search Submit
    const handleSearchClick = () => {
        if (onSearch) {
            onSearch({
                location,
                country: activeCountry.name,
                checkIn,
                checkOut,
                guests,
            })
        }
    }

    // Auto-complete Effect
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (location.length < 2) {
                setSuggestions([])
                return
            }
            setIsLoadingSuggestions(true)
            try {
                // Fetch listings matching location and country
                // Note: Ensure your backend supports filtering by 'country' in the suggestions endpoint if possible, 
                // or just fetch by location and filter client side. Using the generic listing search endpoint here.
                const res = await fetch(`http://localhost:5000/api/listings?location=${location}&country=${activeCountry?.name || ''}`)
                const data = await res.json()
                const uniqueLocs = [...new Set((data.data || []).map(l => l.location))]
                setSuggestions(uniqueLocs)
            } catch (err) {
                console.error("Suggestion fetch error", err)
            } finally {
                setIsLoadingSuggestions(false)
            }
        }
        const timer = setTimeout(fetchSuggestions, 300)
        return () => clearTimeout(timer)
    }, [location, activeCountry])

    return (
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Accommodation"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center pt-20 md:pt-0">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
                    Find Your Next <span className="text-accent">Kin</span> Connection
                    {activeCountry && <span className="block text-2xl mt-2 font-normal text-white/80">in {activeCountry.name}</span>}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto drop-shadow-md px-4 font-medium">
                    Helping Indians in the US, UK, Canada, Europe, Middle East and Asia find safe, community-friendly stays.
                </p>

                {/* Search Bar - Inline Form */}
                <div className="bg-background text-white rounded-full p-2 max-w-5xl mx-auto shadow-2xl flex flex-col md:flex-row items-center relative">

                    {/* Location Input */}
                    <div className="flex-1 w-full md:w-[35%] px-6 py-2 border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-200 relative">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-1.5 bg-indigo-50 rounded-full text-indigo-600">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Location</span>
                        </div>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => { setLocation(e.target.value); setShowSuggestions(true); }}
                            placeholder={`Search in ${activeCountry?.name || '...'}`}
                            className="w-full text-base font-bold text-white placeholder:text-gray-400 outline-none truncate"
                        />

                        {/* Suggestions Dropdown */}
                        {showSuggestions && (location.length > 1) && (
                            <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-xl shadow-xl overflow-hidden z-50 text-left border border-gray-100">
                                {isLoadingSuggestions ? (
                                    <div className="p-4 text-center text-gray-400 text-sm"><Loader2 className="w-4 h-4 animate-spin inline mr-2" />Loading...</div>
                                ) : suggestions.length > 0 ? (
                                    suggestions.map((loc, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setLocation(loc); setShowSuggestions(false); }}
                                            className="w-full px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center gap-2 border-b border-gray-50 last:border-0"
                                        >
                                            <MapPin className="w-3.5 h-3.5 text-gray-400" /> {loc}
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-gray-400 text-sm">No matches found in {activeCountry?.name}</div>
                                )}
                            </div>
                        )}
                        {/* Overlay to close suggestions */}
                        {showSuggestions && <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} style={{ pointerEvents: 'auto', background: 'transparent' }} />}
                    </div>

                    {/* Check In */}
                    <div className="flex-1 w-full md:w-[20%] px-4 py-2 border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-200 relative">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-1.5 bg-indigo-50 rounded-full text-indigo-600">
                                <Calendar className="h-4 w-4 " />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">From</span>
                        </div>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full text-sm font-bold outline-none "
                        />
                    </div>

                    {/* Check Out */}
                    <div className="flex-1 w-full md:w-[20%] px-4 py-2 border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-200 relative">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-1.5 bg-indigo-50 rounded-full text-indigo-600">
                                <Calendar className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">To</span>
                        </div>
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full text-sm font-bold text-white outline-none "
                        />
                    </div>

                    {/* Guests Input */}
                    <div className="flex-1 w-full md:w-[15%] px-4 py-2 relative">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-1.5 bg-indigo-50 rounded-full text-indigo-600">
                                <Users className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Guests</span>
                        </div>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full text-base font-bold text-white outline-none pl-1"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="p-2 w-full md:w-auto">
                        <Button
                            onClick={handleSearchClick}
                            className="w-full md:w-auto rounded-full h-14 px-8 bg-accent text-white text-lg font-bold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                        >
                            <Search className="h-5 w-5 mr-2" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
