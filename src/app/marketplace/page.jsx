"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MarketplaceLayout } from "@/components/marketplace/MarketplaceLayout";
import { FilterPanel } from "@/components/marketplace/FilterPanel";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { SellForm } from "@/components/marketplace/SellForm";
import { ChatPopup } from "@/components/marketplace/ChatPopup";
import { VerificationModal } from "@/components/marketplace/VerificationModal";
import { ShieldCheck, Zap, Tag } from "lucide-react";
import { useCountry } from "@/context/CountryContext";
import { useGetBuySellListingsQuery } from "@/store/api/hostApi";

/* ================= MOCK DATA ================= */

const PRODUCTS = [
  {
    id: 1,
    title: "IKEA Malm Bed Frame - Queen Size",
    price: "150",
    location: "San Jose, CA",
    postedTime: "2 hours ago",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1505693416388-b0346efee539",
    tags: ["moving", "furniture"],
    country: "US",
  },
  {
    id: 2,
    title: "Apple MacBook Pro M1 2020",
    price: "850",
    location: "San Francisco, CA",
    postedTime: "5 hours ago",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4",
    tags: ["electronics", "urgent"],
    country: "US",
  },
];

/* ================= COMPONENT ================= */

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("buy");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  // products state is now managed by RTK Query
  const { data: productsData, isLoading: loading, error } = useGetBuySellListingsQuery();

  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    condition: "",
    category: "",
  });

  const { activeCountry, isSelected } = useCountry();

  const products = productsData || [];

  /* ================= FILTER LOGIC ================= */

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const price = Number(p.price);

      if (filters.priceMin && price < Number(filters.priceMin)) return false;
      if (filters.priceMax && price > Number(filters.priceMax)) return false;

      if (filters.condition && p.condition !== filters.condition) return false;

      if (
        filters.category &&
        !p.tags?.includes(filters.category)
      )
        return false;

      return true;
    });
  }, [products, filters]);

  /* ================= HANDLERS ================= */

  const handleMessage = product => {
    setSelectedProduct(product);
    setIsChatOpen(true);
  };

  const handlePost = () => {
    setIsVerificationOpen(true);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20">
        <MarketplaceLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {/* ================= BUY TAB ================= */}
          {activeTab === "buy" && (
            <div className="space-y-6">

              <FilterPanel
                filters={filters}
                onChange={setFilters}
              />

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
              ) : (
                <>
                  {viewProduct ? (
                    <SingleProductView
                      product={viewProduct}
                      onBack={() => setViewProduct(null)}
                      onMessage={handleMessage}
                    />
                  ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {filteredProducts.map(product => (
                        <ProductCard
                          key={product._id || product.id}
                          product={product}
                          onMessage={handleMessage}
                          onClick={() => setViewProduct(product)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      No products found.
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ================= SELL TAB ================= */}
          {activeTab === "sell" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Tip icon={<Zap />} title="Sell Faster" desc="Add clear photos" />
                <Tip icon={<Tag />} title="Moving Sale" desc="Use tags" />
                <Tip icon={<ShieldCheck />} title="Get Verified" desc="Build trust" />
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
          alert("Verification Complete. Listing is live.");
        }}
      />

      <Footer />
    </div>
  );
}

/* ================= SINGLE PRODUCT ================= */

const SingleProductView = ({ product, onBack, onMessage }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-[#00152d] rounded-xl p-6 shadow">
      <button onClick={onBack} className="text-sm text-blue-400 mb-4 hover:text-blue-300 transition-colors">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          {imageError ? (
            <div className="rounded-lg w-full h-64 bg-gray-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <img
              src={product.image}
              className="rounded-lg w-full h-64 object-cover"
              onError={() => setImageError(true)}
              alt={product.title}
            />
          )}
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {product.condition}
          </div>
        </div>

        <div className="space-y-4 text-white">
          <h1 className="text-2xl font-bold text-white">{product.title}</h1>

          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-semibold">
                {product.sellerName ? product.sellerName.charAt(0).toUpperCase() : "S"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {product.sellerName || "Seller Name"}
              </p>
              <p className="text-xs text-gray-400">Posted {product.postedTime}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm">{product.location}</p>
          </div>

          <div className="text-2xl font-bold text-green-400">${product.price}</div>

          <div className="flex items-center">
            <span className="text-sm text-gray-300">Condition:</span>
            <span className="ml-2 px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
              {product.condition}
            </span>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-sm text-gray-300">Contact seller via:</p>

            <div className="flex space-x-3">
              <button
                onClick={() => onMessage(product)}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Message
              </button>

              <button
                onClick={() => window.open(`mailto:${product.sellerEmail || 'seller@example.com'}`)}
                className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Gmail
              </button>

              <button
                onClick={() => window.open(`tel:${product.sellerPhone || '1234567890'}`)}
                className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Safe transaction tips: Meet in public places, inspect items before payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= TIP ================= */

const Tip = ({ icon, title, desc }) => (
  <div className="bg-gray-50 border p-4 rounded-xl flex gap-3">
    <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
    <div>
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  </div>
);