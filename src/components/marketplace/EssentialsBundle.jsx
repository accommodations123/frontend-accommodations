import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  X,
  Camera,
  Grid,
  List,
  Filter,
  Clock
} from "lucide-react";

import {
  useGetBuySellListingsQuery,
  useGetBuySellByIdQuery
} from "@/store/api/hostApi";

const EssentialsBundle = () => {
  const productsSectionRef = useRef(null);

  const { data: apiListings = [], isLoading, isError } =
    useGetBuySellListingsQuery();

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  /* FILTER STATES */
  const [recentFilter, setRecentFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("");
  const [zipFilter, setZipFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const [selectedListingId, setSelectedListingId] = useState(null);

  const { data: selectedListing } =
    useGetBuySellByIdQuery(selectedListingId, { skip: !selectedListingId });

  /* LOAD DATA */
  useEffect(() => {
    setListings(apiListings);
    setFilteredListings(apiListings);
  }, [apiListings]);

  /* APPLY FILTERS */
  const applyFilters = () => {
    let data = [...listings];

    if (searchTerm) {
      data = data.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "ALL") {
      data = data.filter(
        item =>
          item.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (cityFilter) {
      data = data.filter(item =>
        item.city?.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    if (zipFilter) {
      data = data.filter(item =>
        item.zipCode?.toString().includes(zipFilter)
      );
    }

    data = data.filter(
      item =>
        Number(item.price) >= priceRange[0] &&
        Number(item.price) <= priceRange[1]
    );

    if (recentFilter !== "ALL") {
      const days = Number(recentFilter);
      const now = new Date();

      data = data.filter(item => {
        if (!item.createdAt) return false;
        const created = new Date(item.createdAt);
        return (now - created) / (1000 * 60 * 60 * 24) <= days;
      });
    }

    setFilteredListings(data);
  };

  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    recentFilter,
    categoryFilter,
    cityFilter,
    zipFilter,
    priceRange,
    listings
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load listings
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* SEARCH HEADER */}
      <div className="sticky top-0 z-40 bg-white shadow-sm p-4">
        <div className="flex items-center gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              className="w-full bg-[#00152D] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white
                         focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Search items..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-accent text-white"
                : "bg-slate-100 text-accent"
            }`}
          >
            <Grid />
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list"
                ? "bg-accent text-white"
                : "bg-slate-100 text-accent"
            }`}
          >
            <List />
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto p-4 flex gap-6">

        {/* FILTER SECTION */}
        <div className="hidden md:block w-72 bg-white rounded-2xl shadow-md p-5 sticky top-24 border">
          <div className="flex items-center gap-2 mb-5">
            <Filter className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-accent text-lg">Filters</h3>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-accent flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" />
              Recent Items
            </label>
            <select
              value={recentFilter}
              onChange={e => setRecentFilter(e.target.value)}
              className="w-full bg-[#00152D] border border-[#0A2A4A] rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="ALL">All Posts</option>
              <option value="3">Last 3 Days</option>
              <option value="7">Last 7 Days</option>
              <option value="15">Last 15 Days</option>
              <option value="30">Last 30 Days</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-accent mb-2 block">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full bg-[#00152D] border border-[#0A2A4A] rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="ALL">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Home Appliances">Home Appliances</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-accent mb-2 block">
              City
            </label>
            <input
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              placeholder="Enter city"
              className="w-full bg-[#00152D] border border-[#0A2A4A] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-accent mb-2 block">
              Price Range (₹)
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              step="500"
              value={priceRange[1]}
              onChange={e => setPriceRange([0, Number(e.target.value)])}
              className="w-full"
            />
            <div className="mt-1 text-sm text-gray-600">
              Up to ₹{priceRange[1]}
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-[#00152D] rounded-lg py-2 text-sm text-white"
          >
            Apply Filters
          </button>
        </div>

        {/* LISTINGS — CARD SIZE FIXED */}
        <div
          ref={productsSectionRef}
          className={`flex-1 ${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "space-y-3"
          }`}
        >
          {filteredListings.map(listing => (
            <div
              key={listing._id}
              className={`bg-white rounded-lg shadow hover:shadow-md overflow-hidden ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* IMAGE */}
              <div
                className={`relative ${
                  viewMode === "list" ? "w-28 h-28" : "h-28"
                } bg-slate-200`}
              >
                <img
                  src={listing.images?.[0] || "https://picsum.photos/400/300"}
                  className="w-full h-full object-cover"
                />

                {listing.images?.length > 1 && (
                  <span className="absolute bottom-1 left-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    {listing.images.length}
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="px-2 py-1 flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[11px] truncate">
                    {listing.title}
                  </h3>
                  <span className="font-bold text-[11px] text-indigo-600">
                    ₹{listing.price}
                  </span>
                </div>

                {(listing.city || listing.zipCode) && (
                  <div className="flex items-center text-[10px] text-slate-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {listing.city}
                  </div>
                )}

                <button
                  onClick={() => setSelectedListingId(listing._id)}
                  className="mt-0.5 w-full bg-[#00152D] text-white text-[10px] py-0.5 rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="font-bold">Item Details</h2>
              <button onClick={() => setSelectedListingId(null)}>
                <X />
              </button>
            </div>

            <div className="p-6">
              <img
                src={selectedListing.images?.[0]}
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              <h1 className="text-2xl font-bold">
                {selectedListing.title}
              </h1>
              <p className="text-xl font-semibold text-indigo-600 mb-4">
                ₹{selectedListing.price}
              </p>
              <p className="text-slate-600">
                {selectedListing.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssentialsBundle;
