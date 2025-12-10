import React, { useState, useEffect } from 'react';
import { X, Mic, MapPin, Clock, ArrowUpRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function SearchOverlay({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('Rent');
    const [searchTerm, setSearchTerm] = useState('');

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    // const tabs = ['Buy', 'Rent', 'Commercial'];

    const recentSearches = [
        "Modern 2BHK Apartment - New York City",
        "3-Bed Family Home - Houston",
        "Tech-District Condo - San Francisco"
    ];

    const popularCities = [
        "New York City", "Los Angeles", "Chicago",
        "Houston", "Phoenix", "Philadelphia",
        "San Diego", "San Francisco", "Dallas", "Miami"
    ];

    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    // Real-time Search Effect
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                // Fetch listings matching location
                const res = await fetch(`http://localhost:5000/api/listings?location=${searchTerm}`);
                const response = await res.json();

                // Extract unique locations from results (checking response.data for array)
                const listings = response.data || [];
                const uniqueLocations = [...new Set(listings.map(item => item.location))];
                setSuggestions(uniqueLocations);
            } catch (err) {
                console.error("Search failed", err);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleSearch = (term) => {
        onClose();
        navigate(`/search?location=${encodeURIComponent(term)}`);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:w-[600px] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
                    >
                        {/* Header Section (Purple/Navy Brand) */}
                        <div className="bg-primary pt-safe pb-4 px-6 md:px-8 md:pt-8 text-white relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            {/* Tabs */}
                            {/* <div className="flex bg-white/10 p-1 rounded-xl w-fit mb-6 mt-8 md:mt-0 backdrop-blur-md">
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200",
                                            activeTab === tab
                                                ? "bg-white text-primary shadow-sm"
                                                : "text-white/70 hover:text-white"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div> */}

                            {/* Search Input */}
                            <div className="relative mt-12">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                                    placeholder="Enter Location (e.g. Hyderabad)"
                                    autoFocus
                                    className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white text-gray-900 placeholder:text-gray-400 outline-none font-medium shadow-lg"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <Mic className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6 md:px-8">

                            {/* Suggestions List (Dynamic) */}
                            {suggestions.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-gray-900 mb-4">Suggestions</h3>
                                    <div className="space-y-1">
                                        {suggestions.map((loc, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSearch(loc)}
                                                className="w-full flex items-center gap-3 py-3 px-2 hover:bg-gray-100 rounded-xl transition-all text-left"
                                            >
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-700 font-medium">{loc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Current Location */}
                            <button className="flex items-center gap-3 text-primary font-bold mb-8 hover:opacity-80 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                Use my current location
                            </button>

                            {/* Last Searched */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 mb-4">Last Searched...</h3>
                                <div className="space-y-1">
                                    {recentSearches.map((item, idx) => (
                                        <button key={idx} className="w-full flex items-center justify-between py-3 px-2 hover:bg-white hover:rounded-xl transition-all group">
                                            <div className="flex items-center gap-3 text-gray-500 group-hover:text-primary transition-colors">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-primary" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Popular Cities */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-4">Popular Cities in USA</h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularCities.map((city) => (
                                        <button
                                            key={city}
                                            onClick={() => handleSearch(city)}
                                            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-primary hover:text-primary hover:shadow-sm transition-all flex items-center gap-1"
                                        >
                                            <span className="text-gray-300 text-lg leading-none">+</span> {city}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
