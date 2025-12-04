"use client"

import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCountry } from "@/context/CountryContext"
import { verificationSteps, countryIdRequirements, cityRules, addressProofs } from "@/lib/host-kyc-data"
import { ChevronRight, ChevronLeft, Upload, CheckCircle, Shield, AlertTriangle, Building, MapPin, User, Camera, Lock, Globe, CreditCard, ChevronDown, Mail, Phone, Loader2 } from "lucide-react"
import { COUNTRIES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useClickOutside } from "@/hooks/useClickOutside"

import { useSaveHostMutation } from "@/store/api/hostApi"

export default function HostVerificationPage() {
    const navigate = useNavigate()
    const { activeCountry, setCountry } = useCountry()
    const [currentStep, setCurrentStep] = useState(1)
    const [direction, setDirection] = useState(0)
    // const [isLoading, setIsLoading] = useState(false) // Removed in favor of RTK Query isLoading
    const [isSuccess, setIsSuccess] = useState(false)

    const [saveHost, { isLoading, error }] = useSaveHostMutation()

    // Verification States
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [isPhoneVerified, setIsPhoneVerified] = useState(false)
    const [verifyingField, setVerifyingField] = useState(null)

    // Timer State
    const [timer, setTimer] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)

    useEffect(() => {
        let interval
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        } else if (timer === 0) {
            setIsTimerRunning(false)
        }
        return () => clearInterval(interval)
    }, [isTimerRunning, timer])

    // Country Dropdown State
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
    const countryDropdownRef = useClickOutside(() => setIsCountryDropdownOpen(false))
    const profilePhotoRef = useRef(null)

    const [formData, setFormData] = useState({
        country: activeCountry,
        fullName: "",
        email: "",
        phoneCode: "+1",
        phone: "",
        profilePhoto: null,
        idType: "",
        idNumber: "",
        idFront: null,
        idBack: null,
        selfie: null,
        address: "",
        city: "",
        zipCode: "",
        bio: "",

    })

    // Update form data when active country changes
    useEffect(() => {
        if (activeCountry) {
            setFormData(prev => ({
                ...prev,
                country: activeCountry
            }))
        }
    }, [activeCountry])

    const handleNext = () => {
        if (currentStep < 3) {
            setDirection(1)
            setCurrentStep(prev => prev + 1)
        } else {
            handleSubmit()
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1)
            setCurrentStep(prev => prev - 1)
        }
    }

    // OTP State
    const [otp, setOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)

    const handleVerifyEmail = () => {
        if (!formData.email) return

        setTimer(120) // 2 minutes
        setIsTimerRunning(true)
        setOtpSent(true)
        setOtp("") // Reset OTP input

        // Simulate sending verification email
        console.log("Sending OTP to:", formData.email)
    }

    const handleVerifyOtp = () => {
        // Simulate OTP verification
        if (otp.length >= 4) { // Allow any OTP >= 4 chars for now
            setIsEmailVerified(true)
            setOtpSent(false)
            // Auto-advance to next step
            setTimeout(() => {
                handleNext()
            }, 500)
        }
    }

    const handleSubmit = async () => {
        try {
            const submitData = new FormData()
            submitData.append("email", formData.email)
            submitData.append("phone", `${formData.phoneCode}${formData.phone}`)
            submitData.append("fullName", formData.fullName)
            submitData.append("country", formData.country?.name || "")
            submitData.append("city", formData.city)
            submitData.append("address", formData.address)
            submitData.append("idType", formData.idType)
            submitData.append("idNumber", formData.idNumber) // Assuming idNumber is collected somewhere or not needed if file is enough? The user listed it.
            // Mapping files
            if (formData.idFront) submitData.append("idPhoto", formData.idFront)
            if (formData.profilePhoto) submitData.append("selfiePhoto", formData.profilePhoto)

            const result = await saveHost(submitData).unwrap()

            console.log("Success:", result)
            localStorage.setItem("hostVerificationStatus", "verified")
            localStorage.setItem("hostProfile", JSON.stringify(formData))

            setIsSuccess(true)

            // Redirect after success
            setTimeout(() => {
                navigate("/host/guidelines")
            }, 2000)
        } catch (err) {
            console.error("Failed to save host:", err)
            // Handle error (show toast or alert)
        }
    }

    const handleFileChange = (e, field) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({ ...prev, [field]: file }))
        }
    }

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    }

    // Get current country requirements
    const currentCountryCode = formData.country?.code || "US"
    const requirements = countryIdRequirements[currentCountryCode] || countryIdRequirements["DEFAULT"]

    // Check for city rules
    const currentCityRule = cityRules[formData.city]

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#00152d] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                        <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#f7eed7] mb-4">Verification Complete!</h2>
                    <p className="text-white/70 mb-8">
                        Your identity has been verified successfully. You can now start hosting on Haven.
                    </p>
                    <div className="animate-pulse text-sm text-accent">Redirecting to guidelines...</div>
                </motion.div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#00152d] text-[#f7eed7] font-sans selection:bg-accent/30">
            <Navbar />

            {/* Add top padding to prevent Navbar overlap */}
            <div className="pt-24 min-h-screen flex flex-col md:flex-row">

                {/* LEFT PANEL - Context & Progress */}
                <div className="w-full md:w-1/3 lg:w-1/4 p-6 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    {/* Background Ambient Effects */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
                    </div>

                    <div className="relative z-10">
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold mb-4 tracking-tight">Verify Identity</h1>
                            <p className="text-white/60 text-lg leading-relaxed">
                                To ensure the safety of our community, we need to verify your identity before you can host.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {verificationSteps.map((step) => {
                                const isActive = step.id === currentStep
                                const isCompleted = step.id < currentStep

                                return (
                                    <div
                                        key={step.id}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border",
                                            isActive
                                                ? "bg-white/10 border-accent/50 shadow-[0_0_20px_rgba(193,33,28,0.15)]"
                                                : "border-transparent opacity-60"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                                            isActive ? "bg-accent text-white" :
                                                isCompleted ? "bg-green-500 text-white" : "bg-white/10 text-white/50"
                                        )}>
                                            {isCompleted ? <CheckCircle className="h-5 w-5" /> : step.id}
                                        </div>
                                        <div>
                                            <h3 className={cn("font-semibold", isActive ? "text-white" : "text-white/80")}>
                                                {step.title}
                                            </h3>
                                            <p className="text-xs text-white/50">{step.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="relative z-10 mt-12">
                        <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                            <Shield className="h-4 w-4" />
                            <span>Your data is encrypted and stored securely.</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL - Form Area */}
                <div className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-t-[40px] md:rounded-l-[40px] md:rounded-tr-none p-6 md:p-12 lg:p-20 text-gray-900 shadow-2xl overflow-y-auto">
                    <div className="max-w-2xl mx-auto h-full flex flex-col">

                        <div className="flex-1">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentStep}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="py-4"
                                >
                                    {/* STEP 1: CONTACT VERIFICATION */}
                                    {currentStep === 1 && (
                                        <div className="space-y-8">
                                            <div className="text-center mb-8">
                                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Shield className="h-8 w-8 text-primary" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-primary">Contact Verification</h2>
                                                <p className="text-gray-500">Verify your contact details to secure your account.</p>
                                            </div>

                                            <div className="space-y-6">
                                                {/* Personal Information */}
                                                <div className="space-y-2">
                                                    <Label>Full Name</Label>
                                                    <Input
                                                        placeholder="John Doe"
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                                        className="h-12 rounded-xl border border-gray-300 focus:border-accent focus:ring-accent"
                                                    />
                                                </div>

                                                {/* Email Verification */}
                                                <div className="space-y-2">
                                                    <Label>Email Address</Label>
                                                    <div className="flex gap-2">
                                                        <div className="relative flex-1">
                                                            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                                            <Input
                                                                type="email"
                                                                placeholder="john@example.com"
                                                                value={formData.email}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                                className="pl-10 h-12 rounded-xl border border-gray-300 focus:border-accent focus:ring-accent"
                                                                disabled={isEmailVerified || otpSent}
                                                            />
                                                            {isEmailVerified && (
                                                                <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
                                                            )}
                                                        </div>
                                                        {!isEmailVerified && !otpSent && (
                                                            <Button
                                                                onClick={handleVerifyEmail}
                                                                disabled={isTimerRunning || !formData.email}
                                                                className="h-12 px-6 bg-accent hover:bg-accent/90 text-white rounded-xl whitespace-nowrap"
                                                            >
                                                                {isTimerRunning ? (
                                                                    <span>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
                                                                ) : (
                                                                    "Verify"
                                                                )}
                                                            </Button>
                                                        )}
                                                    </div>

                                                    {/* OTP Input Section */}
                                                    <AnimatePresence>
                                                        {otpSent && !isEmailVerified && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: "auto" }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="pt-2"
                                                            >
                                                                <Label className="text-xs text-gray-500 mb-1.5 block">Enter Verification Code</Label>
                                                                <div className="flex gap-2">
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="Enter 6-digit OTP"
                                                                        value={otp}
                                                                        onChange={(e) => setOtp(e.target.value)}
                                                                        maxLength={6}
                                                                        className="h-12 rounded-xl border border-gray-300 focus:border-accent focus:ring-accent tracking-widest text-center font-mono text-lg"
                                                                    />
                                                                    <Button
                                                                        onClick={handleVerifyOtp}
                                                                        disabled={otp.length < 4}
                                                                        className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl whitespace-nowrap"
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                </div>
                                                                <div className="flex justify-between items-center mt-2">
                                                                    <p className="text-xs text-gray-500">
                                                                        Code sent to {formData.email}
                                                                    </p>
                                                                    {isTimerRunning && (
                                                                        <p className="text-xs text-accent font-medium">
                                                                            Resend in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                                                                        </p>
                                                                    )}
                                                                    {!isTimerRunning && (
                                                                        <button
                                                                            onClick={handleVerifyEmail}
                                                                            className="text-xs text-accent hover:underline font-medium"
                                                                        >
                                                                            Resend Code
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Phone Verification */}
                                                <div className="space-y-2">
                                                    <Label>Phone Number</Label>
                                                    <div className="flex gap-3">
                                                        <div className="w-32">
                                                            <div className="relative h-12">
                                                                <select
                                                                    value={formData.phoneCode}
                                                                    onChange={(e) => setFormData(prev => ({ ...prev, phoneCode: e.target.value }))}
                                                                    className="w-full h-full appearance-none rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-accent focus:ring-accent outline-none"
                                                                >
                                                                    {COUNTRIES.map((country) => (
                                                                        <option key={country.code} value={country.phoneCode}>
                                                                            {country.code} ({country.phoneCode})
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                                            </div>
                                                        </div>
                                                        <div className="relative flex-1">
                                                            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                                            <Input
                                                                type="tel"
                                                                placeholder="(555) 000-0000"
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                                className="pl-10 h-12 rounded-xl border border-gray-300 focus:border-accent focus:ring-accent"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 2: IDENTITY & RESIDENCY */}
                                    {currentStep === 2 && (
                                        <div className="space-y-8">
                                            <div className="text-center mb-8">
                                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Globe className="h-8 w-8 text-primary" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-primary">Identity & Residency</h2>
                                                <p className="text-gray-500">Tell us where you live and verify your identity.</p>
                                            </div>

                                            {/* Country Selection - Custom Dropdown */}
                                            <div className="space-y-2 relative" ref={countryDropdownRef}>
                                                <Label>Country of Residence</Label>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                                    className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between hover:border-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {formData.country?.flag?.startsWith('/') ? (
                                                            <img src={formData.country.flag} alt={formData.country.name} className="w-8 h-6 object-cover rounded-sm" />
                                                        ) : (
                                                            <span className="text-2xl">{formData.country?.flag}</span>
                                                        )}
                                                        <span className="font-medium text-gray-900">{formData.country?.name}</span>
                                                    </div>
                                                    <ChevronDown className={cn("h-5 w-5 text-gray-400 transition-transform", isCountryDropdownOpen && "rotate-180")} />
                                                </button>

                                                <AnimatePresence>
                                                    {isCountryDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto z-50"
                                                        >
                                                            {COUNTRIES.map((country) => (
                                                                <button
                                                                    key={country.code}
                                                                    onClick={() => {
                                                                        setCountry(country)
                                                                        setFormData(prev => ({ ...prev, country }))
                                                                        setIsCountryDropdownOpen(false)
                                                                    }}
                                                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                                                                >
                                                                    {country.flag.startsWith('/') ? (
                                                                        <img src={country.flag} alt={country.name} className="w-8 h-6 object-cover rounded-sm" />
                                                                    ) : (
                                                                        <span className="text-2xl">{country.flag}</span>
                                                                    )}
                                                                    <span className="font-medium text-gray-700">{country.name}</span>
                                                                    {formData.country?.code === country.code && (
                                                                        <CheckCircle className="ml-auto h-4 w-4 text-accent" />
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>



                                            {/* Address Section */}
                                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-accent" />
                                                    Address Details
                                                </h3>
                                                <div className="space-y-2">
                                                    <Label>Street Address</Label>
                                                    <Input
                                                        placeholder="123 Main St"
                                                        value={formData.address}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                                        className="h-12 rounded-xl border border-gray-300 focus:border-accent focus:ring-accent"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>City</Label>
                                                        <Input
                                                            placeholder="New York"
                                                            value={formData.city}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                                            className="h-12 rounded-xl border border-gray-300 focus:border-accent focus:ring-accent"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Zip Code</Label>
                                                        <Input
                                                            placeholder="10001"
                                                            value={formData.zipCode}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                                                            className="h-12 rounded-xl border border-gray-300 focus:border-accent focus:ring-accent"
                                                        />
                                                    </div>
                                                </div>

                                                {currentCityRule && (
                                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 animate-in fade-in zoom-in-95">
                                                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                        <div className="space-y-2">
                                                            <p className="text-sm font-medium text-amber-800">Local Regulation Alert</p>
                                                            <p className="text-xs text-amber-700">{currentCityRule.warning}</p>
                                                            {currentCityRule.requiresRegistration && (
                                                                <div className="pt-2">
                                                                    <Label className="text-xs text-amber-800">{currentCityRule.registrationLabel}</Label>
                                                                    <Input
                                                                        placeholder="Enter registration number"
                                                                        className="mt-1 h-10 bg-white border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                                                                        value={formData.registrationNumber}
                                                                        onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Identity Documents */}
                                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <User className="h-4 w-4 text-accent" />
                                                    Identity Verification ({requirements.name})
                                                </h3>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>ID Type</Label>
                                                        <div className="relative h-12">
                                                            <select
                                                                value={formData.idType}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, idType: e.target.value }))}
                                                                className="w-full h-full appearance-none rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-accent focus:ring-accent outline-none"
                                                            >
                                                                <option value="" disabled>Select ID Type</option>
                                                                {requirements.documents.map((doc) => (
                                                                    <option key={doc.id} value={doc.id}>
                                                                        {doc.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>ID Number</Label>
                                                        <Input
                                                            placeholder="Enter ID Number"
                                                            value={formData.idNumber}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                                                            className="h-12 rounded-xl border border-gray-300 focus:border-accent focus:ring-accent"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'idFront')} />
                                                        {formData.idFront ? (
                                                            <div className="flex items-center justify-center gap-2 text-green-600">
                                                                <CheckCircle className="h-5 w-5" />
                                                                <span className="text-sm font-medium truncate">{formData.idFront.name}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-1 text-gray-400">
                                                                <Camera className="h-6 w-6" />
                                                                <span className="text-xs">Front ID</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'idBack')} />
                                                        {formData.idBack ? (
                                                            <div className="flex items-center justify-center gap-2 text-green-600">
                                                                <CheckCircle className="h-5 w-5" />
                                                                <span className="text-sm font-medium truncate">{formData.idBack.name}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-1 text-gray-400">
                                                                <Camera className="h-6 w-6" />
                                                                <span className="text-xs">Back ID</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 3: PROFILE & PAYOUTS */}
                                    {currentStep === 3 && (
                                        <div className="space-y-6">
                                            <div className="text-center mb-8">
                                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Lock className="h-8 w-8 text-primary" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-primary">Profile Verification</h2>
                                                <p className="text-gray-500">Secure your payouts and tell guests about you.</p>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label>Profile Photo</Label>
                                                    <div className="flex items-center gap-6">
                                                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center group hover:border-accent transition-colors">
                                                            {formData.profilePhoto ? (
                                                                <img
                                                                    src={URL.createObjectURL(formData.profilePhoto)}
                                                                    alt="Profile"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <User className="h-8 w-8 text-gray-400 group-hover:text-accent transition-colors" />
                                                            )}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                ref={profilePhotoRef}
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                onChange={(e) => handleFileChange(e, 'profilePhoto')}
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900">Upload a photo</h4>
                                                            <p className="text-sm text-gray-500 mb-2">Make sure your face is clearly visible. This helps guests trust you.</p>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => profilePhotoRef.current?.click()}
                                                                className="text-xs h-8 bg-accent hover:bg-accent/90 text-white px-8 h-12 rounded-full shadow-lg shadow-accent/20 transition-all hover:scale-105 cursor-pointer"
                                                            >
                                                                Choose Image
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Host Bio</Label>
                                                    <textarea
                                                        className="w-full min-h-[120px] p-3 rounded-xl border border-gray-300 outline-none resize-none"
                                                        placeholder="Tell guests a bit about yourself, your hobbies, and why you love hosting..."
                                                        value={formData.bio}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation Buttons */}
                                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                                        <Button
                                            variant="ghost"
                                            onClick={handleBack}
                                            disabled={currentStep === 1 || isLoading}
                                            className="text-gray-500 hover:text-white cursor-pointer"
                                        >
                                            <ChevronLeft className="h-4 w-4 mr-2" />
                                            Back
                                        </Button>

                                        <Button
                                            onClick={handleNext}
                                            disabled={isLoading}
                                            className="bg-accent hover:bg-accent/90 text-white px-8 h-12 rounded-full shadow-lg shadow-accent/20 transition-all hover:scale-105 cursor-pointer"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Verifying...
                                                </span>
                                            ) : currentStep === 3 ? (
                                                "Complete Verification"
                                            ) : (
                                                <>
                                                    Next Step
                                                    <ChevronRight className="h-4 w-4 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
