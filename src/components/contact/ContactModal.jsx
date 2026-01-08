import React, { useState } from 'react';
import { X, ArrowLeft, Phone, MessageSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactModal({ isOpen, onClose, listing, type = 'call' }) {
    // type: 'call' | 'message' | 'view-number'

    const [step, setStep] = useState('form'); // 'form' | 'success' (for message)
    const [name, setName] = useState("Daniel Brooks");
    const [phone, setPhone] = useState("+01 123 456 7890");
    const [isAgent, setIsAgent] = useState(false);

    if (!isOpen || !listing) return null;

    // Mock Owner Data (if missing from listing)
    const owner = listing.owner || {
        name: "Ethan Walker",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
        phone: "+01 90XXXXXX12"
    };

    const handleAction = () => {
        if (type === 'call' || type === 'view-number') {
            window.location.href = `tel:${owner.phone.replace(/X/g, '0')}`; // Mock unmasking
        } else {
            // Message logic
            setStep('success');
            setTimeout(() => {
                onClose();
                setStep('form');
            }, 2000);
        }
    };

    const actionLabel = type === 'message' ? 'Send Message' : 'Call';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 pointer-events-auto"
                        onClick={onClose}
                    />

                    {/* Modal/Drawer Content */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white w-full md:w-[450px] md:rounded-3xl rounded-t-[30px] overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 pb-2">
                            <button onClick={onClose} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors inline-flex">
                                <ArrowLeft className="w-6 h-6 text-gray-900" />
                            </button>
                            <h2 className="text-xl font-bold text-gray-900 mt-2">
                                Enter your details to connect with the property owner.
                            </h2>
                        </div>

                        {/* Scrollable Form */}
                        <div className="px-6 pb-6 flex-1 overflow-y-auto">

                            {/* Owner Profile */}
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="relative mb-3">
                                    <img
                                        src={owner.image}
                                        alt={owner.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border-2 border-white">
                                        Owner
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{owner.name}</h3>
                                <p className="text-gray-500 font-medium">{owner.phone}</p>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-1">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full h-14 px-4 rounded-xl border border-gray-200   font-medium focus:outline-none  transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                    <button className="text-xs text-primary font-bold mt-2 ml-1 hover:underline">Change Number</button>
                                </div>

                                {/* Agent Toggle */}
                                <div className="pt-2">
                                    <p className="text-sm font-bold text-gray-700 mb-3">Are you Real Estate Agent</p>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setIsAgent(true)}
                                            className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${isAgent
                                                ? 'bg-gray-900 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            onClick={() => setIsAgent(false)}
                                            className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${!isAgent
                                                ? 'bg-gray-900 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-6 bg-white border-t border-gray-100">
                            {step === 'success' ? (
                                <Button className="w-full h-14 rounded-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold shadow-lg shadow-green-200">
                                    <Check className="w-5 h-5 mr-2" /> Sent!
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleAction}
                                    className="w-full h-14 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-lg font-bold shadow-lg shadow-purple-200"
                                >
                                    {actionLabel}
                                </Button>
                            )}
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
