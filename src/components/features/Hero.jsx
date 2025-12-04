"use client"

import { Search, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
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
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto drop-shadow-md px-4 font-medium">
                    Helping Indians in the US, UK, Canada, Europe, Middle East and Asia find safe, community-friendly stays.
                </p>

                {/* Search Bar */}
                <div className="bg-background rounded-full p-2 max-w-4xl mx-auto shadow-2xl flex flex-col md:flex-row items-center">

                    {/* Location Input */}
                    <div className="flex-1 w-full md:w-auto px-6 py-3 border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-200 relative group">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-1.5 bg-indigo-50 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Location</span>
                        </div>
                        <Input
                            type="text"
                            placeholder="Where are you going?"
                            className="border-none shadow-none p-0 h-auto text-base font-medium text-gray-900 focus-visible:ring-0 placeholder:text-gray-400 w-full"
                        />
                    </div>

                    {/* Dates Input */}
                    <div className="flex-1 w-full md:w-auto px-6 py-3 border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-200 relative group">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-1.5 bg-indigo-50 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                <Calendar className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Dates</span>
                        </div>
                        <Input
                            type="text"
                            placeholder="Add dates"
                            className="border-none shadow-none p-0 h-auto text-base font-medium text-gray-900 focus-visible:ring-0 placeholder:text-gray-400 w-full"
                        />
                    </div>

                    {/* Guests Input */}
                    <div className="flex-1 w-full md:w-auto px-6 py-3 relative group">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-1.5 bg-indigo-50 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                <Users className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Guests</span>
                        </div>
                        <Input
                            type="text"
                            placeholder="Add guests"
                            className="border-none shadow-none p-0 h-auto text-base font-medium text-gray-900 focus-visible:ring-0 placeholder:text-gray-400 w-full"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="p-2 w-full md:w-auto">
                        <Button className="w-full md:w-auto rounded-full h-14 px-8 bg-accent cursor-pointer text-white text-lg font-bold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
                            <Search className="h-5 w-5 mr-2" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
