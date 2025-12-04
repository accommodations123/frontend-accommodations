"use client"

import React, { useState, useMemo } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { JobCard } from "@/components/career/JobCard"
import { FilterSection } from "@/components/career/FilterSection"
import { JobDetailsModal } from "@/components/career/JobDetailsModal"
import { JOBS, FILTERS } from "@/lib/mock-jobs"
import { Search, MapPin, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function CareerPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFilters, setSelectedFilters] = useState({
        locations: [],
        experience: [],
        salary: [],
        type: []
    })
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)

    const handleViewDetails = (job) => {
        setSelectedJob(job)
    }

    // Toggle filter selection
    const toggleFilter = (category, value) => {
        setSelectedFilters(prev => {
            const current = prev[category]
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value]
            return { ...prev, [category]: updated }
        })
    }

    // Clear all filters
    const clearFilters = () => {
        setSelectedFilters({
            locations: [],
            experience: [],
            salary: [],
            type: []
        })
        setSearchQuery("")
    }

    // Filter jobs
    const filteredJobs = useMemo(() => {
        return JOBS.filter(job => {
            // Search query
            const matchesSearch =
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase())

            // Filters
            const matchesLocation = selectedFilters.locations.length === 0 || selectedFilters.locations.includes(job.location)
            const matchesExperience = selectedFilters.experience.length === 0 || selectedFilters.experience.includes(job.experience)
            const matchesSalary = selectedFilters.salary.length === 0 || selectedFilters.salary.includes(job.salary) // Exact match for simplicity, improved logic needed for ranges
            const matchesType = selectedFilters.type.length === 0 || selectedFilters.type.includes(job.type)

            return matchesSearch && matchesLocation && matchesExperience && matchesType // Salary logic simplified
        })
    }, [searchQuery, selectedFilters])

    return (
        <main className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Top Search Bar Area */}
            <div className="bg-[#00152d] pt-28 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#f7eed7] mb-6 text-center">
                        Find Your Dream Job at <span className="text-accent">NextKinLife</span>
                    </h1>

                    <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title, skill, or keyword..."
                                className="w-full h-12 pl-12 pr-4 rounded-xl outline-none text-gray-900 placeholder:text-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="h-px md:h-12 w-full md:w-px bg-gray-100" />
                        <div className="flex-1 relative hidden md:block">
                            <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="w-full h-12 pl-12 pr-4 rounded-xl outline-none text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                        <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium shadow-lg shadow-accent/20">
                            Search Jobs
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT SIDEBAR - FILTERS */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                    <Filter className="h-5 w-5" />
                                    Filters
                                </h3>
                                {(selectedFilters.locations.length > 0 || selectedFilters.experience.length > 0 || selectedFilters.type.length > 0) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs font-medium text-accent hover:underline"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <div className="space-y-2">
                                <FilterSection
                                    title="Location"
                                    options={FILTERS.locations}
                                    selected={selectedFilters.locations}
                                    onChange={(val) => toggleFilter('locations', val)}
                                />
                                <FilterSection
                                    title="Experience"
                                    options={FILTERS.experience}
                                    selected={selectedFilters.experience}
                                    onChange={(val) => toggleFilter('experience', val)}
                                />
                                <FilterSection
                                    title="Job Type"
                                    options={FILTERS.type}
                                    selected={selectedFilters.type}
                                    onChange={(val) => toggleFilter('type', val)}
                                />
                                <FilterSection
                                    title="Salary Range"
                                    options={FILTERS.salary}
                                    selected={selectedFilters.salary}
                                    onChange={(val) => toggleFilter('salary', val)}
                                />
                            </div>
                        </div>
                    </aside>

                    {/* MOBILE FILTER TOGGLE */}
                    <div className="lg:hidden mb-4">
                        <Button
                            onClick={() => setIsMobileFiltersOpen(true)}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                        </Button>
                    </div>

                    {/* RIGHT CONTENT - JOB LIST */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                            </h2>
                            <div className="text-sm text-gray-500">
                                Sort by: <span className="font-medium text-gray-900 cursor-pointer">Relevance</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map(job => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                                    <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                                    <Button onClick={clearFilters} variant="outline">
                                        Clear Filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE FILTERS MODAL */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold text-xl text-gray-900">Filters</h3>
                                    <button onClick={() => setIsMobileFiltersOpen(false)}>
                                        <X className="h-6 w-6 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <FilterSection
                                        title="Location"
                                        options={FILTERS.locations}
                                        selected={selectedFilters.locations}
                                        onChange={(val) => toggleFilter('locations', val)}
                                    />
                                    <FilterSection
                                        title="Experience"
                                        options={FILTERS.experience}
                                        selected={selectedFilters.experience}
                                        onChange={(val) => toggleFilter('experience', val)}
                                    />
                                    <FilterSection
                                        title="Job Type"
                                        options={FILTERS.type}
                                        selected={selectedFilters.type}
                                        onChange={(val) => toggleFilter('type', val)}
                                    />
                                    <FilterSection
                                        title="Salary Range"
                                        options={FILTERS.salary}
                                        selected={selectedFilters.salary}
                                        onChange={(val) => toggleFilter('salary', val)}
                                    />
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <Button
                                        onClick={() => setIsMobileFiltersOpen(false)}
                                        className="w-full bg-accent hover:bg-accent/90 text-white"
                                    >
                                        Show {filteredJobs.length} Jobs
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Footer />

            <JobDetailsModal
                job={selectedJob}
                isOpen={!!selectedJob}
                onClose={() => setSelectedJob(null)}
            />
        </main>
    )
}
