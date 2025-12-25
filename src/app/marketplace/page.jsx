"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MarketplaceLayout } from "@/components/marketplace/MarketplaceLayout";
import { FilterPanel } from "@/components/marketplace/FilterPanel";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { SellForm } from "@/components/marketplace/SellForm";
import { ChatPopup } from "@/components/marketplace/ChatPopup";
import { VerificationModal } from "@/components/marketplace/VerificationModal";
import EssentialsBundle from "@/components/marketplace/EssentialsBundle"; // Changed to default import
import { ShieldCheck, Zap, Tag } from 'lucide-react';
import { useCountry } from "@/context/CountryContext"; // Added import

// Mock Data
const PRODUCTS = [
    {
        id: 1,
        title: "IKEA Malm Bed Frame - Queen Size",
        price: "150",
        location: "San Jose, CA",
        postedTime: "2 hours ago",
        condition: "Like New",
        image: "https://images.unsplash.com/photo-1505693416388-b0346efee539?auto=format&fit=crop&q=80&w=600&h=450",
        tags: ["moving"],
        country: "US" // Added country field
    },
    {
        id: 2,
        title: "Apple MacBook Pro M1 2020",
        price: "850",
        location: "San Francisco, CA",
        postedTime: "5 hours ago",
        condition: "Good",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=600&h=450",
        tags: ["urgent"],
        country: "US" // Added country field
    },
    {
        id: 3,
        title: "Instant Pot Duo 7-in-1",
        price: "45",
        location: "Fremont, CA",
        postedTime: "1 day ago",
        condition: "Used",
        image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=600&h=450",
        tags: [],
        country: "US" // Added country field
    },
    {
        id: 4,
        title: "Study Desk + Chair Combo",
        price: "80",
        location: "Berkeley, CA",
        postedTime: "3 hours ago",
        condition: "Fair",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600&h=450",
        tags: ["moving"],
        country: "US" // Added country field
    },
    {
        id: 5,
        title: "Sony WH-1000XM4 Headphones",
        price: "200",
        location: "San Francisco, CA",
        postedTime: "30 mins ago",
        condition: "Brand New",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600&h=450",
        tags: [],
        country: "US" // Added country field
    },
    {
        id: 6,
        title: "Indian Mixer Grinder (Preethi)",
        price: "60",
        location: "Sunnyvale, CA",
        postedTime: "1 hour ago",
        condition: "Like New",
        image: "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?auto=format&fit=crop&q=80&w=600&h=450",
        tags: ["urgent"],
        country: "US" // Added country field
    }
];

export default function MarketplacePage() {
    const [activeTab, setActiveTab] = useState("buy");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { activeCountry, isSelected } = useCountry(); // Added country context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Include country in the API request if a country is selected
                const countryParam = isSelected && activeCountry ? `?country=${activeCountry.code}` : '';
                const response = await fetch(`http://localhost:5000/api/marketplace/products${countryParam}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    // Fallback to mock data if API fails
                    console.warn("API request failed, using mock data");
                    if (isSelected && activeCountry) {
                        // Filter mock data by country
                        const filteredProducts = PRODUCTS.filter(product => product.country === activeCountry.code);
                        setProducts(filteredProducts);
                    } else {
                        setProducts(PRODUCTS);
                    }
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                // Fallback to mock data if API fails
                if (isSelected && activeCountry) {
                    // Filter mock data by country
                    const filteredProducts = PRODUCTS.filter(product => product.country === activeCountry.code);
                    setProducts(filteredProducts);
                } else {
                    setProducts(PRODUCTS);
                }
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === 'buy') {
            fetchProducts();
        }
    }, [activeTab, isSelected, activeCountry]); // Added dependencies

    // Listen for country changes
    useEffect(() => {
        const handleCountryChange = () => {
            if (activeTab === 'buy') {
                setLoading(true);
                // Refetch products when country changes
                const fetchProducts = async () => {
                    try {
                        const countryParam = isSelected && activeCountry ? `?country=${activeCountry.code}` : '';
                        const response = await fetch(`http://localhost:5000/api/marketplace/products${countryParam}`);
                        
                        if (response.ok) {
                            const data = await response.json();
                            setProducts(data);
                        } else {
                            // Fallback to mock data
                            if (isSelected && activeCountry) {
                                const filteredProducts = PRODUCTS.filter(product => product.country === activeCountry.code);
                                setProducts(filteredProducts);
                            } else {
                                setProducts(PRODUCTS);
                            }
                        }
                    } catch (error) {
                        console.error("Error fetching products:", error);
                        // Fallback to mock data
                        if (isSelected && activeCountry) {
                            const filteredProducts = PRODUCTS.filter(product => product.country === activeCountry.code);
                            setProducts(filteredProducts);
                        } else {
                            setProducts(PRODUCTS);
                        }
                    } finally {
                        setLoading(false);
                    }
                };
                
                fetchProducts();
            }
        };

        window.addEventListener('country-change', handleCountryChange);
        return () => {
            window.removeEventListener('country-change', handleCountryChange);
        };
    }, [activeTab, isSelected, activeCountry]);

    const handleMessage = (product) => {
        setSelectedProduct(product);
        setIsChatOpen(true);
    };

    const handlePost = () => {
        setIsVerificationOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-20"> {/* Offset for fixed navbar */}
                <MarketplaceLayout activeTab={activeTab} onTabChange={setActiveTab}>

                    {activeTab === 'buy' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <EssentialsBundle />

                            <FilterPanel />

                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <>
                                    {isSelected && activeCountry && (
                                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-3 mb-4">
                                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                                {activeCountry.flag.startsWith('/') ? (
                                                    <img src={activeCountry.flag} alt={activeCountry.name} className="w-5 h-4 object-cover rounded-sm" />
                                                ) : (
                                                    <span className="text-lg">{activeCountry.flag}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-blue-900 text-sm">Showing items in {activeCountry.name}</h4>
                                                <p className="text-xs text-blue-700 mt-1">Products are filtered based on your selected country</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {products.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                            {products.map(product => (
                                                <ProductCard
                                                    key={product._id || product.id}
                                                    product={product}
                                                    onMessage={handleMessage}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500">No products found for the selected country.</p>
                                            <button 
                                                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                                                onClick={() => window.location.reload()}
                                            >
                                                Try Again
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'sell' && (
                        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Quick Tips */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-blue-900 text-sm">Sell 2x Faster</h4>
                                        <p className="text-xs text-blue-700 mt-1">Add at least 3 photos and a detailed description.</p>
                                    </div>
                                </div>
                                <div className="bg-orange-50 border-orange-100 p-4 rounded-xl flex items-start gap-3">
                                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                                        <Tag className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-orange-900 text-sm">Moving Sale?</h4>
                                        <p className="text-xs text-orange-700 mt-1">Use the "Moving" tag to attract bulk buyers.</p>
                                    </div>
                                </div>
                                <div className="bg-green-50 border-green-100 p-4 rounded-xl flex items-start gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-green-900 text-sm">Get Verified</h4>
                                        <p className="text-xs text-green-700 mt-1">Verified sellers get 40% more trust & views.</p>
                                    </div>
                                </div>
                            </div>

                            <SellForm onPost={handlePost} />
                        </div>
                    )}

                </MarketplaceLayout>
            </div>

            <ChatPopup
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                product={selectedProduct}
            />

            <VerificationModal
                isOpen={isVerificationOpen}
                onClose={() => setIsVerificationOpen(false)}
                onComplete={() => {
                    setIsVerificationOpen(false);
                    alert("Verification Complete! Your listing is live.");
                }}
            />

            <Footer />
        </div>
    );
}