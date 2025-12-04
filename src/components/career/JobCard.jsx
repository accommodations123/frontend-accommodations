import React from "react"
import { MapPin, Briefcase, DollarSign, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JobCard({ job, onViewDetails }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Logo */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-gray-500 font-medium">{job.company}</p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            {job.posted}
                        </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            {job.experience}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {job.type}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {job.description}
                    </p>

                    {/* Skills & Action */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-50">
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <Button
                            onClick={() => onViewDetails(job)}
                            className="w-full md:w-auto bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                        >
                            View Details
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
