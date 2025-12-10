import React, { useState } from 'react';
import { Bell, Search, Globe, MapPin, AlignLeft, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { useCountry } from "@/context/CountryContext";
import { COUNTRIES } from "@/lib/mock-data";
import { AnimatePresence, motion } from 'framer-motion';

export function MobileHomeHeader({ onSearchClick }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCountryOpen, setCountryOpen] = useState(false);
    const { activeCountry, setCountry } = useCountry();

    return (
        <>
            <MobileSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="bg-primary pb-4 sticky top-0 z-40 shadow-lg border-b border-primary/20">
                {/* Top Bar: Location & Notification */}
                <div className="px-4 py-3 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-1 -ml-1 mt-0.5 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <AlignLeft className="w-6 h-6 text-white" />
                        </button>
                        <div>
                            <h2 className="text-sm font-bold text-white leading-tight">Gurugram</h2>
                            <div className="flex items-center gap-1 text-xs text-blue-100">
                                <MapPin className="w-3 h-3" />
                                112, Golf Course Road
                            </div>
                        </div>
                    </div>
                    <button className="relative p-1 hover:bg-white/10 rounded-full transition-colors">
                        <Bell className="w-6 h-6 text-white" />
                        <span className="absolute top-1 right-1.5 w-2 h-2 bg-accent rounded-full border border-primary"></span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-4 relative z-50">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex-1 h-12 bg-white border border-transparent rounded-xl flex items-center px-4 shadow-sm cursor-pointer active:scale-95 transition-transform"
                            onClick={onSearchClick}
                        >
                            <Search className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="flex-1 text-sm text-gray-400">Search Property</span>
                        </div>

                        {/* Country Selector (Globe) */}
                        <div className="relative">
                            <button
                                onClick={() => setCountryOpen(!isCountryOpen)}
                                className="h-12 w-12 flex items-center justify-center bg-white border border-transparent rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-all text-primary"
                            >
                                <Globe className="w-5 h-5" />
                            </button>

                            <AnimatePresence>
                                {isCountryOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setCountryOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 overflow-hidden ring-1 ring-black/5"
                                        >
                                            <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                                <p className="text-xs font-bold text-gray-500 uppercase">Select Country</p>
                                            </div>
                                            {COUNTRIES.map((country) => (
                                                <button
                                                    key={country.code}
                                                    className={cn(
                                                        "w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors",
                                                        activeCountry.code === country.code ? "text-primary bg-primary/5 font-bold" : "text-gray-700"
                                                    )}
                                                    onClick={() => {
                                                        setCountry(country);
                                                        setCountryOpen(false);
                                                    }}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        {country.flag.startsWith('/') ? (
                                                            <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded-sm border border-gray-100" />
                                                        ) : (
                                                            <span className="text-lg">{country.flag}</span>
                                                        )}
                                                        {country.name}
                                                    </span>
                                                    {activeCountry.code === country.code && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    )}
                                                </button>
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
