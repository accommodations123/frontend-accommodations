// import React, { useState } from "react";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   MapPin,
//   Home,
//   ShieldCheck,
//   AlertTriangle,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ACCOMMODATION_LISTINGS,
//   ACCOMMODATION_GUIDES,
// } from "@/lib/accommodation-data";

// /* ===================== PROPERTY TYPES ===================== */
// const PROPERTY_TYPES = [
//   "Apartment",
//   "House",
//   "PG",
//   "Hostel",
//   "Shared Room",
// ];

// export default function AccommodationPage() {
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("options");
//   const [selectedTypes, setSelectedTypes] = useState([]);

//   /* ===================== FILTER LOGIC ===================== */
//   const filteredListings = ACCOMMODATION_LISTINGS.filter((listing) => {
//     const matchesSearch =
//       listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       listing.title.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesType =
//       selectedTypes.length === 0 ||
//       selectedTypes.includes(listing.type);

//     return matchesSearch && matchesType;
//   });

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* ================= HERO ================= */}
//       <div className="bg-primary text-white pt-32 pb-16 px-4">
//         <div className="container mx-auto max-w-4xl text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">
//             Find Your Home Away From Home
//           </h1>
//           <p className="text-xl text-white/90 mb-8">
//             Verified listings, housing guides, and scam alerts for Indians abroad.
//           </p>

//           <div className="bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
//             <div className="relative flex-1">
//               <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <Input
//                 placeholder="Search by city or university..."
//                 className="pl-10 h-12 border-none text-gray-900"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Button className="h-12 px-8 bg-accent text-white">
//               Search
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* ================= CONTENT ================= */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* ================= LEFT: FILTER + LIST ================= */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* ===== PROPERTY TYPE FILTER ===== */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">
//                 Property Type
//               </h3>

//               <div className="space-y-3">
//                 {PROPERTY_TYPES.map((type) => (
//                   <label
//                     key={type}
//                     className="flex items-center gap-3 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       className="hidden"
//                       checked={selectedTypes.includes(type)}
//                       onChange={() =>
//                         setSelectedTypes((prev) =>
//                           prev.includes(type)
//                             ? prev.filter((t) => t !== type)
//                             : [...prev, type]
//                         )
//                       }
//                     />

//                     <div
//                       className={`w-5 h-5 rounded border flex items-center justify-center ${
//                         selectedTypes.includes(type)
//                           ? "bg-primary border-primary"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {selectedTypes.includes(type) && (
//                         <span className="w-2.5 h-2.5 bg-white rounded-sm" />
//                       )}
//                     </div>

//                     <span className="text-gray-800">{type}</span>
//                   </label>
//                 ))}
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <Button size="sm" className="bg-primary text-white">
//                   Apply Filter
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => setSelectedTypes([])}
//                 >
//                   Clear
//                 </Button>
//               </div>
//             </div>

//             {/* ===== LISTINGS ===== */}
//             <div className="grid gap-6">
//               {filteredListings.map((listing) => (
//                 <div
//                   key={listing.id}
//                   className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col md:flex-row"
//                 >
//                   <div className="w-full md:w-64 h-48 md:h-auto relative">
//                     <img
//                       src={listing.image}
//                       alt={listing.title}
//                       className="w-full h-full object-cover"
//                     />
//                     {listing.verified && (
//                       <Badge className="absolute top-3 left-3 bg-green-500 text-white gap-1">
//                         <ShieldCheck className="h-3 w-3" /> Verified
//                       </Badge>
//                     )}
//                   </div>

//                   <div className="p-6 flex-1 flex flex-col justify-between">
//                     <div>
//                       <div className="flex justify-between mb-2">
//                         <h3 className="font-bold text-gray-900">
//                           {listing.title}
//                         </h3>
//                         <span className="font-bold text-primary">
//                           ${listing.price}
//                           <span className="text-sm text-gray-500">/mo</span>
//                         </span>
//                       </div>

//                       <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
//                         <MapPin className="h-3 w-3" />
//                         {listing.location}
//                       </p>

//                       <div className="flex gap-2 mb-3">
//                         <Badge variant="secondary">{listing.type}</Badge>
//                         <Badge variant="secondary">{listing.tenantType}</Badge>
//                       </div>

//                       <p className="text-sm text-gray-600 line-clamp-2">
//                         {listing.description}
//                       </p>
//                     </div>

//                     <div className="mt-4 pt-4 border-t flex justify-end">
//                       <Button
//                         variant="outline"
//                         onClick={() =>
//                           navigate(`/accommodation/${listing.id}`)
//                         }
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {filteredListings.length === 0 && (
//                 <div className="text-center text-gray-500 py-12">
//                   No properties match your filters.
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ================= RIGHT: SIDEBAR ================= */}
//           <div className="space-y-8">

//             {/* Scam Alert */}
//             <div className="bg-red-50 border border-red-100 rounded-xl p-6">
//               <div className="flex items-center gap-2 text-red-600 mb-3">
//                 <AlertTriangle className="h-5 w-5" />
//                 <h3 className="font-bold">Scam Alert</h3>
//               </div>
//               <p className="text-sm text-red-700">
//                 Never send money before visiting a property.
//               </p>
//             </div>

//             {/* Tools */}
//             <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
//               <h3 className="font-bold text-indigo-900 mb-4">Tools</h3>
//               <Button
//                 variant="outline"
//                 className="w-full justify-start bg-white border-indigo-200 text-indigo-700"
//               >
//                 <Home className="h-4 w-4 mr-2" />
//                 Rent Calculator
//               </Button>
//             </div>

//           </div>
//         </div>
//       </div>

//       <Footer />
//     </main>
//   );
// }
