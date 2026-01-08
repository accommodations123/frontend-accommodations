import React from "react"

export const StepIndicator = ({ step }) => {
    return (
        <div className="px-8 py-6 mb-8 rounded-2xl overflow-hidden shadow-lg" style={{ background: "linear-gradient(to right, #00162d, #003366)" }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'text-white' : 'bg-white/20 text-white'}`} style={{ backgroundColor: step === 1 ? "#c92a26" : "" }}>
                        <span className="font-semibold">1</span>
                    </div>
                    <div className="text-white">
                        <h3 className="font-semibold">Event Details</h3>
                        <p className="text-sm opacity-80">Basic information about your event</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'text-white' : 'bg-white/20 text-white'}`} style={{ backgroundColor: step === 2 ? "#c92a26" : "" }}>
                        <span className="font-semibold">2</span>
                    </div>
                    <div className="text-white">
                        <h3 className="font-semibold">Rules & Verification</h3>
                        <p className="text-sm opacity-80">Complete requirements</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
