"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SearchFilters } from "@/components/features/SearchFilters"
import { ListingCard } from "@/components/features/ListingCard"
import { MapMock } from "@/components/features/MapMock"
import { Button } from "@/components/ui/button"
import { Map, List } from "lucide-react"
import { LISTINGS } from "@/lib/mock-data"

export default function SearchPage() {
    const [showMap, setShowMap] = React.useState(false)
    const [activeChip, setActiveChip] = React.useState("Students")

    // const chips = ["Students", "Working Professionals", "Families", "Indian Roommates", "Near Indian Stores", "Budget-Friendly"]

    return (
        <main className="min-h-screen bg-background pt-20">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="hidden md:block w-64 shrink-0">
                        <SearchFilters />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* 2. City Starter Collections (Top of results) */}
                        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {[
                                { title: "First-time in Toronto", subtitle: "For new immigrants", color: "bg-blue-600" },
                                { title: "MS Students in Dallas", subtitle: "Fall 2025 Batch", color: "bg-purple-600" },
                                { title: "Freshers in Bangalore", subtitle: "Tech corridor stays", color: "bg-green-600" },
                            ].map((collection, i) => (
                                <div key={i} className={`${collection.color} rounded-xl p-4 text-white cursor-pointer hover:scale-105 transition-transform shadow-lg`}>
                                    <h3 className="font-bold text-lg">{collection.title}</h3>
                                    <p className="text-white/80 text-sm">{collection.subtitle}</p>
                                </div>
                            ))}
                        </div> */}

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-white">
                                {LISTINGS.length} stays found
                            </h1>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowMap(!showMap)}
                                    className="gap-2"
                                >
                                    {showMap ? <List className="h-4 w-4" /> : <Map className="h-4 w-4" />}
                                    {showMap ? "Show List" : "Show Map"}
                                </Button>
                            </div>
                        </div>

                        {showMap ? (
                            <div className="h-[600px]">
                                <MapMock />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {LISTINGS.map((listing) => (
                                    <ListingCard key={listing.id} {...listing} />
                                ))}
                            </div>
                        )}

                        {/* 3. WhatsApp / Telegram Connect CTA */}
                        {/* <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center shadow-2xl">
                            <h2 className="text-2xl font-bold mb-2">Need help finding a room?</h2>
                            <p className="mb-6 text-white/90">Get the 3-5 best options for Indians in your city sent directly to your WhatsApp.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button className="bg-white text-green-700 hover:bg-gray-100 font-bold gap-2">
                                    <span className="text-lg">💬</span> Chat on WhatsApp
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                                    Fill "Help Me Find" Form
                                </Button>
                            </div>
                        </div> */}

                        {/* 4. Starter Guides */}
                        {/* <div className="mt-12">
                            <h2 className="text-xl font-bold text-white mb-4">Quick Guides for Newcomers</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "Where do Indians usually stay in New Jersey?", a: "Edison and Jersey City are top choices due to the high density of Indian stores, temples, and community events." },
                                    { q: "Average rent for a student room?", a: "$600 - $900 for a shared room, depending on proximity to the university." },
                                    { q: "Safety tips for new renters", a: "Always verify the host via video call before transferring money. Check for 'Verified' badges on NextKinLife." },
                                ].map((guide, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <h3 className="font-bold text-accent mb-1">{guide.q}</h3>
                                        <p className="text-gray-300 text-sm">{guide.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
