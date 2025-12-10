import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MapPin, Briefcase, DollarSign, Clock, ChevronLeft, Upload, Linkedin, Github, CheckCircle, Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function JobDetailsModal({ job, isOpen, onClose }) {
    const [isApplying, setIsApplying] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        resume: null
    })

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormData({ ...formData, resume: e.target.files[0] })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
        }, 1500)
    }

    const resetModal = () => {
        setIsApplying(false)
        setIsSuccess(false)
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            linkedin: "",
            github: "",
            resume: null
        })
        onClose()
    }

    if (!isOpen || !job) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        onClick={resetModal}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-2xl h-[85vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                {isApplying && !isSuccess && (
                                    <button
                                        onClick={() => setIsApplying(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <ChevronLeft className="h-5 w-5 text-gray-500" />
                                    </button>
                                )}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{job.title}</h2>
                                    <p className="text-sm text-gray-500">{job.company}</p>
                                </div>
                            </div>
                            <button
                                onClick={resetModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {isSuccess ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="h-10 w-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h3>
                                    <p className="text-gray-500 mb-8 max-w-sm">
                                        Thanks for applying to <strong>{job.company}</strong>. We've received your application and will get back to you soon.
                                    </p>
                                    <Button onClick={resetModal} className="bg-accent hover:bg-accent/90 text-white min-w-[150px]">
                                        Close
                                    </Button>
                                </div>
                            ) : isApplying ? (
                                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                                    <div className="text-center mb-8">
                                        <h3 className="text-lg font-bold text-gray-900">Submit Your Application</h3>
                                        <p className="text-sm text-gray-500">Please fill out the form below to apply.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-900">Full Name <span className="text-red-500">*</span></Label>
                                            <Input
                                                required
                                                placeholder="John Doe"
                                                className="placeholder:text-gray-400 border border-gray-200 text-blue-600"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-900">Email Address <span className="text-red-500">*</span></Label>
                                                <Input
                                                    required
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    className="placeholder:text-gray-400 border border-gray-200 text-blue-600"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-900">Phone Number <span className="text-red-500">*</span></Label>
                                                <Input
                                                    required
                                                    type="tel"
                                                    placeholder="+1 (555) 000-0000"
                                                    className="placeholder:text-gray-400 border border-gray-200 text-blue-600"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-900">Resume/CV <span className="text-red-500">*</span></Label>
                                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative cursor-pointer group">
                                                <input
                                                    required
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={handleFileChange}
                                                />
                                                {formData.resume ? (
                                                    <div className="flex items-center justify-center gap-2 text-green-600">
                                                        <CheckCircle className="h-5 w-5" />
                                                        <span className="font-medium truncate max-w-[200px]">{formData.resume.name}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-gray-600">
                                                        <Upload className="h-8 w-8" />
                                                        <span className="text-sm">Click to upload or drag and drop</span>
                                                        <span className="text-xs text-gray-400">PDF, DOC, DOCX (Max 5MB)</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-gray-100">
                                            <Label className="text-gray-500 uppercase text-xs font-semibold tracking-wider">Online Presence</Label>

                                            <div className="space-y-2">
                                                <Label className="flex items-center gap-2 text-gray-900">
                                                    <Linkedin className="h-4 w-4 text-[#0077b5]" />
                                                    LinkedIn Profile
                                                </Label>
                                                <Input
                                                    placeholder="https://linkedin.com/in/johndoe"
                                                    className="placeholder:text-gray-400 border border-gray-200 text-blue-600"
                                                    value={formData.linkedin}
                                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="flex items-center gap-2 text-gray-900">
                                                    <Github className="h-4 w-4 text-gray-900" />
                                                    GitHub URL
                                                </Label>
                                                <Input
                                                    placeholder="https://github.com/johndoe"
                                                    className="placeholder:text-gray-400 border border-gray-200 text-blue-600"
                                                    value={formData.github}
                                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-8">
                                    {/* Job Meta */}
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-accent" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-accent" />
                                            {job.experience}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-accent" />
                                            {job.salary}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-accent" />
                                            {job.type}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-accent" />
                                            Posted: {job.posted}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-red-500" />
                                            Deadline: {job.deadline}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-gray-900">About the Role</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {job.description}
                                        </p>
                                        <p className="text-gray-600 leading-relaxed">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>

                                    {/* Requirements (Mock) */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-gray-900">Requirements</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                            <li>Bachelor's degree in Computer Science or related field.</li>
                                            <li>Proven experience with modern web technologies.</li>
                                            <li>Strong problem-solving skills and attention to detail.</li>
                                            <li>Excellent communication and teamwork abilities.</li>
                                        </ul>
                                    </div>

                                    {/* Skills */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-gray-900">Skills Required</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        {!isSuccess && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                {isApplying ? (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full h-12 bg-accent hover:bg-accent/90 text-white text-lg font-medium shadow-lg shadow-accent/20"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Submitting...
                                            </span>
                                        ) : (
                                            "Submit Application"
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setIsApplying(true)}
                                        className="w-full h-12 bg-accent hover:bg-accent/90 text-white text-lg font-medium shadow-lg shadow-accent/20"
                                    >
                                        Apply Now
                                    </Button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
