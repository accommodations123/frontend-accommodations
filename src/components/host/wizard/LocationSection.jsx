import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Globe, Loader2 } from 'lucide-react';
import { fetchAddressByPincode } from '@/lib/pincodeUtils';

const LocationSection = ({ formData, setFormData }) => {
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  // Auto-fill address based on Pincode
  useEffect(() => {
    const fetchPincodeDetails = async () => {
      const pincode = formData.pincode;
      if (pincode && pincode.length === 6 && /^\d+$/.test(pincode)) {
        setIsPincodeLoading(true);
        const addressData = await fetchAddressByPincode(pincode);
        if (addressData) {
          setFormData({
            ...formData,
            city: addressData.city || formData.city,
            state: addressData.state || formData.state,
          });
        }
        setIsPincodeLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPincodeDetails, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [formData.pincode]);

  return (
    <section className="bg-black/20 rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <MapPin className="h-6 w-6 text-accent" />
        Property Location
      </h2>

      <div className="bg-black/20 rounded-2xl p-1 border border-white/10 overflow-hidden relative group mb-6">
        <div className="aspect-video bg-white/5 flex items-center justify-center">
          <MapPin className="h-12 w-12 text-accent animate-bounce" />
        </div>
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
            <label className="text-sm font-medium text-gray-300 flex justify-between">
              Pincode
              {isPincodeLoading && <Loader2 className="h-4 w-4 animate-spin text-accent" />}
            </label>
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
    </section>
  );
};

export default LocationSection;
