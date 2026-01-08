import React from 'react'
import { X, MapPin, Clock, DollarSign, Briefcase, Building, Calendar, Heart, Share2, User, Mail, Phone, Award, TrendingUp, CheckCircle, Star, Wifi } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'

// Function to get work style icon
const getWorkStyleIcon = (workStyle) => {
  switch(workStyle?.toLowerCase()) {
    case 'remote':
      return <Wifi className="h-5 w-5" />;
    case 'hybrid':
      return <Wifi className="h-5 w-5" />;
    case 'on-site':
    default:
      return <Building className="h-5 w-5" />;
  }
}

// Function to get work style label
const getWorkStyleLabel = (workStyle) => {
  switch(workStyle?.toLowerCase()) {
    case 'remote':
      return 'Remote';
    case 'hybrid':
      return 'Hybrid';
    case 'on-site':
      return 'On-site';
    default:
      return workStyle || 'Not specified';
  }
}

export function JobDetailsModal({ job, isOpen, onClose }) {
    if (!job) return null

    // Format the posted date
    const postedDate = new Date(job.postedDate)
    const now = new Date()
    const diffTime = Math.abs(now - postedDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    const timeAgo = diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        <div className="bg-gradient-to-r from-[#00152d] via-[#002855] to-[#003d82] p-8 text-white relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-transparent to-white rounded-full filter blur-3xl"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                                            {job.logo ? (
                                                <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                                            ) : (
                                                <Building className="h-10 w-10 text-white/80" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold mb-2">{job.title}</h2>
                                            <p className="text-white/90 text-lg font-medium">{job.company}</p>
                                            {job.rating && (
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-white/90">{job.rating}</span>
                                                    </div>
                                                    <span className="text-white/70">({job.reviews || 0} reviews)</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={onClose} 
                                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                                
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <MapPin className="h-5 w-5" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Briefcase className="h-5 w-5" />
                                        <span>{job.experience}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Clock className="h-5 w-5" />
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <DollarSign className="h-5 w-5" />
                                        <span>{job.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        {getWorkStyleIcon(job.workStyle)}
                                        <span>{getWorkStyleLabel(job.workStyle)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Calendar className="h-5 w-5" />
                                        <span>Posted {timeAgo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-8 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Briefcase className="h-6 w-6 text-blue-600" />
                                            Job Description
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <CheckCircle className="h-6 w-6 text-blue-600" />
                                            Responsibilities
                                        </h3>
                                        <ul className="space-y-3 text-gray-600">
                                            {job.responsibilities?.map((responsibility, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <CheckCircle className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <span>{responsibility}</span>
                                                </li>
                                            )) || (
                                                <li>No specific responsibilities listed</li>
                                            )}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Award className="h-6 w-6 text-blue-600" />
                                            Requirements
                                        </h3>
                                        <ul className="space-y-3 text-gray-600">
                                            {job.requirements?.map((requirement, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <CheckCircle className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <span>{requirement}</span>
                                                </li>
                                            )) || (
                                                <li>No specific requirements listed</li>
                                            )}
                                        </ul>
                                    </div>
                                    
                                    {job.benefits && (
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <TrendingUp className="h-6 w-6 text-blue-600" />
                                                Benefits
                                            </h3>
                                            <ul className="space-y-3 text-gray-600">
                                                {job.benefits.map((benefit, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <CheckCircle className="h-4 w-4 text-blue-600" />
                                                        </div>
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-8">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Job Summary</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Experience</span>
                                                <span className="font-medium text-gray-900">{job.experience}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Job Type</span>
                                                <span className="font-medium text-gray-900">{job.type}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Work Style</span>
                                                <span className="font-medium text-gray-900">{getWorkStyleLabel(job.workStyle)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Salary</span>
                                                <span className="font-medium text-gray-900">{job.salary}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Location</span>
                                                <span className="font-medium text-gray-900">{job.location}</span>
                                            </div>
                                            {job.applicants && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Applicants</span>
                                                    <span className="font-medium text-gray-900">{job.applicants}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                                        <div className="space-y-3 text-gray-600">
                                            <div className="flex items-center gap-3">
                                                <User className="h-5 w-5 text-gray-400" />
                                                <span>{job.contactPerson || 'Hiring Manager'}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                                <span>{job.contactEmail || 'careers@nextkinlife.com'}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                                <span>{job.contactPhone || '+1 (555) 123-4567'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 border border-blue-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">About {job.company}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{job.companyDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-8 border-t border-gray-100 bg-gray-50">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                    variant="outline" 
                                    className="flex items-center justify-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all h-12"
                                    onClick={() => {
                                        // Save job logic
                                    }}
                                >
                                    <Heart className="h-5 w-5" />
                                    Save Job
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="flex items-center justify-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all h-12"
                                    onClick={() => {
                                        // Share job logic
                                    }}
                                >
                                    <Share2 className="h-5 w-5" />
                                    Share Job
                                </Button>
                                <Button 
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all h-12 text-base font-medium"
                                    onClick={() => {
                                        // Apply for job logic
                                    }}
                                >
                                    Apply Now
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}