import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Heart, Star, MapPin, Users, Wifi, Car, Utensils, Tv,
    Thermometer, Bed, CheckCircle, ShieldCheck, Dumbbell
} from 'lucide-react';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useCountry } from '@/context/CountryContext';

export const CardContainer = ({ children, linkTo, className = "" }) => (
    <Link to={linkTo} className="group block h-full" aria-label="View details">
        <div className={`bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full flex flex-col ${className}`}>
            {children}
        </div>
    </Link>
);

export const PropertyCard = ({ property }) => {
    const { formatPrice } = useCountry();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    if (!property) return null;

    // Helper to normalize image URLs
    const getValidImageUrl = (imagePath) => {
        if (!imagePath) return "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&h=300&fit=crop";
        if (imagePath.startsWith('http')) return imagePath;
        // Assuming Vite proxy /api -> backend, but images might be served from root or /uploads
        // If relative path like "uploads/...", prepend origin or specific base
        // For development with proxy, it might need to be /path if served by public
        // Or if served by backend, we might need the full backend URL if proxy doesn't handle static files well?
        // Let's try prepending / assuming it's a relative path served by the app/proxy
        return `/${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
    };

    // Safely get property data
    const propertyData = {
        id: property.id || property._id || 'unknown',
        title: property.title || property.name || (property.property_type ? `${property.property_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}${property.city ? ` in ${property.city}` : ''}` : ""),
        location: property.city || property.location?.city || property.address || "",
        hostPreference: property.host_preference || "",
        image: getValidImageUrl((Array.isArray(property.photos) && property.photos.length > 0)
            ? property.photos[0]
            : (property.image || property.property_images?.[0])),
        isVerified: property.status === 'approved',
        status: property.status || 'pending',
        rating: property.rating || property.Host?.rating || property.host?.rating || 0,
        reviews: property.reviews || property.Host?.review_count || property.host?.review_count || 0,
        amenities: Array.isArray(property.amenities) ? property.amenities : [],
        bedrooms: property.bedrooms || property.stats?.bedrooms || 0,
        bathrooms: property.bathrooms || property.stats?.bathrooms || 0,
        area: property.area || property.stats?.area || "",
        guests: property.guests || property.stats?.guests || 0,
        price: {
            amount: property.price_per_night || property.price_per_month || property.price_per_hour || property.pricing?.perNight || property.pricing?.perMonth || 0,
            currency: property.currency || property.pricing?.currency || 'INR',
            period: (property.price_per_month || property.pricing?.perMonth) ? 'month' : (property.price_per_night || property.pricing?.perNight) ? 'night' : 'hour'
        },
        host: property.host || property.Host || property.creator || null,
        hostImage: getValidImageUrl(property.host?.profile_image || property.Host?.profile_image || property.host?.image || property.creator?.profile_image)
    };


    const getAmenityIcons = (amenities) => {
        const iconMap = {
            'wifi': <Wifi key="wifi" className="w-3 h-3 text-gray-600" />,
            'parking': <Car key="parking" className="w-3 h-3 text-gray-600" />,
            'kitchen': <Utensils key="kitchen" className="w-3 h-3 text-gray-600" />,
            'tv': <Tv key="tv" className="w-3 h-3 text-gray-600" />,
            'ac': <Thermometer key="ac" className="w-3 h-3 text-gray-600" />,
            'gym': <Dumbbell key="gym" className="w-3 h-3 text-gray-600" />,
        };

        const icons = [];
        amenities.forEach(amenity => {
            const lowerAmenity = amenity.toLowerCase();
            if (iconMap[lowerAmenity]) {
                icons.push(iconMap[lowerAmenity]);
            } else if (lowerAmenity.includes('wifi')) {
                icons.push(<Wifi key="wifi" className="w-4 h-4 text-accent" />);
            } else if (lowerAmenity.includes('parking')) {
                icons.push(<Car key="parking" className="w-4 h-4 text-accent" />);
            } else if (lowerAmenity.includes('kitchen')) {
                icons.push(<Utensils key="kitchen" className="w-4 h-4 text-accent" />);
            }
        });

        return icons.slice(0, 5);
    };

    return (
        <CardContainer key={propertyData.id} linkTo={`/rooms/${propertyData.id}`}>
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden rounded-t-xl bg-gray-100">
                <img
                    src={propertyData.image}
                    alt={propertyData.title}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsImageLoaded(true)}
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&h=300&fit=crop";
                        e.target.classList.remove('opacity-0');
                    }}
                    loading="lazy"
                />

                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                        className={`h-8 w-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${isFavorited ? 'bg-red-100' : 'bg-white/90'}`}
                        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsFavorited(!isFavorited);
                        }}
                    >
                        <Heart className={`w-4 h-4 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
                    </button>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-2">
                    <VerificationBadge isVerified={propertyData.isVerified} />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1 group-hover:text-accent transition-colors">
                            {propertyData.title || "Untitled Property"}
                        </h3>
                        {propertyData.location && (
                            <div className="flex items-center gap-1 text-gray-600 text-xs">
                                <MapPin className="w-3 h-3" />
                                <span className="line-clamp-1">{propertyData.location}</span>
                            </div>
                        )}
                    </div>
                    {/* {propertyData.rating > 0 && (
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full shadow-sm shrink-0 ml-2">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs font-semibold text-gray-900 ml-1">
                                {propertyData.rating}
                            </span>
                        </div>
                    )} */}
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-3 gap-2">
                    {propertyData.bedrooms > 0 && (
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                            <Bed className="w-3 h-3" />
                            {propertyData.bedrooms} bed
                        </span>
                    )}
                    {propertyData.bathrooms > 0 && (
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                            <Users className="w-3 h-3" />
                            {propertyData.bathrooms} bath
                        </span>
                    )}
                </div>

                {/* Price & Amenities Section */}
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-gray-900">
                            {propertyData.price.amount > 0
                                ? formatPrice(propertyData.price.amount)
                                : "Price on request"
                            }
                        </span>
                        {propertyData.price.amount > 0 && (
                            <span className="text-xs text-gray-500">/ {propertyData.price.period}</span>
                        )}
                    </div>

                    {/* Amenities Right Side */}
                    {propertyData.amenities && propertyData.amenities.length > 0 && (
                        <div className="flex items-center gap-1">
                            {getAmenityIcons(propertyData.amenities).slice(0, 3)}
                            {propertyData.amenities.length > 3 && (
                                <span className="text-[10px] text-gray-400 font-medium border border-gray-200 rounded-full px-1">
                                    +{propertyData.amenities.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 overflow-hidden">
                        {/* Host Image */}
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                            {propertyData.hostImage && !propertyData.hostImage.includes("unsplash") ? (
                                <img
                                    src={propertyData.hostImage}
                                    alt="Host"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <Users className={`w-4 h-4 ${propertyData.hostImage && !propertyData.hostImage.includes("unsplash") ? 'hidden' : 'block'}`} />
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-sm font-semibold text-gray-900 truncate">
                                {propertyData.host?.full_name || propertyData.host?.name || propertyData.host?.User?.full_name || "Host"}
                            </span>
                            <div className="text-[10px] text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Direct
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                        <button
                            className="h-8 w-8 border border-green-600 text-green-600 hover:bg-green-50 rounded-full flex items-center justify-center transition-all shadow-sm"
                            title="Chat on WhatsApp"
                            onClick={(e) => {
                                e.preventDefault();
                                // WhatsApp logic
                            }}
                        >
                            <FaWhatsapp className="w-4 h-4" />
                        </button>
                        <button
                            className="h-8 w-8 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all shadow-sm"
                            title="Facebook"
                            onClick={(e) => {
                                e.preventDefault();
                                // Facebook logic
                            }}
                        >
                            <FaFacebook className="w-4 h-4" />
                        </button>
                        <button
                            className="h-8 w-8 border border-pink-600 text-pink-600 hover:bg-pink-50 rounded-full flex items-center justify-center transition-all shadow-sm"
                            title="Visit Instagram"
                            onClick={(e) => {
                                e.preventDefault();
                                // Instagram logic
                            }}
                        >
                            <FaInstagram className="w-4 h-4" />
                        </button>
                        <button
                            className="h-8 w-8 border border-gray-600 text-gray-600 hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-sm"
                            title="Send Email"
                            onClick={(e) => {
                                e.preventDefault();
                                // Email logic
                            }}
                        >
                            <MdEmail className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </CardContainer>
    );
};
