import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CATEGORIES } from '@/lib/mock-data';
import { AnimatePresence, motion } from 'framer-motion';

// Import New Hook & Components
import { useHostCreation, STEPS } from '@/hooks/useHostCreation';
import { WizardProgress } from '@/components/host/wizard/WizardProgress';
import { WizardNavigation } from '@/components/host/wizard/WizardNavigation';

// Import Step Components
import { StepBasics } from '@/components/host/wizard/StepBasics';
import { StepLocation } from '@/components/host/wizard/StepLocation';
import { StepPricing } from '@/components/host/wizard/StepPricing';
import { StepMedia } from '@/components/host/wizard/StepMedia';
import { StepAmenities } from '@/components/host/wizard/StepAmenities';
import { StepReview } from '@/components/host/wizard/StepReview';

export default function HostCreatePage() {
    const {
        // State
        currentStep,
        direction,
        isLoading,
        formData,
        setFormData,
        customAmenityInput,
        setCustomAmenityInput,
        customRuleInput,
        setCustomRuleInput,
        termsAccepted,
        setTermsAccepted,
        displayedTerms,

        // Actions
        handleSendOtp,
        handleVerifyOtp,
        handleFileChange,
        removeArrayItem,
        toggleAmenity,
        addCustomAmenity,
        addRule,
        nextStep,
        prevStep,
        handleSubmit,
        isEdit, // From hook
        isReadOnly
    } = useHostCreation();

    const variants = {
        enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
    };

    return (
        <main className="min-h-screen bg-[#00152d] text-[#f7eed7] font-sans selection:bg-accent/30 pb-20">
            <Navbar />

            <div className="container mx-auto px-4 pt-28 max-w-5xl">
                <WizardProgress steps={STEPS} currentStep={currentStep} />

                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 min-h-[500px] flex flex-col relative overflow-hidden">
                    <AnimatePresence mode='wait' custom={direction}>
                        <motion.div
                            key={currentStep}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex-1 w-full"
                        >
                            {currentStep === 1 && (
                                <StepBasics
                                    formData={formData}
                                    setFormData={setFormData}
                                    categories={CATEGORIES}
                                    isEdit={isEdit}
                                />
                            )}
                            {currentStep === 2 && (
                                <StepLocation
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}
                            {currentStep === 3 && (
                                <StepPricing
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}
                            {currentStep === 4 && (
                                <StepMedia
                                    formData={formData}
                                    setFormData={setFormData}
                                    handleFileChange={handleFileChange}
                                    removeArrayItem={removeArrayItem}
                                />
                            )}
                            {currentStep === 5 && (
                                <StepAmenities
                                    formData={formData}
                                    toggleAmenity={toggleAmenity}
                                    customAmenityInput={customAmenityInput}
                                    setCustomAmenityInput={setCustomAmenityInput}
                                    addCustomAmenity={addCustomAmenity}
                                    removeArrayItem={removeArrayItem}
                                    customRuleInput={customRuleInput}
                                    setCustomRuleInput={setCustomRuleInput}
                                    addRule={addRule}
                                />
                            )}
                            {currentStep === 6 && (
                                <StepReview
                                    formData={formData}
                                    termsAccepted={termsAccepted}
                                    setTermsAccepted={setTermsAccepted}
                                    displayedTerms={displayedTerms}
                                    handleSubmit={handleSubmit}
                                    isLoading={isLoading}
                                    STEPS={STEPS}
                                    isReadOnly={isReadOnly}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <WizardNavigation
                        currentStep={currentStep}
                        totalSteps={STEPS.length}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                </div>
            </div>
        </main>
    );
}