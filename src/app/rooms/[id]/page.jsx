import React, { useState, useEffect } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { ContactModal } from "@/components/contact/ContactModal";
import { 
  MapPin, Star, Heart, Share2, ArrowLeft, CheckCircle,
  Bed, Bath, Users, Square, Wifi, Car, Utensils, Tv,
  Wind, Droplets, Shield, Sparkles, Phone, MessageCircle,
  ChevronLeft, ChevronRight, ShieldCheck, Mail,
  Home, Building, Key, Lock, Zap, Coffee, Dumbbell, Waves,
  Camera, Maximize2, Award, Crown, Thermometer, Wine,
  TreePine, Cloud, Waves as Pool, Sun, Moon,
  Sparkle, Gem, Flower, Trees, Mountain,
  Calendar, Clock, User, X, Copy, CopyCheck
} from "lucide-react";
import { useGetPropertyByIdQuery } from '@/store/api/hostApi';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function RoomPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [contactType, setContactType] = useState('inquiry');
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const { data, isLoading, isError, refetch } = useGetPropertyByIdQuery(id, { skip: !id });

    // Refresh data on mount
    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch]);

    // Format currency beautifully
    const formatCurrency = (value, currency) => {
        if (!value || isNaN(value)) return "Price on request";
        const symbol = currency === 'USD' ? '$' : currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$';
        const formatted = Number(value).toLocaleString();
        return `${symbol}${formatted}`;
    };

    // Copy to clipboard function
    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            if (type === 'email') {
                setCopiedEmail(true);
                toast.success("Email copied to clipboard!");
                setTimeout(() => setCopiedEmail(false), 2000);
            } else if (type === 'phone') {
                setCopiedPhone(true);
                toast.success("Phone number copied to clipboard!");
                setTimeout(() => setCopiedPhone(false), 2000);
            }
        }).catch(err => {
            console.error('Failed to copy: ', err);
            toast.error("Failed to copy to clipboard");
        });
    };

    // Share property
    const shareProperty = () => {
        if (navigator.share) {
            navigator.share({
                title: listing?.title || 'Property Listing',
                text: `Check out this property: ${listing?.title}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    // Process API data
    const listing = React.useMemo(() => {
        if (!data || !data.property) return null;
        
        const p = data.property;
        const hostObj = p.Host || {};
        const userObj = hostObj.User || {};
        
        // Generate contact information
        const hostPhone = hostObj.phone_number || userObj.phone || "";
        const hostEmail = userObj.email || "";
        
        // Default placeholder images if photos is null
        const photos = Array.isArray(p.photos) && p.photos.length > 0 
            ? p.photos 
            : [
                "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1616594039630-3ffc3bd78c47?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop",
            ];
            
        // Map amenities to icons
        const amenityIcons = {
            'Wifi': Wifi,
            'Parking': Car,
            'Air Conditioning': Wind,
            'TV': Tv,
            'Kitchen': Utensils,
            'Pool': Pool,
            'Gym': Dumbbell,
            'Pet Friendly': Heart,
            'Security': Shield,
            'Elevator': Building,
            'Laundry': Droplets,
            'Balcony': Sun,
            'Garden': Flower,
        };
        
        // Process amenities into categories
        const amenities = Array.isArray(p.amenities) ? p.amenities : [];
        const processedAmenities = [];
        
        // Group amenities by category
        const essentials = [];
        const comfort = [];
        const luxury = [];
        const safety = [];
        
        amenities.forEach(amenity => {
            const amenityName = typeof amenity === 'string' ? amenity : amenity.name || '';
            const icon = amenityIcons[amenityName] || CheckCircle;
            
            const item = {
                name: amenityName,
                icon: icon,
                premium: false
            };
            
            // Categorize amenities
            if (['Wifi', 'TV', 'Air Conditioning', 'Kitchen', 'Laundry'].includes(amenityName)) {
                essentials.push(item);
            } else if (['Pool', 'Gym', 'Parking', 'Balcony', 'Garden'].includes(amenityName)) {
                comfort.push(item);
            } else if (['Pet Friendly', 'Elevator'].includes(amenityName)) {
                luxury.push(item);
            } else if (['Security'].includes(amenityName)) {
                safety.push(item);
            } else {
                luxury.push(item);
            }
        });
        
        if (essentials.length > 0) {
            processedAmenities.push({ category: 'Essentials', items: essentials });
        }
        if (comfort.length > 0) {
            processedAmenities.push({ category: 'Comfort', items: comfort });
        }
        if (safety.length > 0) {
            processedAmenities.push({ category: 'Safety & Security', items: safety });
        }
        if (luxury.length > 0) {
            processedAmenities.push({ category: 'Additional Features', items: luxury });
        }
        
        // If no amenities, add some default ones
        if (processedAmenities.length === 0) {
            processedAmenities.push(
                { 
                    category: 'Essentials',
                    items: [
                        { name: 'WiFi', icon: Wifi },
                        { name: 'Air Conditioning', icon: Wind },
                        { name: 'TV', icon: Tv },
                    ]
                }
            );
        }
        
        // Create property highlights based on available data
        const highlights = [];
        if (p.area) {
            highlights.push({ icon: Square, text: `${p.area} sq.ft.`, color: 'text-blue-500' });
        }
        if (p.guests) {
            highlights.push({ icon: Users, text: `Accommodates ${p.guests} guests`, color: 'text-green-500' });
        }
        if (p.bedrooms) {
            highlights.push({ icon: Bed, text: `${p.bedrooms} bedroom${p.bedrooms > 1 ? 's' : ''}`, color: 'text-purple-500' });
        }
        if (p.bathrooms) {
            highlights.push({ icon: Bath, text: `${p.bathrooms} bathroom${p.bathrooms > 1 ? 's' : ''}`, color: 'text-yellow-500' });
        }
        // Default highlights if none
        if (highlights.length === 0) {
            highlights.push(
                { icon: Sparkle, text: 'Well-maintained Property', color: 'text-yellow-500' },
                { icon: Shield, text: 'Safe Neighborhood', color: 'text-green-500' },
                { icon: CheckCircle, text: 'Fully Furnished', color: 'text-blue-500' }
            );
        }
        
        // Create tags based on property data
        const tags = [];
        if (p.status === 'approved') {
            tags.push('Verified');
        }
        if (p.privacy_type) {
            tags.push(p.privacy_type.charAt(0).toUpperCase() + p.privacy_type.slice(1));
        }
        if (p.property_type) {
            tags.push(p.property_type.charAt(0).toUpperCase() + p.property_type.slice(1));
        }
        if (p.is_featured) {
            tags.push('Featured');
        }
        
        // Create included services based on rules and amenities
        const included = [];
        if (amenities.includes('Wifi')) {
            included.push('High-speed WiFi');
        }
        if (amenities.includes('Parking')) {
            included.push('Free Parking');
        }
        if (p.rules && p.rules.length > 0) {
            included.push('House rules provided');
        }
        if (p.security_deposit) {
            included.push('Security deposit protection');
        }
        
        // Default included services
        if (included.length === 0) {
            included.push('Basic amenities', 'Clean environment', '24/7 Support');
        }
        
        // Generate awards for host based on verification status
        const hostAwards = [];
        if (hostObj.status === 'approved') {
            hostAwards.push('Verified Host');
        }
        if (hostObj.rating && hostObj.rating >= 4.5) {
            hostAwards.push('Top Rated');
        }
        if (hostObj.experience_years && hostObj.experience_years > 2) {
            hostAwards.push('Experienced Host');
        }
        
        return {
            id: p.id,
            title: p.title || `${p.property_type ? p.property_type.charAt(0).toUpperCase() + p.property_type.slice(1) : 'Property'} in ${p.city || 'Location'}`,
            subtitle: p.privacy_type ? p.privacy_type.charAt(0).toUpperCase() + p.privacy_type.slice(1) : 'Entire Place',
            description: p.description || "A comfortable and well-maintained property perfect for your stay. This property offers all the essential amenities for a pleasant experience.",
            location: {
                city: p.city || "",
                country: p.country || "",
                address: p.address || "",
                latitude: p.latitude,
                longitude: p.longitude,
            },
            price: {
                hourly: parseFloat(p.price_per_hour) || 0,
                nightly: parseFloat(p.price_per_night) || 0,
                monthly: parseFloat(p.price_per_month) || 0,
                currency: p.currency || 'INR',
                securityDeposit: p.security_deposit || 0,
            },
            stats: {
                bedrooms: p.bedrooms || 0,
                bathrooms: p.bathrooms || 0,
                area: p.area || 0,
                guests: p.guests || 0,
                propertyType: p.property_type || '',
                privacyType: p.privacy_type || '',
            },
            ratings: {
                overall: hostObj.rating || 4.5,
                reviews: hostObj.review_count || 0,
            },
            host: {
                id: hostObj.id,
                name: hostObj.full_name || "Property Host",
                title: hostObj.occupation || "Property Host",
                avatar: hostObj.selfie_photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
                email: hostEmail,
                phone: hostPhone,
                isVerified: hostObj.status === 'approved',
                isSuperhost: hostObj.is_superhost || false,
                responseTime: hostObj.response_time || "Within a few hours",
                responseRate: hostObj.response_rate || "High",
                languages: hostObj.languages || ["English"],
                description: hostObj.description || "Dedicated to providing a comfortable and enjoyable stay for all guests.",
                awards: hostAwards,
                joinedDate: hostObj.created_at || "2023",
                experience: hostObj.experience_years || 2,
            },
            photos,
            amenities: processedAmenities,
            highlights,
            isVerified: p.status === 'approved',
            tags,
            availability: {
                status: p.status === 'approved' ? "Available" : "Not Available",
                nextAvailable: p.status === 'approved' ? "Immediate" : "Contact Host",
                minimumStay: p.minimum_stay || 1,
                maximumStay: p.maximum_stay || 365,
            },
            included,
            rules: Array.isArray(p.rules) ? p.rules : [],
            video: p.video,
            createdAt: p.created_at,
            updatedAt: p.updated_at,
        };
    }, [data]);

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#01172d]">
                <Navbar />
                <div className="pt-24">
                    <div className="container mx-auto px-4">
                        <div className="h-[500px] bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse rounded-3xl mb-8"></div>
                        <div className="flex justify-center">
                            <div className="w-24 h-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (isError || !listing) {
        return (
            <div className="min-h-screen bg-[#01172d]">
                <Navbar />
                <div className="pt-32 pb-20 text-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-800/30">
                                <div className="text-6xl">🏠</div>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-6">Property Unavailable</h1>
                            <p className="text-gray-400 text-lg mb-10">
                                This property is currently unavailable or has been removed.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    onClick={() => navigate('/properties')}
                                    className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
                                >
                                    Explore Properties
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleContact = (type) => {
        setContactType(type);
        setIsContactOpen(true);
    };

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % listing.photos.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + listing.photos.length) % listing.photos.length);
    };

    const handleCallHost = () => {
        if (listing.host.phone) {
            window.location.href = `tel:${listing.host.phone}`;
        } else {
            toast.error("Phone number not available");
        }
    };

    const handleEmailHost = () => {
        if (listing.host.email) {
            window.location.href = `mailto:${listing.host.email}?subject=Inquiry about ${listing.title}&body=Hello ${listing.host.name},%0D%0A%0D%0AI am interested in your property: ${listing.title}%0D%0ALocation: ${listing.location.city}, ${listing.location.country}%0D%0A%0D%0A`;
        } else {
            toast.error("Email not available");
        }
    };

    const handleWhatsAppHost = () => {
        if (listing.host.phone) {
            const message = `Hello ${listing.host.name}, I'm interested in your property: ${listing.title} (${window.location.href})`;
            const whatsappUrl = `https://wa.me/${listing.host.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            toast.error("Phone number not available for WhatsApp");
        }
    };

    // Determine which price to display based on availability
    const displayPrice = listing.price.monthly > 0 
        ? `${formatCurrency(listing.price.monthly, listing.price.currency)}/month`
        : listing.price.nightly > 0 
            ? `${formatCurrency(listing.price.nightly, listing.price.currency)}/night`
            : listing.price.hourly > 0
                ? `${formatCurrency(listing.price.hourly, listing.price.currency)}/hour`
                : "Price on request";
                return (
        <div className="min-h-screen bg-[#01172d] text-white">
            <Navbar />

            {/* Hero Section with Glass Effect */}
            <div className="relative pt-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={listing.photos[0]}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#01172d]"></div>
                </div>

                {/* Hero Content */}
                <div className="relative container mx-auto px-4 py-16">
                    <div className="max-w-3xl">
                        {/* Action Buttons - Top Right */}
                        <div className="flex justify-end gap-3 mb-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleFavorite}
                                className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={shareProperty}
                                className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
                            >
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {listing.tags.map((tag, index) => (
                                <Badge key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                            {listing.title}
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-xl text-gray-300 mb-8">
                            {listing.subtitle}
                        </p>

                        {/* Location & Rating */}
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent" />
                                <span className="text-lg">{listing.location.city}, {listing.location.country}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="font-bold">{listing.ratings.overall}</span>
                                <span className="text-gray-400">•</span>
                                <span>{listing.ratings.reviews} reviews</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Button
                                onClick={() => handleContact('inquiry')}
                                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Contact Host
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleContact('tour')}
                                className="border-white/30 hover:bg-white/10 text-white px-8 py-3 text-lg"
                            >
                                <Camera className="w-5 h-5 mr-2" />
                                Schedule Tour
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleWhatsAppHost}
                                className="border-white/30 hover:bg-white/10 text-white px-8 py-3 text-lg"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Gallery & Details */}
                    <div className="lg:col-span-2">
                        {/* Gallery */}
                        <div className="mb-12">
                            <div className="relative h-[500px] rounded-3xl overflow-hidden mb-4">
                                <img
                                    src={listing.photos[currentImageIndex]}
                                    alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                
                                {/* Navigation */}
                                {listing.photos.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-white" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                                        >
                                            <ChevronRight className="w-6 h-6 text-white" />
                                        </button>
                                    </>
                                )}
                                
                                {/* Image Counter */}
                                <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                                    <span className="font-medium">{currentImageIndex + 1} / {listing.photos.length}</span>
                                </div>
                                
                                {/* Fullscreen Button */}
                                <button
                                    onClick={() => setIsFullscreen(true)}
                                    className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <Maximize2 className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="flex gap-3 overflow-x-auto py-2">
                                {listing.photos.map((photo, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                                            currentImageIndex === index 
                                                ? 'border-accent scale-105 shadow-lg' 
                                                : 'border-transparent hover:border-white/30'
                                        }`}
                                    >
                                        <img
                                            src={photo}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6">Description</h2>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                                    {listing.description}
                                </p>
                            </div>
                        </div>
                        {/* Property Highlights */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-8">Property Highlights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {listing.highlights.map((highlight, index) => {
                                    const Icon = highlight.icon;
                                    return (
                                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-xl bg-white/10`}>
                                                    <Icon className={`w-6 h-6 ${highlight.color}`} />
                                                </div>
                                                <span className="text-lg font-medium">{highlight.text}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Property Stats */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-8">Property Details</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/50 transition-colors">
                                    <div className="text-4xl font-bold mb-2 text-accent">{listing.stats.bedrooms}</div>
                                    <div className="text-gray-400">Bedrooms</div>
                                </div>
                                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/50 transition-colors">
                                    <div className="text-4xl font-bold mb-2 text-accent">{listing.stats.bathrooms}</div>
                                    <div className="text-gray-400">Bathrooms</div>
                                </div>
                                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/50 transition-colors">
                                    <div className="text-4xl font-bold mb-2 text-accent">{listing.stats.area}</div>
                                    <div className="text-gray-400">Sq Ft</div>
                                </div>
                                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/50 transition-colors">
                                    <div className="text-4xl font-bold mb-2 text-accent">{listing.stats.guests}</div>
                                    <div className="text-gray-400">Guests</div>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-8">Amenities</h2>
                            <div className="space-y-8">
                                {listing.amenities.map((category, catIndex) => (
                                    <div key={catIndex} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-colors">
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent/20">
                                                {catIndex === 0 && <CheckCircle className="w-5 h-5 text-accent" />}
                                                {catIndex === 1 && <Sparkle className="w-5 h-5 text-accent" />}
                                                {catIndex === 2 && <Shield className="w-5 h-5 text-accent" />}
                                                {catIndex >= 3 && <Gem className="w-5 h-5 text-accent" />}
                                            </div>
                                            {category.category}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {category.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors hover:scale-[1.02]">
                                                    <div className="p-3 rounded-lg bg-accent/20">
                                                        <item.icon className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium">{item.name}</div>
                                                    </div>
                                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rules */}
                        {listing.rules.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <Shield className="w-8 h-8 text-accent" />
                                    House Rules
                                </h2>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <ul className="space-y-4">
                                        {listing.rules.map((rule, index) => (
                                            <li key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                                <div className="p-1 rounded-full bg-accent/20 mt-1">
                                                    <CheckCircle className="w-4 h-4 text-accent" />
                                                </div>
                                                <span className="text-gray-300 flex-1">{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Host Section */}
                        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-accent/30 transition-colors">
                            <h2 className="text-3xl font-bold mb-8">About the Host</h2>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="relative">
                                    <img
                                        src={listing.host.avatar}
                                        alt={listing.host.name}
                                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20 shadow-lg"
                                    />
                                    {listing.host.isSuperhost && (
                                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                            <Crown className="w-3 h-3 inline mr-1" />
                                            Superhost
                                        </div>
                                    )}
                                    {listing.host.isVerified && (
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            <ShieldCheck className="w-3 h-3 inline mr-1" />
                                            Verified
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold mb-2 md:mb-0">{listing.host.name}</h3>
                                        <div className="flex gap-2 justify-center md:justify-end">
                                            <Badge className="bg-accent/20 text-accent border-accent/30">
                                                Host for {listing.host.experience}+ years
                                            </Badge>
                                            <Badge className="bg-white/10 backdrop-blur-sm border-white/20">
                                                Joined {listing.host.joinedDate}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-400 mb-6">{listing.host.title}</p>
                                    <p className="text-gray-300 mb-6 leading-relaxed">{listing.host.description}</p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                        <div className="text-center p-4 bg-white/5 rounded-xl">
                                            <div className="text-3xl font-bold text-accent">{listing.host.responseRate}</div>
                                            <div className="text-sm text-gray-400">Response Rate</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/5 rounded-xl">
                                            <div className="text-3xl font-bold text-accent">{listing.host.responseTime}</div>
                                            <div className="text-sm text-gray-400">Response Time</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/5 rounded-xl">
                                            <div className="text-3xl font-bold text-accent">{listing.ratings.overall}</div>
                                            <div className="text-sm text-gray-400">Rating</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/5 rounded-xl">
                                            <div className="text-3xl font-bold text-accent">{listing.host.languages.length}+</div>
                                            <div className="text-sm text-gray-400">Languages</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {listing.host.awards.map((award, index) => (
                                            <Badge key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                                                <Award className="w-3 h-3 mr-1" />
                                                {award}
                                            </Badge>
                                        ))}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            onClick={() => handleContact('inquiry')}
                                            className="bg-accent hover:bg-accent/90 flex-1 min-w-[180px]"
                                        >
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            Send Message
                                        </Button>
                                        {listing.host.phone && (
                                            <Button
                                                variant="outline"
                                                className="border-white/30 hover:bg-white/10 flex-1 min-w-[180px]"
                                                onClick={handleCallHost}
                                            >
                                                <Phone className="w-4 h-4 mr-2" />
                                                Call Now
                                            </Button>
                                        )}
                                        {listing.host.email && (
                                            <Button
                                                variant="outline"
                                                className="border-white/30 hover:bg-white/10 flex-1 min-w-[180px]"
                                                onClick={handleEmailHost}
                                            >
                                                <Mail className="w-4 h-4 mr-2" />
                                                Send Email
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Price & Contact Info */}
                    <div>
                        <div className="sticky top-28 space-y-6">
                            {/* Price & Contact Card */}
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl font-bold">{displayPrice}</span>
                                        {listing.price.securityDeposit > 0 && (
                                            <span className="text-sm text-gray-400">
                                                + {formatCurrency(listing.price.securityDeposit, listing.price.currency)} security deposit
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-gray-400 mb-4">
                                        Contact host directly for pricing details and availability
                                    </div>
                                </div>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg">
                                        <span className="text-gray-400">Availability</span>
                                        <span className={`font-medium ${listing.availability.status === 'Available' ? 'text-green-400' : 'text-red-400'}`}>
                                            {listing.availability.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg">
                                        <span className="text-gray-400">Next Available</span>
                                        <span className="font-medium">{listing.availability.nextAvailable}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg">
                                        <span className="text-gray-400">Property Type</span>
                                        <span className="font-medium">{listing.stats.propertyType}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg">
                                        <span className="text-gray-400">Minimum Stay</span>
                                        <span className="font-medium">{listing.availability.minimumStay} nights</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <Button
                                        onClick={() => handleContact('inquiry')}
                                        className="w-full bg-accent hover:bg-accent/90 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                                    >
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Contact Host
                                    </Button>
                                    
                                    <Button
                                        onClick={() => handleContact('tour')}
                                        variant="outline"
                                        className="w-full border-white/30 hover:bg-white/10 text-white py-4 hover:scale-[1.02] transition-all"
                                    >
                                        <Calendar className="w-5 h-5 mr-2" />
                                        Schedule Tour
                                    </Button>

                                    {listing.host.phone && (
                                        <Button
                                            onClick={handleWhatsAppHost}
                                            variant="outline"
                                            className="w-full border-green-500/30 hover:bg-green-500/10 text-green-400 py-4 hover:scale-[1.02] transition-all"
                                        >
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            Message on WhatsApp
                                        </Button>
                                    )}
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="text-center text-sm text-gray-400">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <ShieldCheck className="w-4 h-4 text-green-400" />
                                            Direct communication
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <X className="w-4 h-4 text-red-400" />
                                            No booking fees
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <MessageCircle className="w-6 h-6 text-purple-400" />
                                    <h4 className="text-xl font-bold">Contact Information</h4>
                                </div>
                                <div className="space-y-4">
                                    {listing.host.email && (
                                        <div className="p-3 bg-white/5 rounded-lg">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-gray-400 text-sm">Email:</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => copyToClipboard(listing.host.email, 'email')}
                                                    className="h-6 w-6 hover:bg-white/20"
                                                >
                                                    {copiedEmail ? (
                                                        <CopyCheck className="w-3 h-3 text-green-400" />
                                                    ) : (
                                                        <Copy className="w-3 h-3" />
                                                    )}
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium truncate">{listing.host.email}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleEmailHost}
                                                    className="text-xs h-7 hover:bg-white/20"
                                                >
                                                    Email
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {listing.host.phone && (
                                        <div className="p-3 bg-white/5 rounded-lg">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-gray-400 text-sm">Phone:</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => copyToClipboard(listing.host.phone, 'phone')}
                                                    className="h-6 w-6 hover:bg-white/20"
                                                >
                                                    {copiedPhone ? (
                                                        <CopyCheck className="w-3 h-3 text-green-400" />
                                                    ) : (
                                                        <Copy className="w-3 h-3" />
                                                    )}
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                {showPhoneNumber ? (
                                                    <span className="font-medium">{listing.host.phone}</span>
                                                ) : (
                                                    <span className="font-medium">•••• ••• •••</span>
                                                )}
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                                                        className="text-xs h-7 hover:bg-white/20"
                                                    >
                                                        {showPhoneNumber ? 'Hide' : 'Show'}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={handleCallHost}
                                                        className="text-xs h-7 hover:bg-white/20"
                                                    >
                                                        Call
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="pt-4">
                                        <div className="text-center text-sm text-gray-400 mb-3">
                                            Contact host directly for fastest response
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleContact('inquiry')}
                                                className="flex-1 bg-accent hover:bg-accent/90"
                                            >
                                                <Mail className="w-4 h-4 mr-2" />
                                                Message
                                            </Button>
                                            {listing.host.phone && (
                                                <Button
                                                    onClick={handleCallHost}
                                                    variant="outline"
                                                    className="flex-1 border-white/30 hover:bg-white/10"
                                                >
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    Call
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Included Services */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="w-6 h-6 text-blue-400" />
                                    <h4 className="text-xl font-bold">Included Services</h4>
                                </div>
                                <ul className="space-y-3">
                                    {listing.included.map((service, index) => (
                                        <li key={index} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            <span className="text-gray-300">{service}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Safety & Trust */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                    <h4 className="text-xl font-bold">Safety & Trust</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Verified Property</div>
                                            <div className="text-sm text-gray-400">Thoroughly inspected</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <User className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Verified Host</div>
                                            <div className="text-sm text-gray-400">ID verified</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Secure Communication</div>
                                            <div className="text-sm text-gray-400">Encrypted messaging</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-accent/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                                <h4 className="text-xl font-bold mb-6 text-center">Quick Actions</h4>
                                <div className="space-y-3">
                                    <Button
                                        onClick={handleWhatsAppHost}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        WhatsApp Host
                                    </Button>
                                    <Button
                                        onClick={() => handleContact('tour')}
                                        variant="outline"
                                        className="w-full border-white/30 hover:bg-white/10 text-white"
                                    >
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Book Viewing
                                    </Button>
                                    <Button
                                        onClick={handleFavorite}
                                        variant="outline"
                                        className="w-full border-white/30 hover:bg-white/10 text-white"
                                    >
                                        <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                                        {isFavorite ? 'Remove Favorite' : 'Save Property'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-[#01172d] border-t border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-6">Interested in this Property?</h3>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Contact the host directly to discuss availability, pricing, and schedule a viewing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            onClick={() => handleContact('inquiry')}
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-white px-10 py-4 text-lg hover:scale-105 transition-transform"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Contact Host Now
                        </Button>
                        <Button
                            onClick={handleWhatsAppHost}
                            size="lg"
                            variant="outline"
                            className="border-green-500 hover:bg-green-500/10 text-green-400 px-10 py-4 text-lg hover:scale-105 transition-transform"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Message on WhatsApp
                        </Button>
                        <Button
                            onClick={() => handleContact('tour')}
                            variant="outline"
                            size="lg"
                            className="border-white/30 hover:bg-white/10 text-white px-10 py-4 text-lg hover:scale-105 transition-transform"
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Schedule Viewing
                        </Button>
                    </div>
                </div>
            </div>

            {/* Fullscreen Gallery Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 bg-black z-50 flex flex-col animate-in fade-in duration-300">
                    <div className="flex justify-between items-center p-6 bg-black/80 backdrop-blur-sm">
                        <Button
                            variant="ghost"
                            onClick={() => setIsFullscreen(false)}
                            className="text-white hover:bg-white/20"
                        >
                            <ArrowLeft className="w-6 h-6 mr-2" />
                            Back
                        </Button>
                        <div className="text-white font-medium">
                            {currentImageIndex + 1} / {listing.photos.length}
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => setIsFullscreen(false)}
                            className="text-white hover:bg-white/20"
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>
                    
                    <div className="flex-1 relative flex items-center justify-center p-4">
                        <img
                            src={listing.photos[currentImageIndex]}
                            alt="Fullscreen view"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                        
                        {listing.photos.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Footer />

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                listing={listing}
                type={contactType}
                onSuccess={() => {
                    toast.success("Message sent successfully!");
                    setIsContactOpen(false);
                }}
            />
        </div>
    );
}