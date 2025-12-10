import React, { useState } from 'react';
import { Upload, X, MapPin, DollarSign, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function SellForm({ onPost }) {
    const [images, setImages] = useState([]);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Mock image upload - in real app, handle file processing
            const newImages = Array.from(e.dataTransfer.files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">List an Item for Sale</h2>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onPost(); }}>
                {/* Image Upload */}
                <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleChange}
                    />
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                            <Upload className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 3MB)</p>
                    </div>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                                <img src={img} alt="Preview" className="h-full w-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                    className="absolute top-1 right-1 p-0.5 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Title</Label>
                        <Input
                            placeholder="e.g. IKEA Desk Lamp"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900  disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Category</Label>
                        <select className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Furniture</option>
                            <option>Electronics</option>
                            <option>Home & Garden</option>
                            <option>Clothing</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Price</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                className="pl-9 bg-white border-gray-300 text-gray-900 border border-gray-300  focus:ring-primary/20 placeholder:text-gray-400"
                                placeholder="0.00"
                                type="number"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Condition</Label>
                        <select className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Brand New</option>
                            <option>Like New</option>
                            <option>Good</option>
                            <option>Fair</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Location</Label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            className="pl-9 bg-white border-gray-300 text-gray-900 border border-gray-300 placeholder:text-gray-400"
                            placeholder="City, Zip Code"
                            defaultValue="San Francisco, 94105"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Description</Label>
                    <Textarea
                        placeholder="Describe your item..."
                        className="min-h-[100px] bg-white border-gray-300 text-gray-900  placeholder:text-gray-400"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="urgent" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor="urgent" className="text-sm font-medium text-gray-700">Mark as Urgent Sale</label>
                </div>

                <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                    Post Listing
                </Button>
            </form>
        </div>
    );
}
