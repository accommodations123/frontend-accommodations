import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetApprovedPropertiesQuery } from "@/store/api/hostApi";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function PropertiesListPage() {
  const location = useLocation();
  const qs = new URLSearchParams(location.search);
  const view = qs.get("view") || "all"; // recommended | related | all

  // Fetch all approved properties (your hostApi endpoint)
  const { data: properties, isLoading, isFetching, isError } = useGetApprovedPropertiesQuery();

  const items = (properties || []).filter(Boolean).map((p) => ({
    id: p.id ?? p._id,
    title: p.title ?? `Property #${p.id ?? p._id}`,
    city: p.city ?? "",
    country: p.country ?? "",
    image: Array.isArray(p.photos) && p.photos.length ? p.photos[0] : (p.image ?? "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"),
    price: p.price_per_month ?? p.price_per_night ?? p.price_per_hour ?? 0,
    currency: p.currency ?? "INR",
    isVerified: (p.status ?? "").toLowerCase() === "approved",
    raw: p
  }));

  // Optionally apply simple filters for view: recommended or related.
  // Currently this is illustrative — adjust to your real logic if needed.
  const filtered = items.filter((it) => {
    if (view === "recommended") {
      // example: recommend verified properties first
      return it.isVerified;
    }
    if (view === "related") {
      // example: related — just return all for now (or implement real relation)
      return true;
    }
    return true;
  });

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center p-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-12">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Failed to load properties</h2>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {view === "recommended" ? "Recommended" : view === "related" ? "Related Properties" : "All Properties"}
        </h1>
        <div className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> results
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((it) => (
            <Link to={`/rooms/${it.id}`} key={it.id} className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={it.image} 
                    alt={it.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <VerificationBadge isVerified={it.isVerified} />
                  </div>
                  {it.isVerified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Verified
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight truncate">
                        {it.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {it.city}{it.city && it.country ? ", " : ""}{it.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-primary">
                          {it.currency === "INR" ? "₹" : "$"}
                          {Number(it.price ?? 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">per night</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {it.raw?.guests || 2} guests
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {it.raw?.bedrooms || 1} beds
                        </span>
                      </div>
                      <button 
                        type="button"
                        className="px-3 py-1 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}