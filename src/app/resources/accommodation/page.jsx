import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Home, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { ACCOMMODATION_LISTINGS, ACCOMMODATION_GUIDES } from "@/lib/accommodation-data";

export default function AccommodationPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("options");

    const filteredListings = ACCOMMODATION_LISTINGS.filter(listing =>
        listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-primary text-white pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Home Away From Home</h1>
                    <p className="text-xl text-white/90 mb-8">Verified listings, housing guides, and scam alerts for Indians abroad.</p>

                    <div className="bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
                        <div className="relative flex-1">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by city or university..."
                                className="pl-10 h-12 border-none focus-visible:ring-0 text-gray-900"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg">
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content: Listings */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Featured Listings</h2>
                            <span className="text-gray-500">{filteredListings.length} results</span>
                        </div>

                        <div className="grid gap-6">
                            {filteredListings.map(listing => (
                                <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
                                    <div className="w-full md:w-64 h-48 md:h-auto relative">
                                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                                        {listing.verified && (
                                            <Badge className="absolute top-3 left-3 bg-green-500 text-white gap-1">
                                                <ShieldCheck className="h-3 w-3" /> Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{listing.title}</h3>
                                                <span className="text-lg font-bold text-primary whitespace-nowrap">
                                                    {listing.currency === 'EUR' ? '€' : listing.currency === 'GBP' ? '£' : '$'}
                                                    {listing.price}<span className="text-sm text-gray-500 font-normal">/mo</span>
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {listing.location}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <Badge variant="secondary" className="font-normal">{listing.type}</Badge>
                                                <Badge variant="secondary" className="font-normal">{listing.tenantType}</Badge>
                                                <Badge variant="outline" className="font-normal text-gray-500">{listing.duration}</Badge>
                                            </div>
                                            <p className="text-gray-600 text-sm line-clamp-2">{listing.description}</p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t flex justify-end">
                                            <Button variant="outline" className="text-primary hover:text-primary/90 hover:bg-primary/5">View Details</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Guides & Alerts */}
                    <div className="space-y-8">

                        {/* Scam Alert Widget */}
                        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                            <div className="flex items-center gap-2 text-red-600 mb-3">
                                <AlertTriangle className="h-5 w-5" />
                                <h3 className="font-bold">Scam Alert</h3>
                            </div>
                            <p className="text-sm text-red-700 mb-4">
                                Beware of listings asking for wire transfers before viewing. Always verify the landlord's identity.
                            </p>
                            <a href="#" className="text-xs font-semibold text-red-600 hover:underline">Read FTC Safety Tips &rarr;</a>
                        </div>

                        {/* Accommodation Guide */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <BookOpenIcon className="h-5 w-5 text-accent" />
                                Accommodation Guide
                            </h3>

                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                {ACCOMMODATION_GUIDES.map(guide => (
                                    <button
                                        key={guide.id}
                                        onClick={() => setActiveTab(guide.id)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeTab === guide.id
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {guide.title}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {ACCOMMODATION_GUIDES.find(g => g.id === activeTab)?.title}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {ACCOMMODATION_GUIDES.find(g => g.id === activeTab)?.content}
                                </p>
                            </div>
                        </div>

                        {/* Quick Tools */}
                        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-4">Tools</h3>
                            <div className="space-y-3">
                                <Button variant="outline" className="w-full justify-start bg-white hover:bg-indigo-50 border-indigo-200 text-indigo-700">
                                    <Home className="h-4 w-4 mr-2" /> Rent Calculator
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-white hover:bg-indigo-50 border-indigo-200 text-indigo-700">
                                    <Users className="h-4 w-4 mr-2" /> Roommate Finder
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

function BookOpenIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    )
}

function Users(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
