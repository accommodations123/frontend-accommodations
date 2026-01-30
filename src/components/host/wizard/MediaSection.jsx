import React from 'react';
import { Video, Plus, X, FileText, Check } from 'lucide-react';

const MediaSection = ({ formData, setFormData, handleFileChange, removeArrayItem }) => {
  return (
    <section className="bg-black/20 rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Video className="h-6 w-6 text-accent" />
        Photos, Video & Proofs
      </h2>

      {/* Images */}
      <div className="space-y-2 mb-6">
        <label className="text-sm font-medium text-gray-300">Property Photos (At least 1)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-white/10">
              <img src={img.url} alt="Upload" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeArrayItem('images', idx)}
                className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <label className="border-2 border-dashed border-white/20 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-white/5 transition-all text-gray-400 hover:text-white">
            <Plus className="h-6 w-6 mb-2" />
            <span className="text-xs">Add Photo</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'images', true)} />
          </label>
        </div>
      </div>

      {/* Video & Proof Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Property Video (Optional)</label>
          <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 transition-colors cursor-pointer relative flex flex-col items-center justify-center h-32">
            {formData.video ? (
              <div className="text-green-400 flex flex-col items-center">
                <Video className="h-8 w-8 mb-2" />
                <span className="text-xs truncate max-w-[200px]">{formData.video.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData(p => ({ ...p, video: null }))
                  }}
                  className="text-xs underline text-red-400 mt-1 hover:text-red-300 z-10 block"
                >Remove</button>
              </div>
            ) : (
              <>
                <Video className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Upload Walkthrough</span>
              </>
            )}
            <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'video')} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Ownership Proof (Required) *</label>
          <div className={`border-2 border-dashed rounded-xl p-6 text-center hover:bg-white/5 transition-colors cursor-pointer relative flex flex-col items-center justify-center h-32 ${!formData.propertyProof ? 'border-red-500/50 bg-red-500/5' : 'border-white/20'}`}>
            {formData.propertyProof ? (
              <div className="text-green-400 flex flex-col items-center">
                <Check className="h-8 w-8 mb-2" />
                <span className="text-xs truncate max-w-[200px]">{formData.propertyProof.name}</span>
              </div>
            ) : (
              <>
                <FileText className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Utility Bill / Deed</span>
              </>
            )}
            <input type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'propertyProof')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;