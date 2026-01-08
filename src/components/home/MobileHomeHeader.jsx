import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, MapPin, AlignLeft, Globe, X, Search } from 'lucide-react';
import { cn } from "@/lib/utils";
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { useCountry } from "@/context/CountryContext";
import { COUNTRIES } from "@/lib/mock-data";
import { AnimatePresence, motion } from 'framer-motion';

export function MobileHomeHeader({ onSearchClick }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCountryOpen, setCountryOpen] = useState(false);
    const { activeCountry, setCountry } = useCountry();

    // Helper to Get Country Code/Flag
    const getCountryCode = () => {
        if (!activeCountry) return "";
        if (activeCountry.code) return activeCountry.code;
        return "";
    };

    return (
        <>
            <MobileSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="bg-primary pb-2 sticky top-0 z-40 shadow-md border-b border-primary/20">
                <div className="px-4 py-3 flex items-center justify-between gap-4">

                    {/* Left: Logo (Sidebar Trigger) */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-white/20 shadow-sm active:scale-95 transition-transform"
                    >
                        <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                    </button>

                    {/* Middle: Brand & Location (Country Trigger) */}
                    <button
                        onClick={() => setCountryOpen(true)}
                        className="flex-1 flex flex-col items-start justify-center -space-y-0.5 text-left"
                    >
                        <h1 className="text-lg font-bold text-white leading-tight">NextKinLife</h1>
                        <div className="flex items-center gap-1.5 text-xs text-blue-100/90 font-medium bg-white/10 px-2 py-0.5 rounded-full mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-[120px]">
                                {activeCountry?.name || "Select Location"}
                            </span>
                        </div>
                    </button>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search Button */}
                        <button
                            onClick={onSearchClick}
                            className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-white"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Notifications */}
                        <button className="relative p-2.5 hover:bg-white/10 rounded-full transition-colors text-white">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-primary animate-pulse"></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Country/Location Selection Modal */}
            <AnimatePresence>
                {isCountryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-[60] flex items-end backdrop-blur-sm"
                        onClick={() => setCountryOpen(false)}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-full bg-white rounded-t-2xl max-h-[85vh] overflow-hidden flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                                <h2 className="text-lg font-bold text-gray-900">Select Location</h2>
                                <button
                                    onClick={() => setCountryOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Search Input (Mock) */}
                            <div className="p-4 bg-gray-50 border-b">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search countries..."
                                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="overflow-y-auto p-2">
                                <div className="grid grid-cols-1 gap-1">
                                    {COUNTRIES.map((country) => (
                                        <button
                                            key={country.code}
                                            className={cn(
                                                "flex items-center gap-4 p-3 rounded-xl text-left transition-all group",
                                                activeCountry?.code === country.code
                                                    ? "bg-primary/5 ring-1 ring-primary/20"
                                                    : "hover:bg-gray-50"
                                            )}
                                            onClick={() => {
                                                setCountry(country);
                                                setCountryOpen(false);
                                            }}
                                        >
                                            <div className="w-10 h-8 rounded shadow-sm overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center text-lg">
                                                {country.flag.startsWith('/') ? (
                                                    <img src={country.flag} alt={country.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>{country.flag}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className={cn(
                                                    "font-semibold text-sm",
                                                    activeCountry?.code === country.code ? "text-primary" : "text-gray-900"
                                                )}>
                                                    {country.name}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">
                                                    {country.communityCount || "100+"} communities
                                                </div>
                                            </div>
                                            {activeCountry?.code === country.code && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
