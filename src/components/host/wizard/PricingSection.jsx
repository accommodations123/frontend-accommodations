import React from 'react';
import { DollarSign } from 'lucide-react';

const PricingSection = ({ formData, setFormData }) => {
  return (
    <section className="bg-black/20 rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <DollarSign className="h-6 w-6 text-accent" />
        Pricing Details
      </h2>
      <p className="text-sm text-gray-400 mb-6">You can offer discounts for longer stays.</p>

      <div className="space-y-4">
        <div className="bg-black/20 rounded-xl p-4 border border-white/10 flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-lg"><DollarSign className="h-6 w-6 text-yellow-400" /></div>
          <div className="flex-1">
            <label className="text-sm font-bold block">Price Per Month</label>
            <input
              type="number"
              placeholder="1200"
              className="w-full bg-transparent border-none text-xl font-bold focus:outline-none placeholder:text-gray-600"
              value={formData.priceMonth}
              onChange={e => setFormData({ ...formData, priceMonth: e.target.value })}
            />
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
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AUD">AUD ($)</option>
              <option value="CAD">CAD ($)</option>
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
      </div>
    </section>
  );
};

export default PricingSection;