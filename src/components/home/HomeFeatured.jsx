import React from 'react';
import { Heart, Star, MapPin, Users, BedDouble, Wifi, Car, Coffee, Tv, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetApprovedPropertiesQuery } from '@/store/api/hostApi';
import { VerificationBadge } from '@/components/ui/VerificationBadge';

function HomeFeatured({ filters }) {
    const { data: approvedProperties, isLoading } = useGetApprovedPropertiesQuery();

    // Safely build listings: only include properties with a valid ID
    const listings = (approvedProperties || [])
        .filter(property => property && (property.id || property._id)) // skip invalid items
        .map(property => ({
            id: property.id || property._id,
            title: property.title || "Untitled Property",
            location: property.city || "Unknown Location",
            price: property.price_per_month || property.price_per_night || 0,
            currency: property.currency || 'INR',
            image: (property.photos && property.photos.length > 0)
                ? property.photos[0]
                : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
            category: property.property_type || "Stays",
            type: property.privacy_type || "Entire Place",
            isVerified: property.status === 'approved',
            rating: property.rating || 4.5,
            reviews: property.reviews || 23,
            amenities: property.amenities || []
        }));

    // Extract unique amenities for icon mapping
    const getAmenityIcons = (amenities) => {
        const icons = [];
        if (amenities.includes('wifi')) icons.push(<Wifi key="wifi" className="w-4 h-4 text-gray-600" />);
        if (amenities.includes('parking')) icons.push(<Car key="parking" className="w-4 h-4 text-gray-600" />);
        if (amenities.includes('kitchen')) icons.push(<Coffee key="kitchen" className="w-4 h-4 text-gray-600" />);
        if (amenities.includes('tv')) icons.push(<Tv key="tv" className="w-4 h-4 text-gray-600" />);
        return icons;
    };

    return (
        <div className="pb-24 pt-4 bg-gradient-to-b from-white to-gray-50/30 min-h-screen container mx-auto">
            {/* 1. Recommended Section */}
            <div className="mb-8 md:mb-12">
                <div className="flex items-center justify-between px-4 md:px-0 mb-6">
                    <h3 className="font-bold text-gray-900 text-xl md:text-2xl flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                        Recommended for You
                    </h3>

                    {/* BUTTON to full properties page with query param to show "recommended" */}
                    <button
                        onClick={() => window.location.href = `/properties?view=recommended`}
                        className="px-4 py-2 text-sm md:text-base font-semibold text-accent border border-accent rounded-lg hover:bg-accent hover:text-white transition-colors duration-200 flex items-center"
                        aria-label="View all recommended properties"
                    >
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="
                    flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar snap-x 
                    md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:px-0 md:overflow-visible
                ">
                    {isLoading ? (
                        [1, 2, 3, 4].map((n) => (
                            <div key={n} className="min-w-[280px] snap-center md:min-w-0 h-80 bg-gray-100 rounded-2xl animate-pulse" />
                        ))
                    ) : (
                        (listings.slice(0, 4)).map((item) => (
                            <Link to={`/rooms/${item.id}`} key={`recommended-${item.id}`} className="min-w-[280px] snap-center md:min-w-0 font-sans">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 group">
                                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                                            <button className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-110">
                                                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                                            </button>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <VerificationBadge isVerified={item.isVerified} />
                                        </div>
                                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                                            <span className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center">
                                                <Shield className="w-3 h-3 mr-1" />
                                                {item.category}
                                            </span>
                                            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-4 pb-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-bold text-gray-900 truncate text-base md:text-lg leading-tight">
                                                {item.title}
                                            </h4>
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <MapPin className="w-3 h-3" />
                                            <span>{item.location}</span>
                                            <span>•</span>
                                            <span>{item.reviews} reviews</span>
                                        </div>

                                        {/* Amenities */}
                                        {item.amenities && item.amenities.length > 0 && (
                                            <div className="flex items-center gap-2 mb-3">
                                                {getAmenityIcons(item.amenities).slice(0, 3)}
                                                {item.amenities.length > 3 && (
                                                    <span className="text-xs text-gray-400">+{item.amenities.length - 3} more</span>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-baseline">
                                                <span className="text-primary font-bold text-xl md:text-2xl">
                                                    {item.currency === 'INR' ? '₹' : '$'}
                                                    {(item.price || 0).toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-400 ml-1">/ night</span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Users className="w-4 h-4 mr-1" />
                                                <span>2 Guests</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* Related Property Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between px-4 md:px-0 mb-6">
                    <h3 className="font-bold text-gray-900 text-xl md:text-2xl flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                        Properties You Might Like
                    </h3>

                    {/* BUTTON to the same properties page, but marked as related */}
                    <button
                        onClick={() => window.location.href = `/properties?view=related`}
                        className="px-4 py-2 text-sm md:text-base font-semibold text-accent border border-accent rounded-lg hover:bg-accent hover:text-white transition-colors duration-200 flex items-center"
                        aria-label="View all related properties"
                    >
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="
                    flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar snap-x 
                    md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:px-0 md:overflow-visible
                ">
                    {(listings.slice(0, 4)).map((item) => (
                        <Link
                            to={`/rooms/${item.id}`}
                            key={`related-${item.id}`}
                            className="min-w-[280px] snap-center md:min-w-0 font-sans"
                        >
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 group">
                                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <VerificationBadge isVerified={item.isVerified} />
                                    </div>
                                </div>
                                <div className="px-4 pb-4">
                                    <h4 className="font-bold text-gray-900 truncate text-base md:text-lg leading-tight mb-2">
                                        {item.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                        <MapPin className="w-3 h-3" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline">
                                            <span className="text-primary font-bold text-xl md:text-2xl">
                                                {item.currency === 'INR' ? '₹' : '$'}
                                                {(item.price || 0).toLocaleString()}
                                            </span>
                                            <span className="text-xs text-gray-400 ml-1">/ night</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Users className="w-4 h-4 mr-1" />
                                            <span>2 Guests</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeFeatured;