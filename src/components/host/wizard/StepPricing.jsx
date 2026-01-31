import React, { useMemo } from 'react';
import { DollarSign, Ticket, Wallet } from 'lucide-react';
import { COUNTRIES } from '@/lib/mock-data';

export function StepPricing({ formData, setFormData, contributionType = 'property' }) {

    // Generate unique currencies list
    const currencies = useMemo(() => {
        const unique = new Map();
        COUNTRIES.forEach(c => {
            if (c.currency && !unique.has(c.currency)) {
                unique.set(c.currency, { code: c.currency, symbol: c.currency === 'INR' ? '₹' : c.currency === 'USD' ? '$' : c.currency === 'EUR' ? '€' : c.currency });
            }
        });
        return Array.from(unique.values()).sort((a, b) => a.code.localeCompare(b.code));
    }, []);

    // Render Event Pricing
    if (contributionType === 'event') {
        return (
            <div className="space-y-6 max-w-2xl mx-auto w-full">
                <h2 className="text-2xl font-bold text-white mb-4">Event Pricing</h2>
                <p className="text-sm text-gray-400 -mt-2 mb-6">Is this a free event or do attendees need tickets?</p>

                <div className="space-y-6">
                    {/* Event Type Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setFormData({ ...formData, eventPrice: 'free', priceAmount: 0 })}
                            className={`p-4 rounded-xl border text-left transition-all ${formData.eventPrice === 'free'
                                ? 'bg-accent/20 border-accent text-white'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <span className="text-lg font-bold block mb-1">Free Event</span>
                            <span className="text-xs opacity-70">No cost for attendees</span>
                        </button>
                        <button
                            onClick={() => setFormData({ ...formData, eventPrice: 'fixed_price' })}
                            className={`p-4 rounded-xl border text-left transition-all ${formData.eventPrice === 'fixed_price'
                                ? 'bg-accent/20 border-accent text-white'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <span className="text-lg font-bold block mb-1">Paid Ticket</span>
                            <span className="text-xs opacity-70">Set a ticket price</span>
                        </button>
                    </div>

                    {/* Price Input if Paid */}
                    {formData.eventPrice === 'fixed_price' && (
                        <div className="bg-black/20 rounded-xl p-4 border border-white/10 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                            <div className="bg-white/10 p-3 rounded-lg"><Ticket className="h-6 w-6 text-yellow-400" /></div>
                            <div className="flex-1">
                                <label className="text-sm font-bold block">Ticket Price</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xl font-bold text-accent">{formData.currency}</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full bg-transparent border-none text-xl font-bold focus:outline-none placeholder:text-gray-600"
                                        value={formData.priceAmount}
                                        onChange={e => setFormData({ ...formData, priceAmount: e.target.value })}
                                    />
                                </div>
                            </div>
                            {/* Simple Currency Selector for Event */}
                            <select
                                className="bg-transparent border border-white/20 rounded-md text-sm text-gray-300 p-1 focus:outline-none [&>option]:bg-gray-800"
                                value={formData.currency}
                                onChange={e => setFormData({ ...formData, currency: e.target.value })}
                            >
                                {currencies.map(curr => (
                                    <option key={curr.code} value={curr.code}>{curr.code}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Render Travel Companion Budget
    if (contributionType === 'travel_companion') {
        return (
            <div className="space-y-6 max-w-2xl mx-auto w-full">
                <h2 className="text-2xl font-bold text-white mb-4">Budget Preference</h2>
                <p className="text-sm text-gray-400 -mt-2 mb-6">How do you plan to handle expenses?</p>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setFormData({ ...formData, budgetPreference: 'shared' })}
                        className={`p-4 rounded-xl border text-left transition-all ${formData.budgetPreference === 'shared'
                            ? 'bg-accent/20 border-accent text-white'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <span className="block mb-2"><Wallet className="h-6 w-6" /></span>
                        <span className="text-lg font-bold block mb-1">Shared</span>
                        <span className="text-xs opacity-70">Split costs equally</span>
                    </button>
                    <button
                        onClick={() => setFormData({ ...formData, budgetPreference: 'separate' })}
                        className={`p-4 rounded-xl border text-left transition-all ${formData.budgetPreference === 'separate'
                            ? 'bg-accent/20 border-accent text-white'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <span className="block mb-2"><DollarSign className="h-6 w-6" /></span>
                        <span className="text-lg font-bold block mb-1">Separate</span>
                        <span className="text-xs opacity-70">Pay your own way</span>
                    </button>
                </div>
            </div>
        );
    }

    // Default: Property Pricing
    return (
        <div className="space-y-6 max-w-2xl mx-auto w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Set your price</h2>
            <p className="text-sm text-gray-400 -mt-2 mb-6">You can offer discounts for longer stays.</p>

            <div className="space-y-4">
                <div className="bg-black/20 rounded-xl p-4 border border-white/10 flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-lg"><DollarSign className="h-6 w-6 text-yellow-400" /></div>
                    <div className="flex-1">
                        <label className="text-sm font-bold block">Price Per Month</label>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-500">{formData.currency}</span>
                            <input
                                type="number"
                                placeholder="1200"
                                className="w-full bg-transparent border-none text-xl font-bold focus:outline-none placeholder:text-gray-600"
                                value={formData.priceMonth}
                                onChange={e => setFormData({ ...formData, priceMonth: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                        <label className="text-xs font-medium text-gray-400 block mb-1">Currency</label>
                        <select
                            className="w-full bg-transparent border-none text-lg font-bold focus:outline-none text-white [&>option]:bg-gray-800"
                            value={formData.currency}
                            onChange={e => setFormData({ ...formData, currency: e.target.value })}
                        >
                            {currencies.map(curr => (
                                <option key={curr.code} value={curr.code}>{curr.code} ({curr.symbol})</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                        <label className="text-xs font-medium text-gray-400 block mb-1">Per Hour</label>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full bg-transparent border-none text-lg font-bold focus:outline-none placeholder:text-gray-600"
                            value={formData.pricePerHour}
                            onChange={e => setFormData({ ...formData, pricePerHour: e.target.value })}
                        />
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                        <label className="text-xs font-medium text-gray-400 block mb-1">Per Night</label>
                        <input
                            type="number"
                            placeholder="60"
                            className="w-full bg-transparent border-none text-lg font-bold focus:outline-none placeholder:text-gray-600"
                            value={formData.priceNight}
                            onChange={e => setFormData({ ...formData, priceNight: e.target.value })}
                        />
                    </div>
                </div>

                {/* Note about auto-currency */}
                <p className="text-xs text-gray-500 italic">Currency is automatically suggested based on the country selected.</p>
            </div>
        </div>
    );
}
