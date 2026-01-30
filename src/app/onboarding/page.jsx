import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Briefcase, Users, Home, Globe, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function OnboardingPage() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [userType, setUserType] = useState("")
    const [destination, setDestination] = useState("")

    const userTypes = [
        { id: "student", label: "Student", icon: GraduationCap, desc: "Moving for studies" },
        { id: "professional", label: "Working Professional", icon: Briefcase, desc: "Moving for work" },
        { id: "family", label: "Family", icon: Users, desc: "Relocating with family" },
        { id: "host", label: "Host", icon: Home, desc: "Listing a property" },
    ]

    const destinations = [
        { id: "US", label: "United States", flag: "🇺🇸" },
        { id: "UK", label: "United Kingdom", flag: "🇬🇧" },
        { id: "CA", label: "Canada", flag: "🇨🇦" },
        { id: "AU", label: "Australia", flag: "🇦🇺" },
        { id: "DE", label: "Germany", flag: "🇩🇪" },
        { id: "AE", label: "UAE", flag: "🇦🇪" },
    ]

    const handleNext = () => {
        if (step === 1 && userType) setStep(2)
        else if (step === 2 && destination) setStep(3)
        else if (step === 3) navigate("/") // Or dashboard
    }

    return (
        <main className="min-h-screen bg-background pt-20">
            <Navbar />
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh]">
                <div className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Progress */}
                    <div className="absolute top-0 left-0 h-1 bg-accent transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {step === 1 && "Tell us about yourself"}
                            {step === 2 && "Where are you headed?"}
                            {step === 3 && "Welcome to NextKinLife!"}
                        </h1>
                        <p className="text-gray-400">
                            {step === 1 && "Select the option that best describes you."}
                            {step === 2 && "We'll show you relevant communities and listings."}
                            {step === 3 && "You're all set. Let's find your home away from home."}
                        </p>
                    </div>

                    {/* Step 1: User Type */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {userTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setUserType(type.id)}
                                    className={`p-6 rounded-xl border text-left transition-all ${userType === type.id
                                        ? "bg-accent text-white border-accent"
                                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    <type.icon className={`h-8 w-8 mb-4 ${userType === type.id ? "text-white" : "text-accent"}`} />
                                    <h3 className="font-bold text-lg">{type.label}</h3>
                                    <p className={`text-sm ${userType === type.id ? "text-white/80" : "text-gray-500"}`}>{type.desc}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Destination */}
                    {step === 2 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {destinations.map((dest) => (
                                <button
                                    key={dest.id}
                                    onClick={() => setDestination(dest.id)}
                                    className={`p-6 rounded-xl border text-center transition-all ${destination === dest.id
                                        ? "bg-accent text-white border-accent"
                                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    <span className="text-4xl mb-4 block">{dest.flag}</span>
                                    <h3 className="font-bold">{dest.label}</h3>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="text-center py-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="h-12 w-12 text-green-500" />
                            </motion.div>
                            <p className="text-xl text-white mb-8">
                                We've personalized your experience for <strong>{userTypes.find(u => u.id === userType)?.label}</strong> in <strong>{destinations.find(d => d.id === destination)?.label}</strong>.
                            </p>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <Button
                            onClick={handleNext}
                            disabled={step === 1 && !userType || step === 2 && !destination}
                            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg rounded-xl font-bold w-full md:w-auto"
                        >
                            {step === 3 ? "Start Exploring" : "Continue"}
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
