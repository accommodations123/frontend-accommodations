"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ShieldCheck, User, ArrowLeft, MessageCircle, Share2, Heart } from 'lucide-react';
import { ChatPopup } from "@/components/marketplace/ChatPopup";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        // Fetch product details
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/marketplace/products/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error("Failed to fetch product");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                <Button onClick={() => navigate('/marketplace')}>Back to Marketplace</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4">
                <button
                    onClick={() => navigate('/marketplace')}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Marketplace
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Images */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="aspect-video bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
                            <img
                                src={product.images && product.images.length > 0 ? product.images[activeImage] : product.image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Details */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" /> {product.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" /> Posted {new Date(product.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-primary">${product.price}</p>
                                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mt-2">
                                        {product.condition}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-6"></div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900">Description</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 my-6"></div>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                                        {product.sellerName ? product.sellerName.charAt(0) : <User />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{product.sellerName || "Seller"}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <ShieldCheck className="h-3 w-3 text-green-500" /> Verified Member
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90 gap-2"
                                    onClick={() => setIsChatOpen(true)}
                                >
                                    <MessageCircle className="h-4 w-4" /> Message Seller
                                </Button>
                                <Button variant="outline" className="w-full gap-2">
                                    <Heart className="h-4 w-4" /> Save
                                </Button>
                            </div>
                        </div>

                        {/* Safety Tips */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" /> Safety Tips
                            </h4>
                            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                                <li>Meet in a public place.</li>
                                <li>Check the item before paying.</li>
                                <li>Avoid sharing financial info.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <ChatPopup
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                product={product}
            />

            <Footer />
        </div>
    );
}
