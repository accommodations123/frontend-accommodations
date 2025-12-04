import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, User, Shield, Plane, MessageCircle } from "lucide-react";
import { TRAVEL_PLANS, SAFETY_TIPS } from "@/lib/travel-data";

export default function TravelPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPlans = TRAVEL_PLANS.filter(plan =>
        plan.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getBudgetColor = (budget) => {
        switch (budget) {
            case "High": return "bg-red-50 text-red-700 border-red-100";
            case "Moderate": return "bg-blue-50 text-blue-700 border-blue-100";
            case "Budget": return "bg-green-50 text-green-700 border-green-100";
            default: return "bg-gray-50 text-gray-700 border-gray-100";
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#07182A] text-white pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Travel Buddy</h1>
                    <p className="text-xl text-gray-300 mb-8">Connect with fellow Indian travelers, share costs, and explore the world together.</p>

                    <div className="bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2 max-w-2xl mx-auto relative z-10">
                        <div className="relative flex-1">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Where are you going?"
                                className="pl-10 h-12 border-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="h-12 px-8 bg-[#C93A30] hover:bg-[#a82f26] text-white font-semibold rounded-lg">
                            Search Trips
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content: Travel Plans */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-[#07182A]">Upcoming Trips</h2>
                            <Button className="bg-[#07182A] hover:bg-[#0b2540] text-white">
                                <Plane className="h-4 w-4 mr-2" /> Post a Trip
                            </Button>
                        </div>

                        {filteredPlans.map(plan => (
                            <div key={plan.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                <div className="flex flex-col sm:flex-row gap-6">
                                    {/* User Profile */}
                                    <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-2 min-w-[120px]">
                                        <img
                                            src={plan.user.image}
                                            alt={plan.user.name}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm group-hover:scale-105 transition-transform"
                                        />
                                        <div className="text-left sm:text-center">
                                            <h3 className="font-bold text-[#07182A] text-lg leading-tight">{plan.user.name}</h3>
                                            <p className="text-xs text-gray-500 font-medium mt-1">{plan.user.age} • {plan.user.from}</p>
                                        </div>
                                    </div>

                                    {/* Trip Details */}
                                    <div className="flex-1 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                                            <h3 className="text-xl font-bold text-[#07182A] flex items-center gap-2">
                                                <MapPin className="h-5 w-5 text-[#C93A30]" /> {plan.destination}
                                            </h3>
                                            <Badge variant="outline" className={`border ${getBudgetColor(plan.budget)}`}>
                                                {plan.budget} Budget
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium">{plan.dates}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Plane className="h-4 w-4 text-gray-400" />
                                                <span>{plan.type} Trip</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-4 italic text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            "{plan.lookingFor}"
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {plan.interests.map(interest => (
                                                <Badge key={interest} variant="secondary" className="bg-blue-50 text-[#07182A] hover:bg-blue-100 border border-blue-100 font-normal">
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>

                                        <Button className="w-full sm:w-auto bg-[#07182A] hover:bg-[#0b2540] text-white font-medium">
                                            Connect with {plan.user.name.split(' ')[0]}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar: Safety Tips & Community */}
                    <div className="space-y-8">

                        {/* Safety Widget */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 text-[#07182A] mb-6">
                                <Shield className="h-6 w-6 text-[#C93A30]" />
                                <h3 className="font-bold text-xl">Travel Safety Tips</h3>
                            </div>

                            <div className="space-y-6">
                                {SAFETY_TIPS.map((tip, index) => (
                                    <div key={tip.id} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 text-[#C93A30] flex items-center justify-center text-lg font-bold border border-red-100">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#07182A] text-sm mb-1 flex items-center gap-2">
                                                {tip.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Join Community Banner */}
                        <div className="bg-gradient-to-br from-[#07182A] to-[#1a3b5c] rounded-xl p-8 text-white text-center shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <Shield className="h-12 w-12 text-[#C93A30] mx-auto mb-4" />
                                <h3 className="font-bold text-2xl mb-3">Join the Community</h3>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    Get verified to unlock more features, see full profiles, and build trust with other travelers.
                                </p>
                                <Button className="w-full bg-[#C93A30] hover:bg-[#a82f26] text-white font-bold h-12 text-lg shadow-md">
                                    Get Verified Now
                                </Button>
                            </div>
                            {/* Decorative circle */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#C93A30]/20 rounded-full blur-2xl"></div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
