import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function WizardNavigation({
    currentStep,
    totalSteps,
    nextStep,
    prevStep
}) {
    return (
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
            <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${currentStep === 1
                    ? 'opacity-0 pointer-events-none'
                    : 'bg-white/5 hover:bg-white/10 text-white'
                    }`}
            >
                <ArrowLeft className="h-5 w-5" /> Back
            </button>

            <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm">Step {currentStep} of {totalSteps}</span>
                {currentStep < totalSteps ? (
                    <button
                        onClick={nextStep}
                        className="bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 group"
                    >
                        Next <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : null}
            </div>
        </div>
    );
}
