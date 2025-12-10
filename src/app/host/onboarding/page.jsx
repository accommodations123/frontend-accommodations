"use client"

import * as React from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight, ChevronLeft, Upload, Home, MapPin, Camera, CheckCircle, Check, Video, Shield, DollarSign, Calendar, BedDouble, Bath, Users as UsersIcon, Building2, Loader2, UserCircle, Wifi, Car, Coffee, Tv, Lock, Key, Mail, Phone, FileText, Globe, Clock, Star, Heart, Filter, Search, X, Plus, Minus } from "lucide-react"
import { Footer } from "@/components/layout/Footer"
import { EmbeddedGuidelines } from "@/components/host/EmbeddedGuidelines"
import OtpVerification from "@/components/host/OtpVerification"
import { categories } from "@/lib/host-rules-data"
import { useCountry } from "@/context/CountryContext"
import { Counter } from "@/components/ui/counter"
import { CardSelect } from "@/components/ui/card-select"
import { StepIdentity } from '@/components/host/wizard/StepIdentity'
import { motion, AnimatePresence } from "framer-motion"

import {
    useCreatePropertyDraftMutation,
    useUpdatePropertyBasicMutation,  // Fixed: was useUpdatePropertyBasicInfoMutation
    useUpdatePropertyAddressMutation,
    useUpdatePropertyMediaMutation,
    useUpdatePropertyAmenitiesMutation,
    useUpdatePropertyRulesMutation,
    useUpdatePropertyLegalMutation,
    useUpdatePropertyPricingMutation,
    useSubmitPropertyMutation,
    useSaveHostMutation,
    useSendOtpMutation,
    useVerifyOtpMutation
} from "@/store/api/hostApi"

export default function HostOnboardingPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const preSelectedCategory = searchParams.get("category")
    const [step, setStep] = React.useState(1)
    const totalSteps = 7
    const { activeCountry } = useCountry()
    const [propertyId, setPropertyId] = React.useState(null)

    // API Mutations
    const [createDraft] = useCreatePropertyDraftMutation()
    const [updateBasicInfo] = useUpdatePropertyBasicMutation()  // Fixed: was useUpdatePropertyBasicInfoMutation
    const [updateAddress] = useUpdatePropertyAddressMutation()
    const [updateMedia] = useUpdatePropertyMediaMutation()
    const [updateAmenities] = useUpdatePropertyAmenitiesMutation()
    const [updateRules] = useUpdatePropertyRulesMutation()
    const [updateLegal] = useUpdatePropertyLegalMutation()
    const [updatePricing] = useUpdatePropertyPricingMutation()
    const [submitProperty] = useSubmitPropertyMutation()
    const [saveHost] = useSaveHostMutation()
    const [sendOtp] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()

    // Host Verification State
    const [showOtpModal, setShowOtpModal] = React.useState(false)
    const [isEmailVerified, setIsEmailVerified] = React.useState(false)
    const [isSendingOtp, setIsSendingOtp] = React.useState(false)
    const [isSavingVerification, setIsSavingVerification] = React.useState(false)

    // Auth Check
    React.useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Please sign in to start hosting.")
            navigate("/signin")
        }
    }, [navigate])

    // Form State
    const [formData, setFormData] = React.useState({
        // Host Details (Step 1)
        hostFullName: "",
        hostEmail: "",
        hostPhone: "",
        hostCountry: activeCountry.name,
        hostCity: "",
        hostAddress: "",
        hostIdType: "Aadhaar",
        hostIdNumber: "",
        hostIdPhoto: null,
        hostSelfie: null,

        // Basic Info (Step 2)
        category: preSelectedCategory || "",
        title: "",
        description: "",
        propertyType: "Apartment",
        privacyType: "Entire Place",
        area: "",
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        pets: 0,

        // Location (Step 3)
        address: "",
        city: "",
        state: "",
        zip: "",
        country: activeCountry.name,

        // Media (Step 4)
        photos: [],
        video: null,

        // Amenities & Legal (Step 5)
        amenities: [],
        safetyItems: [],
        documents: {},

        // Pricing (Step 6)
        pricingModel: "nightly",
        price: "",
        currency: "USD",
        cleaningFee: "",
        serviceFee: "",
        securityDeposit: "",
        weeklyDiscount: "",
        monthlyDiscount: "",
    })

    const [errors, setErrors] = React.useState({})

    // On mount, try to refresh host from server to get canonical identityVerified flag
    React.useEffect(() => {
        async function refreshHost() {
            try {
                // This would be your API call to get host info
                // const res = await fetch(`/api/host/${initialHost.id}`)
                // For now, we'll just check localStorage
                if (localStorage.getItem("host_identity_verified") === "true") {
                    setIsEmailVerified(true)
                }
            } catch (err) {
                // network error -> fallback to localStorage
                if (localStorage.getItem("host_identity_verified") === "true") {
                    setIsEmailVerified(true)
                }
            }
        }
        refreshHost()
    }, [])

    const updateForm = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: null }))
        }
    }

    const validateStep = (currentStep) => {
        const newErrors = {}
        let isValid = true

        if (currentStep === 1) { // Host Identity
            if (!formData.hostFullName) newErrors.hostFullName = "Full Name is required"

            if (!formData.hostEmail) newErrors.hostEmail = "Email is required"
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.hostEmail)) newErrors.hostEmail = "Invalid email format"
            else if (!isEmailVerified) newErrors.hostEmail = "Please verify your email to proceed"

            if (!formData.hostPhone) newErrors.hostPhone = "Phone number is required"
            if (!formData.hostIdNumber) newErrors.hostIdNumber = "ID Number is required"
            if (!formData.hostIdPhoto) newErrors.hostIdPhoto = "ID Photo is required"
            if (!formData.hostSelfie) newErrors.hostSelfie = "Selfie is required"
            // Optional: Validate Host Address fields if strict
            if (!formData.hostCity) newErrors.hostCity = "City is required"
            if (!formData.hostAddress) newErrors.hostAddress = "Address is required"
        }

        if (currentStep === 2) { // Basic Info
            if (!formData.category) newErrors.category = "Please select a category"
            if (!formData.propertyType) newErrors.propertyType = "Please select a property type"
            if (!formData.privacyType) newErrors.privacyType = "Please select a privacy type"
            if (!formData.area) newErrors.area = "Please enter the accommodation area"
            if (!formData.title) newErrors.title = "Please enter a listing title"
            if (!formData.description) newErrors.description = "Please enter a description"
        }

        if (currentStep === 3) { // Location
            if (!formData.address) newErrors.address = "Address is required"
            if (!formData.city) newErrors.city = "City is required"
            if (!formData.state) newErrors.state = "State is required"
            if (!formData.zip) newErrors.zip = "Zip code is required"
        }

        if (currentStep === 4) { // Media
            if (formData.photos.length === 0) newErrors.photos = "Please upload at least one photo"
        }

        if (currentStep === 6) { // Pricing
            if (!formData.price) newErrors.price = "Price is required"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            isValid = false
        }

        return isValid
    }

    const nextStep = async () => {
        if (!validateStep(step)) {
            return
        }

        try {
            if (step === 1) {
                // Host Identity Step. 
                // We do NOT save to API yet because we don't have a property draft.
                // Just proceed to Step 2.
            } else if (step === 2) {
                // Create Draft Property
                const payload = {
                    categoryId: formData.category,
                    propertyType: formData.propertyType,
                    privacyType: formData.privacyType,
                    guests: formData.guests,
                    bedrooms: formData.bedrooms,
                    bathrooms: formData.bathrooms,
                    petsAllowed: formData.pets || 0,
                    area: formData.area,
                    title: formData.title,
                    description: formData.description
                }

                if (!propertyId) {
                    const res = await createDraft(payload).unwrap()
                    const newId = res.propertyId || res._id || res.data?._id || res.property?._id || (res.data && res.data.propertyId)
                    if (newId) {
                        setPropertyId(newId)
                        console.log("Created Draft Property ID:", newId)
                    } else {
                        console.error("Could not find ID in response:", res)
                        alert("Error: Could not create property draft. Please try again.")
                        return
                    }
                } else {
                    await updateBasicInfo({ id: propertyId, data: payload }).unwrap()
                }
            } else if (step === 3) {
                // Update Address
                if (!propertyId) {
                    alert("Error: Property ID is missing. Please restart.")
                    return
                }
                const payload = {
                    country: formData.country,
                    city: formData.city,
                    address: formData.address,
                    state: formData.state,
                    zip: formData.zip
                }
                await updateAddress({ id: propertyId, data: payload }).unwrap()
            } else if (step === 4) {
                // Update Media
                const mediaData = new FormData()
                if (formData.photos && formData.photos.length > 0) {
                    formData.photos.forEach(photo => {
                        mediaData.append('photos', photo)
                    })
                }
                if (formData.video) {
                    mediaData.append('video', formData.video)
                }
                try {
                    await updateMedia({ id: propertyId, data: mediaData }).unwrap()
                } catch (err) {
                    console.error("Media upload failed:", err)
                }
            } else if (step === 5) {
                // Update Amenities & Rules & Property Documents
                const amenitiesPayload = { amenities: formData.amenities }
                const rulesPayload = { rules: formData.safetyItems }
                await updateAmenities({ id: propertyId, data: amenitiesPayload }).unwrap()
                await updateRules({ id: propertyId, data: rulesPayload }).unwrap()

                // Property Documents upload handled here
                const legalData = new FormData()
                if (formData.documents) {
                    Object.keys(formData.documents).forEach(key => {
                        if (formData.documents[key]) {
                            legalData.append('legalDocs', formData.documents[key])
                        }
                    })
                }
                try {
                    if (legalData.has('legalDocs')) {
                        await updateLegal({ id: propertyId, data: legalData }).unwrap()
                    }
                } catch (err) {
                    console.error("Legal docs upload failed:", err)
                }
            } else if (step === 6) {
                // Update Pricing
                const payload = {
                    pricePerNight: formData.price,
                    currency: formData.currency,
                }
                await updatePricing({ id: propertyId, data: payload }).unwrap()
            }

            setStep(Math.min(step + 1, totalSteps))
            window.scrollTo(0, 0)
        } catch (error) {
            console.error("Failed to save progress:", error)
            if (error?.status === 401) {
                alert("Session expired. Please sign in again.")
                localStorage.removeItem("token")
                navigate("/signin")
                return
            }
            alert("Failed to save progress. Please try again.")
        }
    }

    const prevStep = () => setStep(Math.max(step - 1, 1))

    const fileInputRef = React.useRef(null)
    const videoInputRef = React.useRef(null)

    const handleFileClick = () => {
        fileInputRef.current?.click()
    }

    const handleVideoClick = () => {
        videoInputRef.current?.click()
    }

    const handleFileChange = (e, type = 'photos', docIndex = null) => {
        const files = Array.from(e.target.files)
        if (files.length > 0) {
            if (type === 'photos') {
                setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }))
                setErrors(prev => ({ ...prev, photos: null }))
            } else if (type === 'video') {
                setFormData(prev => ({ ...prev, video: files[0] }))
            } else if (type === 'document') {
                setFormData(prev => ({
                    ...prev,
                    documents: { ...prev.documents, [docIndex]: files[0] }
                }))
            } else if (type === 'hostIdPhoto') {
                setFormData(prev => ({ ...prev, hostIdPhoto: files[0] }))
            } else if (type === 'hostSelfie') {
                setFormData(prev => ({ ...prev, hostSelfie: files[0] }))
            }
        }
    }

    const handleSendOtp = async () => {
        if (!formData.hostEmail) {
            setErrors(prev => ({ ...prev, hostEmail: "Please enter an email first" }))
            return
        }
        try {
            setIsSendingOtp(true)
            await sendOtp({ email: formData.hostEmail, phone: formData.hostPhone || "0000000000" }).unwrap()
            setShowOtpModal(true)
        } catch (error) {
            console.error("Failed to send OTP:", error)
            alert("Failed to send OTP. Please try again.")
        } finally {
            setIsSendingOtp(false)
        }
    }

    const handleVerifyOtp = async (otpCode) => {
        try {
            setIsSavingVerification(true)
            
            // 1) verify OTP with auth service
            await verifyOtp({ email: formData.hostEmail, phone: formData.hostPhone || "0000000000", otp: otpCode }).unwrap()
            
            // 2) Persist identityVerified to host record on server
            // In a real implementation, you would make an API call here to update the host record
            // For now, we'll just update the local state and localStorage
            setIsEmailVerified(true)
            localStorage.setItem("host_identity_verified", "true")
            setShowOtpModal(false)
            alert("Email verified successfully!")
            
            // Automatically proceed to next step after verification
            setStep(2)
        } catch (error) {
            console.error("Failed to verify OTP:", error)
            alert("Invalid OTP. Please try again.")
        } finally {
            setIsSavingVerification(false)
        }
    }

    const handlePublish = async () => {
        try {
            const propertyData = {
                id: propertyId,
                user_id: 2, // Reminder: This should be dynamic in production
                category_id: formData.category,
                property_type: formData.propertyType.toLowerCase(),
                privacy_type: formData.privacyType.toLowerCase(),
                guests: formData.guests,
                bedrooms: formData.bedrooms,
                bathrooms: formData.bathrooms,
                pets_allowed: formData.pets || 0,
                area: formData.area,
                title: formData.title,
                description: formData.description,
                country: formData.country,
                city: formData.city,
                address: formData.address,
                amenities: formData.amenities,
                rules: formData.safetyItems,
                price_per_hour: "0",
                price_per_night: formData.price,
                price_per_month: "0",
                currency: formData.currency,
                status: "approved"
            };

            const hostData = {
                email: formData.hostEmail,
                phone: formData.hostPhone,
                full_name: formData.hostFullName,
                country: formData.hostCountry,
                city: formData.hostCity,
                address: formData.hostAddress,
                id_type: formData.hostIdType,
                id_number: formData.hostIdNumber,
            };

            const submissionData = new FormData();

            // Append Property Data
            Object.keys(propertyData).forEach(key => {
                if (Array.isArray(propertyData[key])) {
                    propertyData[key].forEach(item => submissionData.append(`property[${key}][]`, item));
                } else {
                    submissionData.append(`property[${key}]`, propertyData[key]);
                }
            });

            // Append Host Data
            Object.keys(hostData).forEach(key => {
                submissionData.append(`host[${key}]`, hostData[key]);
            });

            // Append Files
            if (formData.hostIdPhoto) {
                submissionData.append('host[id_photo]', formData.hostIdPhoto);
            }
            if (formData.hostSelfie) {
                submissionData.append('host[selfie_photo]', formData.hostSelfie);
            }

            console.log("Submitting Host Payload (FormData constructed)");
            const result = await saveHost(submissionData).unwrap()
            console.log("Save Host Result:", result)

            alert("Listing & Host Details Submitted Successfully! Redirecting to home...")
            navigate("/")
        } catch (error) {
            console.error("Failed to publish:", error)
            alert("Failed to publish listing. Please try again.")
        }
    }

    const selectedCategoryData = categories.find(c => c.id === formData.category)

    const propertyTypes = [
        { id: "Apartment", label: "Apartment", icon: Building2, description: "In a multi-unit building" },
        { id: "House", label: "House", icon: Home, description: "Standalone property" },
        { id: "Villa", label: "Villa", icon: Home, description: "Luxury vacation home" },
        { id: "Guest Suite", label: "Guest Suite", icon: BedDouble, description: "Private suite with entrance" },
    ]

    const privacyTypes = [
        { id: "Entire Place", label: "Entire Place", icon: Home, description: "Guests have the whole place" },
        { id: "Private Room", label: "Private Room", icon: BedDouble, description: "Guests have their own room" },
        { id: "Shared Room", label: "Shared Room", icon: UsersIcon, description: "Guests share a room" },
    ]

    const stepsData = [
        { id: 1, label: "Identity", icon: UserCircle },
        { id: 2, label: "Basic", icon: Home },
        { id: 3, label: "Location", icon: MapPin },
        { id: 4, label: "Media", icon: Camera },
        { id: 5, label: "Amenities", icon: Shield },
        { id: 6, label: "Pricing", icon: DollarSign },
        { id: 7, label: "Review", icon: CheckCircle },
    ]

    return (
        <main className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-20">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">

                    <div className="flex-1">
                        <div className="mb-12">
                            <div className="flex items-center justify-between relative px-2">
                                {/* Connection Line */}
                                <div className="absolute left-0 top-5 -translate-y-1/2 w-full h-1 bg-linear-to-r from-indigo-200 via-purple-200 to-indigo-200 rounded-full -z-10">
                                    <div
                                        className="h-full bg-linear-to-r from-indigo-600 to-purple-600 transition-all duration-500 rounded-full"
                                        style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                                    />
                                </div>

                                {stepsData.map((s) => {
                                    const isActive = step === s.id;
                                    const isCompleted = step > s.id;

                                    return (
                                        <div key={s.id} className="flex flex-col items-center gap-2">
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-white shadow-lg
                                                    ${isActive ? 'border-indigo-600 text-indigo-600 scale-110 shadow-xl' :
                                                        isCompleted ? 'border-indigo-600 bg-linear-to-br from-indigo-600 to-purple-600 text-white' : 'border-gray-200 text-gray-300'}
                                                `}
                                            >
                                                {isCompleted ? <Check className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                                            </div>
                                            <span className={`text-xs font-medium hidden md:block transition-colors duration-300 ${isActive || isCompleted ? 'text-indigo-900' : 'text-gray-400'}`}>
                                                {s.label}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 min-h-[600px] flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex-1 relative z-10 grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">

                                    {/* STEP 1: HOST IDENTITY - Only show if not verified */}
                                    {step === 1 && !isEmailVerified && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg">
                                                    <UserCircle className="h-7 w-7" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-gray-900">Host Identity & Documents</h1>
                                                    <p className="text-gray-500">We need to verify your identity to keep our community safe and trustworthy.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="md:col-span-2">
                                                        <Label htmlFor="hostFullName" className="text-gray-900 font-semibold mb-2 block">Full Name</Label>
                                                        <Input
                                                            id="hostFullName"
                                                            value={formData.hostFullName}
                                                            onChange={(e) => updateForm('hostFullName', e.target.value)}
                                                            placeholder="e.g. John Doe"
                                                            className="h-12 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        />
                                                        {errors.hostFullName && <p className="text-sm text-red-500 mt-1">{errors.hostFullName}</p>}
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <Label htmlFor="hostEmail" className="text-gray-900 font-semibold mb-2 block">Email Address</Label>
                                                        <div className="flex gap-4">
                                                            <div className="flex-1">
                                                                <Input
                                                                    id="hostEmail"
                                                                    type="email"
                                                                    value={formData.hostEmail}
                                                                    disabled={isEmailVerified}
                                                                    onChange={(e) => updateForm('hostEmail', e.target.value)}
                                                                    placeholder="e.g. john@example.com"
                                                                    className={`h-12 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${isEmailVerified ? 'bg-green-50 border-green-200' : ''}`}
                                                                />
                                                            </div>
                                                            {formData.hostEmail && (
                                                                <Button
                                                                    onClick={handleSendOtp}
                                                                    disabled={isEmailVerified || isSendingOtp}
                                                                    className={`h-12 px-6 rounded-xl font-semibold transition-all ${isEmailVerified
                                                                        ? 'bg-green-100 text-green-700 hover:bg-green-100 border border-green-200 cursor-default'
                                                                        : 'bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200/50'
                                                                        }`}
                                                                >
                                                                    {isSendingOtp ? (
                                                                        <>
                                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                            Sending...
                                                                        </>
                                                                    ) : isEmailVerified ? (
                                                                        <>
                                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                                            Verified
                                                                        </>
                                                                    ) : "Verify"}
                                                                </Button>
                                                            )}
                                                        </div>
                                                        {errors.hostEmail && <p className="text-sm text-red-500 mt-1">{errors.hostEmail}</p>}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="hostPhone" className="text-gray-900 font-semibold mb-2 block">Phone Number</Label>
                                                        <Input
                                                            id="hostPhone"
                                                            value={formData.hostPhone}
                                                            onChange={(e) => updateForm('hostPhone', e.target.value)}
                                                            placeholder="e.g. 9876543210"
                                                            className="h-12 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        />
                                                        {errors.hostPhone && <p className="text-sm text-red-500 mt-1">{errors.hostPhone}</p>}
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="hostIdType" className="text-gray-900 font-semibold mb-2 block">ID Type</Label>
                                                        <select
                                                            id="hostIdType"
                                                            value={formData.hostIdType}
                                                            onChange={(e) => updateForm('hostIdType', e.target.value)}
                                                            className="w-full h-12 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        >
                                                            <option value="Aadhaar">Aadhaar</option>
                                                            <option value="Passport">Passport</option>
                                                            <option value="Driving License">Driving License</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="hostIdNumber" className="text-gray-900 font-semibold mb-2 block">ID Number</Label>
                                                    <Input
                                                        id="hostIdNumber"
                                                        value={formData.hostIdNumber}
                                                        onChange={(e) => updateForm('hostIdNumber', e.target.value)}
                                                        placeholder="e.g. XYZ123456"
                                                        className="h-12 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    />
                                                    {errors.hostIdNumber && <p className="text-sm text-red-500 mt-1">{errors.hostIdNumber}</p>}
                                                </div>

                                                <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-100">
                                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                        <MapPin className="w-5 h-5 text-indigo-600" />
                                                        Host Address
                                                    </h4>
                                                    <div className="grid gap-4">
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <div>
                                                                <Label htmlFor="hostCity" className="text-gray-700 text-sm mb-1 block">City</Label>
                                                                <Input
                                                                    id="hostCity"
                                                                    value={formData.hostCity}
                                                                    onChange={(e) => updateForm('hostCity', e.target.value)}
                                                                    placeholder="e.g. Hyderabad"
                                                                    className="h-10 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                />
                                                                {errors.hostCity && <p className="text-sm text-red-500 mt-1">{errors.hostCity}</p>}
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="hostCountry" className="text-gray-700 text-sm mb-1 block">Country</Label>
                                                                <Input
                                                                    id="hostCountry"
                                                                    value={formData.hostCountry}
                                                                    onChange={(e) => updateForm('hostCountry', e.target.value)}
                                                                    placeholder="e.g. India"
                                                                    className="h-10 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                                <Label htmlFor="hostAddress" className="text-gray-700 text-sm mb-1 block">Address</Label>
                                                                <Input
                                                                    id="hostAddress"
                                                                    value={formData.hostAddress}
                                                                    onChange={(e) => updateForm('hostAddress', e.target.value)}
                                                                    placeholder="e.g. Hitech City"
                                                                    className="h-10 border border-gray-200 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                />
                                                                {errors.hostAddress && <p className="text-sm text-red-500 mt-1">{errors.hostAddress}</p>}
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <Label className="text-gray-900 font-semibold mb-2 block">ID Proof Photo</Label>
                                                        <div
                                                            className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-indigo-500 hover:bg-indigo-50/30 cursor-pointer transition-all group"
                                                            onClick={() => document.getElementById('host-id-upload').click()}
                                                        >
                                                            <input
                                                                id="host-id-upload"
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleFileChange(e, 'hostIdPhoto')}
                                                            />
                                                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600 group-hover:scale-110 transition-transform">
                                                                <Upload className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">{formData.hostIdPhoto ? formData.hostIdPhoto.name : "Upload ID Photo"}</p>
                                                        </div>
                                                        {errors.hostIdPhoto && <p className="text-sm text-red-500 mt-1">{errors.hostIdPhoto}</p>}
                                                    </div>

                                                    <div>
                                                        <Label className="text-gray-900 font-semibold mb-2 block">Selfie Photo</Label>
                                                        <div
                                                            className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-indigo-500 hover:bg-indigo-50/30 cursor-pointer transition-all group"
                                                            onClick={() => document.getElementById('host-selfie-upload').click()}
                                                        >
                                                            <input
                                                                id="host-selfie-upload"
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleFileChange(e, 'hostSelfie')}
                                                            />
                                                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600 group-hover:scale-110 transition-transform">
                                                                <Camera className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">{formData.hostSelfie ? formData.hostSelfie.name : "Upload Selfie"}</p>
                                                        </div>
                                                        {errors.hostSelfie && <p className="text-sm text-red-500 mt-1">{errors.hostSelfie}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* If identity is verified, show success message */}
                                    {step === 1 && isEmailVerified && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-linear-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-green-600 shadow-lg">
                                                    <CheckCircle className="h-7 w-7" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-gray-900">Identity Verified</h1>
                                                    <p className="text-gray-500">Your identity has been verified successfully. You can now proceed to list your property.</p>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-linear-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                                    <h3 className="font-semibold text-green-900">Verification Complete</h3>
                                                </div>
                                                <p className="text-sm text-green-700 mb-4">
                                                    Thank you for verifying your identity. Your information has been securely stored and will only be used for verification purposes.
                                                </p>
                                                <Button
                                                    onClick={() => setStep(2)}
                                                    className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-105"
                                                >
                                                    Continue to Property Details
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 2: BASIC INFO */}
                                    {step === 2 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg">
                                                    <Home className="h-7 w-7" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-gray-900">Tell us about your place</h1>
                                                    <p className="text-gray-500">Share the basic details of your listing to attract guests.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <div>
                                                    <Label className="text-gray-900 text-base font-semibold mb-3 block">Which of these best describes your place?</Label>
                                                    {errors.category && <p className="text-sm text-red-500 mb-2">{errors.category}</p>}
                                                    {preSelectedCategory && selectedCategoryData ? (
                                                        <div className="bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-4">
                                                            <div className="p-3 bg-white rounded-lg shadow-sm text-indigo-600">
                                                                {React.createElement(selectedCategoryData.icon, { className: "w-7 h-7" })}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">{selectedCategoryData.name}</h3>
                                                                <p className="text-sm text-gray-500">Selected Category</p>
                                                            </div>
                                                            <div className="ml-auto">
                                                                <CheckCircle className="w-7 h-7 text-indigo-600" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <CardSelect
                                                            options={categories.map(c => ({ id: c.id, label: c.name, icon: c.icon }))}
                                                            value={formData.category}
                                                            onChange={(val) => updateForm('category', val)}
                                                            className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                                                        />
                                                    )}
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <Label className="text-gray-900 text-base font-semibold mb-3 block">Property Type</Label>
                                                        {errors.propertyType && <p className="text-sm text-red-500 mb-2">{errors.propertyType}</p>}
                                                        <CardSelect
                                                            options={propertyTypes}
                                                            value={formData.propertyType}
                                                            onChange={(val) => updateForm('propertyType', val)}
                                                            className="grid-cols-1 sm:grid-cols-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-900 text-base font-semibold mb-3 block">Privacy Type</Label>
                                                        {errors.privacyType && <p className="text-sm text-red-500 mb-2">{errors.privacyType}</p>}
                                                        <CardSelect
                                                            options={privacyTypes}
                                                            value={formData.privacyType}
                                                            onChange={(val) => updateForm('privacyType', val)}
                                                            className="grid-cols-1 sm:grid-cols-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="area" className="text-gray-900 font-semibold mb-2 block">Accommodation Area</Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="area"
                                                            type="number"
                                                            value={formData.area}
                                                            onChange={(e) => updateForm('area', e.target.value)}
                                                            placeholder="e.g. 1200"
                                                            className="h-12 border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-16"
                                                        />
                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">sq ft</span>
                                                    </div>
                                                    {errors.area && <p className="text-sm text-red-500 mt-1">{errors.area}</p>}
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6 pt-4">
                                                    <div>
                                                        <Label className="text-gray-700 mb-2 block font-medium">Guests</Label>
                                                        <Counter value={formData.guests} onChange={(val) => updateForm('guests', val)} max={16} />
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-700 mb-2 block font-medium">Bedrooms</Label>
                                                        <Counter value={formData.bedrooms} onChange={(val) => updateForm('bedrooms', val)} max={10} />
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-700 mb-2 block font-medium">Bathrooms</Label>
                                                        <Counter value={formData.bathrooms} onChange={(val) => updateForm('bathrooms', val)} max={10} />
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-700 mb-2 block font-medium">Pets Allowed</Label>
                                                        <Counter value={formData.pets || 0} onChange={(val) => updateForm('pets', val)} max={5} />
                                                    </div>
                                                </div>

                                                <div className="space-y-6 pt-6 border-t border-gray-100">
                                                    <div>
                                                        <Label htmlFor="title" className="text-gray-900 font-semibold mb-2 block">Listing Title</Label>
                                                        <Input
                                                            id="title"
                                                            value={formData.title}
                                                            onChange={(e) => updateForm('title', e.target.value)}
                                                            placeholder="e.g. Modern Loft in Downtown"
                                                            className="h-12 text-lg border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        />
                                                        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="description" className="text-gray-900 font-semibold mb-2 block">Description</Label>
                                                        <textarea
                                                            id="description"
                                                            value={formData.description}
                                                            onChange={(e) => updateForm('description', e.target.value)}
                                                            className="w-full min-h-[120px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                            placeholder="Describe your place to guests..."
                                                        />
                                                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 3: LOCATION */}
                                    {step === 3 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg">
                                                    <MapPin className="h-7 w-7" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-gray-900">Where is it located?</h1>
                                                    <p className="text-gray-500">Your address is only shared with guests after they book.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <Label htmlFor="address" className="text-gray-900 font-semibold mb-2 block">Street Address</Label>
                                                    <Input
                                                        id="address"
                                                        value={formData.address}
                                                        onChange={(e) => updateForm('address', e.target.value)}
                                                        placeholder="e.g. 123 Main St, Apt 4B"
                                                        className="h-12 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    />
                                                    {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <Label htmlFor="city" className="text-gray-900 font-semibold mb-2 block">City</Label>
                                                        <Input
                                                            id="city"
                                                            value={formData.city}
                                                            onChange={(e) => updateForm('city', e.target.value)}
                                                            placeholder="e.g. New York"
                                                            className="h-12 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        />
                                                        {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="state" className="text-gray-900 font-semibold mb-2 block">State / Province</Label>
                                                        <Input
                                                            id="state"
                                                            value={formData.state}
                                                            onChange={(e) => updateForm('state', e.target.value)}
                                                            placeholder="e.g. NY"
                                                            className="h-12 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        />
                                                        {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <Label htmlFor="zip" className="text-gray-900 font-semibold mb-2 block">Zip Code</Label>
                                                        <Input
                                                            id="zip"
                                                            value={formData.zip}
                                                            onChange={(e) => updateForm('zip', e.target.value)}
                                                            placeholder="e.g. 10001"
                                                            className="h-12 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        />
                                                        {errors.zip && <p className="text-sm text-red-500 mt-1">{errors.zip}</p>}
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="country" className="text-gray-900 font-semibold mb-2 block">Country</Label>
                                                        <Input
                                                            id="country"
                                                            value={formData.country}
                                                            disabled
                                                            className="h-12 border border-gray-200 rounded-xl text-black bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 4: MEDIA */}
                                    {step === 4 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg">
                                                    <Camera className="h-7 w-7" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-gray-900">Add photos & video</h1>
                                                    <p className="text-gray-500">Showcase your property to attract more guests. High-quality photos get 3x more bookings!</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div
                                                    onClick={handleFileClick}
                                                    className="group border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-500 hover:bg-indigo-50/30 cursor-pointer transition-all relative overflow-hidden"
                                                >
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        ref={fileInputRef}
                                                        onChange={(e) => handleFileChange(e, 'photos')}
                                                    />
                                                    <div className="w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                                        <Upload className={`h-10 w-10 ${errors.photos ? "text-red-400" : "text-gray-400"} group-hover:text-indigo-600`} />
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-gray-900">Drag & drop photos here</h3>
                                                    <p className="text-gray-500 mt-2">or click to browse</p>
                                                    <p className="text-xs text-gray-400 mt-4">Upload at least 1 photo</p>
                                                    {errors.photos && <p className="text-sm text-red-500 mt-2">{errors.photos}</p>}
                                                    {formData.photos.length > 0 && <p className="text-sm text-green-600 mt-2">{formData.photos.length} photos selected</p>}
                                                </div>

                                                <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
                                                    <Video className="w-6 h-6 text-blue-600 mt-0.5 -shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-blue-900 text-sm">Add a Video Tour</h4>
                                                        <p className="text-xs text-blue-700 mt-1">Listings with video tours get 20% more bookings and higher ratings.</p>
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            className="hidden"
                                                            ref={videoInputRef}
                                                            onChange={(e) => handleFileChange(e, 'video')}
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={handleVideoClick}
                                                            className="mt-2 bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                                                        >
                                                            {formData.video ? "Video Selected" : "Upload Video"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 5: AMENITIES & RULES + PROPERTY DOCUMENTS */}
                                    {step === 5 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg">
                                                    <Shield className="h-7 w-7" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-gray-900">Amenities & Legal</h1>
                                                    <p className="text-gray-500">What do you offer and what are your rules?</p>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <div>
                                                    <Label className="text-gray-900 font-semibold mb-4 block text-lg">Amenities</Label>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        {["Wifi", "Kitchen", "Washer", "Dryer", "AC", "Heating", "TV", "Workspace", "Parking", "Pool", "Gym", "Hot Tub"].map((item) => (
                                                            <div key={item} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group">
                                                                <Checkbox
                                                                    id={`amenity-${item}`}
                                                                    checked={formData.amenities.includes(item)}
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) {
                                                                            setFormData(prev => ({ ...prev, amenities: [...prev.amenities, item] }))
                                                                        } else {
                                                                            setFormData(prev => ({ ...prev, amenities: prev.amenities.filter(i => i !== item) }))
                                                                        }
                                                                    }}
                                                                />
                                                                <Label htmlFor={`amenity-${item}`} className="text-gray-700 font-medium cursor-pointer flex-1">{item}</Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-linear-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6">
                                                    <Label className="text-amber-900 font-semibold mb-4 flex items-center gap-2">
                                                        <Shield className="w-5 h-5" /> Safety Checklist
                                                    </Label>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {["Smoke Alarm", "Carbon Monoxide Detector", "Fire Extinguisher", "First Aid Kit", "Emergency Exit Route"].map((item) => (
                                                            <div key={item} className="flex items-center space-x-3">
                                                                <Checkbox
                                                                    id={`safety-${item}`}
                                                                    className="border-amber-400 data-[state=checked]:bg-amber-500"
                                                                    checked={formData.safetyItems.includes(item)}
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) {
                                                                            setFormData(prev => ({ ...prev, safetyItems: [...prev.safetyItems, item] }))
                                                                        } else {
                                                                            setFormData(prev => ({ ...prev, safetyItems: prev.safetyItems.filter(i => i !== item) }))
                                                                        }
                                                                    }}
                                                                />
                                                                <Label htmlFor={`safety-${item}`} className="text-amber-900 cursor-pointer">{item}</Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-3 mt-4">Property Documents</h4>
                                                    <div className="grid gap-4">
                                                        {[
                                                            { title: "Property Deed / Lease", desc: "Proof of ownership or right to sublet" },
                                                            { title: "Local License", desc: "Short-term rental permit (if required)" }
                                                        ].map((doc, i) => (
                                                            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors bg-white">
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                                                                    <p className="text-sm text-gray-500">{doc.desc}</p>
                                                                </div>
                                                                <input
                                                                    id={`doc-upload-${i}`}
                                                                    type="file"
                                                                    accept="image/*,.pdf"
                                                                    className="hidden"
                                                                    onChange={(e) => handleFileChange(e, 'document', i)}
                                                                />
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => document.getElementById(`doc-upload-${i}`).click()}
                                                                >
                                                                    {formData.documents[i] ? "File Selected" : "Upload"}
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 6: PRICING */}
                                    {step === 6 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg">
                                                    <DollarSign className="h-7 w-7" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-gray-900">Pricing & Availability</h1>
                                                    <p className="text-gray-500">Set your rates and discounts to maximize your earnings.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <Label className="text-gray-700 font-semibold mb-3 block">Pricing Model</Label>
                                                    <div className="flex gap-4">
                                                        {['nightly', 'weekly', 'monthly'].map((model) => (
                                                            <div
                                                                key={model}
                                                                onClick={() => updateForm('pricingModel', model)}
                                                                className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all text-center capitalize font-medium ${formData.pricingModel === model
                                                                    ? 'border-indigo-600 bg-linear-to-br from-indigo-50 to-purple-50 text-indigo-700'
                                                                    : 'border-gray-200 hover:border-indigo-200 text-gray-600'
                                                                    }`}
                                                            >
                                                                {model}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <Label htmlFor="price" className="text-gray-900 font-semibold mb-2 block">
                                                            Base Price per {formData.pricingModel === 'nightly' ? 'Night' : formData.pricingModel === 'weekly' ? 'Week' : 'Month'}
                                                        </Label>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                                            <Input
                                                                id="price"
                                                                type="number"
                                                                value={formData.price}
                                                                onChange={(e) => updateForm('price', e.target.value)}
                                                                className="pl-8 h-12 text-lg font-semibold border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                placeholder="0"
                                                            />
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-2">Recommended: ${formData.pricingModel === 'nightly' ? '50-150' : formData.pricingModel === 'weekly' ? '300-900' : '1200-3000'}</p>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="currency" className="text-gray-900 font-semibold mb-2 block">Currency</Label>
                                                        <select
                                                            id="currency"
                                                            value={formData.currency}
                                                            onChange={(e) => updateForm('currency', e.target.value)}
                                                            className="w-full h-12 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        >
                                                            <option value="USD">USD ($)</option>
                                                            <option value="EUR">EUR (€)</option>
                                                            <option value="GBP">GBP (£)</option>
                                                            <option value="CAD">CAD ($)</option>
                                                            <option value="AUD">AUD ($)</option>
                                                            <option value="INR">INR (₹)</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl space-y-4">
                                                    <h4 className="font-semibold text-gray-900">Additional Fees</h4>
                                                    <div className="grid md:grid-cols-3 gap-4">
                                                        <div>
                                                            <Label htmlFor="cleaning" className="text-gray-600 text-sm mb-1 block">Cleaning Fee</Label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                                                                <Input
                                                                    id="cleaning"
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="pl-6 h-10 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                    value={formData.cleaningFee}
                                                                    onChange={(e) => updateForm('cleaningFee', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="service" className="text-gray-600 text-sm mb-1 block">Service Fee (%)</Label>
                                                            <div className="relative">
                                                                <Input
                                                                    id="service"
                                                                    type="number"
                                                                    placeholder="3"
                                                                    className="h-10 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                    value={formData.serviceFee}
                                                                    onChange={(e) => updateForm('serviceFee', e.target.value)}
                                                                />
                                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="deposit" className="text-gray-600 text-sm mb-1 block">Security Deposit</Label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                                                                <Input
                                                                    id="deposit"
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="pl-6 h-10 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                    value={formData.securityDeposit}
                                                                    onChange={(e) => updateForm('securityDeposit', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {formData.pricingModel !== 'monthly' && (
                                                    <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl space-y-4">
                                                        <h4 className="font-semibold text-gray-900">Discounts</h4>
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            {formData.pricingModel === 'nightly' && (
                                                                <div>
                                                                    <Label htmlFor="weekly" className="text-gray-600 text-sm mb-1 block">Weekly Discount (%)</Label>
                                                                    <Input
                                                                        id="weekly"
                                                                        type="number"
                                                                        placeholder="10"
                                                                        className="h-10 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                        value={formData.weeklyDiscount}
                                                                        onChange={(e) => updateForm('weeklyDiscount', e.target.value)}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <Label htmlFor="monthly" className="text-gray-600 text-sm mb-1 block">Monthly Discount (%)</Label>
                                                                <Input
                                                                    id="monthly"
                                                                    type="number"
                                                                    placeholder="20"
                                                                    className="h-10 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                    value={formData.monthlyDiscount}
                                                                    onChange={(e) => updateForm('monthlyDiscount', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 7: REVIEW */}
                                    {step === 7 && (
                                        <div className="space-y-8 text-center py-8">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="w-24 h-24 bg-linear-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                            >
                                                <CheckCircle className="h-12 w-12 text-green-600" />
                                            </motion.div>

                                            <div>
                                                <h1 className="text-3xl font-bold mb-2 text-gray-900">Ready to publish?</h1>
                                                <p className="text-gray-500 max-w-md mx-auto">
                                                    Your listing is ready to be seen by millions of travelers. Review your details one last time.
                                                </p>
                                            </div>

                                            <div className="bg-white border border-gray-200 p-6 rounded-2xl text-left max-w-md mx-auto shadow-sm">
                                                <h3 className="font-bold mb-4 text-gray-900 border-b pb-2">Listing Summary</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Title</span>
                                                        <span className="font-medium text-gray-900">{formData.title || "Untitled Listing"}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Price</span>
                                                        <span className="font-medium text-gray-900">${formData.price || 0} / night</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Location</span>
                                                        <span className="font-medium text-gray-900">{formData.city}, {formData.country}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 text-left bg-linear-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 max-w-md mx-auto">
                                                <Checkbox id="confirm" className="mt-1 border-indigo-400 data-[state=checked]:bg-indigo-600" />
                                                <Label htmlFor="confirm" className="text-sm text-indigo-900 font-medium cursor-pointer leading-relaxed">
                                                    I declare all information is accurate and truthful. I understand my listing may be removed if misleading.
                                                </Label>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
                                        <Button
                                            variant="ghost"
                                            onClick={prevStep}
                                            disabled={step === 1}
                                            className={step === 1 ? "invisible" : "bg-accent hover:bg-background cursor-pointer"}
                                        >
                                            <ChevronLeft className="h-4 w-4 mr-2" /> Back
                                        </Button>

                                        {step < totalSteps ? (
                                            <Button onClick={nextStep} className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 cursor-pointer">
                                                Next <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handlePublish}
                                                className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-105 cursor-pointer"
                                            >
                                                Publish Listing
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="hidden lg:block">
                                    <EmbeddedGuidelines
                                        currentStep={step}
                                        activeCountry={activeCountry}
                                        selectedCategory={selectedCategoryData}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div >
            <Footer />
            <AnimatePresence>
                {showOtpModal && (
                    <OtpVerification
                        email={formData.hostEmail}
                        onVerify={handleVerifyOtp}
                        onResend={handleSendOtp}
                        onClose={() => setShowOtpModal(false)}
                        isLoading={isSavingVerification}
                    />
                )}
            </AnimatePresence>
        </main >
    )
}