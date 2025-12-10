import React from 'react';
import { MapPin, Globe, Navigation } from 'lucide-react';

export function StepLocation({ formData, setFormData }) {
    return (
        <div className="space-y-6 max-w-2xl mx-auto w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Where is it located?</h2>

            <div className="bg-black/20 rounded-2xl p-1 border border-white/10 overflow-hidden relative group">
                <div className="aspect-video bg-white/5 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-accent animate-bounce" />
                </div>
                {/* Map placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <div>
                        <h4 className="font-bold text-xl">Pin Location</h4>
                        <p className="text-sm text-gray-400">Drag map to pin exact location</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Street Address</label>
                    <div className="relative">
                        <Navigation className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                            placeholder="Flat/House No., Building, Street Area"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none min-h-[80px]"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">City</label>
                        <input
                            type="text"
                            placeholder="City"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Pincode</label>
                        <input
                            type="text"
                            placeholder="000000"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Country</label>
                    <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={formData.country?.name || "Loading..."}
                            disabled
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-400 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
