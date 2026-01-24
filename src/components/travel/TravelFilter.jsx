import React from "react";
import { Search, MapPin, Filter, X } from "lucide-react";
import { motion } from "framer-motion";

export default function TravelFilter({
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    onReset
}) {
    const hasActiveFilters = filters.country || filters.state || filters.city || searchQuery;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden mt-6 mb-12 border border-white/50 relative z-20"
        >
            <div className="p-6 lg:p-8">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-2 text-primary/60">
                            <Filter size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Refine Search</span>
                        </div>
                        {hasActiveFilters && (
                            <button
                                onClick={onReset}
                                className="pointer-events-auto flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
                            >
                                <X size={14} /> Clear All
                            </button>
                        )}
                    </div>

                    {/* Filter Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Main Search */}
                        <div className="md:col-span-12 lg:col-span-5 relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-accent transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search traveler name, airline..."
                                className="w-full pl-14 pr-4 h-14 rounded-2xl bg-neutral/5 border border-neutral/10 focus:border-accent/30 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all font-medium text-primary placeholder:text-primary/30"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Location Filters */}
                        <div className="md:col-span-4 lg:col-span-3 relative group">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-accent transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Country"
                                className="w-full pl-14 pr-4 h-14 rounded-2xl bg-neutral/5 border border-neutral/10 focus:border-accent/30 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all font-medium text-primary placeholder:text-primary/30"
                                value={filters.country}
                                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-4 lg:col-span-2 relative group">
                            <input
                                type="text"
                                placeholder="State"
                                className="w-full px-5 h-14 rounded-2xl bg-neutral/5 border border-neutral/10 focus:border-accent/30 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all font-medium text-primary placeholder:text-primary/30"
                                value={filters.state}
                                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-4 lg:col-span-2 relative group">
                            <input
                                type="text"
                                placeholder="City"
                                className="w-full px-5 h-14 rounded-2xl bg-neutral/5 border border-neutral/10 focus:border-accent/30 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all font-medium text-primary placeholder:text-primary/30"
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Indication Line */}
            <div className={`h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-500 ${hasActiveFilters ? 'opacity-100' : 'opacity-0'}`}></div>
        </motion.div>
    );
}
