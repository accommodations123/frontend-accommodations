
"use client"

import * as React from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight, ChevronLeft, Upload, Home, MapPin, Camera, CheckCircle, Video, Shield, DollarSign, Calendar, BedDouble, Bath, Users as UsersIcon, Building2 } from "lucide-react"
import { Footer } from "@/components/layout/Footer"
import { EmbeddedGuidelines } from "@/components/host/EmbeddedGuidelines"
import { categories } from "@/lib/host-rules-data"
import { useCountry } from "@/context/CountryContext"
import { Counter } from "@/components/ui/counter"
import { CardSelect } from "@/components/ui/card-select"
import { motion, AnimatePresence } from "framer-motion"

export default function HostOnboardingPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const preSelectedCategory = searchParams.get("category")
    const [step, setStep] = React.useState(1)
    const totalSteps = 7
    const { activeCountry } = useCountry()

    // Form State
    const [formData, setFormData] = React.useState({
        category: preSelectedCategory || "",
        title: "",
        description: "",
        propertyType: "Apartment",
        privacyType: "Entire Place",
        area: "",
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        address: "",
        city: "",
        state: "",
        zip: "",
        country: activeCountry.name,
        pricingModel: "nightly",
        price: "",
        currency: "USD",

        cleaningFee: "",
        serviceFee: "",
        securityDeposit: "",
        weeklyDiscount: "",
        monthlyDiscount: ""
    })

    const updateForm = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const nextStep = () => setStep(Math.min(step + 1, totalSteps))
    const prevStep = () => setStep(Math.max(step - 1, 1))

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

    return (
        <main className="min-h-screen pt-20 ">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">

                    {/* Main Form Area */}
                    <div className="flex-1">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                                <span>Step {step} of {totalSteps}</span>
                                <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-indigo-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 min-h-[600px] flex flex-col relative overflow-hidden"
                        >
                            {/* Decorative gradient blob */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />



                            <div className="flex-1 relative z-10 grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    {step === 1 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                                    <Home className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-bold text-gray-900">Tell us about your place</h1>
                                                    <p className="text-gray-500">Share the basic details of your listing.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                {/* Category Section */}
                                                <div>
                                                    <Label className="text-gray-900 text-base font-semibold mb-3 block">Which of these best describes your place?</Label>
                                                    {preSelectedCategory && selectedCategoryData ? (
                                                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-4">
                                                            <div className="p-3 bg-white rounded-lg shadow-sm text-indigo-600">
                                                                {React.createElement(selectedCategoryData.icon, { className: "w-6 h-6" })}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">{selectedCategoryData.name}</h3>
                                                                <p className="text-sm text-gray-500">Selected Category</p>
                                                            </div>
                                                            <div className="ml-auto">
                                                                <CheckCircle className="w-6 h-6 text-indigo-600" />
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

                                                {/* Property & Privacy Type */}
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <Label className="text-gray-900 text-base font-semibold mb-3 block">Property Type</Label>
                                                        <CardSelect
                                                            options={propertyTypes}
                                                            value={formData.propertyType}
                                                            onChange={(val) => updateForm('propertyType', val)}
                                                            className="grid-cols-1 sm:grid-cols-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-900 text-base font-semibold mb-3 block">Privacy Type</Label>
                                                        <CardSelect
                                                            options={privacyTypes}
                                                            value={formData.privacyType}
                                                            onChange={(val) => updateForm('privacyType', val)}
                                                            className="grid-cols-1 sm:grid-cols-2"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Area Input */}
                                                <div>
                                                    <Label htmlFor="area" className="text-gray-900 font-semibold mb-2 block">Accommodation Area</Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="area"
                                                            type="number"
                                                            value={formData.area}
                                                            onChange={(e) => updateForm('area', e.target.value)}
                                                            placeholder="e.g. 1200"
                                                            className="h-12 border-gray-200 rounded-xl text-black focus:ring-indigo-500 pr-16"
                                                        />
                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">sq ft</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">Approximate size of the space guests will use.</p>
                                                </div>

                                                {/* Counters */}
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

                                                {/* Title & Description */}
                                                <div className="space-y-6 pt-6 border-t border-gray-100">
                                                    <div>
                                                        <Label htmlFor="title" className="text-gray-900 font-semibold mb-2 block">Listing Title</Label>
                                                        <Input
                                                            id="title"
                                                            value={formData.title}
                                                            onChange={(e) => updateForm('title', e.target.value)}
                                                            placeholder="e.g. Modern Loft in Downtown"
                                                            className="h-12 text-lg border-gray-200 rounded-xl text-black focus:ring-indigo-500"
                                                        />
                                                        <p className="text-xs text-gray-500 mt-2">Catchy title to attract guests (max 50 chars).</p>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="description" className="text-gray-900 font-semibold mb-2 block">Description</Label>
                                                        <textarea
                                                            id="description"
                                                            value={formData.description}
                                                            onChange={(e) => updateForm('description', e.target.value)}
                                                            className="w-full min-h-[120px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                            placeholder="Describe your place to guests..."
                                                        />
                                                        <p className="text-xs text-gray-500 mt-2">Mention best features, location perks, and house rules.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                                    <MapPin className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-bold text-gray-900">Where is it located?</h1>
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
                                                        className="h-12 border-gray-200 rounded-xl text-black focus:ring-indigo-500"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-2">Enter the exact location.</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <Label htmlFor="city" className="text-gray-900 font-semibold mb-2 block">City</Label>
                                                        <Input
                                                            id="city"
                                                            value={formData.city}
                                                            onChange={(e) => updateForm('city', e.target.value)}
                                                            placeholder="e.g. New York"
                                                            className="h-12 border-gray-200 rounded-xl text-black focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="state" className="text-gray-900 font-semibold mb-2 block">State / Province</Label>
                                                        <Input
                                                            id="state"
                                                            value={formData.state}
                                                            onChange={(e) => updateForm('state', e.target.value)}
                                                            placeholder="e.g. NY"
                                                            className="h-12 border-gray-200 rounded-xl text-black focus:ring-indigo-500"
                                                        />
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
                                                            className="h-12 border-gray-200 rounded-xl text-black focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="country" className="text-gray-900 font-semibold mb-2 block">Country</Label>
                                                        <Input
                                                            id="country"
                                                            value={formData.country}
                                                            disabled
                                                            className="h-12 border-gray-200 rounded-xl text-black bg-gray-50"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                                    <Camera className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-bold text-gray-900">Add photos & video</h1>
                                                    <p className="text-gray-500">Showcase your property to attract more guests.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="group border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-500 hover:bg-indigo-50/30 cursor-pointer transition-all">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
                                                        <Upload className="h-8 w-8 text-gray-400 group-hover:text-indigo-600" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900">Drag & drop photos here</h3>
                                                    <p className="text-gray-500 mt-2">or click to browse</p>
                                                    <p className="text-xs text-gray-400 mt-4">Upload at least 5 photos (High Quality)</p>
                                                    <Button variant="outline" className="mt-6 border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                                        Browse Files
                                                    </Button>
                                                </div>

                                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                                    <Video className="w-5 h-5 text-blue-600 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-blue-900 text-sm">Add a Video Tour</h4>
                                                        <p className="text-xs text-blue-700 mt-1">Listings with video tours get 20% more bookings.</p>
                                                        <Button variant="outline" size="sm" className="mt-2 bg-white text-blue-700 border-blue-200 hover:bg-blue-50">
                                                            Upload Video
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                                    <Shield className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-bold text-gray-900">Amenities & Rules</h1>
                                                    <p className="text-gray-500">What do you offer and what are your rules?</p>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <div>
                                                    <Label className="text-gray-900 font-semibold mb-4 block text-lg">Amenities</Label>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        {["Wifi", "Kitchen", "Washer", "Dryer", "AC", "Heating", "TV", "Workspace", "Parking", "Pool", "Gym", "Hot Tub"].map((item) => (
                                                            <div key={item} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                                                <Checkbox id={`amenity-${item}`} />
                                                                <Label htmlFor={`amenity-${item}`} className="text-gray-700 font-medium cursor-pointer flex-1">{item}</Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                                                    <Label className="text-amber-900 font-semibold mb-4 block flex items-center gap-2">
                                                        <Shield className="w-4 h-4" /> Safety Checklist
                                                    </Label>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {["Smoke Alarm", "Carbon Monoxide Detector", "Fire Extinguisher", "First Aid Kit", "Emergency Exit Route"].map((item) => (
                                                            <div key={item} className="flex items-center space-x-3">
                                                                <Checkbox id={`safety-${item}`} className="border-amber-400 data-[state=checked]:bg-amber-500" />
                                                                <Label htmlFor={`safety-${item}`} className="text-amber-900 cursor-pointer">{item}</Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 5 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                                    <Upload className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-bold text-gray-900">Legal & Documents</h1>
                                                    <p className="text-gray-500">Verify your identity and property ownership.</p>
                                                </div>
                                            </div>

                                            <div className="grid gap-6">
                                                {[
                                                    { title: "Government ID", desc: "Passport or Driver's License" },
                                                    { title: "Property Deed / Lease", desc: "Proof of ownership or right to sublet" },
                                                    { title: "Local License", desc: "Short-term rental permit (if required)" }
                                                ].map((doc, i) => (
                                                    <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors bg-white">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                                                            <p className="text-sm text-gray-500">{doc.desc}</p>
                                                        </div>
                                                        <Button variant="outline">Upload</Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {step === 6 && (
                                        <div className="space-y-8 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                                    <DollarSign className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-bold text-gray-900">Pricing & Availability</h1>
                                                    <p className="text-gray-500">Set your rates and discounts.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {/* Pricing Model Selector */}
                                                <div>
                                                    <Label className="text-gray-700 font-semibold mb-3 block">Pricing Model</Label>
                                                    <div className="flex gap-4">
                                                        {['nightly', 'weekly', 'monthly'].map((model) => (
                                                            <div
                                                                key={model}
                                                                onClick={() => updateForm('pricingModel', model)}
                                                                className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all text-center capitalize font-medium ${formData.pricingModel === model
                                                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
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
                                                                className="pl-8 h-12 text-lg font-semibold border border-gray-200 rounded-xl text-black focus:ring-indigo-500"
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
                                                            className="w-full h-12 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-indigo-500"
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

                                                <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
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
                                                                    className="pl-6 h-10 border border-gray-200 rounded-xl text-black"
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
                                                                    className="h-10 border border-gray-200 rounded-xl text-black"
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
                                                                    className="pl-6 h-10 border border-gray-200 rounded-xl text-black"
                                                                    value={formData.securityDeposit}
                                                                    onChange={(e) => updateForm('securityDeposit', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {formData.pricingModel !== 'monthly' && (
                                                    <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                                                        <h4 className="font-semibold text-gray-900">Discounts</h4>
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            {formData.pricingModel === 'nightly' && (
                                                                <div>
                                                                    <Label htmlFor="weekly" className="text-gray-600 text-sm mb-1 block">Weekly Discount (%)</Label>
                                                                    <Input
                                                                        id="weekly"
                                                                        type="number"
                                                                        placeholder="10"
                                                                        className="h-10 border border-gray-200 rounded-xl text-black"
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
                                                                    className="h-10 border border-gray-200 rounded-xl text-black"
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

                                    {step === 7 && (
                                        <div className="space-y-8 text-center py-8">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
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

                                            <div className="flex items-start gap-3 text-left bg-indigo-50 p-4 rounded-xl border border-indigo-100 max-w-md mx-auto">
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
                                            <Button onClick={nextStep} className="bg-accent hover:bg-background text-white px-8 rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 cursor-pointer">
                                                Next <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => navigate("")}
                                                className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-105 cursor-pointer"
                                            >
                                                Publish Listing
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Embedded Guidelines */}
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
        </main >
    )
}


