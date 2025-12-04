"use client"

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, AlertTriangle, Info, Globe, Shield, Star, ChevronDown } from 'lucide-react';
import { categories, universalRules } from '@/lib/host-rules-data';
import { COUNTRIES } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/Navbar';
import { useCountry } from '@/context/CountryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HostYourHouse = () => {
    const { activeCountry, setCountry: setActiveCountry } = useCountry();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    // Reset selection when country changes
    useEffect(() => {
        setSelectedCategory(null);
    }, [activeCountry]);

    const currentUniversalRules = universalRules[activeCountry.code] || universalRules['US'];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 space-y-6 relative"
                >
                    {/* Top Right Country Selector */}
                    {/* <div className="absolute top-0 right-0 hidden md:block">
                        <div className="relative group">
                            <button className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                                <span className="text-2xl">{activeCountry.flag}</span>
                                <span className="text-sm font-medium text-white">{activeCountry.name}</span>
                                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                            </button>

                            <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {COUNTRIES.map((country) => (
                                        <button
                                            key={country.code}
                                            onClick={() => setActiveCountry(country)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${activeCountry.code === country.code
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <span className="text-2xl">{country.flag}</span>
                                            <span className="text-sm font-medium">{country.name}</span>
                                            {activeCountry.code === country.code && <Check className="w-4 h-4 ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-indigo-300">
                        <Globe className="w-4 h-4" />
                        <span>Hosting in {activeCountry.name}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Host your space,<br />
                        <span className="text-indigo-400">your way.</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Earn income by sharing your property. Review the local guidelines for {activeCountry.name} to get started safely and legally.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left Column: Categories */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">Select Category</h2>
                            <span className="text-sm text-slate-500">{categories.length} options available</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {categories.map((category, idx) => {
                                const Icon = category.icon;
                                const isSelected = selectedCategory?.id === category.id;

                                return (
                                    <motion.button
                                        key={category.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`relative group p-6 rounded-2xl border transition-all duration-300 text-left h-40 flex flex-col justify-between overflow-hidden
                                            ${isSelected
                                                ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/25'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-xl w-fit transition-colors ${isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <div>
                                            <h3 className={`font-semibold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                                                {category.name}
                                            </h3>
                                            {isSelected && (
                                                <motion.div
                                                    layoutId="check"
                                                    className="absolute top-4 right-4 bg-white text-indigo-600 rounded-full p-1"
                                                >
                                                    <Check className="w-3 h-3" />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Universal Rules Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md mt-12"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Universal Rules for {activeCountry.name}</h3>
                                    <p className="text-slate-400 text-sm">Mandatory for all hosts in this region</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {currentUniversalRules.map((rule, index) => (
                                    <div key={index} className="flex gap-3 items-start p-3 rounded-xl hover:bg-white/5 transition-colors">
                                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                        <span className="text-slate-300 text-sm leading-relaxed">{rule}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Dynamic Rules Panel */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <AnimatePresence mode="wait">
                                {selectedCategory ? (
                                    <motion.div
                                        key={selectedCategory.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
                                    >
                                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                                            <div className="p-4 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
                                                <selectedCategory.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold">{selectedCategory.name}</h3>
                                                <p className="text-indigo-300 text-sm">Specific Guidelines</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6 mb-8">
                                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                                                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                                                <p className="text-amber-200 text-sm">
                                                    Ensure you comply with all local regulations for {activeCountry.name} before proceeding.
                                                </p>
                                            </div>

                                            <ul className="space-y-4">
                                                {(selectedCategory.rules[activeCountry.code] || selectedCategory.rules['US']).map((rule, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="flex gap-4 items-start"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400 text-xs font-bold">
                                                            {idx + 1}
                                                        </div>
                                                        <span className="text-slate-300 leading-relaxed">{rule}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Button
                                            onClick={() => navigate(`/host/onboarding?category=${selectedCategory.id}`)}
                                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-6 text-lg rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
                                        >
                                            I Agree & Continue <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-12 text-center h-[500px] flex flex-col items-center justify-center"
                                    >
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                            <Info className="w-10 h-10 text-slate-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-300 mb-2">No Category Selected</h3>
                                        <p className="text-slate-500 max-w-xs mx-auto">
                                            Please select a hosting category from the left to view specific requirements for {activeCountry.name}.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostYourHouse;
