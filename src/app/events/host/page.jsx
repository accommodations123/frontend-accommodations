"use client"

import React, { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EVENT_RULES } from "@/lib/mock-events"
import { COUNTRIES } from "@/lib/mock-data"
import { Upload, CheckCircle, AlertCircle, FileText, Calendar, MapPin, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function HostEventPage() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        country: "US", // Default
        documents: {}
    })

    const activeRules = EVENT_RULES[formData.country] || EVENT_RULES.default

    const handleFileChange = (docName, file) => {
        setFormData(prev => ({
            ...prev,
            documents: { ...prev.documents, [docName]: file }
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API submission
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
        }, 2000)
    }

    return (
        <main className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <div className="pt-28 pb-12 px-4">
                <div className="container mx-auto max-w-3xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Host an Event</h1>
                        <p className="text-gray-500">Create memorable experiences for the NextKinLife community.</p>
                    </div>

                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
                        >
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-10 w-10 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Submitted for Review!</h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Thank you for submitting your event. Our team will review your documents and details. You will receive an email update within 24-48 hours.
                            </p>
                            <Button className="bg-accent hover:bg-accent/90 text-white px-8" onClick={() => window.location.href = '/events'}>
                                Return to Events
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Progress Bar */}
                            <div className="h-2 bg-gray-100">
                                <div
                                    className="h-full bg-accent transition-all duration-500"
                                    style={{ width: step === 1 ? '50%' : '100%' }}
                                />
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">1</span>
                                                Event Details
                                            </h2>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Event Title</Label>
                                                    <Input
                                                        required
                                                        placeholder="e.g., Summer Music Festival"
                                                        value={formData.title}
                                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Date</Label>
                                                        <div className="relative">
                                                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                            <Input
                                                                required
                                                                type="date"
                                                                className="pl-10"
                                                                value={formData.date}
                                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Time</Label>
                                                        <Input
                                                            required
                                                            type="time"
                                                            value={formData.time}
                                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Country</Label>
                                                    <select
                                                        className="w-full h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                                                        value={formData.country}
                                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                    >
                                                        {COUNTRIES.map(c => (
                                                            <option key={c.code} value={c.code}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Location / Venue</Label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            required
                                                            placeholder="123 Event St, City"
                                                            className="pl-10"
                                                            value={formData.location}
                                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Description</Label>
                                                    <Textarea
                                                        required
                                                        placeholder="Tell us about your event..."
                                                        className="h-32 resize-none"
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-4 flex justify-end">
                                                <Button
                                                    type="button"
                                                    onClick={() => setStep(2)}
                                                    className="bg-accent hover:bg-accent/90 text-white"
                                                >
                                                    Next: Rules & Verification
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">2</span>
                                                Rules & Verification
                                            </h2>

                                            {/* Rules Section */}
                                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                                                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                                    <AlertCircle className="h-5 w-5" />
                                                    Hosting Rules for {COUNTRIES.find(c => c.code === formData.country)?.name || formData.country}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {activeRules.rules.map((rule, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-sm text-blue-800">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                                            {rule}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Document Uploads */}
                                            <div className="space-y-6">
                                                <h3 className="font-semibold text-gray-900">Required Documents</h3>
                                                {activeRules.documents.map((doc, idx) => (
                                                    <div key={idx} className="space-y-2">
                                                        <Label>{doc} <span className="text-red-500">*</span></Label>
                                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative cursor-pointer group">
                                                            <input
                                                                type="file"
                                                                required
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                onChange={(e) => handleFileChange(doc, e.target.files[0])}
                                                            />
                                                            {formData.documents[doc] ? (
                                                                <div className="flex items-center justify-center gap-2 text-green-600">
                                                                    <CheckCircle className="h-5 w-5" />
                                                                    <span className="font-medium truncate">{formData.documents[doc].name}</span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-gray-600">
                                                                    <FileText className="h-8 w-8" />
                                                                    <span className="text-sm">Upload {doc}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-4 flex justify-between items-center">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => setStep(1)}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-accent hover:bg-accent/90 text-white min-w-[150px]"
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex items-center gap-2">
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                            Submitting...
                                                        </span>
                                                    ) : (
                                                        "Submit for Review"
                                                    )}
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    )
}
